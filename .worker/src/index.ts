import type { WorkflowEvent, WorkflowStep } from 'cloudflare:workers'
import type { BuildInfo } from './types'
import Cloudflare from 'cloudflare'
import { env, WorkflowEntrypoint } from 'cloudflare:workers'
import { NonRetryableError } from 'cloudflare:workflows'
import { ACCOUNT_ID, TALKS_PROJECT_NAME, WORKER_NAME, WORKFLOW_NAME } from './constants'

const cloudflare = new Cloudflare({
  apiToken: env.CLOUDFLARE_API_TOKEN,
})

export class TriggerRedeployLinkedWebsitesWorkflow extends WorkflowEntrypoint<Env, Record<string, never>> {
  async run({ instanceId }: WorkflowEvent<Record<string, never>>, step: WorkflowStep) {
    await step.do('existing-workflow', async () => {
      // Will contains itself
      const json = await cloudflare.workflows.instances.list(WORKFLOW_NAME, {
        account_id: ACCOUNT_ID,
        status: 'running',
      })

      const otherInstances = json.result.filter(instance => instance.id !== instanceId)
      if (otherInstances.length > 0) {
        throw new NonRetryableError(`Another instance of ${WORKFLOW_NAME} is already running.`)
      }
    })

    await step.do(`check-deployment`, {
      retries: {
        limit: 10,
        delay: '1 minute',
        backoff: 'exponential',
      },
      timeout: '1 hour',
    }, async () => {
      const json = await cloudflare.pages.projects.deployments.list(TALKS_PROJECT_NAME, { account_id: ACCOUNT_ID, env: 'production' })

      const latestProductionDeployment = json.result[0]

      const status = latestProductionDeployment?.latest_stage?.status
      if (!status) {
        throw new Error('No status found for the latest production deployment.')
      }

      if (status === 'success') {
        return
      }

      throw new Error(`Latest deployment status is ${status}.`)
    })

    await step.do('trigger-redeploy', async () => {
      // Get active deployment
      const deployments = await cloudflare.workers.scripts.deployments.list(WORKER_NAME, { account_id: ACCOUNT_ID })
      const versionId = deployments.deployments[0].versions[0].version_id

      // Get the build for this version
      const buildsByVersion = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/builds/builds?version_ids=${versionId}`,
        {
          headers: { Authorization: `Bearer ${this.env.CLOUDFLARE_API_TOKEN}` },
        },
      )
      const buildsData = await buildsByVersion.json() as BuildInfo
      const build = buildsData.result.builds[versionId]

      // Retrigger using the same trigger, branch, and commit
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/builds/triggers/${build.trigger.trigger_uuid}/builds`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branch: build.build_trigger_metadata.branch,
            commit_hash: build.build_trigger_metadata.commit_hash,
          }),
        },
      )
    })
  }
}

export default {
  async fetch(_: Request, env: Env): Promise<Response> {
    await env.TALKS_TRIGGER_REDEPLOY_LINKED_WEBSITES.create()

    return new Response(null, { status: 202 })
  },
}

import type { WorkflowEvent, WorkflowStep } from 'cloudflare:workers'
import { WorkflowEntrypoint } from 'cloudflare:workers'

const ACCOUNT_ID = '791273e4d0a39e921e3dc7a6a76acf61'
const WORKER_NAME = 'soubiran-dev'
const TALKS_PROJECT_NAME = 'talks'

interface DeploymentStatus {
  latest_deployment: {
    id: string
    status: string
    created_on: string
    modified_on: string
  }
}

interface WorkerDeployment {
  result: {
    deployments: Array<{
      versions: Array<{
        version_id: string
      }>
    }>
  }
}

interface BuildInfo {
  result: {
    builds: {
      [versionId: string]: {
        trigger: {
          trigger_uuid: string
        }
        build_trigger_metadata: {
          branch: string
          commit_hash: string
        }
      }
    }
  }
}

/**
 * Cloudflare Workflow for checking deployment and triggering redeploy
 */
export class DeploymentCheckWorkflow extends WorkflowEntrypoint<Env, Record<string, never>> {
  async run(event: WorkflowEvent<Record<string, never>>, step: WorkflowStep) {
    const timeoutMs = 30 * 60 * 1000 // 30 minutes timeout
    const startTime = Date.now()
    let attempt = 0
    let backoffSeconds = 60 // Start with 1 minute

    while (Date.now() - startTime < timeoutMs) {
      attempt++

      // Check deployment status with retry
      const isComplete = await step.do(`check-deployment-${attempt}`, async () => {
        try {
          const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${TALKS_PROJECT_NAME}`,
            {
              headers: {
                'Authorization': `Bearer ${this.env.CF_API_TOKEN}`,
                'Content-Type': 'application/json',
              },
            },
          )

          if (!response.ok) {
            console.error(`Failed to fetch deployment status from ${TALKS_PROJECT_NAME} project:`, response.statusText)
            return false
          }

          const data = await response.json() as { result: DeploymentStatus }
          const status = data.result?.latest_deployment?.status

          console.warn(`Talks deployment status: ${status}`)
          return status === 'success'
        }
        catch (error) {
          console.error('Error checking deployment status:', error)
          return false
        }
      })

      if (isComplete) {
        // Trigger soubiran-dev redeploy
        await step.do('trigger-redeploy', async () => {
          try {
            // Get active deployment
            const deployments = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}/deployments`,
              {
                headers: { Authorization: `Bearer ${this.env.CF_API_TOKEN}` },
              },
            )

            const deploymentsData = await deployments.json() as WorkerDeployment
            const versionId = deploymentsData.result.deployments[0].versions[0].version_id

            // Get the build for this version
            const buildsByVersion = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/builds/builds?version_ids=${versionId}`,
              {
                headers: { Authorization: `Bearer ${this.env.CF_API_TOKEN}` },
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
                  'Authorization': `Bearer ${this.env.CF_API_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  branch: build.build_trigger_metadata.branch,
                  commit_hash: build.build_trigger_metadata.commit_hash,
                }),
              },
            )

            console.warn('Successfully triggered soubiran-dev redeploy')
          }
          catch (error) {
            console.error('Error triggering redeploy:', error)
            throw error
          }
        })

        return { success: true, message: 'Deployment complete and redeploy triggered' }
      }

      // Exponential backoff: wait longer each time, but cap at 5 minutes
      const remainingTime = timeoutMs - (Date.now() - startTime)
      if (remainingTime > backoffSeconds * 1000) {
        console.warn(`Talks deployment not yet complete. Waiting ${backoffSeconds}s... (attempt ${attempt})`)
        await step.sleep(`wait-${attempt}`, `${backoffSeconds} seconds`)

        // Increase backoff exponentially, capped at 5 minutes (300 seconds)
        backoffSeconds = Math.min(backoffSeconds * 1.5, 300)
      }
      else {
        break
      }
    }

    return { success: false, message: 'Timeout reached, deployment did not complete in time' }
  }
}

/**
 * Main worker that handles HTTP requests and triggers the workflow
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Trigger the workflow
    const instance = await env.DEPLOYMENT_CHECK_WORKFLOW.create()

    return new Response(JSON.stringify({
      message: 'Deployment check workflow started',
      workflowId: instance.id,
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}

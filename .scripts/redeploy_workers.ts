import process from 'node:process'
import { ofetch } from 'ofetch'

/**
 * Retry the currently active deployment to refresh build-time data
 */
async function redeploy() {
  const accountId = '791273e4d0a39e921e3dc7a6a76acf61'
  const workerName = 'soubiran-dev'
  
  // Get script ID
  const workers = await ofetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, {
    headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}` },
  })
  const scriptId = workers.result.find((w: any) => w.id === workerName)?.tag
  
  // Get active deployment
  const deployments = await ofetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}/deployments`, {
    headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}` },
  })
  
  const versionId = deployments.result.deployments[0].versions[0].version_id
  
  // Get the build for this version
  const buildsByVersion = await ofetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/builds/builds?version_ids=${versionId}`, {
    headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}` },
  })
  
  const build = buildsByVersion.result.builds[versionId]
  
  // Retrigger using the same trigger, branch, and commit
  await ofetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/builds/triggers/${build.trigger.trigger_uuid}/builds`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      branch: build.build_trigger_metadata.branch,
      commit_hash: build.build_trigger_metadata.commit_hash
    })
  })
  
}

redeploy()
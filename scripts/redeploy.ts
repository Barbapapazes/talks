import process from 'node:process'
import { ofetch } from 'ofetch'

/**
 * This script is used to redeploy the latest deployment to refresh data.
 *
 * Many data sources are fetched at build-time, so a GitHub Actions will be triggered every 24 hours to retry the latest deployment.
 */
async function redeploy() {
  const accountId = '791273e4d0a39e921e3dc7a6a76acf61'
  const projectName = 'soubiran-dev'

  const deployments = await ofetch(`https://api.cloudflare.com/client/v4
/accounts/${accountId}/pages/projects/${projectName}/deployments?env=production&page=1&per_page=1`, {
    headers: {
      Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
    },
  })

  await ofetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments/${deployments.result[0].id}/retry`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
    },
  })
}

redeploy()

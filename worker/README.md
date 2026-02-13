# Deployment Check Worker

This Cloudflare Worker monitors the talks deployment status and automatically triggers a soubiran-dev redeploy when the deployment is complete.

## How it works

1. When triggered (via HTTP request), the worker starts a Cloudflare Workflow
2. The workflow checks the talks deployment status via Cloudflare Pages API
3. If the deployment is complete (status: 'success'), it triggers the soubiran-dev redeploy
4. If not complete, it sleeps for 1 minute and checks again
5. Maximum 30 attempts (30 minutes total)

## Deployment

```bash
cd worker
npm install
npx wrangler deploy
```

## Configuration

The worker requires the following environment variable:
- `CF_API_TOKEN`: Cloudflare API token with permissions to read deployment status and trigger builds

Set this in the Cloudflare dashboard under Workers & Pages > deployment-check-worker > Settings > Variables.

## Triggering

The worker is automatically triggered by the GitHub Actions workflow `.github/workflows/trigger-deployment-check.yml` when code is pushed to the main branch.

You can also manually trigger it:
```bash
curl -X POST https://deployment-check-worker.<account-id>.workers.dev
```

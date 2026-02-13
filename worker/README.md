# Deployment Check Worker

This Cloudflare Worker monitors the talks deployment status and automatically triggers a soubiran-dev redeploy when the deployment is complete.

## How it works

1. When triggered (via HTTP request), the worker starts a Cloudflare Workflow
2. The workflow checks the talks deployment status via Cloudflare Pages API
3. If the deployment is complete (status: 'success'), it triggers the soubiran-dev redeploy
4. If not complete, it uses exponential backoff retry (starting at 60s, up to 5 minutes)
5. Maximum timeout: 30 minutes

## Deployment

```bash
cd worker
npm install
npx wrangler types  # Generate TypeScript types
npx wrangler deploy
```

## Configuration

The worker is configured using `wrangler.json` (JSON format instead of TOML).

The worker requires the following environment variable:
- `CF_API_TOKEN`: Cloudflare API token with permissions to read deployment status and trigger builds

Set this in the Cloudflare dashboard under Workers & Pages > deployment-check-worker > Settings > Variables.

### Cloudflare Access Protection

The worker should be protected with Cloudflare Access. Configure a service token in Cloudflare Access and use the Client ID and Client Secret in the GitHub Actions workflow.

## Triggering

The worker is automatically triggered by the GitHub Actions workflow `.github/workflows/trigger-deployment-check.yml` when code is pushed to the main branch.

You can also manually trigger it with Cloudflare Access credentials:
```bash
curl -X POST https://deployment-check-worker.<account-id>.workers.dev \
  -H "CF-Access-Client-Id: <client-id>" \
  -H "CF-Access-Client-Secret: <client-secret>"
```

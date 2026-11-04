import type { RpcExchange } from '../../../../theme/types/inspect'
import { buildReviewMessage, defaultReviewArguments, reviewPullRequestPrompt } from './mcp-prompts'
import { mcpRequest, mcpResult } from './mcp-protocol'
import { mcpResources } from './mcp-resources'

const briefUri = mcpResources[0].uri

function exchange(
  method: string,
  id: number,
  params: Record<string, unknown>,
  result: Record<string, unknown>,
): RpcExchange {
  return {
    id: method,
    method,
    request: mcpRequest(method, id, params),
    response: mcpResult(id, result),
  }
}

export const mcpExchanges: Record<'resources' | 'prompts', RpcExchange[]> = {
  resources: [
    exchange('resources/list', 3, {}, {
      resources: mcpResources.map(({ uri, name, description, mimeType }) => ({ uri, name, description, mimeType })),
    }),
    exchange('resources/read', 4, { uri: briefUri }, {
      contents: [{
        uri: briefUri,
        mimeType: 'text/markdown',
        text: '# Project Dashboard\nManage projects and track their status.',
      }],
    }),
  ],
  prompts: [
    exchange('prompts/list', 5, {}, {
      prompts: [reviewPullRequestPrompt],
    }),
    exchange('prompts/get', 6, {
      name: reviewPullRequestPrompt.name,
      arguments: { ...defaultReviewArguments },
    }, {
      messages: [{ role: 'user', content: { type: 'text', text: buildReviewMessage(defaultReviewArguments) } }],
    }),
  ],
}

import type { RpcExchange } from '../../../../theme/types/inspect'
import { buildReviewMessage, defaultReviewArguments, reviewPullRequestPrompt } from './mcp-prompts'
import { mcpResources } from './mcp-resources'

const repository = 'acme/project-dashboard'
const issueTitle = 'Require confirmation before deleting a project'
const issueBody = 'Before deleting a project, show a confirmation dialog requiring the user to type the project\'s name.'
const briefUri = mcpResources[0].uri

function exchange(
  method: string,
  id: number,
  params: Record<string, unknown> | undefined,
  result: Record<string, unknown>,
): RpcExchange {
  return {
    id: method,
    method,
    request: { jsonrpc: '2.0', id, method, ...(params ? { params } : {}) },
    response: { jsonrpc: '2.0', id, result },
  }
}

export const mcpExchanges: Record<'tools' | 'resources' | 'prompts', RpcExchange[]> = {
  tools: [
    exchange('tools/list', 1, undefined, {
      tools: [{
        name: 'create_issue',
        description: 'Create an issue in a GitHub repository.',
        inputSchema: {
          type: 'object',
          properties: {
            repository: { type: 'string' },
            title: { type: 'string' },
            body: { type: 'string' },
          },
          required: ['repository', 'title', 'body'],
        },
      }],
    }),
    exchange('tools/call', 2, {
      name: 'create_issue',
      arguments: { repository, title: issueTitle, body: issueBody },
    }, {
      content: [{ type: 'text', text: `Created issue #42 in ${repository}: ${issueTitle}.` }],
      isError: false,
    }),
  ],
  resources: [
    exchange('resources/list', 3, undefined, {
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
    exchange('prompts/list', 5, undefined, {
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

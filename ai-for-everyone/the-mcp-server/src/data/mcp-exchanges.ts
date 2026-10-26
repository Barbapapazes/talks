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
  details: Pick<RpcExchange, 'requestNote' | 'responseNote' | 'highlightFields'>,
): RpcExchange {
  return {
    id: method,
    method,
    request: { jsonrpc: '2.0', id, method, ...(params ? { params } : {}) },
    response: { jsonrpc: '2.0', id, result },
    ...details,
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
    }, {
      requestNote: 'The app asks which tools the server exposes.',
      responseNote: 'The description and input schema tell the model how to request this tool.',
      highlightFields: ['name', 'description', 'inputSchema'],
    }),
    exchange('tools/call', 2, {
      name: 'create_issue',
      arguments: { repository, title: issueTitle, body: issueBody },
    }, {
      content: [{ type: 'text', text: `Created issue #42 in ${repository}: ${issueTitle}.` }],
      isError: false,
    }, {
      requestNote: 'The model requests an action. The app sends this call to the MCP server.',
      responseNote: 'The app passes the result to the model, which writes the reply.',
      highlightFields: ['name', 'arguments', 'content', 'isError'],
    }),
  ],
  resources: [
    exchange('resources/list', 3, undefined, {
      resources: mcpResources.map(({ uri, name, description, mimeType }) => ({ uri, name, description, mimeType })),
    }, {
      requestNote: 'The app asks which resources are available.',
      responseNote: 'The app can display these resources in its context picker.',
      highlightFields: ['uri', 'name'],
    }),
    exchange('resources/read', 4, { uri: briefUri }, {
      contents: [{
        uri: briefUri,
        mimeType: 'text/markdown',
        text: '# Project Dashboard\nManage projects and track their status.',
      }],
    }, {
      requestNote: 'The URI identifies content, not an action.',
      responseNote: 'The app chooses what to add to the model\'s context. Reading does not run the model.',
      highlightFields: ['uri', 'contents', 'text'],
    }),
  ],
  prompts: [
    exchange('prompts/list', 5, undefined, {
      prompts: [reviewPullRequestPrompt],
    }, {
      requestNote: 'The app asks which prompt templates are available.',
      responseNote: 'The app can expose a template as a slash command.',
      highlightFields: ['name', 'arguments'],
    }),
    exchange('prompts/get', 6, {
      name: reviewPullRequestPrompt.name,
      arguments: { ...defaultReviewArguments },
    }, {
      messages: [{ role: 'user', content: { type: 'text', text: buildReviewMessage(defaultReviewArguments) } }],
    }, {
      requestNote: 'The app fills the template. All prompt argument values are strings.',
      responseNote: 'The server returns messages, not a model reply. The app decides when to send them.',
      highlightFields: ['name', 'arguments', 'messages', 'role', 'text'],
    }),
  ],
}

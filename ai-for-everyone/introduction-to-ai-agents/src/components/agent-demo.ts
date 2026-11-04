export type DemoMode = 'conversation' | 'repository' | 'background' | 'delegation'
type Revision = 'initial' | 'first-fix' | 'final'

export interface DemoEvent {
  actor: string
  title: string
  detail: string
  revision?: Revision
  tests?: 'failed' | 'passed'
}

export const sources: Record<Revision, string> = {
  'initial': 'return subtotal - discount - discount',
  'first-fix': 'return subtotal - discount',
  'final': 'return Math.max(0, subtotal - discount)',
}

export const investigations = [
  { agent: 'Code investigator', file: 'cart.ts', finding: 'The discount is subtracted twice.' },
  { agent: 'Test investigator', file: 'cart.test.ts', finding: 'The total must never be negative.' },
]

export const delegationToolCalls = [
  ...investigations.map(({ agent, file, finding }) => ({
    requestedAt: 1,
    completedAt: 2,
    request: { actor: 'Model request', title: `Delegate to ${agent}`, detail: `delegate(${JSON.stringify({ agent, task: `Inspect ${file} and report findings.`, permissions: 'read only' })})` },
    result: { actor: 'Harness → tool result', title: `${agent} report`, detail: finding },
  })),
  {
    requestedAt: 3,
    completedAt: 4,
    request: { actor: 'Model request', title: 'Apply the combined findings', detail: 'edit("cart.ts", "return Math.max(0, subtotal - discount)")' },
    result: { actor: 'Harness → tool result', title: 'Edit allowed → file updated', detail: 'Subtract the discount once and clamp the total to zero. The edit succeeded.' },
  },
  {
    requestedAt: 4,
    completedAt: 4,
    request: { actor: 'Model request', title: 'Verify the correction', detail: 'test("cart.test.ts")' },
    result: { actor: 'Harness → tool result', title: 'Test allowed → 2 passed', detail: 'Both specified cases pass. The fix is ready for review, not deployed.' },
  },
]

export const scenarios: Record<DemoMode, { label: string, tools: string, takeaway: string, events: DemoEvent[] }> = {
  conversation: {
    label: 'Conversational',
    tools: 'Repository tools: none',
    takeaway: 'This setup can discuss the project, but cannot inspect or edit it.',
    events: [
      { actor: 'User', title: 'Send the goal', detail: 'Find a bug in this project and fix it.' },
      { actor: 'Assistant', title: 'Ask for context', detail: 'Can you share the checkout code and its tests?' },
      { actor: 'Harness', title: 'No repository access', detail: 'No file was read or changed. The user would need to share the files.' },
    ],
  },
  repository: {
    label: 'Repository tools',
    tools: 'Read · Edit · Test, project only',
    takeaway: 'A failed test becomes input for the next decision.',
    events: [
      { actor: 'Harness', title: 'Equip the same model', detail: 'Read, edit and test are allowed inside this project. No external access.' },
      { actor: 'Model request', title: 'Inspect the project', detail: 'read(["cart.ts", "cart.test.ts"])' },
      { actor: 'Harness → tool result', title: 'Read allowed → files returned', detail: 'The discount is subtracted twice. The tests also require a non-negative total.', revision: 'initial' },
      { actor: 'Model request', title: 'Remove the duplicate discount', detail: 'edit("cart.ts", "return subtotal - discount")' },
      { actor: 'Harness → tool result', title: 'Edit allowed → file updated', detail: 'The edit succeeded. The behavior has not been verified yet.', revision: 'first-fix' },
      { actor: 'Model request', title: 'Check the behavior', detail: 'test("cart.test.ts")' },
      { actor: 'Harness → tool result', title: 'Test allowed → 1 passed, 1 failed', detail: 'Large discount: expected 0, received -10.', tests: 'failed' },
      { actor: 'Model request', title: 'Use the failed test to revise the fix', detail: 'edit("cart.ts", "return Math.max(0, subtotal - discount)")' },
      { actor: 'Harness → tool result', title: 'Edit allowed → file updated', detail: 'The total can no longer be negative. Verification is still needed.', revision: 'final' },
      { actor: 'Model request', title: 'Verify the second correction', detail: 'test("cart.test.ts")' },
      { actor: 'Harness → tool result', title: 'Test allowed → 2 passed', detail: 'Both specified cases pass. The fix is ready for review, not deployed.', tests: 'passed' },
    ],
  },
  background: {
    label: 'Background job',
    tools: 'Same project tools + job tracking',
    takeaway: 'The job continues without an open conversation. Completed does not mean deployed.',
    events: [
      { actor: 'Harness', title: 'Queued', detail: 'New run from the original buggy project. Same goal, model and project permissions.' },
      { actor: 'Harness', title: 'Running · reading files', detail: 'A worker starts the same read → edit → test loop. The user does not need to stay in the conversation.' },
      { actor: 'User', title: 'Close the conversation', detail: 'The user opens My tasks. The worker has read the files, applied the fix and is now running tests.' },
      { actor: 'Notification', title: 'Completed · ready for review', detail: 'Checkout fix ready for review. 2 tests passed.', revision: 'final', tests: 'passed' },
      { actor: 'User', title: 'Open the result', detail: 'Review the change and test results. Nothing has been deployed.' },
    ],
  },
  delegation: {
    label: 'Delegation',
    tools: 'Coordinator: read / edit / test · Investigators: read only',
    takeaway: 'Same LLM. Same objective. Different harness.',
    events: [
      { actor: 'Coordinator', title: 'Start from the original project', detail: 'Same model for every agent. Each has its own context and bounded permissions.' },
      { actor: 'Coordinator', title: 'Delegate two investigations', detail: 'Ask one agent to inspect cart.ts and another to inspect cart.test.ts. Both are read-only.' },
      { actor: 'Investigators → coordinator', title: 'Return findings', detail: 'Code: the discount is subtracted twice. Tests: totals must never be negative.', revision: 'initial' },
      { actor: 'Coordinator', title: 'Combine findings and request the fix', detail: 'Subtract the discount once and clamp the total to zero. Request an edit, then tests.' },
      { actor: 'Harness → tool result', title: 'Edit allowed → test allowed → 2 passed', detail: 'Only the coordinator can edit. This tiny task did not need multiple agents.', revision: 'final', tests: 'passed' },
    ],
  },
}

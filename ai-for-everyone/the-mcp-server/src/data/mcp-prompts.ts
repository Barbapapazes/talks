export const reviewPullRequestPrompt = {
  name: 'review_pull_request',
  description: 'Review a pull request for bugs and missing tests.',
  arguments: [
    { name: 'repository', description: 'GitHub repository in owner/name format.', required: true },
    { name: 'pull_request', description: 'Pull request number.', required: true },
  ],
}

export interface ReviewPullRequestArguments {
  repository: string
  pull_request: string
}

export const defaultReviewArguments: ReviewPullRequestArguments = {
  repository: 'acme/project-dashboard',
  pull_request: '17',
}

export function buildReviewMessage(args: ReviewPullRequestArguments) {
  return `Review pull request #${args.pull_request} in ${args.repository}. Check for bugs and missing tests. Ask for the diff if it is not provided.`
}

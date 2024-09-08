/**
 * Create the url for a question.
 *
 * Can be used to get data about the question.
 */
export function getQuestionUrl(baseUrl: string, talkSlug: string, questionSlug: string) {
  return `${baseUrl}/talks/${talkSlug}/${questionSlug}`
}

/**
 * Create the url to retrieve every answers.
 */
export function getAnswersUrl(baseUrl: string, talkSlug: string, questionSlug: string) {
  return `${baseUrl}/talks/${talkSlug}/${questionSlug}/answers`
}

/**
 * Create the url to answer a question.
 */
export function getAnswerQuestionUrl(baseUrl: string, questionId: string) {
  return `${baseUrl}/answer/${questionId}`
}

/**
 * Create the events channel for a question
 *
 * Can be used to subscribe to events about the question.
 */
export function getQuestionEventsChannel(questionId: string) {
  return `${questionId}/events`
}

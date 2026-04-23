declare module 'virtual:latest-articles' {
  type Article = import('./types/article').Article

  const articles: Article[]
  export default articles
}

declare module 'virtual:ai:*' {
  export const assistantHtmlFrames: string[]
  export const rawMarkdown: string
  export const tokenCount: number
}

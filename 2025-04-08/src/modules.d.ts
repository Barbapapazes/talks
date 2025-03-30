declare module 'virtual:latest-articles' {
  type Article = import('./types/article').Article

  const articles: Article[]
  export default articles
}

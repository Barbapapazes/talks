declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module 'virtual:latest-articles' {
  type Article = import('./types/article').Article

  const articles: Article[]
  export default articles
}

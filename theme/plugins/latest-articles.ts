import type { PluginOption } from 'vite'
import type { Article } from '../types/article'

export default function latestArticles() {
  const virtualModuleId = 'virtual:latest-articles'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return <PluginOption>{
    name: 'latest-articles',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        try {
          const articles = await fetch('https://soubiran.dev/meta.json').then(res => res.json() as Promise<Article[]>)

          // TODO: add types, lang, and description to meta.json

          const latestArticles = articles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .filter(article => !article.uri.startsWith('/fr/'))
            .slice(0, 4)

          return `export default ${JSON.stringify(latestArticles)}`
        }
        catch (error) {
          console.warn('Failed to fetch latest articles:', error)
          // Return empty array on failure
          return 'export default []'
        }
      }
    },
  }
}

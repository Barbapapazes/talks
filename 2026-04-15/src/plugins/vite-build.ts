import type { PluginOption, ResolvedConfig } from 'vite'; import fs from 'node:fs/promises'
import path from 'node:path'
import { transformerRemoveComments } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'

export default function viteFileSystem(): PluginOption {
  const virtualModulePrefix = 'virtual:vite-build:'

  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite-build',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
    },
    resolveId(id: string) {
      if (id.startsWith(virtualModulePrefix)) {
        return `\0${id}`
      }
    },
    async load(id: string) {
      if (id.startsWith(`\0${virtualModulePrefix}`)) {
        // Extract the file path from the virtual module ID
        // e.g., "virtual:vite-build:./src/some-file.txt" -> "./src/some-file.txt"
        const filePath = id.slice(`\0${virtualModulePrefix}`.length).replace(/:/g, '.')

        // Resolve the file path relative to the project root
        const resolvedPath = path.resolve(resolvedConfig.root, `./.vite-build/${filePath}`)

        // Read the file content
        const content = await fs.readFile(resolvedPath, 'utf-8')

        // Shiki isn't able to part it correctly.
        if (filePath.endsWith('index-CglLWvq0.js')) {
          return `export default ${JSON.stringify(`<pre><code>${content}</code></pre>`)};`
        }

        const highlightedContent = await codeToHtml(content, {
          lang: path.extname(filePath).slice(1),
          theme: 'github-light',
          includeExplanation: true,
          transformers: [
            transformerRemoveComments(),
          ],
          colorReplacements: {
            '#fff': 'transparent',
          },
        })

        // Return the file content as a JavaScript module export
        return `export default ${JSON.stringify(highlightedContent)};`
      }
    },
  }
}

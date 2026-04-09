import type { PluginOption, ResolvedConfig } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { codeToHtml } from 'shiki'
import { shikiOptions } from './_shiki'

const colonRegex = /:/g

export default function viteFileSystem(): PluginOption {
  const virtualModulePrefix = 'virtual:vite-file-system:'

  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite-file-system',
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
        // e.g., "virtual:vite-file-system:./src/some-file.txt" -> "./src/some-file.txt"
        const filePath = id.slice(`\0${virtualModulePrefix}`.length).replace(colonRegex, '.')

        // Resolve the file path relative to the project root
        const resolvedPath = path.resolve(resolvedConfig.root, `./.vite/${filePath}`)

        // Read the file content
        const content = await fs.readFile(resolvedPath, 'utf-8')

        const highlightedContent = await codeToHtml(content, {
          lang: path.extname(filePath).slice(1),
          ...shikiOptions,
        })

        // Return the file content as a JavaScript module export
        return `export default ${JSON.stringify(highlightedContent)};`
      }
    },
  }
}

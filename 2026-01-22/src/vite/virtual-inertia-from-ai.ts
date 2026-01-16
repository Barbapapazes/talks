import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { encoding_for_model } from 'tiktoken'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function virtualInertiaFromAI() {
  const virtualModuleId = 'virtual:inertia-from-ai'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'virtual-inertia-from-ai',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // Read the markdown file
        const contentPath = path.resolve(__dirname, '../content/inertia-from-ai.md')
        const rawMarkdown = fs.readFileSync(contentPath, 'utf-8')

        // Initialize tiktoken encoder
        const encoder = encoding_for_model('gpt-4')
        const tokens = encoder.encode(rawMarkdown)

        // Build incremental chunks (every ~10 tokens for smooth streaming effect)
        const tokensPerFrame = 10
        const chunks: string[] = []
        const textDecoder = new TextDecoder()

        // Reuse the same decoder for all chunks
        for (let i = 0; i <= tokens.length; i += tokensPerFrame) {
          const currentTokens = tokens.slice(0, Math.min(i + tokensPerFrame, tokens.length))
          const chunkBytes = encoder.decode(currentTokens)
          // Convert Uint8Array to string
          const chunk = typeof chunkBytes === 'string' ? chunkBytes : textDecoder.decode(chunkBytes)
          chunks.push(chunk)
        }

        // Free encoder after all decoding is done
        encoder.free()

        // Convert each chunk to HTML using markdown-it
        const md = new MarkdownIt()
        const assistantHtmlFrames = chunks.map(chunk => md.render(chunk))

        // Export the data
        return `export const assistantHtmlFrames = ${JSON.stringify(assistantHtmlFrames)};
export const rawMarkdown = ${JSON.stringify(rawMarkdown)};
export const tokenCount = ${tokens.length};`
      }
    },
  }
}

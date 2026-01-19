import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { encoding_for_model } from 'tiktoken'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function virtualInertiaFromAI() {
  const virtualModulePrefix = 'virtual:ai:'

  return {
    name: 'virtual-ai-content',
    resolveId(id: string) {
      if (id.startsWith(virtualModulePrefix)) {
        return `\0${id}`
      }
    },
    load(id: string) {
      if (id.startsWith(`\0${virtualModulePrefix}`)) {
        // Extract the file name from the virtual module ID
        // e.g., "virtual:ai:inertia-from-ai" -> "inertia-from-ai"
        const fileName = id.slice(`\0${virtualModulePrefix}`.length)

        // Read the markdown file
        const contentPath = path.resolve(__dirname, `../content/${fileName}.md`)

        // Check if file exists
        if (!fs.existsSync(contentPath)) {
          throw new Error(`Content file not found: ${contentPath}`)
        }

        const rawMarkdown = fs.readFileSync(contentPath, 'utf-8')

        // Initialize tiktoken encoder
        const encoder = encoding_for_model('gpt-4')
        const tokens = encoder.encode(rawMarkdown)

        // Build incremental chunks (every ~10 tokens for smooth streaming effect)
        // Each chunk contains progressively more content (cumulative) to simulate streaming
        const tokensPerFrame = 10
        const chunks: string[] = []
        const textDecoder = new TextDecoder()

        // Create cumulative frames: frame N contains all tokens from 0 to N*tokensPerFrame
        // This creates a streaming effect where each frame shows more content than the last
        for (let i = 0; i <= tokens.length; i += tokensPerFrame) {
          const currentTokens = tokens.slice(0, Math.min(i + tokensPerFrame, tokens.length))
          const chunkBytes = encoder.decode(currentTokens)
          // Tiktoken may return string or Uint8Array depending on version
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

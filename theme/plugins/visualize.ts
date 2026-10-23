import type { ResolvedSlidevOptions } from '@slidev/types'
import type { Plugin, Rollup } from 'vite'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from '@slidev/parser/fs'
import { build, normalizePath } from 'vite'
import { buildGraph } from './visualize/graph'

const clientRoot = fileURLToPath(new URL('./visualize', import.meta.url))

export default function visualize(options: ResolvedSlidevOptions): Plugin {
  let base = '/'
  let cache: ReturnType<typeof getGraph> | undefined
  const watched = new Set([options.entry])

  async function getGraph() {
    const data = await load({
      roots: options.roots,
      userRoot: options.userRoot,
      allowedRoots: [options.userWorkspaceRoot, ...options.roots],
    }, options.entry, undefined, options.mode)
    for (const file of Object.keys(data.markdownFiles))
      watched.add(file)
    const graph = buildGraph(data.slides, String(data.headmatter.title || data.slides[0]?.title || 'Talk visualization'), options.data.config.routerMode)
    for (const markdown of Object.values(data.markdownFiles)) {
      for (const error of markdown.errors || [])
        graph.diagnostics.push(`Markdown line ${error.row}: ${error.message}`)
    }
    return graph
  }

  return {
    name: 'talk-visualize',
    config() {
      return {
        resolve: { alias: [{ find: /^mermaid$/, replacement: createRequire(import.meta.url).resolve('mermaid') }] },
        optimizeDeps: { include: ['mermaid'] },
      }
    },
    configResolved(config) {
      base = config.base
    },
    configureServer(server) {
      const invalidate = (file: string) => {
        // Also retry failed imports when a new Markdown file appears.
        if (!watched.has(file) && !file.endsWith('.md'))
          return
        cache = undefined
        server.ws.send({ type: 'custom', event: 'talk-visualize:update' })
      }
      server.watcher.on('change', invalidate)
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
      server.httpServer?.once('close', () => {
        server.watcher.off('change', invalidate)
        server.watcher.off('add', invalidate)
        server.watcher.off('unlink', invalidate)
      })
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        const pathname = base !== '/' && url?.startsWith(base) ? `/${url.slice(base.length)}` : url
        if (pathname !== '/_visualize' && pathname !== '/_visualize/' && pathname !== '/_visualize/graph.json')
          return next()
        res.setHeader('Cache-Control', 'no-store')
        if (pathname === '/_visualize') {
          res.writeHead(302, { Location: `${base}_visualize/` })
          res.end()
          return
        }
        try {
          if (pathname.endsWith('/graph.json')) {
            cache ??= getGraph().catch((error) => {
              cache = undefined
              throw error
            })
            const graph = await cache
            server.watcher.add([...watched])
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(graph))
          }
          else {
            const html = await readFile(resolve(clientRoot, 'index.html'), 'utf8')
            const clientUrl = `${base}@fs/${normalizePath(resolve(clientRoot, 'client.ts'))}`
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(html.replace('./client.ts', clientUrl).replace('</head>', `<script type="module" src="${base}@vite/client"></script></head>`))
          }
        }
        catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
        }
      })
    },
    async generateBundle() {
      const graph = await getGraph()
      if (graph.diagnostics.length)
        this.error(`Talk visualization:\n${graph.diagnostics.join('\n')}`)
      // An isolated HTML entry avoids Slidev's presentation-specific transforms.
      const result = await build({
        configFile: false,
        root: clientRoot,
        base: `${base}_visualize/`,
        publicDir: false,
        logLevel: 'warn',
        build: { write: false },
      })
      const bundles = (Array.isArray(result) ? result : [result]) as Rollup.RollupOutput[]
      for (const bundle of bundles) {
        for (const file of bundle.output) {
          this.emitFile({ type: 'asset', fileName: `_visualize/${file.fileName}`, source: file.type === 'asset' ? file.source : file.code })
        }
      }
      this.emitFile({ type: 'asset', fileName: '_visualize/graph.json', source: JSON.stringify(graph) })
    },
  }
}

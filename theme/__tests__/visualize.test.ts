// @vitest-environment node
import type { ResolvedSlidevOptions } from '@slidev/types'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build, createServer } from 'vite'
import { describe, expect, it } from 'vitest'
import visualize from '../plugins/visualize'
import { buildGraph, formatTotalTiming, graphToMermaid } from '../plugins/visualize/graph'

function slide(title: string, frontmatter: Record<string, unknown> = {}) {
  return { title, frontmatter }
}

describe('talk graph', () => {
  it('uses unique IDs for repeated titles and connects linear slides', () => {
    const graph = buildGraph([slide('Same'), slide('Same'), slide('Last')])
    expect(graph.nodes.map(node => node.id)).toEqual(['slide_1', 'slide_2', 'slide_3'])
    expect(graph.edges).toEqual([
      { from: 'slide_1', to: 'slide_2', label: '' },
      { from: 'slide_2', to: 'slide_3', label: '' },
    ])
    expect(graph.diagnostics).toEqual([])
  })

  it('supports branches, cycles, and explicit terminal nodes', () => {
    const graph = buildGraph([
      slide('Start', { name: 'start', choices: ['branch', 'end'] }),
      slide('Branch', { name: 'branch', choices: ['start'] }),
      slide('End', { name: 'end', choices: [] }),
      slide('Unreachable'),
    ])
    expect(graph.edges).toEqual([
      { from: 'slide_1', to: 'slide_2', label: 'branch' },
      { from: 'slide_1', to: 'slide_3', label: 'end' },
      { from: 'slide_2', to: 'slide_1', label: 'start' },
    ])
    expect(graph.diagnostics).toEqual([])
  })

  it('reports duplicate names, unresolved targets, and invalid choices', () => {
    const graph = buildGraph([
      slide('A', { name: 'same', choices: ['same', 'missing'] }),
      slide('B', { name: 'same' }),
      slide('C', { choices: 'same' }),
    ])
    expect(graph.diagnostics.join('\n')).toContain('Duplicate slide name')
    expect(graph.diagnostics.join('\n')).toContain('is ambiguous')
    expect(graph.diagnostics.join('\n')).toContain('does not exist')
    expect(graph.diagnostics.join('\n')).toContain('must be an array')
  })

  it('sums slide timings in minutes across all branches without floating-point artifacts', () => {
    const graph = buildGraph([
      slide('A', { timing: 1.2, choices: ['end'] }),
      slide('B', { timing: '0.8' }),
      slide('C', { name: 'end', timing: 60.1, choices: [] }),
      slide('D', { timing: 'invalid' }),
      slide('E', { timing: -1 }),
      slide('F'),
    ])
    expect(formatTotalTiming(graph)).toBe('1h 2m 6s')
    expect(formatTotalTiming(buildGraph([]))).toBe('0m')
    expect(formatTotalTiming(buildGraph([slide('A', { timing: 0.1 }), slide('B', { timing: 0.2 })]))).toBe('18s')
  })

  it('encodes Mermaid labels and preserves group and status styling', () => {
    const graph = buildGraph([slide('"<script>alert(1)</script>', { group: 'end"]\nattack', ready: true, layout: 'recap', timing: 30 })])
    const text = graphToMermaid(graph)
    expect(text).not.toContain('<script>')
    expect(text).not.toContain('attack')
    expect(text).toContain('subgraph group_0')
    expect(text).toContain(':::recap')
    expect(text).toContain('class slide_1 ready')
  })
})

async function fixture(run: (root: string, options: ResolvedSlidevOptions) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), 'talk-visualize-'))
  await writeFile(join(root, 'slides.md'), '---\ntitle: Test talk\n---\n# First\n\n---\nsrc: ./imported.md\n---\n')
  await writeFile(join(root, 'imported.md'), '# Imported\n\n---\nchoices: []\n---\n# End\n')
  const options = {
    entry: join(root, 'slides.md'),
    userRoot: root,
    userWorkspaceRoot: root,
    roots: [root],
    mode: 'dev',
    data: { config: { routerMode: 'history' } },
  } as ResolvedSlidevOptions
  try {
    await run(root, options)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

it('serves on demand under a base path and invalidates imported slides', async () => {
  await fixture(async (root, options) => {
    const server = await createServer({ configFile: false, root, base: '/talk/', plugins: [visualize(options)], server: { port: 0 } })
    try {
      await server.listen()
      const address = server.httpServer!.address() as { port: number }
      const url = `http://localhost:${address.port}/talk/_visualize/`
      const page = await fetch(url).then(response => response.text())
      expect(page).toContain('/talk/@fs/')
      expect(page).toContain('/talk/@vite/client')
      const graph = await fetch(`${url}graph.json`).then(response => response.json())
      expect(graph.nodes.map((node: { title: string }) => node.title)).toEqual(['Test talk', 'Imported', 'End'])
      expect(JSON.stringify(graph)).not.toContain(root)
      await writeFile(join(root, 'imported.md'), '# Changed\n')
      server.watcher.emit('change', join(root, 'imported.md'))
      const updated = await fetch(`${url}graph.json`).then(response => response.json())
      expect(updated.nodes[1].title).toBe('Changed')
      const redirect = await fetch(url.slice(0, -1), { redirect: 'manual' })
      expect(redirect.headers.get('location')).toBe('/talk/_visualize/')
      await writeFile(join(root, 'imported.md'), '---\nchoices: [missing]\n---\n# Broken\n')
      server.watcher.emit('change', join(root, 'imported.md'))
      const broken = await fetch(`${url}graph.json`).then(response => response.json())
      expect(broken.diagnostics.join('\n')).toContain('does not exist')
      await writeFile(join(root, 'imported.md'), '# Fixed\n')
      server.watcher.emit('change', join(root, 'imported.md'))
      const fixed = await fetch(`${url}graph.json`).then(response => response.json())
      expect(fixed.diagnostics).toEqual([])
      expect(fixed.nodes[1].title).toBe('Fixed')
    }
    finally {
      await server.close()
    }
  })
}, 30000)

it('builds a standalone static page with bundled assets under a base path', async () => {
  await fixture(async (root, options) => {
    await writeFile(join(root, 'index.html'), '<html><body>Presentation</body></html>')
    await build({ configFile: false, root, base: '/talk/', plugins: [visualize(options)], logLevel: 'silent' })
    const html = await readFile(join(root, 'dist/_visualize/index.html'), 'utf8')
    expect(html).toContain('/talk/_visualize/assets/')
    expect(html).not.toContain('client.ts')
    expect(html).toContain('target="_blank" rel="noopener noreferrer"')
    const graph = JSON.parse(await readFile(join(root, 'dist/_visualize/graph.json'), 'utf8'))
    expect(graph.nodes).toHaveLength(3)
    expect(JSON.stringify(graph)).not.toContain(root)
  })
}, 120000)

it('fails production builds with unresolved choices', async () => {
  await fixture(async (root, options) => {
    await writeFile(join(root, 'index.html'), '<html><body>Presentation</body></html>')
    await writeFile(join(root, 'imported.md'), '---\nchoices: [missing]\n---\n# Broken\n')
    await expect(build({ configFile: false, root, plugins: [visualize(options)], logLevel: 'silent' })).rejects.toThrow('does not exist')
  })
})

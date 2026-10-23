import type { TalkGraph } from './graph'
import mermaid from 'mermaid'
import { formatTotalTiming, graphToMermaid } from './graph'
import './style.css'

function element<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T
}

const viewport = element('viewport')
const canvas = element('canvas')
const diagnostics = element('diagnostics')
const stats = element('stats')
let scale = 1
let x = 0
let y = 0
let width = 1
let height = 1
let revision = 0
let loading = false
let pending = false
let drag: { x: number, y: number, startX: number, startY: number } | undefined
let moved = false

mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'default', maxEdges: 10000, flowchart: { htmlLabels: true, curve: 'basis' } })

function transform() {
  canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
}

function fit() {
  scale = Math.min((viewport.clientWidth - 48) / width, (viewport.clientHeight - 48) / height, 1.5)
  scale = Math.max(0.01, scale)
  x = (viewport.clientWidth - width * scale) / 2
  y = (viewport.clientHeight - height * scale) / 2
  transform()
}

function zoom(factor: number, cx = viewport.clientWidth / 2, cy = viewport.clientHeight / 2) {
  const next = Math.min(8, Math.max(0.01, scale * factor))
  x = cx - (cx - x) * next / scale
  y = cy - (cy - y) * next / scale
  scale = next
  transform()
}

function showDiagnostics(messages: string[]) {
  diagnostics.replaceChildren()
  diagnostics.hidden = messages.length === 0
  if (!messages.length)
    return
  const heading = document.createElement('strong')
  heading.textContent = 'Graph diagnostics'
  const list = document.createElement('ul')
  for (const message of messages) {
    const item = document.createElement('li')
    item.textContent = message
    list.append(item)
  }
  diagnostics.append(heading, list)
}

async function refresh() {
  // Serialize Mermaid renders and repeat if a file changed during a request.
  if (loading) {
    pending = true
    return
  }
  loading = true
  try {
    const response = await fetch(new URL('graph.json', window.location.href), { cache: 'no-store' })
    const data = await response.json()
    if (!response.ok)
      throw new Error(data.error || `Graph request failed: ${response.status}`)
    const graph = data as TalkGraph
    document.title = `${graph.title} | Visualization`
    element('title').textContent = graph.title
    stats.textContent = `${graph.nodes.length} slides · ${graph.edges.length} connections · ${graph.nodes.filter(node => node.ready).length} ready · ${formatTotalTiming(graph)} total slide timing`
    showDiagnostics(graph.diagnostics)
    if (!graph.nodes.length) {
      canvas.replaceChildren()
      return
    }
    const { svg } = await mermaid.render(`talk_graph_${revision++}`, graphToMermaid(graph))
    canvas.innerHTML = svg
    const rendered = canvas.querySelector('svg')!
    const box = rendered.viewBox.baseVal
    width = box.width || 1
    height = box.height || 1
    rendered.setAttribute('width', String(width))
    rendered.setAttribute('height', String(height))
    rendered.style.maxWidth = 'none'
    const presentation = new URL('../', window.location.href)
    for (const node of graph.nodes) {
      const group = rendered.querySelector<SVGGElement>(`.node[id*="flowchart-${node.id}-"]`)
      if (!group)
        continue
      const target = new URL(graph.routerMode === 'hash' ? `#/${node.index + 1}` : String(node.index + 1), presentation)
      const anchor = document.createElementNS('http://www.w3.org/2000/svg', 'a')
      anchor.setAttribute('href', target.href)
      anchor.setAttribute('target', '_blank')
      anchor.setAttribute('rel', 'noopener noreferrer')
      anchor.setAttribute('aria-label', `Open slide ${node.index + 1} in a new tab: ${node.title}`)
      group.parentNode!.insertBefore(anchor, group)
      anchor.append(group)
    }
    fit()
  }
  catch (error) {
    showDiagnostics([error instanceof Error ? error.message : String(error)])
    stats.textContent = 'Could not update the graph. Fix the error and save to retry.'
  }
  finally {
    loading = false
    if (pending) {
      pending = false
      void refresh()
    }
  }
}

element('fit').addEventListener('click', fit)
element('zoom-in').addEventListener('click', () => zoom(1.25))
element('zoom-out').addEventListener('click', () => zoom(0.8))
viewport.addEventListener('wheel', (event) => {
  event.preventDefault()
  const rect = viewport.getBoundingClientRect()
  zoom(Math.exp(-event.deltaY * 0.002), event.clientX - rect.left, event.clientY - rect.top)
}, { passive: false })
viewport.addEventListener('pointerdown', (event) => {
  if (event.button !== 0)
    return
  drag = { x, y, startX: event.clientX, startY: event.clientY }
  moved = false
})
window.addEventListener('pointermove', (event) => {
  if (!drag)
    return
  const dx = event.clientX - drag.startX
  const dy = event.clientY - drag.startY
  moved ||= Math.abs(dx) + Math.abs(dy) > 4
  if (moved) {
    x = drag.x + dx
    y = drag.y + dy
    transform()
  }
})
window.addEventListener('pointerup', () => {
  drag = undefined
})
window.addEventListener('pointercancel', () => {
  drag = undefined
})
viewport.addEventListener('click', (event) => {
  if (moved) {
    event.preventDefault()
    event.stopPropagation()
  }
}, true)
viewport.addEventListener('keydown', (event) => {
  if (event.key === '+' || event.key === '=')
    zoom(1.25)
  else if (event.key === '-')
    zoom(0.8)
  else if (event.key === '0')
    fit()
})
window.addEventListener('resize', fit)
import.meta.hot?.on('talk-visualize:update', () => {
  void refresh()
})
void refresh()

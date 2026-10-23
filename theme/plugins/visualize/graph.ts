export interface GraphSlide {
  title?: string
  frontmatter: Record<string, unknown>
}

export interface GraphNode {
  id: string
  index: number
  title: string
  name?: string
  group?: string
  layout?: string
  timing?: number | string
  ready: boolean
  choices?: string[]
}

export interface TalkGraph {
  title: string
  routerMode: string
  nodes: GraphNode[]
  edges: { from: string, to: string, label: string }[]
  diagnostics: string[]
}

export function buildGraph(slides: GraphSlide[], title = 'Talk visualization', routerMode = 'history'): TalkGraph {
  const diagnostics: string[] = []
  const nodes = slides.map((slide, index): GraphNode => {
    const fm = slide.frontmatter
    const node: GraphNode = {
      id: `slide_${index + 1}`,
      index,
      title: slide.title || `Slide ${index + 1}`,
      ready: !!fm.ready,
    }
    for (const key of ['name', 'group', 'layout'] as const) {
      if (typeof fm[key] === 'string')
        node[key] = fm[key]
    }
    if (typeof fm.timing === 'string' || typeof fm.timing === 'number')
      node.timing = fm.timing
    if (Object.hasOwn(fm, 'choices')) {
      node.choices = []
      if (!Array.isArray(fm.choices) || fm.choices.some(choice => typeof choice !== 'string' || !choice))
        diagnostics.push(`Slide ${index + 1}: choices must be an array of non-empty slide names.`)
      else
        node.choices = fm.choices
    }
    return node
  })
  const named = new Map<string, GraphNode[]>()
  for (const node of nodes) {
    if (node.name)
      named.set(node.name, [...(named.get(node.name) || []), node])
  }
  for (const [name, matches] of named) {
    if (matches.length > 1)
      diagnostics.push(`Duplicate slide name "${name}" on slides ${matches.map(node => node.index + 1).join(', ')}.`)
  }
  const edges: TalkGraph['edges'] = []
  for (const node of nodes) {
    if (node.choices === undefined) {
      const next = nodes[node.index + 1]
      if (next)
        edges.push({ from: node.id, to: next.id, label: '' })
      continue
    }
    for (const choice of node.choices) {
      const targets = named.get(choice)
      if (targets?.length === 1)
        edges.push({ from: node.id, to: targets[0].id, label: choice })
      else
        diagnostics.push(`Slide ${node.index + 1}: choice "${choice}" ${targets ? 'is ambiguous' : 'does not exist'}.`)
    }
  }
  return { title, routerMode, nodes, edges, diagnostics }
}

export function formatTotalTiming(graph: TalkGraph) {
  const minutes = graph.nodes.reduce((total, node) => {
    const timing = Number(node.timing)
    return total + (Number.isFinite(timing) && timing > 0 ? timing : 0)
  }, 0)
  const seconds = Math.round(minutes * 60)
  const hours = Math.floor(seconds / 3600)
  const remainderMinutes = Math.floor(seconds % 3600 / 60)
  const remainderSeconds = seconds % 60
  return [
    hours ? `${hours}h` : '',
    remainderMinutes || !seconds ? `${remainderMinutes}m` : '',
    remainderSeconds ? `${remainderSeconds}s` : '',
  ].filter(Boolean).join(' ')
}

// Encode every character so labels cannot introduce Mermaid syntax or HTML.
function label(value: string) {
  return Array.from(value, char => `#${char.codePointAt(0)};`).join('')
}

export function graphToMermaid(graph: TalkGraph) {
  const lines = [
    'flowchart LR',
    'classDef main fill:#e1f5fe,stroke:#01579b,color:#102a43',
    'classDef choice fill:#fff3cd,stroke:#856404,color:#533f03',
    'classDef recap fill:#ede7f6,stroke:#6a1b9a,color:#45275c',
    'classDef ready stroke:#2e7d32,stroke-width:4px',
  ]
  const groups = new Map<string, GraphNode[]>()
  for (const node of graph.nodes)
    groups.set(node.group || '', [...(groups.get(node.group || '') || []), node])
  let groupIndex = 0
  for (const [group, nodes] of groups) {
    if (group)
      lines.push(`subgraph group_${groupIndex++}["${label(group)}"]`)
    for (const node of nodes) {
      const timing = node.timing === undefined ? '' : ` · ${node.timing}`
      const text = label(`#${node.index + 1} ${node.name || node.title}${timing}`)
      const style = node.layout === 'recap' ? 'recap' : node.choices?.length ? 'choice' : 'main'
      lines.push(`${node.id}["${text}"]:::${style}`)
      if (node.ready)
        lines.push(`class ${node.id} ready`)
    }
    if (group)
      lines.push('end')
  }
  for (const edge of graph.edges)
    lines.push(`${edge.from} --> ${edge.to}`)
  return lines.join('\n')
}

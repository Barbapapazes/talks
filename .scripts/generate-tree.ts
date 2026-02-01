import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'
import { execa } from 'execa'
import matter from 'gray-matter'
import { selectDeck } from './_utils.ts'

interface GraphNode {
  id: string
  index: number
  name: string | undefined
  title: string
  frontmatter: Record<string, any>
}

interface GraphEdge {
  from: string
  to: string
  label: string
}

interface Graph {
  filepath: string
  nodes: GraphNode[]
  edges: GraphEdge[]
}

function slugify(text: string | undefined): string {
  if (!text)
    return ''
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
}

async function generateTree() {
  // Get all decks
  const allDecks = await selectDeck()

  if (!allDecks.folder) {
    console.warn('No deck selected')
    return
  }

  // Read the selected deck's slides
  const deckPath = fileURLToPath(new URL(`../${allDecks.folder}/src`, import.meta.url))
  const slidesPath = join(deckPath, 'slides.md')
  const slidesContent = readFileSync(slidesPath, 'utf-8')

  // Check if it's a CYOA deck
  const globalFrontmatter = matter(slidesContent)
  if (!globalFrontmatter.data.chooseYourOwnAdventure) {
    throw new Error(`Deck "${allDecks.folder}" is not a Choose Your Own Adventure deck. The global frontmatter must include: chooseYourOwnAdventure: true`)
  }

  // Parse slides
  const parsed = parseSync(slidesContent, slidesPath)

  // Build nodes with validation
  const nodes: GraphNode[] = []
  const nameToNodeId = new Map<string, string[]>()

  for (const slide of parsed.slides) {
    const name = slide.frontmatter.name as string | undefined
    const title = slide.title || `Slide ${slide.index + 1}`
    const id = slugify(name || title)

    const node: GraphNode = {
      id,
      index: slide.index,
      name,
      title,
      frontmatter: slide.frontmatter,
    }

    nodes.push(node)

    // Track names for duplicate detection
    if (name) {
      if (!nameToNodeId.has(name)) {
        nameToNodeId.set(name, [])
      }
      nameToNodeId.get(name)!.push(id)
    }
  }

  // Check for duplicate names (strict mode)
  const duplicates = Array.from(nameToNodeId.entries())
    .filter(([_, ids]) => ids.length > 1)

  if (duplicates.length > 0) {
    const errors = duplicates.map(([name, ids]) =>
      `  - "${name}" appears in ${ids.length} slides (indices: ${ids.join(', ')})`,
    ).join('\n')
    throw new Error(`Duplicate slide names detected:\n${errors}`)
  }

  // Build edges from choices
  const edges: GraphEdge[] = []
  const unresolvedChoices: Array<{ from: string, choice: string }> = []

  for (const node of nodes) {
    const choices = node.frontmatter.choices

    if (!choices || !Array.isArray(choices))
      continue

    for (const choice of choices) {
      // Skip empty or non-string choices
      if (!choice || typeof choice !== 'string')
        continue

      // Find target node by name
      const targetIds = nameToNodeId.get(choice)

      if (!targetIds || targetIds.length === 0) {
        unresolvedChoices.push({ from: node.name || node.title, choice })
        continue
      }

      // In strict mode, we already validated no duplicates, so targetIds[0] is unique
      edges.push({
        from: node.id,
        to: targetIds[0],
        label: choice,
      })
    }
  }

  // Check for unresolved choices (strict mode)
  if (unresolvedChoices.length > 0) {
    const errors = unresolvedChoices.map(({ from, choice }) =>
      `  - From slide "${from}": choice "${choice}" does not exist`,
    ).join('\n')
    throw new Error(`Unresolved choices detected (choices that don't match any slide name):\n${errors}`)
  }

  // Build graph object
  const graph: Graph = {
    filepath: slidesPath,
    nodes,
    edges,
  }

  // Generate JSON file
  const jsonPath = join(deckPath, 'slides.graph.json')
  writeFileSync(jsonPath, JSON.stringify(graph, null, 2), 'utf-8')
  console.warn(`✓ Generated JSON graph: ${jsonPath}`)

  // Generate Mermaid flow text
  const mermaidLines = ['flowchart TD']

  // Add nodes
  for (const node of nodes) {
    const label = node.name || node.title
    const sanitizedId = node.id.replace(/\W/g, '_')
    mermaidLines.push(`  ${sanitizedId}["${label}"]`)
  }

  // Add edges
  for (const edge of edges) {
    const fromId = edge.from.replace(/\W/g, '_')
    const toId = edge.to.replace(/\W/g, '_')
    mermaidLines.push(`  ${fromId} --> ${toId}`)
  }

  const mermaidPath = join(deckPath, 'slides.graph.txt')
  writeFileSync(mermaidPath, `${mermaidLines.join('\n')}\n`, 'utf-8')
  console.warn(`✓ Generated Mermaid flow: ${mermaidPath}`)

  const svgPath = join(deckPath, 'slides.graph.svg')
  await execa('mmdc', ['-i', mermaidPath, '-o', svgPath], { stdio: 'inherit' })
  console.warn(`✓ Generated Mermaid SVG: ${svgPath}`)

  console.warn(`\nGraph statistics:`)
  console.warn(`  - Total slides: ${nodes.length}`)
  console.warn(`  - Total choices: ${edges.length}`)
  console.warn(`  - Slides with choices: ${nodes.filter(n => n.frontmatter.choices?.length > 0).length}`)
}

generateTree().catch(console.error)

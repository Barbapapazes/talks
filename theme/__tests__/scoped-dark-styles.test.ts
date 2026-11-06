import { describe, expect, it } from 'vitest'
import { compileStyle, parse } from 'vue/compiler-sfc'
import headerSource from '../components/Chat/ChatHeader.vue?raw'
import codeBlockSource from '../components/ui/code-block/CodeBlockContent.vue?raw'

describe('scoped dark styles', () => {
  it.each([
    ['chat logo', headerSource, '.i-logos-openai-icon', 'filter: brightness(0) invert(1)'],
    ['syntax tokens', codeBlockSource, '.syntax-token', 'color: var(--shiki-dark)'],
  ])('limits %s dark styles to the component target', (_, source, target, declaration) => {
    const { descriptor } = parse(source)
    const style = descriptor.styles.find(style => style.scoped)!
    const result = compileStyle({ source: style.content, filename: 'component.vue', id: 'data-v-test', scoped: true })

    expect(result.errors).toEqual([])
    expect(result.code.replace(/\s+/g, ' ')).toContain(`${target}[data-v-test] { ${declaration}; }`)
    expect(result.code).not.toMatch(/\.dark\s*\{/)
  })
})

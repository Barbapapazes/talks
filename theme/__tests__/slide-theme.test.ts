import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useCurrentTheme } from '../composables/useCurrentTheme'
import { useSlideTheme } from '../composables/useSlideTheme'

const { mockSlideContext } = vi.hoisted(() => ({
  mockSlideContext: {
    value: null as {
      $frontmatter: Record<string, unknown>
    } | null,
  },
}))

vi.mock('@slidev/client', async () => {
  const { reactive } = await import('vue')
  const slideContext = reactive({
    $frontmatter: reactive<Record<string, unknown>>({}),
  })

  mockSlideContext.value = slideContext

  return {
    useSlideContext: () => slideContext,
  }
})

describe('useSlideTheme', () => {
  const theme = useCurrentTheme()
  const slideTheme = useSlideTheme()

  beforeEach(() => {
    theme.clearCurrentTheme()
    for (const key of Object.keys(mockSlideContext.value!.$frontmatter))
      delete mockSlideContext.value!.$frontmatter[key]
  })

  it('uses the default theme when no current theme is selected', () => {
    expect(slideTheme.defaultTheme.value).toBe('default')
    expect(slideTheme.activeTheme.value).toBe('default')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('uses frontmatter defaultTheme when no current theme is selected', () => {
    mockSlideContext.value!.$frontmatter.defaultTheme = 'space'

    expect(slideTheme.defaultTheme.value).toBe('space')
    expect(slideTheme.activeTheme.value).toBe('space')
    expect(slideTheme.visualTheme.value).toBe('space')
  })

  it('uses the current theme when one is selected', () => {
    mockSlideContext.value!.$frontmatter.defaultTheme = 'space'
    theme.setCurrentTheme('space')

    expect(slideTheme.activeTheme.value).toBe('space')
    expect(slideTheme.visualTheme.value).toBe('space')
  })

  it('prefers the current theme over frontmatter defaultTheme', () => {
    mockSlideContext.value!.$frontmatter.defaultTheme = 'space'
    theme.setCurrentTheme('futuristic')

    expect(slideTheme.defaultTheme.value).toBe('space')
    expect(slideTheme.activeTheme.value).toBe('futuristic')
    expect(slideTheme.visualTheme.value).toBe('futuristic')
  })

  it('supports futuristic as a visual theme', () => {
    theme.setCurrentTheme('futuristic')

    expect(slideTheme.activeTheme.value).toBe('futuristic')
    expect(slideTheme.visualTheme.value).toBe('futuristic')
  })

  it('falls back to the default visual theme for unsupported theme ids', () => {
    theme.setCurrentTheme('mystery-theme')

    expect(slideTheme.activeTheme.value).toBe('mystery-theme')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('falls back to default when frontmatter defaultTheme is not defined or empty', () => {
    mockSlideContext.value!.$frontmatter.defaultTheme = '   '

    expect(slideTheme.defaultTheme.value).toBe('default')
    expect(slideTheme.activeTheme.value).toBe('default')
    expect(slideTheme.visualTheme.value).toBe('default')
  })
})

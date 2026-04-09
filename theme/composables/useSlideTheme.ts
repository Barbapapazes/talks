import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { SUPPORTED_SLIDE_THEMES } from '../contants'
import { useCurrentTheme } from './useCurrentTheme'

export type SupportedSlideTheme = (typeof SUPPORTED_SLIDE_THEMES)[number]

function normalizeThemeId(theme: unknown) {
  if (typeof theme !== 'string')
    return undefined

  const normalizedTheme = theme.trim().toLowerCase()
  return normalizedTheme || undefined
}

function isSupportedSlideTheme(theme: string): theme is SupportedSlideTheme {
  return SUPPORTED_SLIDE_THEMES.includes(theme as SupportedSlideTheme)
}

export function useSlideTheme() {
  const { currentTheme } = useCurrentTheme()
  const { $slidev } = useSlideContext()

  const defaultTheme = computed(() => {
    return normalizeThemeId(($slidev.configs as { defaultTheme?: string }).defaultTheme) ?? 'default'
  })

  const activeTheme = computed(() => {
    return normalizeThemeId(currentTheme.value) ?? defaultTheme.value
  })

  const visualTheme = computed<SupportedSlideTheme>(() => {
    return isSupportedSlideTheme(activeTheme.value) ? activeTheme.value : 'default'
  })

  return {
    defaultTheme,
    activeTheme,
    visualTheme,
  }
}

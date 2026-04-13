import { useSlideContext } from '@slidev/client'
import { computed, readonly, ref } from 'vue'
import { SUPPORTED_SLIDE_THEMES } from '../contants'

const currentTheme = ref<string>()
const isThemeSelectionBlocked = ref(false)

export type SupportedSlideTheme = (typeof SUPPORTED_SLIDE_THEMES)[number]
export type ThemedValueMap<T> = Record<string, T | false | undefined>
export type MaybeThemedValue<T> = T | ThemedValueMap<T>

function normalizeThemeId(theme: unknown) {
  if (typeof theme !== 'string')
    return undefined

  const normalizedTheme = theme.trim().toLowerCase()
  return normalizedTheme || undefined
}

function isSupportedSlideTheme(theme: string): theme is SupportedSlideTheme {
  return SUPPORTED_SLIDE_THEMES.includes(theme as SupportedSlideTheme)
}

export function useTheme() {
  const { $slidev } = useSlideContext()

  function setCurrentTheme(theme: string | null | undefined) {
    const normalizedTheme = theme?.trim()
    currentTheme.value = normalizedTheme || undefined
  }

  function clearCurrentTheme() {
    currentTheme.value = undefined
  }

  function blockThemeSelection() {
    isThemeSelectionBlocked.value = true
  }

  function unblockThemeSelection() {
    isThemeSelectionBlocked.value = false
  }

  function toggleThemeSelectionBlock() {
    isThemeSelectionBlocked.value = !isThemeSelectionBlocked.value
  }

  /**
   * Sync the currently effective theme to the DOM.
   *
   * Most CSS in the theme is driven by `html[data-theme="..."]`, so whenever
   * the effective theme changes we need to mirror it on the document element.
   *
   * By default this uses `activeTheme`, but callers can override it when they
   * want to force a specific value explicitly.
   */
  function syncThemeDocument(theme = activeTheme.value) {
    if (typeof document === 'undefined')
      return

    document.documentElement.setAttribute('data-theme', theme)
  }

  function isThemedValueMap<T>(value: unknown): value is ThemedValueMap<T> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  }

  const defaultTheme = computed(() => {
    return normalizeThemeId(($slidev.configs as { defaultTheme?: string }).defaultTheme) ?? 'default'
  })

  /**
   * The effective theme id for the current slide.
   *
   * This is the theme we actually use for theme-dependent behavior:
   * - resolving themed values like images or frontmatter options
   * - syncing `html[data-theme]`
   * - honoring the emergency "force default theme" lock
   *
   * `activeTheme` can therefore be any normalized theme id, even one that is
   * not part of `SUPPORTED_SLIDE_THEMES`.
   */
  const activeTheme = computed(() => {
    if (isThemeSelectionBlocked.value)
      return defaultTheme.value

    return normalizeThemeId(currentTheme.value) ?? defaultTheme.value
  })

  /**
   * The supported visual theme variant used by theme-specific UI styling.
   *
   * Unlike `activeTheme`, this is intentionally restricted to the themes for
   * which the theme package has explicit visual styles. If `activeTheme` points
   * to an unsupported/custom id, we gracefully fall back to `'default'` for the
   * visual layer while still preserving the original `activeTheme` value for
   * logical/theme-resolution purposes.
   */
  const visualTheme = computed<SupportedSlideTheme>(() => {
    return isSupportedSlideTheme(activeTheme.value) ? activeTheme.value : 'default'
  })

  function resolveThemeValue<T>(value: MaybeThemedValue<T> | undefined): T | undefined {
    if (value === undefined)
      return undefined

    if (!isThemedValueMap<T>(value))
      return value

    const themedValue = value[activeTheme.value]

    if (themedValue === false) // Special case to allow explicitly disabling a value for a theme
      return undefined

    const defaultValue = value.default
    return themedValue ?? (defaultValue === false ? undefined : defaultValue)
  }

  return {
    currentTheme: readonly(currentTheme),
    isThemeSelectionBlocked: readonly(isThemeSelectionBlocked),
    setCurrentTheme,
    clearCurrentTheme,
    blockThemeSelection,
    unblockThemeSelection,
    toggleThemeSelectionBlock,
    syncThemeDocument,
    defaultTheme,
    activeTheme,
    visualTheme,
    isThemedValueMap,
    resolveThemeValue,
  }
}

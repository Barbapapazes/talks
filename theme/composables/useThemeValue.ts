import { useSlideTheme } from './useSlideTheme'

export type ThemedValueMap<T> = Record<string, T>
export type MaybeThemedValue<T> = T | ThemedValueMap<T>

// TODO: merge with other theme-related composables into a single useTheme composable
export function useThemeValue() {
  const { activeTheme } = useSlideTheme()

  function isThemedValueMap<T>(value: unknown): value is ThemedValueMap<T> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  }

  function resolveThemeValue<T>(value: MaybeThemedValue<T> | undefined): T | undefined {
    if (value === undefined)
      return undefined

    if (value === false) {
      return undefined
    }

    if (!isThemedValueMap<T>(value))
      return value

    return value[activeTheme.value] || value.default
  }

  return {
    isThemedValueMap,
    resolveThemeValue,
  }
}

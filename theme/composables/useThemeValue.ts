import { useCurrentTheme } from './useCurrentTheme'

export type ThemedValueMap<T> = Record<string, T>
export type MaybeThemedValue<T> = T | ThemedValueMap<T>

export function useThemeValue() {
  const { currentTheme } = useCurrentTheme()

  function isThemedValueMap<T>(value: unknown): value is ThemedValueMap<T> {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  }

  function resolveThemeValue<T>(value: MaybeThemedValue<T> | undefined): T | undefined {
    if (value === undefined)
      return undefined

    if (!isThemedValueMap<T>(value))
      return value

    if (!currentTheme.value)
      return value.default

    return value[currentTheme.value] ?? value.default
  }

  return {
    isThemedValueMap,
    resolveThemeValue,
  }
}

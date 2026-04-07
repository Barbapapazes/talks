import { readonly, ref } from 'vue'

const currentTheme = ref<string>()

export function useCurrentTheme() {
  function setCurrentTheme(theme: string | null | undefined) {
    const normalizedTheme = theme?.trim()
    currentTheme.value = normalizedTheme || undefined
  }

  function clearCurrentTheme() {
    currentTheme.value = undefined
  }

  return {
    currentTheme: readonly(currentTheme),
    setCurrentTheme,
    clearCurrentTheme,
  }
}

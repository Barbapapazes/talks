<script lang="ts" setup>
import { computed } from 'vue'
import { useTheme } from './composables/useTheme'

const {
  activeTheme,
  isThemeSelectionBlocked,
  syncThemeDocument,
  toggleThemeSelectionBlock,
} = useTheme()

const title = computed(() => {
  return isThemeSelectionBlocked.value
    ? 'Restore ChooseTheme Theme'
    : 'Force Default Theme'
})

function onClick() {
  toggleThemeSelectionBlock()
  syncThemeDocument(activeTheme.value)
}
</script>

<template>
  <div class="w-1px opacity-10 bg-current m-1 lg:m-2"></div>
  <button class="slidev-icon-btn" :title="title" @click="onClick">
    <div class="i-carbon:bee" />
  </button>
</template>

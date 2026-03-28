<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'

interface ProgressiveListProps {
  items: string[]
}

const props = defineProps<ProgressiveListProps>()

const { $clicks } = useSlideContext()

const inlineCodeClass = 'font-mono text-[0.9em] rounded bg-black/5 dark:bg-white/10 px-1 py-0.5'

// const htmlEscapeMap: Record<string, string> = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
// }

// function escapeHtml(text: string) {
//   return text.replace(/[&<>"']/g, char => htmlEscapeMap[char])
// }

function formatItem(text: string) {
  return text.replace(/`([^`]+)`/g, `<code class="${inlineCodeClass}">$1</code>`)
  // return escapeHtml(text).replace(/`([^`]+)`/g, `<code class="${inlineCodeClass}">$1</code>`)
}
</script>

<template>
  <div class="font-semibold text-xl leading-10">
    <div
      v-for="(item, index) in props.items"
      :key="`${index}-${item}`"
      v-click
      data-progressive-list-item
      :class="{
        ['opacity-20']: index < props.items.length - 1 && $clicks > index + 1 && $clicks <= props.items.length,
      }"
      v-html="formatItem(item)"
    />
  </div>
</template>

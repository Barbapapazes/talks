<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import Icon from './Icon.vue'

interface ProgressiveListItem {
  label: string
  icon?: string
}

interface ProgressiveListProps {
  items: (string | ProgressiveListItem)[]
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
      :key="`${index}-${typeof item === 'string' ? item : item.label}`"
      v-click
      data-progressive-list-item
      :class="{
        'flex items-center gap-2': typeof item !== 'string' && !!item.icon,
        ['opacity-20']: index < props.items.length - 1 && $clicks > index + 1 && $clicks <= props.items.length,
      }"
    >
      <template v-if="typeof item === 'string'">
        <span v-html="formatItem(item)" />
      </template>
      <template v-else>
        <Icon v-if="item.icon" :name="item.icon" class="size-6 shrink-0" />
        <span v-html="formatItem(item.label)" />
      </template>
    </div>
  </div>
</template>

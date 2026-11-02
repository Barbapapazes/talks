<script setup lang="ts" generic="T extends { id: string, revealAt?: number, actionLabel?: string }">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  items: T[]
  step?: number
}>(), { step: 0 })

const emit = defineEmits<{
  select: [item: T]
}>()

defineSlots<{
  default: (props: { item: T }) => any
}>()

const visibleItems = computed(() => props.items.filter(item => (item.revealAt ?? 0) <= props.step))
</script>

<template>
  <section
    class="not-content flex min-h-0 flex-col gap-4 rounded-md border border-neutral-200 bg-neutral-100 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
    :aria-label="title"
    @click.stop
    @keydown.enter.stop
    @keydown.space.stop
  >
    <div class="text-sm text-neutral-500 font-semibold dark:text-neutral-400">
      {{ title }}
    </div>
    <ul class="min-h-0 flex grow flex-col gap-3 overflow-auto">
      <li v-for="item in visibleItems" :key="item.id" class="flex items-center gap-4">
        <div class="min-w-0 grow overflow-auto">
          <slot :item="item" />
        </div>
        <button
          v-if="item.actionLabel"
          type="button"
          class="shrink-0 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600 font-semibold transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          @click="emit('select', item)"
        >
          {{ item.actionLabel }}
        </button>
      </li>
    </ul>
  </section>
</template>

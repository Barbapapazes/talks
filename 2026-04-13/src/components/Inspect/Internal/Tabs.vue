<script lang="ts" setup>
import { computed } from 'vue'

interface TabItem {
  name: string
  active?: boolean
  disabled?: boolean
}

const props = defineProps<{
  items: (string | TabItem)[]
}>()

const emits = defineEmits<{
  select: [name: string]
}>()

const normalizedItems = computed(() => props.items.map((item) => {
  if (typeof item === 'string') {
    return {
      name: item,
      active: false,
      disabled: true,
    }
  }

  return {
    name: item.name,
    active: item.active ?? false,
    disabled: item.disabled ?? false,
  }
}))

function onSelect(item: { name: string, disabled: boolean }) {
  if (item.disabled)
    return

  emits('select', item.name)
}
</script>

<template>
  <div class="flex flex-row gap-2 text-xs px-4 bg-neutral-800 font-medium">
    <div
      v-for="item in normalizedItems"
      :key="item.name"
    >
      <button
        type="button"
        class="border-b-2 px-2 py-2 transition-colors"
        :class="{
          'text-violet-500 border-violet-500': item.active,
          'border-transparent text-neutral-200 hover:text-white hover:border-neutral-500': !item.active && !item.disabled,
          'border-transparent text-neutral-500 cursor-not-allowed': item.disabled,
        }"
        @click="onSelect(item)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

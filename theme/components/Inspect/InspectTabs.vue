<script lang="ts" setup>
interface TabItem {
  name: string
  active?: boolean
  disabled?: boolean
}

const props = defineProps<{
  items: TabItem[]
}>()

const emits = defineEmits<{
  select: [name: string]
}>()

function onSelect(item: TabItem) {
  if (item.disabled)
    return

  emits('select', item.name)
}
</script>

<template>
  <div class="flex flex-row gap-2 text-xs px-4 bg-neutral-800 font-medium" role="tablist">
    <div
      v-for="item in props.items"
      :key="item.name"
    >
      <button
        type="button"
        role="tab"
        :aria-selected="item.active ?? false"
        :disabled="item.disabled"
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

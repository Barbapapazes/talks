<script lang="ts" setup>
import type { ExplainedVisuallyFileSystemItem } from './types'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = withDefaults(defineProps<{
  items: ExplainedVisuallyFileSystemItem[]
  defaultExpanded?: string[]
}>(), {
  defaultExpanded: () => [],
})

const emits = defineEmits<{
  select: [ExplainedVisuallyFileSystemItem]
}>()

function onSelect(item: ExplainedVisuallyFileSystemItem) {
  emits('select', item)
}
</script>

<template>
  <ExplainedVisuallyBox class="w-50 p-2">
    <Tree
      name="FileSystem"
      :items="props.items"
      :default-expanded="props.defaultExpanded"
      variant="plain"
      class="mt-1"
      @select="onSelect"
    />
  </ExplainedVisuallyBox>
</template>

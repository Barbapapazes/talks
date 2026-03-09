<script lang="ts" setup>
import ViteExplainedVisuallyBox from './ViteExplainedVisuallyBox.vue'

interface FileSystemItem {
  title: string
  icon?: string
  iconOpened?: string
  children?: FileSystemItem[]
}
const props = defineProps<{
  items: FileSystemItem[]
}>()
const emits = defineEmits<{
  select: [FileSystemItem]
}>()

function onSelect(item: FileSystemItem) {
  emits('select', item)
}
</script>

<template>
  <ViteExplainedVisuallyBox class="p-2 w-50">
    <Tree
      name="FileSystem"
      :items="props.items"
      :default-expanded="['src']"
      variant="plain"
      class="mt-1"
      @select="onSelect"
    />
  </ViteExplainedVisuallyBox>
</template>

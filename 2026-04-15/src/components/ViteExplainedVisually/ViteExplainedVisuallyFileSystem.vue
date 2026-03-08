<script lang="ts" setup>
import { TreeItem, TreeRoot } from 'reka-ui'
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
  fileClick: [string]
}>()

function onClick(file: string) {
  emits('fileClick', file)
}
</script>

<template>
  <ViteExplainedVisuallyBox class="p-2 w-50">
    <div class="font-semibold text-neutral-500 text-sm">
      FileSystem
    </div>
    <!-- TODO: extract fs -->
    <TreeRoot
      v-slot="{ flattenItems }"
      :items="props.items"
      :get-key="(item) => item.title"
      :default-expanded="['src']"
      class="mt-1"
    >
      <TreeItem
        v-for="item in flattenItems"
        v-slot="{ isExpanded }"
        :key="item._id"
        v-bind="item.bind"
        class="flex flex-row items-center gap-2"
        :style="{ 'padding-left': `${item.level - 0.5}rem` }"
        @click="onClick(item.value.title)"
      >
        <template v-if="item.hasChildren">
          <div
            v-if="!isExpanded"
            class="size-5"
            :class="item.value.icon || 'i-vscode-icons-default-folder'"
          />
          <div
            v-else
            class="size-5"
            :class="item.value.iconOpened || 'i-vscode-icons-default-folder-opened'"
          />
        </template>
        <div
          v-else
          class="size-5"
          :class="item.value.icon || 'i-vscode-icons-default-file'"
        />
        <div>
          {{ item.value.title }}
        </div>
      </TreeItem>
    </TreeRoot>
  </ViteExplainedVisuallyBox>
</template>

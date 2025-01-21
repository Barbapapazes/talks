<script setup lang="ts">
import { TreeItem, TreeRoot } from 'reka-ui'

interface Item {
  id?: string
  title: string
  icon?: string
  iconOpened?: string
  children?: Item[]
}

interface TreeProps {
  name?: string
  items: Item[]
  defaultExpanded?: string[]
}

const props = defineProps<TreeProps>()
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems }"
    class="not-content list-none select-none flex flex-col gap-0.5 bg-neutral-800 rounded-md text-xs font-light p-2"
    :items="props.items"
    :get-key="(item) => item.id || item.title"
    :default-expanded="props.defaultExpanded"
  >
    <h2 class="mb-2 font-semibold text-sm">
      {{ props.name ?? 'Directory Structure' }}
    </h2>
    <TreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="flex flex-row items-center gap-1"
    >
      <template v-if="item.hasChildren">
        <Icon
          v-if="!isExpanded"
          :name="item.value.icon || 'i-vscode-icons-default-folder'"
          class="size-3"
        />
        <Icon
          v-else
          :name="item.value.iconOpened || 'i-vscode-icons-default-folder-opened'"
          class="size-3"
        />
      </template>
      <Icon
        v-else
        :name="item.value.icon || 'i-vscode-icons-default-file'"
        class="size-3"
      />
      <div>
        {{ item.value.title }}
      </div>
    </TreeItem>
  </TreeRoot>
</template>

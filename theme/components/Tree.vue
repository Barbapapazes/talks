<script setup lang="ts">
import { TreeItem, TreeRoot } from 'reka-ui'
import { computed } from 'vue'
import Icon from './Icon.vue'

export interface TreeDataItem {
  id?: string
  title: string
  icon?: string
  iconOpened?: string
  children?: TreeDataItem[]
  [key: string]: unknown
}

interface TreeProps {
  name?: string
  items: TreeDataItem[]
  defaultExpanded?: string[]
  getKey?: (item: TreeDataItem) => string
  variant?: 'panel' | 'plain'
}

const props = withDefaults(defineProps<TreeProps>(), {
  name: 'Directory Structure',
  defaultExpanded: () => [],
  variant: 'panel',
})

const emit = defineEmits<{
  select: [item: TreeDataItem]
}>()

const folderIcons: Record<string, string> = {
  src: 'i-vscode-icons-folder-type-src',
  dist: 'i-vscode-icons-folder-type-dist',
  public: 'i-vscode-icons-folder-type-public',
  assets: 'i-vscode-icons-folder-type-asset',
  asset: 'i-vscode-icons-folder-type-asset',
  images: 'i-vscode-icons-folder-type-images',
  image: 'i-vscode-icons-folder-type-images',
  img: 'i-vscode-icons-folder-type-images',
  docs: 'i-vscode-icons-folder-type-docs',
  config: 'i-vscode-icons-folder-type-config',
  api: 'i-vscode-icons-folder-type-api',
  test: 'i-vscode-icons-folder-type-test',
  tests: 'i-vscode-icons-folder-type-test',
  __tests__: 'i-vscode-icons-folder-type-test',
  types: 'i-vscode-icons-folder-type-typescript',
  typescript: 'i-vscode-icons-folder-type-typescript',
}

const expandedFolderIcons: Record<string, string> = {
  src: 'i-vscode-icons-folder-type-src-opened',
  dist: 'i-vscode-icons-folder-type-dist-opened',
  public: 'i-vscode-icons-folder-type-public-opened',
  assets: 'i-vscode-icons-folder-type-asset-opened',
  asset: 'i-vscode-icons-folder-type-asset-opened',
  images: 'i-vscode-icons-folder-type-images-opened',
  image: 'i-vscode-icons-folder-type-images-opened',
  img: 'i-vscode-icons-folder-type-images-opened',
  docs: 'i-vscode-icons-folder-type-docs-opened',
  config: 'i-vscode-icons-folder-type-config-opened',
  api: 'i-vscode-icons-folder-type-api-opened',
  test: 'i-vscode-icons-folder-type-test-opened',
  tests: 'i-vscode-icons-folder-type-test-opened',
  __tests__: 'i-vscode-icons-folder-type-test-opened',
  types: 'i-vscode-icons-folder-type-typescript-opened',
  typescript: 'i-vscode-icons-folder-type-typescript-opened',
}

const exactFileIcons: Record<string, string> = {
  'package.json': 'i-vscode-icons-file-type-npm',
  'package-lock.json': 'i-vscode-icons-file-type-npm',
  'pnpm-lock.yaml': 'i-vscode-icons-file-type-light-pnpm',
  'yarn.lock': 'i-vscode-icons-file-type-yarn',
  'bun.lock': 'i-vscode-icons-file-type-bun',
  'bun.lockb': 'i-vscode-icons-file-type-bun',
  '.npmrc': 'i-vscode-icons-file-type-npm',
  '.editorconfig': 'i-vscode-icons-file-type-editorconfig',
  '.eslintrc': 'i-vscode-icons-file-type-eslint',
  '.eslintignore': 'i-vscode-icons-file-type-eslint',
  '.gitignore': 'i-vscode-icons-file-type-git',
  '.gitattributes': 'i-vscode-icons-file-type-git',
  '.env': 'i-vscode-icons-file-type-dotenv',
  '.env.example': 'i-vscode-icons-file-type-dotenv',
}

const fileExtensionIcons: Record<string, string> = {
  '.ts': 'i-vscode-icons-file-type-typescript',
  '.tsx': 'i-vscode-icons-file-type-typescript',
  '.mts': 'i-vscode-icons-file-type-typescript',
  '.cts': 'i-vscode-icons-file-type-typescript',
  '.js': 'i-vscode-icons-file-type-js',
  '.jsx': 'i-vscode-icons-file-type-js',
  '.mjs': 'i-vscode-icons-file-type-js',
  '.cjs': 'i-vscode-icons-file-type-js',
  '.json': 'i-vscode-icons-file-type-json',
  '.md': 'i-vscode-icons-file-type-markdown',
  '.mdx': 'i-vscode-icons-file-type-markdown',
  '.py': 'i-vscode-icons-file-type-python',
  '.ico': 'i-vscode-icons-file-type-favicon',
  '.html': 'i-vscode-icons-file-type-html',
  '.css': 'i-vscode-icons-file-type-css',
  '.scss': 'i-vscode-icons-file-type-scss',
  '.sass': 'i-vscode-icons-file-type-scss',
  '.less': 'i-vscode-icons-file-type-css',
  '.yml': 'i-vscode-icons-file-type-light-yaml',
  '.yaml': 'i-vscode-icons-file-type-light-yaml',
  '.vue': 'i-vscode-icons-file-type-vue',
  '.jpg': 'i-vscode-icons-file-type-image',
  '.jpeg': 'i-vscode-icons-file-type-image',
  '.png': 'i-vscode-icons-file-type-image',
  '.gif': 'i-vscode-icons-file-type-image',
  '.webp': 'i-vscode-icons-file-type-image',
  '.avif': 'i-vscode-icons-file-type-image',
  '.svg': 'i-vscode-icons-file-type-image',
}

function normalizeTitle(title: string) {
  return title.trim().toLowerCase()
}

function getFileExtension(title: string) {
  const normalizedTitle = normalizeTitle(title)
  const lastDotIndex = normalizedTitle.lastIndexOf('.')

  if (lastDotIndex <= 0) {
    return ''
  }

  return normalizedTitle.slice(lastDotIndex)
}

function inferFileIcon(item: TreeDataItem) {
  const title = normalizeTitle(item.title)

  if (exactFileIcons[title]) {
    return exactFileIcons[title]
  }

  if (title.startsWith('vite.config.')) {
    return 'i-vscode-icons-file-type-vite'
  }

  if (title.startsWith('tsconfig.') && title.endsWith('.json')) {
    return 'i-vscode-icons-file-type-tsconfig'
  }

  if (title.startsWith('eslint.config.') || title.startsWith('.eslintrc.')) {
    return 'i-vscode-icons-file-type-eslint'
  }

  if (title.startsWith('uno.config.')) {
    return 'i-vscode-icons-file-type-unocss'
  }

  if (title.startsWith('tailwind.config.')) {
    return 'i-vscode-icons-file-type-tailwind'
  }

  return fileExtensionIcons[getFileExtension(title)] ?? 'i-vscode-icons-default-file'
}

function getFolderIcon(item: TreeDataItem, isExpanded: boolean) {
  if (isExpanded) {
    return expandedFolderIcons[item.title] ?? item.iconOpened ?? item.icon ?? 'i-vscode-icons-default-folder-opened'
  }

  return folderIcons[item.title] ?? item.icon ?? 'i-vscode-icons-default-folder'
}

function getFileIcon(item: TreeDataItem) {
  return item.icon ?? inferFileIcon(item)
}

function getKey(item: TreeDataItem) {
  return props.getKey?.(item) ?? item.id ?? item.title
}

function onSelect(item: TreeDataItem) {
  emit('select', item)
}

const classes = computed(() => {
  if (props.variant === 'plain') {
    return {
      root: 'select-none flex flex-col not-content list-none gap-0.5',
      title: 'mb-1 text-sm font-semibold text-neutral-500',
      item: 'flex flex-row items-center gap-2',
      icon: 'size-5',
    }
  }

  return {
    root: 'select-none flex flex-col p-2 not-content list-none gap-0.5 bg-neutral-800 rounded-md',
    title: 'mb-2 text-sm font-semibold',
    item: 'flex flex-row items-center gap-1',
    icon: 'size-3',
  }
})
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems }"
    :items="props.items"
    :get-key="getKey"
    :default-expanded="props.defaultExpanded"
    :class="classes.root"
  >
    <h2 v-if="props.name" :class="classes.title">
      {{ props.name }}
    </h2>

    <TreeItem
      v-for="item in flattenItems"
      :key="item._id"
      v-slot="{ isExpanded }"
      v-bind="item.bind"
      :class="classes.item"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      @click="onSelect(item.value)"
    >
      <template v-if="item.hasChildren">
        <Icon
          v-if="!isExpanded"
          :name="getFolderIcon(item.value, false)"
          :class="classes.icon"
        />
        <Icon
          v-else
          :name="getFolderIcon(item.value, true)"
          :class="classes.icon"
        />
      </template>

      <Icon
        v-else
        :name="getFileIcon(item.value)"
        :class="classes.icon"
      />

      <div>
        {{ item.value.title }}
      </div>
    </TreeItem>
  </TreeRoot>
</template>

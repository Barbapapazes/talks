<script lang="ts" setup>
import indexJs from 'virtual:vite-build:index-CglLWvq0:js'
import indexHtml from 'virtual:vite-build:index:html'
import { ref } from 'vue'

const items = [
  {
    title: 'dist',
    children: [
      {
        title: 'index.html',
      },
      {
        title: 'assets',
        children: [
          { title: 'image-DNpSpoYj.jpg' },
          { title: 'index-CglLWvq0.js' },
        ],
      },
    ],
  },
]

const fileContents: Record<string, string> = {
  'index.html': indexHtml,
  'index-CglLWvq0.js': indexJs,
}
const selectedFile = ref<{ file: string, code: string } | null>(null)
function onSelect(item: any) {
  const content = fileContents[item.title]

  if (content) {
    selectedFile.value = { file: item.title, code: content }
  }
  else {
    selectedFile.value = null
  }
}
</script>

<template>
  <Tree
    name="Vite Build Output"
    :items="items"
    :default-expanded="['dist', 'assets']"
    variant="plain"
    @select="onSelect"
  />

  <Modal
    :open="selectedFile !== null"
    :title="selectedFile ? `File ${selectedFile.file}` : undefined"
    @update:open="() => selectedFile = null"
  >
    <div v-if="selectedFile" class="min-h-0 flex-1 overflow-auto p-4" v-html="selectedFile.code" />
  </Modal>
</template>

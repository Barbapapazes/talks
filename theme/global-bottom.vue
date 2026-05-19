<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => (currentSlideRoute.value.meta.slide as { frontmatter: any }).frontmatter)
const isReady = computed(() => frontmatter.value.ready === true)
const group = computed(() => frontmatter.value.group)
const name = computed(() => frontmatter.value.name)
</script>

<template>
  <div v-if="name" class="absolute z-50 left-1 bottom-1 flex flex-row items-center gap-1 text-[0.5rem] text-white/50 font-light mix-blend-difference">
    <span v-if="!isReady">NOT READY</span>
    <div class="flex flex-row items-center gap-1">
      <template v-if="group">
        <span>{{ group }}</span>
        <span>-</span>
      </template>
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { computed } from 'vue';

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => (currentSlideRoute.value.meta.slide as { frontmatter: any }).frontmatter)
const group = computed(() => frontmatter.value.group)
const name = computed(() => frontmatter.value.name)
</script>

<template>
  <div class="absolute z-50 left-1 bottom-1 flex flex-row gap-1 text-[0.5rem] text-white/50 font-light mix-blend-difference">
    <template v-if="group">
      <span>{{ group }}</span>
      <span>-</span>
    </template>
    <span v-if="name">{{ name }}</span>
  </div>
</template>

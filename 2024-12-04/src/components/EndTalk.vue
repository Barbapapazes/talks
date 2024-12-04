<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { go, slides } = useNav()

const endSlide = computed(() => {
  return slides.value.find(s => (s.meta.slide as any).frontmatter.end)
})
</script>

<template>
  <div class="cursor-pointer" @click="go(endSlide.no)">
    Vers la fin du talk
  </div>
</template>

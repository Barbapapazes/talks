<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { go, slides } = useNav()

const blueSlide = computed(() => {
  return slides.value.find(s => (s.meta.slide as any).frontmatter.pill === 'blue')
})

const redSlide = computed(() => {
  return slides.value.find(s => (s.meta.slide as any).frontmatter.pill === 'red')
})
</script>

<template>
  <div class="grid grid-cols-2 gap-16 items-center h-full">
    <Card
      class="flex flex-col items-center gap-2 text-center cursor-pointer bg-blue-500/10"
      @click="go(blueSlide.no)"
    >
      <span>Vous prenez la pilule bleue,</span>

      <span
        class="op-60"
      >
        le talk se termine.
      </span>
    </Card>

    <Card
      class="flex flex-col items-center gap-2 text-center cursor-pointer bg-red-500/10"
      @click="go(redSlide.no)"
    >
      <span>Vous prenez la pilule rouge,</span>

      <span class="op-60">on plonge dans Cloudflare.</span>
    </Card>
  </div>
</template>

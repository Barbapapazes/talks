<script lang="ts" setup>
import { onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { computed, ref } from 'vue'

interface ChoicesProps {
  img?: string
}
const props = defineProps<ChoicesProps>()

const { $frontmatter } = useSlideContext()
const { slides, go } = useNav()

const choices = computed(() => {
  return slides.value.filter(slide => $frontmatter.choices.includes(slide.meta.name))
})
</script>

<template>
  <div class="h-full slidev-layout grid grid-cols-3 gap-4 items-center choices">
    <!-- TODO: create a dedicated component in the theme -->
    <img v-if="props.img" :src="props.img" alt="Presentation Image" class="absolute top-0 left-0 w-full h-full object-cover">

    <!-- TODO: show the Inalia QR code -->

    <Card v-for="slide in choices" :key="slide.meta.name" class="relative">
      {{ slide.meta.name }}

      <!-- TODO: add a description in each slide's frontmatter and display it here -->
      <button class="absolute inset-0" @click="go(slide.no)" />
    </Card>
  </div>
</template>

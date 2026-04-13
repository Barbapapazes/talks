<script setup lang="ts">
import type { MaybeThemedValue } from '../composables/useTheme'
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

interface BackgroundImageProps {
  img?: MaybeThemedValue<string>
  alt?: string
  imgClass?: string
}

const props = defineProps<BackgroundImageProps>()

const { $frontmatter } = useSlideContext()
const { resolveThemeValue } = useTheme()

const img = computed(() => {
  return resolveThemeValue(props.img) || resolveThemeValue($frontmatter.img)
})

const imgClass = computed(() => {
  return props.imgClass || $frontmatter.imgClass
})

const imgAlt = computed(() => {
  return props.alt || $frontmatter.alt || 'Presentation Image'
})

const hasImage = computed(() => {
  return !!img.value
})
</script>

<template>
  <img v-if="hasImage" :src="img" :alt="imgAlt" aria-hidden="true" class="absolute top-0 left-0 w-full h-full object-cover" :class="imgClass">
</template>

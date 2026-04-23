<script lang="ts" setup>
interface ClickRevealImageProps {
  src: string
  alt?: string
}

const props = withDefaults(defineProps<ClickRevealImageProps>(), {
  alt: '',
})
</script>

<template>
  <div v-click class="theme-click-reveal-overlay absolute z-10 inset-0 backdrop-blur-md" />
  <img v-after :src="props.src" :alt="props.alt" class="absolute z-20 h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
</template>

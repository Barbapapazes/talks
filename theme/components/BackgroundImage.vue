<script setup lang="ts">
interface BackgroundImageProps {
  img?: string
  alt?: string
  imgClass?: string
}

const props = withDefaults(defineProps<BackgroundImageProps>(), {
  alt: 'Presentation Image',
})
</script>

<template>
  <img v-if="props.img" :src="props.img" :alt="props.alt" class="absolute top-0 left-0 w-full h-full object-cover" :class="props.imgClass">
</template>

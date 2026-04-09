<script setup lang="ts">
import { useAttrs } from 'vue'
import { useSlideTheme } from '../composables/useSlideTheme'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const { visualTheme } = useSlideTheme()
</script>

<template>
  <div v-bind="attrs" class="theme-root" :data-slide-theme="visualTheme">
    <slot />
  </div>
</template>

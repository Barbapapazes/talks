<script setup lang="ts">
import ThemeRoot from '../components/ThemeRoot.vue'
</script>

<template>
  <ThemeRoot class="h-full p-0 flex flex-col slidev-layout full">
    <div class="w-full h-full">
      <slot />
    </div>
  </ThemeRoot>
</template>

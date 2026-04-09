<script setup lang="ts">
import ThemeRoot from '../components/ThemeRoot.vue'
</script>

<template>
  <ThemeRoot class="h-full grid mx-auto grid items-center slidev-layout center-y max-w-3xl">
    <div class="w-full">
      <slot />
    </div>
  </ThemeRoot>
</template>

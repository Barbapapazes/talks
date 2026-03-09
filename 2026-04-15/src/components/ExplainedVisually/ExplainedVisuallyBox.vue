<script lang="ts" setup>
defineSlots<{
  default: () => any
}>()
</script>

<template>
  <div class="not-content rounded-md border border-neutral-200 bg-neutral-100 shadow-sm">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineSlots<{
  default: () => any
}>()
</script>

<template>
  <div class="not-content bg-neutral-100 border border-neutral-200 shadow-sm rounded-md">
    <slot />
  </div>
</template>

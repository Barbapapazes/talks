<script lang="ts" setup>
import { useChooseNextSlideJump } from '../composables/useChooseNextSlideJump'

const { hasJumped } = useChooseNextSlideJump()
</script>

<template>
  <div
    class="absolute z-100 bottom-2 right-2 rounded-full border border-neutral-200 p-1 transition duration-300"
    :class="{
      'opacity-100': hasJumped,
      'opacity-0': !hasJumped,
    }"
  >
    <div class="i-ph-flow-arrow-light size-4 text-neutral-400" />
  </div>
</template>

<script lang="ts" setup>
import Confetti from '../components/Confetti.vue'
import ThemeRoot from '../components/ThemeRoot.vue'
</script>

<template>
  <ThemeRoot class="h-full grid slidev-layout keep-in-mind">
    <Confetti />
    <div class="my-auto">
      <div class="text-4xl text-center font-bold leading-snug">
        <slot />
      </div>
    </div>

    <slot name="outside" />
  </ThemeRoot>
</template>

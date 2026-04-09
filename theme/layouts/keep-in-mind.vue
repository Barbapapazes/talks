<script lang="ts" setup>
import Confetti from '../components/Confetti.vue'
</script>

<template>
  <div class="h-full grid slidev-layout keep-in-mind">
    <Confetti />
    <div class="my-auto">
      <div class="text-4xl text-center font-bold leading-snug">
        <slot />
      </div>
    </div>

    <slot name="outside" />
  </div>
</template>

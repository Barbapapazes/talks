<script lang="ts" setup>
import Rain from '../components/Rain.vue'

const MIND_BLOWING_EMOJIS = ['🤯', '💥', '🧠', '⚡', '🔥', '😲', '🤩', '🚀'] as const
</script>

<template>
  <Rain class="mind-blowing-rain" :emojis="MIND_BLOWING_EMOJIS">
    <slot />
  </Rain>
</template>

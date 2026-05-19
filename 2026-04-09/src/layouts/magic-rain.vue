<script lang="ts" setup>
import Rain from '../components/Rain.vue'

const MAGIC_EMOJIS = ['✨', '🪄', '🔮', '⭐', '🌈', '🧙‍♂️', '🐇', '🧽'] as const
</script>

<template>
  <Rain class="magic-rain" :emojis="MAGIC_EMOJIS">
    <slot />
  </Rain>
</template>

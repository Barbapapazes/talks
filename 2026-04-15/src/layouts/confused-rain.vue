<script lang="ts" setup>
import Rain from '../components/Rain.vue'

const CONFUSED_EMOJIS = ['🤔', '😕', '😵', '😵‍💫', '❓', '❔', '🙃', '🫠'] as const
</script>

<template>
  <Rain class="confused" :emojis="CONFUSED_EMOJIS">
    <slot />
  </Rain>
</template>
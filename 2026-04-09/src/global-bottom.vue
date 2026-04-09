<script setup lang="ts">
import ChoiceJumpIndicator from './components/ChoiceJumpIndicator.vue'
import ChooseNextSlideOverlay from './components/ChooseNextSlideOverlay.vue'
import ChooseTheme from '../../theme/components/ChooseTheme.vue'
</script>

<template>
  <ChooseTheme />
  <ChooseNextSlideOverlay />
  <ChoiceJumpIndicator />
</template>

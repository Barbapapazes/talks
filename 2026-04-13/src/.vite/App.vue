<script lang="ts" setup>
import { ref } from 'vue'

const world = ref<string>('World')
</script>

<template>
  <div>
    Hello {{ world }}!
  </div>
</template>

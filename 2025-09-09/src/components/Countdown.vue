<script lang="ts" setup>
import { useCountdown } from '@vueuse/core'
import { computed, onMounted } from 'vue'

const { remaining, start } = useCountdown(60 * 10)

onMounted(() => {
  start()
})

const minutes = computed(() => Math.floor(remaining.value / 60))
const seconds = computed(() => Math.floor(remaining.value % 60))
</script>

<template>
  <div class="font-mono">
    {{ minutes.toString().padStart(2, '0') }}:{{ seconds.toString().padStart(2, '0') }}
  </div>
</template>

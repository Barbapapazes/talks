<script lang="ts" setup>
import { ref } from 'vue'

const isLoading = ref(false)

function toggleLoading() {
  isLoading.value = !isLoading.value
}

setInterval(() => {
  toggleLoading()
}, 2000)
</script>

<template>
  <button type="button" class="relative py-2 bg-primary rounded shadow flex items-center disabled:op-60 px-6 text-yellow-400">
    <span
      class="inline-block size-5 transition duration-150 ease-in" :class="{
        'i-heroicons-star': !isLoading,
        'i-heroicons-star-solid': isLoading,
      }"
    />
  </button>
</template>

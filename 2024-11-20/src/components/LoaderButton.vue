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
  <button type="button" class="relative px-3 py-2 bg-primary rounded shadow disabled:op-60 flex items-center text-sm" :disabled="isLoading">
    <span class="transition duration-150 ease-in" :class="{ 'op-0': isLoading }">Submit</span>
    <span class="absolute left-1/2 transition duration-150 ease-in inline-block size-5 top-1/2 -translate-1/2" :class="{ 'op-100': isLoading, 'op-0': !isLoading }">
      <span class="inline-block size-5 i-lucide-loader animate-spin" />
    </span>
  </button>
</template>

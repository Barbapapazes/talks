<script lang="ts" setup>
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

const countdownPage = 5
</script>

<template>
  <Countdown
    class="absolute"
    :class="{
      'opacity-0': currentPage < countdownPage,
      'top-1/2 left-1/2 -translate-1/2 opacity-100 transition-opacity duration-300 text-[12rem]': currentPage === countdownPage,
      'top-4 right-4 transition-all duration-3000 text-2xl': currentPage > countdownPage
    }"
  />
</template>

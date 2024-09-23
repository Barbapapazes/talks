<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <h1 flex="~ row gap-4 items-center">
    <img :src="`https://unjs.io/assets/logos/${name}.svg`" class="pl-[2px] pt-[1px]">
    {{ name }}
  </h1>
</template>

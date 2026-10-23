<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  plain?: boolean
}>(), { size: 'md', plain: false })
</script>

<template>
  <span
    class="inline-block whitespace-pre rounded-md border font-mono"
    :class="[
      plain ? 'border-transparent' : 'border-primary/20 bg-primary/7 text-primary',
      size === 'sm' ? 'px-1.5 py-1 text-base' : size === 'lg' ? 'px-4 py-2 text-[22px]' : 'px-2.5 py-1 text-[19px]',
    ]"
  ><slot /></span>
</template>

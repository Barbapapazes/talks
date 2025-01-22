<script lang="ts" setup>
interface IconProps {
  name: string
  class?: any
}

const props = defineProps<IconProps>()
</script>

<template>
  <span class="inline-flex" :class="[props.name, props.class]" />
</template>

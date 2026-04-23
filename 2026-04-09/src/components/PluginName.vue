<script lang="ts" setup>
interface PluginNameProps {
  name: string
  github: string
}
const props = defineProps<PluginNameProps>()
</script>

<template>
  <div>
    {{ props }}
  </div>
</template>

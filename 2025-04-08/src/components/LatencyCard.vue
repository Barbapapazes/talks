<script lang="ts" setup>
defineProps<{
  flag: string
  city: string
  latency: number
}>()
</script>

<template>
  <Card class="flex flex-row text-sm gap-2 origin-center">
    <div class="flex gap-1 grow">
      <span>
        {{ flag }}
      </span>
      <span class="op-60">
        {{ city }}
      </span>
    </div>
    <span class="rounded text-xs text-green-400 bg-green-950 px-1.5 py-px">200</span>
    <span
      class="text-xs rounded px-1.5 py-px"
      :class="latency > 300 ? 'text-amber-400 bg-amber-950' : 'text-green-400 bg-green-950'"
    >{{ latency }}ms</span>
  </Card>
</template>

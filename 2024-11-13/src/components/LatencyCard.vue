<script lang="ts" setup>
defineProps<{
  flag: string
  city: string
  latency: number
}>()
</script>

<template>
  <Card class="flex flex-row origin-center gap-2 text-sm">
    <div class="flex grow gap-1">
      <span>
        {{ flag }}
      </span>
      <span class="op-60">
        {{ city }}
      </span>
    </div>
    <span class="rounded bg-green-950 px-1.5 py-px text-xs text-green-400">200</span>
    <span
      class="rounded px-1.5 py-px text-xs"
      :class="latency > 300 ? 'text-amber-400 bg-amber-950' : 'text-green-400 bg-green-950'"
    >{{ latency }}ms</span>
  </Card>
</template>

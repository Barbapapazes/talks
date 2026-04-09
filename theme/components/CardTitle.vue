<script lang="ts" setup>
const props = defineProps<{
  icon?: string
  title: string
}>()
</script>

<template>
   <div class="title flex flex-row items-center gap-1">
      <div v-if="props.icon" :class="props.icon" class="size-5" />
      <div class="text-sm">
        {{ props.title }}
      </div>
    </div>
</template>

<style scoped>
html[data-theme='default'] {
  .title {
    --at-apply: text-neutral-700 font-semibold;
  }
}

html[data-theme='brutalism'] {
  .title {
    --at-apply: text-[var(--theme-brutalism-text-default)] font-bold;
  }
}

html[data-theme='futuristic'] {
  .title {
    --at-apply: text-[var(--theme-futuristic-text-default)] font-light;
  }
}
</style>

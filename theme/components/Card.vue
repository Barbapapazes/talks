<script setup lang="ts">
const props = defineProps<{
  ignoreTheme?: boolean
}>()
</script>

<template>
  <div class="shell" :class="{ 'ignore-theme': ignoreTheme }">
    <div class="surface overflow-hidden h-full w-full p-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
html[data-theme='default'],
html[data-theme='flowers'] {
  .shell {
    --at-apply: border border-12 border-white/30 shadow-lg rounded-3xl;
  }

  .surface {
    --at-apply: bg-white rounded-xl shadow-lg;
  }
}

html[data-theme='brutalism'] {
  .ignore-theme.shell {
    --at-apply: border border-12 border-white/30 shadow-lg rounded-3xl;
  }

  .ignore-theme .surface {
    --at-apply: bg-white rounded-xl shadow-lg;
  }
}

html[data-theme='brutalism'] {
  :not(.ignore-theme).shell {
    --at-apply: border border-4 bg-[var(--theme-brutalism-primary)] border-[var(--theme-brutalism-border-default)] shadow-[var(--theme-brutalism-shadow-default)];
  }

  :not(.ignore-theme) .surface {
    --at-apply: text-[var(--theme-brutalism-text-default)];
  }
}
</style>

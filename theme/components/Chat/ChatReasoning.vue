<script setup lang="ts">
defineProps<{
  expanded: boolean
}>()
</script>

<template>
  <div class="chat-reasoning">
    <div class="reasoning-heading">
      <span :class="expanded ? 'i-ph-caret-down' : 'i-ph-caret-right'" aria-hidden="true" />
      <span>Reasoning</span>
    </div>
    <div v-if="expanded" class="reasoning-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.chat-reasoning {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  padding-top: 2px;
  font-size: 14px;
}
.reasoning-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}
.reasoning-content {
  --at-apply: border-l-2 border-neutral-200 dark:border-neutral-700;
  margin: 8px 0 0 6px;
  padding-left: 14px;
  line-height: 1.5;
}
</style>

<script setup lang="ts">
withDefaults(defineProps<{
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
}>(), {
  align: 'inline-start',
})

function focusControl(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest('button, a, input, textarea, [contenteditable]'))
    return
  const group = (event.currentTarget as HTMLElement).closest('[data-slot="input-group"]')
  group?.querySelector<HTMLElement>('input, textarea')?.focus()
}
</script>

<template>
  <div role="group" data-slot="input-group-addon" :data-align="align" class="ui-input-group-addon" @click="focusControl">
    <slot />
  </div>
</template>

<style scoped>
.ui-input-group-addon { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.ui-input-group-addon[data-align='inline-start'] { order: -1; }
.ui-input-group-addon[data-align='inline-end'] { order: 1; }
.ui-input-group-addon[data-align^='block-'] { flex-direction: column; align-items: stretch; }
.ui-input-group-addon[data-align='block-start'] { order: -1; width: 100%; }
.ui-input-group-addon[data-align='block-end'] { order: 1; width: 100%; }
</style>

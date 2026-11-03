<template>
  <div data-slot="input-group" role="group" class="ui-input-group">
    <slot />
  </div>
</template>

<style scoped>
.ui-input-group {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  background: var(--ui-background);
}
.ui-input-group:has(> [data-align^='block-']) { flex-direction: column; align-items: stretch; }
.ui-input-group:focus-within { outline: 2px solid var(--ui-ring); outline-offset: 2px; }
</style>

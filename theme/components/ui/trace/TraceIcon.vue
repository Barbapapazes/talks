<template>
  <span data-slot="trace-icon" aria-hidden="true" class="ui-trace-icon">
    <slot />
  </span>
</template>

<style scoped>
.ui-trace-icon { display: flex; flex-shrink: 0; align-items: center; justify-content: center; }
</style>

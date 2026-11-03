<template>
  <span data-slot="trace-title" class="ui-trace-title">
    <slot />
  </span>
</template>

<style scoped>
.ui-trace-title { min-width: 0; overflow-wrap: anywhere; }
</style>

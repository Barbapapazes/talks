<template>
  <div data-slot="trace" class="ui-trace">
    <slot />
  </div>
</template>

<style scoped>
.ui-trace { display: flex; width: 100%; min-width: 0; flex-direction: column; }
</style>

<template>
  <div class="not-content flex min-h-0 flex-col border border-neutral-700 bg-neutral-900 text-white">
    <slot name="header" />
    <slot name="filters" />
    <div class="relative min-h-0 grow overflow-auto bg-neutral-900 shiki-dark">
      <slot />
    </div>
  </div>
</template>

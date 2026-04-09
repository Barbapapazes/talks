<template>
  <div class="shell">
    <div class="surface overflow-hidden h-full w-full p-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
html[data-theme='default'] {
  .shell {
    --at-apply: border border-12 border-white/30 shadow-lg rounded-3xl;
  }

  .surface {
    --at-apply: bg-white rounded-xl shadow-lg;
  }
}

html[data-theme='brutaliste'] {
  .shell {
    --at-apply: border border-4 bg-[var(--theme-brutaliste-primary)] border-[var(--theme-brutaliste-border-default)] shadow-[var(--theme-brutaliste-shadow-default)];
  }

  .surface {
    --at-apply: text-[var(--theme-brutaliste-text-default)];
  }
}

html[data-theme='futuristic'] {
    .shell {
      --at-apply: rounded-md backdrop-blur;
      background-color: color-mix(in oklab, var(--theme-futuristic-primary)60%, transparent);
      box-shadow: var(--theme-futuristic-shadow-default);
    }

  .surface {
    --at-apply: text-[var(--theme-futuristic-text-default)];
  }
}
</style>

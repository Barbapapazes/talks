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

html[data-theme='brutalism'] {
  .shell {
    --at-apply: border border-4 bg-[var(--theme-brutalism-primary)] border-[var(--theme-brutalism-border-default)] shadow-[var(--theme-brutalism-shadow-default)];
  }

  .surface {
    --at-apply: text-[var(--theme-brutalism-text-default)];
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

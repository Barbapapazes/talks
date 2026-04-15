<script setup lang="ts">
import Card from '@theme/components/Card.vue';

</script>

<template>
    <dl class="grid grid-cols-2 gap-6">
      <Card v-click>
        <dt class="flex items-baseline gap-2">
          <span class="title font-serif text-xl">ECMAScript module</span>
          <span class="text-[10px] uppercase tracking-[0.25em] text-neutral-400">n.</span>
        </dt>
        <dd class="description mt-2 text-sm leading-5">
          A JavaScript file that uses <code>import</code> and <code>export</code>. The standard module format in modern JavaScript.
        </dd>
        <dd class="example mt-1 text-xs italic">
          e.g. <code>main.ts</code>, <code>App.vue</code> once transformed for the browser.
        </dd>
      </Card>

      <Card v-click>
        <dt class="flex items-baseline gap-2">
          <span class="title font-serif text-xl">module identifier</span>
          <span class="text-[10px] uppercase tracking-[0.25em] text-neutral-400">n.</span>
        </dt>
        <dd class="description mt-2 text-sm leading-5">
          The string used in an import to request a module from Vite.
        </dd>
        <dd class="example mt-1 text-xs italic">
          e.g. <code>'vue'</code>, <code>'./App.vue'</code>, <code>'virtual:my-module'</code>.
        </dd>
      </Card>

      <Card v-click>
        <dt class="flex items-baseline gap-2">
          <span class="title font-serif text-xl">hook</span>
          <span class="text-[10px] uppercase tracking-[0.25em] text-neutral-400">n.</span>
        </dt>
        <dd class="description mt-2 text-sm leading-5">
          A function exposed by a plugin to intervene at a specific step in the pipeline.
        </dd>
        <dd class="example mt-1 text-xs italic">
          e.g. <code>resolveId</code>, <code>load</code>, <code>transform</code>.
        </dd>
      </Card>

      <Card v-click>
        <dt class="flex items-baseline gap-2">
          <span class="title font-serif text-xl">virtual module</span>
          <span class="text-[10px] uppercase tracking-[0.25em] text-neutral-400">n.</span>
        </dt>
        <dd class="description mt-2 text-sm leading-5">
          A module that does not exist on disk, but is generated on the fly by a plugin.
        </dd>
        <dd class="example mt-1 text-xs italic">
          e.g. an import like <code>'virtual:my-module'</code>.
        </dd>
      </Card>
    </dl>
</template>

<style scoped>
html[data-theme='default'],
html[data-theme='flowers'] {
  .title {
    --at-apply: text-neutral-900 font-semibold;
  }
  .description {
    --at-apply: text-neutral-700;
  }
  .example {
    --at-apply: text-neutral-500;
  }
}

html[data-theme='brutalism'] {
  .title {
    --at-apply: text-[var(--theme-brutalism-text-default)] font-bold;
  }
  .description {
    --at-apply: text-[var(--theme-brutalism-text-highlight)];
  }
  .example {
    --at-apply: text-[var(--theme-brutalism-text-muted)];
  }
}
</style>

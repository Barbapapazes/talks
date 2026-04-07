<script lang="ts" setup>
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'

const props = defineProps<{
  withoutClicks?: boolean
}>()

const icons = [
  'i-devicon-angular',
  'i-devicon-react',
  'i-devicon-vuejs',
  'i-devicon-nuxt',
  'i-devicon-astro',
  'https://tanstack.com/images/logos/logo-color-600.png',
  'i-devicon-svelte',
  'i-devicon-solidjs',
  'i-devicon-qwik',
  'i-unjs-nitro',
  null,
  null,
  'i-devicon-cloudflareworkers',
  'i-devicon-storybook',
  'i-devicon-stackblitz',
  'https://raw.githubusercontent.com/voidzero-dev/community-design-resources/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vitest/vitest-icon-color-light.svg',
  'i-devicon-laravel',
  'i-devicon-tauri',
  'i-logos-slidev',
  'https://vite-ruby.netlify.app/logo.svg',
]
</script>

<template>
  <div class="absolute inset-14 grid grid-cols-4 items-center justify-items-center">
    <template v-for="(icon, index) in icons" :key="index">
      <template v-if="props.withoutClicks">
        <img
          v-if="icon && icon.startsWith('http')"
          :src="icon"
          class="size-16 transition"
        >
        <span
          v-else-if="icon"
          :class="icon"
          class="size-16"
        />
        <span v-else />
      </template>
      <component v-else :is="index === 0 ? VClick : VAfter">
        <img
          v-if="icon && icon.startsWith('http')"
          :src="icon"
          class="size-16 transition forward:delay-[--delay]"
          :style="{ '--delay': `calc(${(index % 4) + (Math.floor(index / 4))} * 30ms)` }"
        >
        <span
          v-else-if="icon"
          :class="icon"
          class="size-16 transition forward:delay-[--delay]"
          :style="{ '--delay': `calc(${(index % 4) + (Math.floor(index / 4))} * 30ms)` }"
        />
        <span v-else />
      </component>
    </template>
  </div>
</template>

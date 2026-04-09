<script lang="ts" setup>
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'

  // - Le Hot Module Replacement (HMR)
  // - Le middleware - Un fichier virtuel
  // - Run Plugin - Un plugin pour exécuter des commandes
  // - Laravel Vite - La communication inter-processus
  // - unplugin-macro - Un plugin pour créer des macros
  // - Nitro - Un backend
const features = [
  {
    icon: '',
    name: 'Hot Module Replacement (HMR)',
    description: 'Update modules in the browser without a full page reload, preserving application state.',
  },
  {
    icon: '',
    name: 'Middleware',
    description: 'Add additional routes to the Vite dev server to handle custom API requests or serve dynamic content.',
  },
  {
    icon: '',
    name: 'Command Runner',
    description: 'Execute custom commands alongside the Vite dev server, with access to the Vite configuration and lifecycle.',
  },
  {
    icon: '',
    name: 'Inter-process Communication',
    description: 'Allow different processes to communicate with each other to share data.',
  },
  {
    icon: '',
    name: 'Macros',
    description: 'Transform source code at build time to enable new syntax or features that are not natively supported by JavaScript.',
  },
  {
    icon: '',
    name: 'Server Framework',
    description: 'Extend Vite\'s dev server capabilities to build custom backends, APIs, or full-stack applications.',
  }
]
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div class="grid grid-cols-3 gap-4">
      <template v-for="(feature, index) in features" :key="feature.name">
        <component :is="index === 0 ? VClick : VAfter">
          <Card
            class="transition forward:delay-[--delay]"
            :style="{ '--delay': `calc(${(index % 3) + (Math.floor(index / 3))} * 30ms)` }"
          >
            <div class="flex flex-row items-center gap-1">
              <div :class="feature.icon" class="size-5" />
              <div class="text-sm text-neutral-700">
                {{ feature.name }}
              </div>
            </div>
            <div class="mt-2 text-xs text-neutral-500">
              {{ feature.description }}
            </div>
          </Card>
        </component>
      </template>
    </div>
  </div>
</template>

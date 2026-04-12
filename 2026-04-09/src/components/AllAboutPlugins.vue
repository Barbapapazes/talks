<script lang="ts" setup>
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'

const features = [
  {
    icon: 'i-vscode-icons-file-type-html',
    name: 'HTML',
    description: 'Use HTML as an entry point with automatic script and asset handling.',
  },
  {
    icon: 'i-vscode-icons-file-type-reactjs',
    name: 'JSX',
    description: 'Use JSX with built-in transformation and framework support.',
  },
  {
    icon: 'i-vscode-icons-file-type-css',
    name: 'CSS',
    description: 'Import CSS with support for HMR, modules, and preprocessors.',
  },
  {
    icon: 'i-vscode-icons-folder-type-asset',
    name: 'Static Assets',
    description: 'Import static assets such as images, fonts, and media.',
  },
  {
    icon: 'i-vscode-icons-file-type-json',
    name: 'JSON',
    description: 'Import JSON files directly as JavaScript modules.',
  },
  {
    icon: 'i-vscode-icons-file-type-search-result',
    name: 'Glob Import',
    description: 'Import multiple modules using a file pattern.',
  },
  {
    icon: 'i-vscode-icons-folder-type-include',
    name: 'Dynamic Import',
    description: 'Load modules dynamically with native code splitting.',
  },
  {
    icon: 'i-vscode-icons-file-type-wasm',
    name: 'WebAssembly',
    description: 'Import and run WebAssembly modules from JavaScript.',
  },
  {
    icon: 'i-vscode-icons-file-type-light-config',
    name: 'Web Workers',
    description: 'Run code in background threads using Web Workers.',
  },
]
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div class="grid grid-cols-3">
      <template v-for="(feature, index) in features" :key="feature.name">
        <component :is="index === 0 ? VClick : VAfter">
          <Card
            class="transition forward:delay-[--delay]"
            :style="{ '--delay': `calc(${(index % 3) + (Math.floor(index / 3))} * 30ms)` }"
          >
            <CardTitle
              :icon="feature.icon"
              :title="feature.name"
            />
            <CardDescription
              :description="feature.description"
              class="mt-2"
            />
          </Card>
        </component>
      </template>
    </div>
  </div>
</template>

<style scoped>
html[data-theme='default'] {
  .grid {
    --at-apply: gap-4;
  }
}

html[data-theme='brutalism'] {
  .grid {
    --at-apply: gap-8;
  }
}

html[data-theme='futuristic'] {
  .grid {
    --at-apply: gap-8;
  }
}
</style>

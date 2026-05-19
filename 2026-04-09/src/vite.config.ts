import path from 'node:path'
import { defineConfig } from 'vite'
import info from 'vite-plugin-info'
import inspect from 'vite-plugin-inspect'
import run from 'vite-plugin-run'
import growthChart from './plugins/growth-chart'
import viteBuild from './plugins/vite-build'
import viteFileSystem from './plugins/vite-file-system'
import viteTransformedFile from './plugins/vite-transformed-file'

const optimizedDependencies = [
  '@dagrejs/dagre',
  '@shikijs/langs',
  '@shikijs/themes',
  '@shikijs/transformers',
  '@tsparticles/engine',
  '@tsparticles/plugin-emitters',
  '@tsparticles/slim',
  '@unovis/ts',
  '@unovis/vue',
  '@vue-flow/background',
  '@vue-flow/core',
  '@vueuse/core',
  'reka-ui',
  'shiki',
  'slidev-addon-inalia',
  'tailwind-variants',
]

export default defineConfig({
  plugins: [
    inspect(),
    growthChart(),
    viteFileSystem(),
    viteTransformedFile(),
    viteBuild(),
    info(),
    run([
      {
        name: 'generate-tree',
        run: ['pnpm', '-w', 'run', 'generate:tree', '2026-04-09'],
        condition: file => file.endsWith('slides.md'),
        throttle: 1_000,
      },
    ]),
  ],
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, '../../theme'),
    },
  },
  optimizeDeps: {
    include: optimizedDependencies,
  },

  server: {
    hmr: {
      overlay: false,
    },
  },
})

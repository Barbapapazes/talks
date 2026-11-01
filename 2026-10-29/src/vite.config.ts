import path from 'node:path'
import { defineConfig } from 'vite'
import info from 'vite-plugin-info'
import inspect from 'vite-plugin-inspect'
import growthChart from './plugins/growth-chart'
import viteBuild from './plugins/vite-build'
import viteFileSystem from './plugins/vite-file-system'
import viteTransformedFile from './plugins/vite-transformed-file'

const optimizedDependencies = [
  '@dagrejs/dagre',
  '@shikijs/langs',
  '@shikijs/langs/css',
  '@shikijs/langs/html',
  '@shikijs/langs/http',
  '@shikijs/langs/json',
  '@shikijs/langs/typescript',
  '@shikijs/langs/vue',
  '@shikijs/themes',
  '@shikijs/themes/github-light',
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
  'slidev-theme-personal > @tsparticles/confetti',
  'slidev-theme-personal > fireworks-js',
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

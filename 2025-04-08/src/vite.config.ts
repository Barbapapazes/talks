import { defineConfig } from 'vite'
import LatestArticles from './plugins/latest-articles'

export default defineConfig({
  plugins: [
    LatestArticles(),
  ],

  optimizeDeps: {
    include: ['reka-ui', 'slidev-addon-inalia/composables/useInaliaTalk', '@tsparticles/engine', '@tsparticles/slim', 'cobe'],
  },
})

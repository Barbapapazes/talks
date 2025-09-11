import { defineConfig } from 'vite'
import LatestArticles from './plugins/latest-articles'

export default defineConfig({
  plugins: [
    LatestArticles(),
  ],

  optimizeDeps: {
    include: ['reka-ui', '@tsparticles/engine', '@tsparticles/slim', 'cobe', 'slidev-addon-inalia'],
  },
})

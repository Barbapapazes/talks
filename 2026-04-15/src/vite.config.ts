import path from 'node:path'
import { defineConfig } from 'vite'
import growthChart from './plugins/growth-chart'
import viteBuild from './plugins/vite-build'
import viteFileSystem from './plugins/vite-file-system'
import viteTransformedFile from './plugins/vite-transformed-file'

export default defineConfig({
  plugins: [
    growthChart(),
    viteFileSystem(),
    viteTransformedFile(),
    viteBuild(),
  ],
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, '../../theme'),
    },
  },
  optimizeDeps: {
    include: ['slidev-addon-inalia', 'reka-ui'],
  },
})

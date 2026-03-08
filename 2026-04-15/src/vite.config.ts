import path from 'node:path'
import { defineConfig } from 'vite'
import viteFileSystem from './plugins/vite-file-system'
import viteTransformedFile from './plugins/vite-transformed-file'

export default defineConfig({
  plugins: [
    viteFileSystem(),
    viteTransformedFile(),
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

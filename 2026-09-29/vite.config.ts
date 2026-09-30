import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, '../../theme'),
    },
  },
})

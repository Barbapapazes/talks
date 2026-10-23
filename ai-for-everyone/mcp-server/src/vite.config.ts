import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@theme': fileURLToPath(new URL('../../../theme', import.meta.url)),
    },
  },
})

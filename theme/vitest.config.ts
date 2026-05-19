import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@slidev/client': fileURLToPath(new URL('./__tests__/mocks/slidev-client.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['**/__tests__/**/*.test.ts'],
  },
})

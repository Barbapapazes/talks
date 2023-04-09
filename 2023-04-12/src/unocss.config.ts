import { defineConfig } from 'unocss/vite'
import config from '@slidev/client/uno.config'

export default defineConfig({
  ...config,
  theme: {
    colors: {
      primary: '#0de07d',
    },
  },
})

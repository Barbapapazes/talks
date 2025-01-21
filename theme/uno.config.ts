import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|ts|md)($|\?)/,
      ],
    },
  },
})

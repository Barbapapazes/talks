import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|ts|md)($|\?)/,
      ],
    },
  },
  theme: {
    fontSize: {
      xxs: '0.625rem',
    },
  },
})

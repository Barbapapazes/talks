import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  vue: true,
  unocss: true,
  ignores: [
    './2026-04-15/src/.vite/**/*',
    './2026-04-15/src/.vite-transformed/**/*',
    './2026-04-15/src/.vite-build/**/*',
  ],
}).append({
  files: ['**/src/slides.md'],
  rules: {
    'markdown/no-multiple-h1': 'off',
    'markdown/require-alt-text': 'off',
  },
})

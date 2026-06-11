import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  vue: true,
  unocss: true,
  ignores: [
    './**/src/.vite/**/*',
    './**/src/.vite-transformed/**/*',
    './**/src/.vite-build/**/*',
  ],
})
  .override('antfu/pnpm/pnpm-workspace-yaml', {
    rules: {
      'pnpm/yaml-enforce-settings': ['error', {
        settings: {
          shellEmulator: true,
          trustPolicy: 'off',
          catalogMode: 'prefer',
        },
      }],
    },
  })
  .append({
    files: ['**/src/slides.md'],
    rules: {
      'markdown/no-multiple-h1': 'off',
      'markdown/require-alt-text': 'off',
    },
  })

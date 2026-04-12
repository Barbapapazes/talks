import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  vue: true,

  unocss: true,
}).append({
  files: ['**/src/slides.md'],
  rules: {
    'markdown/no-multiple-h1': 'off',
    'markdown/require-alt-text': 'off',
  },
})

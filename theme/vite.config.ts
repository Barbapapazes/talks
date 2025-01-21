/// <reference types="@slidev/types" />

import { defineConfig } from 'vite'
import LatestArticles from './plugins/latest-articles'

const codeBlockIcons = {
  // package managers
  'pnpm': 'i-vscode-icons-file-type-light-pnpm',
  'npm': 'i-vscode-icons-file-type-npm',
  'yarn': 'i-vscode-icons-file-type-yarn',
  'bun': 'i-vscode-icons-file-type-bun',
  'deno': 'i-vscode-icons-file-type-light-deno',
  // frameworks
  'vue': 'i-vscode-icons-file-type-vue',
  'svelte': 'i-vscode-icons-file-type-svelte',
  'angular': 'i-vscode-icons-file-type-angular',
  'react': 'i-vscode-icons-file-type-reactjs',
  'next': 'i-vscode-icons-file-type-light-next',
  'nuxt': 'i-vscode-icons-file-type-nuxt',
  'solid': 'logos:solidjs-icon',
  'astro': 'i-vscode-icons-file-type-light-astro',
  // bundlers
  'rollup': 'i-vscode-icons-file-type-rollup',
  'webpack': 'i-vscode-icons-file-type-webpack',
  'vite': 'i-vscode-icons-file-type-vite',
  'esbuild': 'i-vscode-icons-file-type-esbuild',
  // configuration files
  'package.json': 'i-vscode-icons-file-type-node',
  'tsconfig.json': 'i-vscode-icons-file-type-tsconfig',
  '.npmrc': 'i-vscode-icons-file-type-npm',
  '.editorconfig': 'i-vscode-icons-file-type-editorconfig',
  '.eslintrc': 'i-vscode-icons-file-type-eslint',
  '.eslintignore': 'i-vscode-icons-file-type-eslint',
  'eslint.config': 'i-vscode-icons-file-type-eslint',
  '.gitignore': 'i-vscode-icons-file-type-git',
  '.gitattributes': 'i-vscode-icons-file-type-git',
  '.env': 'i-vscode-icons-file-type-dotenv',
  '.env.example': 'i-vscode-icons-file-type-dotenv',
  '.vscode': 'i-vscode-icons-file-type-vscode',
  'tailwind.config': 'i-vscode-icons-file-type-tailwind',
  'uno.config': 'i-vscode-icons-file-type-unocss',
  // filename extensions
  '.ts': 'i-vscode-icons-file-type-typescript',
  '.tsx': 'i-vscode-icons-file-type-typescript',
  '.mjs': 'i-vscode-icons-file-type-js',
  '.cjs': 'i-vscode-icons-file-type-js',
  '.json': 'i-vscode-icons-file-type-json',
  '.js': 'i-vscode-icons-file-type-js',
  '.jsx': 'i-vscode-icons-file-type-js',
  '.md': 'i-vscode-icons-file-type-markdown',
  '.py': 'i-vscode-icons-file-type-python',
  '.ico': 'i-vscode-icons-file-type-favicon',
  '.html': 'i-vscode-icons-file-type-html',
  '.css': 'i-vscode-icons-file-type-css',
  '.scss': 'i-vscode-icons-file-type-scss',
  '.yml': 'i-vscode-icons-file-type-light-yaml',
  '.yaml': 'i-vscode-icons-file-type-light-yaml',
  // terminal commands
  'terminal': 'i-vscode-icons-file-type-shell',
}

export default defineConfig({
  plugins: [
    LatestArticles(),
  ],

  slidev: {
    markdown: {
      markdownItSetup(md) {
        /**
         * @see https://www.npmjs.com/package/vitepress-plugin-group-icons
         */
        md.use((md) => {
          const fenceRule = md.renderer.rules.fence

          if (!fenceRule) {
            return
          }

          /** Add a title and an icon to code blocks */
          md.renderer.rules.fence = (...args) => {
            const [tokens, idx] = args
            const token = tokens[idx]
            const title = token.info.match(/\[(.*?)\]/)

            if (!title) {
              return fenceRule(...args)
            }

            const sortedIconKeys = Object.keys(codeBlockIcons).sort((a, b) => b.length - a.length)
            const icon = sortedIconKeys.find(key => title[1].toLowerCase().includes(key)) as keyof typeof codeBlockIcons | undefined

            if (!icon) {
              return fenceRule(...args)
            }

            return `<div class="slidev-code-block-title">
<div class="slidev-code-block-title-bar">
    <span class="slidev-code-block-title-icon ${codeBlockIcons[icon]}" />
    <span class="slidev-code-block-title-text" data-title="${md.utils.escapeHtml(title[1])}">
      ${title[1]}
    </span>
</div>
  ${fenceRule(...args)}
</div>`
          }
        })
      },
    },
  },
})

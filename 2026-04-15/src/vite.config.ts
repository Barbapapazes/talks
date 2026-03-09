import path from 'node:path'
import { defineConfig } from 'vite'
import run from 'vite-plugin-run'
import growthChart from './plugins/growth-chart'
import viteBuild from './plugins/vite-build'
import viteFileSystem from './plugins/vite-file-system'
import viteTransformedFile from './plugins/vite-transformed-file'

export default defineConfig({
  plugins: [
    growthChart(),
    viteFileSystem(),
    viteTransformedFile(),
    viteBuild(),
    run([
      {
        name: 'generate-tree',
        run: ['pnpm', '-w', 'run', 'generate:tree', '2026-04-15'],
        condition: file => file.endsWith('slides.md'),
        delay: 1_000,
        throttle: 5_000,
      },
    ]),
  ],
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, '../../theme'),
    },
  },
  optimizeDeps: {
    include: ['slidev-addon-inalia', 'reka-ui'],
  },
})

import { defineConfig } from 'vite'
import LatestArticles from './plugins/latest-articles'

export default defineConfig({
  plugins: [
    LatestArticles(),
  ],
})

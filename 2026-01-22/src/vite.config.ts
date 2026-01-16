import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { virtualInertiaFromAI } from './vite/virtual-inertia-from-ai'

export default {
  plugins: [
    wasm(),
    topLevelAwait(),
    virtualInertiaFromAI(),
  ],
  optimizeDeps: {
    include: ['slidev-addon-inalia', 'reka-ui'],
  },
}

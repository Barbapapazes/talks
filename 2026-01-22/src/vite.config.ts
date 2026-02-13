import { virtualInertiaFromAI } from './vite/virtual-inertia-from-ai'

export default {
  plugins: [
    virtualInertiaFromAI(),
  ],
  optimizeDeps: {
    include: ['slidev-addon-inalia', 'reka-ui'],
  },
}

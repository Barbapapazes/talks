import { defineVitePluginsSetup } from '@slidev/types'
import visualize from '../plugins/visualize'

export default defineVitePluginsSetup(options => [
  visualize(options),
])

import { defineVitePluginsSetup } from '@slidev/types'
import growthChart from './plugins/grow-chart'

export default defineVitePluginsSetup(() => {
  return [
    growthChart(),
  ]
})

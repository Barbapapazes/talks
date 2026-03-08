import type { PluginOption } from 'vite'
import { readFile } from 'node:fs/promises'

export default function growthChart() {
  const virtualModuleId = 'virtual:growth-chart'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return <PluginOption>{
    name: 'growth-chart',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const vite = await readFile('./.data/vite.json', 'utf-8')
        const webpack = await readFile('./.data/webpack.json', 'utf-8')
        const rspack = await readFile('./.data/rspack-core.json', 'utf-8')
        const isString = await readFile('./.data/is-string.json', 'utf-8')

        function groupByMonth(data: Record<string, number>) {
          const result: Record<string, number> = {}
          for (const [date, amount] of Object.entries(data)) {
            const month = date.slice(0, 7) // Get the YYYY-MM part
            result[month] = (result[month] || 0) + amount
          }
          return result
        }

        // Parse and group data by month for each dataset
        const viteByMonth = groupByMonth(JSON.parse(vite) as Record<string, number>)
        const webpackByMonth = groupByMonth(JSON.parse(webpack) as Record<string, number>)
        const rspackByMonth = groupByMonth(JSON.parse(rspack) as Record<string, number>)
        const isStringByMonth = groupByMonth(JSON.parse(isString) as Record<string, number>)

        // Build the union of all months and sort them (ISO YYYY-MM sorts lexicographically)
        const months = Array.from(new Set([
          ...Object.keys(viteByMonth),
          ...Object.keys(webpackByMonth),
          ...Object.keys(rspackByMonth),
          ...Object.keys(isStringByMonth),
        ])).sort()

        // For each month, ensure every dataset has a value (inject 0 when missing)
        const viteAligned = months.map(m => [m, viteByMonth[m] ?? 0])
        const webpackAligned = months.map(m => [m, webpackByMonth[m] ?? 0])
        const rspackAligned = months.map(m => [m, rspackByMonth[m] ?? 0])
        const isStringAligned = months.map(m => [m, isStringByMonth[m] ?? 0])

        return `export const months = ${JSON.stringify(months)}

        export const vite = ${JSON.stringify(viteAligned)}

        export const webpack = ${JSON.stringify(webpackAligned)}

        export const rspack = ${JSON.stringify(rspackAligned)}

        export const isString = ${JSON.stringify(isStringAligned)}`
      }
    },
  }
}

import type { PluginOption } from 'vite'
import { readdir, readFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

type DownloadsByDay = Record<string, number>
type DownloadsByMonth = Record<string, number>
type DataRecord = [string, number]

const datasetsDir = fileURLToPath(new URL('../.npm/', import.meta.url))
const preferredOrder = ['webpack', 'vite', 'rspack-core', 'snowpack', 'swc-core']

function groupByMonth(data: DownloadsByDay): DownloadsByMonth {
  const result: DownloadsByMonth = {}
  for (const [date, amount] of Object.entries(data)) {
    const month = date.slice(0, 7)
    result[month] = (result[month] || 0) + amount
  }
  return result
}

function sortDatasets(a: string, b: string) {
  const aIndex = preferredOrder.indexOf(a)
  const bIndex = preferredOrder.indexOf(b)

  if (aIndex !== -1 || bIndex !== -1) {
    if (aIndex === -1)
      return 1
    if (bIndex === -1)
      return -1
    return aIndex - bIndex
  }

  return a.localeCompare(b)
}

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
        const entries = await readdir(datasetsDir)
        const datasetIds = entries
          .filter(entry => extname(entry) === '.json')
          .map(entry => basename(entry, '.json'))
          .sort(sortDatasets)

        const datasets = await Promise.all(datasetIds.map(async (datasetId) => {
          const filePath = join(datasetsDir, `${datasetId}.json`)
          const content = await readFile(filePath, 'utf-8')
          const valuesByMonth = groupByMonth(JSON.parse(content) as DownloadsByDay)

          return {
            id: datasetId,
            packageName: datasetId,
            valuesByMonth,
          }
        }))

        const months = Array.from(new Set(datasets.flatMap(dataset => Object.keys(dataset.valuesByMonth)))).sort()

        const series = datasets.map(dataset => ({
          id: dataset.id,
          packageName: dataset.packageName,
          data: months.map(month => [month, dataset.valuesByMonth[month] ?? 0] satisfies DataRecord),
        }))

        return `export const months = ${JSON.stringify(months)}

        export const series = ${JSON.stringify(series)}`
      }
    },
  }
}

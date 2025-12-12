import type { MetaEntry } from './_types.ts'
import { writeFileSync } from 'node:fs'
import { generateMetaEntry } from './_meta.ts'
import { generateReadmeContent } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'

async function generateReadme() {
  const packagesJson = getPackagesJson()

  const metaPromises = [] as Promise<MetaEntry>[]
  for (const packageJSON of packagesJson) {
    metaPromises.push(generateMetaEntry(packageJSON.split('/')[0]))
  }
  const meta = await Promise.all(metaPromises)

  const content = generateReadmeContent(meta)

  writeFileSync('README.md', content)
}

generateReadme()

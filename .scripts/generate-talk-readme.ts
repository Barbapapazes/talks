import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { generateMetaEntry } from './_meta.ts'
import { generateTalkReadmeContent } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'

async function generateAllTalkReadmes() {
  const packagesJson = getPackagesJson()

  const talkReadmePromises = [] as Promise<void>[]
  for (const packagePath of packagesJson) {
    talkReadmePromises.push((async () => {
      const dir = packagePath.split('/')[0]
      const metaEntry = await generateMetaEntry(dir)
      const content = generateTalkReadmeContent(metaEntry)
      await writeFile(join(dir, 'README.md'), content)
    })())
  }
  await Promise.all(talkReadmePromises)
}

generateAllTalkReadmes()

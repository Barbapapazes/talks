import { resolve } from 'node:path'
import { execa } from 'execa'
import { getPackagesJson } from './_utils.ts'

async function generateAllThumbnails() {
  const packagesJson = getPackagesJson()

  console.warn(`Generating thumbnails for ${packagesJson.length} talks...`)

  for (const packagePath of packagesJson) {
    const talkDir = packagePath.split('/')[0]
    const src = resolve(talkDir, 'src')

    console.warn(`\nGenerating thumbnails for ${talkDir}...`)

    try {
      // Generate light thumbnail
      await execa('pnpm', ['run', 'thumbnail'], { cwd: src })
      await execa('pnpm', ['run', 'thumbnail:cp'], { cwd: src })

      // Generate dark thumbnail
      await execa('pnpm', ['run', 'thumbnail:dark'], { cwd: src })
      await execa('pnpm', ['run', 'thumbnail:cp:dark'], { cwd: src })

      console.warn(`✓ Generated thumbnails for ${talkDir}`)
    }
    catch (error) {
      console.error(`✗ Failed to generate thumbnails for ${talkDir}:`, String(error))
    }
  }

  console.warn('\n✓ All thumbnails generated!')
}

generateAllThumbnails()

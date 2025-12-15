import { existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { execa } from 'execa'
import { getPackagesJson } from './_utils.ts'

async function optimizeThumbnails() {
  const packagesJson = getPackagesJson()

  let totalOriginalSize = 0
  let totalOptimizedSize = 0
  let optimizedCount = 0

  console.warn(`Optimizing thumbnails for ${packagesJson.length} talks...`)

  for (const packagePath of packagesJson) {
    const talkDir = packagePath.split('/')[0]
    const publicDir = resolve(talkDir, 'src', 'public')

    const thumbnails = [
      resolve(publicDir, 'thumbnail.png'),
      resolve(publicDir, 'thumbnail-dark.png'),
    ]

    for (const thumbnailPath of thumbnails) {
      if (!existsSync(thumbnailPath)) {
        continue
      }

      try {
        const originalStats = await stat(thumbnailPath)
        const originalSize = originalStats.size

        // Run optipng with level 2 (good balance between compression and speed)
        await execa('optipng', ['-o2', '-quiet', thumbnailPath])

        const optimizedStats = await stat(thumbnailPath)
        const optimizedSize = optimizedStats.size

        const savings = originalSize - optimizedSize
        const savingsPercent = ((savings / originalSize) * 100).toFixed(1)

        if (savings > 0) {
          console.warn(`  ✓ ${thumbnailPath.split('/').slice(-3).join('/')}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savingsPercent}% reduction)`)
        }
        else {
          console.warn(`  → ${thumbnailPath.split('/').slice(-3).join('/')}: No size reduction`)
        }

        totalOriginalSize += originalSize
        totalOptimizedSize += optimizedSize
        optimizedCount++
      }
      catch (error) {
        console.error(`  ✗ Failed to optimize ${thumbnailPath}:`, String(error))
      }
    }
  }

  const totalSavings = totalOriginalSize - totalOptimizedSize
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1)

  console.warn(`\n✓ Optimized ${optimizedCount} thumbnails`)
  console.warn(`  Total size: ${(totalOriginalSize / 1024).toFixed(1)}KB → ${(totalOptimizedSize / 1024).toFixed(1)}KB`)
  console.warn(`  Total savings: ${(totalSavings / 1024).toFixed(1)}KB (${totalSavingsPercent}% reduction)`)
}

optimizeThumbnails()

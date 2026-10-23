import type { Package } from './_types.ts'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { talkDirectory } from './_paths.ts'
import { talkRedirects } from './_redirects.ts'
import { getPackagesJson } from './_utils.ts'

function generateRedirects() {
  const packagesJson = getPackagesJson()
  const redirects = [] as string[]

  for (const packageJson of packagesJson) {
    const content = JSON.parse(readFileSync(packageJson, 'utf-8')) as Package

    redirects.push(...talkRedirects(talkDirectory(packageJson), content))
  }

  const localRedirects = readFileSync(join('.', '_redirects'), 'utf-8')

  writeFileSync(join('dist', '_redirects'), `${redirects.join('\n')}\n\n${localRedirects}`)
}

generateRedirects()

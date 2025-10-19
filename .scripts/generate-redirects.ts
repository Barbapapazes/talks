import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { getPackagesJson } from './_utils.ts'

function generateRedirects() {
  const packagesJson = getPackagesJson()
  const redirects = [] as string[]

  for (const packageJson of packagesJson) {
    const content = JSON.parse(readFileSync(packageJson, 'utf-8')) as { name: string, recording?: string }

    const date = packageJson.split('/')[0]
    const name = content.name

    redirects.push(`/${date}/${name}/pdf https://pdf.talks.soubiran.dev/${date}/${date}-${name}.pdf 302`)
    redirects.push(`/${date}/${name}/src https://github.com/Barbapapazes/talks/tree/main/${date} 302`)

    if (content.recording) {
      redirects.push(`/${date}/${name}/recording ${content.recording} 302`)
      redirects.push(`/${date}/${name}/audio https://audio.talks.soubiran.dev/${date}/${date}-${name}.mp3 302`)
      redirects.push(`/${date}/${name}/transcript https://soubiran.dev/talks/${date}/${name} 302`)
    }
  }

  const localRedirects = readFileSync(join('.', '_redirects'), 'utf-8')

  writeFileSync(join('dist', '_redirects'), `${redirects.join('\n')}\n\n${localRedirects}`)
}

generateRedirects()

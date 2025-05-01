import { readFileSync, writeFileSync } from 'node:fs'
import { fdir as Fdir } from 'fdir'
import { join } from 'pathe'

function generateRedirects() {
  const packagesJSON = new Fdir()
    .withBasePath()
    .glob('./**/package.json')
    .exclude((dirName) => {
      return dirName.startsWith('.') || dirName.startsWith('node_modules') || dirName.startsWith('theme')
    })
    .filter((dirName) => {
      return !dirName.startsWith('package.json')
    })
    .crawl('./')
    .sync()

  const redirects = [] as string[]

  for (const packageJSON of packagesJSON) {
    const content = JSON.parse(readFileSync(packageJSON, 'utf-8')) as { name: string, recording?: string }

    const date = packageJSON.split('/')[0]
    const name = content.name

    redirects.push(`/${date}/${name}/pdf https://pdf.talks.soubiran.dev/${date}/${date}-${name}.pdf 302`)
    redirects.push(`/${date}/${name}/src https://github.com/Barbapapazes/talks/tree/main/${date} 302`)

    if (content.recording) {
      redirects.push(`/${date}/${name}/recording ${content.recording} 302`)
    }
  }

  const localRedirects = readFileSync(join('.', '_redirects'), 'utf-8')

  writeFileSync(join('dist', '_redirects'), `${redirects.join('\n')}\n\n${localRedirects}`)
}

generateRedirects()

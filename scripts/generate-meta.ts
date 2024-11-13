import { readFileSync, writeFileSync } from 'node:fs'
import { fdir as Fdir } from 'fdir'
import { join } from 'pathe'

function generateMeta() {
  const packagesJSON = new Fdir()
    .withBasePath()
    .glob('./**/package.json')
    .exclude((dirName) => {
      return dirName.startsWith('.') || dirName.startsWith('node_modules')
    })
    .filter((dirName) => {
      return !dirName.startsWith('package.json')
    })
    .crawl('./')
    .sync()

  const meta = [] as {
    name: string
    date: string
    event: string
    url: string
    pdf_url: string
    github_url?: string
    recording_url?: string
  }[]

  for (const packageJSON of packagesJSON) {
    const date = packageJSON.split('/')[0]

    const content = JSON.parse(readFileSync(packageJSON, 'utf-8')) as {
      name: string
      event: string
      recording?: string
    }
    const event = content.event
    const url = `https://talks.soubiran.dev/${date}/${content.name}`
    const pdf_url = `${url}/pdf`
    const github_url = `https://github.com/Barbapapazes/talks/tree/main/${date}`
    const recording_url = `${url}/recording`

    const path = packageJSON.split('/').slice(0, -1).join('/')
    const slidesContent = readFileSync(join(path, 'slides.md'), 'utf-8')

    const name = slidesContent.match(/title: (.*)/)?.[1]

    if (!name) {
      throw new Error('Name not found')
    }

    meta.push({
      name,
      event,
      date,
      url,
      pdf_url,
      github_url,
      recording_url: content.recording ? recording_url : undefined,
    })
  }

  writeFileSync(join('dist', 'meta.json'), JSON.stringify({ data: meta }))
}

generateMeta()

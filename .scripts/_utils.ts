import { readdir } from 'node:fs/promises'
import { fdir as Fdir } from 'fdir'
import prompts from 'prompts'

export function getPackagesJson() {
  return new Fdir()
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
}

export async function selectDeck() {
  const folders = (await readdir(new URL('..', import.meta.url), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-/))
    .sort((a, b) => -a.localeCompare(b))

  return prompts([
    {
      type: 'select',
      name: 'folder',
      message: 'Pick a folder',
      choices: folders.map(folder => ({ title: folder, value: folder })),
    },
  ])
}

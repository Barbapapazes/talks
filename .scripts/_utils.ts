import { readdir } from 'node:fs/promises'
import { fdir as Fdir } from 'fdir'
import prompts from 'prompts'

const TALK_FOLDER_RE = /^\d{4}-/

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
  const [rootEntries, aiEntries] = await Promise.all([
    readdir(new URL('..', import.meta.url), { withFileTypes: true }),
    readdir(new URL('../ai-for-everyone/', import.meta.url), { withFileTypes: true }),
  ])

  const folders = [
    ...rootEntries
      .filter(dirent => dirent.isDirectory() && TALK_FOLDER_RE.test(dirent.name))
      .map(dirent => dirent.name),
    ...aiEntries
      .filter(dirent => dirent.isDirectory())
      .map(dirent => `ai-for-everyone/${dirent.name}`),
  ].sort((a, b) => -a.localeCompare(b))

  return prompts([
    {
      type: 'select',
      name: 'folder',
      message: 'Pick a folder',
      choices: folders.map(folder => ({ title: folder, value: folder })),
    },
  ])
}

import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import prompts from 'prompts'

async function startSelectDeck(args: string[]) {
  const folders = (await fs.readdir(new URL('..', import.meta.url), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-/))
    .sort((a, b) => -a.localeCompare(b))

  const result = await prompts([
    {
      type: 'select',
      name: 'folder',
      message: 'Pick a folder',
      choices: folders.map(folder => ({ title: folder, value: folder })),
    },
  ])

  if (result.folder) {
    if (args[0] === 'dev')
      execa('code', [fileURLToPath(new URL(`../${result.folder}/src/slides.md`, import.meta.url))])
    await execa('pnpm', ['run', ...args], {
      cwd: new URL(`../${result.folder}/src`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

startSelectDeck(process.argv.slice(2))

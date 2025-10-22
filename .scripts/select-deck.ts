import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import { selectDeck } from './_utils.ts'

async function startSelectDeck(args: string[]) {
  const deck = await selectDeck()

  if (deck.folder) {
    if (args[0] === 'dev')
      execa('code', [fileURLToPath(new URL(`../${deck.folder}/src/slides.md`, import.meta.url))])
    await execa('pnpm', ['run', ...args], {
      cwd: new URL(`../${deck.folder}/src`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

startSelectDeck(process.argv.slice(2))

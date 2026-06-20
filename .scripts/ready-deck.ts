import { resolve } from 'node:path'
import { execa } from 'execa'
import { selectDeck } from './_utils.ts'

async function startReadyDeck() {
  const deck = await selectDeck()

  if (!deck.folder) {
    return
  }

  const src = resolve(deck.folder, 'src')

  await execa('rm', ['-f', '.env'], { cwd: src, stdio: 'inherit' })
  await execa('pnpm', ['run', 'thumbnail'], { cwd: src, stdio: 'inherit' })
  await execa('pnpm', ['run', 'thumbnail:cp'], { cwd: src, stdio: 'inherit' })
  await execa('pnpm', ['run', 'thumbnail:dark'], { cwd: src, stdio: 'inherit' })
  await execa('pnpm', ['run', 'thumbnail:cp:dark'], { cwd: src, stdio: 'inherit' })

  // Optimize thumbnails
  await execa('pnpm', ['run', 'optimize:thumbnails'], { cwd: src, stdio: 'inherit' })

  await execa('pnpm', ['run', 'export'], { cwd: src, stdio: 'inherit' })

  // eslint-disable-next-line no-console
  console.log('rclone copy . perso:talks-soubiran-dev --filter-from ./copy-assets.txt --dry-run')
}

startReadyDeck()

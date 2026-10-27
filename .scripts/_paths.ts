import type { Package } from './_types.ts'
import { dirname } from 'node:path'

export function talkDirectory(packageFile: string): string {
  return dirname(dirname(packageFile))
}

export function talkPrefix(dir: string, pkg: Pick<Package, 'name'>): string {
  const folder = dir.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/$/, '')
  return folder.startsWith('ai-for-everyone/')
    ? folder
    : `${folder}/${pkg.name}`
}

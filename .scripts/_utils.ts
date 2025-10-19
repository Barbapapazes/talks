import { fdir as Fdir } from 'fdir'

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

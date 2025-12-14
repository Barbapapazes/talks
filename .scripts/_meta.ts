import type { MetaEntry, Package } from './_types'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

export async function generateMetaEntry(dir: string): Promise<MetaEntry> {
  const pkg = await readFile(join(dir, 'src', 'package.json'), 'utf-8')
  const slides = await readFile(join(dir, 'src', 'slides.md'), 'utf-8')

  const packageJson = JSON.parse(pkg) as Package
  const frontmatter = matter(slides).data

  return talkMetaEntryMapper(dir, packageJson, frontmatter)
}

function talkMetaEntryMapper(dir: string, pkg: Package, frontmatter: Record<string, any>): MetaEntry {
  const prefix = `${dir}/${pkg.name}`
  const url = `https://talks.soubiran.dev/${prefix}`
  const thumbnail_url = `${url}/thumbnail.png`
  const thumbnail_dark_url = `${url}/thumbnail-dark.png`
  const pdf_url = `${url}/pdf`
  const github_url = `${url}/src`
  const recording_url = `${url}/recording`
  const audio_url = `${url}/audio`
  const transcript_url = `https://soubiran.dev/talks/${prefix}`
  const article_url = `${url}/article`

  return {
    language: frontmatter.htmlAttrs.lang,
    name: frontmatter.title,
    event: pkg.event.name,
    event_url: pkg.event.url,
    prefix,
    // Keep only the first 10 characters (date) because talks given on the same day are suffixed with -1, -2, ...
    date: dir.slice(0, 10),
    description: pkg.description,
    folder: dir,
    url,
    thumbnail_url,
    thumbnail_dark_url,
    pdf_url,
    github_url,
    recording_url: pkg.recording ? recording_url : undefined,
    audio_url: pkg.recording ? audio_url : undefined,
    transcript_url: pkg.recording ? transcript_url : undefined,
    article_url: pkg.article ? article_url : undefined,
    location: pkg.event.location,
  }
}

import type { Package } from './_types.ts'
import { talkPrefix } from './_paths.ts'
import { audioFileName, getRecording, recordingRoute } from './_recordings.ts'
import { LOCALES } from './_types.ts'

export function talkRedirects(dir: string, pkg: Package): string[] {
  const prefix = talkPrefix(dir, pkg)
  const assetBase = `${pkg.date}-${pkg.name}`
  const redirects = [
    `/${prefix}/pdf https://pdf.talks.soubiran.dev/${dir}/${assetBase}.pdf 302`,
    `/${prefix}/src https://github.com/Barbapapazes/talks/tree/main/${dir} 302`,
  ]

  if (pkg.recording) {
    redirects.push(`/${prefix}/recording ${pkg.recording} 302`)
    redirects.push(`/${prefix}/audio https://audio.talks.soubiran.dev/${dir}/${assetBase}.mp3 302`)
  }

  for (const locale of LOCALES) {
    const recording = pkg.locales[locale].recording
    if (!recording) {
      continue
    }

    redirects.push(`/${prefix}/recording/${locale} ${recording} 302`)
    redirects.push(`/${prefix}/audio/${locale} https://audio.talks.soubiran.dev/${dir}/${audioFileName(pkg, locale)} 302`)
  }

  // Preserve the default routes for consumers that do not select a locale.
  if (!pkg.recording && getRecording(pkg, pkg.sourceLanguage)) {
    redirects.push(`/${prefix}/recording /${prefix}/${recordingRoute(pkg, pkg.sourceLanguage, 'recording')} 302`)
    redirects.push(`/${prefix}/audio /${prefix}/${recordingRoute(pkg, pkg.sourceLanguage, 'audio')} 302`)
  }

  if (pkg.publication !== 'article-resource' && LOCALES.some(locale => getRecording(pkg, locale))) {
    redirects.push(`/${prefix}/transcript https://soubiran.dev/talks/${prefix} 302`)
  }

  if (pkg.article) {
    redirects.push(`/${prefix}/article ${pkg.article} 302`)
  }

  return redirects
}

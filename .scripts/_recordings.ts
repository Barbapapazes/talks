import type { Locale, Package } from './_types.ts'
import { LOCALES } from './_types.ts'

export function getRecording(pkg: Package, locale: Locale): string | undefined {
  return pkg.locales[locale].recording ?? pkg.recording
}

export function recordingRoute(pkg: Package, locale: Locale, kind: 'recording' | 'audio'): string {
  return pkg.locales[locale].recording
    ? `${kind}/${locale}`
    : kind
}

export function audioFileName(pkg: Package, locale: Locale): string {
  const suffix = pkg.locales[locale].recording
    ? `.${locale}`
    : ''
  return `${pkg.date}-${pkg.name}${suffix}.mp3`
}

// A global recording is transcribed once in its source language. Localized
// recordings are independent originals, not translations of that recording.
export function getRecordingsToTranscribe(pkg: Package): { locale: Locale, url: string }[] {
  return LOCALES.flatMap((locale) => {
    const url = pkg.locales[locale].recording
      ?? (locale === pkg.sourceLanguage
        ? pkg.recording
        : undefined)
    return url
      ? [
          { locale, url },
        ]
      : []
  })
}

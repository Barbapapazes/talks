import type { Package } from './_types.ts'
import { stat } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { z } from 'zod'
import { LOCALES } from './_types.ts'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const SUMMARY_ARTIFACTS = LOCALES.map(locale => `summary.${locale}.md`)
const TRANSCRIPT_ARTIFACTS = LOCALES.map(locale => `transcript.${locale}.md`)

const nonEmptyString = z
  .string({ invalid_type_error: 'a non-empty string', required_error: 'a non-empty string' })
  .refine(value => value.trim().length > 0, 'a non-empty string')

const localeMetadataSchema = z.object({
  id: nonEmptyString.refine(id => UUID_V4_RE.test(id), 'a UUID v4'),
  title: nonEmptyString,
  description: nonEmptyString,
})

const packageSchema = z.object({
  name: nonEmptyString,
  date: z
    .string({ invalid_type_error: 'a valid date in YYYY-MM-DD format', required_error: 'a valid date in YYYY-MM-DD format' })
    .refine(isCanonicalDate, 'a valid date in YYYY-MM-DD format'),
  sourceLanguage: z.enum(LOCALES, {
    errorMap: () => ({ message: '"en" or "fr"' }),
  }),
  topics: z.array(
    z.string({ invalid_type_error: 'a non-empty, trimmed lowercase string', required_error: 'a non-empty, trimmed lowercase string' })
      .refine(topic => topic.length > 0 && topic === topic.trim() && topic === topic.toLowerCase(), 'a non-empty, trimmed lowercase string'),
    { invalid_type_error: 'a non-empty array of unique, trimmed lowercase strings', required_error: 'a non-empty array of unique, trimmed lowercase strings' },
  )
    .nonempty('a non-empty array of unique, trimmed lowercase strings')
    .superRefine((topics, context) => {
      const seen = new Set<string>()

      for (const [index, topic] of topics.entries()) {
        if (seen.has(topic)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'a topic that is unique within the talk',
            path: [index],
          })
        }

        seen.add(topic)
      }
    }),
  event: z.object({
    name: nonEmptyString,
    url: nonEmptyString,
    location: z.object({
      city: nonEmptyString,
      country: nonEmptyString,
      latitude: z.number({ invalid_type_error: 'a finite number', required_error: 'a finite number' }).refine(Number.isFinite, 'a finite number'),
      longitude: z.number({ invalid_type_error: 'a finite number', required_error: 'a finite number' }).refine(Number.isFinite, 'a finite number'),
    }),
  }),
  locales: z.object({
    en: localeMetadataSchema,
    fr: localeMetadataSchema,
  }),
  description: nonEmptyString.optional(),
  recording: nonEmptyString.optional(),
  article: nonEmptyString.optional(),
})

export interface TalkPackageSource {
  dir: string
  packageJson: unknown
}

export interface ValidatedTalkPackageSource {
  dir: string
  packageJson: Package
}

export function validateTalkPackages(sources: readonly TalkPackageSource[]): ValidatedTalkPackageSource[] {
  const validatedSources = sources.map(source => ({
    dir: source.dir,
    packageJson: validateTalkPackage(source.dir, source.packageJson),
  }))

  validateUniqueLocaleIds(validatedSources)
  return validatedSources
}

export function validateTalkPackage(dir: string, value: unknown): Package {
  const talk = talkName(dir)
  const result = packageSchema.safeParse(value)

  if (!result.success) {
    failSchemaValidation(talk, value, result.error.issues[0])
  }

  const packageJson = result.data
  validateDateMatchesFolder(talk, packageJson.date)

  return packageJson
}

export function validateUniqueLocaleIds(sources: readonly ValidatedTalkPackageSource[]): void {
  const seen = new Map<string, { field: string, talk: string }>()

  for (const source of sources) {
    const talk = talkName(source.dir)

    for (const locale of LOCALES) {
      const field = `locales.${locale}.id`
      const id = source.packageJson.locales[locale].id
      const normalizedId = id.toLowerCase()
      const previous = seen.get(normalizedId)

      if (previous) {
        fail(
          talk,
          field,
          `a globally unique UUID v4; ${describeValue(id)} is already used by talk "${previous.talk}" field "${previous.field}"`,
          id,
        )
      }

      seen.set(normalizedId, { field, talk })
    }
  }
}

export async function validateTalkArtifacts(dir: string, packageJson: Package): Promise<void> {
  const talk = talkName(dir)
  const artifactStates = await Promise.all([...SUMMARY_ARTIFACTS, ...TRANSCRIPT_ARTIFACTS].map(async (fileName) => {
    return {
      exists: await isFile(join(dir, 'src', 'public', fileName)),
      fileName,
    }
  }))

  for (const artifact of artifactStates) {
    const isSummary = SUMMARY_ARTIFACTS.includes(artifact.fileName)
    const expectsArtifact = isSummary || packageJson.recording !== undefined

    if (expectsArtifact && !artifact.exists) {
      fail(
        talk,
        `artifacts.${artifact.fileName}`,
        isSummary
          ? 'an existing summary file'
          : 'an existing transcript file because "recording" is set',
        'missing',
      )
    }

    if (!expectsArtifact && artifact.exists) {
      fail(
        talk,
        `artifacts.${artifact.fileName}`,
        'no transcript file because "recording" is not set',
        'present',
      )
    }
  }
}

function validateDateMatchesFolder(talk: string, value: string): void {
  const expectedDate = talk.slice(0, 10)
  if (value !== expectedDate) {
    fail(talk, 'date', `the folder date ${describeValue(expectedDate)}`, value)
  }
}

function isCanonicalDate(value: string): boolean {
  if (!DATE_RE.test(value)) {
    return false
  }

  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}

async function isFile(fileName: string): Promise<boolean> {
  try {
    return (await stat(fileName)).isFile()
  }
  catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      return false
    }

    throw error
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}

function talkName(dir: string): string {
  return basename(resolve(dir))
}

function failSchemaValidation(talk: string, value: unknown, issue: z.ZodIssue): never {
  fail(talk, formatIssuePath(issue.path), issue.message, getValueAtPath(value, issue.path))
}

function formatIssuePath(path: (string | number)[]): string {
  return path.reduce<string>((field, segment) => {
    return typeof segment === 'number'
      ? `${field}[${segment}]`
      : field
        ? `${field}.${segment}`
        : segment
  }, '') || 'package.json'
}

function getValueAtPath(value: unknown, path: (string | number)[]): unknown {
  let current = value

  for (const segment of path) {
    if (!current || typeof current !== 'object') {
      return undefined
    }

    current = (current as Record<string | number, unknown>)[segment]
  }

  return current
}

function fail(talk: string, field: string, expected: string, received: unknown): never {
  throw new Error(`Invalid metadata for talk "${talk}": field "${field}" expected ${expected}; received ${describeValue(received)}`)
}

function describeValue(value: unknown): string {
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }

  if (value === undefined) {
    return 'undefined'
  }

  return JSON.stringify(value) ?? String(value)
}

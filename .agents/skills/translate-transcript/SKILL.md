---
name: translate-transcript
description: "Use when a user asks to translate or regenerate a finalized talk transcript between English and French."
user-invocable: true
---

# Translate transcript

Translate a single-speaker talk transcript between English and French while preserving meaning, tone, technical accuracy, and structure.

## Preflight

- Work on one selected talk only. Read its `src/package.json` before reading or writing prose.
- Require a non-empty `recording` and a `sourceLanguage` of `en` or `fr`. If either is missing, stop without writing files and report the reason.
- Read only `src/public/transcript.<sourceLanguage>.md`. If it is missing, stop without writing files and report the reason.
- Derive the target language from `sourceLanguage`: `en` becomes `fr`; `fr` becomes `en`. Do not detect either language from the transcript text.
- Write only `src/public/transcript.<targetLanguage>.md`. Never modify the source transcript or either summary.
- If the target file exists, leave it byte-for-byte unchanged. Replace it only when the user explicitly requests regeneration of that target language or both transcript translations for that talk.
- Prepare the complete translation before writing. If any step fails, leave every prose file unchanged.

## Output format

- Return only the translated transcript text. No frontmatter, headings, explanations, or timestamps.
- Keep paragraphing: 1-3 sentences per paragraph, separated by a single blank line.
- Do not include the source text; output must be translation only.
- Do not emit YAML frontmatter, title headings, speaker labels, or translation notes.
- If preflight prevents a write, return a short explanation instead of transcript text.

## Translation rules

- Translate idiomatically; prefer natural phrasing over literal word-for-word.
- Preserve meaning, tone, intent, and level of formality.
- Keep proper nouns, product names, code, commands, URLs, file paths, and version numbers exactly as-is.
- Convert clearly enumerated spoken lists into simple sentences or list-like flow with commas; avoid bullets.
- Normalize whitespace and merge broken lines.
- Keep existing markers like [inaudible] in place and untranslated.
- If the speaker states their name, keep it exactly as: Estéban Soubiran.

## Don't

- Do not summarize, omit, or add content.
- Do not translate code tokens, CLI flags, library/package names, or URLs.
- Do not invent speakers or labels; assume a single speaker and remove any diarization tags.
- Do not output notes about the translation or the source language.
- Do not change version names or numbers from the source.

## Numbers, dates, and units

- Preserve numerals for dates, times, percentages, currency, measurements, and versions, such as Node 18, 3.2%, $50, and 10 km.
- Spell out one through nine in plain prose only when idiomatic for the target language; otherwise use numerals.
- Keep original numeral formatting if clearly intentional.

## Acronyms and casing

- Keep acronyms uppercase, such as API, HTTP, SSR, and CI/CD.
- Do not expand acronyms unless the speaker expands them.

## Unclear audio and foreign language segments

- If a word or segment is unintelligible, keep [inaudible]; do not guess.
- If a segment is in a language other than English or French, replace it with [inaudible].

## Typography and punctuation

- English target: use standard English punctuation and quotes ("..."). No non-breaking spaces before `:`, `;`, `!`, or `?`.
- French target: use French typographic conventions when natural:
  - Prefer « ... » or “ ... ” consistently; either is acceptable.
  - Insert narrow non-breaking spaces before `:`, `;`, `!`, and `?` when appropriate.
  - Translate common contractions idiomatically, such as "that's" to « c'est ».

## Examples

### EN to FR

Input: Today I'm going to talk about Nuxt 3. It ships with an API server.

Output: Aujourd'hui, je vais parler de Nuxt 3. Il est livré avec un serveur d'API.

### FR to EN

Input: Aujourd'hui, je vais parler de Nuxt 3. Il est livré avec un serveur d'API.

Output: Today, I'm going to talk about Nuxt 3. It comes with an API server.
---
mode: 'agent'
model: GPT-5
description: Translate talk transcripts between English and French; preserve meaning and technical tokens; write to transcribe.fr.md or transcribe.en.md; do not modify versions.
---

Goal
Translate a single-speaker talk transcript between English and French while preserving meaning, tone, technical accuracy, and structure.

Target language
- Detect the source language (English or French).
- Translate into the other one:
  - If source is English → output French.
  - If source is French → output English.

Output format
- Return only the translated transcript text. No headings, explanations, timestamps, or metadata.
- Keep paragraphing: 1–3 sentences per paragraph, separated by a single blank line.
- Do not include the source text; output must be translation only.
- File naming and destination:
  - If target is French, write to a file named transcribe.fr.md in the same directory.
  - If target is English, write to a file named transcribe.en.md in the same directory.
  - Do not modify or overwrite the source/original-language file.

Translation rules (Do)
- Translate idiomatically; prefer natural phrasing over literal word-for-word.
- Preserve meaning, tone, intent, and level of formality.
- Keep proper nouns, product names, code, commands, URLs, file paths, and version numbers exactly as-is.
- Convert clearly enumerated spoken lists into simple sentences or list-like flow with commas; avoid bullets.
- Normalize whitespace and merge broken lines.
- Keep existing markers like [inaudible] in place and untranslated.
- If the speaker states their name, keep it exactly as: Estéban Soubiran.

Don’t
- Do not summarize, omit, or add content.
- Do not translate code tokens, CLI flags, library/package names, or URLs.
- Do not invent speakers or labels; assume a single speaker and remove any diarization tags.
- Do not output notes about the translation or the source language.
- Do not touch the given version; keep version names and numbers exactly as in the source.

Numbers, dates, and units
- Preserve numerals for dates, times, percentages, currency, measurements, and versions (e.g., Node 18, 3.2%, $50, 10 km).
- Spell out one through nine in plain prose only when idiomatic for the target language; otherwise use numerals.
- Keep original numeral formatting if clearly intentional.

Acronyms and casing
- Keep acronyms uppercase (API, HTTP, SSR, CI/CD).
- Do not expand acronyms unless the speaker expands them.

Unclear audio and foreign language segments
- If a word/segment is unintelligible, keep [inaudible]; do not guess.
- If a segment is in a language other than English or French, replace it with [inaudible].

Typography and punctuation
- English target: use standard English punctuation and quotes ("…"). No non-breaking spaces before : ; ! ?.
- French target: use French typographic conventions when natural:
  - Prefer « … » or “ … ” consistently; either is acceptable.
  - Insert (narrow) non-breaking spaces before : ; ! ? when appropriate.
  - Translate common contractions idiomatically (e.g., “that’s” → « c’est »).

Tiny examples
- EN → FR
  Input: Today I’m going to talk about Nuxt 3. It ships with an API server.
  Output: Aujourd’hui, je vais parler de Nuxt 3. Il est livré avec un serveur d’API.

- FR → EN
  Input: Aujourd’hui, je vais parler de Nuxt 3. Il est livré avec un serveur d’API.
  Output: Today, I’m going to talk about Nuxt 3. It comes with an API server.

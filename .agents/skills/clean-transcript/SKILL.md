---
name: clean-transcript
description: "Use when a user asks to clean or regenerate a source-language talk transcript."
user-invocable: true
---

# Clean transcript

Produce a clean, single-speaker source transcript that reads naturally while preserving meaning, tone, and technical accuracy.

## Preflight

- Work on one selected talk only. Read its `src/package.json` before reading or writing prose.
- Require a non-empty `recording` and a `sourceLanguage` of `en` or `fr`. If either is missing, stop without writing files and report the reason.
- The only source transcript is `src/public/transcript.<sourceLanguage>.md`. Do not infer its language from its contents.
- Require that source transcript to exist. If it is missing, stop without writing files and report the reason.
- Replace the source transcript only when the user explicitly asks to clean or regenerate that talk's source transcript. Otherwise, inspect it and report that no file was changed.
- Never modify `transcript.<otherLanguage>.md`, `summary.en.md`, or `summary.fr.md`.
- Prepare the complete cleaned transcript before replacing the source file. If any step fails, leave the original file unchanged.

## Output format

- Return only the cleaned transcript text. No headings, explanations, timestamps, or metadata.
- Use paragraphs separated by a single blank line. Aim for 1-3 sentences per paragraph.
- Write only to `src/public/transcript.<sourceLanguage>.md` after the preflight succeeds.
- Do not emit YAML frontmatter. If the input contains legacy frontmatter, discard it rather than reproducing it.
- If preflight prevents a write, return a short explanation instead of transcript text.

## Editing rules

- Fix grammar, punctuation, and capitalization.
- Remove non-lexical fillers: "uh", "um", "er", "hmm", "you know", "like" when not meaningful.
- Trim false starts and stutters; remove exact repetitions unless used for emphasis.
- Keep emphasis words that change tone or meaning.
- Preserve proper nouns, product names, code, commands, URLs, and file paths exactly.
- If the speaker states their name, transcribe it exactly as "Estéban Soubiran".
- Normalize whitespace and merge broken lines.
- Retain Q&A content when it is present in the recording.

## Don't

- Do not summarize, reorder, or add content.
- Do not change technical terms or code tokens.
- Do not invent speakers or labels; assume a single speaker and remove any diarization tags.
- Do not include stage directions, editorial notes, title headings, or frontmatter.

## Numbers, dates, and units

- Use numerals for dates, times, percentages, currency, measurements, and version numbers, such as Node 18, 3.2%, $50, and 10 km.
- Spell out one through nine in plain prose when not tied to units; use numerals otherwise.
- Keep original numeral formatting if clearly intentional.

## Acronyms and casing

- Keep acronyms uppercase, such as API and HTTP.
- Don't expand acronyms unless the speaker expands them.

## Language

- Talks are only in English or French.
- A single talk will not mix English and French.
- If audio contains any language other than English or French, treat that as a transcription issue: do not attempt to transcribe or translate it; insert [inaudible] for segments in another language or when language is clearly not English/French.
- If it's unclear whether a segment is English or French, mark it [inaudible] rather than guessing.

## Foreign words and names

Keep as spoken; do not translate. Add accents if obvious from context.

## Unclear audio

If a word is genuinely unintelligible, insert [inaudible] rather than guessing; use sparingly.

## Formatting cues

- Convert clearly enumerated spoken lists into simple sentences or maintain list-like flow with commas; avoid bullets.
- Preserve quoted material with quotation marks.

## Example

Input: "So, uh, today I'm gonna, um, talk about Nuxt. Nuxt 4, I mean, well, sorry, Nuxt 3. It ships with an API server."

Output: "Today I'm going to talk about Nuxt. Nuxt 3 ships with an API server."
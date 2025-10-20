---
mode: 'agent'
model: GPT-5
description: Improve automatic transcription of audio files by enhancing accuracy and reducing errors.
---

Goal
Produce a clean, single-speaker transcript that reads naturally while preserving meaning, tone, and technical accuracy.

Output format
- Return only the cleaned transcript text. No headings, explanations, timestamps, or metadata.
- Use paragraphs separated by a single blank line. Aim for 1–3 sentences per paragraph.
- Write the cleaned transcript directly into the source file, replacing the original transcription.

Editing rules (Do)
- Fix grammar, punctuation, and capitalization.
- Remove non-lexical fillers: “uh”, “um”, “er”, “hmm”, “you know”, “like” when not meaningful.
- Trim false starts and stutters; remove exact repetitions unless used for emphasis.
- Keep emphasis words that change tone or meaning.
- Preserve proper nouns, product names, code, commands, URLs, and file paths exactly.
- If the speaker states their name, transcribe it exactly as "Estéban Soubiran".
- Normalize whitespace and merge broken lines.

Don’t
- Do not summarize, reorder, or add content.
- Do not change technical terms or code tokens.
- Do not invent speakers or labels; assume a single speaker and remove any diarization tags.
- Do not include stage directions or editorial notes (except as noted for unclear audio).

Numbers, dates, and units
- Use numerals for dates, times, percentages, currency, measurements, and version numbers (e.g., Node 18, 3.2%, $50, 10 km).
- Spell out one through nine in plain prose when not tied to units; use numerals otherwise.
- Keep original numeral formatting if clearly intentional.

Acronyms and casing
- Keep acronyms uppercase (e.g., API, HTTP).
- Don’t expand acronyms unless the speaker expands them.

Language
- Talks are only in English or French.
- A single talk will not mix English and French.
- If audio contains any language other than English or French, treat that as a transcription issue: do not attempt to transcribe or translate it; insert [inaudible] for segments in another language or when language is clearly not English/French.
- If it's unclear whether a segment is English or French, mark it [inaudible] rather than guessing.

Foreign words and names
- Keep as spoken; do not translate. Add accents if obvious from context.

Unclear audio
- If a word is genuinely unintelligible, insert [inaudible] rather than guessing; use sparingly.

Formatting cues
- Convert clearly enumerated spoken lists into simple sentences or maintain list-like flow with commas; avoid bullets.
- Preserve quoted material with quotation marks.

Tiny example
Input (noisy): "So, uh, today I'm gonna, um, talk about Nuxt. Nuxt 4, I mean—well, sorry—Nuxt 3. It ships with an API server."
Output (clean): Today I’m going to talk about Nuxt. Nuxt 3 ships with an API server.

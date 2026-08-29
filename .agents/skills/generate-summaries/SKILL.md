---
name: generate-summaries
description: "Use when a user asks to generate or regenerate localized summaries for a talk."
user-invocable: true
---

# Generate summaries

Create concise, editorial summaries in English and French that explain what the talk covers and what the viewer can learn or discover.

## Preflight

- Work on one selected talk only. Read its `src/package.json` and `src/slides.md` before writing prose. When available, also read the finalized `src/public/transcript.<sourceLanguage>.md`.
- Require a `sourceLanguage` of `en` or `fr`. If it is missing, stop without writing files and report the reason.
- Require `slides.md` to exist. A source-language transcript is optional.
- The destinations are `src/public/summary.en.md` and `src/public/summary.fr.md`.
- Never read, translate, rewrite, or otherwise use one summary as the source for the other. Generate each locale independently from `slides.md` and, when available, the finalized source transcript.
- Inspect both destinations before producing output. Generate only missing summaries.
- If a destination exists, leave it byte-for-byte unchanged. Replace it only when the user explicitly requests regeneration of that language or both summaries for that talk.
- If both summaries already exist and no requested regeneration applies, stop without writing files and report that no file was changed.
- Create all required summary candidates before writing any file. If validation fails for either candidate, write neither file.

## Output format

- Write only the requested missing or explicitly regenerated summary files.
- Each summary is Markdown prose with no YAML frontmatter, title heading, timestamps, speaker labels, or notes about the generation process.
- Use concise editorial prose. Use multiple short paragraphs by default. A short Markdown list is acceptable only when it makes the subject easier to scan.
- Return only the summary text for the file being written. If preflight prevents a write, return a short explanation instead.

## Content rules

- Base every claim on the slides or source transcript. Do not invent details, outcomes, or claims.
- Explain the talk's subject and the useful ideas, techniques, trade-offs, or examples a viewer will encounter.
- Write natural, idiomatic English for `summary.en.md` and natural, idiomatic French for `summary.fr.md`.
- Do not mechanically reuse the localized package description.
- Exclude event logistics, QR-code instructions, personal introductions, and promotion unless they are necessary to understand the talk itself.
- Do not turn the summary into a transcript or slide-by-slide outline.
- Preserve technical names and code identifiers where translation would make them unclear or incorrect.

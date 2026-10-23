# `.scripts`

Utility scripts used to maintain talk metadata, assets, and deployment helpers.

## Helpers

- `_types.ts` — Shared TypeScript types for talk packages, localized public metadata, and event/location models.
- `_validation.ts` — Validates talk package metadata, locale UUIDs, dates, and expected prose artifacts.
- `_utils.ts` — Shared utilities to discover talk `package.json` files and interactively select a deck.
- `_paths.ts` — Resolves deck folders and deployed prefixes, including `ai-for-everyone/<deck>`.
- `_recordings.ts` — Resolves localized recordings with a global fallback, audio filenames, and independent transcription jobs.
- `_redirects.ts` — Builds each deck's asset and recording redirects.
- `_meta.ts` — Builds README metadata and localized public metadata from a talk's `src/package.json`.
- `_readme.ts` — Generates README content and statistics (global README + per-talk README helpers).

## Scripts

- `select-deck.ts` — Prompts for a talk folder, then runs `pnpm run <args...>` in that deck's `src` folder.
  - Special case: with `dev`, opens the selected `slides.md` in VS Code before starting.

- `ready-deck.ts` — Interactive “prepare for publish” flow for one deck:
  1. removes local `.env` in `src`
  2. generates light + dark thumbnails
  3. optimizes thumbnails
  4. exports the deck
  5. prints the `rclone` copy command

- `generate-meta.ts` — Validates every talk package, then generates:
  - each built talk's `dist/<prefix>/meta.en.json` and `meta.fr.json`
    from the localized records in `src/package.json`
  - `dist/meta.json` with the existing README metadata array and computed statistics
  - `dist/statistics.json`, containing the same computed statistics
  - `dist/talks.en.json` and `dist/talks.fr.json`, each containing the corresponding
    localized standalone talk metadata entries
  - `dist/resources.en.json` and `dist/resources.fr.json`, containing article resources without UUIDs

- `generate-readme.ts` — Regenerates the repository root `README.md` from discovered talk metadata. AI for Everyone decks are temporarily excluded from all lists and statistics in this README.

- `generate-talk-readme.ts` — Regenerates each talk folder's `README.md` from metadata, including `ai-for-everyone/<deck>/README.md`. This does not add these decks to the root README.

- `generate-redirects.ts` — Builds `dist/_redirects` for talk routes (`pdf`, `src`, and optional `recording/audio/transcript/article`) and appends root `_redirects` entries.

- `generate-thumbnails.ts` — Loops through all talks and runs each deck's thumbnail generation/copy commands (light + dark).

- `optimize-thumbnails.ts` — Runs `optipng` on generated thumbnails and prints per-file + total size savings.

- `sort-slides-frontmatter.ts` — Reorders Slidev slide frontmatter keys:
  - leaves the top-level `slides.md` frontmatter block untouched
  - sorts each slide frontmatter block with this priority: `name`, `group`, `ready`, `timing`, `choices`, `layout`, `img`, `click`/`clicks`, `transition`
  - sorts any remaining keys alphabetically after those
  - accepts a talk folder, a `src` folder, or a direct `slides.md` path

- `download-recordings.ts` — Processes global and localized recordings:
  - downloads audio (`yt-dlp`)
  - normalizes/compresses with `ffmpeg`
  - transcribes a global recording once in `sourceLanguage`, unless that locale has its own recording
  - transcribes every `locales.<locale>.recording` independently in that locale's language
  - writes `src/public/transcript.<locale>.md` only after every chunk for that recording succeeds
  - uses `<date>-<name>.<locale>.mp3` for localized recordings, keeping the old `<date>-<name>.mp3` for a global recording
  - preserves each existing transcript unless run with `--force`

- `redeploy-worker.ts` — Uses Cloudflare API to re-trigger the currently active worker build/deployment.

## Editorial prompts

These prompts handle one-time prose work that the scripts deliberately do not perform. They preserve existing prose unless regeneration is explicitly requested.

- `.github/prompts/clean-transcript.prompt.md` — Cleans the source-language transcript without adding frontmatter, headings, or timestamps.
- `.github/prompts/translate-transcript.prompt.md` — Creates the missing transcript in the other locale from the finalized source transcript.
- `.github/prompts/generate-summaries.prompt.md` — Creates missing English and French summaries from `slides.md`, using the finalized source transcript when one exists.

Every talk publishes `summary.en.md` and `summary.fr.md`. A global recording requires both transcripts, with the other language translated from the original. A localized recording requires a transcript in its own locale. When both locales have recordings, transcribe and clean both independently; do not translate one over the other.

## Localized recordings

Keep `sourceLanguage` as the reference language, `en` for AI for Everyone. Add each video URL under `locales.en.recording` or `locales.fr.recording` when it is available. Omit missing URLs rather than using empty strings or placeholders.

For each locale, `locales.<locale>.recording` takes priority over the global `recording`. Global-only talks retain their existing routes. Localized videos use `/<prefix>/recording/en` and `/<prefix>/recording/fr`, with matching `audio/en` and `audio/fr` routes. The unqualified routes fall back to the reference-language recording when there is no global recording. Localized public metadata selects the correct video, YouTube embed, audio, and transcript artifact for its locale.

AI for Everyone decks use `ai-for-everyone/<deck>` as their prefix, without appending the deck name again. Their dates are validated as calendar dates, but need not match the folder name. `event.location` is optional for content without a physical venue; such entries are omitted from city statistics.

## Article resources

Set `"publication": "article-resource"` in the deck's `src/package.json` when its canonical content is an article on soubiran.dev. Omit `locales.en.id` and `locales.fr.id`: validation rejects UUIDs for article resources. Standalone talks (the default, or explicit `"standalone"`) still require globally unique locale UUIDs.

Resources keep their slug, localized metadata, summaries, transcripts, and asset links. They are published in `resources.<locale>.json` and `<slug>/meta.<locale>.json`, not in `talks.<locale>.json`, legacy `meta.json`, or talk statistics. No resource transcript link or redirect points at a nonexistent standalone `/talks/` page.

The article owns its `contentId` and lives at the corresponding `ai-for-everyone/<slug>` path on the website. The dedicated article route joins resources by URL-derived slug and article locale; no resource reference is needed in frontmatter. Only the article enters `pages.en.json` or `pages.fr.json`. No UUID needs to be synchronized between repositories.

Deploy these resource catalogs before deploying a website version that consumes them.

## Environment variables

- `OPENAI_API_KEY` — required by `download-recordings.ts`.
- `CF_API_TOKEN` — required by `redeploy-worker.ts`.

## External CLI dependencies

Some scripts call external tools directly; ensure these are installed when needed:

- `yt-dlp`
- `ffmpeg` / `ffprobe`
- `optipng`
- `rclone` (for the final manual upload command)

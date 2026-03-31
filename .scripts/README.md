# `.scripts`

Utility scripts used to maintain talks metadata, assets, and deployment helpers.

## Helpers

- `_types.ts` — Shared TypeScript types (`Package`, `MetaEntry`, event/location models).
- `_utils.ts` — Shared utilities to discover talk `package.json` files and interactively select a deck.
- `_meta.ts` — Builds one `MetaEntry` from a talk folder (`src/package.json` + `src/slides.md` frontmatter).
- `_readme.ts` — Generates README content and statistics (global README + per-talk README helpers).

## Scripts

- `select-deck.ts` — Prompts for a talk folder, then runs `pnpm run <args...>` in that deck’s `src` folder.
  - Special case: with `dev`, opens the selected `slides.md` in VS Code before starting.

- `ready-deck.ts` — Interactive “prepare for publish” flow for one deck:
  1. removes local `.env` in `src`
  2. generates light + dark thumbnails
  3. optimizes thumbnails
  4. exports the deck
  5. prints the `rclone` copy command

- `generate-meta.ts` — Generates `dist/meta.json` with:
  - full talks metadata array
  - computed statistics (by year, event, title)
  - duplicate talk guard (`name + event`)

- `generate-readme.ts` — Regenerates the repository root `README.md` from discovered talk metadata.

- `generate-talk-readme.ts` — Regenerates each talk folder’s `README.md` from metadata.

- `generate-redirects.ts` — Builds `dist/_redirects` for talk routes (`pdf`, `src`, and optional `recording/audio/transcript/article`) and appends root `_redirects` entries.

- `generate-thumbnails.ts` — Loops through all talks and runs each deck’s thumbnail generation/copy commands (light + dark).

- `optimize-thumbnails.ts` — Runs `optipng` on generated thumbnails and prints per-file + total size savings.

- `generate-tree.ts` — For Choose-Your-Own-Adventure decks:
  - validates slide graph (`choices`, duplicate names, unresolved targets)
  - outputs `.data/slides.graph.json`
  - outputs Mermaid text + SVG graph

- `sort-slides-frontmatter.ts` — Reorders Slidev slide frontmatter keys:
  - leaves the top-level `slides.md` frontmatter block untouched
  - sorts each slide frontmatter block with this priority: `name`, `group`, `ready`, `timing`, `choices`, `layout`, `img`, `click`/`clicks`, `transition`
  - sorts any remaining keys alphabetically after those
  - accepts a talk folder, a `src` folder, or a direct `slides.md` path

- `download-recordings.ts` — For talks with a `recording` URL:
  - downloads audio (`yt-dlp`)
  - normalizes/compresses with `ffmpeg`
  - transcribes chunks with OpenAI (`gpt-4o-transcribe`)
  - writes/updates `src/public/transcript.en.md`

- `redeploy-worker.ts` — Uses Cloudflare API to re-trigger the currently active worker build/deployment.

## Environment variables

- `OPENAI_API_KEY` — required by `download-recordings.ts`.
- `CF_API_TOKEN` — required by `redeploy-worker.ts`.

## External CLI dependencies

Some scripts call external tools directly; ensure these are installed when needed:

- `yt-dlp`
- `ffmpeg` / `ffprobe`
- `optipng`
- `mmdc` (Mermaid CLI)
- `rclone` (for the final manual upload command)

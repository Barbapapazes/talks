## Plan: Replayable fake ChatGPT chat (typewriter + search + streamed markdown)

Create a purely visual chat UI for Slidev that replays every time the slide is entered: a user prompt types out, then a “Searching…” spinner, then “Thinking…”, then the assistant answer streams in. The assistant stream is driven by `tiktoken` token boundaries (computed at build time) and rendered as HTML converted from Markdown using `markdown-it` inside a Vite virtual module, so `markdown-it` is not shipped to the browser runtime. The chatbox has a fixed height with its own scroll; it stays pinned to the bottom unless the user scrolls up.

### Steps 1–6
1. Add build-time dependencies and Vite WASM support
   - Update root package.json to add dev deps: `markdown-it`, `tiktoken`, `vite-plugin-wasm`, `vite-plugin-top-level-await`.
   - Update vite.config.ts to register `wasm()` + `topLevelAwait()` plugins while preserving existing `optimizeDeps.include`.

2. Create a Vite virtual module that precomputes stream “frames”
   - Add a small plugin file like 2026-01-22/src/vite/virtual-inertia-from-ai.ts.
   - The plugin should:
     - read a deck-local Markdown file (see next step),
     - tokenize the raw Markdown once using `tiktoken` (any encoder you choose),
     - build an array of incremental text chunks (e.g. every N tokens),
     - convert each chunk to HTML via `markdown-it`,
     - expose `assistantHtmlFrames: string[]` (and optionally `rawMarkdown`, `tokenCount`) from a virtual import like `virtual:inertia-from-ai`.

3. Add the assistant content as a separate Markdown file
   - Create 2026-01-22/src/content/inertia-from-ai.md with placeholder lorem ipsum (no code blocks for now).
   - Keep it easy to edit (your “real content later” workflow), and let the plugin regenerate frames automatically on reload.

4. Implement the chat UI + animation state machine in the component
   - Implement InertiaFromAI.vue (currently empty) to:
     - reset all state on `onSlideEnter` and start the animation,
     - clear timers/raf on `onSlideLeave` (so revisiting replays cleanly),
     - render a ChatGPT-like facade: header, message list, faux input row (non-interactive).
   - Animation phases (single linear timeline):
     - `typingUser` (typewriter your placeholder prompt)
     - `searching` (spinner + “Searching…”)
     - `thinking` (animated dots + “Thinking…”)
     - `streaming` (iterate through `assistantHtmlFrames` over time)
     - `done`

5. Add small internal building blocks (optional, but keeps it clean)
   - Either inline in `InertiaFromAI.vue` or as small files under 2026-01-22/src/components/inertia-from-ai/:
     - `ChatMessageBubble` (role: `user|assistant`, avatar, bubble chrome)
     - `ChatStatusLine` (spinner/dots line for searching/thinking)
   - Composables (can be local functions if you prefer):
     - `useTypewriter(text, speedMs)` → progressively revealed string + cursor state
     - `useStickToBottom(scrollEl)` → auto-scroll unless user scrolls away from bottom
     - `useTimeline(durations)` → schedules phase transitions; returns cancel/reset hooks

6. Make everything configurable (so you can tune pacing anytime)
   - Add props to `InertiaFromAI` with defaults:
     - `userPrompt` (placeholder string)
     - `typewriterCharDelayMs`
     - `searchDurationMs`
     - `thinkingDurationMs`
     - `streamFrameDelayMs`
     - `streamFramesPerTick` (or “frames per second” style)
     - `height` (e.g. `420px`), for fixed viewport sizing
   - Ensure dark/light mode styling:
     - rely on `.dark` selector conventions already used in the theme (see layouts.css),
     - use neutral palette variables/utility classes so it looks good in both modes.

### Further Considerations 1–3
1. HTML rendering safety: since content is local, `v-html` is acceptable; optional sanitizer later.
2. Stream smoothness vs perf: prefer grouping tokens into frames (not 1 token = 1 frame).
3. Replay determinism: ensure timers are recreated fresh on every `onSlideEnter`.

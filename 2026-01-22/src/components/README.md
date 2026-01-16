# InertiaFromAI Component

This component creates a replayable fake ChatGPT chat UI that demonstrates streaming AI responses with typewriter effects.

## Features

- **Typewriter effect**: User prompt types out character by character
- **Searching phase**: Shows a spinner with "Searching..." message
- **Thinking phase**: Displays animated thinking dots with "Thinking..." message
- **Streaming response**: Assistant response streams in token by token (computed at build time using tiktoken)
- **Build-time optimization**: HTML is pre-rendered from Markdown using markdown-it, so markdown-it is NOT shipped to the browser
- **Replay on slide enter**: Animation automatically replays each time the slide is entered
- **Dark/light mode**: Fully styled for both themes

## How it works

1. **Virtual Module**: `vite/virtual-inertia-from-ai.ts` reads the markdown content from `content/inertia-from-ai.md` at build time
2. **Tokenization**: Uses `tiktoken` to split content into tokens (GPT-4 tokenizer)
3. **Chunking**: Groups tokens into frames (~10 tokens per frame) for smooth streaming
4. **HTML Generation**: Each chunk is converted to HTML using `markdown-it` at build time
5. **Bundle**: The pre-rendered HTML frames are bundled into the JavaScript for instant access

## Usage

```vue
<InertiaFromAI />
```

### Props

All props are optional with sensible defaults:

- `userPrompt` (string): The user's question. Default: `"Qu'est-ce qu'Inertia.js ?"`
- `typewriterCharDelayMs` (number): Delay between each character when typing. Default: `50`
- `searchDurationMs` (number): How long to show the "Searching..." phase. Default: `1500`
- `thinkingDurationMs` (number): How long to show the "Thinking..." phase. Default: `1000`
- `streamFrameDelayMs` (number): Delay between streaming each frame. Default: `50`
- `streamFramesPerTick` (number): Number of frames to advance per tick. Default: `1`
- `height` (string): Fixed height of the chat container. Default: `"500px"`

### Example with custom props

```vue
<InertiaFromAI
  userPrompt="What is Vue.js?"
  :typewriterCharDelayMs="30"
  :searchDurationMs="2000"
  height="600px"
/>
```

## Customizing Content

To change the assistant's response, edit the markdown file:

```
2026-01-22/src/content/inertia-from-ai.md
```

The content will be automatically tokenized and converted to HTML at build time.

## Technical Details

### Animation State Machine

The component progresses through these phases:
1. `idle` - Initial state before animation starts
2. `typingUser` - User message types out
3. `searching` - Shows searching indicator
4. `thinking` - Shows thinking dots
5. `streaming` - Assistant response streams in
6. `done` - Animation complete

### Lifecycle

- `onSlideEnter`: Starts the animation from the beginning
- `onSlideLeave`: Resets the animation state and clears all timers

### Styling

The component uses utility classes and scoped CSS with support for:
- Neutral color palette for light mode
- Dark mode variants using `.dark` selector
- Responsive chat bubble sizing
- Smooth animations for spinner and thinking dots

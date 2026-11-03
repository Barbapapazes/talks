<script lang="ts">
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import json from 'shiki/langs/json.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import { computed } from 'vue'

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [json],
  themes: [githubLight, githubDark],
})
</script>

<script setup lang="ts">
const props = defineProps<{ wrap?: boolean, code?: string, language?: 'json' }>()
const tokens = computed(() => {
  if (props.code === undefined || props.language !== 'json')
    return undefined

  // Tool responses may be plain text. Keep those readable without guessing.
  try {
    JSON.parse(props.code)
  }
  catch {
    return undefined
  }

  return highlighter.codeToTokens(props.code, {
    lang: 'json',
    defaultColor: false,
    themes: { light: 'github-light', dark: 'github-dark' },
  }).tokens.flatMap((line, index) => [
    ...(index ? [{ content: '\n', htmlStyle: {} }] : []),
    ...line,
  ])
})
</script>

<template>
  <pre data-slot="code-block-content" :data-wrap="wrap || undefined" dir="ltr" tabindex="0" class="ui-code-block-content"><code data-slot="code-block-code"><template v-if="tokens"><span v-for="(token, index) in tokens" :key="index" class="syntax-token" :style="token.htmlStyle">{{ token.content }}</span></template><template v-else-if="code !== undefined">{{ code }}</template><slot v-else /></code></pre>
</template>

<style scoped>
.ui-code-block-content {
  min-height: 0;
  min-width: 0;
  margin: 0;
  padding: 12px;
  overflow: auto;
  text-align: start;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: inherit;
  background: transparent;
}
.syntax-token { color: var(--shiki-light); }
:global(.dark) .syntax-token { color: var(--shiki-dark); }
.ui-code-block-content[data-wrap] { white-space: pre-wrap; overflow-wrap: anywhere; }
.ui-code-block-content:focus-visible { outline: 2px solid var(--ui-ring); outline-offset: -2px; }
</style>

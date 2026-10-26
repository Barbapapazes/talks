<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: Record<string, unknown>
  highlightFields?: string[]
}>(), { highlightFields: () => [] })

// Render tokens as text, never as HTML. This also keeps server content safe to display.
const lines = computed(() => JSON.stringify(props.value, null, 2)
  .replace(/\[\n\s*\{/g, '[{')
  .replace(/\}\n\s*\]/g, '}]')
  .split('\n')
  .map((line) => {
    const field = line.match(/^\s*"((?:\\.|[^"\\])*)"\s*:/)?.[1]
    const tokens = Array.from(line.matchAll(/"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[^"\w-]+|./g))
    return {
      highlighted: field !== undefined && props.highlightFields.includes(field),
      tokens: tokens.map(match => ({
        text: match[0],
        kind: match[0].startsWith('"')
          ? (line.slice((match.index ?? 0) + match[0].length).trimStart().startsWith(':') ? 'key' : 'string')
          : /^(?:true|false|null|-?\d)/.test(match[0]) ? 'literal' : 'punctuation',
      })),
    }
  }))
</script>

<template>
  <pre class="inspect-json" aria-label="JSON payload"><code><span v-for="(line, index) in lines" :key="index" class="json-line" :class="{ 'json-highlight': line.highlighted }"><span v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex" :class="`json-${token.kind}`">{{ token.text }}</span>{{ index < lines.length - 1 ? '\n' : '' }}</span></code></pre>
</template>

<style scoped>
.inspect-json {
  margin: 0;
  padding: 12px 0;
  background: transparent;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 14px;
  line-height: 1.3;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
}
.json-line { display: inline-block; width: 100%; padding: 0 16px; }
.json-highlight { background: rgb(139 92 246 / 14%); box-shadow: inset 3px 0 #a78bfa; }
.json-key { color: #c4b5fd; }
.json-string { color: #a7f3d0; }
.json-literal { color: #fcd34d; }
.json-punctuation { color: #d4d4d4; }
</style>

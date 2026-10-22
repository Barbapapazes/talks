<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const split = computed(() => $clicks.value >= 1)
const showIds = computed(() => $clicks.value >= 3)
const showVectors = computed(() => $clicks.value >= 4)
const showCounterexample = computed(() => $clicks.value === 2)
// Verified with cl100k_base: 359, 32898, 24694.
const wordPieces = ['un', 'belie', 'vable']

// cl100k_base tokenization, including each token's leading space.
// Embedding values are illustrative, not extracted from a model.
const tokens = [
  { text: 'The', id: 791, vector: '[ 0.12, −0.34,  0.08, … ]' },
  { text: ' capital', id: 6864, vector: '[−0.21,  0.67,  0.15, … ]' },
  { text: ' of', id: 315, vector: '[ 0.43,  0.02, −0.56, … ]' },
  { text: ' France', id: 9822, vector: '[ 0.71, −0.18,  0.39, … ]' },
  { text: ' is', id: 374, vector: '[−0.09,  0.31,  0.62, … ]' },
]
const sentence = tokens.map(token => token.text).join('')
const starts = tokens.map((_, index) => tokens.slice(0, index).reduce((sum, token) => sum + token.text.length, 0))
</script>

<template>
  <div class="text-to-vectors not-content" :class="{ split, 'show-ids': showIds, 'show-vectors': showVectors }">
    <div class="column-label token-label" :aria-hidden="!split">
      Tokens
    </div>
    <div class="column-label id-label" :aria-hidden="!showIds">
      Token IDs
    </div>
    <div class="column-label vector-label" :aria-hidden="!showVectors">
      Embeddings
    </div>

    <div
      v-for="(token, index) in tokens"
      :key="token.id"
      class="token-row"
      :style="{ '--row': index, '--start': starts[index] - sentence.length / 2 }"
    >
      <div class="token font-mono">
        <span class="leading-space" aria-hidden="true">{{ token.text.startsWith(' ') ? '·' : '' }}</span>{{ token.text.trimStart() }}
      </div>
      <div class="id-step" :aria-hidden="!showIds">
        <div class="connector">
          <div class="i-ph-arrow-right-thin size-6" />
        </div>
        <div class="token-id rounded-md border border-neutral-200 bg-neutral-100 shadow-sm font-mono">
          {{ token.id }}
        </div>
      </div>
      <div class="vector-step" :aria-hidden="!showVectors">
        <div class="connector">
          <div class="i-ph-arrow-right-thin size-6" />
        </div>
        <div class="vector rounded-md border border-neutral-200 bg-neutral-100 shadow-sm font-mono">
          {{ token.vector }}
        </div>
      </div>
    </div>

    <div class="counterexample rounded-md border border-neutral-200 bg-neutral-100 p-5 shadow-sm" :class="{ visible: showCounterexample }" :aria-hidden="!showCounterexample">
      <div class="mb-4 text-sm text-neutral-500 font-semibold">
        One word can be several tokens
      </div>
      <div class="flex items-center gap-4 font-mono">
        <span>unbelievable</span>
        <div class="i-ph-arrow-right-thin size-6 text-neutral-400" />
        <div class="flex gap-1">
          <span v-for="piece in wordPieces" :key="piece" class="word-piece rounded border px-2 py-1">{{ piece }}</span>
        </div>
      </div>
    </div>

    <div class="column-note tokenizer-note" :aria-hidden="!split">
      cl100k_base <span class="mx-2">·</span> <span class="font-mono">·</span> = leading space
    </div>
  </div>
</template>

<style scoped>
.text-to-vectors {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 760px;
  height: 350px;
  transform: translate(-50%, -50%);
  --accent: var(--slidev-theme-primary, #6c1eb9);
}

.column-label {
  position: absolute;
  top: 0;
  color: #737373;
  font-size: 14px;
  font-weight: 600;
}

.token-label { left: 0; }
.id-label { left: 250px; }
.vector-label { left: 460px; }

.token-row {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.token {
  position: absolute;
  top: calc(50% - 22px);
  left: calc(50% + var(--start) * 1ch);
  height: 44px;
  padding: 0 12px;
  margin-left: -12px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 28px;
  line-height: 42px;
  white-space: pre;
  transition: top 600ms, left 600ms, font-size 600ms, margin 600ms, background 600ms, border-color 600ms, color 600ms;
  transition-delay: calc(var(--row) * 35ms);
}

.leading-space {
  color: transparent;
  transition: color 400ms;
}

.split .token {
  top: calc(40px + var(--row) * 56px);
  left: 0;
  min-width: 154px;
  margin-left: 0;
  font-size: 22px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 7%, #fafafa);
  border-color: color-mix(in srgb, var(--accent) 18%, #e5e5e5);
}

.split .leading-space {
  color: color-mix(in srgb, var(--accent) 40%, transparent);
}

.id-step,
.vector-step {
  position: absolute;
  top: calc(40px + var(--row) * 56px);
  display: flex;
  align-items: center;
  height: 44px;
}

.id-step { left: 174px; }
.vector-step { left: 384px; }

.connector {
  display: flex;
  justify-content: center;
  width: 56px;
  margin-right: 20px;
  color: #a3a3a3;
}

.token-id {
  width: 114px;
  padding: 8px 14px;
  font-size: 20px;
  text-align: right;
}

.vector {
  padding: 8px 14px;
  font-size: 18px;
  white-space: pre;
}

.column-note {
  position: absolute;
  top: 334px;
  font-size: 12px;
  color: #a3a3a3;
}

.counterexample {
  position: absolute;
  top: 112px;
  left: 250px;
  font-size: 20px;
}

.word-piece {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 7%, #fafafa);
  border-color: color-mix(in srgb, var(--accent) 18%, #e5e5e5);
}

.counterexample,
.column-label,
.column-note,
.id-step,
.vector-step {
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  transition: opacity 240ms, transform 240ms, visibility 240ms;
}

.counterexample.visible,
.split .token-label,
.split .tokenizer-note,
.show-ids .id-label,
.show-vectors .vector-label,
.show-vectors .embedding-note,
.show-ids .id-step,
.show-vectors .vector-step {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.show-ids .id-step,
.show-vectors .vector-step {
  transition-delay: calc(var(--row) * 60ms);
}

@media (prefers-reduced-motion: reduce) {
  .text-to-vectors * {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}
</style>

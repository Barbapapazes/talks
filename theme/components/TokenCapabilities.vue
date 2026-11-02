<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { ref } from 'vue'
import TokenChip from './ai/TokenChip.vue'
import DiagramPanel from './DiagramPanel.vue'

withDefaults(defineProps<{
  revealAt?: number
  loop?: boolean
  revealTogether?: boolean
}>(), {
  revealAt: 1,
  loop: false,
  revealTogether: false,
})

const tokenRows = ref<HTMLElement[]>([])
const loopStarts = ref<{ x: number, y: number }[]>([])

useResizeObserver(tokenRows, () => {
  loopStarts.value = tokenRows.value.map((row, index) => ({
    x: 400 + row.offsetWidth,
    y: index * 115 + 13 + row.offsetTop + row.offsetHeight / 2,
  }))
})

const capabilities = [
  { label: 'Text', tokens: ['The capital', ' of France', ' is Paris', '.'] },
  { label: 'Reasoning', tokens: ['17 × 20', ' = 340', ', ', '17 × 4', ' = 68', '…'] },
  { label: 'Tool calling', tokens: ['get_time', '({', '"city"', ': ', '"Paris"', '})'] },
]
</script>

<template>
  <div class="token-capabilities not-content">
    <div class="diagram">
      <DiagramPanel v-click="revealAt" class="source">
        <span>Generate the<br>next token</span>
      </DiagramPanel>

      <div
        v-for="(capability, index) in capabilities"
        :key="capability.label"
        v-click="revealTogether || revealAt === 0 ? revealAt : revealAt + index + 1"
        class="branch"
        :style="{ top: `${index * 115}px` }"
      >
        <svg class="connector" viewBox="0 0 170 345" aria-hidden="true" :style="{ top: `${-index * 115}px` }">
          <path :d="`M 0 172.5 H 65 V ${57.5 + index * 115} H 163`" />
          <path :d="`M 157 ${52.5 + index * 115} l 6 5 l -6 5`" />
        </svg>
        <div class="capability">
          <div class="label">
            {{ capability.label }}
          </div>
          <div :ref="el => { if (el) tokenRows[index] = el as HTMLElement }" class="tokens font-mono">
            <TokenChip v-for="(token, tokenIndex) in capability.tokens" :key="tokenIndex" size="sm">
              {{ token }}
            </TokenChip>
          </div>
        </div>
      </div>

      <div v-if="loop" v-click="revealTogether || revealAt === 0 ? revealAt + 1 : revealAt + 4">
        <svg
          class="loop-connectors"
          viewBox="0 0 900 410"
          aria-hidden="true"
        >
          <path
            v-for="(start, index) in loopStarts"
            :key="index"
            :d="`M ${start.x} ${start.y} H 875 V 390 H 110 V 223`"
          />
          <path d="M 105 229 L 110 223 L 115 229" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.token-capabilities {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 840px;
  height: 345px;
  transform: translate(-50%, -50%);
}
.diagram {
  position: relative;
  width: 100%;
  height: 345px;
}
.source {
  position: absolute;
  left: 0;
  top: 122.5px;
  width: 220px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
}
.branch {
  position: absolute;
  left: 220px;
  right: 0;
  height: 115px;
}
.connector {
  position: absolute;
  left: 0;
  width: 170px;
  height: 345px;
  fill: none;
  --at-apply: stroke-neutral-400;
  stroke-width: 1.5;
}
.loop-connectors {
  position: absolute;
  top: 0;
  left: 0;
  width: 900px;
  height: 410px;
  fill: none;
  --at-apply: stroke-neutral-400;
  stroke-width: 1.5;
  pointer-events: none;
}
.capability {
  position: absolute;
  left: 180px;
  top: 13px;
}
.label {
  margin-bottom: 10px;
  --at-apply: text-neutral-500;
  font-size: 14px;
  font-weight: 600;
}
.tokens {
  display: flex;
  gap: 3px;
  white-space: pre;
  font-size: 16px;
}
</style>

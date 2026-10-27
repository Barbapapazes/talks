<script setup lang="ts">
import TokenChip from '@theme/components/ai/TokenChip.vue'
import DiagramPanel from '@theme/components/DiagramPanel.vue'

const capabilities = [
  {
    label: 'Text',
    tokens: [
      'The capital',
      ' of France',
      ' is Paris',
      '.',
    ],
  },
  {
    label: 'Reasoning',
    tokens: [
      '17 × 20',
      ' = 340',
      ', ',
      '17 × 4',
      ' = 68',
      '…',
    ],
  },
  {
    label: 'Tool calling',
    tokens: [
      'get_time',
      '({',
      '"city"',
      ': ',
      '"Paris"',
      '})',
    ],
  },
]
</script>

<template>
  <div class="token-capabilities not-content">
    <div class="diagram">
      <DiagramPanel v-click="1" class="source">
        <span>Generate the<br>next token</span>
      </DiagramPanel>

      <div
        v-for="(capability, index) in capabilities"
        :key="capability.label"
        v-click="index + 2"
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
          <div class="tokens font-mono">
            <TokenChip v-for="(token, tokenIndex) in capability.tokens" :key="tokenIndex" size="sm">
              {{ token }}
            </TokenChip>
          </div>
        </div>
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

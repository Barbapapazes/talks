<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const { $clicks } = useSlideContext()
const selected = computed(() => $clicks.value >= 2)
const appended = computed(() => $clicks.value >= 3)
const candidate = ref<HTMLElement>()
const destination = ref<HTMLElement>()
const offset = ref({ x: 0, y: 0 })

const predictions = [
  {
    click: 1,
    candidates: [
      { token: 'Paris', probability: 78 },
      { token: 'Lyon', probability: 9 },
      { token: 'the', probability: 5 },
      { token: '…', probability: 8 },
    ],
  },
  {
    click: 4,
    candidates: [
      { token: '.', probability: 72 },
      { token: ',', probability: 15 },
      { token: ' and', probability: 8 },
      { token: '…', probability: 5 },
    ],
  },
]

async function measure() {
  await nextTick()
  if (!candidate.value || !destination.value)
    return

  const start = candidate.value.getBoundingClientRect()
  const end = destination.value.getBoundingClientRect()
  // Slidev scales the slide. Convert viewport pixels back to slide coordinates.
  const scale = destination.value.getBoundingClientRect().width / destination.value.offsetWidth
  offset.value = { x: (start.left - end.left) / scale, y: (start.top - end.top) / scale }
}

onMounted(measure)
watch($clicks, measure)
</script>

<template>
  <div
    class="next-token not-content"
    :class="{ selected, appended }"
    :style="{ '--from-x': `${offset.x}px`, '--from-y': `${offset.y}px` }"
  >
    <div class="sentence font-mono">
      <span>The capital of France is </span><span ref="destination" class="destination"><span v-if="appended" class="chosen-token">Paris</span><span class="cursor" /></span>
    </div>

    <div
      v-for="(prediction, predictionIndex) in predictions"
      :key="prediction.click"
      v-click="prediction.click"
      class="predictions"
      :class="predictionIndex === 0 ? 'first-predictions' : 'next-predictions'"
    >
      <div class="rounded-md border border-neutral-200 bg-neutral-100 p-4 shadow-sm">
        <div class="mb-3 text-sm text-neutral-500 font-semibold">
          Next token
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="(item, index) in prediction.candidates"
            :key="item.token"
            class="candidate grid grid-cols-[5rem_1fr_3rem] items-center gap-3 rounded px-2 py-1"
            :class="{ 'selected-candidate': predictionIndex === 0 && index === 0 }"
            :style="{ '--row': index }"
          >
            <span :ref="el => { if (predictionIndex === 0 && index === 0) candidate = el as HTMLElement }" class="candidate-token font-mono">{{ item.token }}</span>
            <div class="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div class="probability h-full rounded-full bg-neutral-400" :style="{ width: `${item.probability}%` }" />
            </div>
            <span class="text-right text-sm text-neutral-500 tabular-nums">{{ item.probability }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.next-token {
  position: absolute;
  inset: 42% 0 auto;
  --accent: var(--slidev-theme-primary, #6c1eb9);
}

.sentence {
  display: flex;
  justify-content: center;
  white-space: pre;
  font-size: 28px;
  line-height: 40px;
}

.destination {
  position: relative;
  display: inline-block;
  width: 5ch;
  height: 40px;
}

.cursor {
  position: absolute;
  left: 0;
  top: 6px;
  width: 2px;
  height: 28px;
  background: var(--accent);
  animation: blink-cursor 1s step-end infinite;
}

.predictions {
  position: absolute;
  top: 64px;
  left: 53%;
  width: 310px;
}

.predictions:not(.slidev-vclick-hidden) .candidate {
  animation: appear 240ms both;
  animation-delay: calc(var(--row) * 60ms);
}

.next-predictions {
  margin-left: 84px;
}

.appended .first-predictions {
  opacity: 0;
  transition: opacity 240ms 500ms;
}

.selected .selected-candidate {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  transition: background 150ms, color 150ms;
}

.selected .selected-candidate .probability {
  background: var(--accent);
}

.appended .selected-candidate .candidate-token {
  visibility: hidden;
}

.chosen-token {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  animation: append-token 1100ms both;
}

.appended .cursor {
  animation: move-cursor 1100ms both, blink-cursor 1s step-end 1100ms infinite;
}

@keyframes appear {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes append-token {
  0%, 30% {
    transform: translate(var(--from-x), var(--from-y));
    font-size: 16px;
    line-height: 24px;
    color: var(--accent);
  }
  75% {
    transform: translate(0, 0);
    font-size: 28px;
    line-height: 40px;
    color: var(--accent);
  }
  100% {
    transform: translate(0, 0);
    color: inherit;
  }
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes move-cursor {
  0%, 30% { left: 0; opacity: 0; }
  75%, 100% { left: 5ch; opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }

  .appended .cursor {
    animation: none;
    left: 5ch;
  }

  .next-token *,
  .predictions:not(.slidev-vclick-hidden) .candidate {
    animation-duration: 1ms;
    animation-delay: 0ms;
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}
</style>

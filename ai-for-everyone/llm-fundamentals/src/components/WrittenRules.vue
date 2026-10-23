<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DiagramPanel from '@theme/components/DiagramPanel.vue'
import { computed } from 'vue'
import { spamMessage } from '../data/spam-example'

const { $clicks } = useSlideContext()
const showRules = computed(() => $clicks.value >= 1)
const showMessage = computed(() => $clicks.value >= 2)
const highlighted = computed(() => $clicks.value >= 3)
</script>

<template>
  <div class="written-rules not-content" :class="{ highlighted }">
    <div class="message" :class="{ revealed: showMessage }" :aria-hidden="!showMessage">
      <div class="message-text">
        “<span class="keyword">{{ spamMessage.keyword }}</span>{{ spamMessage.text }}”
      </div>
    </div>
    <span class="arrow" :class="{ revealed: showMessage }" aria-hidden="true">↓</span>
    <DiagramPanel class="rules" :class="{ revealed: showRules }" :aria-hidden="!showRules">
      <div class="font-mono rule">
        if contains <span>"free"</span> → spam
      </div>
      <div class="font-mono rule matched">
        if contains <span class="keyword">"urgent"</span> → spam
      </div>
      <div class="font-mono fallback">
        otherwise → not spam
      </div>
    </DiagramPanel>
  </div>
</template>

<style scoped>
.written-rules {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.message { max-width: 640px; text-align: center; }
.message-text { font-size: 22px; line-height: 1.6; }
.arrow { margin: 12px 0 20px; --at-apply: text-neutral-400; font-size: 26px; line-height: 1; }
.rules { width: 420px; max-width: 100%; padding: 24px; }
.rule { padding: 10px; margin: 0 -10px 10px; border-radius: 4px; font-size: 17px; line-height: 1.5; transition: background 300ms; }
.fallback { font-size: 15px; --at-apply: text-neutral-500; padding-top: 4px; }
.rules, .message, .arrow { opacity: 0; transition: opacity 350ms; }
.revealed { opacity: 1; }
.keyword { transition: color 300ms; }
.highlighted .matched { --at-apply: bg-primary/9; }
.highlighted .keyword { --at-apply: text-primary; }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 1ms !important; } }
</style>

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const showRules = computed(() => $clicks.value >= 1)
const showMessage = computed(() => $clicks.value >= 2)
const highlighted = computed(() => $clicks.value >= 3)
</script>

<template>
  <div class="written-rules not-content" :class="{ highlighted }">
    <div class="message" :class="{ revealed: showMessage }" :aria-hidden="!showMessage">
      <div class="message-text">
        “<span class="keyword">Urgent</span>, I need your slides for tomorrow!”
      </div>
    </div>
    <span class="arrow" :class="{ revealed: showMessage }" aria-hidden="true">↓</span>
    <div class="rules" :class="{ revealed: showRules }" :aria-hidden="!showRules">
      <div class="label">
        Handwritten rules
      </div>
      <div class="font-mono rule">
        if contains <span>"free"</span> → spam
      </div>
      <div class="font-mono rule matched">
        if contains <span class="keyword">"urgent"</span> → spam
      </div>
      <div class="font-mono fallback">
        otherwise → not spam
      </div>
    </div>
  </div>
</template>

<style scoped>
.written-rules {
  --accent: var(--slidev-theme-primary, #6c1eb9);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.message { text-align: center; }
.message-text { font-size: 22px; line-height: 1.6; }
.arrow { margin: 12px 0 20px; color: #a3a3a3; font-size: 26px; line-height: 1; }
.rules { width: 420px; max-width: 100%; border: 1px solid #e5e5e5; border-radius: 6px; background: #f5f5f5; padding: 24px; box-shadow: 0 1px 2px #0000000d; }
.label { color: #737373; font-size: 14px; font-weight: 600; margin-bottom: 18px; }
.rule { padding: 10px; margin: 0 -10px 10px; border-radius: 4px; font-size: 17px; line-height: 1.5; transition: background 300ms; }
.fallback { font-size: 15px; color: #737373; padding-top: 4px; }
.rules, .message, .arrow { opacity: 0; transition: opacity 350ms; }
.revealed { opacity: 1; }
.keyword { transition: color 300ms; }
.highlighted .matched { background: color-mix(in srgb, var(--accent) 9%, transparent); }
.highlighted .keyword { color: var(--accent); }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 1ms !important; } }
</style>

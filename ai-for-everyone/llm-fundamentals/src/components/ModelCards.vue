<script setup lang="ts">
import Card from '@theme/components/Card.vue'

const models = [
  {
    developer: 'OpenAI',
    name: 'GPT-6.1 Sol',
    parameters: 'Not disclosed',
    context: '1.05M tokens',
    weights: 'Not public',
    access: 'Hosted API',
  },
  {
    developer: 'Anthropic',
    name: 'Claude Opus 5.5',
    parameters: 'Not disclosed',
    context: '1M tokens',
    weights: 'Not public',
    access: 'Hosted API',
  },
  {
    developer: 'DeepSeek',
    name: 'DeepSeek-V4',
    parameters: '1.6T total',
    activeParameters: '49B',
    context: '1M tokens',
    weights: 'Open · MIT licence',
    access: 'Self-host or hosted API',
  },
]
</script>

<template>
  <div class="not-content">
    <div class="grid grid-cols-3 gap-6">
      <Card v-for="model in models" :key="model.name">
        <div class="muted text-[10px] uppercase tracking-[0.2em]">
          {{ model.developer }}
        </div>
        <h2 class="title mt-2 text-xl font-serif leading-tight">
          {{ model.name }}
        </h2>
        <dl class="mt-5 space-y-4 text-sm leading-5">
          <div>
            <dt class="muted text-xs">
              Parameters
            </dt>
            <dd class="description mt-1 font-medium">
              {{ model.parameters }}
            </dd>
            <dd v-if="model.activeParameters" class="muted mt-1 text-xs">
              {{ model.activeParameters }} active
            </dd>
          </div>
          <div>
            <dt class="muted text-xs">
              Context window
            </dt>
            <dd class="description mt-1 font-medium">
              {{ model.context }}
            </dd>
          </div>
          <div>
            <dt class="muted text-xs">
              Weights
            </dt>
            <dd class="description mt-1 font-medium">
              {{ model.weights }}
            </dd>
            <dd class="muted mt-1 text-xs italic">
              {{ model.access }}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.title {
  --at-apply: text-neutral-900 font-semibold;
}
.description {
  --at-apply: text-neutral-700;
}
.muted {
  --at-apply: text-neutral-500;
}
</style>

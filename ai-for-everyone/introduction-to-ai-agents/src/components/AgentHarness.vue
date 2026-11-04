<script setup lang="ts">
import hermesLogo from '../assets/harness/hermes.svg'
import openclawLogo from '../assets/harness/openclaw.svg'
import piLogo from '../assets/harness/pi.svg'

const modelProviders = [
  { name: 'Anthropic', icon: 'i-simple-icons-anthropic', color: 'currentColor' },
  { name: 'DeepSeek', icon: 'i-simple-icons-deepseek', color: '#6366f1' },
  { name: 'Google', icon: 'i-logos-google-icon', color: 'currentColor' },
  { name: 'Qwen', icon: 'i-simple-icons-qwen', color: '#8b5cf6' },
  { name: 'Meta', icon: 'i-simple-icons-meta', color: '#4f7df3' },
  { name: 'Mistral', icon: 'i-simple-icons-mistralai', color: '#f59e0b' },
  { name: 'NVIDIA', icon: 'i-simple-icons-nvidia', color: '#76b900' },
  { name: 'OpenAI', icon: 'i-simple-icons-openai', color: 'currentColor' },
]
const harnessExamples = [
  { name: 'Claude Code', icon: 'i-simple-icons-claudecode', color: '#d97757' },
  { name: 'OpenCode', icon: 'i-simple-icons-opencode', color: 'currentColor' },
  { name: 'LangChain', icon: 'i-simple-icons-langchain', color: 'currentColor' },
  { name: 'Pi', image: piLogo },
  { name: 'Hermes', image: hermesLogo },
  { name: 'OpenClaw', image: openclawLogo },
  { name: 'Codex', icon: 'i-simple-icons-openai', color: 'currentColor' },
  { name: 'Perplexity', icon: 'i-simple-icons-perplexity', color: '#20808d' },
]
const responsibilities = [
  { name: 'Agent loop', icon: 'i-lucide-repeat-2', reveal: 5 },
  { name: 'Context', icon: 'i-lucide-text-search', reveal: 5 },
  { name: 'Tool dispatch', icon: 'i-lucide-wrench', reveal: 6 },
  { name: 'Permissions', icon: 'i-lucide-shield-check', reveal: 6 },
  { name: 'State and memory', icon: 'i-lucide-notebook-pen', reveal: 7 },
  { name: 'Execution controls', icon: 'i-lucide-gauge', reveal: 7 },
]
</script>

<template>
  <div class="harness-diagram not-content" role="group" aria-label="An agent combines a model and a harness. Only the harness dispatches tool calls to the execution environment.">
    <div v-click="1" class="agent-boundary border-neutral-300 dark:border-neutral-700">
      <div class="boundary-label bg-white text-neutral-500 dark:bg-neutral-900">
        <span>Agent</span>
      </div>

      <div v-click="2" class="model-column">
        <div class="model rounded-md border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <span class="i-lucide-brain text-3xl text-purple-600 dark:text-purple-400" aria-hidden="true" />
          <strong>Model</strong>
        </div>
        <div v-click="3" class="model-brands" aria-label="Model providers">
          <span v-for="brand in modelProviders" :key="brand.name" :title="brand.name" role="img" :aria-label="brand.name" :class="brand.icon" class="brand-icon" :style="{ color: brand.color }" />
        </div>
      </div>

      <div v-click="5" class="model-link text-neutral-500">
        <span class="arrow-label"><span class="diagram-arrow i-lucide-arrow-left" aria-hidden="true" />Context</span>
        <span class="arrow-label">Response<span class="diagram-arrow i-lucide-arrow-right" aria-hidden="true" /></span>
      </div>

      <div v-click="4" class="harness border-purple-300 bg-purple-50/40 dark:border-purple-800 dark:bg-purple-950/20">
        <div class="harness-heading">
          <strong>Harness</strong>
          <div v-click="8" class="brand-row" aria-label="Harness examples">
            <template v-for="brand in harnessExamples" :key="brand.name">
              <img v-if="brand.image" :src="brand.image" :alt="brand.name" :title="brand.name" class="brand-icon object-contain">
              <span v-else :title="brand.name" role="img" :aria-label="brand.name" :class="brand.icon" class="brand-icon" :style="{ color: brand.color }" />
            </template>
          </div>
        </div>
        <div class="responsibilities">
          <div v-for="item in responsibilities" :key="item.name" v-click="item.reveal" class="responsibility rounded-md border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <span :class="item.icon" class="shrink-0 text-lg text-purple-600 dark:text-purple-400" aria-hidden="true" />
            <div>
              <div class="font-semibold">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-click="6" class="execution">
      <div class="execution-link text-neutral-500">
        <span class="arrow-label"><span class="diagram-arrow i-lucide-arrow-down" aria-hidden="true" />Allowed calls</span>
        <span class="arrow-label ml-5"><span class="diagram-arrow i-lucide-arrow-up" aria-hidden="true" />Results or errors</span>
      </div>
      <div class="environment rounded-md border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div><strong>Tools and execution environment</strong><span class="ml-4 text-neutral-500">Files · Terminal · Browser · APIs</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.harness-diagram {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 840px;
  transform: translate(-50%, -50%);
  font-size: 15px;
  line-height: 1.4;
}
.agent-boundary { position: relative; display: flex; align-items: center; padding: 24px 20px; border-width: 1px; border-style: dashed; border-radius: 12px; }
.boundary-label { position: absolute; top: -16px; left: 16px; display: flex; align-items: center; gap: 16px; height: 32px; padding: 0 8px; font-size: 13px; }
.brand-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.brand-icon { display: inline-block; width: 24px; height: 24px; flex-shrink: 0; }
.model-column { width: 174px; flex-shrink: 0; }
.model-brands { display: grid; grid-template-columns: repeat(4, 24px); justify-content: center; gap: 12px; margin-top: 18px; }
.model { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; width: 174px; height: 138px; flex-shrink: 0; text-align: center; }
.model strong { font-size: 22px; }
.arrow-label { display: inline-flex; align-items: center; gap: 6px; }
.diagram-arrow { width: 16px; height: 16px; flex-shrink: 0; }
.model-link { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 12px; width: 112px; flex-shrink: 0; font-size: 12px; }
.harness { flex: 1; padding: 16px; border-width: 1px; border-radius: 8px; }
.harness-heading { display: flex; align-items: center; gap: 14px; margin-bottom: 13px; }
.harness-heading strong { font-size: 22px; }
.responsibilities { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.responsibility { display: flex; align-items: center; gap: 9px; padding: 9px; font-size: 13px; }
.execution { margin-left: 307px; margin-right: 21px; }
.execution-link { height: 37px; display: flex; align-items: center; justify-content: center; font-size: 12px; }
.environment { padding: 12px 14px; font-size: 12px; text-align: center; }
</style>

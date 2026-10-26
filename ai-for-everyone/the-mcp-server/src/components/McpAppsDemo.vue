<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, ref, watch } from 'vue'
import ChatAnimation from '../../../../theme/components/Chat/ChatAnimation.vue'
import ChatToolCall from '../../../../theme/components/Chat/ChatToolCall.vue'

const issues = [
  {
    number: 42,
    title: 'Require confirmation before deleting a project',
    label: 'enhancement',
    body: 'Before deleting a project, show a confirmation dialog requiring the user to type the project’s name.',
  },
  {
    number: 38,
    title: 'Fix sidebar overflow on mobile',
    label: 'bug',
    body: 'The sidebar extends beyond the viewport on small screens. Keep navigation within the screen width.',
  },
  {
    number: 35,
    title: 'Add dark mode',
    label: 'enhancement',
    body: 'Add a dark theme and follow the user’s system preference by default.',
  },
]
const label = ref('all')
const selectedIssue = ref<typeof issues[number] | null>(null)
const filteredIssues = computed(() => issues.filter(issue => label.value === 'all' || issue.label === label.value))
const slideActive = useIsSlideActive()

watch(slideActive, () => {
  label.value = 'all'
  selectedIssue.value = null
})
</script>

<template>
  <div class="mcp-apps-demo not-content" @click.stop>
    <ChatAnimation
      user-prompt="Show me the open issues in acme/project-dashboard."
      :assistant-frame-count="1"
      :typewriter-char-delay-ms="30"
    >
      <template #tool="{ phase }">
        <ChatToolCall
          v-if="['searching', 'thinking', 'streaming', 'done'].includes(phase)"
          name="list_issues"
          :arguments="JSON.stringify({ repository: 'acme/project-dashboard', state: 'open' }, null, 2)"
          :result="JSON.stringify({ content: [{ type: 'text', text: JSON.stringify(issues) }] }, null, 2)"
          compact
          :status="phase === 'streaming' || phase === 'done' ? 'completed' : 'running'"
        />
      </template>
      <template #assistant>
        <section class="issues-app" aria-label="GitHub issues" @keydown.stop>
          <header class="app-header">
            <span class="i-logos-github-icon size-5" aria-hidden="true" />
            <span>acme/project-dashboard</span>
          </header>
          <template v-if="selectedIssue">
            <div class="issue-detail">
              <button type="button" class="back-button" @click="selectedIssue = null">
                <span class="i-ph-arrow-left size-4" aria-hidden="true" /> Back to issues
              </button>
              <div class="issue-meta">
                <span class="open-state">Open</span>
                <span>#{{ selectedIssue.number }}</span>
                <span class="issue-label" :class="selectedIssue.label">{{ selectedIssue.label }}</span>
              </div>
              <h2>{{ selectedIssue.title }}</h2>
              <p>{{ selectedIssue.body }}</p>
            </div>
          </template>
          <template v-else>
            <div class="list-toolbar">
              <strong>Open issues <span class="issue-count">{{ filteredIssues.length }}</span></strong>
              <select v-model="label" aria-label="Filter issues by label">
                <option value="all">
                  All labels
                </option>
                <option value="enhancement">
                  enhancement
                </option>
                <option value="bug">
                  bug
                </option>
              </select>
            </div>
            <ul class="issue-list">
              <li v-for="issue in filteredIssues" :key="issue.number">
                <button type="button" class="issue-row" @click="selectedIssue = issue">
                  <span class="i-ph-circle-dashed size-5 issue-icon" aria-hidden="true" />
                  <span class="issue-summary">
                    <span class="issue-title">{{ issue.title }}</span>
                    <span class="issue-meta">
                      <span>#{{ issue.number }}</span>
                      <span class="issue-label" :class="issue.label">{{ issue.label }}</span>
                    </span>
                  </span>
                  <span class="i-ph-caret-right size-4" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </template>
        </section>
      </template>
    </ChatAnimation>
  </div>
</template>

<style scoped>
.mcp-apps-demo {
  position: absolute;
  inset: 0;
  font-size: 14px;
  line-height: 1.45;
}
.issues-app {
  --at-apply: border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900;
  border-radius: 12px;
  overflow: hidden;
}
.app-header {
  --at-apply: bg-neutral-50 border-b border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
}
.list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
}
.issue-count {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
}
button, select {
  font: inherit;
  cursor: pointer;
}
button:focus-visible, select:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: -3px;
}
select {
  --at-apply: border border-neutral-200 dark:border-neutral-600;
  border-radius: 6px;
  padding: 4px 6px;
  background: transparent;
  font-size: 11px;
}
.issues-app .issue-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.issues-app .issue-list li {
  --at-apply: border-t border-neutral-200 dark:border-neutral-700;
  margin: 0;
}
.issue-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
}
.issue-row:hover {
  --at-apply: bg-neutral-50 dark:bg-neutral-800;
}
.issue-icon {
  color: #1a7f37;
  flex-shrink: 0;
}
.issue-summary {
  display: grid;
  flex: 1;
  gap: 5px;
}
.issue-title {
  font-size: 13px;
  font-weight: 600;
}
.issue-meta {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}
.issue-label {
  border: 1px solid #a2aee8;
  border-radius: 999px;
  padding: 1px 7px;
  color: #6572bf;
  font-size: 10px;
}
.issue-label.bug {
  border-color: #e6a0a0;
  color: #c44d56;
}
.issue-detail {
  padding: 14px 16px 20px;
}
.back-button {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
  font-size: 12px;
}
.open-state {
  border-radius: 999px;
  padding: 2px 9px;
  background: #1a7f37;
  color: white;
}
.issues-app h2 {
  margin: 12px 0;
  font-size: 18px;
  line-height: 1.35;
}
.issues-app p {
  margin: 0;
  font-size: 14px;
}
</style>

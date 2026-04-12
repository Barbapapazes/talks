<script lang="ts" setup>
import { computed } from 'vue'

type ViteHookName = 'resolveId' | 'load' | 'transform'

type ViteHook = ViteHookName | {
  name: ViteHookName
  args?: string
}

const props = withDefaults(defineProps<{
  hooks: ViteHook[]
  size?: 'sm' | 'md'
}>(), {
  size: 'sm',
})

const hookStyles = {
  resolveId: {
    background: 'bg-amber-100',
    text: 'text-amber-800',
  },
  load: {
    background: 'bg-sky-100',
    text: 'text-sky-800',
  },
  transform: {
    background: 'bg-emerald-100',
    text: 'text-emerald-800',
  },
} satisfies Record<ViteHookName, { background: string, text: string }>

const normalizedHooks = computed(() => props.hooks.map((hook, index) => {
  if (typeof hook === 'string') {
    return {
      key: `${hook}-${index}`,
      name: hook,
      args: '',
    }
  }

  return {
    key: `${hook.name}-${hook.args ?? ''}-${index}`,
    name: hook.name,
    args: hook.args ?? '',
  }
}))

const sizeClass = computed(() => props.size === 'md'
  ? 'px-3 py-1 text-sm'
  : 'px-3 py-1 text-xs')
</script>

<template>
  <div class="flex gap-2 font-semibold">
    <span
      v-for="hook in normalizedHooks"
      :key="hook.key"
      class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full shadow-sm"
      :class="[
        sizeClass,
        hookStyles[hook.name].background,
        hookStyles[hook.name].text,
      ]"
    >
      <span>{{ hook.name }}</span>
      <span class="font-mono opacity-80">({{ hook.args }})</span>
    </span>
  </div>
</template>

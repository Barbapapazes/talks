<script setup lang="ts">
defineProps<{
  city?: string
  temperature?: string
  condition?: string
}>()
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Illustrative weather forecast">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Example forecast · {{ city }}
        </div>
        <div class="mt-2 text-3xl font-semibold text-slate-900">
          {{ temperature }}
        </div>
        <div class="text-sm text-slate-600">
          {{ condition }}
        </div>
      </div>
      <div class="i-lucide-cloud-sun size-12 text-amber-500" aria-hidden="true" />
    </div>
    <div class="mt-3 border-t border-slate-100 pt-2 text-sm text-slate-600">
      <slot />
    </div>
  </section>
</template>

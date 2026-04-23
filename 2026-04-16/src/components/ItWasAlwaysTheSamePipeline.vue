<script lang="ts" setup>
import { useHighlight } from '../composables/useHighlight'

const { highlight } = useHighlight()
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex flex-col justify-center gap-12">
      <div class="grid grid-cols-[1fr_60px_1fr] place-items-center">
        <div class="w-full">
          <div v-click class="flex items-center gap-2 text-primary text-sm">
            <span class="i-ph-browser inline-block size-5" />
            Browser
          </div>

          <div class="mt-4 space-y-3 text-left text-lg text-neutral-500 text-sm">
            <div v-click class="rounded-lg border border-neutral-200 space-y-1 px-3 py-2 bg-neutral-50">
              <span class="block">Request</span>
              <div v-html="highlight(`import './style.css'`, 'ts')" />
            </div>
            <div v-after class="rounded-lg border border-neutral-200 space-y-1 px-3 py-2 bg-neutral-50 forward:delay-50">
              <span class="block">Request</span>
              <div v-html="highlight(`import 'virtual:my-module'`, 'ts')" />
            </div>
            <div v-after class="rounded-lg border border-neutral-200 space-y-1 px-3 py-2 bg-neutral-50 forward:delay-100">
              <span class="block">Event</span>
              <div v-html="highlight(`file change / HTTP request`, 'ts')" />
            </div>
          </div>
        </div>

        <div v-click="5" class="flex flex-row items-center gap-3 text-primary rotate-90 origin-center">
          <span class="i-ph-arrow-up-thin inline-block size-6 shrink-0" />
          <span class="text-xs font-light uppercase tracking-[0.25em] text-neutral-500 whitespace-nowrap">same pipeline</span>
          <span class="i-ph-arrow-up-thin inline-block size-6 shrink-0" />
        </div>

        <div class="w-full">
          <div v-click class="flex items-center gap-2 text-primary text-sm">
            <span class="i-vscode-icons-file-type-vite inline-block size-5" />
            Vite
          </div>
          <div class="mt-4 space-y-3 text-left">
            <div v-click class="rounded-lg border border-neutral-200 px-3 py-2 bg-neutral-50">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="font-mono text-base text-primary">
                    resolveId
                  </div>
                  <div class="text-xs text-neutral-600">
                    Intercept, redirect, virtualize
                  </div>
                </div>
                <div class="text-right text-xs text-neutral-500">
                  aliases<br>virtual modules<br>auto-routes
                </div>
              </div>
            </div>

            <div v-after class="rounded-lg border border-neutral-200 px-3 py-2 bg-neutral-50 forward:delay-50">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="font-mono text-base text-primary">
                    load
                  </div>
                  <div class="text-xs text-neutral-600">
                    Read, fetch, or generate code
                  </div>
                </div>
                <div class="text-right text-xs text-neutral-500">
                  filesystem<br>API data<br>build info
                </div>
              </div>
            </div>

            <div v-after class="rounded-lg border border-neutral-200 px-3 py-2 bg-neutral-50 forward:delay-100">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="font-mono text-base text-primary">
                    transform
                  </div>
                  <div class="text-xs text-neutral-600">
                    Transform any code on the fly
                  </div>
                </div>
                <div class="text-right text-xs text-neutral-500">
                  CSS<br>Vue / JSX<br>Markdown / macros
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-8">
        <div v-click="6" class="p-4 rounded-lg bg-white border border-neutral-200">
          <div class="text-primary font-semibold text-sm">
            Plugins
          </div>
          <div class="mt-1 text-neutral-700 text-sm">
            CSS, JSX, Vue, images, Markdown…
          </div>
        </div>
        <div v-click="7" class="p-4 rounded-lg bg-white border border-neutral-200">
          <div class="text-primary font-semibold text-sm">
            Generated modules
          </div>
          <div class="mt-1 text-neutral-700 text-sm">
            Routes, icons, virtual data, build information…
          </div>
        </div>
        <div v-click="8" class="p-4 rounded-lg bg-white border border-neutral-200">
          <div class="text-primary font-semibold text-sm">
            Around the pipeline
          </div>
          <div class="mt-1 text-neutral-700 text-sm">
            HMR, middleware, commands, backend, lifecycle hooks…
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

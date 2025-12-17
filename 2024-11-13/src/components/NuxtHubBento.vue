<script lang="ts" setup>

</script>

<template>
  <div class="grid grid-cols-12 grid-rows-12 h-full w-full">
    <img src="/nuxthub.svg" class="col-start-5 row-start-6 col-end-9 row-end-8 mx-8 self-center">

    <div class="col-start-5 row-start-8 col-end-9 row-end-9 text-center text-sm op-40">
      The Nuxt full-stack companion.
    </div>

    <Card v-click class="col-start-1 row-start-1 col-end-5 row-end-3 mb-2 flex flex-row items-center justify-center gap-2">
      <span class="i-simple-icons-github inline-block size-5" />
      <span class="font-medium">nuxt-hub/<span class="font-bold">core</span></span>
    </Card>

    <div class="grid col-start-1 row-start-3 col-end-5 row-end-5 grid-cols-4 my-2 gap-4">
      <div v-after class="flex flex-col items-center justify-center gap-2 delay-150">
        <div class="i-lucide-list size-5" />
        <div class="text-xxs op-60">
          KV
        </div>
      </div>
      <div v-after class="col-end-3 flex flex-col items-center justify-center gap-2 delay-300">
        <div class="i-lucide-database size-5" />
        <div class="text-xxs op-60">
          Database
        </div>
      </div>
      <div v-after class="col-end-4 flex flex-col items-center justify-center gap-2 delay-450">
        <div class="i-lucide-shapes size-5" />
        <div class="text-xxs op-60">
          Blob
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 delay-600">
        <div class="i-lucide-square-square size-5" />
        <div class="text-xxs op-60">
          Queue
        </div>
      </div>
    </div>

    <div class="col-start-1 row-start-5 col-end-5 row-end-9 my-2 flex flex-col justify-between">
      <Card v-click class="flex flex-row items-center justify-center gap-2 duration-800">
        <span class="text-sm font-mono op-60">npx nuxthub init new-app</span>
      </Card>
      <Card v-after class="flex flex-row items-center justify-center gap-2 duration-800 delay-600">
        <span class="text-sm font-mono op-60">npx nuxt dev --remote</span>
      </Card>
      <Card v-after class="flex flex-row items-center justify-center gap-2 duration-800 delay-1200">
        <span class="text-sm font-mono op-60">npx nuxthub deploy</span>
      </Card>
    </div>

    <div v-click class="col-start-5 row-start-1 col-end-11 row-end-6 mx-4 overflow-hidden border border-gray-800 rounded shadow duration-800">
      <img src="/nuxthub-admin-deployment-dark.svg" class="h-full w-full rounded object-cover object-top">
    </div>

    <div v-after class="col-start-11 row-start-1 col-end-13 row-end-3 mb-2 border border-gray-800 rounded shadow duration-800 delay-300">
      <img src="/nuxthub-admin-database-dark.svg" class="h-full w-full rounded object-cover object-top-left">
    </div>

    <div v-after class="col-start-11 row-start-3 col-end-13 row-end-5 my-2 border border-gray-800 rounded shadow duration-800 delay-600">
      <img src="/nuxthub-admin-blob-dark.svg" class="h-full w-full rounded object-cover object-top-left">
    </div>

    <div v-after class="col-start-11 row-start-5 col-end-13 row-end-7 my-2 border border-gray-800 rounded shadow duration-800 delay-900">
      <img src="/nuxthub-admin-cache-dark.svg" class="h-full w-full rounded object-cover object-top-left">
    </div>

    <div class="grid col-start-1 row-start-9 col-end-5 row-end-13 grid-cols-2 grid-rows-3 mt-2">
      <div v-click class="flex flex-col items-center justify-center gap-2 duration-800 delay-200">
        <div class="i-lucide-git-branch size-4 text-primary!" />
        <div class="text-xxs op-60">
          Import from Git
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 duration-800 delay-400">
        <div class="i-lucide-toggle-right size-4 text-primary!" />
        <div class="text-xxs op-60">
          Preview Deployments
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 duration-800 delay-600">
        <div class="i-lucide-split size-4 text-primary!" />
        <div class="text-xxs op-60">
          Hybrid Rendering
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 duration-800 delay-800">
        <div class="i-lucide-undo size-4 text-primary!" />
        <div class="text-xxs op-60">
          Instant Rollbacks
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 duration-800 delay-1000">
        <div class="i-lucide-calculator size-4 text-primary!" />
        <div class="text-xxs op-60">
          Highly affordable
        </div>
      </div>
      <div v-after class="flex flex-col items-center justify-center gap-2 duration-800 delay-1200">
        <div class="i-lucide-globe size-4 text-primary!" />
        <div class="text-xxs op-60">
          Custom Domains
        </div>
      </div>
    </div>

    <div v-click class="col-start-9 col-end-11 flex items-end text-xs op-60">
      So much more...
    </div>

    <div class="grid col-start-9 row-start-7 col-end-13 row-end-9 grid-cols-4">
      <div v-click class="flex flex-col items-center justify-center gap-2">
        <div class="i-lucide-wand size-5" />
        <div class="text-xxs op-60">
          AI
        </div>
      </div>
      <div v-click class="flex flex-col items-center justify-center gap-2">
        <div class="i-lucide-camera size-5" />
        <div class="text-xxs op-60">
          Browser
        </div>
      </div>
      <div v-click class="flex flex-col items-center justify-center gap-2">
        <div class="i-lucide-mouse-pointer-click size-5" />
        <div class="text-xxs op-60">
          Real-time
        </div>
      </div>
      <div v-click class="flex flex-col items-center justify-center gap-2">
        <div class="i-lucide-timer size-5" />
        <div class="text-xxs op-60">
          Cron Triggers
        </div>
      </div>
    </div>

    <div class="col-start-5 row-start-9 col-end-13 row-end-13 ml-4 flex flex-col justify-evenly">
      <div v-click class="text-sm op-60">
        “NuxtHub allows you to deploy your ideas without upfront costs or lock-in concerns and with blazing-fast performance on Cloudflare's edge network. It's hosting that gets out of your way, so you can focus on building great applications.”
      </div>
      <div class="flex flex-row justify-between">
        <div v-after class="flex flex-row gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/904724?v=4" class="size-8 rounded-full"
          >
          <div class="flex flex-col gap-px">
            <div class="text-xs op-80">
              Sébastien Chopin
            </div>
            <div class="text-xs op-40">
              Creator of Nuxt & NuxtHub
            </div>
          </div>
        </div>

        <a v-click href="https://hub.nuxt.com" target="_blank" class="flex flex-row items-center justify-center gap-2 rounded bg-primary px-3 py-2 text-xs text-[#020420] shadow border-0!">
          <span>Get started for free</span>
        </a>
      </div>
    </div>
  </div>
</template>

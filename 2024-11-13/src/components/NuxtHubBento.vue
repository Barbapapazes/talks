<script lang="ts" setup>

</script>

<template>
  <div class="grid grid-cols-12 grid-rows-12 h-full w-full">
    <img src="/nuxthub.svg" class="mx-8 col-start-5 col-end-9 row-start-6 row-end-8 self-center">

    <div class="col-start-5 col-end-9 text-sm row-start-8 row-end-9 text-center op-40">
      The Nuxt full-stack companion.
    </div>

    <Card v-click class="flex flex-row gap-2 col-start-1 col-end-5 row-start-1 row-end-3 justify-center items-center mb-2">
      <span class="i-simple-icons-github size-5 inline-block" />
      <span class="font-medium">nuxt-hub/<span class="font-bold">core</span></span>
    </Card>

    <div class="col-start-1 col-end-5 grid row-start-3 row-end-5 grid-cols-4 gap-4 my-2">
      <div v-after class="flex gap-2 items-center justify-center flex-col delay-150">
        <div class="size-5 i-lucide-list" />
        <div class="text-xxs op-60">
          KV
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center col-end-3 delay-300">
        <div class="size-5 i-lucide-database" />
        <div class="text-xxs op-60">
          Database
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center col-end-4 delay-450">
        <div class="size-5 i-lucide-shapes" />
        <div class="text-xxs op-60">
          Blob
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center delay-600">
        <div class="size-5 i-lucide-square-square" />
        <div class="text-xxs op-60">
          Queue
        </div>
      </div>
    </div>

    <div class="my-2 col-start-1 col-end-5 flex flex-col row-end-9 justify-between row-start-5">
      <Card v-click class="flex flex-row items-center justify-center gap-2 duration-800">
        <span class="text-sm op-60 font-mono">npx nuxthub init new-app</span>
      </Card>
      <Card v-after class="flex flex-row items-center justify-center gap-2 delay-600 duration-800">
        <span class="text-sm font-mono op-60">npx nuxt dev --remote</span>
      </Card>
      <Card v-after class="flex flex-row items-center justify-center gap-2 duration-800 delay-1200">
        <span class="text-sm font-mono op-60">npx nuxthub deploy</span>
      </Card>
    </div>

    <div v-click class="border border-gray-800 rounded shadow row-start-1 overflow-hidden col-start-5 duration-800 mx-4 row-end-6 col-end-11">
      <img src="/nuxthub-admin-deployment-dark.svg" class="rounded h-full w-full object-cover object-top">
    </div>

    <div v-after class="mb-2 row-start-1 row-end-3 border border-gray-800 rounded shadow duration-800 delay-300 col-start-11 col-end-13">
      <img src="/nuxthub-admin-database-dark.svg" class="rounded h-full w-full object-cover object-top-left">
    </div>

    <div v-after class="my-2 col-start-11 col-end-13 row-start-3 row-end-5 border border-gray-800 rounded shadow duration-800 delay-600">
      <img src="/nuxthub-admin-blob-dark.svg" class="rounded h-full w-full object-cover object-top-left">
    </div>

    <div v-after class="my-2 col-start-11 col-end-13 row-start-5 border border-gray-800 rounded shadow duration-800 row-end-7 delay-900">
      <img src="/nuxthub-admin-cache-dark.svg" class="rounded h-full w-full object-cover object-top-left">
    </div>

    <div class="col-start-1 col-end-5 grid mt-2 row-start-9 row-end-13 grid-cols-2 grid-rows-3">
      <div v-click class="flex flex-col gap-2 items-center justify-center duration-800 delay-200">
        <div class="size-4 i-lucide-git-branch text-primary!" />
        <div class="text-xxs op-60">
          Import from Git
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center duration-800 delay-400">
        <div class="size-4 text-primary! i-lucide-toggle-right" />
        <div class="text-xxs op-60">
          Preview Deployments
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center delay-600 duration-800">
        <div class="size-4 text-primary! i-lucide-split" />
        <div class="text-xxs op-60">
          Hybrid Rendering
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center duration-800 delay-800">
        <div class="size-4 text-primary! i-lucide-undo" />
        <div class="text-xxs op-60">
          Instant Rollbacks
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center duration-800 delay-1000">
        <div class="size-4 text-primary! i-lucide-calculator" />
        <div class="text-xxs op-60">
          Highly affordable
        </div>
      </div>
      <div v-after class="flex flex-col gap-2 items-center justify-center delay-1200 duration-800">
        <div class="size-4 text-primary! i-lucide-globe" />
        <div class="text-xxs op-60">
          Custom Domains
        </div>
      </div>
    </div>

    <div v-click class="op-60 text-xs col-end-11 flex col-start-9 items-end">
      So much more...
    </div>

    <div class="col-start-9 col-end-13 row-end-9 grid grid-cols-4 row-start-7">
      <div v-click class="flex flex-col gap-2 items-center justify-center">
        <div class="size-5 i-lucide-wand" />
        <div class="text-xxs op-60">
          AI
        </div>
      </div>
      <div v-click class="flex flex-col gap-2 items-center justify-center">
        <div class="size-5 i-lucide-camera" />
        <div class="text-xxs op-60">
          Browser
        </div>
      </div>
      <div v-click class="flex flex-col gap-2 items-center justify-center">
        <div class="size-5 i-lucide-mouse-pointer-click" />
        <div class="text-xxs op-60">
          Real-time
        </div>
      </div>
      <div v-click class="flex flex-col gap-2 items-center justify-center">
        <div class="size-5 i-lucide-timer" />
        <div class="text-xxs op-60">
          Cron Triggers
        </div>
      </div>
    </div>

    <div class="row-start-9 row-end-13 col-start-5 col-end-13 flex flex-col ml-4 justify-evenly">
      <div v-click class="text-sm op-60">
        “NuxtHub allows you to deploy your ideas without upfront costs or lock-in concerns and with blazing-fast performance on Cloudflare's edge network. It's hosting that gets out of your way, so you can focus on building great applications.”
      </div>
      <div class="flex flex-row justify-between">
        <div v-after class="flex flex-row gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/904724?v=4" class="rounded-full size-8"
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

        <a v-click href="https://hub.nuxt.com" target="_blank" class="text-xs rounded shadow flex flex-row items-center justify-center gap-2 text-[#020420] px-3 py-2 bg-primary border-0!">
          <span>Get started for free</span>
        </a>
      </div>
    </div>
  </div>
</template>

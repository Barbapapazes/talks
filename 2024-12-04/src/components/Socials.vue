<script lang="ts" setup>
defineProps<{
  click?: number
}>()
</script>

<template>
  <div class="text-xs flex-row flex justify-center gap-8">
    <span v-click="click" class="flex flex-row gap-1 op-60 items-center forward:delay-50 backward:delay-250"><span class="size-5 inline-block i-ph-globe-light" /><a href="https://soubiran.dev">soubiran.dev</a></span>
    <span v-after class="flex flex-row items-center gap-1 op-60 forward:delay-100 backward:delay-200"><span class="inline-block size-4 i-simple-icons-bluesky" /><a href="https://bsky.app/profile/soubiran.dev">@soubiran.dev</a></span>
    <span v-after class="flex flex-row items-center gap-1 op-60 forward:delay-150 backward:delay-150"><span class="size-4 inline-block i-simple-icons-github" /><a href="https://gh.soubiran.dev">Barbapapazes</a></span>
    <span v-after class="flex flex-row items-center gap-1 op-60 forward:delay-200 backward:delay-100"><span class="size-4 inline-block i-simple-icons-x" /><a href="https://x.soubiran.dev">@soubiran_</a></span>
    <span v-after class="flex flex-row items-center gap-1 op-60 forward:delay-250 backward:delay-50"><span class="size-4 inline-block i-simple-icons-linkedin" /><a href="https://linkedin.soubiran.dev">esteban25</a></span>
  </div>
</template>

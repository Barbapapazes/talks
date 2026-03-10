<script lang="ts" setup>
import now from '~build/time'
import { sha } from '~build/info'
</script>

<template>
  <div class="flex flex-col gap-2 text-sm text-neutral-700 font-semibold">
    Build {{ sha }} at {{ now }}
  </div>
</template>

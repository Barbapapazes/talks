<script lang="ts" setup>
import { sha } from '~build/info'
import now from '~build/time'
</script>

<template>
  <div class="flex flex-col gap-2 text-sm text-neutral-700">
    Build {{ sha }} at {{ now }}
  </div>
</template>

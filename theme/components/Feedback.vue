<script lang="ts" setup>
import { InaliaQR, InaliaShortUrl, useInaliaTalk } from 'slidev-addon-inalia'

const { talk } = useInaliaTalk()
</script>

<template>
  <div v-if="talk" class="flex justify-center items-center flex-col space-y-2">
    <div
      class="overflow-hidden shrink-0 inalia rounded-lg size-40"
    >
      <InaliaQR
        :url="talk.urls.tiny_feedback" class="block"
      />
    </div>
    <InaliaShortUrl :url="talk.urls.tiny_feedback" class="border-0! text-xs mx-auto" />
  </div>
</template>

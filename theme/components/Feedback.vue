<script lang="ts" setup>
import { InaliaQR, InaliaShortUrl, useInaliaTalk } from 'slidev-addon-inalia'
import { computed } from 'vue';

const props = defineProps<{
  enablePlaceholder?: boolean
}>()

const { talk } = useInaliaTalk()

const url = computed(() => {
  if (talk) {
    return talk.urls.tiny_feedback
  }

  if (props.enablePlaceholder) {
    return 'https://example.com'
  }

  return ''
})

const shortUrl = computed(() => {
  if (talk) {
    return talk.urls.tiny_feedback
  }

  if (props.enablePlaceholder) {
    return 'https://example.com'
  }

  return ''
})
</script>

<template>
  <div v-if="talk || props.enablePlaceholder" class="flex justify-center items-center flex-col space-y-2">
    <div>
      ⬇️ Votre feedback ⬇️
    </div>

    <div
      class="overflow-hidden shrink-0 inalia rounded-lg size-40"
    >
      <InaliaQR
        :url="url" class="block"
      />
    </div>
    <InaliaShortUrl :url="shortUrl" class="border-0! text-xs mx-auto" />
  </div>
</template>

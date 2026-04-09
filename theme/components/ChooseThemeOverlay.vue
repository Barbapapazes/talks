<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { useInaliaQuestion, InaliaQR, InaliaShortUrl } from 'slidev-addon-inalia'
import { computed } from 'vue'

const { $slidev } = useSlideContext()
const canChooseTheme = computed(() => ($slidev.configs as any).chooseTheme?.questionId)
const questionId = computed(() => canChooseTheme.value ? ($slidev.configs as any).chooseTheme?.questionId : undefined)
const { isStatic, question } = useInaliaQuestion(() => questionId.value, {
  staticContent: {
    question: undefined,
    type: undefined,
    chart: undefined,
    data: undefined,
  },
})
</script>

<template>
  <div v-if="canChooseTheme && !isStatic && question" class="card absolute top-10 right-10 flex flex-col gap-1 items-end p-2">
    <div class="size-40 shrink-0 overflow-hidden">
      <InaliaQR :url="question.tiny_url" class="border-0!" />
    </div>
    <InaliaShortUrl :url="question.tiny_url" class="border-0! text-xs mx-auto" />
  </div>
</template>

<style scoped>
html[data-theme='default'] {
  .card {
    --at-apply: rounded-lg bg-white text-neutral-700
  }
}

html[data-theme='brutalism'] {
  .card {
    --at-apply: border border-4 bg-[var(--theme-brutalism-primary)] border-[var(--theme-brutalism-border-default)] shadow-[var(--theme-brutalism-shadow-default)];
  }
}

html[data-theme='futuristic'] {

}
</style>

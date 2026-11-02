<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import AdditionalContent from '../components/AdditionalContent.vue'
import Feedback from '../components/Feedback.vue'
import Footer from '../components/Footer.vue'
import { website } from '../contants'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="relative h-full slidev-layout outro2">
    <div class="h-full flex flex-col items-center justify-center gap-10 pb-8 text-center">
      <div>
        <h1 class="!mb-4 !text-6xl font-mono">
          Thank you!
        </h1>
        <div class="text-xl font-medium">
          Estéban Soubiran
        </div>
        <div class="theme-muted-text mt-1 text-base">
          Agent Builder at Takima
        </div>
      </div>

      <div class="flex flex-row items-start justify-center gap-12">
        <Feedback
          v-if="$frontmatter.feedback !== false"
          :enable-placeholder="$frontmatter.feedbackPlaceholder !== false"
          :custom-feedback-url="$frontmatter.customFeedbackUrl"
          :label="$frontmatter.customFeedbackLabel ?? 'Share your feedback'"
        />
        <AdditionalContent :label="$frontmatter.additionalContentLabel ?? 'Get the next episodes'" />
      </div>
    </div>

    <Footer>
      <a :href="website.href" target="_blank" rel="noopener noreferrer" class="text-sm">
        {{ website.text }}
      </a>
    </Footer>
  </div>
</template>

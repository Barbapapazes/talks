<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import AdditionalContent from '../components/AdditionalContent.vue'
import Feedback from '../components/Feedback.vue'
import Fireworks from '../components/Fireworks.vue'
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import { socials, talks, website } from '../contants'

const links = [website, talks, ...socials]

const { $frontmatter, $slidev } = useSlideContext()

// Use the presentation language; decks without htmlAttrs.lang stay in French.
const labels = computed(() => $slidev.configs.htmlAttrs?.lang === 'en'
  ? {
      was: 'That was',
      for: 'For',
      presentedBy: 'Presented by',
      role: 'Agent Builder and Software Engineer at Takima',
      feedback: 'Your feedback',
      additionalContent: 'Additional content',
    }
  : {
      was: 'C’était',
      for: 'Pour',
      presentedBy: 'Présenté par',
      role: 'Agent Builder et Software Engineer chez Takima',
      feedback: 'Votre feedback',
      additionalContent: 'Contenu additionnel',
    })

const title = computed(() => $slidev.configs.title)
const event = computed(() => ($slidev.configs as any).event)
const date = computed(() => ($slidev.configs as any).date)
</script>

<template>
  <div class="relative h-full overflow-hidden slidev-layout outro2">
    <Fireworks />

    <div class="z-10 my-auto flex justify-center">
      <div class="flex flex-col gap-2">
        <span class="theme-muted-text font-light">{{ labels.was }}</span>
        <span class="text-2xl font-semibold">{{ title }}</span>
        <div class="flex flex-row items-center gap-2">
          <span class="theme-muted-text font-light">{{ labels.for }}</span>
          <span class="font-medium">{{ event }}</span>
          <span class="theme-muted-text font-light">({{ date }})</span>
        </div>
        <div class="flex flex-row items-center gap-2">
          <span class="theme-muted-text font-light">{{ labels.presentedBy }}</span>
          <div class="flex flex-row items-center gap-2">
            <img src="https://github.com/barbapapazes.png" class="size-6 rounded-full">
            <span class="text-xl">Estéban Soubiran <span class="font-light">({{ labels.role }})</span></span>
          </div>
        </div>
      </div>

      <div
        class="absolute left-1/2 -translate-x-1/2 bottom-1/6 flex flex-row items-start gap-8"
      >
        <Feedback
          v-if="$frontmatter.feedback !== false"
          enable-placeholder
          :custom-feedback-url="$frontmatter.customFeedbackUrl"
          :label="labels.feedback"
        />

        <AdditionalContent :label="labels.additionalContent" />
      </div>

      <Footer class="flex flex-row gap-2">
        <FooterLink
          v-for="item in links"
          :key="item.text"
          :text="item.text"
          :icon="item.icon"
          :href="item.href"
          target="_blank"
        />
      </Footer>
    </div>
  </div>
</template>

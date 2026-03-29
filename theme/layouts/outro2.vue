<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import Feedback from '../components/Feedback.vue'
import Fireworks from '../components/Fireworks.vue'
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import { socials, talks, website } from '../contants'
import { computed } from 'vue'
const links = [website, talks, ...socials]

const { $frontmatter, $slidev } = useSlideContext()

const title = computed(() => $slidev.configs.title)
const event = computed(() => ($slidev.configs as any).event)
const date = computed(() => ($slidev.configs as any).date)
</script>

<template>
  <div class="relative h-full overflow-hidden slidev-layout outro2">
    <Fireworks />

    <div class="z-10 my-auto flex justify-center">
      <div class="flex flex-col gap-2">
        <span class="font-light text-neutral-700"> C'était </span>
        <span class="text-2xl font-semibold">{{ title }}</span>
        <div class="flex flex-row items-center gap-2">
          <span class="font-light text-neutral-700">Pour</span>
          <span class="font-medium">{{ event }}</span>
          <span class="font-light text-neutral-700">({{ date }})</span>
        </div>
        <div class="flex flex-row items-center gap-2">
          <span class="font-light text-neutral-700">Présenté par</span>
          <div class="flex flex-row items-center gap-2">
            <img src="https://github.com/barbapapazes.png" class="size-6 rounded-full">
            <span class="text-xl">Estéban Soubiran</span>
          </div>
        </div>
      </div>


      <Feedback
        v-if="$frontmatter.feedback !== false"
        enable-placeholder
        class="absolute left-1/2 -translate-x-1/2 bottom-1/6"
      />


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

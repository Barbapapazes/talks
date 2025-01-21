<script lang="ts" setup>
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'
import LatestArticles from 'virtual:latest-articles'
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import { socials, technologies, website } from '../contants'

interface IntroProps {
  intro: string
}

const props = defineProps<IntroProps>()

const links = [website, ...socials]
</script>

<template>
  <div class="slidev-layout intro">
    <div class="my-auto">
      <div class="flex flex-col gap-4">
        <img src="https://github.com/barbapapazes.png" class="size-24">

        <div>
          <h1>Estéban Soubiran</h1>

          <VClick>
            <p v-html="props.intro" />
          </VClick>
        </div>
      </div>

      <div class="flex gap-4 mt-6">
        <template v-for="(item, index) in technologies" :key="item.text">
          <component :is="index === 0 ? VClick : VAfter">
            <div
              class="py-2 flex items-center gap-2 forward:delay-[--delay] px-4 rounded-md bg-neutral-800 text-neutral-400 text-base"
              :style="{ '--delay': `${index * 50}ms` }"
            >
              <span :class="item.icon" class="inline-block size-4 shrink-0" />
              <span>{{ item.text }}</span>
            </div>
          </component>
        </template>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-4">
        <template
          v-for="(article, index) in LatestArticles"
          :key="article.id"
        >
          <component :is="index === 0 ? VClick : VAfter">
            <div
              class="relative p-4 rounded-md border transition forward:delay-[--delay] border-neutral-600 duration-300 ease-out hover:border-neutral-400"
              :style="{ '--delay': `calc(${(index % 2/** x */) + (Math.floor(index / 2)/** y */)} * 50ms)` }"
            >
              <a :href="article.url" target="_blank">
                <h2 class="text-base text-neutral-200 font-semibold">{{ article.title }}</h2>
                <span class="absolute inset-0" />
              </a>
            </div>
          </component>
        </template>
      </div>

      <VClick>
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
      </VClick>
    </div>
  </div>
</template>

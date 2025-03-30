<script lang="ts" setup>
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'
import LatestArticles from 'virtual:latest-articles'
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import { socials, technologies, website } from '../contants'

const links = [website, ...socials]
</script>

<template>
  <div class="slidev-layout intro">
    <div class="flex flex-col h-full">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-4">
          <img src="https://github.com/barbapapazes.png" class="size-24">

          <div>
            <h1>Estéban Soubiran</h1>

            <VClick>
              <p>
                Avonics Software Engineer at <span class="inline-block size-5 i-custom-maiaspace align-text-top" /> Maiaspace
              </p>
            </VClick>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <template v-for="(item, index) in technologies" :key="item.text">
            <component :is="index === 0 ? VClick : VAfter">
              <Card
                class="relative py-2 flex items-center gap-2 forward:delay-[--delay] transition duration-300 ease-out"
                :style="{ '--delay': `${index * 50}ms` }"
              >
                <span :class="item.icon" class="inline-block size-4 shrink-0" />
                <a :href="item.href" target="_blank" class="border-0! font-normal">
                  <span>{{ item.text }}</span>
                  <span class="absolute inset-0" />
                </a>
              </Card>
            </component>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 my-auto">
        <template
          v-for="(article, index) in LatestArticles"
          :key="article.id"
        >
          <component :is="index === 0 ? VClick : VAfter">
            <Card
              class="relative p-4 forward:delay-[--delay] transition duration-300 ease-out"
              :style="{ '--delay': `calc(${(index % 2/** x */) + (Math.floor(index / 2)/** y */)} * 50ms)` }"
            >
              <a :href="article.url" target="_blank">
                <h2 class="font-semibold text-base! text-neutral-950 dark:text-neutral-200">{{ article.title }}</h2>
                <span class="absolute inset-0" />
              </a>
            </Card>
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

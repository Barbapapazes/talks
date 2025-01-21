<script lang="ts" setup>
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import { socials, talks, website } from '../contants'

const links = [website, talks, ...socials]
</script>

<template>
  <div class="h-full grid slidev-layout outro">
    <div class="w-full my-auto">
      <slot />

      <div class="absolute top-14 right-10 font-light flex flex-col text-end text-neutral-600 text-xs">
        <span>Estéban Soubiran</span>
        <span> esteban@soubiran.dev </span>
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

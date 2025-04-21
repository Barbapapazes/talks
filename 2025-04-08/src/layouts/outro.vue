<script lang="ts" setup>
import { socials, website } from '../contants'

const links = [website, ...socials]
</script>

<template>
  <div class="h-full grid slidev-layout outro">
    <div class="w-full my-auto">
      <slot />

      <div class="absolute font-light flex flex-col text-xs text-gray-600 top-14 right-10 text-end">
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

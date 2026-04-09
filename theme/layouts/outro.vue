<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import Feedback from '../components/Feedback.vue'
import Footer from '../components/Footer.vue'
import FooterLink from '../components/FooterLink.vue'
import ThemeRoot from '../components/ThemeRoot.vue'
import { socials, talks, website } from '../contants'

const links = [website, talks, ...socials]

const { $frontmatter } = useSlideContext()
</script>

<template>
  <ThemeRoot class="h-full grid slidev-layout outro">
    <div class="w-full my-auto">
      <div class="theme-muted-text absolute font-light flex flex-col text-xs top-14 text-end right-14">
        <span>Estéban Soubiran</span>
        <span> esteban@soubiran.dev </span>
      </div>

      <Feedback v-if="$frontmatter.feedback !== false" v-click class="absolute right-14 top-28" />

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
  </ThemeRoot>
</template>

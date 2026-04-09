<script lang="ts" setup>
import Footer from '../components/Footer.vue'
import FooterItem from '../components/FooterItem.vue'
import ThemeRoot from '../components/ThemeRoot.vue'

interface CoverProps {
  event: string
  date: string
}

const props = defineProps<CoverProps>()
</script>

<template>
  <ThemeRoot class="h-full grid slidev-layout cover">
    <div class="w-full my-auto">
      <slot />

      <Footer>
        <FooterItem class="flex gap-1">
          <span>{{ props.event }}</span>
          <span>·</span>
          <span>{{ props.date }}</span>
        </FooterItem>
      </Footer>
    </div>
  </ThemeRoot>
</template>

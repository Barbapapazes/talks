<script lang="ts" setup>
import FooterItem from './FooterItem.vue'

interface FooterLinkProps {
  href: string
  text: string
  icon?: string
}
interface FooterLinkEmits {}
interface FooterLinkSlots {}

const props = defineProps<FooterLinkProps>()
defineEmits<FooterLinkEmits>()
defineSlots<FooterLinkSlots>()
</script>

<template>
  <FooterItem
    as="a"
    :href="props.href"
    class="flex items-center gap-1"
  >
    <span v-if="props.icon" :class="props.icon" class="inline-block" />
    <span class="whitespace-nowrap">{{ props.text }}</span>
  </FooterItem>
</template>

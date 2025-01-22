<script lang="ts" setup>
interface FooterProps {}
interface FooterEmits {}
interface FooterSlots {
  default: (props: object) => any
}

defineProps<FooterProps>()
defineEmits<FooterEmits>()
defineSlots<FooterSlots>()
</script>

<template>
  <footer class="absolute left-1/2 -translate-x-1/2 bottom-4">
    <slot />
  </footer>
</template>

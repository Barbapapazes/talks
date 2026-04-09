<script lang="ts" setup>
import { Primitive } from 'reka-ui'

interface FooterItemProps {
  as?: any
  text?: string
}
interface FooterItemEmits {}
interface FooterItemSlots {
  default: (props: object) => any
}

const props = defineProps<FooterItemProps>()
defineEmits<FooterItemEmits>()
defineSlots<FooterItemSlots>()
</script>

<template>
  <Primitive
    :as="props.as"
    class="theme-footer-item font-light text-[0.875rem]"
  >
    <slot>
      <span>{{ props.text }}</span>
    </slot>
  </Primitive>
</template>

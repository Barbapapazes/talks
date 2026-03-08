<script setup lang="ts">
import BackgroundImage from './BackgroundImage.vue'
import Card from './Card.vue'

export type CardPosition = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface CardLayoutProps {
  position: CardPosition
  img?: string
  imgClass?: string
}

const props = defineProps<CardLayoutProps>()

const positionClasses: Record<CardPosition, string> = {
  'top-left': 'top-14 left-14',
  'top-center': 'top-14 left-1/2 -translate-x-1/2',
  'top-right': 'top-14 right-14',
  'center-left': 'top-1/2 left-14 -translate-y-1/2',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'center-right': 'top-1/2 right-14 -translate-y-1/2',
  'bottom-left': 'bottom-10 left-14',
  'bottom-center': 'bottom-10 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-10 right-14',
}
</script>

<template>
  <div class="relative slidev-layout">
    <BackgroundImage :img="props.img" :class="props.imgClass" />
    <div class="absolute z-10" :class="positionClasses[props.position]">
      <Card>
        <slot />
      </Card>
    </div>
    <slot name="outside" />
  </div>
</template>

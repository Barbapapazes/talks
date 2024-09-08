<script lang="ts" setup>
import { renderSVG } from 'uqr'

const props = defineProps<{
  url: string
}>()

const qr = renderSVG(props.url)
</script>

<template>
  <div v-html="qr" />
</template>

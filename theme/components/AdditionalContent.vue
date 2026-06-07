<script lang="ts" setup>
import { InaliaQR } from 'slidev-addon-inalia'
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <div v-if="$frontmatter.additionalContentUrl" class="flex justify-center items-center flex-col space-y-2">
    <div>
      🎁 Contenu additionnel 🎁
    </div>

    <div
      class="shrink-0 inalia rounded-lg size-40"
    >
      <InaliaQR
        :url="$frontmatter.additionalContentUrl" class="block border-0!"
      />
    </div>
  </div>
</template>

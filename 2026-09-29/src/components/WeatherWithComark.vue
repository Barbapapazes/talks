<script setup lang="ts">
import { Markdown } from '@comark/vue'
import ChatAnimation from '../../../theme/components/Chat/ChatAnimation.vue'
import { mapFrames, weatherFrames } from './weather-demo-content'
import WeatherCard from './WeatherCard.vue'
import WeatherMap from './WeatherMap.vue'

const components = { 'weather-card': WeatherCard, 'weather-map': WeatherMap }
</script>

<template>
  <ChatAnimation
    user-prompt="I'm heading to the hackathon pub in Prague after PragVue. Do I need a jacket?"
    :assistant-frame-count="weatherFrames.length"
    follow-up-prompt="Right, but where's the pub? Can you show it on a map?"
    :follow-up-frame-count="mapFrames.length"
    :typewriter-char-delay-ms="25"
    :search-duration-ms="450"
    :thinking-duration-ms="600"
    :stream-frame-delay-ms="230"
  >
    <template #assistant="{ frameIndex, streaming }">
      <Suspense>
        <Markdown
          :value="weatherFrames[frameIndex]"
          :components="components"
          :streaming="streaming"
        />
      </Suspense>
    </template>
    <template #followUp="{ frameIndex, streaming }">
      <Suspense>
        <Markdown
          :value="mapFrames[frameIndex]"
          :components="components"
          :streaming="streaming"
        />
      </Suspense>
    </template>
  </ChatAnimation>
</template>

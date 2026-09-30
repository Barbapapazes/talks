---
ready: true
htmlAttrs:
  lang: en
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
codeCopy: false
transition: fade-out
theme: slidev-theme-personal
title: A Component Library, Some Markdown, and a Deadline
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: nuxt-ui,nuxt-content,comark,hackathons,prototyping,teamwork
event: PragVue
date: September 29, 2026
---

# A Component Library,<br>Some Markdown, and a Deadline

---
name: Nuxt UI
ready: true
layout: bottom-left-card
img: ./prague-2.jpeg
---

<div class="flex flex-row items-center gap-2 text-4xl font-bold">
  <vscode-icons-file-type-nuxt class="size-10" /> Nuxt UI
</div>

---
name: More than a UI library
ready: true
layout: iframe
url: https://ui.nuxt.com/theme
transition: slide-up
---

---
name: UI props - Powerful and flexible
ready: true
layout: center-card
transition: slide-up
img: ./prague-4.jpeg
imgClass: object-bottom
---

````md magic-move
```vue
<template>
  <UButton
    icon="i-lucide-rocket"
    :ui="{
      base: 'rounded-full px-8',
      leadingIcon: 'size-6 text-orange-500',
    }"
  >
    Launch
  </UButton>
</template>
```
```vue
<template>
  <UDropdownMenu
    :items="[
      { label: 'Profile', icon: 'i-lucide-user' },
      { label: 'Settings', icon: 'i-lucide-settings' },
    ]"
    :ui="{
      content: 'w-56 rounded-xl shadow-xl',
      group: 'p-2',
      item: 'rounded-lg px-3 py-2',
      itemLeadingIcon: 'size-5 text-orange-500',
      itemLabel: 'font-semibold',
    }"
  >
    <UButton label="Account" trailing-icon="i-lucide-chevron-down" />
  </UDropdownMenu>
</template>
```
````

---
name: Slots for everything - Fully customizable
ready: true
layout: center-card
img: ./prague-6.jpeg
imgClass: object-bottom
---

```vue
<template>
  <UCard>
    <template #header>
      <h2>Hackathon demo</h2>
    </template>

    We built this in 24 hours.

    <template #footer>
      <UButton>Try it out</UButton>
    </template>
  </UCard>
</template>
```

---
name: My go-to UI library
ready: true
layout: center-card
clicks: 4
img: ./prague-12.jpeg
---

<ProgressiveList :items="[
  { label: 'Portfolio', icon: 'i-ph-briefcase-duotone' },
  { label: 'SaaS apps', icon: 'i-ph-cloud-duotone' },
  { label: 'Internal tools', icon: 'i-ph-wrench-duotone' },
]" />

---
name: Nuxt Content
ready: true
layout: bottom-right-card
img: ./prague-7.jpeg
---

<div class="flex flex-row items-center gap-2 text-4xl font-bold">
  <vscode-icons-file-type-nuxt class="size-10" /> Nuxt Content
</div>

---
name: AI-generated UI
ready: true
layout: ai
---

<WeatherWithComark />

---
name: Comark
ready: true
layout: bottom-left-card
img: ./prague-1.jpeg
---

<div class="flex flex-row items-center gap-2 text-4xl font-bold">
  <img src="/comark.svg" alt="" class="size-10" /> Comark
</div>

---
name: Comark Syntax
ready: true
layout: center-card
img: ./prague-3.jpeg
---

```mdc
# Hackathon demo

Comark is based on Markdown we all know and love,
with the ability to embed interactive components.

::card{title="Hackathon demo"}
We built this in **24 hours**.

#footer
Try the :button[Live demo]{color="primary"}!
::
```

---
name: Comark Usage
ready: true
layout: center-card
img: ./prague-6.jpeg
---

```vue
<script setup>
import { Markdown } from '@comark/vue'
import Card from './Card.vue'

const content = `::card{title="Hackathon demo"}
We built this in **24 hours**.
::`
</script>

<template>
  <Suspense>
    <Markdown :value="content" :components="{ card: Card }" />
  </Suspense>
</template>
```

---
name: Recap
ready: true
layout: recap
---

<RecapList
  title="What to remember"
  :items="[
    {
      title: 'Rely on a component library',
      description: 'At least for the hackathon, to save time and focus on the logic.'
    },
    {
      title: 'Nuxt UI is my go-to library',
      description: 'Highly customizable, with a ui prop and slots to override everything.'
    },
    {
      title: 'Use Comark to render AI-generated content',
      description: 'It allows you to easily render streamed Markdown with interactive components.'
    }
  ]"
/>

---
name: Hackathon tips
ready: true
layout: center-card
clicks: 5
img: ./prague-13.jpeg
imgClass: object-bottom
---

<ProgressiveList :items="[
  'Raise the bar to explore new horizons',
  'Prepare the field for AI',
  'Vibe code as much as you can',
  'Expect things to break',
]" />

<!--

'Raise the bar to explore new horizons',

a side project -> a prompt
a startup idea -> a side project
too big -> start up idea

so we have to refine what too big is

'Prepare the field to let AI know about the project',

You may think that 5h is not enough to build something? That's honestly a lot of time, with ai and a good strategy, you can build more during these 5h than in a week of work a few years ago.

'Vibe code as much as you can, but do it smartly',

'Expect things to break',


At the end of the day, I would really like to hear what you build and, more importantly, about your experience trying to get the most out of AI to create something that works.
-->

---
name: Enjoy
ready: true
layout: keep-in-mind
---

Please enjoy the hackathon,<br>and don't forget to have fun!

<!--
Unique opportunity to build, to try, to fail, and, more importantly, to learn
-->

---
name: Outro
ready: true
layout: outro2
feedback: false
---

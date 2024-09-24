---
htmlAttrs:
  lang: en
fonts:
  sans: Noto Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: '#00DC82'
colorSchema: dark
transition: slide-left
addons:
  - slidev-addon-inalia
name: "You've dreamed it? Create full-stack apps with Nuxt!"
title: "You've dreamed it? Create full-stack apps with Nuxt!"
---

<div op="60" font="400">
  You've dreamed it?
</div>

<h1 font="serif 500" p="b-20">
  Create full-stack apps<br>with <span text="primary">Nuxt</span>
</h1>

<div absolute left="14" bottom="10" flex="~ col gap-4 items-start">
  <span>Estéban Soubiran</span>
  <a href="https://soubiran.dev" target="_blank" op="60" m="t--4" class="text-xs">soubiran.dev</a>
</div>

<div absolute right="14" bottom="10" flex="~ col gap-4 items-end">
  <span>PragVue</span>
  <span text="xs" op="60" m="t--4">September, 17 2024</span>
</div>

---
name: Introduction
layout: cover
---

<img src="https://github.com/barbapapazes.png" size="32" />

<h2 m="t-4" font="serif 500">
  Estéban Soubiran
</h2>

<div m="t-2 b-20" op="60">
Freelance web developer and open-source enthusiast.
</div>

<div absolute left="14" bottom="10" text="sm" op="60" flex="~ row gap-8">
  <span v-click="1" flex="~ row items-center gap-1"><span i-ph-globe-light w="5" h="5" inline-block></span><a href="https://soubiran.dev">soubiran.dev</a></span>
  <span v-click="3" flex="~ row items-center gap-1"><span i-simple-icons-github w="4" h="4" inline-block></span><a href="https://gh.soubiran.dev">Barbapapazes</a></span>
  <span v-click="5" flex="~ row items-center gap-1"><span i-simple-icons-x w="4" h="4" inline-block></span><a href="https://x.soubiran.dev">@soubiran_</a></span>
  <span v-click="5" flex="~ row items-center gap-1"><span i-simple-icons-linkedin w="4" h="4" inline-block></span><a href="https://linkedin.soubiran.dev">esteban25</a></span>
</div>

<div absolute top="10" right="14" w="64" flex="~ col gap-8">
  <div v-click="2" flex="~ col gap-2">
    <a href="https://soubiran.dev/posts" text-sm op="80" border="~ !0" font="serif">Latest Articles</a>
    <a href="https://soubiran.dev/posts/testing-is-not-just-about-writing-test" text-xs op="60" border="~ !0">Testing is not Just About Writing Tests</a>
    <a href="https://soubiran.dev/posts/introducing-gavarnie-launch-your-saas-with-nuxt-and-assurance" text-xs op="60" border="~ !0">Introducing Gavarnie: Launch Your SaaS with Nuxt and Assurance</a>
  </div>
  <div v-click="4" flex="~ col gap-2">
    <a href="https://gh.soubiran.dev" text-sm op="80" border="~ !0" font="serif">Nuxt Modules</a>
    <a href="https://github.com/Barbapapazes/nuxt-authorization" text-xs op="60" border="~ !0">barbapapazes/nuxt-authorization</a>
    <a href="https://github.com/Barbapapazes/nuxt-payload-analyzer" text-xs op="60" border="~ !0">Barbapapazes/nuxt-payload-analyzer</a>
  </div>
  <div v-click="4" flex="~ col gap-2">
    <a href="https://gh.soubiran.dev" text-sm op="80" border="~ !0" font="serif">Nuxt Templates</a>
    <a href="https://github.com/Barbapapazes/gavarnie" text-xs op="60" border="~ !0">barbapapazes/gavarnie</a>
    <a href="https://github.com/Barbapapazes/the-green-chronicle" text-xs op="60" border="~ !0">barbapapazes/the-green-chronicle</a>
  </div>

</div>

<div v-click="7" absolute right="14" bottom="8" text-sm text-black font="serif" p="x-4 y-2" rounded bg="primary" tracking="wider" notification>
  <span op="80">And more to come</span>
</div>

---
name: Have you heard of Nitro?
---

<Inalia
  question="Have you heard of Nitro?"
  type="single_select"
  chart="donut"
  :answers="[
    { label: 'I know exactly what it is', value: 13, color: '#70ffc6' },
    { label: 'I\'ve heard of it but I don\'t know what it is', value: 5, color: '#00dc82' },
    { label: 'I have no idea what it is', value: 6, color: '#07603e'}
  ]"
/>

---
name: Nitro
layout: center
---

<h1 font="serif" text="center">Nitro</h1>

<div op="60">
  Powering the Nuxt Server
</div>

<a href="https://github.com/Barbapapazes/pragvue-2024/tree/01-nitro" target="_blank" v-click absolute block right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>Let me show you</span>
  <span i-ph-file-code-light w="4" h="4" inline-block></span>
</a>

---
name: More than an app and a server
---

<img src="/nuxt=vue+nitro.svg" w="1/2" m="t-12" mx="auto" />

<div v-click absolute right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>More features</span>
  <span i-ph-flask-light w="4" h="4" inline-block></span>
</div>

---
name: Database
layout: center
---

<h1 font="serif" text="center">Database</h1>

<div op="60">
  A place to store your data
</div>

<hr v-click border="slate-800" m="y-8" />

<v-click>

```ts
const database = useDatabase()
```

<div text="sm center" op="60">or</div>

```bash
npx nuxi module add hub
```

</v-click>

<a href="https://github.com/Barbapapazes/pragvue-2024/tree/02-database" target="_blank" v-click absolute block right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>Let me show you</span>
  <span i-ph-database-light w="4" h="4" inline-block></span>
</a>

<!--
First, show the `useDatabase` function from Nitro.

Then, show the NuxtHub module.
-->

---
name: State of our full-stack app
---

<img src="/nuxt=vue+nitro+database.svg" w="1/2" m="t-12" mx="auto" />

<div v-click absolute right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>More features</span>
  <span i-ph-flask-light w="4" h="4" inline-block></span>
</div>

---
name: Authentication
layout: center
---

<h1 font="serif" text="center">Authentication</h1>

<div op="60" text="center">
  A way to secure your app
</div>

<hr v-click border="slate-800" m="y-8" />

<v-click>

```bash
npx nuxi module add auth-utils
```

</v-click>

<a href="https://github.com/Barbapapazes/pragvue-2024/tree/03-authentication" target="_blank" v-click absolute block right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>Let me show you</span>
  <span i-ph-database-light w="4" h="4" inline-block></span>
</a>

---
name: State of our full-stack app
---

<img src="/nuxt=vue+nitro+database+auth.svg" w="1/2" m="t-12" mx="auto" />

---
name: Let's go online
layout: center
---

<h1 v-click font="serif" text="center" flex="~ row items-center gap-4">
  <span i-logos-cloudflare-icon w="16" h="16" inline-block></span>
  <span>Cloudflare</span>
</h1>

<div v-click flex="~ row justify-center items-center gap-2">
  <img w="8" src="/cf-pages.svg" />
  <img w="8" src="/cf-kv.svg" />
  <img w="8" src="/cf-d1.svg" />
  <img w="8" src="/cf-r2.svg" />
  <img w="8" src="/cf-vectorize.svg" />
  <img w="8" src="/cf-web-analytics.svg" />
</div>

<!-- All of these works on the edge but [click] ... -->

---
name: Do you know the edge?
---

<Inalia
  question="Do you know the edge?"
  type="single_select"
  chart="donut"
  :answers="[
    { label: 'I know exactly what it is', value: 9, color: '#ffc6a8' },
    { label: 'I\'ve heard of it but I don\'t know what it is', value: 5, color: '#FCAD41' },
    { label: 'I have no idea what it is', value: 11, color: '#F6821E'}
  ]"
/>

<!--
https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/
-->

---
name: Deployment
layout: center
---

<h1 font="serif" text="center">Deployment</h1>

<div op="60" text="center">
  Share it with the world
</div>

<hr v-click border="slate-800" m="y-8" />

<v-click>

```bash
npx nuxthub link
```

<div text="sm center" op="60">and</div>

```bash
npx nuxthub deploy
```

</v-click>

<a href="https://github.com/Barbapapazes/pragvue-2024/tree/04-deployment" target="_blank" v-click absolute block right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>Let me show you</span>
  <span i-ph-rocket-light w="4" h="4" inline-block></span>
</a>

---
name: Dashboard
layout: center
---

<h1 font="serif" text="center">Dashboard</h1>

<div op="60" text="center">
  Manage your data
</div>

<hr v-click border="slate-800" m="y-8" />

<p v-click text="sm center">
  <a href="https://admin.hub.nuxt.com" target="_blank" op="60" font="serif">admin.hub.nuxt.com</a>
</p>

<a href="https://admin.hub.nuxt.com" target="_blank" v-click absolute block right="1/2" bottom="10" text-sm text-black bg="primary" p="x-4 y-2" rounded flex="~ row items-center gap-2" tracking="wider" notification="centered">
  <span>Let me show you</span>
  <span i-ph-eye-light w="4" h="4" inline-block></span>
</a>

---
name: State of our full-stack app
class: relative
---

<img src="/full-stack=vue+nitro+hub+cloudflare.svg" absolute w="3/4" right="1/2" bottom="1/2" translate="1/2" mx="auto" />

---
name: A little of AI
hide: true
---

<!--

I will not have enough time for this one.
https://hub.nuxt.com/docs/features/ai

-->

---
name: Conclusion
layout: center
---

<h1 font="serif" text="center">
  Full-stack apps with Nuxt<br>is now a reality
</h1>

<div v-click op="60" text="center">
  And it's just the beginning
</div>

<!--
I strongly believe that a lot of things will emerge from this for the whole Nuxt community. This is really exciting!
-->

---
name: Thank you
layout: center
class: relative
---

<img src="https://github.com/barbapapazes.png" size="20" m="x-auto" />

<h2 text="center" m="t-4" font="serif 500">
  Estéban Soubiran
</h2>

<div text="center" m="t-2" op="60">
Freelance web developer and open-source enthusiast.
</div>

<div m="t-8" text="sm" op="60" flex="~ row gap-8">
  <span flex="~ row items-center gap-1"><span i-ph-globe-light w="5" h="5" inline-block></span><a href="https://soubiran.dev">soubiran.dev</a></span>
  <span flex="~ row items-center gap-1"><span i-simple-icons-github w="4" h="4" inline-block></span><a href="https://gh.soubiran.dev">Barbapapazes</a></span>
  <span flex="~ row items-center gap-1"><span i-simple-icons-x w="4" h="4" inline-block></span><a href="https://x.soubiran.dev">@soubiran_</a></span>
  <span flex="~ row items-center gap-1"><span i-simple-icons-linkedin w="4" h="4" inline-block></span><a href="https://linkedin.soubiran.dev">esteban25</a></span>
</div>

<hr border="slate-800" m="y-12" />

<h1 text="center" font="serif">Thank you!</h1>

<!--
Thank you! I hope you enjoyed the talk, it's been a pleasure to share this with you.
-->

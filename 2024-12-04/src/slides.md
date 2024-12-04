---
htmlAttrs:
  lang: fr
  dir: ltr
fonts:
  sans: Noto Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: '#00DC82'
colorSchema: dark
glowSeed: 213
transition: fade-out
remoteAssets: true
addons:
  - slidev-addon-inalia
title: Nuxt, NuxtHub et le full-stack
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: nuxt,nuxthub,full-stack,apps,web,development
---

<div class="relative">
  <h1 class="text-center font-serif pb-36">Nuxt, Nuxt<span class="text-primary">Hub</span> et le full-stack</h1>
  <p class="absolute left-1/2 transform translate -translate-x-1/2 top-24 op-60">
    Présenté par Estéban
  </p>
</div>

<Globe class="absolute z-10 top-2/5 left-1/2 transform -translate-x-1/2" :size="1000" :speed="0.001" :markers="[{ location: [44.833328, -0.56667], size: 0.04 }]" />

<div class="absolute right-6 bottom-6 flex flex-col gap-4 items-end">
  <span class="text-sm op-40">Vue.js Paris</span>
  <span class="text-xs op-20 mt--4">4 décembre 2024</span>
</div>

---
class: flex flex-col justify-between
glowSeed: 2
---

<div class="flex flex-col items-center justify-center">
  <img src="https://github.com/barbapapazes.png" class="size-32" />
  <div class="mt-4 text-xl font-serif font-medium">
    Estéban Soubiran
  </div>
  <div class="mt-1 text-sm op-60">
    Développeur web <span class="line-through">freelance</span> et passionné de logiciels libres.
  </div>
</div>

<Tools />

<div v-click class="grid grid-cols-2 gap-8">
  <Card class="weightless">
    <div class="text-sm">
      <a href="https://soubiran.dev/fr/series/create-a-blog-with-vitepress-and-vue-js-from-scratch" target="_blank" class="border-0! hover:text-inherit!">
        Créer un Blog Complet avec VitePress et Vue.js de Zéro
        <span class="absolute inset-0 z-1"></span>
      </a>
    </div>
    <div class="mt-1 text-xs op-60">
      Construisez un blog dynamique avec VitePress et Vue.js de zéro. Apprenez à configurer, optimiser le SEO et déployer pour une expérience de blogging fluide.
    </div>
  </Card>

  <Card class="weightless [--animation-delay:2s]">
    <div class="text-sm">
      <a href="https://soubiran.dev/fr/series/the-complete-guide-to-building-a-vue-js-component-library" target="_blank" class="border-0! hover:text-inherit!">
        Guide pour construire une bibliothèque de composants Vue.js
        <span class="absolute inset-0 z-1"></span>
      </a>
    </div>
    <div class="mt-1 text-xs op-60">
      Découvrez comment construire une bibliothèque de composants Vue.js en utilisant Vite avec un guide couvrant des techniques de développement web professionnel.
    </div>
  </Card>
</div>

<Socials />

---
layout: center
---

<div
  class="font-serif transition duration-500 text-center text-5xl"
 :class="$clicks < 1 ? 'scale-200' : ''"
>
  Nuxt
</div>

<div v-click class="mt-4 forward:delay-400 text-2xl text-center op-60">
Create performant and production-grade<br><span class="text-primary">__________</span> web apps and websites with confidence.
</div>

---

<Inalia
  question="Create performant and production-grade __________ web apps and websites with confidence."
  type="text"
  chart=""
  :data="[
    'Fullstack', 'Fullstack', 'fullstack', 'Fullstack', 'Fullstack', 'green', 'Fullstack', 'Fullstack', 'Fullstack', 'Development', 'Full stack'
  ]"
/>

---

<Card class="grid grid-cols-2 text-4xl font-mono items-start">
  <div>
    <div v-click class="flex flex-row gap-4 items-end">
      <div class="i-vscode-icons-folder-type-app size-12" />
      <div class="op-80">app</div>
    </div>
    <div class="ml-6 mt-4 text-2xl op-40 flex flex-col">
      <span v-click class="forward:delay-50 backward:delay-350">├── components</span>
      <span v-after class="forward:delay-100 backward:delay-300">├── composables</span>
      <span v-after class="forward:delay-150 backward:delay-250">├── layouts</span>
      <span v-after class="forward:delay-200 backward:delay-200">├── middleware</span>
      <span v-after class="forward:delay-250 backward:delay-150">├── pages</span>
      <span v-after class="forward:delay-300 backward:delay-100">├── plugins</span>
      <span v-after class="forward:delay-350 backward:delay-50">└── utils</span>
    </div>
  </div>

  <div>
    <div v-click class="flex flex-row gap-4 items-end">
      <div class="i-vscode-icons-folder-type-server size-12" />
      <div class="op-80">server</div>
    </div>
    <div class="ml-6 mt-4 text-2xl op-40 flex flex-col">
      <span v-click class="forward:delay-50 backward:delay-350">├── api</span>
      <span v-after class="forward:delay-100 backward:delay-300">├── routes</span>
      <span v-after class="forward:delay-150 backward:delay-250">├── middleware</span>
      <span v-after class="forward:delay-200 backward:delay-200">├── plugins</span>
      <span v-after class="forward:delay-250 backward:delay-150">└── utils</span>
    </div>
    </div>
</Card>

<div class="ml-4 mt-4 flex flex-row gap-4 items-end">
  <div class="i-vscode-icons-folder-type-nuxt-opened size-12" />
  <div class="op-80 font-mono text-4xl">Nuxt</div>
</div>

---
layout: center
---

<img src="/nuxthub.svg" class="h-20">

<p class="op-60">
  Le compagnon full-stack pour Nuxt.
</p>

---

<Inalia
  question="Qui connait NuxtHub ?"
  type="single_select"
  chart="donut"
  :data="[
    { label: 'Oui, je l\'ai déjà utilisé', count: 1, color: '#8bcaaf' }, { label: 'Oui, de nom', count: 4, color: '#389172' }, { label: 'Non, je ne connais pas', count: 15, color: '#1f5d49' }
  ]"
/>

---

<NuxtHubBento />

---

<NuxtHubTemplates />

<a v-after href="https://hub.nuxt.com/templates" target="_blank" class="text-xs absolute bottom-2 left-1/2 -translate-x-1/2 op-20 forward:delay-750">
  hub.nuxt.com/templates
</a>

---
layout: center
---

<h1 class="text-center font-serif">
  Un peu de code ? ✅
</h1>

<ul>
  <li v-click class="backward:delay-500">Présentation de l'app</li>
  <li v-after class="forward:delay-100 backward:delay-400">Module NuxtHub</li>
  <li v-after class="forward:delay-200 backward:delay-300">Base de données</li>
  <li v-after class="forward:delay-300 backward:delay-200">Mise en production</li>
  <li v-after class="forward:delay-400 backward:delay-100">Panel d'administration</li>
  <li v-after class="forward:delay-500">Stockage à distance</li>
</ul>

<a href="https://github.com/Barbapapazes/vuejs-paris-2024-12" target="_blank" class="absolute left-1/2 bottom-6 -translate-x-1/2 text-xs op-20">
  Voir le code source
</a>

<!--

_Préparer un peu en amont le repo pour retirer le module du fichier de configuration et sa configuration (`hub: { database: true }`) pour faire semblant d'installer le module_

- Ajout du module dans `nuxt.config.ts`
- Activation de la base de données
- Migrations et intégration de Drizzle
- Déploiement avec `npx nuxhub deploy` (rien ne change entre l'environnement de dev et de prod)
- Visite du site d'administration via le dashboard d'administration
- Stockage à distance

nommer le repo vuejs-paris-2024-12
installer nuxt auth utils avec github tout prêt à être utiliser
installer nuxthub et tout configurer pour que ça fonctionne

en mode, un avis sur Vue.js ?

une simple todo avec nuxt/ui3
et ne laisser à écrire que le code pour save la todo, et les retrieve (les laisser en commentaire dans le dessous au cas où)

il faut insister sur le fait que c'est le même environment de dev et de prod
et la possibilité de voir les données des gens

 -->

---

<NuxtHubBento :clicks="false" />

---

<Inalia
  question="C'est votre dernière chance, il n'y a pas de retour en arrière possible !"
  type="single_select"
  chart="bar"
  :data="[
    { label: 'Vous posez vos questions', count: 0, color: '#2563eb' }, { label: 'Plongeons au coeur de NuxtHub et Cloudflare', count: 0, color: '#dc2626' }
  ]"
/>

---

<ChooseYourPath />

---
pill: blue
layout: center
---

<h1 class="font-serif">Des questions ?</h1>

<EndTalk class="absolute bottom-12 text-sm op-60 left-1/2 -translate-x-1/2" />

---
pill: red
layout: center
---

<div class="i-logos-cloudflare-icon absolute z--10 w-60 h-60 top-20 left-12 op-20" />

<h1 class="font-serif">
  “We're rethinking how applications are built.”
</h1>

<p class="text-end">
  Cloudflare, 2020, à propos de leurs Workers.
</p>

<div class="absolute right-6 bottom-6 flex flex-col gap-4 items-end">
  <a href="https://blog.cloudflare.com/introducing-workers-durable-objects/" class="text-xs op-20">Workers Durable Objects</a>
</div>

<!--
À la fin de cette présentation, vous aurez toutes les clés pour comprendre pourquoi cette citation est si importante et comment elle reflète les services de Cloudflare. Mais avant cela, comprenons comment les applications sont construites aujourd'hui.
-->

---
transition: fade
---

<Inalia
  question="Quels sont les besoins essentiels d'une application web ?"
  type="multiple_select"
  chart="donut"
  :data="[
    { label: 'Base de Données', count: 0, color: '#aeffde' }, { label: 'Stockage Clé-Valeur', count: 0, color: '#2bfda7' }, { label: 'Stockage Blob', count: 0, color: '#00c060' }, { label: 'Queue', count: 0, color: '#009658' }, { label: 'Mailer', count: 0, color: '#07603e' }
  ]"
/>

---
transition: slide-up
---

<OriginServer />

---

<CloudflareNetwork />

---
layout: center
---

<div class="relative">
  <h1 font="serif" text="center" flex="~ row items-center gap-4">
    <span i-logos-cloudflare-icon w="16" h="16" inline-block></span>
    <span>Cloudflare</span>
  </h1>

  <div class="absolute right-0 bottom--1 text-xs op-40">
    Developer Services
  </div>
</div>

<v-click at="1">
  <Card class="mt-12 flex flex-row justify-center items-center gap-2 overflow-hidden">
    <v-clicks>
      <img class="w-8" src="/cf-kv.svg" />
      <img class="w-8" src="/cf-d1.svg" />
      <img class="w-7" src="/cf-r2.svg" />
      <img class="w-8" src="/cf-queues.svg" />
    </v-clicks>
  </Card>
</v-click>

<v-click at="5">
  <Card class="mt-8 flex flex-row justify-center items-center gap-2 overflow-hidden">
    <v-clicks>
      <img class="w-8" src="/cf-pages.svg" />
      <img class="w-8" src="/cf-vectorize.svg" />
      <img class="w-8" src="/cf-web-analytics.svg" />
      <img class="w-8" src="/cf-workflows.svg" />
      <img class="w-8" src="/cf-do.svg" />
    </v-clicks>
  </Card>
</v-click>

<CloudflareNetworkGlobe v-click class="absolute -z-1 left-1/2 top-2/5 transform -translate-x-1/2 op-60" :size="600" />

---

<NuxtHubBento :clicks="false" />

---
end: true
---

<h1 text="center" font="serif">Merci !</h1>

<hr class="bg-white op-20 my-12" />

<Card class="flex flex-col p-6">
  <img src="https://github.com/barbapapazes.png" class="mx-auto size-20" />

  <span class="mt-6 text-center text-xl font-serif font-medium">
    Estéban Soubiran
  </span>

  <span class="mt-1 text-center text-sm op-60">
    Développeur web <span class="line-through">freelance</span> et passionné de logiciels libres.
  </span>

  <Socials :click="0" class="mt-8" />
</Card>

<a href="https://soubiran.dev/talks" target="_blank" class="absolute left-1/2 bottom-6 -translate-x-1/2 text-xs op-20">
  Retrouve mes slides sur soubiran.dev/talks
</a>

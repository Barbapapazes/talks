---
htmlAttrs:
  lang: fr
  dir: ltr
fonts:
  sans: Noto Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: '#EE0C6F'
colorSchema: dark
glowSeed: 213
transition: fade-out
addons:
  - slidev-addon-inalia
title: Fluidifier l'expérience utilisateur
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development
---

<h1 class="text-center font-serif">
  Fluidifier<br>l'expérience utilisateur
</h1>

<p class="text-center">
  Par Estéban Soubiran
</p>

<div class="absolute right-6 bottom-6 flex flex-col gap-4 items-end">
  <span class="text-sm op-40">TakiMeet</span>
  <span class="text-xs op-20 mt--4">20 novembre 2024</span>
</div>

<!--

https://remix.run/docs/en/main/discussion/pending-ui
https://dnlytras.com/blog/optimistic-updates

 -->

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
    Développeur web freelance en France et passionné de logiciels libres.
  </div>
</div>

<Tools />

<div v-click class="grid grid-cols-2 gap-8">
  <Card>
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

  <Card>
    <div class="text-sm">
      <a href="https://soubiran.dev/fr/posts/the-simplest-method-to-create-a-vue-js-component-library" target="_blank" class="border-0! hover:text-inherit!">
        Créer une Bibliothèque de Composants Vue.js Simplement
        <span class="absolute inset-0 z-1"></span>
      </a>
    </div>
    <div class="mt-1 text-xs op-60">
      Gérer les complexités des SFC de Vue avec des outils puissants comme unbuild et mkdist pour créer une bibliothèque de composants.
    </div>
  </Card>
</div>

<Socials />

<!--

Au quotidien, je joue avec Vite, Vue, VitePress, UnJS, Nuxt et Laravel et j'écris des articles sur ce que j'apprends et ce que je découvre tel que j'aurai aimé les lire lorsque j'ai commencé le développement web que ce soit sur l'utilisation d'outils, des manières de faire ou la face caché de faire des conférences.

...

Mais on y reviendra ! (sur les séries)
 -->

---
layout: center
clicks: 2
---

<h1 class="text-center font-serif transition ease duration-150" :class="{ 'text-[#877B8D]': $clicks >= 1 }">
  <span class="transition ease duration-150" :class="{ 'text-white' : $clicks === 1 }">Transmission</span> d'une <span class="transition ease duration-150" :class="{ 'text-white' : $clicks === 1 }">information</span><br>à l'utilisateur suite à une <span class="transition ease duration-150" :class="{ 'text-white' : $clicks === 1 }">action</span>
</h1>

<div v-click="2" class="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-8 delay-300">
  <InlineCard>Action</InlineCard>
  <span class="i-lucide-arrow-right size-5 inline-block"></span>
  <InlineCard>Transmission</InlineCard>
  <span class="i-lucide-arrow-right size-5 inline-block"></span>
  <InlineCard>Information</InlineCard>
</div>

<!--

Fluidifier l'expérience utilisateur, c'est un grand domaine mais aujourd'hui, on va se concentrer sur un aspect bien précis : la transmission d'une information à l'utilisateur suite à une action.

Ça fait beaucoup de mots, même moi je me perds donc on va simplifier et ne garder que l'essentiel.

Transmission = Quel changement appliquer à l'interface
Information = Ce que l'on veut communiquer à l'utilisateur
Action = Quelle interaction l'utilisateur a fait

Tout ça, c'est l'idée de faire passer un message à l'utilisateur d'une manière fluide et cohérente avec son intention d'une part de l'utilisateur et d'autre part de l'information.

Donc si on résume, on a une action qui déclenche une transmission d'information.
 -->

---

<Inalia
  question="Les manières de transmettre l'information suite à une action ?"
  type="text"
  chart=""
  :data="[
    'Bonjour', 'Loader de chargement', 'Une notification', 'Le bouton réagit', 'Le bouton change de couleur', 'Un loader s’affiche', 'Un wizz !', 'un changement d\'état visuel', 'Alert', 'Modal', 'Un spinner', 'Wizz', 'Par un loader', 'mmh', 'Coucou', 'Popover', 'Toastr', '() !', 'Alors quoi?', 'Popup', 'Toastttt', 'Skeleton', 'Changement de page', 'DROP DATABASE;', 'Une popin de l\'enfer', 'Couleur'
  ]"
/>

---
layout: center
---

<div class="grid grid-cols-2 place-items-center gap-16">
  <LoaderButton v-click />

  <OptimisticButton v-click />

  <Skeleton class="col-start-1 col-end-3" v-click />
</div>

---
inalia:
  bar:
    barWidth: 300
---

<Inalia
  question="Ces différents retours sont-ils inclusifs ou exclusifs ?"
  type="single_select"
  chart="bar"
  :data="[
    { label: 'Inclusif', count: 15, color: '#3730a3' }, { label: 'Exclusif', count: 8, color: '#9d174d' }
  ]"
/>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-1">
  <LoaderButton />
  <span class="text-sm op-60">
    <em>Loader</em>
  </span>
</div>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem v-click> Prochain état incertain </ListItem>
    <ListItem v-after class="delay-50"> Changement de l'URL </ListItem>
    <ListItem v-after class="delay-100"> <em>Error boundaries</em> en place </ListItem>
    <ListItem v-after class="delay-150"> Effets secondaires </ListItem>
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-1">
  <OptimisticButton />
  <span class="text-sm op-60">
    <em>Optimistic UI</em>
  </span>
</div>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem v-click> Prochain état connu (action binaire) </ListItem>
    <ListItem v-after class="delay-50"> Pas lié à d'autres parties de l'interface </ListItem>
    <ListItem v-after class="delay-100"> Temps de réponse de l'API très rapide </ListItem>
    <ListItem v-after class="delay-150"> Taux de succès de l'API proche de 100% </ListItem>
    <ListItem v-after class="delay-200"> URL stable </ListItem>
    <ListItem v-after class="delay-250"> Robuste gestion des erreurs </ListItem>
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-1">
  <Skeleton  class="w-60" />
  <span class="text-sm op-60">
    <em>Skeleton Fallbacks</em>
  </span>
</div>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem v-click class="delay-50"> Chargement initial </ListItem>
    <ListItem v-after class="delay-100"> Données non critique </ListItem>
    <ListItem v-after class="delay-150"> Sensation d'application </ListItem>
</div>

---
layout: center
---

<h1 class="text-center font-serif">
  Un peu de code ? <span class="i-noto-goat size-10 inline-block align-middle" />
</h1>

<p>
  Tout comprendre en 3 étapes.
</p>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem v-click class="delay-50"> Optimistic UI vs Loader <span class="text-sm op-40"> (<a href="https://github.com/Barbapapazes/chavignol/tree/01.optimistic-ui-vs-loader" target="_blank"> 01 </a> &rarr; <a href="https://github.com/Barbapapazes/chavignol/tree/02.optimistic-ui-without-a-tool" target="_blank"> 02 </a>) </span> </ListItem>
    <ListItem v-after class="delay-100"> Avec un outil <span class="text-sm op-40"> (<a href="https://github.com/Barbapapazes/chavignol/tree/03.optimistic-ui-with-pinia" target="_blank"> 03 </a> &rarr; <a href="https://github.com/Barbapapazes/chavignol/tree/04.optimistic-ui-with-pinia-completed" target="_blank"> 04 </a>) </span> </ListItem>
    <ListItem v-after class="delay-150"> En toute fluidité <span class="text-sm op-40"> (<a href="https://github.com/Barbapapazes/chavignol/tree/05.comments" target="_blank"> 05 </a>) </span> </ListItem>
</div>

<a href="https://github.com/barbapapazes/chavignol" target="_blank" class="absolute left-1/2 bottom-6 -translate-x-1/2 text-sm op-40">
  <span class="i-simple-icons-github inline-block size-3" />
  <span class="ml-1">
    barbapapazes/chavignol
  </span>
</a>

---

<Inalia
  question="Loader ou optimistic UI ?"
  type="single_select"
  chart="donut"
  :data="[
    { label: 'Loader', count: 1, color: '#3730a3' }, { label: 'Optimistic UI', count: 24, color: '#9d144d' }
  ]"
/>

---
layout: center
---

<h1 class="relative font-serif flex gap-2">
  <img src="/pinia-colada.svg" class="size-12 absolute top-1/2 -translate-y-1/2 right-full" /> Pinia Colada
</h1>

<p>
  La couche de récupération de données pour Pinia (et Vue.js).
</p>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem> Simple, Flexible et Modulaire </ListItem>
    <ListItem> Approche Déclaratif </ListItem>
    <ListItem> <em>Optimistic UI</em> </ListItem>
</div>

<a href="https://pinia-colada.esm.dev/" target="_blank" class="absolute left-1/2 bottom-6 -translate-x-1/2 text-sm op-40">
  Pinia Colada
</a>

---
layout: iframe-right
url: https://soubiran.dev/fr/series/empower-and-dynamize-our-vitepress-blog-with-a-laravel-api
---

<h1 class="font-serif">
  Nouvelle série
</h1>

<div class="mt-8 flex flex-col gap-2 items-start">
    <ListItem v-click class="delay-50"> API avec Laravel </ListItem>
    <ListItem v-after class="delay-100"> Authentification </ListItem>
    <ListItem v-after class="delay-100"> Utilisation de Pinia Colada </ListItem>
    <ListItem v-after class="delay-150"> <em>Optimistic UI</em> et <em>Loaders</em> </ListItem>
    <ListItem v-after class="delay-200"> Entièrement testé </ListItem>
</div>

<a href="https://pinia-colada.esm.dev/" target="_blank" class="absolute left-1/4 bottom-6 -translate-x-1/2 text-sm op-40">
  Améliorer notre blog VitePress avec une API Laravel
</a>

---
layout: center
class: relative
glowSeed: 3
---

<h1 text="center" font="serif">Merci !</h1>

<hr class="bg-white op-20 my-12" />

<Card class="flex flex-col p-6">
  <img src="https://github.com/barbapapazes.png" class="mx-auto size-20" />

  <span class="mt-6 text-center text-xl font-serif font-medium">
    Estéban Soubiran
  </span>

  <span class="mt-1 text-center text-sm op-60">
    Développeur web freelance en France et passionné de logiciels libres.
  </span>

  <Socials :click="0" class="mt-8" />
</Card>

<a href="https://soubiran.dev/talks" target="_blank" class="absolute left-1/2 bottom-6 -translate-x-1/2 text-xs op-20">
  Retrouve mes slides sur soubiran.dev/talks
</a>

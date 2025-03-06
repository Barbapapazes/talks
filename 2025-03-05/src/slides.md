---
htmlAttrs:
  lang: fr
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: white
codeCopy: false
transition: fade-out
remoteAssets: true
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: Vous n'avez pas besoin de ces nouvelles API Node.js
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: typescript,nodejs,node,web,development
event: Node.js Paris
date: 05 mars 2025
---

# Vous n'avez pas besoin<br>de ces nouvelles API Node.js

Présenté par Estéban Soubiran

---
name: Présentation
layout: intro
intro: Développeur web full-stack à <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

---
name: "Inalia: Qui êtes-vous ?"
---

<Inalia
  question="Qui êtes-vous ?"
  type="single_select"
  chart="bar"
  :data="[
    { label: 'Étudiant(e)', count: 3, color: '#ef4444' }, { label: 'En reconversion', count: 3, color: '#22c55e' }, { label: 'Développeur(se) débutant(e)', count: 4, color: '#0ea5e9' }, { label: 'Développeur(se) expérimenté(e)', count: 14, color: '#a855f7' }
  ]"
/>

---
name: Les Plateformes de Déploiement
layout: bottom-left-card
transition: slide-left
img: https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<div class="grid grid-cols-[60px_1fr] gap-8 text-4xl font-medium">
  <div v-click :class="{ 'opacity-20': $clicks > 1 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-netlify inline-block size-14"></span>
    <span>Netlify</span>
  </div>
  <div v-click :class="{ 'opacity-20': $clicks > 2 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-light-vercel dark:i-vscode-icons-file-type-vercel inline-block size-10"></span>
    <span>Vercel</span>
  </div>
  <div v-click :class="{ 'opacity-20': $clicks > 3 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-logos-cloudflare-icon inline-block size-12"></span>
    <span>Cloudflare</span>
  </div>
</div>

---
name: Les Packages Managers
layout: bottom-left-card
img: https://images.unsplash.com/photo-1722440814333-51292da1c59f?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<div class="w-60 grid grid-cols-[60px_1fr] gap-8 text-4xl font-medium">
  <div v-click :class="{ 'opacity-20': $clicks > 1 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-npm inline-block size-14"></span>
      npm
  </div>
  <div v-click :class="{ 'opacity-20': $clicks > 2 }"  class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-yarn inline-block size-12"></span>
    Yarn
  </div>
  <div v-click :class="{ 'opacity-20': $clicks > 3 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-light-pnpm dark:i-vscode-icons-file-type-pnpm inline-block size-10"></span>
    pnpm
  </div>
  <div v-click :class="{ 'opacity-20': $clicks > 4 }" class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-bun inline-block size-12"></span>
    Bun
  </div>
  <div v-click class="col-span-2 grid grid-cols-subgrid gap-2 items-center">
    <span class="i-vscode-icons-file-type-light-pnpm dark:i-vscode-icons-file-type-pnpm inline-block size-10"></span>
    pnpm
  </div>
</div>

<!--
La question qui se pose c'est pourquoi avoir réalisé cette migration ?

On m'avait promis que c'était mieux, plus rapide, plus simple, ...
mais est-ce que ça répondait à un besoin de j'avais ? Non.
-->

---
name: YAGNI
layout: center
class: text-center
---

<v-click>

<h1 class="text-6xl font-bold">
  YAGNI
</h1>

</v-click>

<v-click>

You aren't gonna need it

</v-click>

<!--
D'ailleurs, j'ai découvert qu'il y avait un mot pour définir ce concept: YAGNI.

Ne pas apprendre avant d'en avoir sincèrement besoin (et donc il faut se documenter avant de se lancer)

Finalement, c'est se mettre en mode lazy, comme le lazy loading, c'est pareil, sur les nouveautés.
-->

---
name: Les API Node.js
layout: bottom-left-card
transition: slide-left
img: https://images.unsplash.com/photo-1558556990-16d9896511ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# Les nouvelles API Node.js

- `node --watch`
- `node:test`
- `parseArgs`
- `node --env-file=.env`
- `node:sqlite`

---
name: Les Frameworks et les Runtimes
layout: bottom-left-card
img: https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# Voyons plus large

- Les Frameworks
- Les Runtimes
- Les IDEs

---
name: Soit-disant Mieux, Plus Rapide, Plus Simple
layout: center
---

<h1>
  Soit-disant Mieux, Plus Rapide, Plus Simple
</h1>

<!--
La réalité, c'est que la fidélité paie en programmation.
-->

---
name: Restez focus
layout: outro
---

# Restez focus

<v-click>

Tout en restant curieux

</v-click>

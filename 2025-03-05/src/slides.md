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

<!--

- light theme
- grossir les textes
- slide de présentation (et je pense qu'il faut revoir le contenu) (mettre les carrés des languages à droite pour avoir plus de place pour les articles (et y ajouter une description))
- plus gros le footer

- [ ] question sur qui est l'audience

- toujours mettre du perso, du concret et de l'avis

watch mode => jamais l'usage => vite ou le watch mode du builder comme tsup (ou à la main parce que vous faites du typescript)
ndoe:test (vitest réutilise votre pipeline vite et pour le backend, il y a japa
parseArgs ok mais si tu veux vraiment faire un cli, il te faut plus que juste un parser d'argument (et il existe d'autres parser bien plus puissant et surtout bien installé) dommage de ne pas réutiliser l'api
.env -> bah c'est votre tool qui s'en occupe et on revient aux problèmes qu'on fait des scripts en TS (mais possiblement la plus utile)
sqlite -> chouette mais vous allez surement en vouloir un peu plus (et donc utilise un orm ou un query builder)
running script ? bah le pacakge manger le fait (https://nodejs.org/en/learn/command-line/run-nodejs-scripts-from-the-command-line#intentional-limitations)

- slide sur l'élargissement de la problématique aux frameworks

j'ai eu cette discussion sur X...

- slide sur l'élargissement de la problématique aux runtimes

Objectif: rester concentré (s'éparpiller est le meilleur moyen de ne pas avancer)

Plan

- qui êtes-vous ?
- présentation
- souvenir d'un temps passé (et le fait de s'inventer des cas d'usage avec tout ce qui pouvait sortir) (passer d'hébergeur en hébergeur, refactorer en permanance pour toujours pouvoir tester le dernier package, la nouvelle feature, ...) (sur le serverless et toutes les nouveautés avec les workers, le kv, la db, puis les durable objects, ...) (de netlify à vercel à cloudflare...) (et les packages managers de npm à yarn à npm à yarn2 à pnpm puis à bun et à pnpm)

mais pourquoi j'ai migré ? parce qu'on m'a dit que c'était mieux, plus rapide, plus simple... mais est-ce que ça répondait à un besoin que j'avais ? non

d'ailleurs, j'ai fini par découvrir qu'il existe un mot pour définir ce concept: YAGNI
ou plus lisible: you ain't gonna need it (ne pas l'apprendre avant d'en avoir sincèrement besoin et pour ça, ça veut dire se documenter, lire, ...
se mettre en mode lazy sur ces nouvelles fonctoinnalite's

les api node
on extrapole aux frameworks puis aux runtimes (notamment parce que c'est une question que l'on me pose régulièrement)
(et on pourrait même l'extrapoler aux IDE)

Restez concentré sur vos outils
(tout en restant curieux)

parce qu'au final, ce qui compte, c'est ce que vous avez produit, la valeur que vous avez apporté,
la technologie, l'IDE, le frameework, le runtime, ce n'est qu'un outil

Restez concentré, mais restez curieux,

Merci à tous, c'était Estéban.

 -->

---
name: Présentation
layout: intro
intro: Développeur web full-stack à Maïa Space
---

---
name: "Inalia: Qui êtes-vous ?"
---

<Inalia
  :questionId="1"
/>

---
name: Les Plateformes de Déploiement
layout: center
---

<div class="flex flex-col gap-8 text-4xl font-medium">
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 1 }" class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-netlify inline-block size-8"></span>
      Netlify
  </div>
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 2 }"  class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-vercel inline-block size-8"></span>
    Vercel
  </div>
  <div v-click class="flex flex-row gap-2 items-center">
    <span class="i-logos-cloudflare-icon inline-block size-8"></span>
    Cloudflare
  </div>
</div>

---
name: Les Packages Managers
layout: center
---

<div class="flex flex-col gap-8 text-4xl font-medium">
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 1 }" class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-npm inline-block size-8"></span>
      npm
  </div>
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 2 }"  class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-yarn inline-block size-8"></span>
    Yarn
  </div>
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 3 }"  class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-pnpm inline-block size-8"></span>
    pnpm
  </div>
  <div v-click :class="{ 'slidev-vclick-target slidev-vclick-hidden': $clicks > 4 }" class="flex flex-row gap-2 items-center">
    <span class="i-simple-icons-bun inline-block size-8"></span>
    Bun
  </div>
   <div v-click class="flex flex-row gap-2 items-center">
    <span class="i-vscode-icons-file-type-pnpm inline-block size-8"></span>
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

# YAGNI

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
name: Watch Mode - Les API Node.js
layout: center
---

# `node --watch`

---
name: Test - Les API Node.js
layout: center
---

# `node:test`

---
name: parseArgs - Les API Node.js
layout: center
---

# `parseArgs`

---
name: Chargement d'un .env - Les API Node.js
layout: center
---

# `node --env-file=.env app.js`

---
name: SQLite - Les API Node.js
layout: center
---

# `node:sqlite`

---
name: Les Frameworks et les Runtimes
layout: center
---

# Et si on extrapolait ?

---
name: Soit-disant Mieux, Plus Rapide, Plus Simple
layout: center
---

# Mieux, plus rapide, plus simple ?

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

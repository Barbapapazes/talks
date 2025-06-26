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
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: "En JavaScript, il y a un paquet pour tout... et souvent pour rien."
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,e18e,web,performance
event: BreizhCamp
date: 26 juin 2025
---

# En JavaScript,<br>il y a un paquet pour tout...<br>et souvent pour rien.

---
name: Overview
layout: inalia-overview
---

---
name: `is-string` downloads
---

<img src="/is-string-downloads.png" class="absolute top-1/2 left-1/2 translate--1/2 max-w-3/5" />
<v-clicks>
  <img src="/is-string,react-downloads.png" class="absolute top-1/2 left-1/2 translate--1/2 max-w-3/5" />
  <img src="/is-string,react,tailwindcss-downloads.png" class="absolute top-1/2 left-1/2 translate--1/2 max-w-3/5" />
</v-clicks>

<!--

// Présentation des charts

C'est pour vous dire à quel point `is-string` est partout !

-->

---
name: Qui a déjà installé `is-string` ?
transition: slide-up
---

<Inalia
  question="Qui a déjà installé is-string ?"
  type="single_select"
  chart="donut"
  :data="[
    { label: 'Oui', count: 0, color: '#DCAD74' },
    { label: 'Non', count: 15, color: '#7B5323' }
  ]"
/>

<!--

L'idée est de montrer le paradox que `is-string` est partout maid que personne ne l'a jamais installé.

Le problème, c'est que lors de l'installation d'un package, on ne télécharge pas que le package lui-même, mais aussi toutes ses dépendances, le package.json, le README, la licence, et j'en passe. Au final, le code qui nous intéresse représente une infime partie de ce que l'on télécharge.

 -->

---
name: Heaviest Objects in the Universe
---

<img src="/nodemodules.png" class="absolute top-1/2 left-1/2 translate--1/2 max-w-3/5" />

<!--

Mais on ne veut pas ça. On ne veut pas que notre node_modules devienne la chose la plus lourd de l'univers.

-->

---
layout: intro
intro: Ingénieur logiciel Avionique chez <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

<!--

Avant d'aller plus loin de vous présenter la manière dont on peut éviter cela, je me présente...

-->

---
name: node-modules.dev
---

<a href="https://node-modules.dev/" target="_blank" class="absolute top-1/2 left-1/2 translate--1/2 w-full border-none">
  <img src="/node-modules.dev.png" class="" />
</a>

<!--

Premier outil !

Permet de voir la réalité de ce qui est installé dans notre node_modules (et ce n'est pas du tout que du JavaScript).

Et dans la réalité, il est possible de se passer complètement d'un paquet comme `is-string` en utilisant du code natif.

Mais si pour `is-string`, c'est facile de le remplacer, il peut exister dans notre project d'autres paquets
qu'on ne connaît pas avec des alternatives qu'on ne connaît pas non plus.

-->

---
name: e18e
layout: center-card
img: https://images.unsplash.com/photo-1489976908522-aabacf277f49?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<img src="/e18e.png" class="w-60" />

<div class="mt-4 flex items-center gap-2 text-4xl">
  <span class="bg-gradient-to-br from-[#7cb560] to-[#cf8c3c] bg-clip-text text-transparent font-bold">e18e</span>
  <span>·</span>
  <span>Ecosystem Performance</span>
</div>

<!--

Et c'est là qu'intervient e18e, ou Ecosystem Performance.

C'est un projet qui s'est donné 3 grandes missions :

- Cleanup (nettoyer)
- Speedup (accélérer)
- Levelup (améliorer)

Pour les réaliser, ils listent des bonnes pratiques, créent des outils comme des sites web ou des règles ESLint, forkent des paquets pour les rendre plus performants et travaillent avec l'ensemble de la communauté en proposant des changements dans des paquets populaires.

Et ce que je vous propose pour la suite, c'est que lo'on continue à inspecter `is-string` et à la toute fin, je vous montrerai un cas concret, celui de `storybook`.

https://bsky.app/profile/shilman.net/post/3l7ik3onbbs2b

-->

---
name: pkg-size
---

<a href="https://pkg-size.dev/" target="_blank" class="absolute top-1/2 left-1/2 translate--1/2 w-120 border-none">
  <img src="/pkg-size.dev.png" class="mx-auto rounded-xl" />
</a>

---
name: deptree
---

<a href="https://deptree.rschristian.dev/" target="_blank" class="absolute top-1/2 left-1/2 translate--1/2 w-120 border-none">
  <img src="/deptree.rschristian.dev.png" class="mx-auto rounded-xl" />
</a>

---
name: npmgraph
---

<a href="https://npmgraph.js.org/" target="_blank" class="absolute top-1/2 left-1/2 translate--1/2 w-120 border-none">
  <img src="/npmgraph.js.org.png" class="rounded-xl" />
</a>

---
layout: outro
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Check out the e18e website on <a href="https://e18e.dev/" target="_blank">e18e.dev</a>
  </li>
  <li>
    Explore the <a href="https://github.com/es-tooling/module-replacements" target="_blank">module replacement repository</a> on GitHub.
  </li>
    <li>
    Try the <a href="https://github.com/es-tooling/eslint-plugin-depend" target="_blank">eslint-plugin-depend</a> within your project.
  </li>
  <li>
    Join the community on <a href="https://chat.e18e.dev/"  target="_blank">Discord</a>.
  </li>
</ul>

<!--

// ...

Et finalement, se renseigner sur ce mouvement, prendre le temps de regarder et d'introspecter les paquets de nos propres projets, c'est déjà mettre un pas dans ce mouvement !

-->

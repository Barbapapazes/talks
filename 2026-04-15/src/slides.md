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
title: "Au cœur d’une pipeline: démystifions Vite et ses plugins"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,vite,plugins,pipeline
event: MiXiT
date: 15 avril 2026
chooseYourOwnAdventure: true
timing: 0
---

<!--

Ajouter des questions au début pour mieux identifier le public

-->

# Au cœur d’une pipeline:<br>démystifions Vite et ses plugins

<!--

Bonjour à tous !

J'espère que vous allez bien.

Je suis tellement heureux d'être là aujourd'hui pour pouvoir vous parler de Vite et de ses plugins, le tout, dans un format inédit.

Pour cette session, vous n'allez pas être spectateur, mais acteur de la présentation. Et oui, aujourd'hui, vous êtes les héros de cette conférence et vos choix détermineront le contenu que vous allez découvrir.

Je vous préviens, tout ne pourra pas être exploré alors faites les bons choix !

-->

---
name: Intro
layout: intro
timing: 0
---

<!--

Je m'appelle Estéban...

-->

---
name: Inalia
layout: inalia-overview
timing: 0
---

<!--

Avant d'aller plus loin, je vous invite à scanner ce QR code. Il vous amènera sur une page où vous allez pouvoir retrouver mes réseaux, répondre à des questions, pour le moment, ne le faites pas, poser des questions pour que je puisse y répondre en live pendant la présentation, donner votre avis, mais pour être objectif, je vous recommande de le faire à la fin, même si on sait que ça va être bien !

Et puis, vous pouvez même réagir en direct à ce que je dis, si vous trouvez ça drôle, si vous aimez, ou si simplement vous êtes d'accord.

-->

---
name: Vite
timing: 0
choices:
  - Les origines de Vite
  - Le fonctionnement de Vite
  - Le futur de Vite
---

<!--

-->

---
name: Les origines de Vite
timing: 0
choices:
  - Le fonctionnement de Vite
---

<!--

Choix:

-->

---
name: Le fonctionnement de Vite
timing: 0
choices:
  - Tout n'est que plugin
  - Les entrailles d'un plugin Vite
---

<!--

-->

---
name: Le futur de Vite
timing: 0
choices:
  - Le fonctionnement de Vite
---

<!--

-->

---
name: Tout n'est que plugin
timing: 0
choices:
  - Du CSS importé dans un fichier TypeScript
  - Une image chargée dans un fichier TypeScript
  - import.meta.glob est une illusion
---

<!--

-->

---
name: Du CSS importé dans un fichier TypeScript
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

---
name: Une image chargée dans un fichier TypeScript
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

---
name: import.meta.glob est une illusion
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

---
name: Les entrailles d'un plugin Vite
timing: 0
choices:
  - Tout n'est que plugin
  - La théorie des plugins Vite
---

---
name: La théorie des plugins Vite
timing: 0
---

---
name: resolveId
timing: 0
---

---
name: load
timing: 0
---

---
name: transform
timing: 0
choices:
  - Des exemples concrets
---

---
name: Des exemples concrets
timing: 0
choices:
  - Vue Plugin
  - Auto Import Plugin (unplugin-auto-import)
---

---
name: Vue Plugin
timing: 0
choices:
  - Visualiser la pipeline
---

---
name: Auto Import Plugin (unplugin-auto-import)
timing: 0
choices:
  - Visualiser la pipeline
---

---
name: Un plugin pour virtualiser
timing: 0
choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icons virtuels
  - Infos Plugin - Des infos virtuelles
---

---
name: Vue Router - Un module virtuel
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: VitePress - Des data virtuels
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Icons Plugin - Des icons virtuels
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Infos Plugin - Des infos virtuelles
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Les autres capacités des plugins
timing: 0
choices:
  - Le middleware - Un fichier virtuel
  - Vue Router - Un module virtuel
  - Run Plugin - Un plugin pour exécuter des commandes
  - Virtual Plugin - Un plugin pour virtualiser des modules
  - Laravel Vite - La communication inter-processus
---

<!--

branchement dans le serveur avec les middleware
module virtuel qui n'existe pas dans le système de fichier mais qui est créé à la volée par un plugin
hmr
buildStart
buildEnd

Environment API, que l'on ne verra pas mais qui permet d'ajouter un backend à Vite

avec nitro cloudflare-vite-plugin

l'objectif, c'est de faire comprendre que les applications des Vite plugins sont sans limite et qu'on peut tout faire avec

 -->

---
name: Le middleware - Un fichier virtuel
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Run Plugin - Un plugin pour exécuter des commandes
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Virtual Plugin - Un plugin pour virtualiser des modules
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Laravel Vite - La communication inter-processus
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: unplugin-macro - Un plugin pour créer des macros
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

il faut des plugins qui font du resovledId, load, transform (pour montrer la pipeline)
et on peut avoir une autre branch sur les autres capacités des plugins

mettre les vue plugin et auto import plugin avant et ensuite, montrer à quoi ça ressemble plus concrètement

la virtualisation, c'est une autre branche

et une section sur les autres capacités des plugins (genre le plugin de run, le plugin d'info, le plugin d'icon, ...)

dans les autres capacités des plugins de vite, pour chacun des plugins, parler des autres plugins

-->

---
name: Visualiser la pipeline
timing: 0
choices:
  - Dans les profondeurs de la pipeline
  - Un plugin pour virtualiser
  - Les autres capacités des plugins
---

---
name: Dans les profondeurs de la pipeline
timing: 0
---

---
name: Prendre en main l'ordre
timing: 0
---

<!--

prendre l'example du plugin de Vue, avec un pre pour bosser sur le SFC et un post pour bosser sur le js, l'output

 -->

---
name: L'important d'un filtre
timing: 0
choices:
  - Live Coding
  - Q&A
  - La réunification avec Rolldown
---

<!--

toutes les requests passent par tous les plugins donc sans filtres, ça peut ralentir fortement

 -->

---
name: Live Coding
timing: 0
choices:
  - Conclusion
---

---
name: Q&A
timing: 0
choices:
  - Conclusion
---

---
name: La réunification avec Rolldown
timing: 0
choices:
  - Conclusion
---

<!-- ou on pose directement des questions si les gens ont beaucoup de questions -->
<!-- et du coup pour le live coding, avoir une question sur un hook à use, une feature à dev, une thématique, .... -->

---
name: Conclusion
timing: 0
---

<!-- (revoir la fin, elle est pas ouf mais en même temps. on peut pas passer par tout donc faut se demander si tu as quand même les éléments intéressant ou non) -->

<!-- à la fin, avoir une slide qui montre exactement le chemin qu'on a fait ensemble pour dire qu'il y a encore beaucoup de choses à explorer -->

<!-- la fin est trop linéaire, c'est chiant -->

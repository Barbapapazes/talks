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
group: Introduction
timing: 0
---

<!--

Je m'appelle Estéban...

-->

---
name: Inalia
layout: inalia-overview
group: Introduction
timing: 0
---

<!--

Avant d'aller plus loin, je vous invite à scanner ce QR code. Il vous amènera sur une page où vous allez pouvoir retrouver mes réseaux, répondre à des questions, pour le moment, ne le faites pas, poser des questions pour que je puisse y répondre en live pendant la présentation, donner votre avis, mais pour être objectif, je vous recommande de le faire à la fin, même si on sait que ça va être bien !

Et puis, vous pouvez même réagir en direct à ce que je dis, si vous trouvez ça drôle, si vous aimez, ou si simplement vous êtes d'accord.

-->

---
name: Vite
group: Vite Core
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
group: Vite Core
timing: 0
choices:
  - Le fonctionnement de Vite
---

<!--

d'où ça vient, reprendre le contenu du documentaire de Vite, et les origines depuis le serveur pour Vue.js

-->

---
name: Le fonctionnement de Vite
group: Vite Core
timing: 0
choices:
  - Le pré-bundling avec Esbuild
  - Tout n'est que plugin
  - Les entrailles d'un plugin Vite
---

<!--

simple server web, faire un schéma avec le UA qui fait une requête, le serveur qui la reçoit, la traite et qui répond
(faire un schéma dynamique)

reprendre le système de chat IA ? en mode, on vit dans une époque de fou
https://chatgpt.com/share/6989c859-c310-8011-9006-dc074a544fb4

-->

---
name: Le futur de Vite
group: Vite Core
timing: 0
choices:
  - Le fonctionnement de Vite
---

<!--

aspect stratégique avec VoidZero

-->

---
name: Tout n'est que plugin
group: Feature Plugins
timing: 0
choices:
  - Du CSS importé dans un fichier TypeScript
  - Une image chargée dans un fichier TypeScript
  - import.meta.glob est une illusion
---

<!--

on l'a vu, le coeur est minimal, pour une raison simple, tout passe par des plugins, même les fonctionnalités de base (pourquoi ? parce que ça t'assure que ton système de plugin est le bon, avec suffisamment de puissance et de liberté, tu n'as pas plus d'accès qu'un third party plugin)

-->

---
name: Du CSS importé dans un fichier TypeScript
group: Feature Plugins
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

<!--

import './style.css'

ça ne choque plus personne mais dans la vraie vie, ça ne fonctionne pas

reprendre le schéma dynamique du fonctionnement de Vite et montrer ce qu'il se passe...

montrer du pseudo code du plugin

 -->

---
name: Une image chargée dans un fichier TypeScript
group: Feature Plugins
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

<!--

import img from './image.png'

ça ne choque plus personne mais dans la vraie vie, ça ne fonctionne pas

reprendre le schéma dynamique du fonctionnement de Vite et montrer ce qu'il se passe...
montrer les différentes options parce qu'il peut automatiser

 -->

---
name: import.meta.glob est une illusion
group: Feature Plugins
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

---
name: Le pré-bundling avec Esbuild
group: Vite Core
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

<!--

Pourquoi Esbuild ? Conversion CommonJS -> ESM (indispensable pour les vieilles lib)
Le problème des "milliers de requêtes" pour les grosses dépendances (ex: lodash-es). On fusionne tout en un seul fichier dans .vite/deps.

-->

---
name: Les entrailles d'un plugin Vite
group: Inside a Plugin
timing: 0
choices:
  - Tout n'est que plugin
  - La théorie des plugins Vite
---

---
name: La théorie des plugins Vite
group: Inside a Plugin
timing: 0
---

<!--

reprendre avec plus de détails le fonctionnement d'une requête dans Vite

-->

---
name: resolveId
group: Inside a Plugin
timing: 0
---

<!--

quand, ou et quoi

-->

---
name: load
group: Inside a Plugin
timing: 0
---

<!--

quand, ou et quoi

donner des examples

-->

---
name: transform
group: Inside a Plugin
timing: 0
choices:
  - Des exemples concrets
---

<!--

quand, ou et quoi

-->

---
name: Des exemples concrets
group: Concrete Examples
timing: 0
choices:
  - Vue Plugin
  - Auto Import Plugin (unplugin-auto-import)
---

---
name: Vue Plugin
group: Concrete Examples
timing: 0
choices:
  - Visualiser la pipeline
---

---
name: Auto Import Plugin (unplugin-auto-import)
group: Concrete Examples
timing: 0
choices:
  - Visualiser la pipeline
---

---
name: Un plugin pour virtualiser
group: Virtualization
timing: 0
choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icons virtuels
  - Infos Plugin - Des infos virtuelles
---

---
name: Vue Router - Un module virtuel
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: VitePress - Des data virtuels
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Icons Plugin - Des icons virtuels
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Infos Plugin - Des infos virtuelles
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

---
name: Les autres capacités des plugins
group: Advanced Capabilities
timing: 0
choices:
  - Le HMR (Hot Module Replacement)
  - Le middleware - Un fichier virtuel
  - Vue Router - Un module virtuel
  - Run Plugin - Un plugin pour exécuter des commandes
  - Virtual Plugin - Un plugin pour virtualiser des modules
  - Laravel Vite - La communication inter-processus
  - unplugin-macro - Un plugin pour créer des macros
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
name: Le HMR (Hot Module Replacement)
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

Comment Vite sait quoi mettre à jour ?
Le hook `handleHotUpdate` pour intercepter les changements.
Exemple : invalider un module virtuel quand un fichier sur le disque change.

-->

---
name: Le middleware - Un fichier virtuel
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

-->

---
name: Run Plugin - Un plugin pour exécuter des commandes
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

-->

---
name: Virtual Plugin - Un plugin pour virtualiser des modules
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

-->

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

-->

---
name: unplugin-macro - Un plugin pour créer des macros
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

-->

---
name: Visualiser la pipeline
group: Concrete Examples
timing: 0
choices:
  - Dans les profondeurs de la pipeline
  - Un plugin pour virtualiser
  - Les autres capacités des plugins
---

<!--

sortir vite-plugin-inspect pour voir les différents hooks, les différents plugins et les modifications successives parce que jusque là, c'est juste une boite noire

 -->

---
name: Dans les profondeurs de la pipeline
group: Deep Dive & Conclusion
timing: 0
---

<!--

creuser la manière dont les plugins sont appelés, dans quel ordre

 -->

---
name: Prendre en main l'ordre
group: Deep Dive & Conclusion
timing: 0
---

<!--

prendre l'example du plugin de Vue, avec un pre pour bosser sur le SFC et un post pour bosser sur le js, l'output

le pre, le post, ...

slide relativement rapide

 -->

---
name: L'important d'un filtre
group: Deep Dive & Conclusion
timing: 0
choices:
  - Live Coding
  - Q&A
  - La réunification avec Rolldown
---

<!--

toutes les requests passent par tous les plugins donc sans filtres, ça peut ralentir fortement

donc il faut des filtres, avant c'était un if dans le plugin donc ça call le plugin, maintenant, c'est en amont, et on le voit dans les profondeurs de la pipeline

createFilter de @rollup/pluginutils.

 -->

---
name: Live Coding
group: Deep Dive & Conclusion
timing: 0
choices:
  - Conclusion
---

<!--

tricky mais on peut faire un question group pour savoir ce qu'on veut développer

gestion d'un nouveau type de fichier
gestion d'un fichier virtuel via le middleware
gestion d'un module virtuel

modification du contenu en fonction de ce qu'il y a eu avant dans la pipeline

optimisation des images automatiquement

Proposition : Un plugin qui transforme un fichier .txt en une string exportée (très simple à coder en 2 min : transform + extension check).
Alternative : Un plugin "Guard" qui empêche d'importer moment ou une lib trop lourde en affichant un warning dans la console Vite via this.warn().

plugin autour de l'AI ? Là, j'ai pas d'idée

 -->

---
name: Q&A
group: Deep Dive & Conclusion
timing: 0
choices:
  - Conclusion
---

<!--

un long Q&A parce que même après le live coding, il peut quand même y avoir des questions

 -->

---
name: La réunification avec Rolldown
group: Deep Dive & Conclusion
timing: 0
choices:
  - Conclusion
---

<!--

aspect technique de Rolldown dans Vite (réunification build/dev)

La dualité Esbuild (Dev) / Rollup (Build).
L'importance du hook `config` et de la propriété `apply: 'serve' | 'build'`.
Pourquoi certains plugins ne marchent qu'en build ?

-->

---
name: Conclusion
group: Deep Dive & Conclusion
timing: 0
---

<!-- (revoir la fin, elle est pas ouf mais en même temps. on peut pas passer par tout donc faut se demander si tu as quand même les éléments intéressant ou non) -->

<!-- à la fin, avoir une slide qui montre exactement le chemin qu'on a fait ensemble pour dire qu'il y a encore beaucoup de choses à explorer -->

<!-- la fin est trop linéaire, c'est chiant -->

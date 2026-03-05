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
title: "Au cœur d’une pipeline : démystifions Vite et ses plugins"
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

=> via les groupes sur Inalia
- qui a déjà utilisé Vite ? (avoir une réponse : "Je fais du Next.js")
- qui a déjà créé un plugin Vite ?
- qui a déjà publié sur npm un plugin Vite ?

Source
- Vite Documentary
- Vite Documentation
- Vite source code

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
---

<!--

Mais aujourd'hui, ce n'est ni de moi ni d'Inalia que nous allons parler. Aujourd'hui, c'est Vite qui va être à l'honneur.

On l'a vu au début, vous êtes une large majorité à utiliser Vite. Et c'est normal, Vite est un outil présent dans absolument tout le paysage frontend, et même backend. Que vous fassiez du React, du Vue, du Svelte, du Node.js, du Deno, du Cloudflare Workers, Vite est là. Vous pouvez même faire du Laravel, du Nitro ou du Adonis que Vite serait là aussi. Depuis 2020, Vite est devenu un véritable incontournable, aussi bien pour le frontend que pour le backend.

-->

<!--

Slide avec le logo Vite au centre et une constellation de logos des autres frameworks autour.

 -->

---
name: Vite Growth
group: Vite Core
timing: 0
---

<!--

Incontournable ? Vous allez me dire, Estéban, tu y vas peut-être un peu fort, non ? Face à Vite, on a Webpack et Rspack qui sont deux autres bundlers, l'un plus ancien, l'autre plus récent, avec la même philosophie que Webpack mais écrit en Rust.

... détailler le chart de croissance en partant de Vite et en comparant avec Webpack et Rspack

-->

<!--

Logo de Vite, Webpack et Rspack côte à côte, comme sur https://nuxt.com/#:~:text=Bundler%20with%20Vite

Slide avec le graph de croissance de Vite et une comparaison avec Webpack et Rspack (https://npm.chart.dev/vite+webpack+@rspack/core)
(utiliser le même effet que pour la conférence sur paquet en javascript avec is-string)

 -->

---
name: Vite - Choices
group: Vite Core
timing: 0
choices:
  - Les origines de Vite
  - Le fonctionnement de Vite
  - Le futur de Vite
---

<!--

Vous voilà face à votre premier choix, votre premier dilemme. [mieux tourner la phrase]

Je vous laisse scanner le QR code pour faire votre choix. Attention, il n'y aura pas de retour en arrière possible. Attention, vous n'avez que quelques secondes pour choisir, alors réfléchissez vite.

Si vous souhaitez comprendre les origines de Vite, d'où il vient, pourquoi il a été créé, et comment il a évolué, rendez-vous sur "Les origines de Vite".
Mais peut-être que vous préférez comprendre comment Vite fonctionne dans les grandes lignes, alors rendez-vous sur "Le fonctionnement de Vite".
Et enfin, si vous êtes du genre à vouloir anticiper l'avenir, à être curieux de l'avenir de Vite, alors je crois que "Le futur de Vite" est fait pour vous.

-->

<!--

Mettre un timer pour faire le choix (qui est fake parce que ça ne va pas vraiment couper mais ça met un peu de pression et ça me permet de ne pas rester 107 ans sur la même slide)

-->

---
name: Les origines de Vite
group: Vite Core
timing: 0
choices:
  - Le fonctionnement de Vite
---

<!--

webpack to bundle everything (image, css, html, js) through a single pipeline but for every save, you bundle the entire app again (which is slow, and slower and slower as the app grows)

bad DX selon Evan You

2020, initialement pour Vue mais la v2 (en 17 février 2021) a été complètement réécrite pour être un build tool universel (compatible avec rollup et c'est ça le grand changement, avoir accès à tout l'écosystème de plugins rollup, game changer)
(et pour l'anecdote, la v1 n'a jamais vu le jour)

blazing fast 100ms instead of seconds (and whatever the size of the app)

-->

<!--

Mettre un gif low quality du documentaire de Vite en fond

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

serveur web simple, faire un schéma avec l'IA qui fait une requête, le serveur qui la reçoit, la traite et qui répond
(faire un schéma dynamique avec des éléments mouvants ?)

il sait ce qu'il doit faire en fonction du fichier demandé
le HMR fonctionne si bien et le démarrage est instant parce que le serveur ne bundle rien du tout

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

aspect stratégique avec VoidZero (attention à ne pas entrer dans la technique, c'est pour la fin du talk la technique)

Utilisation de Rolldown à la place d'Esbuild et Rollup (Rolldown est un drop-in replacement pour les deux, écrit en Rust
plus performant sur la vitesse, sur la consommation mémoire, et ça permet de n'avoir qu'un seul bundler pour le dev et le build, ce qui élimine les divergences de comportement entre les deux environnements)

Bundled by default grâce au gain de performance et possibilité d'avoir plus de fonctionnalités et d'optimisations

VoidZero avec Vite+ pour unifier les pratiques et fournir un outil tout en un pour les monorepos caching (superset de Vite) (avec tout l'ecosystem préconfiguré, gui inspector => write business logic instead of configuring tools)

https://viteplus.dev/

-->

---
name: Tout n'est que plugin - Choices
group: Feature Plugins
timing: 0
choices:
  - Du CSS importé dans un fichier TypeScript
  - Une image chargée dans un fichier TypeScript
  - import.meta.glob est une illusion
---

<!--

on l'a vu, le cœur est minimal à tel point que tout passe par des plugins. Pour une raison simple : cela garantit que votre système de plugins est correct ; avec suffisamment de puissance et de liberté, aucun plugin tiers n'a plus d'accès.

TODO: texte pour passer aux choix suivants

-->

---
name: Du CSS importé dans un fichier TypeScript
group: Feature Plugins
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

```ts [src/main.ts]
import './style.css'
```

<!--

1. **resolveId** : Identifie le fichier `style.css`
2. **load** : Lit le contenu CSS du disque
3. **transform** : Transforme le CSS en JavaScript qui :
   - Crée un élément `<style>` dans le `<head>`
   - Y injecte le CSS
   - Supporte le HMR pour mise à jour instantanée
4. Le navigateur reçoit du JavaScript pur

-->

<!--

TODO: faire un schéma dynamique du fonctionnement de Vite et montrer ce qu'il se passe... (et le reprendre à plusieurs endroits sur plusieurs slides)

faut le réfléchir lui, j'ai un doute sur comment le faire pour qu'il soit sympa visuellement et réutilisable

 -->

<!--

Alors ça [show the code block], ça ne choque plus personne, mais ça n'existe pas en JavaScript. C'est impossible d'importer du CSS dans un fichier JavaScript.

Dans les faits, le navigateur, quand il voit un `import`, il se moque pas mal de l'extension et il requête le module. Vite, lui, va s'apercevoir qu'il s'agit de CSS et le faire passer un plugin qui va transformer ce CSS en JavaScript pour l'injecter dans le `<head>` de votre page.

 -->

---
name: Une image chargée dans un fichier TypeScript
group: Feature Plugins
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

```ts
import img from './image.png' // Retourne l'URL publique
import imgRaw from './image.png?raw' // Contenu brut
import imgUrl from './image.png?url' // Explicitement l'URL
```

## Le plugin Asset gère plusieurs cas

- Par défaut : retourne le chemin public de l'asset
- En production : hash du fichier pour cache busting
- Petites images : peuvent être inline en base64
- Query parameters pour contrôle fin (`?url`, `?raw`, `?inline`)
- Optimisation automatique possible (compression, formats modernes)

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

```ts
const modules = import.meta.glob('./dir/*.js')
```

## Ce code est transformé en :

```ts
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
```

- Plugin `importMetaGlob` détecte ce pattern
- Scan du filesystem à la compilation
- Génération de code JavaScript standard
- **import.meta.glob n'existe pas dans le navigateur !**

---
name: Le pré-bundling avec Esbuild
group: Vite Core
timing: 0
choices:
  - Les entrailles d'un plugin Vite
---

<!--

Dans la slide, commencer par montrer la cascade de requêtes pour une grosse dépendance

Faire un exemple avec du CommonJS (require), throw une erreur
Uncaught SyntaxError: The requested module 'http://localhost:5173/@fs/home/esteban/dev/p/vitejs/vite/node_modules/.pnpm/react@19.2.4/node_modules/react/index.js?v=9bb1a453' doesn't provide an export named: 'default' main.js:1:144

Montrer le contenu du dossier `.vite/deps`

[Écrire (ou avoir un typewriter générique) `import React from 'react'` dans code block]

 -->

<!--

Tout fier d'avoir compris le fonctionnement de Vite, nous voilà avec l'envie d'importer une petite dépendance et quoi de mieux que React pour bien commencer ? Dans notre `main.js`, importons React [click] et ouvrons le navigateur. [click]

Rien ne s'affiche, mais dans la console, une erreur [click]. On y lit que le module demandé ne fournit pas d'export nommé 'default'. Alors on regarde la réponse de Vite [click] et là, c'est le drame. On y voit un `module.exports` et un `require`, du CommonJS, exactement ce que notre navigateur ne comprend pas.

Heureusement, Vite au démarrage va scanner les imports et convertir les dépendances CommonJS en ESM de tel sorte à ce que le navigateur puisse les lire. Ouf, on est sauvé !

Maintenant on a besoin de lodash, alors on l'install puis on l'importe. [click] Vous avez vu la cascade de requêtes dans l'onglet Réseau ? Plus de 600 requêtes pour récupérer tous les modules de lodash. C'est à cause d'un barrel file qui ré-exporte tous les modules de lodash. [click]

Heureusement, Vite lors de son scannage va automatiquement pré-bundler toutes les dépendances qu'il va trouver. Autrement dit, il va générer un unique fichier JavaScript pour chaque dépendance. [click] Et voilà, une unique requête pour charger lodash !

Pourquoi c'est important ? Pour les mêmes raisons qu'il est déconseillé de faire des n+1 à votre base de données. Le réseau ajoute une surcharge non négligeable et votre navigateur est limité à un nombre de requêtes simultanées. Plus vous faites de requêtes, plus votre application sera lente à démarrer. Et dans ce cas-là, on ne parle pas de quelques millisecondes, mais de secondes.

-->

---
name: Les entrailles d'un plugin Vite
group: Inside a Plugin
timing: 0
---

````md magic-move
```ts [my-plugin.ts]
export default function monPlugin() {
  return {
  }
}
```

```ts [my-plugin.ts]
export default function monPlugin() {
  return {
    resolveId(id) { },
    load(id) { },
    transform(code, id) { },
  }
}
```

```ts [my-plugin.ts]
export default function monPlugin() {
  return {
    name: 'mon-plugin',
    resolveId(id) { },
    load(id) { },
    transform(code, id) { },
  }
}
```
````

<!--

Rentrons dans le vif du sujet, parce que c'est quand même pour ça que vous êtes venu. Parlons des plugins Vite.

Avant tout, qu'est ce que c'est ? C'est un moyen d'étendre les fonctionnalités de Vite en se branchant dedans à différents moments de son cycle de vie.

Concrètement, c'est un objet [click] dans lequel on va définir des méthodes [click] qui vont être appelées par Vite, ni plus ni moins. On retrouve parmi les plus populaires `resolveId`, `load`, `transform`.

Et il ne faut pas oublier de donner un petit nom à son plugin [click], c'est important pour le retrouver quand il y a une erreur !

Voilà, vous venez de faire votre premier plugin Vite, félicitations !

-->

---
name:  Les entrailles d'un plugin Vite - Choices
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

TODO:

https://chatgpt.com/share/69a877a6-67bc-8011-abe6-4ac260fc2d1d

avoir d'un côté de la slide le code d'un plugin avec les 7 hooks (options, buildStart, resolveId, load, transform, buildEnd, closeBundle) et de l'autre côté, un workflow (avec une petit phrase) qui va évoluer à chaque click ?

vite en démarrant, comment par appeler le hook options pour start

les hooks buildEnd et closeBundle ne sont appelés qu'à la fermeture du processus, donc sur un ctrl+c ou à la fin d'un build

les 4 hooks dont je viens de parler ne sont appelé d'une seule fois, en revanche, résolveId, load et transform sont intégré dans la partie HTTP de Vite et appelé pour chacune des requêtes.

Autrement dit, si on prend un user agent qui fait une requête pour un module, la requête va arriver sur Vite qui va la passer au hook resolveId, puis dans load, puis dans transform avant de répondre au user agent, pour chacune des requêtes.

quelques subtilités quand même

- l'id, c'est le chemin absolue du module qui est demandé par le user agent
- ces trois hooks sont appelé pour tes les plugins dans l'ordre d'enregistrement donc si tu as 10 plugins, tu fais 10 fois le resolveId, 10 fois le load, 10 fois le transform pour chaque requête
- en vrai c'est faux. dès qu'un resolveId returne une valeur truthy, vite arrête la boucle et utilise ce nouvel identifiant comme identifiant du module, il va ensuite appeler boucler sur les load et comme pour le resolveId, le premier qui répond gagne, sans chercher à appeler celui des autres. En revanche, le transform lui, est appelé pour tous les modules

le résolveId permet de modifier l'id du module pour s'assurer que notre module va y répondre dans le load et dans le transform, éviter les interférences avec les autres plugins

(à voir comment on peut rendre ça visuel, un workflow c'est suffisant, brainstormer avec l'IA)

 -->

<!--

Maintenant que vous avez une meilleure idée de ce qu'est un plugin Vite, plongeons nous vraiment dans son fonctionnement. Que se passe-t-il quand vous faites `npm run dev` ?

reprendre avec plus de détails le fonctionnement d'une requête dans Vite

-->

---
name: resolveId
group: Inside a Plugin
timing: 0
---

```ts
resolveId(id: string, importer?: string, options?) {
  if (id === 'virtual:my-module') {
    return '\0virtual:my-module' // \0 = module virtuel
  }
  return null // Laisser d'autres plugins gérer
}
```

## Quand ?
- À chaque `import` rencontré dans le code

## Quoi ?
- Résoudre un identifiant de module vers un chemin absolu
- Créer des modules virtuels (préfixe `\0`)

## Exemples d'usage
- Alias de chemins
- Modules virtuels
- Redirections conditionnelles

---
name: load
group: Inside a Plugin
timing: 0
---

```ts
load(id: string) {
  if (id === '\0virtual:config') {
    return `export default ${JSON.stringify(config)}`
  }
  // Laisser le filesystem loader par défaut
  return null
}
```

## Quand ?
- Après `resolveId`, pour obtenir le contenu du module

## Quoi ?
- Charger le contenu source (code, JSON, etc.)
- Par défaut : lecture depuis le filesystem
- Pour modules virtuels : génération de code à la volée

## Retour possible
- String (le code)
- Objet `{ code: string, map?: SourceMap, ... }`

---
name: transform
group: Inside a Plugin
timing: 0
choices:
  - Des exemples concrets
---

```ts
transform(code: string, id: string) {
  if (!id.endsWith('.vue')) return null

  const result = compileSFC(code)
  return {
    code: result.code,
    map: result.map, // sourcemap
  }
}
```

## Quand ?
- Après `load`, pour transformer le code chargé

## Quoi ?
- Transpilation (TS → JS, Vue → JS, etc.)
- Injection de code
- Optimisations

## Info contexte disponible
- `options.ssr` : mode SSR ou client
- `this.environment` : environnement courant

---
name: Des exemples concrets - Choices
group: Concrete Examples
timing: 0
choices:
  - Vue Plugin
  - Auto Import Plugin (unplugin-auto-import)
---

<!--

On vient de voir, dans les grandes lignes, la théorie sur les plugins Vite.

Il est temps de passer à la pratique et de voir concrètement comment ça fonctionne avec des exemples de plugins populaires.

TODO: mettre la partie sélection de la partie suivante

-->

---
name: Vue Plugin
group: Concrete Examples
timing: 0
choices:
  - Visualiser la pipeline
---

<!-- ## @vitejs/plugin-vue

- **resolveId** : Gère les query params (`?vue&type=style`)
- **load** : Pour les requêtes de sous-parties (styles, scripts)
- **transform** : Compile les SFC (Single File Components)
  - Template → render function
  - `<script setup>` → JavaScript standard
  - `<style scoped>` → CSS avec hash unique
- **handleHotUpdate** : HMR granulaire par bloc (template vs script vs style)

## Pattern : plugin avec enforce
- Un plugin `pre` pour parser le SFC
- Un plugin `post` pour finaliser -->

<!-- TODO: réfléchir à comment montrer visuellement les différentes requêtes -->
<!--

Un visuel que je vois bien

à gauche, le user agent
à droite, vite

les requêtes sont envoyées d'un sens à l'autre avec dessous, le potentiel contenu de la requête (comme des codes blocks)
on peut en ajouter au fur et à mesure au click et ça pourrait cacher les blocks de code
avec à droite, les hooks du plugin qui sont appelés au fûr et à mesure

pourquoi ne pas faire une interface similair à Vite plugin inspect avec de temps à autre, une petit requête pour bien comprendre de quoi on parle (ou un truc qui zoom sur la request ...?)

 -->

<!--

Maintenant, passons à la pratique en regardant concrètement le fonctionnement du plugin Vite pour Vue.

Tout commence par le fichier `main.ts` qui importe le fichier `App.vue`. Vite reçoit la requête et la fait passer par la pipeline de plugins. Le hook `resolveId` du plugin va intercepter les requêtes contenant le query parameter `vue`. Ensuite, le load va lire le fichier `.vue` sur le disque et retourner son contenu et enfin, le hook `transform` va compiler les différentes parties du SFC en JavaScript standard que le navigateur peut comprendre.

et puis ensuite, en fonction des changements que vous faites dans votre composant, le plugin va être en mesure de faire du HMR granulaire, c'est à dire que si vous changez uniquement le template, seul le template sera recompilé et mis à jour dans le navigateur, sans toucher au script ou au style. C'est ça qui rend le développement avec Vite si rapide et agréable.

TODO:: mettre un exemple de avant/après ?

TODO: pour chacune des étapes qui ont pu être vu juste avant, il faut lier à du code concret pour expliquer comment le plugin vite s'inscrit dans un plugin vite

Et là, vous êtes sûrement en train de vous dire que c'est pratique de pouvoir visualiser la pipeline de de Vite et je suis bien d'accord avec vous... [click]

-->

---
name: Auto Import Plugin (unplugin-auto-import) - Exemple
group: Concrete Examples
timing: 0
---

```vue
<script lang="ts" setup>
const count = ref(0)

const double = computed(() => count.value * 2)

effect(() => {
  console.log(`Count: ${count.value}, Double: ${double.value}`)
})
</script>
```

<!-- TODO: layout avec la card en bas à gauche et le nom du plugin en haut à gauche -->
<!-- TODO: avoir un composant pour afficher le nom du plugin et un lien vers github -->

<!--

Excellent choix parce que ce plugin là, je l'adore. Concrètement, vous n'avez plus besoin d'importer quoi que ce soit, c'est automatique.

Par exemple, ce code-là, qui utilise la réactivité de Vue, fonctionne parfaitement alors qu'il n'y a aucun import. Pourquoi ? Tout simplement parce que le plugin va scanner votre code et automatiquement injecter les imports nécessaires. Le point essentiel, c'est que ce n'est pas de l'injection globale, c'est à la demande (on‑demand), donc il n'y a dans votre bundle que ce que vous utilisez vraiment.

Vous êtes sûrement en train de vous dire que c'est quand même un peu magique, tout ça ?

-->

---
name: Auto Import Plugin (unplugin-auto-import) - Visualisation
group: Concrete Examples
timing: 0
choices:
  - Visualiser la pipeline
---

<!-- TODO: visuel similaire à vite-plugin-inspect -->

<!--

Alors c'est vrai qu'on peut les confondre mais dans notre cas, aucun doute, c'est un plugin Vite.

Pour le vérifier, soulevons un le capot. Dans un premier temps, Vite va venir charger le fichier, puis il va scanner le code dans le hook transform et retourner le code transformé avec les imports injectés. On a ici la visualisation du côté on-demand de la manipulation.

Là, vous êtes sûrement en train de vous dire que c'est pratique de visualiser la pipeline de la sorte. Et ça tombe bien... [click]

-->

---
name: Un plugin pour virtualiser
group: Virtualization
timing: 0
choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icônes virtuelles
  - Infos Plugin - Des infos virtuelles
---

## Modules virtuels

- N'existent **pas sur le disque**
- Créés à la demande par un plugin
- Convention : préfixe `virtual:` pour l'utilisateur
- En interne : préfixe `\0` pour éviter la résolution du système de fichiers

## Pourquoi ?

- Injecter des configs build-time
- Générer du code depuis des métadonnées
- Créer des APIs type-safe
- Auto-découverte de fichiers (routes, composants...)

---
name: Vue Router - Un module virtuel
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## unplugin-vue-router

```ts
import { routes } from 'vue-router/auto-routes'
```

- Scan du dossier `src/pages/`
- Génère automatiquement les routes basées sur la structure fichiers
- `pages/users/[id].vue` → route `/users/:id`
- Module `virtual:generated-routes` créé dynamiquement
- **HMR** : mise à jour des routes quand les fichiers changent
- Type-safe avec TypeScript

## Pattern
- `resolveId` : détecter `vue-router/auto-routes`
- `load` : générer le code des routes

---
name: VitePress - Des data virtuels
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!-- ## VitePress Data Loaders

```ts
import { data } from './posts.data.js'
// data = résultat de la fonction data() exécutée au build
```

- Fichiers `.data.js` contiennent une fonction `export` `const` `data`
- Fonction exécutée **au build** (accès Node.js, filesystem, APIs...)
- Résultat sérialisé et injecté comme module virtuel
- Disponible côté client sans re-fetch
- Idéal pour : markdown metadata, API calls, etc.

## Avantage
- Build-time data fetching
- Pas de waterfall requests -->

<!--

dans VitePress, on peut faire ça et dessous, c'est de la virtualisation

parce qu'en plus simple, ça donnerait ça (exemple)

et ça peut permettre de récupérer des infos de git au moment du build
d'aller fetcher une api au build time...

chopper des listes, faire des traitements au build plutôt qu'au runtime

faut préciser les infos à chaque fois

 -->

---
name: Icons Plugin - Des icônes virtuelles
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## unplugin-icons

```ts
import IconAccessibility from '~icons/carbon/accessibility'
```

- Import **on-demand** d'icônes depuis Iconify
- Plus de 100,000 icônes de 100+ icon sets
- `~icons/{collection}/{icon}` est un module virtuel
- Le SVG est chargé et transformé en composant (Vue/React/Svelte...)
- **Tree-shaking** : seules les icônes utilisées sont bundlées

## Implémentation
- `resolveId` : match pattern `~icons/*`
- `load` : fetch SVG + transform en component

---
name: Infos Plugin - Des infos virtuelles
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--

TODO: bloc de code avec le plugin dans la configuration vite
TODO: bloc de code avec son utilisation dans le code
TODO: demonstration concrète avec un composant qui affiche les infos de la présentation (sha du dernier commit, date de build, etc.)

 -->

<!--

Imaginez que vous vouliez afficher ou simplement récupérer dans votre application le sha du dernier commit git, ou la date de build.

Comment est-ce que vous feriez ?

Un fichier de config que vous devez penser à mettre à jour à chaque fois que vous faites un build ? Pas très pratique et surtout, pas du tout automatisé.

Non, le mieux, c'est d'utiliser un plugin Vite

TODO: faire une second slide pour montrer comment ça fonctionne under the hood (faire le lien avec la slide d'avant sur la théorie de la virtualisation) (mettre un schéma qui explique tout ça)

-->

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
  - Nitro - Un backend
---

<!--

Vous souhaitez donc en savoir plus sur les plugins Vite et ses capacités avancées ? Vous êtes au bon endroit !

TODO: retravailler les différentes phrases
1. Le HMR (Hot Module Replacement) : comprendre comment Vite gère le hot reload de manière intelligente et performante, même pour les modules virtuels.
2. Le middleware - Un fichier virtuel : comment créer un middleware personnalisé dans Vite pour ajouter des routes API ou intercepter des requêtes.
3. Vue Router - Un module virtuel : comment le plugin de Vue Router génère dynamiquement un module de routes à partir de la structure de fichiers.
4. Run Plugin - Un plugin pour exécuter des commandes : comment créer un plugin qui exécute des commandes avant ou après le build, pour intégrer des outils externes.
5. Virtual Plugin - Un plugin pour virtualiser des modules : comment créer des modules virtuels pour injecter des données ou générer du code à la volée.
6. Laravel Vite - La communication inter-processus : comment le plugin Laravel Vite permet la communication entre le serveur PHP et le serveur Vite.
7. unplugin-macro - Un plugin pour créer des macros : comment créer des macros qui s'exécutent au build time pour optimiser le code ou générer du code.
8. Nitro - Un backend : comment utiliser Vite pour développer un backend avec Nitro, le framework de Nuxt pour les fonctions serverless.

Aujourd'hui, nous n'en verrons qu'un mais rendez-vous compte, les possibilités sont sans limite.

 -->

---
name: Le HMR (Hot Module Replacement)
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!-- ## Comment ça marche ?

1. Le watcher détecte un changement de fichier
2. Vite invalide le module correspondant dans le module graph
3. Hook **handleHotUpdate** appelé pour chaque plugin
4. Le plugin peut filtrer les modules à reload
5. WebSocket envoie un événement au navigateur
6. Le client HMR applique le patch sans full reload

```ts
handleHotUpdate({ file, modules, server }) {
  if (file.endsWith('.md')) {
    // Invalider aussi le module virtuel des routes
    const mod = server.moduleGraph.getModuleById('\0virtual:routes')
    return [...modules, mod]
  }
}
``` -->

<!--

TODO: faire un diagramme dynamique (dans le sens où il va s'afficher au fur et à mesure) où le user agent se connecte en websocket au server, quand un fichier change, Vite demande à ces fonctions ce qu'il doit en faire, tu peux l'invalider (son cache), et renvoyer une info au client pour lui dire ce qu'il doit faire et le client peut par la suite fetch à nouveau le module pour récupérer la nouvelle version du code. (hot module replacement, pas besoin de faire un full reload et ça permet de garder l'état de l'application et ça prend quelques dizaines de millisecondes au lieu de secondes)

et c'est super rapide parce que vite ne faisant pas de bundle, il est en mesure de n'invalider et de rechercher qu'un fichier spécifique dans le module graph

manipuler le handleHotUpdate pour comprendre ce qu'il se passe vraiment

 -->

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

<!-- ## configureServer hook

```ts
{
  name: 'my-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/hello') {
        res.end('Hello from Vite middleware!')
        return
      }
      next()
    })
  }
}
```

-->

<!--

TODO: mettre un code d'exemple pour visualiser de quoi on parler et puis c'est tout, parce que ça suffit pour illustrer le concept, on est dans un serveur web in-fine

 -->

<!--

Depuis le début, je ne vous parle que de la pipeline de plugins.

Sauf que Vite, c'est un serveur web, et qu'à travers les plugins, il est entièrement configurable. Il est notamment possible d'y ajouter des middlewares, soit pour modifier la requêtes, soit pour renvoyer une page custom.

Le plugin vite-plugin-inspect utilise cette technique pour vous permettre accéder à la page contenant toutes les informations sur la pipeline de Vite, page à `/__inspect/` et accessible uniquement en développement. Cette technique, elle est super pratique pour donner accès à des donnés, ou des pages pendant le développement.

On peut imaginer mocker une API pendant le développement avec un middleware, simuler la récupération d'un fichier qui contient les variables d'environment, ou même injecter un server web, comme le fait Nitro.

-->

---
name: Run Plugin - Un plugin pour exécuter des commandes
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

```ts
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    run([
      {
        name: 'generate ziggy types',
        run: ['php', 'artisan', 'ziggy:generate', '--types'],
        pattern: [/web.php$/, /api.php$/],
      },
      {
        name: 'generate wayfinder types',
        run: ['php', 'artisan', 'wayfinder:generate'],
        condition: file => file.includes('/app/'),
      }
    ]),
  ],
})
```

<!--

Avec Vite, il est possible de lancer des side effects nous permettant de nous simplifier la vie. `vite-plugin-run` en est le parfait exemple.

En fonction des fichiers que vous modifiez, vous pouvez lancer des commandes shell pour faire, ..., tout.

Là, par exemple, on se sert de ce plugin pour régénérer les types de nos routes Laravel à chaque fois que les routes changent. Plus besoin de le faire à la main.

-->

---
name: Virtual Plugin - Un plugin pour virtualiser des modules
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

```ts
import { defineConfig } from 'vite'
import virtual from 'vite-plugin-virtual'

export default defineConfig({
  plugins: [
    virtual({
      'virtual:git:commit': () => {
        const commit = execSync('git rev-parse HEAD').toString().trim()
        return `export default "${commit}"`
      },
      'virtual:api:data': async () => {
        const res = await fetch('https://api.example.com/data')
        const data = await res.json()
        return `export default ${JSON.stringify(data)}`
      },
    })
  ]
})
```

<!--

Avec Vite, il est possible de créer des modules virtuels, c'est à dire de renvoyer du code au navigateur qui n'existe pas sur le disque. La requêtes est interceptée avant que Vite ne tente de charger le fichier, et le plugin peut retourner du code à la volée.

Par exemple, on peut l'utiliser pour injecter des données au build time, comme un commit git, le résultat d'une API, une configuration particulière, etc.

Le truc, c'est que devoir faire à la main un plugin pour chaque module virtuel, ça peut vite devenir pénible, et vite-plugin-virtual est là pour ça. Rien à configurer, juste un mapping entre le nom du module virtuel et le code à retourner, et le tour est joué !

-->

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!-- TODO: refaire https://soubiran.dev/posts/laravel-and-vite-a-love-story-ruined-with-cross-origin#:~:text=Laravel%20and%20Vite%20integration,-This avec du code -->

<!--

Pour celui là, il faut que je vous donne un peu plus de contexte.

Laravel, c'est du PHP et Vite, c'est du Node.js, chacun tournant dans son propre processus. En développement, quand on demande une page, on fait une requête à Laravel qui nous renvoie la page avec les assets comme les fichiers JavaScript et le CSS renvoyant vers le serveur Vite. Mais comment est-ce que Laravel connaît l'adresse du serveur Vite ?

-->

---
name: Laravel Vite - La communication inter-processus - Le fichier hot
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

```ts
import fs from 'node:fs'
import { ResolvedConfig } from 'vite'

export default function laravel() {
  return [{
    name: 'laravel',
    enforce: 'post',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address()
        if (isAddressInfo(address)) {
          const viteDevServerUrl = resolveDevServerUrl(address, server.config)

          fs.writeFileSync('./public/hot', `${viteDevServerUrl}${server.config.base.replace(/\/$/, '')}`)
        }
      })
    }
  }]
}
```

<!--

Dans son plugin, Laravel demande à Vite d'écrire un fichier `hot` dans le dossier `public` avec l'adresse du serveur Vite.

Laravel peut alors lire le fichier `hot` et générer les bonnes URLs pour les assets. Malin !

-->

---
name: unplugin-macro - Un plugin pour créer des macros
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## unplugin-macros

```ts
import { $fetch } from './api.ts' with { type: 'macro' }

const users = $fetch('/api/users') // Exécuté au build!
```

- Les macros s'exécutent **au build time**, pas runtime
- Le résultat est inliné dans le code final
- Basé sur AST transformations
- Permet du "zero-runtime" code

## Use cases
- Fetch de données statiques
- Optimisations compile-time
- Code generation

---
name: Visualiser la pipeline
group: Concrete Examples
timing: 0
choices:
  - Dans les profondeurs de la pipeline
  - Un plugin pour virtualiser
  - Les autres capacités des plugins
---

<!-- TODO: animation d'introduction de vite-plugin-inspect du bas vers le haut en maxi lettre (spring effect) -->
<!-- TODO: voir si on peut le faire dans les slides -->

<!--

Parce qu'il existe un plugin permettant de visualiser l'ensemble de la pipeline de Vite.

Je l'utilise rarement mais c'est véritablement lui qui m'a permis de comprendre le fonctionnement et la philosophie de Vite.

 -->

---
name: Visualiser la pipeline - Choices
group: Concrete Examples
timing: 0
choices:
  - Dans les profondeurs de la pipeline
  - Un plugin pour virtualiser
  - Les autres capacités des plugins
---

<!--

Désormais, vous avez le pouvoir de visualiser la pipeline de Vite à moment, de la démystifier sur demande.

Avec ce grand pouvoir, arrive un nouveau choix:

1. Plonger dans les profondeurs de la pipeline comment Vite les appellent.
2. Découvrir comment créer un plugin pour virtualiser des modules.
3. Explorer les autres capacités des plugins Vite, comme le HMR, les middlewares, les macros, etc.

Attention, il n'y aura pas de retour en arrière possible, alors choisissez judicieusement !

-->

---
name: Dans les profondeurs de la pipeline
group: Deep Dive & Conclusion
timing: 0
---

## PluginContainer : le chef d'orchestre

```ts
class PluginContainer {
  async resolveId(id, importer) {
    for (const plugin of this.plugins) {
      const result = await plugin.resolveId?.(id, importer)
      if (result)
        return result
    }
  }
  // Pareil pour load, transform...
}
```

- Parcourt les plugins dans l'ordre
- Premier retour non-null = gagnant
- Context (`this`) injecté avec utilitaires
- `getSortedPluginsByHook()` gère l'ordre + enforce

<!--

creuser la manière dont les plugins sont appelés, dans quel ordre

 -->

---
name: Prendre en main l'ordre
group: Deep Dive & Conclusion
timing: 0
---

## La propriété `enforce`

```ts
{
  name: 'pre-plugin',
  enforce: 'pre', // Exécuté en premier
  transform(code) { /* ... */ }
},
{
  name: 'normal-plugin',
  // enforce non défini = ordre normal
},
{
  name: 'post-plugin',
  enforce: 'post', // Exécuté en dernier
}
```

## Ordre final : `pre` → plugins utilisateur → Vite core → `post`

- Exemple Vue : plugin `pre` parse le SFC, plugin `post` finalise

<!--

prendre l'exemple du plugin de Vue, avec un `pre` pour bosser sur le SFC et un `post` pour bosser sur le js, l'output

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

<!-- ## Le problème

- Chaque requête passe par **tous** les plugins
- Sans filtre, chaque hook de chaque plugin est appelé
- Ralentissement significatif sur gros projets

## La solution : filters

```ts
transform: {
  filter: { id: /\.vue$/ }, // Regex ou glob
  handler(code, id) { /* ... */ }
}
```

- Filtrage **avant** l'appel du hook
- `createFilter` de `@rollup/pluginutils`
- Filtres sur `id`, `code`, `moduleType`
- Performance critique !

-->

<!--

TODO: code avec d'abord un filtre à l'ancienne dans le plugin puis un shiki move avec un filtre via les filtres de Vite

similar to https://vite.dev/guide/api-plugin#hook-filters

TODO: ajouter une animation pour expliquer visuellement le passage de Rust à Node.js (je ne sais pas encore comment faire ça par contre)

request -> plugin 1 -> plugin 2 -> plugin 3 -> response

avec les filtres

request -> filter 1 -> filter 2 -> filter 3 -> response
              |          |            |
           plugin 1 -> plugin 2 -> plugin 3

et via une animation automatique, montrer un loading sur le plugin
pour la seconde partie, faire pareil mais montrer que si ça fonctionne, alors le plugin load ensuite, et si ça ne match pas, alors le plugin n'est même pas appelé et on passe au filtre suivant

animation d'une dizaine de secondes

(utiliser vue-flow pour faire ça ?)
 -->

<!--

Je vous ai un peu menti.

Pour filtrer les requêtes dans les hooks `resolveId`, `load` et `transform`, on peut utiliser un simple `if` et le tour est joué.

Si cette solution semble simple, elle est en réalité très inefficace parce qu'elle nécessite d'invoquer le hook pour chaque requête. Maintenant que le bundler est en Rust, ça introduit un overhead non négligeable.

Du coup, on peut extraire le filtrage en amont. Dans ce cas, on peut complètement by-passer le plugin pour les requêtes qui ne matchent pas le filtre et ça éviter de faire un aller-retour entre Rust et Node.js pour rien.

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

## Le problème actuel

- **Dev** : Esbuild (pré-bundling) + transformation à la volée
- **Build** : Rollup (bundling complet)
- Deux bundlers = deux comportements légèrement différents
- Certains plugins ne fonctionnent qu'en build (`apply: 'build'`)

## Rolldown : la solution

- Bundler unique écrit en Rust
- Compatible API Rollup
- Performances Esbuild
- **Un seul bundler pour dev et build**
- Élimination des divergences comportementales

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

## Ce qu'on a exploré ensemble

✅ Les fondamentaux de Vite (serveur dev + ES modules)
✅ Le système de plugins (resolveId → load → transform)
✅ Modules virtuels et leur magie
✅ Exemples concrets (Vue, auto-import, icons...)
✅ HMR et capabilities avancées
✅ Optimisation avec les filtres
✅ Le futur avec Rolldown

## Ce qu'on n'a pas eu le temps de voir

- Environment API (multi-runtimes)
- SSR avec ModuleRunner
- Plugin development best practices complètes
- Et tellement plus !

**Le chemin que VOUS avez choisi a façonné cette conférence !**

<!-- (revoir la fin, elle est pas ouf mais en même temps. on peut pas passer par tout donc faut se demander si tu as quand même les éléments intéressant ou non) -->

<!-- à la fin, avoir une slide qui montre exactement le chemin qu'on a fait ensemble pour dire qu'il y a encore beaucoup de choses à explorer -->

<!-- la fin est trop linéaire, c'est chiant -->

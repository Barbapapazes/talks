---
htmlAttrs:
  lang: fr
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: "#6C1EB9"
codeCopy: false
colorSchema: light
transition: fade-out
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: "Au cœur d’une pipeline : démystifions Vite et ses plugins"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,vite,plugins,pipeline
event: MiXiT
date: 16 avril 2026
chooseYourOwnAdventure: true
ready: true
timing: 0.2
---

<!-- TODO: regularly add QR code to access the Inalia voting page -->
<!-- TODO: explained visually should be used to explain the issue we are facing -->
<!-- TODO: handle false for images -->
<!-- TODO: maybe? remove confused and magic gif and rain -->
<!-- TODO: somehting about and what about the build after the first concrete example? -->

<!--
À lire pour comprendre la construction de ce talk.

Ce talk place l'audience au centre : ce sont les spectateur·rice·s qui choisissent le déroulé. Les choix du public déterminent les slides affichées.

Important : tous les chemins sont déjà écrits — il n'y a pas de création de contenu à la volée. La vue d'ensemble se trouve dans `.data/slides.graph.svg` (et `.data/slides.graph.txt` pour la version Mermaid) ; elle représente toutes les slides et leurs liens. Certaines boucles peuvent sembler exister, mais les participant·e·s ne peuvent pas visiter deux fois la même slide, sauf pour les slides de choix.

Ces fichiers sont générés à partir de ce fichier slides.md, qui contient l'ensemble des slides et les liens définis via la clé `choices` de chaque slide. Une slide sans clé `choices` est suivie automatiquement par la slide suivante dans l'ordre du fichier.

Le vote se fait via Inalia : la slide suivante sera celle qui aura obtenu le plus de voix.
-->

# Au cœur d’une pipeline:<br>démystifions Vite et ses plugins


<!--
Bonjour à tous !

J'espère que vous allez bien.

[wait]

Merci d'être venu aujourd'hui, c'est vraiment super chouette de vous voir aussi nombreux.
-->

---
name: Vite
group: Introduction
ready: true
timing: 0.8
layout: center-card
img:
  default: /vite-background.png
transition: slide-up
---

<img src="/vite-logo-color-dark.svg" />

::outside::

<ViteEcosystem />

<!--
[fast] Petit contexte rapide sur Vite

C'est un outil, c'est simple, il est présent partout. Prenez le nom d'un framework que vous connaissez, tant que ce nom n'est pas Next, il y a Vite dedans. [accelerate] [click] Utilisé par Angular, React, Vue, Nuxt, Astro, TanStack, bla bla bla et pleins d'autres, bref, on s'en fou

La question qu'est intéressante, c'est [slow] pourquoi Vite fait tant l'unanimité ? Ben parce que c'est un bundler pas comme les autres.
-->

---
name: Vite Growth
group: Introduction
ready: true
timing: 1.4
---

<GrowthChart />

<!--
[slow] Peut-être que bundler ça ne parle pas forcément à tout le monde, on va prendre le temps de détailler ça là

Peut-être que certains d'entre vous on entendu parler de [click] webpack, le bundler historique, qui a dominé le paysage pendant les 10 dernières années, et qui reste aujourd'hui encore très utilisé.

Mais on le voit là, juste là, à un moment donnée ça stagne alors même que le web a continué de progresser,

et ça, ça s'explique quand on regarde le reste. [accelerate] [click] Il est plus tout seul, y en a d'autres Vite, Rspack, Snowpack, SWC, bref, d'autres.
sauf qu'on voit que c'est Vite a pris le dessus

[slow] Pourquoi ? Est-ce une hype ? Une réalité ? Que se passe-t-il ?

Et bin ça tombe bien, on va prendre le temps d'en parler
-->

---
name: Slide Theme
group: Pre-talk
ready: true
timing: 2.4
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1615099833617-01e3d6dbe2e4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

<div class="flex flex-col gap-2 text-2xl font-bold">
  <div class="flex flex-row items-center gap-2">
    <span v-click="2">compiler</span> <span v-click="2" class="i-ph-arrow-right-bold inline-block forward:delay-100"></span> <span v-click="1" class="forward:delay-100">executable</span>
  </div>
  <div class="flex flex-row items-center gap-2">
    <span v-click="3">bundler</span> <span v-click="4" class="i-ph-arrow-right-bold inline-block forward:delay-100"></span> <span v-click="4" class="forward:delay-100">bundle</span>
  </div>
</div>

::outside::

<ChooseThemeOverlay />

<!--
Je m'appelle Estéban, je suis ingénieur logiciel chez Takima.

J'ai une confidence à vous faire, je suis addict au front, j'ai découvert Vite, y quelques années et j'ai eu envie de vous partager en 45 minutes un concentré de tout ça.

[pause]

[fast] J'ai un autre truc à vous dire, aujourd'hui, heu, p'tit nouveauté, [slow] je vais vous laisser le contrôle complet du talk, [accelerate] alors attention, quand je dis complet, c'est pas tout, c'est, c'est les trucs les plus importantes, c'est à dire qu'en faite, [slow] vous allez pouvoir choisir le thème de cette conférence.

Aller c'est parti, on y va, j'vous en dit pas plus [never ending sentence]

[play waiting music] [wait]

[never stop] Vous pouvez prendre votre téléphone, et puis flasher le QR code, je vous laisse à vous connecter, prendre le temps de regarder un peu la plateforme, et puis bon, pendant que vous vous connectez, on va commencer.

[slow] Je vous l'avez promis. C'est quoi un bundler ?

On a l'habitude de démarrer une application avec un executable, executable produit avec un compilateur. Et ben dans le web, c'est pareil.
On a un bundler qui va produire un bundle qui permet de démarrer votre application web depuis un navigateur.

Du coup, on peut vraiment voir le bundler comme un compilateur, et le bundle comme l'exécutable du web.

Okk, vous commencez à arriver, trop chouette.

Et trop bien, on a compris ce qu'était un bundler.
-->

---
name: How Vite Works
group: Vite Core
ready: true
timing: 0.9
layout: ai
---

<ViteExplainedWithAI
  user-prompt="I'm new in the web dev world. What is Vite and how does it work?"
/>

<!--
Maintenant, bin, il nous faut comprendre Vite.

En 2026 [pause], [slow] est-ce qu'on ne demanderait pas à l'IA de nous le présenter ?

[accelerate] Allez, on lui demande. [enter] "Je suis nouveau dans le monde du développement web, qu'est-ce que Vite et comment est-ce que ça fonctionne ?"

[enter] Elle regarde sur internet, elle réfléchie, etttttt voilà ! Elle répond...?? [disillusion]

C'est long. c'est trop long. [fast] et moi bah, j'ai que 45 minutes et j'ai vraiment envie de vous transmettre un concentré doooncc là, c'est pas possible.
-->

---
name: Vite in a Nutshell
group: Vite Core
ready: true
timing: 0.8
layout: center-card
img:
  default: /vite-background.png
clicks: 5
---

<ViteOverview />

::outside::

<ViteEcosystem class="opacity-30" without-clicks />

<!--
[slow] Du coup, bin voici les trucs les plus importants à retenir sur Vite.

[impact]
- [click] C'est un serveur web, requête, réponse, HTTP, tout ça
- [click] Il est basé sur les modules ECMAScript, import et export
- [click] Il transforme les fichiers à la demande
- [click] Et il est entièrement extensible via des plugins

[click] [pause]

Bah voilà, vous avez tout!

[pause eau]

Mais heuu, est-ce qu'on rendrait pas ça un peu plus visuel.
-->

---
name: How Vite Works - Visualization
group: Vite Core
ready: true
timing: 2.3
layout: full
---

<ViteExplainedVisually />

<!--
[slow] [click] À gauche, un navigateur, [click] à droite, des fichiers. C'est juste le starter Vite, Vue et TypeScript, rien d'extravaguant. [fast] Eh heu quand je dis à gauche à droite, c'est heu sur la slide parce qu'en vrai, c'est sur votre machine tout ça hein.

[slow] Entre les deux, on place [fast] rapidement [slow] [click] Vite. [fast] Et puis bon bin, le navigateur, il fait des [click] requêtes HTTP vers Vite, il va [click] lire le système de fichier et il va renvoyer l'information.

Pour la suite, je vous propose qu'on se place dans la navigateur et qu'on intercepte [click] ensemble les requêtes HTTP. [click]

[accelerate]
[open index.html]
Au départ, on demande la document, Vite renvoie le fichier index.html avec le client Vite et main.ts.
Ensuite, le navigateur charge main.ts. On y voit un fichier CSS, Vue et notre app, que le navigateur charge évidemment aussi.

[open style.css] Regardons le ficher CSS. Ah tiens, Vite renvoie du JavaScript pour le CSS, on y retrouve quand même là, juste là notre CSS, c'est étonnant mais pourquoi pas.

[open App.vue] Et le fichier Vue alors ? Ah, ok, tiens, encore du JavaScript. Pourtant c'était bien du Vue dans le fichier du starter.

Maiiis bref peut importe..., on investiguera ça plus tard.

[enthusiastic] Ce qui compte maintenant, c'est qu'on ait une bonne vision du fonctionnement de Vite.
-->

---
name: Everything Is a Plugin
group: Feature Plugins
ready: true
timing: 2
layout: image
img:
  default: /vite-background.png
chooseNextSlide: true
inalia:
  questionId: 2
---

<EverythingIsAPlugin />

<!--
[whispers] Bon, par contre, j'ai un petit secret à vous dire. [small pause] Ça reste en vous et moi hein?

[slow] Dans Vite [pause], toutes les fonctionnalités [pause], sont des plugins. [pause] Toutes ! [click]

[whispers] Et ça, mmmh, c'est vraiment bien parce que ça veut dire que, bah, que, qu'on peut faire tout ce qu'on veut quand on crée un plugin.

Ça m'fait penser, on va explorer l'un d'entre eux après, et vous avez la possibilité de choisir lequel. [show qr code]

- Gestion des pages HTML ? On peut !
- Support natif du JSX ? C'est intégré !
- Gestion du CSS ? C'est fait aussi !
- Les assets statiques ? C'est no brainer, ça s'occupe même du hash !
- L'import de JSON dans un fichier ? Facile, c'est géré !
- Les glob imports ? Oui, ça fonctionne !
- Les imports dynamiques ? Vous vous en doutez, c'est built-in !
- Et puis, le WebAssembly et les Web Workers, pas besoin de s'en soucier, Vite le gère aussi !

Breeeef, tout est possible. Mais surtout surtout surtout, le point à retenir, de tout ça, ce ne sont que des plugins.
-->

---
name: Everything Is a Plugin - Choices
group: Feature Plugins
ready: true
timing: 0.1
choices:
  - CSS Imported into a TypeScript File
  - An Image Loaded in a TypeScript File
  - JSX Loaded Naturally
layout: choices
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1613901282632-bf2ad28d2369?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
inalia:
  questionId: 2
---

<!--
Ooooh [pause], très intéressant comme choix.

Et bin c'est parti, explorons <choix> !
-->

---
name: CSS Imported into a TypeScript File
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts
import './style.css'
```

::outside::

<ClickRevealImage src="/css-is-js.png" />

<!--
[enthusiastic] Nan oui, oui, alors ça, faut qu'on en parle !

[slow] JavaScript, il autorise pas d'importer du CSS. Pourtant, on le fait et ça marche !

Pourquoi ? Parce que l'navigateur, il s'fout de l'extension. Tant que tu lui renvois du JavaScript, il est ok.

[shocked] [click] Mais ? Ça veut dire qu'on lui renvoie du JavaScript ?
-->

---
name: CSS Imported into a TypeScript File - Visualization
group: Feature Plugins
ready: true
timing: 0.9
choices:
  - Vite and Its Features - Recap
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

<BackgroundImage />

<CssImportedIntoATypeScriptFile class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur. On va y observer les requêtes et les réponses.

On y r'trouve notre index.html. Ce document, il charge l'index.ts. L'index.ts, lui, importe notre style.css.

[impressed] Ooooh, whaaaoo ! Y a plus de CSS là. Heureusement parce que notre navigateur, il aurait pas su quoi en faire.

[slow] Si on fouille un peu, qu'on cherche là dans le fichier, on y retrouve notre CSS. Tout le reste, c'est de la transformation à la volée par Vite.
-->

---
name: An Image Loaded in a TypeScript File
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts
import img from './image.png'
```

::outside::

<ClickRevealImage src="/img-is-js.png" />

<!--
[enthusiastic] Nan oui, oui, alors ça, faut qu'on en parle aussi !

[slow] JavaScript, il autorise pas d'importer des images. Pourtant, on le fait et ça marche !

Pourquoi ? Parce que l'navigateur, il s'fout de l'extension. Tant que tu lui renvois du JavaScript, c'est ok.

[shocked] Mais ? Ça veut dire qu'on lui renvoie du JavaScript ?
-->

---
name: An Image Loaded in a TypeScript File - Visualization
group: Feature Plugins
ready: true
timing: 0.9
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

<BackgroundImage />

<AnImageLoadedInATypeScriptFile class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur pour y observer les requêtes et les réponses.

On y r'trouve notre index.html qui charge main.ts qui lui-même charge notre image.

[impressed] Ooooh, whaaoo ! Il n'y a pas d'image là. Heureusement parce que notre navigateur, il n'aurait pas su quoi en faire.

[slow] Automatiquement, Vite va répondre à cet import en récupérant le chemin de l'image et en générant un module JavaScript qui exporte l'URL de l'image.
-->

---
name: An Image Loaded in a TypeScript File - Build
group: Feature Plugins
ready: true
timing: 0.3
choices:
  - Vite and Its Features - Recap
layout: bottom-right-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

<AnImageLoadedInATypeScriptFileBuildTree />

<!--
Au build, Vite va inliner les images de moins de 4ko pour réduire le nombre de requêtes et ajouter un hash dans le nom des autres pour facilement invalider les caches.
-->

---
name: JSX Loaded Naturally
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```tsx {6-10}{lines:true}
import { createRoot } from 'react-dom/client'
import { Item } from './Item'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Item name="Item 1" price={10} />
      <Item name="Item 2" price={20} />
    </div>
  )
}

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
```

::outside::

<ClickRevealImage src="/jsx-is-js.png" />

<!--
[enthusiastic] Nan, oui, oui, alors ça, faut qu'on en parle aussi !

[slow] JavaScript, il autorise pas d'importer du JSX. Pourtant, on le fait et ça marche !

Pourquoi ? Parce que l'navigateur, il s'fout de l'extension. Tant que tu lui renvois du JavaScript, c'est ok.

[shocked] Mais ? Ça veut dire qu'on lui renvoie du JavaScript ?
-->

---
name: JSX Loaded Naturally - Visualization
group: Feature Plugins
ready: true
timing: 0.8
choices:
  - Vite and Its Features - Recap
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

<BackgroundImage />

<JSXLoadedNaturally class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur pour y observer les requêtes et les réponses.

On y r'trouve notre index.html qui charge main.jsx.

[impressed] Ooooh, whaaoo ! Il n'y a pas de JSX là. Heureusement parce que notre navigateur, il n'aurait pas su quoi en faire.

[slow] Automatiquement, Vite va répondre à cet import en transformant le JSX en JavaScript standard que le navigateur peut comprendre.

Il fait la même chose sur item.jsx !
-->

---
name: Vite and Its Features - Recap
ready: true
timing: 1.2
layout: recap
inalia:
  emoji: false
---

<RecapList
  title="Vite in 3 Points"
  :items="[
    {
      title: 'A web server for development',
      description: 'It handles requests that can be transformed on demand'
    },
    {
      title: 'A bundler for production',
      description: 'It transforms our code for production'
    },
    {
      title: 'A plugin system',
      description: 'To extend its features and make it do whatever we want'
    }
  ]"
/>

<!--
[slow] Ok, je vous propose qu'on se fasse un petit récap parce que ça commence à faire beaucoup.

Donc...

Vite c'est [click] trois choses :
1. [click] un serveur web pour le développement où on fait transiter des requêtes qu'on transformera à la volée
2. [click] un bundler, à la webpack, qui va transformer notre code pour la production
3. [click] et un système de plugins, pour étendre ses fonctionnalités et lui faire faire tout ce qu'on veut.

Trop bien ! [confetti] Troooop bien ! C'est qu'on commence à en savoir pleins des choses !

[doubtful] Mais ? [pause] Il y a un point qu'on a pas abordé. Ça veut dire quoi "lui faire faire tout ce qu'on veut" ?
-->

---
name: Inside a Vite Plugin - Common Hooks
group: Inside a Plugin
ready: true
timing: 1.1
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

<v-click>

````md magic-move
```ts {*}{lines:true}
export default function myPlugin() {
  return {
  }
}
```
```ts {3}{lines:true}
export default function myPlugin() {
  return {
    name: 'my-plugin',
  }
}
```
```ts {4-6|*}{lines:true}
export default function myPlugin() {
  return {
    name: 'my-plugin',
    resolveId() {},
    load() {},
    transform() {},
  }
}
```
````

</v-click>

<!--
Ce que je vous propose, c'est qu'on se build notre premier plugin Vite.

[slow] [click] Un plugin, c'est une fonction qui return un objet.

Et puis bah, comme on aime bien donner un petit nom aux choses, [click] on donne un petit nom au plugin.

Ensuite, [click] on a 3 méthodes, hooks qu'on peut utiliser pour agir sur chaque requests.

1. resolveId
2. load
3. transform

[pause] [click]

[enthusiastic] Et voilà, vous venez de faire votre premier plugin. Félicitations.

[doubtful] Mais heuu, okk, mais il fait rien du tout là notre plugin ??

Ouais, clairement, et le plus simple, c'est qu'on se plonge dans les hooks pour comprendre comment les utiliser.
-->

---
name: resolveId
group: Inside a Plugin
ready: true
timing: 0.7
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts {4-8}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    resolveId(id) { // /src/components/HelloWorld.vue
      if (id.endsWith('.vue')) {
        return id
      }
    },
  }
}
```

<!--
Premier hook : resolveId et le plus perturbant.

[slow] Ce qu'il nous permet de faire, c'est récupérer l'identifiant d'un module et de le retourner ou d'en retourner un nouveau.

Là, si l'identifiant termine par .vue, on le retourne.

C'est tout. C'est tout ce qu'il fait.

[reassuring] Si ça vous semble flou, ou d'un intérêt très limité, c'est normal. On ne panique pas, c'est toujours l'effet qu'il fait la première fois.
-->

---
name: load
group: Inside a Plugin
ready: true
timing: 0.8
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

````md magic-move
```ts {6-8}{lines:true}
import { readFile } from 'node:fs/promises'

export function myPlugin() {
  return {
    name: 'my-plugin',
    async load(id) { // /src/components/HelloWorld.vue
      return await readFile(id, 'utf-8')
    }
  },
}
```
```ts {4-7}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    async load(id) { // /content.md
      return await fetch(`https://api.example.com/modules/${id}`)
        .then(res => res.text())
    }
  },
}
```
```ts {4-6}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    async load() {
      return "export default 'Hello World'"
    }
  },
}
```
````

<!--
Second hook : load

Lui, permet de passer de l'identifiant d'un module à son contenu.

[fast] Alors, bah, là on le voit, on va lire le fichier sur le disque. [slow] C'est d'ailleurs le comportement par défaut de Vite.

Mais, [click] qu'est ce qui nous empêche de le charger depuis une API ?

Ou plus zinzin encore, [click] de retourner un fichier qui n'existe pas ?

Rien du tout ! Ces 3 comportements sont parfaitement valides !
-->

---
name: transform
group: Inside a Plugin
ready: true
timing: 0.6
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

````md magic-move
```ts {4-6}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      return code.replace('foo', 'bar')
    }
  },
}
```
```ts {4-8}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        return transformSFC(code, filename)
      }
    }
  },
}
```
````

<!--
tranform, ensuite !

Il prend le contenu et l'identifiant d'un module et il permetttttt... de transformer le contenu !

Cas simple, on remplace tous les "foo" par des "bar".

[click] Cas plus complexe, on transforme les fichiers Vue en JavaScript.

[enthusiastic] Okkk, j'crois qu'on a tout, là on a vraiment de quoi faire des choses concrètes !
-->

---
name: Multiple Plugins
group: Inside a Plugin
ready: true
timing: 0.4
layout: center
---

<h2 class="text-4xl font-bold">Multiple plugins?</h2>

<!--
[doubtful] Heuuu, ah ouais nan quand même, comment on fait, comment, comment on gère s'il y a plusieurs plugins ?

[thinking]

Bah, le mieux qu'on regarde ensemble ? On fait ça depuis la pipeline de Vite ?
-->

---
name: Inside a Vite Plugin - Visualization
group: Inside a Plugin
ready: true
timing: 1.9
class: p-0!
---

<VitePluginsTheory />

<!--
[enthusiastic] Aller, go !

[slow] C'est la pipeline de Vite, avec deux plugins. Y'aaa, nos différents hooks, en haut, on reçoit la request du navigateur, en bas, on renvoie la réponse.

Pour chaque hook, le système va itérer sur chacun des plugins et nous, on va regarder [click] l'input et l'output de chaque plugin.

ok, imaginons, on est une petite request pour le fichier App.vue.

On arrive ici. On rentre dans resolveId, on rencontre VuePlugin, en input, il a bien l'ID de notre fichier et en output, on renvoie ce même identifiant. Du coup, Vite va complètement skip les autres plugins.

Ensuite, on arrive sur load où on va passer de l'identifiant du module à son contenu. VuePlugin load le fichier depuis le disque et CustomPlugin se fait skip, une fois de plus, le pauvre.

On finit par transform où VuePlugin transforme le fichier Vue en JavaScript pour le navigateur puis CustomPlugin reçoit cette transformation pour y appliquer d'autres modifications.

Et enfin, on renvoie ce code là au navigateur.

Ok, plus clair Estéban. Merci !

Alors ça, c'est très chouette comme visualisation mais c'est dans mes slides.
-->

---
name: Visualizing the Pipeline
group: Inside a Plugin
ready: true
timing: 0.5
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

<BackgroundImage />

<Card v-click absolute top-14 inset-x-10 -bottom-10>
  <h2 class="text-center mb-2 text-neutral-700 flex flex-row items-center justify-center gap-2"><span class="i-vscode-icons-file-type-npm inline-block size-5"></span>vite-plugin-inspect</h2>
  <iframe src="/__inspect" class="rounded-lg overflow-hidden w-full h-full" />
</Card>

<!--
J'ai encore mieux pour vous.

Il existe un [click] plugin Vite vite-plugin-inspect qui peut se mettre dans n'importe quel project Vite et qui permet de visualiser la pipeline, les différents hooks appelé et les différentes transformations des plugins sur vos fichiers.

[examples with a .vue and .css file]
-->

---
name: Inside a Vite Plugin - Lifecycle Hooks
group: Inside a Plugin
ready: true
timing: 1.3
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {3}{lines:true}
export default function myPlugin() {
  return {
    name: 'my-plugin',
  }
}
```
```ts {4-6}{lines:true}
export default function myPlugin() {
  return {
    name: 'my-plugin',
    config(config) {
      config.root = 'src'
    },
  }
}
```
```ts {2,8-10}{lines:true}
export default function myPlugin() {
  let config = null
  return {
    name: 'my-plugin',
    config(config) {
      config.root = 'src'
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
  }
}
```
```ts {11-13}{lines:true}
export default function myPlugin() {
  let config = null
  return {
    name: 'my-plugin',
    config(config) {
      config.root = 'src'
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async buildStart() {
      await scanDir(config.root)
    },
  }
}
```
```ts {11-16}{lines:true}
export default function myPlugin() {
  let config = null
  return {
    name: 'my-plugin',
    config(config) {
      config.root = 'src'
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async buildStart() {
      await scanDir(config.root)
    },
    async buildEnd() {
      await generateSitemap(config)
    },
  }
}
```
````

<!--
Oui

[fast] Jusqu'ici, on a vu les hooks liés à la gestion et la transformation à la volée des requests mais il y en a pour s'intégrer directement dans le cycle de vie de Vite.

On a le hook [click] config, appelé juste avant que la configuration soit résolue. C'est le bon moment pour ajuster la configuration.

Une fois qu'elle est résolue, [click] le hook configResolved est appelé, essentiel pour récupérer la configuration de Vite et l'utiliser plus tard.

Ensuite, [click] buildStart, appelé au moment où Vite démarre et [click] buildEnd, appelé quand Vite s'arrête. Dans le premier on va y faire des pré-traitement pour préparer le terrain et dans le second, on va utiliser pour faire des effets de bord, comme générer un sitemap.
-->

---
name: In Practice?
group: Concrete Example
ready: true
timing: 0.6
layout: center-card
img:
  default: >-
    https://images.unsplash.com/photo-1631106254201-ffbee2305c5b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<h2 class="text-4xl font-bold">So what does<br>that look like?</h2>

<!--
Mais concrètement, ça donne quoi quand on met tout ça ensemble ?

Qu'est-ce qu'on peut construire ? Parce que ben là, j'ai un peu l'impression qu'on est devant une boite de Lego mais qu'on nous a pas filé la notice. Comment qu'on fait ?

Du coup, ce que je vous propose, c'est qu'on se build des p'tits plugins Vite.
-->

---
name: Simple Transform Plugin
group: Concrete Example
ready: true
timing: 0.2
layout: center
---

<h2 class="text-4xl font-bold">Simple Transform Plugin</h2>

<!--
Le premier, c'est simple transform plugin.

Alors, qu'est-ce qui va nous permettre de faire ?
-->

---
name: Simple Transform Plugin - Visualization
group: Concrete Example
ready: true
timing: 0.5
---

<SimpleTransformPluginExplainedVisually />

<!--
Pour bien comprendre, je vous propose qu'on [click] reprennent notre visualisation.

Dans le fichier main.ts, on va trouver ce code avec une constant build time. L'objectif c'est de la remplacer avec la date de build.

[click]
[click]

Concrètement, c'est pouvoir passer ce ça, à ça.

Et pour le faire, on va développer un plugin.
-->

---
name: Simple Transform Plugin - Internals
group: Concrete Example
ready: true
timing: 0.4
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=1359&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: >-
    https://images.unsplash.com/photo-1471696035578-3d8c78d99684?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts {*}{lines:true}
export default function simpleTransform() {
  return {
    name: "simple-transform",
  }
}
```
```ts {4-6|*}{lines:true}
export default function simpleTransform() {
  return {
    name: "simple-transform",
    transform(code) {
      return code.replace("__BUILD_TIME__", new Date().toString())
    }
  }
}
```
````

<!--
Notre plugin, il commence par un petit nom.

Ensuite, on va [click] utiliser le hook transform pour remplacer la string build time par la date.

Avec ça, le navigateur va recevoir le fichier comme on l'a vu juste avant.
-->

---
name: External Markdown Loader Plugin
group: Concrete Example
ready: true
timing: 0.1
layout: center
---

<h2 class="text-4xl font-bold">External Markdown Loader</h2>

<!--
Pour le second plugin, on va faire un plugin de chargement de Markdown.
-->

---
name: External Markdown Loader Plugin - Visualization
group: Concrete Example
ready: true
timing: 0.6
---

<ExternalMarkdownLoaderPluginExplainedVisually />

<!--
Pour bien comprendre, on va [click] reprendre notre visualisation.

Dans le fichier main.ts, on charge de l'HTML depuis un import daily-news.md. Ce fichier, il n'existe pas sur le disque.

[click] [click]

Pourtant, si on se penche sur les logs HTTP, on le voit et il contient bien de l'HTML. Ça, c'est grâce au plugin qu'on va développer.
-->

---
name: External Markdown Loader Plugin - Internals
group: Concrete Example
ready: true
timing: 0.6
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1609083590460-7b8cc0ca65f8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: >-
    https://images.unsplash.com/photo-1447875569765-2b3db822bec9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts {*}{lines:true}
export default function externalMarkdown() {
  return {
    name: "external-markdown",
  }
}
```
```ts {4-10}{lines:true}
export default function externalMarkdown() {
  return {
    name: "external-markdown",
    async load(id) { // /src/daily-news.md
      if (!id.endsWidth(".md"))
        return

      return fetch(`https://api.example.com/${id}`).then(res => res.text())
    },
  }
}
```
```ts {4,15-21|*}{lines:true}
import markdownit from 'markdown-it'

export default function externalMarkdown() {
  const md = markdownit()

  return {
    name: "external-markdown",
    async load(id) { // /src/daily-news.md
      if (!id.endsWidth(".md"))
        return

      return fetch(`https://api.example.com/${id}`).then(res => res.text())
    },
    async transform(code, id) {
      if (!id.endsWidth(".md"))
        return

      return `const html = "${md.render(code)}"\n\nexport default html`
    }
  }
}
```
````

<!--
Tout commence par cette function qui retourne un objet avec un nom.

[click] On commence par utiliser le hook load pour charger le contenu du fichier Markdown depuis une API.

[click] Ensuite, on utilise le hook transform pour convertir le Markdown en HTML via markdown-it et pour exporter ce HTML en tant que module JavaScript.
-->

---
name: The Vite Plugin - Recap
ready: true
timing: 0.7
layout: recap
inalia:
  emoji: false
---

<RecapList
  title="The Vite Plugin in 3 Points"
  :items="[
    {
      title: 'A Vite plugin is a function that returns an object',
      description: 'That object must at least have a name property'
    },
    {
      title: 'There are 3 main hooks to act on modules',
      description: 'resolveId, load, and transform'
    },
    {
      title: 'There are also hooks for Vite\'s lifecycle',
      description: 'config, configResolved, buildStart, buildEnd, and closeBundle'
    }
  ]"
/>

<!--
[slow] Ok, là, on vient de voir du concret, [click] on va se faire un petit récap.

[click] Un plugin Vite, c'est une fonction qui retourne un objet.

[click] Y a 3 hooks principaux pour agir sur les modules : resolveId, load et transform. Le plus utilisé, globalement, c'est transform.

[click] Et puis, on a pleins de hooks pour se brancher sur l'ensemble du cycle de vite de Vite.
-->

---
name: The Vite Plugin - 3 Hooks Recap
ready: true
timing: 1.2
layout: recap
inalia:
  emoji: false
---

<Card class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

```ts {*|4-6|7-9|10-12|*}{lines:true}
export default function myPlugin() {
  return {
    name: "my-plugin",
    resolveId(id) {
      // Used to intercept the module identifier and return a new one
    },
    load(id) {
      // Used to return the content of a module given its identifier
    }
    transform(code, id) {
      // Used to transform the content of a module given its identifier
    }
  }
}
```

</Card>

<!--

La structure d'un plugin Vite, elle ressemble à ça. Une fonction qui retourne un objet avec un nom et les 3 hooks principaux.

1. resolveId, pour intercepter l'identifiant d'un module et en retourner un nouveau
2. load, pour retourner le contenu d'un module à partir de son identifiant
3. transform, pour transformer le contenu d'un module à partir de son identifiant

[pause]

Génial ! [confetti] On commence à faire nos premiers plugins. Franchement, si on nous avait dit ça il y a quelques dizaines de minutes, j'aurais pas cru !

[pause]

[intrigued] D'ailleurs, on a dit que le hook load pouvait retourner du code qui n'existe pas. Mais, hmmm, qu'est-ce que ça veut dire ?
-->

---
name: A Plugin for Virtualization - Intro
group: Virtualization
ready: true
timing: 0.1
layout: center
---

<h2 class="text-4xl font-bold">A Plugin for Virtualization</h2>

<!--
Ça veut dire qu'on peut virtualiser des modules.
-->

---
name: A Plugin for Virtualization
group: Virtualization
ready: true
timing: 1.5
---

<VirtualizationExplainedVisually />

<!--
[fast] Pour comprendre ça ensemble, reprenons [click] notre visualisation, à gauche le navigateur, à droite les fichiers et au milieu, Vite, si on regarde main.ts, on y découvre un import vers 'virtual:my-module'. Pourtant [slow] c'est pas un fichier du projet, c'est pas non plus une dépendance [open package.json].

[strange] Mais du coup, ça vient d'où ?

[fast] Pour le savoir, on peut regarder les [click] logs du navigateur [click].

index.html, main.ts avec hooo, il y a eu un changement dans le nom de l'import, et notre module qui semble être un fichier JavaScript.

[questioning] Vraiment, j'comprends pas d'où il vient ? Est-ce qu'il viendrait de Vite ? Et que Vite serait capable de répondre à des requests avec du code arbitraire, des modules qui n'existent pas, qui serait inventés, générés de toute pièce ?

Ça serait fou ?! Ça serait assez dingue !

[pause]

Et c'est le cas.
-->

---
name: A Plugin for Virtualization - Mind Blowing
group: Virtualization
ready: true
timing: 0.4
layout: mind-blowing-rain
---

<img src="/mind-blowing.gif" class="absolute h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

<!--
[with gesture of mind-blown] Ça s'est le moment où j'ai compris que Vite peut faire ça, répondre à des requêtes avec des modules qui n'existent pas......

[slow] Mais, ça nous explique pas comment ça fonctionne.

On se plonge dedans ?
-->

---
name: A Plugin for Virtualization - Plugin Internals
group: Virtualization
ready: true
timing: 1.3
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1767482061466-0b4cd8958c86?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
inalia:
  questionId: 3
---

````md magic-move
```ts {*|3}{lines:true}
export default function myVirtualModulePlugin() {
  return {
    name: 'my-virtual-module-plugin',
  }
}
```
```ts {2,3,7-11}{lines:true}
export default function myVirtualModulePlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-virtual-module-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
  }
}
```
```ts {12-16|*}{lines:true}
export default function myVirtualModulePlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-virtual-module-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = "from virtual module"`
      }
    },
  }
}
```
````

<!--
[important] Dans la suite, on va rentrer en profondeur dans un example concret avec un plugin qui utilise cette technique là, tu peux déjà choisir lequel.

Mais pour nous, maintenant, là, tout commence par un plugin, [click] avec son petit nom là, il est tout mignon.

Dans [click] le hook resolveId, on intercepte l'identifiant de notre module virtuel et on le préfixe avec un \0 pour le marquer comme virtuel.

Ensuite, beh, dans [click] le hook load, quand on rencontre notre identifiant, on retourne une string qui contient le code de notre module, au lieu, finalement, de lire un fichier sur le disque.

[click]

Le truc, beh, c'est que c'est un peu pénible à écrire à chaque fois, mais, heuu, heureusement pour nous, il existe vite-plugin-virtual.
-->

---
name: A Plugin for Virtualization - Virtual Plugin
group: Virtualization
ready: true
timing: 0.9
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1767482061466-0b4cd8958c86?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
inalia:
  questionId: 3
---

````md magic-move
```ts {2,6}{lines:true}
import { defineConfig } from 'vite'
import virtual from 'vite-plugin-virtual'

export default defineConfig({
  plugins: [
    virtual()
  ]
})
```
```ts {7-10}{lines:true}
import { defineConfig } from 'vite'
import virtual from 'vite-plugin-virtual'

export default defineConfig({
  plugins: [
    virtual({
      'virtual:git:commit': () => {
        const commit = execSync('git rev-parse HEAD').toString().trim()
        return `export default "${commit}"`
      },
    })
  ]
})
```
```ts {11-15}{lines:true}
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
````

<!--
Dans la suite, on va explorer un vrai plugin et vous avez la possibilité, de choisir lequel.

Pour utiliser le plugin, c'est super simple. On l'installe, et ensuite, ça s'utilise comme un dictionnaire.

La clé, c'est le nom du module virtuel et la valeur, c'est le code.

Et du coup, beh, beh on peut très simplement [click] avoir accès au dernier commit git, [click] ou même faire une request vers une API pour injecter au build time des data.

[enthusiastic] C'est beau, c'est simple ! On adore !
-->

---
name: A Plugin for Virtualization - Choices
group: Virtualization
timing: 0.1
choices:
  - Vue Router - A Virtual Module
  - VitePress - Virtual Data
  - Icons Plugin - Virtual Icons
  - Info Plugin - Virtual Information
layout: choices
inalia:
  questionId: 3
---

<!--
Ok. Ok, j'aime beaucoup ce choix !

Aller, plongeons nous dedans !
-->

---
name: Vue Router - A Virtual Module
group: Virtualization
ready: true
timing: 0.4
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts {*|3}{lines:true}
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
```

<!--
Vue Router, le router officiel de Vue.js, génère automatiquement les routes en suivant la structure du dossier `src/pages`.

La ligne intéressante, [click] c'est la 3 et je vous propose qu'on se plonge dans le plugin qui permet ce comportement pour comprendre pourquoi !
-->

---
name: Vue Router - A Virtual Module - Plugin Internals
group: Virtualization
ready: true
timing: 0.7
choices:
  - Virtualization - Recap
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {*|3}{lines:true}
export default function autoRoutes() {
  return {
    name: 'auto-routes',
  }
}
```
```ts {4-7}{lines:true}
export default function autoRoutes() {
  return {
    name: 'auto-routes',
    resolveId(id) {
      if (id === 'vue-router/auto-routes') {
        return '\0vue-router/auto-routes'
      }
    },
  },
}
```
```ts {11-17|*}{lines:true}
import fs from 'node:fs/promises'

export default function autoRoutes() {
  return {
    name: 'auto-routes',
    resolveId(id) {
      if (id === 'vue-router/auto-routes') {
        return '\0vue-router/auto-routes'
      }
    },
    load(id) {
      if (id === '\0vue-router/auto-routes') {
        const files = await fs.readdir('./src/pages')
        const routes = await generateRoutes(files)
        return `export const routes = ${JSON.stringify(routes)}`
      }
    },
  }
}
```
````

<!--
Comme tous les plugins, tout commence par un objet avec [click] un nom.

[click] Le hook resolveId intercepte l'import de vue-router/auto-routes et le préfixe avec \0 pour indiquer que c'est un module virtuel.

[click] Ensuite, le hook load s'occupe de la génération des routes et de créer le code JavaScript qui exporte ces routes.

[click] C'est un plugin avec module virtuel par excellence. Une bonne inspiration si vous avez besoin de créer le votre.
-->

---
name: VitePress - Virtual Data
group: Virtualization
ready: true
timing: 0.9
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1750017675871-76518031b2e1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts {*}{lines:true}
// example.data.js
export default {
  load() {
    return {
      hello: 'world'
    }
  }
}
```

```vue {3,7}{lines:true}
<!-- example.vue -->
<script setup>
import { data } from './example.data.js'
</script>

<pre>
{{ data.hello }} <!-- "world" -->
</pre>
```

<!--
VitePress, c'est le générateur de documentation de Vue.js et il a cette fonctionnalité intéressante de pouvoir injecter des données dynamiques dans la documentation au moment du build.

Ici, on a un fichier `example.data.js` qui exporte une fonction `load` qui retourne des données. Ensuite, dans notre composant Vue, on importe ces données et on peut les utiliser dans notre template.

Le point à remarquer, c'est qu'on exporte pas l'objet data alors qu'on l'utilise dans le composant.

Je vous propose qu'on se plonge dans le plugin pour comprendre pourquoi !
-->

---
name: VitePress - Virtual Data - Plugin Internals
group: Virtualization
ready: true
timing: 0.8
choices:
  - Virtualization - Recap
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1750017675871-76518031b2e1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {*|6}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'data-plugin',
    },
  ],
})
```
```ts {7-11}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'data-plugin',
      resolveId(id) {
        if (id.endsWith('.data.js')) {
          return `\0${id}`
        }
      },
    },
  ],
})
```
```ts {12-18|*}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'data-plugin',
      resolveId(id) {
        if (id.endsWith('.data.js')) {
          return `\0${id}`
        }
      },
      async load(id) {
        if (id.startsWith('\0') && id.endsWith('.data.js')) {
          const dataLoader = await import(id.slice(1))
          const data = await dataLoader.default.load()
          return `export default ${JSON.stringify(data)}`
        }
      },
    },
  ],
})
```
````

<!--
Comme tous les plugins, tout commence par un objet avec [click] un nom.

[click] Le hook resolveId intercepte les imports de fichiers `.data.js` et les préfixe avec \0 pour indiquer que ce sont des modules virtuels.

[click] Ensuite, le hook load s'occupe d'exécuter le data loader, de récupérer les données et de créer le code JavaScript qui exporte ces données.

[click] C'est un plugin avec module virtuel par excellence. Une bonne inspiration si vous avez besoin de créer le votre.
-->

---
name: Icons Plugin - Virtual Icons
group: Virtualization
ready: true
timing: 0.5
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```vue {*|2,7}{lines:true}
<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
</script>

<template>
  <IconAccessibility />
  <IconAccountBox style="font-size: 2em; color: red" />
</template>
```

<IconsPlugin class="mt-4" />

<!--
Ah les icônes dans les applications, quel sujet !

[click] Le point intéressant ici c'est la ligne 2. L'import commence par un tilde alors qu'il n'existe aucun module commençant par un tilde sur npm

Je vous propose qu'on se plonge dans le plugin qui permet ce comportement pour comprendre.
-->

---
name: Icons Plugin - Virtual Icons - Plugin Internals
group: Virtualization
ready: true
timing: 0.8
choices:
  - Virtualization - Recap
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {*|6}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'icons',
    },
  ],
})
```
```ts {7-11}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'icons',
      resolveId(id) {
        if (id.startsWith('~icons/')) {
          return '\0' + id
        }
      },
    },
  ],
})
```
```ts {13-19}{lines:true}
import { defineConfig } from 'vite'
import { loadIcon } from 'iconify'

export default defineConfig({
  plugins: [
    {
      name: 'icons',
      resolveId(id) {
        if (id.startsWith('~icons/')) {
          return '\0' + id
        }
      },
      async load(id) {
        if (id.startsWith('\0~icons/')) {
          const iconName = id.slice(7)
          const svg = await loadIcon(iconName)
          return `export default ${JSON.stringify(svg)}`
        }
      },
    },
  ],
})
```
````

<!--
Comme tous les plugins, tout commence par un objet avec [click] un nom.

[click] Le hook resolveId intercepte les imports commençant par `~icons/` et les préfixe avec `\0` pour indiquer que ce sont des modules virtuels.

[click] Ensuite, le hook load utilise la fonction `loadIcon` d'Iconify pour charger l'icône demandée et retourne le code JavaScript qui exporte le SVG de l'icône.

[click] C'est un plugin avec modules virtuels par excellence. Une bonne inspiration si vous avez besoin de créer le votre.
-->

---
name: Info Plugin - Virtual Information
group: Virtualization
ready: true
timing: 0.6
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1663725143572-158403ee3c06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts {*}{lines:true}
import { sha } from '~build/info'
import now from '~build/time'

console.log(`Build ${sha} at ${now}`)
```

<InfoPlugin class="mt-4" />

<!--
Récupérer des informations de build dans son application, c'est un besoin assez courant. On peut imaginer vouloir afficher la dernière version, le dernier commit, ou juste même la dernière date de build.

Alors, c'est vrai que, on peut le faire à la main, mais c'est pas très pratique, et justement, un plugin Vite pourrait nous aider.

On part à sa découverte ?
-->

---
name: Info Plugin - Virtual Information - Plugin Internals
group: Virtualization
ready: true
timing: 1.1
choices:
  - Virtualization - Recap
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1663725143572-158403ee3c06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {*|6}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'build-info',
    },
  ],
})
```
```ts {7-11}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'build-info',
      resolveId(id) {
        if (id === '~build/time') {
          return '\0~build/time'
        }
      },
    },
  ],
})
```
```ts {12-16}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'build-info',
      resolveId(id) {
        if (id === '~build/time') {
          return '\0~build/time'
        }
      },
      load(id) {
        if (id === '\0~build/time') {
          return `export default ${JSON.stringify(new Date().toISOString())}`
        }
      },
    },
  ],
})
```
```ts {17-20|*}{lines:true}
import { execSync } from 'child_process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'build-info',
      resolveId(id) {
        if (id === '~build/time' || id === '~build/git') {
          return '\0' + id
        }
      },
      load(id) {
        if (id === '\0~build/time') {
          return `export default ${JSON.stringify(new Date().toISOString())}`
        }
        if (id === '\0~build/git') {
          const sha = execSync('git rev-parse HEAD').toString().trim()
          return `export default ${JSON.stringify(sha)}`
        }
      },
    },
  ],
})
```
````

<!--
Comme tous les plugins, tout commence par un objet avec [click] un nom.

[click] Le hook resolveId intercepte les imports de `~build/time` et `~build/git` et les préfixe avec `\0` pour indiquer que ce sont des modules virtuels.

[click] Ensuite, le hook load s'occupe d'exécuter du code pour récupérer les informations demandées et de créer le code JavaScript qui exporte ces informations.

[click] De la même manière qu'on vient de le faire pour la date, on peut le faire pour git et en vrai, pour tout ce qu'on veut.

[click] C'est un plugin avec modules virtuels par excellence. Une bonne inspiration si vous avez besoin de créer le votre.
-->

---
name: Virtualization - Recap
timing: 0
layout: recap
inalia:
  emoji: false
---

<Card class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">

```ts
export default function myVirtualModulePlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'my-virtual-module-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        // Do whatever you want
      }
    },
  }
}
```

</Card>

<!-- TODO: text -->

---
name: Other Plugin Capabilities
group: Advanced Capabilities
timing: 0.7
layout: image
img:
  default: /vite-background.png
chooseNextSlide: true
inalia:
  questionId: 4
---

<!-- TODO: more time on this slides to make sure every one really understands -->

<OtherPluginCapabilities />

<!--
On a vu différents hooks, pour agir sur les modules, se brancher sur le cycle de vie de Vite, on a vu la virtualisation, un petit example. Ce que je vous propose, c'est qu'on se plonge concrètement dans les diverses capacités des plugins.

Ça m'fait penser, on va explorer l'une d'entre elles en profondeur, et vous avez la possibilité de choisir laquelle. [show qr code]

TODO: explain the different plugin capabilities
-->

---
name: Other Plugin Capabilities - Choices
group: Advanced Capabilities
timing: 0.1
choices:
  - Hot Module Replacement (HMR)
  - Middleware - A Virtual File
  - Run Plugin - A Plugin for Running Commands
  - Laravel Vite - Inter-process Communication
  - unplugin-macro - A Plugin for Creating Macros
  - Nitro - A Backend
layout: choices
inalia:
  questionId: 4
---


<!--
Ok, excellent choix, explorons ça !
-->

---
name: Hot Module Replacement (HMR)
group: Advanced Capabilities
ready: true
timing: 0.5
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

<BackgroundImage />

<HmrExplainedVisually class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Le Hot Module Replacement, ça permet en développement de mettre à jour sa page sans la recharger et c'est l'une des grandes forces de Vite.

Pour notifier le client, une connexion websocket est crée entre Vite et le browser. [click] [click] C'est elle que l'on voit là [show websocket connexion].
-->

---
name: Hot Module Replacement (HMR) - Plugin Internals
group: Advanced Capabilities
ready: true
timing: 0.6
choices:
  - It was always the same pipeline
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {3}{lines:true}
export default function myHmrPlugin() {
  return {
    name: 'my-hmr-plugin',
  }
}
```
```ts {4}{lines:true}
export default function myHmrPlugin() {
  return {
    name: 'my-hmr-plugin',
    handleHotUpdate(ctx) {},
  }
}
```
```ts {5-11}{lines:true}
export default function myHmrPlugin() {
  return {
    name: 'my-hmr-plugin',
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx
      if (file.endsWith('.myext')) {
        const mod = server.moduleGraph.getModuleById(file)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
        }
      }
    },
  }
}
```
````

<!--
Tout commence par un plugin, avec un petit nom. Il est tout mignon.

Ensuite, [click] pour jouer avec le HMR dans un plugin, on peut utiliser le hook handleHotUpdate.

[click] Il va nous permettre d'intercepter les modifications des fichiers et de décider quoi faire : invalider des modules, en renvoyer d'autres, ou même déclencher un rechargement complet si nécessaire.
-->

---
name: Middleware - A Virtual File
group: Advanced Capabilities
ready: true
timing: 0.7
choices:
  - It was always the same pipeline
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1721052921257-f1ec18f80e0f?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {2}{lines:true}
{
  name: 'my-middleware',
}
```
```ts {3}{lines:true}
{
  name: 'my-middleware',
  configureServer(server) { }
}
```
```ts {4}{lines:true}
{
  name: 'my-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => { })
  }
}
```
```ts {4-10}{lines:true}
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
```ts {5-9}{lines:true}
import sirv from 'sirv'

{
  name: 'vite-plugin-inspect',
  configureServer(server) {
    server.middlewares.use(`${base}/__inspect`, sirv(DIR_CLIENT, {
      single: true,
      dev: true,
    }))
  }
}
```
````

<!--
Vite, au fond, c'est un serveur web.

Du coup, beh, on peut se brancher dedans pour intercepter les requêtes, modifier les réponses ou injecter des nouvelles pages.

Pour ça, on va utiliser le [click] hook configureServer, [click] ajouter un middleware et [click] se faire une petite API [fast] rapidement. Attention tout de même, c'est uniquement disponible en développement.

D'ailleurs, [click] c'est cette technique qu'utilise vite-plugin-inspect pour servir une app dans votre app.
-->

---
name: Run Plugin - A Plugin for Running Commands
group: Advanced Capabilities
ready: true
timing: 1
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1714548213572-7943d5fd3528?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

````md magic-move
```ts {*}{lines:true}
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [],
})
```
```ts {6}{lines:true}
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    run(),
  ],
})
```
```ts {7-11}{lines:true}
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    run([
      {
        name: 'generate ziggy types',
        run: ['php', 'artisan', 'ziggy:generate', '--types'],
        pattern: [/web.php$/, /api.php$/],
      }
    ]),
  ],
})
```
````

<!--
Vite utilise un watcher pour détecter les changements de fichiers.

Et, avec un plugin, on peut se brancher dessus pour déclencher des side-effects. Pour ça, [click] beh, vite-plugin-run est très pratique.

On lui donne un petit nom, parce que, bah, c'est toujours plus sympa, puis on lui dit la commande à exécuter et les fichiers qui vont la trigger. Là par example, [click] on s'en sert pour générer des types TypeScript en fonction de routes PHP. On pourrait le faire à la main, mais là, c'est automatique.

[enthusiastic] C'est chouette quand même non ?! [curious] Mais comment ça marche ?
-->

---
name: Run Plugin - A Plugin for Running Commands - Plugin Internals
group: Advanced Capabilities
ready: true
timing: 0.4
choices:
  - It was always the same pipeline
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1714548213572-7943d5fd3528?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {9}{lines:true}
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vite-plugin-run',
      handleHotUpdate({ file }) { }
    }
  ]
})
```
```ts {8-12}{lines:true}
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vite-plugin-run',
      handleHotUpdate({ file }) {
        if (/web\.php$/.test(file)) {
          execSync('php artisan ziggy:generate --types')
        }
      }
    }
  ]
})
```
````

<!--
Sous la capot, ça utilise le hook handleHotUpdate. [click] À chaque fois qu'un fichier change, le hook est appelé et si ça match le pattern, la commande est exécutée.

Ça fait gagner tellement de temps, trop malin comme technique !
-->

---
name: Laravel Vite - Inter-process Communication
group: Advanced Capabilities
ready: true
timing: 0.4
transition: slide-up
---

<CommunicationLaravelVite class="w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<!--
Un peu de context.

Vite et Laravel tournent dans deux process différents. Du coup, quand on demande une page, la request part vers Laravel puis les assets pointent vers Vite.

Mais du coup, comment est-ce que Laravel connaît l'adresse de Vite ?
-->

---
name: Laravel Vite - Inter-process Communication - Plugin Internals
group: Advanced Capabilities
ready: true
timing: 0.6
choices:
  - It was always the same pipeline
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1662237693451-b484fb67c8dc?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {2-4}{lines:true}
export default function laravel() {
  return {
    name: 'vite-plugin-laravel',
  }
}
```
```ts {7-9}{lines:true}
export default function laravel() {
  return {
    name: 'vite-plugin-laravel',
    configureServer(server) {
      server.httpServer?.once('listening', () => { })
    }
  }
}
```
```ts {6-8}{lines:true}
export default function laravel() {
  return {
    name: 'vite-plugin-laravel',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address()
        if (isAddressInfo(address)) {
          const viteDevServerUrl = resolveDevServerUrl(address, server.config)
        }
      })
    }
  }
}
```
```ts {12}{lines:true}
import fs from 'node:fs'

export default function laravel() {
  return {
    name: 'vite-plugin-laravel',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address()
        if (isAddressInfo(address)) {
          const viteDevServerUrl = resolveDevServerUrl(address, server.config)

          fs.writeFileSync('./public/hot', `${viteDevServerUrl}${server.config.base.replace(/\/$/, '')}`)
        }
      })
    }
  }
}
```
````

<!--
Tout commence par un plugin, avec un petit nom. Il est tout mignon.

Ensuite, [click] on ajoute un callback qui se déclenche au moment où Vite comment à écouter des requêtes.

[click] Ça nous permet de récupérer l'adresse du serveur, [click] pour l'écrire dans un fichier.

Laravel viendra le lire pour ajuster le path vers les assets.
-->

---
name: unplugin-macro - A Plugin for Creating Macros
group: Advanced Capabilities
ready: true
timing: 0.4
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1760224254103-3dcc15e4ad9d?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
transition: slide-up
---

```ts
export function getRandom() {
  return Math.random()
}
export const buildTime = Date.now()
```

```ts
import { buildTime, getRandom } from './macros' with { type: 'macro' }

getRandom()
buildTime
```

<!--
Une macro c'est un morceau de code qui est exécuté au moment de la compilation pour être remplacé par son résultat.

En JavaScript, ça n'existe pas mais c'est un comportement que l'on peut reproduire avec un plugin Vite.
-->

---
name: unplugin-macro - A Plugin for Creating Macros - Plugin Internals
group: Advanced Capabilities
ready: true
timing: 0.5
choices:
  - It was always the same pipeline
layout: center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1760224254103-3dcc15e4ad9d?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {5-7}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'unplugin-macro',
    }
  ]
})
```
```ts {7}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'macro',
      async transform(code, id) {}
    }
  ]
})
```
```ts {9-10}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'macro',
      async transform(code, id) {
        if (id.endsWith('.ts')) {
          const program = babelParse(code)
          const macros = collectMacro(program)
        }
      }
    }
  ]
})
```
```ts {12-15}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'macro',
      async transform(code, id) {
        if (id.endsWith('.ts')) {
          const program = babelParse(code)
          const macros = collectMacro(program)

          for (macro of macros) {
            const result = await executeMacro(macro)
            code = replaceMacroWithResult(code, macro, result)
          }

          return code
        }
      }
    }
  ]
})
```
````

<!--
Tout commence par un plugin, avec un petit nom.

Ensuite, [click] on utilise le hook transform pour récupérer le code du module. [click] On le parse, on cherche les macros et pour chacune d'elles, [click] on l'exécute et on remplace son code par le résultat de son exécution.

Pas mal non ?!
-->

---
name: Nitro - A Backend
group: Advanced Capabilities
ready: true
timing: 0.3
layout: center
---

<h2 class="text-4xl font-bold">Nitro as a Backend</h2>

<!--
Vite, c'est trop fort pour le frontend.

Du coup, beh, y'en a qui c'sont dit, et pourquoi ça pourrait pas aussi faire du backend ?!
-->

---
name: Nitro - A Backend - Visualization
group: Advanced Capabilities
ready: true
timing: 0.4
---

<NitroABackend class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<!--
L'idée avec Nitro, c'est de [click] partir du navigateur, [click] faire une request à Vite, [click] forwarder la request à [click] Nitro qui la traite, puis [click] renvoyer la réponse à Vite qui la renvoie au navigateur.

Pas mal non ?
-->

---
name: Nitro - A Backend - Plugin Internals
group: Advanced Capabilities
ready: true
timing: 0.5
choices:
  - It was always the same pipeline
layout: bottom-center-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1698044047367-17eb43a7fd34?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {5-7}{lines:true}
import { createContext, createNitro } from 'nitro'

export default defineConfig({
  plugins: [(() => {
    return {
      name: 'nitro',
    }
  })()]
})
```
```ts {5-14}{lines:true}
export default defineConfig({
  plugins: [(() => {
    return {
      name: 'nitro',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (isNitroRequest(req.url)) {
            nitroDevMiddleware(req, res, next)
          }
          else {
            next()
          }
        })
      }
    }
  })()]
})
```
````

<!--
Tout commence avec un plugin et son petit nom.

Ensuite, il vient se brancher dans le hook [click] configureServer pour ajouter un middleware qui va forwarder les requêtes vers Nitro. Nitro la traite et renvoie la réponse.

C'est une technique tellement élégante pour ajouter un backend, c'est chouette.
-->

---
name: It was always the same pipeline
ready: true
timing: 1.5
inalia:
  emoji: false
---

<ItWasAlwaysTheSamePipeline />

<!--
[slow] Depuis le début, on a vu plein d'exemples différents : du CSS, du JSX, des modules virtuels, du HMR, des middlewares, des macros, voire même du backend.

[click]

Mais en réalité, on parle toujours de la même machine.

[click]

À gauche, le navigateur fait une requête, ou bien un changement de fichier déclenche un événement. [click] Cette information entre dans la pipeline de Vite.

[click]

Et ensuite, on retrouve toujours les mêmes grandes étapes :

- resolveId pour intercepter ou rediriger un module,
- load pour lire un fichier, charger des données ou générer du code,
- transform pour convertir le tout en JavaScript exploitable par le navigateur.

[click]

Et autour de cette pipeline, on a tous les autres super-pouvoirs : le HMR, les middlewares, les side-effects, l'intégration avec d'autres outils.

[slow]

Donc peu importe l'exemple qu'on a croisé aujourd'hui, depuis le début, on explorait toujours la même pipeline.
-->

---
name: Final Recap - List
ready: true
timing: 1.3
layout: recap
transition: slide-up
inalia:
  emoji: false
---

<RecapList
  title="What to Keep in Mind"
  :items="[
    {
      title: 'A pipeline between your files and the browser',
      description: 'Each request goes through Vite, which can transform modules on demand'
    },
    {
      title: 'Plugins can create modules that do not exist',
      description: 'Virtual modules, routes, icons, build info... everything can be generated on demand'
    },
    {
      title: 'Everything can be extended by a plugin',
      description: 'Code transformation, HMR, middlewares, side effects, macros, backend...'
    }
  ]"
/>

<!--
[enthusiatic] Okkkk, on en a fait du chemin depuis le début !

[slow] On a découvert Vite, sa pipeline et ses plugins, en 45 minutes seulement.

Qu'est-ce [click] qu'on garde en tête de tout ça ?

1. [click] Vite, c'est une pipeline de traitement entre les fichiers et le navigateur. Chaque module peut être transformé à la demande.
2. [click] Il est possible de créer des modules qui n'existe pas. C'est une technique essentielle et sa simplicité de mise en oeuvre fait la force de Vite.
3. [click] Vite est entièrement extensible. À partir du moment où il y a Vite dans votre projet, tout peut devenir un plugin. Votre imagination est votre seule limite.

Avec tout ça, vous masterisez Vite comme des chefs [confetti].
-->

---
name: Final Recap - Code
ready: true
timing: 1.2
layout: recap
inalia:
  emoji: false
---

<Card class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">

````md magic-move
```ts {3-7}{lines:true}
export default defineConfig({
  plugins: [
    (() => {
      return {
        name: 'my-awesome-plugin',
      }
    })()
  ]
})
```
```ts {6-8}{lines:true}
export default defineConfig({
  plugins: [
    (() => {
      return {
        name: 'my-awesome-plugin',
        resolveId(id) {}, // if you want to create virtual modules
        load(id) {}, // if you want to create virtual modules
        transform(code, id) {}, // if you want to transform modules
      }
    })()
  ]
})
```
```ts {9-11|*}{lines:true}
export default defineConfig({
  plugins: [
    (() => {
      return {
        name: 'my-awesome-plugin',
        resolveId(id) {}, // if you want to create virtual modules
        load(id) {}, // if you want to create virtual modules
        transform(code, id) {}, // if you want to transform modules
        handleHotUpdate(ctx) {}, // if you want to handle HMR
        configureServer(server) {}, // if you want to do something to the dev server
        // ... and many more hooks for different capabilities
      }
    })()
  ]
})
```
````

</Card>

<!--
D'un point de vue code, un plugin Vite, c'est un objet avec un nom et des hooks. Les hooks sont optionnels, vous n'avez pas besoin de tous les implémenter pour faire un super plugin.

Pour agir sur une requête, on a à disposition:

1. resolveId
2. load
3. transform

Et puis il est possible de trigger des side-effects avec handleHotUpdate ou carrément se brancher dans le serveur web avec configureServer.

Et on a même pleins d'autres hooks pour se brancher dans le cycle de vie de Vite, faire des optimisations, jouer avec la configuration, etc.

Bref, tout est extensible, c'est super puissant.

Avec tout ça, vous avez toutes les clés pour construire vos propres plugins Vite !
-->

---
name: Deep Inside the Pipeline
group: Deep Dive
ready: true
timing: 1.4
layout: bottom-left-card
img:
  brutalism: false
  default: >-
    https://images.unsplash.com/photo-1632260260864-caf7fde5ec36?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  flowers: null
---

````md magic-move
```ts {6,9,12}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vue-plugin',
    },
    {
      name: 'custom-plugin',
    },
    {
      name: 'another-plugin',
    },
  ]
})
```
```ts {6,9,10,13,14}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vue-plugin',
    },
    {
      name: 'custom-plugin',
      enforce: 'post',
    },
    {
      name: 'another-plugin',
      enforce: 'pre',
    },
  ]
})
```
```ts {6,7,10-12,15-17}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      // Second
      name: 'vue-plugin',
    },
    {
      // Last
      name: 'custom-plugin',
      enforce: 'post',
    },
    {
      // First
      name: 'another-plugin',
      enforce: 'pre',
    },
  ]
})
```
```ts {6,7,10,11,14,15}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vue-plugin',
      transform(code, id) {}
    },
  ]
})
```
```ts {7-11}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vue-plugin',
      transform(code, id) {
        if (!id.endsWith('.vue')) {
          return
        }
      }
    },
  ]
})
```
```ts {7-10}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vue-plugin',
      transform: {
        filter: /\.vue$/,
        handler(code, id) {}
      }
    },
  ]
})
```
````

<!--
[slow] Pour ceux qui voudrait aller plus loin, j'ai deux petits trucs pour à vous partager.

[enthusiastic] Premier truc !

[fast] Vite exécute nos plugins dans l'ordre de déclaration. Mais on peut jouer dessus avec l'option enforce. [click] pre pour forcer le plugin au début et post pour forcer le plugin à la fin de la pipeline. Dans l'example là, [click] Vite va exécuter another-plugin, vue-plugin et enfin custom-plugin.

[enthusiastic] Second truc !

[fast] [click] Vite exécute tous les hooks les un après les autres. Si vous ne voulez pas que votre plugin intervienne dans une étape, le filtrage se fait [click] dans le hook mais votre hook est quand même exécuté. Ça pose problème avec Rolldown à cause de l'overhead entre Rust et Node.js. Pour contourner ça, on peut extraire [click] les filtres et notre hook n'est appelé que s'ils matchent.
-->

---
name: Your Turn
ready: true
timing: 0.5
layout: keep-in-mind
confettiClicks: 1
---

In <span class="text-primary">45 minutes</span>, you discovered<br>what you need to build<br><span class="text-primary">your Vite plugin</span>.

::outside::

<img v-click src="/good-job.gif" class="absolute left-10 bottom-10 w-50" />
<img v-after src="/good-job.gif" class="absolute right-10 bottom-10 w-50" />

<!--
Compréhension de Vite, de sa pipeline, transformation de modules sur demande et la génération de modules virtuels, exploration de l'écosystème, c'est qu'on en a fait des choses.

Finalement, en 45 minutes, on a découvert le nécessaire pour réaliser notre plugin Vite.

[pause]

[click] Sincèrement, vous pouvez être fière de vous ! Bravo !
-->

---
name: Outro
ready: true
timing: 0.3
layout: outro2
---

<!--
Merci à tous, c'était Estéban.

Ça me ferait très plaisir de pouvoir lire vos retours,

et si l'envie vous en dit, on se retrouve sur l'internet.

Merci !
-->

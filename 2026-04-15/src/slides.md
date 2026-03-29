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
date: 15 avril 2026
chooseYourOwnAdventure: true
ready: true
timing: 0.2
---

<!--
TODO: penser à retirer des choses pour simplifier les slides et garder le focus et l'attention
TODO: revoir le fil conducteur pour y apporter une vraie narration
TODO: permettre d'envoyer des confettis (à la raycast)
TODO: pour les slides de choix, faut pas montrer le truc sous le capot, faut provider une description plus haut niveau (meubler pour ne pas que ce soit des temps morts, genre faire un récap de récap, ...) (pour ne pas trop tuer le rythme, les instructions peuvent être sur la slide)
TODO: sur les récaps, teaser la suite pour donner envie de continuer
TODO: garder un élément dans les slides pour permettre d'accéder au côté interactif
-->
<!-- TODO: disable emoji on some slides (like the recap slides for example) (disabled on layout) -->
<!-- TODO: citer des choses pour les 80% donc du react et du angular à minima -->
<!-- TODO: utiliser la vitesse pour mettre du rythme (regarder obama pour utiliser les changements de vitesse) -->
<!-- TODO: running joke sur vite et rapide -->
<!-- TODO: sur un début de talk, parler plus simplement, souffler, manger ses mots, parler de façon plus famillière -->
<!--
(authenticité fausse pour être plus proche, plus accessible, pur être dans le monde des autres)
 -->

<!--
question avec upvote et downvote sur inalia, ça évite les duplicate
-->

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
img: /vite-background.png
transition: slide-up
---

<img src="/vite-logo-color-dark.svg" />

::outside::

<ViteEcosystem />


<!--
[fast] Petit contexte rapide sur Vite

C'est un outil, c'est simple, il est présent partout. Prenez le nom d'une framework que vous connaissez, tant que ce nom n'est pas Next, il y a Vite dedans. [accelerate] Utilisé par Angular, React, Vue, Nuxt, Astro, TanStack, bla bla bla et pleins d'autres, bref, on s'en fou

[slow] La question qu'est intéressante, c'est pourquoi Vite fait autant l'unanimité ? Ben parce que c'est un bundler pas comme les autres.
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
gr
Peut-être que certains d'entre vous on entendu parler de webpack, le bundler historique, qui a dominé le paysage pendant les 10 dernières années, et qui reste aujourd'hui encore très utilisé.

Mais on le voit là, juste là, à un moment donnée ça stagne alors même que le web a continué de progresser,

et ça, ça s'explique quand on regarde le reste. [accelerate] Il est plus tout seul, il y en a d'autres Vite, Rspack, Snowpack, SWC, bref, d'autres.
sauf qu'on voit que c'est Vite a pris le dessus

[slow] Pourquoi ? Est-ce une hype ? Une réalité ? Que se passe-t-il ?

Et bin ça tombe bien, on va prendre le temps d'en parler
-->

---
name: Le thème des slides
group: Pré-talk
timing: 2.4
---

<!-- TODO: js -> exécutable du web, bundler permet de créeer cette exécutable, racourci sur un compilateur de js même si c'est pas vraiment ça, et c'est incontournable, plus personne ne fait du web snas bundler, vite est devenu le bundler incontournable adopté par tout le monde -->
<!-- TODO: (à chaque vote, ça peut changer de couleur et d'autres choses) -->

<!-- Ajouter un lien vers la documentation officielle de Vite sur le bundling : https://rolldown.rs/in-depth/why-bundlers#why-do-we-still-need-bundlersn -->

<!--
Je m'appelle Estéban, je suis ingénieur logiciel chez Takima.

J'ai une confidence à vous faire, je suis addict au front, j'ai découvert Vite, y quelques années et j'ai eu envie de vous partager en 45 minutes un concentré de tout ça.

[pause]

[fast] J'ai un autre truc à vous dire, aujourd'hui, heu, p'tit nouveauté, [slow] je vais vous laisser le contrôle complet du talk, [accelerate] alors attention, quand je dis complet, c'est pas tout, c'est, c'est les trucs les plus importantes, c'est à dire qu'en faite, [slow] vous allez pouvoir choisir le thème de cette conférence.

Aller c'est parti, on y va, j'vous en dit pas plus [never ending sentence]

[play waiting music] [wait]

[never stop] Vous pouvez prendre votre téléphone, et puis flasher le QR code, je vous laisse à vous connecter, prendre le temps de regarder un peu la plateforme, et puis bon, pendant que vous vous connectez, on va commencer.

Je vous l'avez promis. C'est quoi un bundler ?

On a l'habitude de démarrer une application avec un executable, executable produit avec un compilateur. Et ben dans le web, c'est pareil.
On a un bundler qui va produire un bundle qui permet de démarrer votre application web depuis un navigateur.

Du coup, on peut vraiment voir le bundler comme un compilateur, et le bundle comme l'exécutable du web.

Okk, vous commencez à arriver, trop chouette.

Trop bien, on a compris ce qu'était un bundler.
-->

---
name: Le fonctionnement de Vite
group: Vite Core
timing: 0.9
ready: true
layout: ai
---

<ViteExplainedWithAI
  user-prompt="I'm new in the web dev world. What is Vite and how does it work?"
/>

<!--
Maintenant, bin, il nous faut comprendre Vite.

En 2026 [pause], [slow] est-ce qu'on ne demanderait pas à l'IA de nous le dire ?

[accelerate] Allez, on lui demande. [enter] "Je suis nouveau dans le monde du développement web, qu'est-ce que Vite et comment est-ce que ça fonctionne ?"

[enter] Elle regarde sur internet, elle réfléchie, etttttt voilà ! Elle répond... [disillusion]

C'est long. c'est trop long. [fast] et moi bah, j'ai que 45 minutes et j'ai vraiment envie de vous transmettre un concentré doooncc là, c'est pas possible.
-->

---
name: Le concentré du fonctionnement de Vite
group: Vite Core
layout: center-card
img: /vite-background.png
timing: 0.7
ready: true
clicks: 5
---

<ViteOverview />

::outside::

<ViteEcosystem class="opacity-30" without-clicks />


<!--
[slow] Du coup, bin voici les trucs les plus importants à retenir sur Vite.

[impact]
- C'est un serveur web, requête, réponse, HTTP, tout ça
- Il est basé sur les modules ECMAScript, `import` et `export`
- Il transforme les fichiers à la demande
- Et il est entièrement extensible via des plugins

[pause]

Bah voilà, vous avez tout!

[pause eau]

Mais heuu, est-ce qu'on rendrait pas ça un peu plus visuel.
-->

---
name: Le fonctionnement de Vite - Visualisation
group: Vite Core
timing: 2.1
ready: true
layout: full
---

<ViteExplainedVisually />

<!--
[slow] [click] À droite, un navigateur, [click] à gauche, des fichiers. C'est juste le starter Vite, Vue et TypeScript, rien d'extravaguant. [fast] Eh heu quand je dis à gauche à droite, c'est heu sur la slide parce qu'en vrai, c'est sur votre machine tout ça hein.

[slow] Entre les deux, on place [fast] rapidement [slow] [click] Vite, notre serveur web. [fast] Et puis bon bin, le navigateur, il fait des requêtes HTTP vers Vite qui va lire le système de fichier pour renvoyer l'information.

Pour la suite, je vous propose qu'on se place dans la navigateur et qu'on intercepte [click] ensemble les requêtes HTTP.

[accelerate]
Au départ, on demande la document, Vite renvoie le fichier index.html avec le client Vite et main.ts.
Ensuite, le navigateur charge main.ts. On y voit un fichier CSS, Vue et notre app, que le navigateur charge évidemment aussi.
[open style.css] Regardons le ficher CSS. Ah tiens, Vite renvoie du JavaScript pour le CSS, on y retrouve quand même notre CSS. Ok, étonnant mais pourquoi pas.
[open App.vue] Et le fichier Vue alors ? Aaaah ahah, c'est du JavaScript, encore. Dans nos fichiers, c'était bien un composant Vue.

Peut importe...

[enthusiastic] On a maintenant une belle vision d'ensemble. Trop chouette !
-->

---
name: Tout n'est que plugin
group: Feature Plugins
timing: 1.9
layout: image
img: /vite-background.png
---

<AllAboutPlugins />

<!-- TODO: overlay en bas à gauche -->

<!--
[whispers] Bon, par contre, j'ai un petit secret à vous dire. [small pause] Ça reste en vous et moi hein?

[slow] Dans Vite [pause], toutes les fonctionnalités [pause], sont des plugins. [pause] Toutes ! [click]

[whispers] Et ça, mmmh, c'est vraiment bien parce que ça veut dire que, bah, que, qu'on peut faire tout ce qu'on veut quand on crée un plugin.

Ça m'fait penser, on va explorer l'un d'entre eux après, et vous avez la possibilité de choisir lequel. [show qr code]

Gestion des pages HTML ? On peut !
Support natif du JSX ? C'est intégré !
Gestion du CSS ? C'est fait aussi !
Les assets statiques ? C'est no brainer, ça s'occupe même du hash !
L'import de JSON dans un fichier ? Facile, c'est géré !
Les glob imports ? Oui, ça fonctionne !
Les imports dynamiques ? Vous vous en doutez, c'est built-in !
Et puis, le WebAssembly et les Web Workers, pas besoin de s'en soucier, Vite le gère aussi !

Breeeef, tout est possible. Surtout, le point à retenir, de tout ça, ce ne sont que des plugins.
-->

---
name: Tout n'est que plugin - Choices
group: Feature Plugins
ready: true
timing: 0.1
layout: choices
choices:
  - Du CSS importé dans un fichier TypeScript
  - Une image chargée dans un fichier TypeScript
  - JSX chargé naturellement
---

<!--
Ooooh [pause], très intéressant comme choix.

Et bin c'est parti, explorons <choix> !
-->

---
name: Du CSS importé dans un fichier TypeScript
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

Pourquoi ? Parce que l'navigateur, il s'fout de l'extension. Tant que tu lui renvois du JavaScript, c'est ok.

[shocked] [click] Mais ? Ça veut dire qu'on lui renvoie du JavaScript ?
-->

---
name: Du CSS importé dans un fichier TypeScript - Visualisation
group: Feature Plugins
ready: true
timing: 0.9
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Vite et ses features - Récap
---

<BackgroundImage />

<CssImportedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur. On va y observer les requêtes et les réponses.

On y r'trouve notre index.html. Ce document, il charge l'index.ts. L'index.ts, lui, importe notre style.css.

[impressed] Ooooh, whaaaoo ! Il n'y a pas de CSS là. Heureusement parce que notre navigateur, il aurait pas su quoi en faire.

[slow] Si on fouille un peu, qu'on cherche là dans le fichier, on y retrouve notre CSS. Tout le reste, c'est de la transformation à la volée par Vite.
-->

---
name: Une image chargée dans un fichier TypeScript
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
name: Une image chargée dans un fichier TypeScript - Visualisation
group: Feature Plugins
ready: true
timing: 0.9
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

<BackgroundImage />

<AnImageLoadedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur pour y observer les requêtes et les réponses.

On y r'trouve notre index.html qui charge main.ts qui lui-même charge notre image.

[impressed] Ooooh, whaaoo ! Il n'y a pas d'image là. Heureusement parce que notre navigateur, il n'aurait pas su quoi en faire.

[slow] Automatiquement, Vite va répondre à cet import en récupérant le chemin de l'image et en générant un module JavaScript qui exporte l'URL de l'image.
-->

---
name: Une image chargée dans un fichier TypeScript - Build
group: Feature Plugins
ready: true
timing: 0.3
layout: bottom-right-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Vite et ses features - Récap
---

<AnImageLoadedIntoTypeScriptBuildTree />

<!--
Au build, Vite va inliner les images de moins de 4ko pour réduire le nombre de requêtes et ajouter un hash dans le nom des autres pour facilement invalider les caches.
-->

---
name: JSX chargé naturellement
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img: https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
name: JSX chargé naturellement - Visualisation
group: Feature Plugins
ready: true
timing: 0.8
img: https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Vite et ses features - Récap
---

<BackgroundImage />

<JSXLoadedNaturallyIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Pour en avoir le cœur net, je vous propose qu'on aille dans [click] l'inspecteur de notre navigateur pour y observer les requêtes et les réponses.

On y r'trouve notre index.html qui charge main.jsx.

[impressed] Ooooh, whaaoo ! Il n'y a pas de JSX là. Heureusement parce que notre navigateur, il n'aurait pas su quoi en faire.

[slow] Automatiquement, Vite va répondre à cet import en transformant le JSX en JavaScript standard que le navigateur peut comprendre.

Il fait la même chose sur item.jsx !
-->

---
name: Vite et ses features - Récap
ready: true
timing: 1.2
layout: recap
---

<RecapList
  title="Vite en 3 points"
  :items="[
    {
      title: 'Un serveur web pour le développement',
      description: 'Il fait transiter des requêtes qu\'on transformera à la volée'
    },
    {
      title: 'Un bundler pour la production',
      description: 'Il transforme notre code pour la production'
    },
    {
      title: 'Un système de plugins',
      description: 'Pour étendre ses fonctionnalités et faire faire tout ce qu\'on veut'
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
name: Les entrailles d'un plugin Vite - Common Hooks
group: Inside a Plugin
ready: true
timing: 1.1
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

Ensuite, [click] on a 3 méthodes qu'on peut utiliser pour agir sur chaque requests.

1. resolveId
2. load
3. transform

[pause] [click]

[enthusiastic] Baaah voilà ! Vous venez de faire votre premier plugin Vite ! Félicitations ! Bravo !

[doubtful] Mais heuu, okk, mais il fait rien du tout là notre plugin ??

Ouais, ouais, ouais, [fast] on va changer ça ensemble.
-->

---
name: resolveId
group: Inside a Plugin
ready: true
timing: 0.7
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

C'est tout.

[reassuring] Si ça vous semble flou, ou d'un intérêt très limité, c'est normal. On ne panique pas, c'est toujours l'effet qu'il fait la première fois.
-->

---
name: load
group: Inside a Plugin
ready: true
timing: 0.9
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

Mais, on n'est pas limité à ça.

[click] Qu'est ce qui nous empêche de le charger depuis une API ?

[click] Ou plus zinzin encore, de retourner un fichier qui n'existe pas ?

Rien ! Tous ces cas fonctionnent.

[enthusiastic] Ok, petit à petit les briques s'assemblent. Le puzzle prend forme. On aime bien.
-->

---
name: transform
group: Inside a Plugin
ready: true
timing: 0.5
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

[enthusiastic] Okkk, là on comment vraiment, vraiment, à faire des choses intéressantes !
-->

---
name: Plusieurs plugins
group: Inside a Plugin
ready: true
timing: 0.3
layout: center
---

<h2 class="text-4xl font-bold">Plusieurs plugins ?</h2>

<!--
[doubtful] Heuuu, comment on fait, comment, comment on gère s'il y a plusieurs plugins ?

[thinking]

Bah, le mieux qu'on regarde ensemble ? On fait ça depuis la pipeline de Vite ?
-->

---
name: Les entrailles d'un plugin Vite - Visualisation
group: Inside a Plugin
ready: true
timing: 1.7
class: p-0!
---

<VitePluginsTheory />

<!--
[enthusiastic] Aller, let's go !

[slow] Nous voici, devant la pipeline de Vite, avec deux plugins. Y'aaa, nos différents hooks, en haut, on reçoit la request du navigateur, en bas, on renvoie la réponse.

Pour chaque hook, le système va itérer sur chacun des plugins et nous, on va regarder [click] l'input et l'output de chaque plugin.

ok, j'ai l'impression que tout est en place, du coup, imaginons, on est une petit request pour le fichier App.vue.

On arrive ici. On rentre dans resolveId, on rencontre VuePlugin, en input, il a bien l'ID de notre fichier et en output, on voir qu'il renvoie cet ID. Du coup, Vite va complètement skip les autres plugins.

Ensuite, on arrive sur load où on va passer de l'identifiant du module à son contenu. Comme VuePlugin a répondu, Vite skip CustomPlugin.

On finit par transform où VuePlugin transforme le fichier Vue en JavaScript pour le navigateur puis CustomPlugin reçoit cette transformation pour y appliquer d'autres modifications.

Et enfin, on renvoie ce code là au navigateur.
-->

---
name: Les entrailles d'un plugin Vite - Lifecycle Hooks
group: Inside a Plugin
ready: true
timing: 1.2
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
[fast] Jusqu'ici, on a vu les hooks liés à la gestion et la transformation à la volée des requests mais il y en a pour s'intégrer directement dans le cycle de vie de Vite.

On a le hook [click] config, appelé juste avant que la configuration soit résolue. C'est le bon moment pour ajuster la configuration.

Une fois qu'elle est résolue, [click] le hook configResolved est appelé, essentiel pour récupérer la configuration de Vite et l'utiliser plus tard.

Ensuite, [click] buildStart, appelé au moment où Vite démarre et [click] buildEnd, appelé quand Vite s'arrête. Dans le premier on va y faire des pré-traitement pour préparer le terrain et dans le second, on va utiliser pour faire des effets de bord, comme générer un sitemap.
-->

---
name: Concrètement ?
group: Concrete Example
timing: 0.1
layout: center
---

<h2 class="text-4xl font-bold">Concrètement, ça donne quoi ?</h2>

<!--
TODO: qu'est ce qu'on fait ?
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Exemple
group: Concrete Example
ready: true
timing: 0.4
layout: bottom-left-card
img: https://images.unsplash.com/photo-1773981921708-3517523b3a7e?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts
import { ref, computed, effect } from 'vue'

const count = ref(0)

const double = computed(() => count.value * 2)

effect(() => {
  console.log(`Count: ${count.value}, Double: ${double.value}`)
})
```
```ts
const count = ref(0)

const double = computed(() => count.value * 2)

effect(() => {
  console.log(`Count: ${count.value}, Double: ${double.value}`)
})
```
````

::outside::

<ClickRevealImage src="/how.gif" />

<!--
Dans ce bout de code là, rien de particulier !

[slow] Maintenant, qu'est-ce qui se passe si [click] on enlève les imports ?

Normalement, y a plus rien qui marche. Et pourtant, avec Vite, ça fonctionne toujours !

[shocked] [click] Comment ?
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Magic ?
group: Concrete Example
ready: true
timing: 0.5
layout: magic-rain
---

<img src="/magic.gif" class="absolute h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

<!--
[with gesture of magic] De laaaa magiiieee ?

Nan Estéban, ce n'est pas de la magie et d'ailleurs cette slide m'a demandé beaucoup trop temps.

Donc on va prendre un peu de temps pour regarder les émoji.

[meubler]

Mais heu bref, on s'est perdu là... on s'égare.
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Visualisation
group: Concrete Example
ready: true
timing: 0.9
transition: slide-up
---

<AutoImportPluginExplainedVisually />

<!--
Ce qu'on pourrait faire, [click] c'est visualiser les backstage.

C'est une bonne idée que vous avez là.

À gauche, le navigateur, à droite les fichiers et au centre, Vite. Dans le main.ts, c'est notre code.

Nous, je vous propose qu'on se place dans le navigateur pour observer les requests.

[click]
[click]

L'index.html se fait charger, dans lequel on a le main.ts, qui se fait lui même charger.

[surprise] Oh, est-ce qu'on n'aurait pas nos imports qui serait apparus ? Il semble que oui !

Ça pourrait expliquer pourquoi ça fonctionne !
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Confused ?
group: Concrete Example
ready: true
timing: 0.2
layout: confused-rain
---

<img src="/confused.gif" class="absolute h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

<!--
[doubtful] Maiiiis qui les a mis là ?

[take time to think about it]

Ah mais oui, un plugin Vite !
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Plugin Internals
group: Concrete Example
ready: true
timing: 1
img: https://images.unsplash.com/photo-1773981921708-3517523b3a7e?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
layout: bottom-left-card
---

````md magic-move
```ts {*|6}{lines:true}
export default function autoImport(options: Options) {
  let ctx = createContext(options)
  return {
    name: 'unplugin-auto-import',
    async transform(code, id) {
      return ctx.transform(code, id)
    },
  }
}
```
```ts {5-14|*}{lines:true}
export default function autoImport(options: Options) {
  let ctx = createContext(options)
  return {
    name: 'unplugin-auto-import',
    async transform(code, id) {
      const s = new MagicString(code)

      await injectImports(s, id)

      return {
        code: s.toString(),
        map: s.generateMap({ source: id }),
      }
    },
  }
}
```
````

<!--
Je vous propose qu'on se regarde le plugin Auto Import.

C'est lui qu'est 1a l'origin de cette magie et beh en gros, c'est ça son code, quoi.

La ligne intéressante, [click] c'est la 6, dans le hook transform qui permet de modifier le contenu d'un module.

[click] En zoomant dedans, on y découvre ligne 8 l'injection des imports, et c'est là que toute la magie opère.

[fast] Pour chacun des modules du projet, le plugin scan le code, détecte les éléments non importé à importer, les injecte et renvoie le code modifié au navigateur.

Précis, simple, rapide, efficace.
-->

---
name: Visualiser la pipeline
ready: true
timing: 1.2
img: https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<BackgroundImage />

<Card v-click absolute top-14 inset-x-10 -bottom-10>
  <h2 class="text-center mb-2 text-neutral-700 flex flex-row items-center justify-center gap-2"><span class="i-vscode-icons-file-type-npm inline-block size-5"></span>vite-plugin-inspect</h2>
  <iframe src="/__inspect" class="rounded-lg overflow-hidden w-full h-full" />
</Card>

<!--
[fast] Bon tout ça c'est bien chouette, on a compris la système, on a compris ce qu'il se passait, qu'il y avait des transformations à la volée, mais bah, rien nous dit que c'est vraiment le cas, on a juste lu le code source.

[slow] Ça serait pratique si on avait un tool pour visualiser toutes les transformations, visualiser toute la pipeline, un tool qu'on pourrait installer dans tous nos projets... [thinking]

[click]

En plus, ce tool, on pourrait l'appeler vite-plugin-inspect et pour chacun des fichiers qui passe dans Vite, on visualiserait la pipeline et les différentes transformations.

[show a Vue and a CSS file using the iframe]

Ouais, ça serait vraiment trop que quelqu'un l'ait déjà fait et publié sur npm
-->

---
name: Le plugin Vite - Récap
ready: true
timing: 1.3
layout: recap
---

<RecapList
  title="Le plugin Vite en 3 points"
  :items="[
    {
      title: 'Un plugin Vite, c\'est une fonction qui retourne un objet',
      description: 'L\'objet doit au moins avoir une propriété name'
    },
    {
      title: 'Il y a 3 hooks principaux pour agir sur les modules',
      description: 'resolveId, load et transform'
    },
    {
      title: 'Il y a aussi des hooks pour le cycle de vie de Vite',
      description: 'config, configResolved, buildStart, buildEnd et closeBundle'
    }
  ]"
/>

<!--
[slow] Ok, là, on vient de voir du concret, [click] on va se faire un petit récap.

[click] Un plugin Vite, c'est une fonction qui retourne un objet.

[click] Y a 3 hooks principaux pour agir sur les modules : resolveId, load et transform. Le plus utilisé, globalement, c'est transform.

[click] Et puis, on a pleins de hooks pour se brancher sur l'ensemble du cycle de vite de Vite.

Génial ! [confetti] On commence à faire nos premiers plugins. Franchement, si on nous avait dit ça il y a quelques dizaines de minutes, j'aurais pas cru !

[intrigued] D'ailleurs, je me permets de revenir dessus parce qu'à un moment, on a dit que le hook load pouvait retourner du code qui n'existe pas. Mais, hmmm, qu'est-ce que ça veut dire ?
-->

---
name: Un plugin pour virtualiser
group: Virtualization
ready: true
timing: 1.5
---

<VirtualizationExplainedVisually />

<!--
[slow] Je vous invite à vous joindre à moi pour qu'on comprenne ça ensemble.

[fast] Reprenons [click] notre visualisation, à gauche le navigateur, à droite les fichiers et au milieu, Vite, si on regarde main.ts, on y découvre un import vers 'virtual:my-module'. Pourtant ce n'est ni un fichier du projet, ni un module existant [open package.json].

[strange] D'où vient-il ?

[fast] Pour le savoir, je nous invite à regarder les [click] logs du navigateur [click].

index.html, main.ts avec hooo, il y a eu un changement dans le nom de l'import, et notre module qui semble être un fichier JavaScript, tout ce dont on a l'habitude.

[questioning] Vraiment, j'comprends pas d'où il vient ? Est-ce qu'il viendrait de Vite ? Et que Vite serait capable de répondre à des requests avec du code arbitraire, des modules qui n'existent pas, qui serait inventés de toute pièce ?

Ça serait dingue ?!

[pause]

Et c'est le cas.
-->

---
name: Un plugin pour virtualiser - Mind Blowing
group: Virtualization
ready: true
timing: 0.4
layout: mind-blowing-rain
---

<img src="/mind-blowing.gif" class="absolute h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

<!--
[with gesture of mind-blown] Wouaaah, le cerveau au moment où il comprend que Vite peut faire ça, répondre à des requêtes avec des modules qui n'existent pas......

[slow] Mais, ça nous explique pas comment ça fonctionne.

On se plonge dedans ?
-->

---
name: Un plugin pour virtualiser - Plugin Internals
group: Virtualization
ready: true
timing: 1.4
layout: bottom-center-card
img: https://images.unsplash.com/photo-1767482061466-0b4cd8958c86?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
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
Dans la suite, on va prendre le temps de rentrer en profondeur dans plugin qui utilise cette technique là, tu peux déjà choisir lequel.

Tout comment par un plugin, [cut] [click] avec son petit nom là, il est tout mignon.

Dans [click] le hook resolveId, on intercepte l'identifiant de notre module virtuel et on le préfixe avec un \0. C'est une convention de Rollup, c'est tout, c'est comme ça.

Ensuite, beh, dans [click] le hook load, on vérifie l'identifiant, et si c'est le notre, on retourne une string qui contient le code de notre module, au lie de lire un fichier sur le disque, puisque bah enfaîte, on retourne une string dans les deux cas.

[click]

Le truc, beh, c'est que c'est un peu pénible à écrire à chaque fois mais heureusement pour nous, il existe vite-plugin-virtual.
-->

---
name: Un plugin pour virtualiser - Virtual Plugin
group: Virtualization
ready: true
timing: 1
layout: bottom-center-card
img: https://images.unsplash.com/photo-1770323084932-3d1cbe84d31b?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

````md magic-move
```ts {6}{lines:true}
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
TODO: on-demand phylosophy

Dans la suite, on va explorer un vrai plugin et vous avez la possibilité, pour de vrai, de choisir lequel.

Pour utiliser le plugin, c'est super simple. On l'installe, et ensuite, c'est un dictionnaire. La clé, c'est le nom du module virtuel et la valeur, c'est le code, alors ça peut être une string, une fonction, une fonction asynchrone, peu importe.

Et du coup, beh, beh on peut très simplement [click] avoir accès au dernier commit git, [click] ou même faire une request vers une API pour injecter au build time des data.

[enthusiastic] C'est beau, c'est simple ! On adore !
-->

---
name: Un plugin pour virtualiser - Choices
group: Virtualization
ready: true
timing: 0.1
layout: choices
choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icônes virtuelles
  - Infos Plugin - Des infos virtuelles
---

<!--
Ok. Ok, j'aime beaucoup ce choix !

Aller, plongeons nous dedans !
-->

---
name: Vue Router - Un module virtuel
group: Virtualization
ready: true
timing: 0.7
img: https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
layout: bottom-center-card
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
name: Vue Router - Un module virtuel - Plugin Internals
group: Virtualization
ready: true
timing: 0.9
img: https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
layout: bottom-center-card
choices:
  - Les autres capacités des plugins
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

[click] C'est un plugin avec module virtuel par excellence.
-->

---
name: VitePress - Des data virtuels
group: Virtualization
timing: 1.2

layout: center-card
img: https://images.unsplash.com/photo-1750017675871-76518031b2e1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
// example.data.js
export default {
  load() {
    return {
      hello: 'world'
    }
  }
}
```

```vue
<script setup>
import { data } from './example.data.js'
</script>

<pre>
{{ data }}
</pre>
```

<!--
VitePress, c'est un outil qui permet de faire des documentations statiques à partir de fichiers Markdown.

Il est fréquent de vouloir récupérer des données dynamiques dans sa documentation, comme, par exemple, des données distantes ou des métadonnées locales, comme la définition de l'API.

Pour ce faire, VitePress permet de créer un data loader. C'est simplement un fichier suffixé par `.data.js` dans lequel on peut faire ce qu'on veut. Ce fichier est exécuté au build time. Ensuite, au moment de l'import dans un composant Vue, le résultat du data loader est injecté dans le composant.

Du coup, vous pouvez faire un fetch, un readFile, et tout ça ne sera exécuté qu'une seule fois, au moment du build.
 -->

---
name: VitePress - Des data virtuels - Plugin Internals
group: Virtualization
timing: 0.6
layout: center-card
img: https://images.unsplash.com/photo-1750017675871-76518031b2e1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Les autres capacités des plugins
---

```ts
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

<!--
Sous le capot, c'est le même système de module virtuel que tout à l'heure. Les fichiers suffixés par `.data.js` sont interceptés dans le hook `resolveId` et préfixés avec `\0`. Ensuite, dans le hook `load`, Vite va exécuter le code du data loader et retourner le résultat sous forme de code JavaScript exporté. C'est ça qui permet d'avoir des données dynamiques dans une documentation statique.
-->

---
name: Icons Plugin - Des icônes virtuelles
group: Virtualization
ready: true
timing: 0.7
img: https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
layout: center-card
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
name: Icons Plugin - Des icônes virtuelles - Plugin Internals
group: Virtualization
ready: true
timing: 0.8
img: https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
layout: center-card
choices:
  - Les autres capacités des plugins
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

[click] C'est un plugin avec modules virtuels par excellence.
-->

---
name: Infos Plugin - Des infos virtuelles
group: Virtualization
timing: 0.6

layout: center-card
img: https://images.unsplash.com/photo-1663725143572-158403ee3c06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
import { sha } from '~build/info'
import now from '~build/time'

console.log(`Build ${sha} at ${now}`)
```

<InfoPlugin class="mt-4" />

<!--
Imaginez que vous vouliez afficher et utiliser le dernier tag Git dans votre application, le dernier SHA pour Sentry, ou simplement la date du dernier build : comment est-ce que vous feriez ?

Un fichier de config que vous mettez à jour à la main avant chaque release ? Avant chaque build ?

Vraiment pas pratique.

Et c'est là qu'intervient `vite-plugin-info`.
-->

---
name: Infos Plugin - Des infos virtuelles - Plugin Internals
group: Virtualization
timing: 0.8

layout: center-card
img: https://images.unsplash.com/photo-1663725143572-158403ee3c06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Les autres capacités des plugins
---

````md magic-move
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'build-info',
    },
  ],
})
```
```ts
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
```ts
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
```ts
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
Sous le capot, c'est un jeu de modules virtuels, et on y retrouve la même structure que tout à l'heure. Le gros changement, c'est qu'on va venir exécuter du code à ce moment-là pour le figer dans l'application.

Pour le temps, on vient exécuter un `new Date()`, et pour le dernier SHA, on vient faire tourner un sous-processus pour le récupérer avant de le retourner au client. Et ça nous donne ce qu'on a vu sur la slide d'avant.
-->

---
name: Les autres capacités des plugins
group: Advanced Capabilities
timing: 0.3
---

<!--
TODO: inviter les gens à voter avant de présenter les choix en parlant de tout ce qu'il est possible de faire (tous les expliquer et en présenter uniquement un en détail par la suite)
-->

---
name: Les autres capacités des plugins - Choices
group: Advanced Capabilities
timing: 0.2
choices:
  - Le HMR (Hot Module Replacement)
  - Le middleware - Un fichier virtuel
  - Run Plugin - Un plugin pour exécuter des commandes
  - Laravel Vite - La communication inter-processus
  - unplugin-macro - Un plugin pour créer des macros
  - Nitro - Un backend
---

<!-- TODO: trop de choix (voir pour tout faire sauter dans le pire des cas, réduire les choix en fonction de la conférence ? intégrer les explications dans les sldies) -->
<!-- TODO: grosse frustration parce que tous n'explore pas les même choses (on peut pas tout faire -->

---
name: Le HMR (Hot Module Replacement)
group: Advanced Capabilities
timing: 1.1
img: https://images.unsplash.com/photo-1559762691-617a33825bc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

<BackgroundImage />

<HmrExplainedVisually class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
L'une des grandes forces de Vite, en plus du mode unbundled, c'est son Hot Module Replacement, ou HMR.

Concrètement, c'est un système qui permet de mettre à jour un fichier à la volée dans le navigateur, sans recharger toute la page.

Le principe est assez simple : Vite surveille les fichiers, détecte une modification, calcule quels modules sont impactés, puis pousse la mise à jour au navigateur via WebSocket.

Ensuite, côté client, Vite applique la mise à jour la plus fine possible. Si le module sait accepter son propre remplacement, on évite un rechargement complet. Et c'est cette précision qui donne cette impression de fluidité presque insolente.
-->

---
name: Le HMR (Hot Module Replacement) - Plugins Internals
group: Advanced Capabilities
timing: 0.9
choices:
  - Récap des récap
---

<!--
Sous le capot, tout ça repose sur quelques hooks très pratiques.

Le plus connu, c'est `handleHotUpdate`, qui permet à un plugin d'intercepter une modification de fichier et de décider quoi faire : invalider des modules, en renvoyer d'autres, ou même déclencher un rechargement complet si nécessaire.

Autrement dit, le HMR n'est pas une magie réservée au cœur de Vite. Les plugins peuvent eux aussi participer à la stratégie de mise à jour, et c'est ce qui permet d'avoir un HMR intelligent même pour des formats exotiques ou des modules virtuels.
-->

---
name: Le middleware - Un fichier virtuel
group: Advanced Capabilities
timing: 1.3

choices:
  - Récap des récap
---

```ts {*}{lines:true}
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

<!--

Depuis le début, je ne vous parle que de la pipeline de plugins.

Sauf que Vite, c'est un serveur web, et qu'à travers les plugins, il est entièrement configurable. Il est notamment possible d'y ajouter des middlewares, soit pour modifier les requêtes, soit pour renvoyer une page custom.

Le plugin `vite-plugin-inspect` utilise cette technique pour vous permettre d'accéder à la page qui contient toutes les informations sur la pipeline de Vite, à l'adresse `/__inspect/`, et accessible uniquement en développement. Cette technique est super pratique pour donner accès à des données ou à des pages pendant le développement.

On peut imaginer mocker une API pendant le développement avec un middleware, simuler la récupération d'un fichier qui contient les variables d'environnement, ou même injecter un serveur web, comme le fait Nitro.

-->

---
name: Run Plugin - Un plugin pour exécuter des commandes
group: Advanced Capabilities
timing: 1.6

layout: bottom-center-card
transition: slide-up
---

````md magic-move
```ts {*}{lines:true}
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    run(),
  ],
})
```
```ts {*}{lines:true}
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
```ts {*}{lines:true}
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
````

<!--
Avec un plugin Vite, il est possible de créer des side-effects à chaque changement d'un fichier.

Vite dispose d'un file watcher qui lui permet de réagir dès lors qu'un fichier est créé, modifié ou même supprimé. C'est notamment utilisé par le Hot Module Replacement (HMR).

Le truc, c'est qu'on peut se brancher dessus avec un plugin pour déclencher nos propres réactions. C'est ce qu'a fait le plugin `vite-plugin-run`.

On commence par lui définir [click] une commande bash qu'on aimerait voir exécuter, puis [click] les fichiers capables de la déclencher.

Dans ce premier exemple, on génère automatiquement les types des routes pour le frontend à chaque fois qu'on modifie le fichier backend qui les contient.

Dans ce second exemple, [click], on vient aussi régénérer des types d'API backend pour le frontend à chaque fois qu'on touche à nos controllers ou à nos resources backend.

Avec cette méthode, on s'enlève une tâche manuelle et on s'assure d'avoir un frontend synchronisé avec le backend.
-->

---
name: Run Plugin - Un plugin pour exécuter des commandes - Plugin Internals
group: Advanced Capabilities
timing: 0.3

layout: bottom-center-card
choices:
  - Récap des récap
---

```ts {*}{lines:true}
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'run',
      handleHotUpdate({ file }) {
        if (/web\.php$/.test(file)) {
          execSync('php artisan ziggy:generate --types')
        }
        if (file.includes('/app/')) {
          execSync('php artisan wayfinder:generate')
        }
      }
    }
  ]
})
```

<!--
Plus concrètement, un plugin comme `vite-plugin-run` est implémenté avec le hook `handleHotUpdate`.

À chaque fois qu'un fichier est modifié, le hook est exécuté et les commandes peuvent être lancées.
-->

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0.7
transition: slide-up
---

<CommunicationLaravelVite class="w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<!--
Pour celui-là, il faut que je vous donne un peu plus de contexte.

Laravel, c'est du PHP, et Vite, c'est du Node.js, chacun tournant dans son propre processus. En développement, quand on demande une page, on fait une requête à Laravel, qui nous renvoie le HTML avec des assets — JavaScript et CSS — pointant vers le serveur Vite.

Mais alors, question toute bête : comment Laravel connaît-il l'adresse du serveur Vite ?
-->

---
name: Laravel Vite - La communication inter-processus - Plugin Internals
group: Advanced Capabilities
timing: 0.7

layout: bottom-center-card
img: https://images.unsplash.com/photo-1710020603990-0c984e7811f3?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Récap des récap
---

```ts {*}{lines:true}
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

Plus concrètement, un plugin comme `vite-plugin-laravel` va se servir du hook `configureServer` pour récupérer toutes les informations dont il a besoin et écrire le fichier dès lors que le serveur accepte des requêtes.
-->

---
name: unplugin-macro - Un plugin pour créer des macros
group: Advanced Capabilities
timing: 1

layout: center-card
img: https://images.unsplash.com/photo-1771533841296-5c6a80a0e24b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
Les macros en JavaScript, ça n'existe pas. Mais en C, c'est répandu, et ça permet de remplacer un morceau de texte par un autre au moment de la compilation.

`unplugin-macro` réintroduit ce système. En haut, vous avez vos macros : la première nous donne un nombre aléatoire et la seconde une date. En dessous, on vient importer ces deux fonctions avec un attribut sur l'`import`.

Au build time, ces deux fonctions vont être détectées, exécutées et remplacées par la valeur correspondante. Autrement dit, à chaque fois que vous allez recharger votre application, vous aurez toujours la même valeur.
-->

---
name: unplugin-macro - Un plugin pour créer des macros - Plugin Internals
group: Advanced Capabilities
timing: 0.6

layout: center-card
img: https://images.unsplash.com/photo-1771533841296-5c6a80a0e24b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Récap des récap
---

```ts {*}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'macro',
      async transform(code, id) {
        if (id.endsWith('.ts')) {
          const program = babelParse(code)
          const macroExports = findMacroExports(program)
          const macros = collectMacro(program)

          for (macroExport of macroExports) {
            const result = await executeMacroExport(macroExport)
            code = replaceMacroExportWithResult(code, macroExport, result)
          }
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

<!--
Plus concrètement, le plugin `unplugin-macro` va utiliser le hook `transform` pour trouver les macros, via un parcours de l'AST du code source et la balise `with { type: 'macro' }`, puis les exécuter pour les remplacer par le résultat.

C'est un plugin relativement complexe, mais qui démontre que ce système permet vraiment de tout faire.
-->

---
name: Nitro - Un backend
group: Advanced Capabilities
timing: 0.6

---

<NitroABackend class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<!--
Vite est surtout connu comme une plateforme de développement redoutable pour le frontend.

Mais certains se sont demandé s'il n'était pas possible d'aller plus loin.

Après tout, Vite est un serveur, et il est possible d'y injecter ses propres middlewares. Alors que se passe-t-il si on redirige certaines requêtes vers un autre serveur, chargé de les traiter puis de renvoyer la réponse ?
-->

---
name: Nitro - Un backend - Plugin Internals
group: Advanced Capabilities
timing: 0.3

choices:
  - Récap des récap
---

```ts {*}{lines:true}
import { createContext, createNitro, NitroPluginContext } from 'nitro'
// Extremely simplified pseudo-code of the Nitro plugin
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    (() => {
      const ctx: NitroPluginContext = createContext(pluginConfig)

      return {
        name: 'nitro',
        async config(config) {
          ctx.nitro = await createNitro(ctx)
        },
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
    })()
  ]
})
```

<!--
Concrètement, qu'est-ce que ça donne ?

Dans le plugin de Nitro, on démarre un serveur Nitro dans le hook `configureServer` et on vient forward les requêtes vers ce serveur avec un middleware.
-->

---
name: Récap des récap
timing: 0
layout: recap
---

<RecapList
  title="Ce qu'il faut garder en tête"
  :items="[
    {
      title: 'Une pipeline entre vos fichiers et le navigateur',
      description: 'Chaque requête passe par Vite, qui peut transformer les modules à la volée'
    },
    {
      title: 'Des plugins pour créer des fichiers qui n\'existent pas',
      description: 'Modules virtuels, routes, icônes, infos de build... tout peut être généré à la volée'
    },
    {
      title: 'Tout peut être étendu par un plugin',
      description: 'Transformation de code, HMR, middlewares, side-effects, macros, backend...'
    }
  ]"
/>

<!--

-->

---
name: Dans les profondeurs de la pipeline
group: Deep Dive
ready: true
timing: 1.5
layout: bottom-left-card
img: https://images.unsplash.com/photo-1553356126-71d9da2295e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
[slow] Maintenant qu'on est autonome pour construire nos plugins, je vous propose un petit bonus, deux petits trucs pour aller plus loin.

[enthusiastic] Premier truc !

[fast] Vite exécute nos plugins dans l'ordre de déclaration. Mais on peut jouer dessus avec l'option enforce. [click] pre pour forcer le plugin au début et post pour forcer le plugin à la fin de la pipeline. Dans l'example là, [click] Vite va exécuter another-plugin, vue-plugin et enfin custom-plugin.

[enthusiastic] Second truc !

[fast] [click] Vite exécute tous les hooks les un après les autres. Si vous ne voulez pas que votre plugin intervienne dans une étape, le filtrage se fait [click] dans le hook mais votre hook est quand même exécuté. Ça pose problème avec Rolldown à cause de l'overhead entre Rust et Node.js. Pour contourner ça, on peut extraire [click] les filtres et notre hook n'est appelé que s'ils matchent.
-->

---
name: Conclusion
timing: 0.2
layout: conclusion
---

<!-- TODO: juste une punch finale, ce que les gens doivent retenir -->

<!-- TODO: aucune limite et transformation entre les fichiers et le navigateur et même, certains des fichiers peuvent être virtuels. -->

<!--
[enthusiastic] Beh voilà ! 45 minutes de pure concentré de Vite et vous voilà prêt à construire vos propres plugins.


-->

---
name: Votre tour
ready: true
timing: 0.5
layout: keep-in-mind
confettiClicks: 1
---

En <span class="text-primary">45 minutes</span>, vous avez découvert<br>le nécessaire pour réaliser<br><span class="text-primary">votre plugin Vite</span>.

::outside::

<img v-click src="/good-job.gif" class="absolute left-10 bottom-10 w-50" />
<img v-after src="/good-job.gif" class="absolute right-10 bottom-10 w-50" />

<!--
Compréhension de Vite, de sa pipeline, transformation de modules sur demande et la génération de modules virtuels, exploration de l'écosystème, c'est qu'on en a fait des choses.

Finalement, en 45 minutes, on a découvert le nécessaire pour réaliser notre plugin Vite.

[pause]

[click] sincèrement, vous pouvez être fière de vous ! Bravo
-->

---
name: Outro
ready: true
timing: 0.3
layout: outro2
---

<!-- TODO: qr de fin, ma tête, qui je suis, où me retrouver et potentiellement les articles  -->

<!--
Merci à tous, c'était Estéban.

Ça me ferait très plaisir de pouvoir lire vos retours,

et si l'envie vous en dit, on peut se retrouver sur l'internet.

Merci !
-->

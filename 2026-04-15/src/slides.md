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
timing: 0.6
---

<!--
TODO: sur chacune des slides, noter clairement l'objectif de la slide
TODO: penser à retirer des choses pour simplifier les slides et garder le focus et l'attention
TODO: revoir le fil conducteur pour y apporter une vraie narration
TODO: permettre d'envoyer des confettis (à la raycast)
TODO: pour les slides de choix, faut pas montrer le truc sous le capot, faut provider une description plus haut niveau (meubler pour ne pas que ce soit des temps morts, genre faire un récap de récap, ...) (pour ne pas trop tuer le rythme, les instructions peuvent être sur la slide)
TODO: sur les récaps, teaser la suite pour donner envie de continuer
TODO: garder un élément dans les slides pour permettre d'accéder au côté interactif
-->
<!-- TODO: citer des choses pour les 80% donc du react et du angular à minima -->
<!-- TODO: utiliser la vitesse pour mettre du rythme (regarder obama pour utiliser les changements de vitesse) -->
<!-- TODO: running joke sur vite et rapide -->
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

<!-- TODO: sur un début de talk, parler plus simplement, souffler, manger ses mots, parler de façon plus famillière -->

<!--
Bonjour à tous !

J'espère que vous allez bien.

[wait]

Hyper content d'être là aujourd'hui pour vous parler de Vite, de ses plugins et de pleins de trucs.
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

[slow] La question qui est intéressante, c'est pourquoi Vite fait autant l'unanimité ? Ben parce que c'est un bundler pas comme les autres.
-->


---
name: Vite Growth
group: Introduction
ready: true
timing: 1
---

<GrowthChart />

<!--
[slow] Peut-être que bundler ça ne parle pas forcément à tout le monde, on va prendre le temps de détailler ça là

Peut-être que certains d'entre vous on entendu parler de webpack, le bundler historique, qui a dominé le paysage pendant les 10 dernières années, et qui reste aujourd'hui encore très utilisé.

Mais on le voit là, juste là, à un moment donnée ça stagne alors même que le web a continué de progresser,

et ça, ça s'explique quand on regarde le reste. [accelerate] Il est plus tout seul, il y en a d'autres vite, rspack, snowpack, swc, bref, d'autres.
sauf qu'on voit que c'est vite a pris le dessus

[slow] Pourquoi ? Est-ce une hype ? Une réalité ? Que se passe-t-il ?

Et bin ça tombe bien, on va prendre le temps d'en parler
-->

---
name: Le thème des slides
group: Pré-talk
timing: 0.8
---

<!-- TODO: js -> exécutable du web, bundler permet de créeer cette exécutable, racourci sur un compilateur de js même si c'est pas vraiment ça, et c'est incontournable, plus personne ne fait du web snas bundler, vite est devenu le bundler incontournable adopté par tout le monde -->


<!--
Je m'appelle Estéban, je suis ingénieur logiciel chez Takima.

J'ai une confidence à vous faire, je suis addict au front, j'ai découvert Vite, y quelques années et j'ai eu envie de vous partager en 45 minutes un concentré de tout ça.

[pause]

[fast] J'ai un autre truc à vous dire, aujourd'hui, heu, p'tit nouveauté, [slow] je vais vous laisser le contrôle complet du talk, [accelerate] alors attention, quand je dis complet, c'est pas tout, c'est, c'est les trucs les plus importantes, c'est à dire qu'en faite, [slow] vous allez pouvoir choisir le thème de cette conférence.

Aller c'est parti, on y va, j'vous en dit pas plus [never ending sentence]

[play waiting music] [wait]

[never stop] Vous pouvez prendre votre téléphone, et puis flasher le QR code, je vous laisse à vous connecter, prendre le temps de regarder un peu la plateforme, et puis bon, pendant que vous vous connectez, on va commencer.



Okk, vous commencez à arriver, trop chouette.

(à chaque vote, ça peut changer de couleur et d'autres choses)

(explication de ce qu'est un bundler)
(sur la même slide, voir les votes et changer le thème en fonction du résultat)

Trop bien, on a compris ce qu'était un bundler.
-->

---
name: Le fonctionnement de Vite
group: Vite Core
timing: 1
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

C'est long. c'est trop long. [fast] et moi bah, j'ai que 45 minutes et j'ai vraiment envie de vous donner un concentré.
-->

---
name: Le concentré du fonctionnement de Vite
group: Vite Core
timing: 0
---

<!-- TODO: center-card avec des bullets points et des couleurs du primary -->
<!-- TODO: gray ensuite comme dans les signaux -->
<!-- TODO: faire un composant généric pour le réutiliser partout -->
<!-- https://github.com/Barbapapazes/talks/blob/86/2025-12-05/src/slides.md#L448-L453 -->

<ProgressiveList
  :items="[
    'Web Server (Request, Response)',
    'Based on ECMAScript Modules (`import`, `export`)',
    'Transform Files On-Demand',
    'Extensible using Plugins'
  ]
/>

<!--
[slow] Du coup, bin voici les trucs les plus importants à retenir sur Vite.

[impact]
- C'est un serveur web, requête, réponse, HTTP, tout ça
- Il est basé sur les modules ECMAScript, `import` et `export`
- Il transforme les fichiers à la demande
- Et il est entièrement extensible via des plugins

Bah voilà, vous avez tout sur les grandes lignes de ce qu'est Vite.

Mais heuu, est-ce qu'on rendrait pas ça un peu plus visuel.
-->

---
name: Le fonctionnement de Vite - Visualisation
group: Vite Core
timing: 2.2
layout: full
---

<ViteExplainedVisually />

<!-- TODO: simplifier en retirant des choses au fur et à mesure et à la fin, laisser un maximum de place pour le HTTP Log dans la mesur où on ne regarde que lui... -->
<!-- TODO: supprimer le fait de démarrer Vite -->
<!-- TODO: tout afficher d'un coup et ensuite les étudier une à une -->

<!--
[slow] [click] À droite, un navigateur, [click] à gauche, des fichiers. J'ai pris le template Vite, Vue et TypeScript. [fast] Eh heu quand je dis à gauche à droite, c'est heu sur votre machine que tout ça hein.

[slow] Entre les deux, on place [fast] rapidement [slow] [click] Vite, notre serveur web. [fast] Et puis bon bin, le navigateur, il fait des requêtes HTTP vers Vite qui va lire le système de fichier pour renvoyer l'information.

Pour la suite, je vous propose qu'on se place dans la navigateur et qu'on intercepe [click] ensemble les requêtes HTTP.

[accelerate]


[enthusiastic] Super ! On a désormais une belle vision d'ensemble.
-->

<!--
Tout commence par [click] un navigateur d'un côté et [click] des fichiers de l'autre. On peut s'y balader et regarder leur contenu. C'est un template Vue et TypeScript, rien d'extraordinaire.

Entre les deux, on va placer [click] Vite. Le navigateur et Vite vont [click] communiquer en HTTP, Vite va [click] lire les fichiers dans le système de fichiers et, tant qu'on y est, [click] démarrons Vite.

Maintenant, revenons dans notre navigateur pour [click] accéder à localhost:5173 et regardons les requêtes et les réponses.

[click] Alors la première évidemment, c'est pour charger le document. Si on regarde la réponse, c'est le fichier index.html, avec le script main.ts et le client Vite en plus par rapport au fichier sur le disque.

[click] Ensuite, c'est le fichier main.ts qui est chargé. On y voit trois imports : l'un pour un fichier style.css, un pour Vue, dont le chemin d'accès a été transformé, et un dernier pour le composant Vue.

Tiens ? Je ne savais pas qu'on pouvait importer, dans le navigateur, des fichiers CSS et des fichiers Vue ! Génial !

Dans les logs, on découvre ensuite [click] le chargement du fichier CSS, puis [click] de Vue, et finalement, [click] de notre fichier Vue.

Par curiosité, qu'est-ce que renvoie Vite pour le fichier CSS et le fichier Vue ?

Ah ! Alors ça, c'est étonnant, c'est du JavaScript. En fouillant un peu, on y retrouve quand même notre fichier de départ.

Mais c'est donc ça, la transformation à la demande dont on a entendu parler juste avant ?

C'est génial ! Mais comment est-ce que ça fonctionne ?

Eh bien, vous faites bien de poser la question : c'est tout l'objectif de cette conférence, [click] comprendre ce qu'il se passe dans Vite.
-->

---
name: Tout n'est que plugin
group: Feature Plugins
timing: 0.6

layout: image
img: https://images.unsplash.com/photo-1564089969562-7b8667a4adec?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<AllAboutPlugins />

<!-- TODO: démarer en mode j'ai un secret à vous dire -->

<!--

Donc, on vient de le voir, Vite, c'est un serveur web qui transforme nos fichiers à la demande. De base, Vite prend déjà en charge une multitude de transformations :

- HTML
- JSX
- CSS
- Static Assets
- JSON
- Glob Import
- Dynamic Import
- WebAssembly
- Web Workers

Et le plus dingue, c'est que tout ça n'est implémenté qu'à travers des plugins, via la même API que n'importe qui peut utiliser pour créer les siens.
 -->

---
name: Tout n'est que plugin - Choices
group: Feature Plugins
timing: 0.5

layout: choices
choices:
  - Du CSS importé dans un fichier TypeScript
  - Une image chargée dans un fichier TypeScript
  - import.meta.glob est une illusion
---

<!--
// et oui, pas que des thèmes, choissez quel démo vous souhaitez voir (sur la slide d'avant) (teaser du début de la slide d'avant, ou au fur et à mesure de la slide d'avant pour avoir 0 temps mort) via un overlay en bas à gauche, qui apparait ou non)
-->

---
name: Du CSS importé dans un fichier TypeScript
group: Feature Plugins
timing: 0.5

layout: bottom-left-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
import './style.css'
```

<!--
Ça ne choque plus personne, mais en JavaScript, c'est impossible d'importer du CSS dans un fichier TypeScript.

Pourtant, c'est ce qu'on fait tous les jours avec Vite.

Pourquoi ? Parce que, dans les faits, le navigateur, quand il voit un `import`, se moque pas mal de l'extension et demande le module quoi qu'il arrive, tant que le `Content-Type` de la réponse est `text/javascript`.
-->

---
name: Du CSS importé dans un fichier TypeScript - Visualisation
group: Feature Plugins
timing: 1.2

choices:
  - Vite et ses features - Récap
---

<BackgroundImage img="https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<CssImportedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarder d'un peu plus près [click] les requêtes et les réponses de notre navigateur.

On retrouve, comme tout à l'heure, notre fichier index.html qui contient un lien vers notre fichier TypeScript. Au passage, votre navigateur ne lit toujours pas de TypeScript.

Si on regarde le fichier main.ts, on se rend compte que c'est du JavaScript valide et on y retrouve le style.css.

La requête suivante, c'est justement ce style.css. Si on regarde la réponse, on se rend compte que ce n'est que du JavaScript. On y retrouve le contenu de notre fichier CSS. Le point important ici, c'est la fonction `__vite__updateStyle`, qui va se charger d'injecter le contenu de notre fichier CSS dans le `head` de notre page au moment de l'exécution du script.

Autrement dit, la transformation de notre fichier CSS natif en fichier JavaScript est entièrement gérée par un plugin, qui fait plus de 3 000 lignes. Je vous l'épargne.
-->

---
name: Une image chargée dans un fichier TypeScript
group: Feature Plugins
timing: 0.5

layout: bottom-left-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
import img from './image.png'
```

<!--
Ça ne choque peut-être personne, mais en JavaScript, c'est impossible d'importer une image dans un fichier TypeScript.

Pourtant, c'est ce qu'on peut faire avec Vite.

Pourquoi ? Parce que dans les faits, le navigateur, quand il voit un `import`, il se moque pas mal de l'extension et il demande le module, quoi qu'il arrive, tant que le `Content-Type` du retour est `text/javascript`.
-->

---
name: Une image chargée dans un fichier TypeScript - Visualisation
group: Feature Plugins
timing: 1.6

transition: slide-up
---

<BackgroundImage img="https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<AnImageLoadedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarder d'un peu plus près [click] les requêtes et les réponses dans le navigateur.

On retrouve, comme tout à l'heure, notre fichier index.html qui contient un lien vers notre fichier TypeScript. Au passage, votre navigateur ne lit toujours pas de TypeScript.

Si on regarde le fichier main.ts, on y voit l'import de différentes images.

1. La première, c'est `import` normal.
2. La deuxième, c'est toujours un `import` normal, mais pour une image qui fait moins de 4 KiB.
3. La troisième, l'URL de l'`import` contient une query `inline`.
4. La quatrième contient une query `raw`.

À votre avis, que va nous retourner Vite ?

1. Pour cette première image, on voit que Vite nous retourne un fichier JavaScript avec l'URL vers l'image pour l'utiliser dans une balise `img`, par exemple.
2. Pour la seconde aussi, c'est tout comme la première en développement.
3. Pour la troisième, en revanche, c'est différent. L'image retournée est encodée en base64. L'objectif, c'est de pouvoir inliner l'asset pour éviter une requête vers le serveur.
4. Pour la quatrième, on a carrément le contenu brut de l'image qui est renvoyé. Là, c'est pratique si vous avez besoin de faire du traitement dessus, par exemple pour un shader Three.js.
-->

---
name: Une image chargée dans un fichier TypeScript - Build
group: Feature Plugins
timing: 1.2

layout: bottom-right-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Vite et ses features - Récap
---

<AnImageLoadedIntoTypeScriptBuildTree />

<!--
Là où ça devient intéressant, c'est au moment du build.

Vous avez là l'output du build de la même application que ce qu'on a vu juste avant.

Première chose, on y voit notre image avec un hash, et c'est normal : Vite ajoute un hash dans les assets qu'il traite, exactement comme pour les fichiers JavaScript. Si vous changez l'image en gardant le même nom, le hash sera différent, et ça vous évitera les problèmes de cache.

Ce qu'on voit aussi, c'est qu'il n'y a pas notre seconde image, la tiny image. Elle a disparu ?

Regardons le fichier `index.js` d'un peu plus près.

Aaaaah, elle est là ! Au moment du build, Vite regarde la taille des assets et, s'ils font moins de 4 KiB — seuil configurable —, il les inline pour éviter une requête HTTP.

D'ailleurs, on y retrouve aussi la grosse image inline et sa version raw.
-->

---
name: import.meta.glob est une illusion
group: Feature Plugins
timing: 0.3

layout: bottom-left-card
img: https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
const modules = import.meta.glob('./**/*.vue')
```

<!--
Ça ne choque peut-être personne, mais en JavaScript, `import.meta.glob` ça n'existe pas.

C'est une création de Vite qui permet d'importer plusieurs modules en une seule fois via un glob pattern.

Dans notre cas, ça permet d'importer tous les fichiers Vue du dossier `src`.
-->

---
name: import.meta.glob est une illusion - Visualisation
group: Feature Plugins
timing: 0.8

choices:
  - Vite et ses features - Récap
---

<BackgroundImage img="https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<ImportMetaGlobIsAnIllusion class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarder d'un peu plus près [click] les requêtes et les réponses dans le navigateur pour mieux comprendre comment ça fonctionne.

Dans un premier temps, on charge notre document et le serveur Vite nous retourne un fichier index.html qui contient un lien vers notre fichier main.ts.

Ensuite, on retrouve notre fichier main.ts. Ah, surprise, il semble que notre `import.meta.glob` se soit quelque peu transformé. C'est devenu un objet qui contient, comme clés, les fichiers avec un chemin relatif à `main.ts`, et en valeur, un `import` prêt à l'emploi avec l'URL absolue du fichier.

Tout ça, c'est calculé automatiquement dans Vite par Node.js.
-->

---
name: Vite et ses features - Récap
layout: recap
---

<!--
-->

---
name: Les entrailles d'un plugin Vite
group: Inside a Plugin
timing: 0.9

layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

````md magic-move
```ts {*}{lines:true}
export default function monPlugin() {
  return {
  }
}
```

```ts {*}{lines:true}
export default function monPlugin() {
  return {
    resolveId(id) { },
    load(id) { },
    transform(code, id) { },
  }
}
```

```ts {*}{lines:true}
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
Rentrons dans le vif du sujet, parce que c'est quand même pour ça que vous êtes venus. Parlons des plugins Vite.

Avant tout, qu'est-ce que c'est ? C'est un moyen d'étendre les fonctionnalités de Vite en s'y branchant à différents moments de son cycle de vie.

Concrètement, c'est un objet [click] dans lequel on va définir des méthodes [click] qui vont être appelées par Vite, ni plus ni moins. On retrouve parmi les plus populaires `resolveId`, `load`, `transform`.

Et il ne faut pas oublier de donner un petit nom à son plugin [click] : c'est important pour le retrouver quand il y a une erreur !

Voilà, vous venez de faire votre premier plugin Vite, félicitations !
-->

---
name: Les entrailles d'un plugin Vite - Lifecycle Hooks
group: Inside a Plugin
timing: 0.1
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<!-- TODO: simplifier et porter davantage à l'essentiel avec du visuel et du highlight de ligne (ou du blur) -->

````md magic-move
```ts {*}{lines:true}
export default function monPlugin() {
  return {
    name: 'mon-plugin',
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
    config(config) {
      return config
    },
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  let config = null
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
    config(config) {
      return config
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  let config = null
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
    config(config) {
      return config
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {},
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  let config = null
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
    config(config) {
      return config
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {},
    buildEnd() {
      generateReport(config)
    },
  }
}
```
```ts {*}{lines:true}
export default function monPlugin() {
  let config = null
  return {
    name: 'mon-plugin',
    options(options) {
      return options
    },
    config(config) {
      return config
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {},
    buildEnd() {
      generateReport(config)
    },
    closeBundle() {},
  }
}
```
````

<!--
Dans un plugin Vite, il est aussi possible de se brancher sur le cycle de vie de Vite, avec des hooks comme `options`, `config`, `configResolved`, `buildStart`, `buildEnd` et `closeBundle`.

1. [click] `options` est appelé tout au début. On l'utilise souvent pour modifier la configuration avant qu'elle ne soit réellement exploitée.
2. [click] `config` est appelé juste après et permet, lui aussi, d'ajuster la configuration avant sa résolution finale. C'est un hook spécifique à Vite.
3. [click] `configResolved` intervient une fois la configuration complètement calculée. On peut alors récupérer la version finale, celle que Vite va utiliser.
4. [click] `buildStart` est appelé au démarrage du processus, y compris en développement. C'est souvent un bon moment pour initialiser des ressources.
5. [click] `buildEnd` est appelé à la fin du processus, en développement comme en production. On l'utilise souvent pour déclencher des effets de bord.
6. [click] `closeBundle` est appelé tout à la fin du build de production. C'est plus rare, mais parfois très pratique pour les derniers nettoyages.
-->

---
name: resolveId
group: Inside a Plugin
timing: 0

layout: bottom-right-card
img: https://images.unsplash.com/photo-1614521185607-c374b6c5609c?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
export function myPlugin() {
  return {
    name: 'my-plugin',
    resolveId(id) {
      if (id.endsWith('.vue')) {
        return id
      }
    },
  }
}
```

<!--
Ce premier hook est, à mon sens, le plus abstrait, et probablement le moins intuitif. Si vous ne le saisissez pas tout de suite, pas d'inquiétude : on va le recroiser.

Son rôle, c'est de résoudre un identifiant de module vers son véritable chemin, sur le disque ou de manière virtuelle, en retournant un nouvel identifiant... ou parfois exactement le même.

Et justement, pourquoi retourner le même identifiant ? Parce que pour un import donné, Vite parcourt les plugins et exécute `resolveId`. Au premier qui répond, il s'arrête et utilise cet identifiant pour les étapes suivantes. Donc même si vous ne changez pas l'ID, vous pouvez déjà revendiquer : "c'est moi qui gère ce module".

Ça permet d'éviter qu'un autre plugin interfère ensuite. Ce n'est pas le hook dont on a besoin tous les jours, mais quand on en a besoin, on est bien content qu'il existe.
-->

---
name: load
group: Inside a Plugin
timing: 0

layout: bottom-right-card
img: https://images.unsplash.com/photo-1771793079105-0a3ec959454a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

````md magic-move
```ts {*}{lines:true}
import { readFile } from 'node:fs/promises'

export function myPlugin() {
  return {
    name: 'my-plugin',
    async load(id) {
      return await readFile(id, 'utf-8')
    }
  },
}
```
```ts {*}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    async load(id) {
      return await fetch(`https://api.example.com/modules/${id}`)
        .then(res => res.text())
    }
  },
}
```
```ts {*}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    async load(id) {
      return "export default 'Hello World'"
    }
  },
}
```
````

<!--
Ce second hook, c'est le plus simple à comprendre. Il permet de charger le contenu d'un module à partir de son identifiant.

Par défaut, Vite va lire le fichier sur le disque. Dans les faits, on peut le charger d'où on veut [click], comme depuis une API.

C'est même possible de retourner un fichier qui n'existe pas sur le disque [click]. Dans ce cas, on parle de module virtuel.
-->

---
name: transform
group: Inside a Plugin
timing: 0
layout: bottom-right-card
img: https://images.unsplash.com/photo-1766431612750-30abe9de0eab?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

````md magic-move
```ts {*}{lines:true}
export function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      return code.replace('foo', 'bar')
    }
  },
}
```
```ts {*}{lines:true}
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
Enfin, il est temps de parler du hook `transform`, qui est le plus puissant et le plus utilisé.

L'idée est simple : modifier à la volée le code source d'un module avant qu'il ne soit retourné au navigateur. Ici, on vient remplacer tous les `foo` par des `bar`.

Alors, vous vous dites que c'est un exemple très simple, et c'est vrai.

Mais c'est avec cette même fonction [click] que les fichiers `.vue` sont transformés en JavaScript standard que le navigateur peut comprendre.
-->

---
name: La théorie des plugins Vite
group: Inside a Plugin
timing: 0.3
class: p-0!
---

<VitePluginsTheory />

<!--

Maintenant que vous avez une meilleure idée de ce qu'est un plugin Vite, plongeons vraiment dans son fonctionnement. Que se passe-t-il quand vous faites `npm run dev` ?

Au démarrage, Vite exécute d'abord les hooks liés au cycle de vie global, comme `options`, `config`, `configResolved` et `buildStart`. Ceux-là ne s'exécutent qu'une seule fois pour lancer la machine.

Ensuite, à chaque requête HTTP pour un module, on entre dans la vraie pipeline : `resolveId`, puis `load`, puis `transform`.

L'identifiant dont on parle ici, c'est généralement le chemin absolu du module que Vite est en train de traiter.

Il y a tout de même une subtilité importante : pour `resolveId`, le premier plugin qui répond gagne ; même chose pour `load`. En revanche, `transform`, lui, passe entre les mains de tous les plugins concernés, dans l'ordre.

Et c'est précisément pour ça que `resolveId` est si utile : il permet de verrouiller l'identité d'un module pour s'assurer que ce sera bien votre plugin qui prendra la main ensuite.
-->

---
name: Le plugin Vite - Récap
layout: recap
---

<!-- TODO: ne va pas là, peut aller après des examples concrets -->

---
name: Vue Plugin - Exemple
group: Concrete Examples
timing: 1.7
layout: center-card
img: https://images.unsplash.com/photo-1762281311105-05c0dbc6ff6f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

<!--
Maintenant, passons à la pratique en regardant concrètement le fonctionnement du plugin Vue pour Vite.

Tout commence par `main.ts`, qui importe `App.vue`. Vite reçoit la requête et la fait passer dans sa pipeline de plugins. Le hook `resolveId` du plugin Vue intercepte les requêtes concernées, `load` lit le fichier `.vue` sur le disque, puis `transform` compile les différentes parties du SFC en JavaScript standard compréhensible par le navigateur.

Et ensuite, en fonction des changements que vous faites dans votre composant, le plugin est capable de faire du HMR granulaire. Autrement dit, si vous modifiez uniquement le template, seul le template est recompilé et mis à jour dans le navigateur, sans toucher au script ni au style. C'est exactement ce qui rend le développement avec Vite aussi rapide et agréable.

Et là, vous vous dites peut-être qu'il serait quand même pratique de visualiser toute cette pipeline. Je suis bien d'accord avec vous... [click]
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Exemple
group: Concrete Examples
timing: 0.8

layout: top-right-card
img: https://images.unsplash.com/photo-1763930677801-5387d376496e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
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

<PluginName
  name="unplugin-auto-import"
  github="https://github.com/antfu/unplugin-auto-import"
  class="absolute bottom-10 right-10"
/>

<!--
Excellent choix parce que ce plugin là, je l'adore. Concrètement, vous n'avez plus besoin d'importer quoi que ce soit, c'est automatique.

Par exemple, ce code-là, qui utilise la réactivité de Vue, fonctionne parfaitement alors qu'il n'y a aucun import. Pourquoi ? Tout simplement parce que le plugin va scanner votre code et automatiquement injecter les imports nécessaires. Le point essentiel, c'est que ce n'est pas de l'injection globale, c'est à la demande (on‑demand), donc il n'y a dans votre bundle que ce que vous utilisez vraiment.

Vous êtes sûrement en train de vous dire que c'est quand même un peu magique, tout ça ?
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Visualisation
group: Concrete Examples
timing: 0.7
transition: slide-up
---

<AutoImportPluginExplainedVisually />

<!--
TODO: texte de la slide
-->

---
name: Auto Import Plugin (unplugin-auto-import) - Plugin Internals
group: Concrete Examples
timing: 0.7
choices:
  - Visualiser la pipeline
---

<!--
Alors, c'est vrai qu'on peut parfois confondre ce genre d'outil avec une simple transformation de compilateur, mais ici, aucun doute : c'est bien un plugin Vite.

Pour le vérifier, soulevons un peu le capot. Dans un premier temps, Vite charge le fichier, puis le plugin scanne le code dans le hook `transform` et retourne une nouvelle version avec les imports injectés. Toute la partie « on-demand » de la promesse est là.

Là, vous êtes sûrement en train de vous dire que c'est pratique de visualiser la pipeline de la sorte. Et ça tombe bien... [click]
-->

---
name: Visualiser la pipeline
group: Concrete Examples
timing: 0.3

---

<BackgroundImage img="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<Card absolute top-14 inset-x-10 -bottom-10>
  <h2 class="text-center mb-2 text-neutral-700">vite-plugin-inspect</h2>
  <iframe src="/__inspect" class="rounded-lg overflow-hidden w-full h-full" />
</Card>

<!--
Parce qu'il existe un plugin permettant de visualiser l'ensemble de la pipeline de Vite.

Je l'utilise rarement mais c'est véritablement lui qui m'a permis de comprendre le fonctionnement et la philosophie de Vite.
 -->

---
name: Un plugin pour virtualiser
group: Virtualization
timing: 1

transition: slide-up
---

<VirtualizationExplainedVisually />

<!--
L'une des grandes possibilités offertes par Vite, et très utilisée dans les plugins, c'est cette capacité à générer des modules virtuels.

Le mieux pour comprendre ça, c'est de le visualiser. D'un côté, prenons notre navigateur ; de l'autre, prenons notre système de fichiers. Entre les deux, plaçons Vite et observons les requêtes HTTP.

Pour les deux premières, c'est du classique : on y voit `index.html` et `main.ts`. Maintenant, si on regarde dans `main.ts`, on y voit `import 'virtual:my-module'`. Le truc, c'est que si on cherche ce fichier dans notre système de fichiers, il n'existe pas. Et ce n'est pas non plus dans les `node_modules`, sinon Vite l'aurait traité différemment.

Pourtant, si on regarde la réponse, Vite a bien renvoyé quelque chose.
-->

---
name: Un plugin pour virtualiser - Plugin Internals
group: Virtualization
timing: 0.8

layout: bottom-center-card
img: https://images.unsplash.com/photo-1710020603990-0c984e7811f3?q=80&w=3268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts {*}{lines:true}
export default function myPlugin() {
  return {
    name: 'my-plugin',
  }
}
```
```ts {*}{lines:true}
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
  }
}
```
```ts {*}{lines:true}
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin',
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
Alors comment ça fonctionne ?

Tout part d'un module dans lequel on va utiliser deux hooks pour simuler l'existence d'un fichier sur le disque.

Le premier, `resolveId`, permet de déterminer l'identité du module et, par convention, on va venir la préfixer avec un `\0`.

Ensuite, et c'est là que tout se joue, on utilise le hook `load`. On a l'habitude d'y lire des fichiers, mais cette fois-ci, on va créer nous-mêmes le code du module. On écrit dans une string `export const msg = "from virtual module"`, et ce module n'existe pas sur le disque : il n'existe que pour Vite, d'où son appellation de virtuel.
-->

---
name: Un plugin pour virtualiser - Choices
group: Virtualization
timing: 0.5

choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icônes virtuelles
  - Infos Plugin - Des infos virtuelles
---

<!--
Le portail est ouvert ; reste à choisir quelle illusion explorer.

"Vue Router - Un module virtuel" montre comment des routes entières peuvent émerger du filesystem.
"VitePress - Des data virtuels" révèle comment injecter des données calculées au build.
"Icons Plugin - Des icônes virtuelles" transforme un simple import en bibliothèque d'icônes quasi infinie.
"Infos Plugin - Des infos virtuelles" fait entrer le temps et Git directement dans votre code.
-->

---
name: Vue Router - Un module virtuel
group: Virtualization
timing: 0.6

layout: bottom-center-card
img: https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts {*}{lines:true}
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
Vue Router, c'est le router officiel de Vue.js. Depuis quelque temps, il dispose d'un plugin pour Vite qui permet de générer automatiquement les routes de son application à partir de la structure de son dossier `src/pages`.

À la ligne 3, on importe `routes` depuis `vue-router/auto-routes`. Le truc, c'est que le package `vue-router` ne contient pas toutes les routes de toutes les applications. En réalité, `vue-router/auto-routes` n'existe pas : c'est un module virtuel.
-->

---
name: Vue Router - Un module virtuel - Plugin Internals
group: Virtualization
timing: 0.7

layout: bottom-center-card
img: https://images.unsplash.com/photo-1654119862536-9f1dde8ea53f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Les autres capacités des plugins
---

````md magic-move
```ts
export default function autoRoutes() {
  return {
    name: 'auto-routes',
  }
}
```
```ts
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
```ts
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
Si on se plonge dans les entrailles du plugin, on retrouve la même structure que tout à l'heure. Sur le resolveId, on récupère notre ID `vue-router/auto-routes` et on le préfixe avec \0, c'est la convention de Rollup pour les modules virtuels.

Ensuite, c'est dans le hook `load` que tout se joue. On va venir lire le contenu du dossier `src/pages`, le traiter pour générer les routes de notre application, puis retourner le code JavaScript qui exporte ces routes. Automatiquement, les routes sont définies, et le développeur n'a plus à les écrire manuellement.
-->

---
name: VitePress - Des data virtuels
group: Virtualization
timing: 0.9

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
timing: 0.5
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
timing: 0.5
layout: center-card
img: https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```vue
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
Vous avez sûrement l'habitude d'utiliser des icônes via des SVG, des fonts, ou directement des librairies d'icônes via npm. C'est chouette, mais vous êtes limités aux icônes contenues dans ce que vous utilisez.

Avec `unplugin-icons`, vous avez accès à plus de 200 000 icônes à la demande.

Vous le voyez, vous écrivez le chemin vers votre icône et, automagiquement, elle va être chargée et s'afficher [click].
-->

---
name: Icons Plugin - Des icônes virtuelles - Plugin Internals
group: Virtualization
timing: 0.6

layout: center-card
img: https://images.unsplash.com/photo-1643391144986-22915262cb85?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Les autres capacités des plugins
---

````md magic-move
```ts {*}{lines:true}
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'icons',
    },
  ],
})
```
```ts {*}{lines:true}
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
```ts {*}{lines:true}
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
Sous le capot, c'est un jeu de modules virtuels, et on y retrouve la même structure que tout à l'heure. Le gros changement est dans la fonction `load`, où il va utiliser `loadIcon` d'Iconify pour charger l'icône à la demande. Et c'est ça le vrai changement : pas besoin de charger une librairie de 100 Mo dans votre frontend, plus de limites sur les icônes que vous pouvez utiliser, et votre serveur Vite continue à être rapide au démarrage.
-->

---
name: Infos Plugin - Des infos virtuelles
group: Virtualization
timing: 0.5

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
timing: 0.6

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
timing: 1.9

choices:
  - Le HMR (Hot Module Replacement)
  - Le middleware - Un fichier virtuel
  - Run Plugin - Un plugin pour exécuter des commandes
  - Virtual Plugin - Un plugin pour virtualiser des modules
  - Laravel Vite - La communication inter-processus
  - unplugin-macro - Un plugin pour créer des macros
  - Nitro - Un backend
---

<!-- TODO: trop de choix (voir pour tout faire sauter dans le pire des cas, réduire les choix en fonction de la conférence ? intégrer les explications dans les sldies) -->
<!-- TODO: grosse frustration parce que tous n'explore pas les même choses (on peut pas tout faire -->

<!--
Vous souhaitez donc en savoir plus sur les plugins Vite et ses capacités avancées ? Vous êtes au bon endroit !

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
timing: 0.5
transition: slide-up
---

<BackgroundImage img="https://images.unsplash.com/photo-1559762691-617a33825bc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

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
timing: 0
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
timing: 1

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
timing: 1.2

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
timing: 0.2

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
name: Virtual Plugin - Un plugin pour virtualiser des modules
group: Advanced Capabilities
timing: 0.9

layout: bottom-center-card
transition: slide-up
---

```ts {*}{lines:true}
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
Avec Vite, il est possible de créer des modules virtuels, c'est-à-dire de renvoyer au navigateur du code qui n'existe pas sur le disque. La requête est interceptée avant que Vite ne tente de charger le fichier, et le plugin peut retourner du code à la volée.

Par exemple, on peut l'utiliser pour injecter des données au build time, comme un commit git, le résultat d'une API, une configuration particulière, etc.

Le truc, c'est que devoir faire à la main un plugin pour chaque module virtuel, ça peut vite devenir pénible, et `vite-plugin-virtual` est là pour ça. Rien à configurer : juste un mapping entre le nom du module virtuel et le code à retourner, et le tour est joué !
-->

---
name: Virtual Plugin - Un plugin pour virtualiser des modules - Plugin Internals
group: Advanced Capabilities
timing: 0.4

choices:
  - Récap des récap
---

```ts {*}{lines:true}
import defineConfig from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'virtual',
      resolveId(id) {
        if (id.startsWith('virtual:')) {
          return `\0${id}`
        }
      },
      load(id) {
        if (id === '\0virtual:git:commit') {
          const commit = execSync('git rev-parse HEAD').toString().trim()
          return `export default "${commit}"`
        }
        if (id === '\0virtual:api:data') {
          const res = await fetch('https://api.example.com/data')
          const data = await res.json()
          return `export default ${JSON.stringify(data)}`
        }
      }
    }
  ]
})
```

<!--
Plus concrètement, un plugin comme `vite-plugin-virtual` est implémenté comme un plugin de module virtuel, avec les hooks `resolveId` et `load`, en suivant les conventions de Rollup.

On va boucler sur toutes les clés dans `resolveId` pour voir si l'import correspond à l'une d'elles, puis faire pareil dans `load` pour trouver la valeur associée et la retourner.
-->

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0.6

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
timing: 0.5

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
timing: 0.8

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
timing: 0.4

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
timing: 0.5

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
timing: 0.2

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
layout: recap
---

<!--  -->

---
name: Dans les profondeurs de la pipeline
group: Deep Dive
timing: 0.1
---

<!-- TODO: une unique slide sur les petites choses en plus à savoir, à dive, mais qui dépasse le scope -->
<!-- TODO: vous avez vu 90% et la suite, ça puorrait 6etre ça -->

<InTheDepthsOfThePipeline class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<!-- TODO: potentiellement, ce contenu là, est déjà dit ailleurs -->

<!--
Depuis le début, on s'est intéressé à ce qu'il se passe au sein d'un plugin, mais on n'a jamais vraiment regardé la manière dont Vite les orchestre.

Cette fois, on va entrer à l'intérieur de la machine.

Quand une requête arrive, Vite fait d'abord passer le module dans `resolveId`. Là, le premier plugin qui répond prend la main et fixe l'identité du module.

Ensuite, Vite passe à `load`. Même logique : le premier plugin capable de fournir le contenu gagne.

Puis vient `transform`, et cette fois, tout le monde peut participer. Le code traverse les plugins les uns après les autres, chacun pouvant le modifier à son tour.

Et là, vous vous demandez sûrement : "ok, est-ce qu'on peut réorganiser l'ordre d'exécution des plugins ?"
 -->

---
name: Les plus de la pipeline
group: Deep Dive
timing: 0.2
layout: bottom-left-card
img: https://images.unsplash.com/photo-1553356126-71d9da2295e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'my-plugin',
    },
  ]
})
```
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'my-plugin',
      enforce: 'pre',
    },
  ]
})
```
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'my-plugin',
      enforce: 'post',
    },
  ]
})
```
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vite:vue',
    },
  ]
})
```
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vite:vue',
    },
    {
      name: 'my-plugin',
      enforce: 'pre',
    }
  ]
})
```
```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'vite:vue',
    },
    {
      name: 'my-plugin',
      enforce: 'post',
    }
  ]
})
```
````

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
Je vous ai un peu menti.

Pour filtrer les requêtes dans les hooks `resolveId`, `load` et `transform`, on peut utiliser un simple `if` et le tour est joué.

Si cette solution semble simple, elle est en réalité assez inefficace, parce qu'elle oblige quand même à invoquer le hook pour chaque requête. Maintenant qu'une partie du bundler est en Rust, ça introduit un overhead non négligeable.

Du coup, on peut extraire le filtrage en amont. Dans ce cas, on peut complètement bypasser le plugin pour les requêtes qui ne matchent pas le filtre, et ça évite de faire un aller-retour entre Rust et Node.js pour rien.
-->

<!--
Justement, oui : il est possible d'influer sur l'ordre d'exécution des plugins.

Le plugin le plus simple, il ressemble à ça. Si on veut l'exécuter avant tous les autres, on peut lui ajouter [click] `enforce: 'pre'`. Si, au contraire, on veut l'exécuter après tous les autres, on peut lui ajouter [click] `enforce: 'post'`.

Alors, vous vous demandez sûrement le cas d'usage. [click]

Imaginez une pipeline avec le plugin Vue. Si on veut agir sur le code du composant SFC avant la transformation de Vue, on peut utiliser [click] `enforce: 'pre'`. Si, au contraire, on veut agir sur le code après la transformation de Vue, on peut utiliser [click] `enforce: 'post'`.
 -->

---
name: Conclusion
---

<!-- TODO: juste une punch finale, ce que les gens doivent retenir -->

---
name: Votre tour
---

<!-- TODO: En 45 minutes, vous avez découvert le nécessaire pour réaliser votre plugin Vite -->

---
name: Outro
timing: 0.7
layout: outro2
---

<!-- TODO: je crois qu'on s'en fou de tout ça -->
<!-- TODO: qr de fin, ma tête, qui je suis, où me retrouver et potentiellement les articles  -->

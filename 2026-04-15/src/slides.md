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
timing: 0.6
---

<!--
À lire pour comprendre la construction de ce talk.

Ce talk place l'audience au centre : ce sont les spectateur·rice·s qui choisissent le déroulé. Les choix du public déterminent les slides affichées.

Important : tous les chemins sont déjà écrits — il n'y a pas de création de contenu à la volée. La vue d'ensemble se trouve dans .data/slides.graph.svg (et .data/slides.graph.txt pour la version mermaid) ; elle représente toutes les slides et leurs liens. Certaines boucles peuvent sembler exister, mais les participants ne peut pas visiter deux fois la même slide, sauf pour les slides de choix.

Ces fichiers sont générés à partir de ce fichier slides.md, qui contient l'ensemble des slides et les liens définis via la clé `choices` de chaque slide. Une slide sans clé `choices` est suivie automatiquement par la slide suivante dans l'ordre du fichier.

Le vote se fait via Inalia : la slide suivante sera celle qui aura obtenu le plus de voix.
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
name: Inalia
layout: inalia-overview
group: Introduction
timing: 0.8
ready: true
---

<!--

Avant d'aller plus loin, je vous invite à scanner ce QR code. Il vous amènera sur une page où vous allez pouvoir retrouver mes réseaux, répondre à des questions, pour le moment, ne le faites pas, poser des questions pour que je puisse y répondre en live pendant la présentation, donner votre avis, mais pour être objectif, je vous recommande de le faire à la fin, même si on sait que ça va être bien !

Et puis, vous pouvez même réagir en direct à ce que je dis, si vous trouvez ça drôle, si vous aimez, ou si simplement vous êtes d'accord.

-->

---
name: Intro
layout: intro
intro: Ingénieur chez <span class="i-custom-takima inline-block size-5 align-text-top"></span> Takima
group: Introduction
timing: 0.5
ready: true
---

<!--
Je m'appelle Estéban. Je suis ingénieur logiciel chez Takima.

Je gravite principalement autour des écosystèmes de Laravel, Vite, Vue, Nuxt, Spring et Kotlin.

Quand il me reste du temps libre, j'écris des articles. Le dernier en date est sur ma victoire au Hackathon Mistral AI.

Et puis vous pouvez me retrouver sur tous les réseaux, sur mon site ou même sur Discord où j'y partage ma veille.
-->

---
name: Faisons Connaissance
group: Introduction
ready: true
---

<!-- <Inalia :questionId="1" /> -->

<!--
Ceci étant dit, est-ce qu'on ne ferait pas davantage connaissance ?

Quel est votre rapport à Vite ? Est-ce que vous l'utilisez ? Est-ce que vous avez déjà créé un plugin Vite ? Est-ce que vous avez déjà publié un plugin Vite sur npm ?

Je vous invite à répondre à la première question sur la page sur laquelle vous êtes arrivés juste avant ou à scanner le QR code juste ici.

TODO: 3 questions sur Inlia.
- qui a déjà utilisé Vite ? (avoir une réponse : "Je fais du Next.js")
- qui a déjà créé un plugin Vite ?
- qui a déjà publié sur npm un plugin Vite ?
-->

---
name: Vite
group: Vite Core
timing: 0.8
ready: true
layout: center-card
img: /vite-background.png
transition: slide-up
---

<img src="/vite-logo-color-dark.svg" />

::outside::

<ViteEcosystem />

<!--

Mais aujourd'hui, ce n'est ni de moi ni d'Inalia dont nous allons parler. Aujourd'hui, c'est Vite qui va être à l'honneur.

On l'a vu au début, vous êtes une large majorité à utiliser Vite. Et c'est normal, Vite est un outil présent dans absolument tout [click] le paysage frontend, et même backend. Que vous fassiez du React, du Vue, du Svelte, du Node.js, du Deno, du Cloudflare Workers, Vite est là. Vous pouvez même faire du Laravel, du Nitro ou du Adonis que Vite serait là aussi. Depuis 2020, Vite est devenu un véritable incontournable, aussi bien pour le frontend que pour le backend.

-->

---
name: Vite Growth
group: Vite Core
timing: 0.9
ready: true
---

<GrowthChart />

<!--
Incontournable oui mais à quel point ?

La première release de Vite, c'est 2020 et aujourd'hui, il atteint le chiffre stratosphérique de [click] 60 millions de téléchargement par semaine.

Sauf que, je vous connais, vous allez me dire: ok, mais ça représente quoi 60 millions ?

Regardons du côté de [click] Webpack, le bundler historique. Aujourd'hui, il est autour de 35 millions et s'est fait dépasser en juillet 2025.

On peut aussi regarde du côté de [click] Rspack, développé par ByteDance, maison mère de TikTok, qui atteint difficilement les 10 millions de téléchargements par semaine.

Et puis, pour ceux qui ont suivi mes dernières conférences, même [click] is-string s'est fait dépasser.

C'est donc très clair, Vite est largement au dessus en terme d'adoption.
-->

---
name: Vite Growth - Choices
group: Vite Core
timing: 0.9
ready: true
layout: choices
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

---
name: Les origines de Vite
group: Vite Core
timing: 1.5
ready: true
layout: bottom-left-card
img: /vite-documentary-background.gif
choices:
  - Le fonctionnement de Vite
---

<v-click>

```ts
import {} from 'my-module'
```

</v-click>

<!--

TODO: Pourquoi ça fonctionne ? (à voir si on le met dans les origines ou dans le fonctionnement)

> Dans la spécification ECMAScript Modules utilisée par les navigateurs, un import doit charger une ressource JavaScript valide (avec Content-Type: text/javascript ou équivalent). Si un navigateur télécharge directement un fichier .css depuis un import JS, il échoue avec une erreur du type :

 -->

<!--

Pour bien comprendre ce qu'est Vite et le problème résolut, il faut qu'on revienne en 2018.

Cette année marque un tournant majeur parce qu'elle voit la standardisation [click] des modules ECMAScript. Concrètement, ça signifie qu'on a un moyen unifié pour importer et exporter du code JavaScript, que ce soit dans le navigateur ou dans Node.js. Mieux encore, on a enfin un moyen natif pour importer du code dans le navigateur, module par module.

C'est peut-être un détail pour vous mais ça change tout. Au paravent, on était obligé de bundler nos fichiers JavaScript pour n'avoir qu'un unique fichier à importer dans le navigateur. Pour faire ça, l'outil le plus populaire c'était Webpack.

Sauf que bundler toute notre application à chaque changement, c'était lent. Tellement lent qu'Evan You a considéré que ça n'atteignait pas ses standards de qualités pour la communauté Vue.js.

Et une idée lui est venu en tête. Et si, on profitait de ces modules ECMAScript pour ne pas faire du bundling en développement et juste les servir tel quel ?

C'est comme ça qu'est né Vite en 2020 et c'est ce qui le rend si rapide au démarrage.

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
On sait ce qu'est Vite. On sait d'où ça vient. Il nous reste une question, comment est-ce que ça fonctionne ?

J'aurai pu vous faire une slide avec quelques bullets points mais je me suis dit qu'en 2026, on pouvait faire mieux et directement demander à une IA. [enter] Alors demandons lui. [enter]

On apprends que Vite est un remplacent de Webpack, qu'il utilise les capacités natives du navigateur comme les modules ECMAScript, ESM pour les intimes et qu'en développement, il ne bundle pas notre application.

Oh, intéressant, Vite transforme les fichiers sur demande avant de les renvoyer. Gardons le dans un coin de notre tête.

Bon bah voilà, vous savez tout.

Nan, parce que c'est bien sympa tout ces explications mais c'est pas très visuelle. [click]
-->

---
name: Le fonctionnement de Vite - Visualisation
group: Vite Core
timing: 2.2
ready: true
layout: full
---

<ViteExplainedVisually />

<!--
Tout commence par [click] un navigateur d'un côté et [click] des fichiers de l'autre. On peut se balader dedans et regarder le contenu des fichiers. C'est un template Vue et TypeScript, rien d'extraordinaire.

Entre les deux, on va placer [click] Vite. Le navigateur et Vite vont [click] communiquer en HTTP, Vite va [click] lire les fichiers dans le système de fichier et puis tant qu'on y est, [click] démarrons Vite.

Maintenant, revenons dans notre navigateur pour [click] accéder à localhost:5173 et regardons les requêtes et les réponses.

[click] Alors la première évidemment, c'est pour charger le document. Si on regarde la réponse, c'est le fichier index.html, avec le script main.ts et le client Vite en plus par rapport au fichier sur le disque.

[click] Ensuite, c'est le fichier main.ts qui est chargé. On y voit trois imports, l'un pour un fichier style.css, un pour Vue, dont le chemin d'accès s'est fait transformé, et un dernier pour le composant Vue.

Tiens ? Je savais pas qu'on pouvait importer dans le navigateur des fichiers CSS et des fichiers Vue ! Génial !

Dans les logs, on découvre ensuite [click] le chargement du fichier CSS, puis [click] de Vue, et finalement, [click] de notre fichier Vue.

Par curiosité, qu'est ce que renvoie Vite pour le fichier CSS et Vue ?

Ah ! Alors ça, c'est étonnant, c'est du JavaScript. En fouillant un peu, on y retrouve quand même notre fichier de départ.

Mais c'est donc ça, la transformation sur demande que réalise Vite dont on a entendu parler juste avant ?

C'est génial ! Mais comment est-ce que ça fonctionne ?

Et bien, vous faites bien de poser la question, c'est tout l'objectif de cette conférence, [click] comprendre ce qu'il se passe dans Vite.
-->

---
name: Le fonctionnement de Vite - Choices
group: Vite Core
timing: 0.1
layout: choices
choices:
  - Le pré-bundling avec Esbuild
  - Tout n'est que plugin
  - Les entrailles d'un plugin Vite
---

<!--

TODO: écrire le texte pour le choix

-->

---
name: Le futur de Vite
group: Vite Core
timing: 1
ready: true
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
name: Tout n'est que plugin
group: Feature Plugins
timing: 0.6
ready: true
layout: image
img: https://images.unsplash.com/photo-1564089969562-7b8667a4adec?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<AllAboutPlugins />

<!--

Donc, on vient de le voir, Vite, c'est un serveur web qui transforme nos fichiers à la demande. Out-of-the-box, Vite supporte une multitude de transformations :

- HTML
- JSX
- CSS
- Static Assets
- JSON
- Glob Import
- Dynamic Import
- WebAssembly
- Web Workers

Et le plus dingue, c'est que tout ça, ce n'est implémenté qu'à travers des plugins via la même API que chacun peut utiliser pour faire ses propres plugins.

 -->

---
name: Tout n'est que plugin - Choices
group: Feature Plugins
timing: 0.4
layout: choices
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
timing: 0.5
ready: true
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

Pourquoi ? Parce que les faits, le navigateur, quand il voit un `import`, il se moque pas mal de l'extension et il demande le module, quoi qu'il arrive, tant que le le `Content-Type` du retour est `text/javascript`.
-->

---
name: Du CSS importé dans un fichier TypeScript - Visualisation
group: Feature Plugins
timing: 1.3
ready: true
choices:
  - Les entrailles d'un plugin Vite
---

<BackgroundImage img="https://images.unsplash.com/photo-1579792685643-a4bb28186899?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<CssImportedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarde d'un peu plus proche [click] les requêtes et aux réponses le notre navigateur.

On retrouve, comme tout à l'heure, notre fichier index.html qui contient un lien vers notre fichier TypeScript. Au passage, votre navigateur ne lit toujours pas de TypeScript.

Si on regarde le fichier main.ts, on se rend compte que c'est du JavaScript valide et on y retrouve le style.css.

La requête suivant, c'est justement ce style.css. Si on regarde la réponse, on se rend compte que ce n'est que du JavaScript. On y retrouve ici le contenu de notre fichier CSS. Le point important ici c'est la fonction `__vite__updateStyle` qui va se charger d'injecter le contenu de notre fichier CSS dans le `head` de notre page au moment de l'execution du script.

Autrement dit, la transformation de notre fichier CSS natif pour en faire un fichier JavaScript est entièrement géré par un plugin, qui fait plus de 3 000 lignes, je vous l'épargne.
-->

---
name: Une image chargée dans un fichier TypeScript
group: Feature Plugins
timing: 0.5
ready: true
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
ready: true
transition: slide-up
---

<BackgroundImage img="https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<AnImageLoadedIntoTypeScript class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarder d'un peu plus proche [click] les requêtes et les réponses dans le navigateur.

On retrouve, comme tout à l'heure, notre fichier index.html qui contient un lien vers notre fichierTypeScript. Au passe, votre navigateur ne lit toujours pas de TypeScript.

Si on regarde le fichier main.ts, on y voit l'import de différentes images.

1. La première, c'est `import` normal.
2. Le second, c'est toujours un `import` normal mais pour une image qui fait moins de 4KiB.
3. La troisième, l'URL de l'`import` contient une query `inline`.
4. La quatrième contient une query `raw`.

À votre avis, que va nous retourner Vite ?

1. Pour cette première image, on voit que Vite nous retourne un fichier JavaScript avec l'URL vers l'image pour l'utiliser dans une balise `img` par example.
2. Pour la seconde aussi, c'est tout comme la première en développement.
3. Pour la troisième en revanche, c'est différent. L'image retournée est en base64. L'objectif, c'est de pouvoir inliner l'asset pour éviter une requête vers le serveur.
4. Pour la quatrième, on a carrément l'image en binaire qui est renvoyée. Là, c'est pratique si vous avez besoin de faire du traitement dessus, si c'est un shader pour Three.js par example.
-->

---
name: Une image chargée dans un fichier TypeScript - Build
group: Feature Plugins
timing: 1.1
ready: true
layout: bottom-right-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
choices:
  - Les entrailles d'un plugin Vite
---

<AnImageLoadedIntoTypeScriptBuildTree />

<!--
Là où ça devient intéressant, c'est au moment du build.

Vous avez là l'output du build de la même application que ce qu'on a vu juste avant.

Première chose, on y voit notre image avec un hash et c'est normal, Vite ajoute un hash dans les assets qu'il processe, exactement comme pour les fichiers JavaScript. Si vous changer l'image en gardant le même nom, le hash sera différent et donc ça vous éviter les problèmes de caches.

Ce qu'on voit aussi, c'est qu'il n'y a pas notre seconde image, la tiny image. Elle a disparu ?

Regardons le fichier `index.js` d'un peu plus près.

Aaaaah, elle est là ! Au moment du build, Vite regarde la taille des assets et s'ils font moins de 4KiB, configurable, il les   inline pour éviter une requête HTTP.

D'ailleurs, on y retrouve aussi la grosse image d'inlinée et sa version raw.
-->

---
name: import.meta.glob est une illusion
group: Feature Plugins
timing: 0.3
ready: true
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

Dans notre cas, ça permet d'importer tous les fichiers Vue du dossier src.
-->

---
name: import.meta.glob est une illusion - Visualisation
group: Feature Plugins
timing: 0.8
ready: true
choices:
  - Les entrailles d'un plugin Vite
---

<BackgroundImage img="https://images.unsplash.com/photo-1667502102967-b952788b714e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<ImportMetaGlobIsAnIllusion class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ce que je vous propose, c'est de regarder d'un peu plus proche [click] les requêtes et les réponses dans le navigateur pour mieux comprendre comment ça fonctionne.

Dans un premier temps, on charge notre document et le serveur Vite nous retourne un fichier index.html qui contient un lien vers notre fichier main.ts.

Ensuite, on retrouve notre fichier main.ts. Ah, surprise, il semble que notre `import.meta.glob` se soit quelque peut transformé. C'est devenu un objet qui contient en clé, le fichier avec un chemin relatif au main.ts et en valeur, un `import` prêt avec l'url absolue du fichier.

Tout ça, c'est calculé dans Vite par Node automatiquement.
-->

---
name: Le pré-bundling avec Esbuild
group: Vite Core
timing: 1.4
ready: true
---

<BackgroundImage img="https://images.unsplash.com/photo-1556139918-9b92e8b00105?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<PreBundlingWithEsbuild class="absolute top-20 left-40 -right-px -bottom-px" />

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

-->

---
name: Le pré-bundling avec Esbuild - Résolution
group: Vite Core
timing: 0.7
ready: true
choices:
  - Les entrailles d'un plugin Vite
---

<BackgroundImage img="https://images.unsplash.com/photo-1556139918-9b92e8b00105?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

<PreBundlingWithEsbuildSolved class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Heureusement, Vite lors de son scannage va automatiquement pré-bundler toutes les dépendances qu'il va trouver. Autrement dit, il va générer un unique fichier JavaScript pour chaque dépendance. [click] Et voilà, une unique requête pour charger lodash !

Pourquoi c'est important ? Pour les mêmes raisons qu'il est déconseillé de faire des n+1 à votre base de données. Le réseau ajoute une surcharge non négligeable et votre navigateur est limité à un nombre de requêtes simultanées. Plus vous faites de requêtes, plus votre application sera lente à démarrer. Et dans ce cas-là, on ne parle pas de quelques millisecondes, mais de secondes.
-->

---
name: Les entrailles d'un plugin Vite
group: Inside a Plugin
timing: 0.1
layout: bottom-left-card
img: https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

<!-- TODO: second slide avec les hooks de lifecycle -->

---
name:  Les entrailles d'un plugin Vite - Choices
group: Inside a Plugin
timing: 0
layout: choices
choices:
  - Tout n'est que plugin
  - La théorie des plugins Vite
---

---
name: La théorie des plugins Vite
group: Inside a Plugin
timing: 0.3
class: p-0!
---

<Theorie />

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
  - Des exemples concrets - Choices
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
timing: 0.3
choices:
  - Vue Plugin - Exemple
  - Auto Import Plugin (unplugin-auto-import) - Exemple
---

<!--

On vient de voir, dans les grandes lignes, la théorie sur les plugins Vite.

Il est temps de passer à la pratique et de voir concrètement comment ça fonctionne avec des exemples de plugins populaires.

TODO: mettre la partie sélection de la partie suivante

-->

---
name: Vue Plugin - Exemple
group: Concrete Examples
timing: 1.7
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
timing: 0.8
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
timing: 0.7
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
name: Visualiser la pipeline
group: Concrete Examples
timing: 0.3
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
timing: 0.6
ready: true
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
name: Un plugin pour virtualiser
group: Virtualization
timing: 0
---

<VirtualizationExplainedVisually />

<!--
TODO:
-->

---
name: Un plugin pour virtualiser - Plugin Internals
group: Virtualization
timing: 0
---

```ts
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

<!--
Super, on a vu la théorie. Mais concrètement, comment est-ce qu'on applique ça à un plugin Vite?
-->

---
name: Un plugin pour virtualiser - Choices
group: Virtualization
timing: 0
choices:
  - Vue Router - Un module virtuel
  - VitePress - Des data virtuels
  - Icons Plugin - Des icônes virtuelles
  - Infos Plugin - Des infos virtuelles
---

<!--
TODO: write text for this slide
-->

---
name: Vue Router - Un module virtuel
group: Virtualization
timing: 0
---

```vue
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
TODO: texte de la slide
-->

---
name: Vue Router - Un module virtuel - Plugin Internals
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

<!--
TODO: pseudo code du plugin
-->
<!-- TODO: create a plugin that virtualize the import vue-router/auto-routes by returning the result of the generateRoutes() function, also use a resolve it -->
```
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    (() => ({
      name: 'auto-routes',
      resolveId(id) {
        if (id === 'vue-router/auto-routes') {
          return '\0vue-router/auto-routes'
        }
      },
      load(id) {
        if (id === '\0vue-router/auto-routes') {
          // improve my adding the fact the it will read the fs
          const routes = generateRoutes()
          return `export const routes = ${JSON.stringify(routes)}`
        }
      },
    }))(),
  ],
})
```

---
name: VitePress - Des data virtuels
group: Virtualization
timing: 0.5
---

```ts
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

<pre>{{ data }}</pre>
```

<!--
TODO: texte de la slide
dans VitePress, on peut faire ça et dessous, c'est de la virtualisation

parce qu'en plus simple, ça donnerait ça (exemple)

et ça peut permettre de récupérer des infos de git au moment du build
d'aller fetcher une api au build time...

chopper des listes, faire des traitements au build plutôt qu'au runtime

faut préciser les infos à chaque fois
 -->

---
name: VitePress - Des data virtuels - Plugin Internals
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    (() => ({
      name: 'data-plugin',
      resolveId(id) {
        if (id === 'virtual:data') {
          return '\0virtual:data'
        }
      },
      async load(id) {
        if (id === '\0virtual:data') {
          const res = await fetch('https://api.example.com/data')
          const data = await res.json()
          return `export default ${JSON.stringify(data)}`
        }
      },
    })(),
  ],
})
```

<!--
TODO: texte de la slide
-->

---
name: Icons Plugin - Des icônes virtuelles
group: Virtualization
timing: 0
---

```vue
<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
</script>

<template>
  <icon-accessibility />
  <icon-account-box style="font-size: 2em; color: red" />
</template>
```

<!--
TODO: texte de la slide
-->

---
name: Icons Plugin - Des icônes virtuelles - Plugin Internals
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

```ts
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

<!--
TODO: texte de la slide
-->

---
name: Infos Plugin - Des infos virtuelles
group: Virtualization
timing: 0
---

```ts
import now from '~build/time'
import { sha } from '~build/git'

console.log(`Build ${sha} at ${now}`)
```

<InfosPlugin />

<!--
TODO: revoir le texte de la slide
-->

---
name: Infos Plugin - Des infos virtuelles - Plugin Internals
group: Virtualization
timing: 0
choices:
  - Dans les profondeurs de la pipeline
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
        if (id === '~build/time') {
          return '\0~build/time'
        }
        if (id === '~build/git') {
          return '\0~build/git'
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
TODO: revoir le texte de la slide
Imaginez que vous vouliez afficher ou simplement récupérer dans votre application le sha du dernier commit git, ou la date de build.

Comment est-ce que vous feriez ?

Un fichier de config que vous devez penser à mettre à jour à chaque fois que vous faites un build ? Pas très pratique et surtout, pas du tout automatisé.

Non, le mieux, c'est d'utiliser un plugin Vite
-->

---
name: Les autres capacités des plugins
group: Advanced Capabilities
timing: 1.9
choices:
  - Le HMR (Hot Module Replacement)
  - Le middleware - Un fichier virtuel
  - Vue Router - Un module virtuel
  - Infos Plugin - Des infos virtuelles
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
timing: 0.2
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
```
-->

<!--

TODO: faire un diagramme dynamique (dans le sens où il va s'afficher au fur et à mesure) où le user agent se connecte en websocket au server, quand un fichier change, Vite demande à ces fonctions ce qu'il doit en faire, tu peux l'invalider (son cache), et renvoyer une info au client pour lui dire ce qu'il doit faire et le client peut par la suite fetch à nouveau le module pour récupérer la nouvelle version du code. (hot module replacement, pas besoin de faire un full reload et ça permet de garder l'état de l'application et ça prend quelques dizaines de millisecondes au lieu de secondes)

et c'est super rapide parce que vite ne faisant pas de bundle, il est en mesure de n'invalider et de rechercher qu'un fichier spécifique dans le module graph

manipuler le handleHotUpdate pour comprendre ce qu'il se passe vraiment

 -->

<!--
L'une des grandes features de Vite, en plus du mode unbundled, c'est son Hot Module Replacement (HMR).

Concrètement, c'est un système qui permet de changer un fichier à la volé dans le navigateur.

Comment Vite sait quoi mettre à jour ?

Le hook `handleHotUpdate` pour intercepter les changements.
Exemple : invalider un module virtuel quand un fichier sur le disque change.
-->

---
name: Le middleware - Un fichier virtuel
group: Advanced Capabilities
timing: 1
ready: true
choices:
  - Dans les profondeurs de la pipeline
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

Sauf que Vite, c'est un serveur web, et qu'à travers les plugins, il est entièrement configurable. Il est notamment possible d'y ajouter des middlewares, soit pour modifier la requêtes, soit pour renvoyer une page custom.

Le plugin vite-plugin-inspect utilise cette technique pour vous permettre accéder à la page contenant toutes les informations sur la pipeline de Vite, page à `/__inspect/` et accessible uniquement en développement. Cette technique, elle est super pratique pour donner accès à des donnés, ou des pages pendant le développement.

On peut imaginer mocker une API pendant le développement avec un middleware, simuler la récupération d'un fichier qui contient les variables d'environment, ou même injecter un server web, comme le fait Nitro.

-->

---
name: Run Plugin - Un plugin pour exécuter des commandes
group: Advanced Capabilities
timing: 0.6
ready: true
layout: bottom-center-card
transition: slide-up
---

````md magic-move
```ts
import { defineConfig } from 'vite'
import { run } from 'vite-plugin-run'

export default defineConfig({
  plugins: [
    run(),
  ],
})
```
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
      }
    ]),
  ],
})
```
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
````

<!--
Avec un plugin Vite, il est possible de créer des side-effects à chaque changement d'un fichier.

Vite dispose d'un file watcher qui lui permet de réagir dès lors qu'un fichier est créé, modifié ou même supprimé. C'est notamment utilisé par le Hot Module Replacement (HMR).

Le truc, c'est qu'on peut se brancher dessus avec un plugin pour délancher nos propres réactions. C'est ce qu'a fait le plugin `vite-plugin-run`.

On commence par lui définir [click] une commande bash qu'on aimerait voir exécuter et ensuite [click] les fichiers en mesure de déclencher la commande.

Dans ce premier example, on génère automatiquement les types des routes pour le frontend à chaque fois qu'on vient modifier le fichier backend qui les contients.

Dans ce second example, [click], on vient aussi regénérer des types API backend pour le frontend à chaque fois qu'on touche nos controllers ou nos resources backend.

Avec cette méthode, on se retire une tâche manuelle et on s'assure d'avoir un frontend synchronisé avec le backend.
-->

---
name: Run Plugin - Un plugin pour exécuter des commandes - Plugin Internals
group: Advanced Capabilities
timing: 0
ready: true
layout: bottom-center-card
choices:
  - Dans les profondeurs de la pipeline
---

```ts {*}{lines:true}
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    (() => ({
      name: 'run',
      handleHotUpdate({ file }) {
        if (file.match(/web\.php$/)) {
          execSync('php artisan ziggy:generate --types')
        }
        if (file.includes('/app/')) {
          execSync('php artisan wayfinder:generate')
        }
      }
    }))()
  ]
})
```

<!--
Plus concrètement, un plugin comme `vite-plugin-run` est implémenté avec le hook `handleHotUpdate`.

À chaque fois qu'un fichier est modifié, le hook est exécuté et les commandes peuvent-être exécutée.
-->

---
name: Virtual Plugin - Un plugin pour virtualiser des modules
group: Advanced Capabilities
timing: 0.9
ready: true
layout: bottom-center-card
transition: slide-up
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
name: Virtual Plugin - Un plugin pour virtualiser des modules - Plugin Internals
group: Advanced Capabilities
timing: 0
ready: true
choices:
  - Dans les profondeurs de la pipeline
---

```ts {*}{lines:true}
import defineConfig from 'vite'

export default defineConfig({
  plugins: [
    (() => ({
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
    }))()
  ]
})
```

<!--
Plus concrètement, un plugin comme `vite-plugin-virtual` est implémenté comme un plugin pour un module virtuel, avec le hook `resolveId` et `transform` en suivant les conventions de Rollup.

On va venir boucler sur toutes les clés dans le resolveId pour voir si l'import match avec l'une d'elle et on va venir faire pareil dans le load pour trouver la valeur associée et la retournée.
-->

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0.6
transition: slide-up
---

<!-- TODO: refaire https://soubiran.dev/posts/laravel-and-vite-a-love-story-ruined-with-cross-origin#:~:text=Laravel%20and%20Vite%20integration,-This avec du code -->

<!--

Pour celui là, il faut que je vous donne un peu plus de contexte.

Laravel, c'est du PHP et Vite, c'est du Node.js, chacun tournant dans son propre processus. En développement, quand on demande une page, on fait une requête à Laravel qui nous renvoie la page avec les assets comme les fichiers JavaScript et le CSS renvoyant vers le serveur Vite. Mais comment est-ce que Laravel connaît l'adresse du serveur Vite ?

-->

---
name: Laravel Vite - La communication inter-processus - Plugin Internals
group: Advanced Capabilities
timing: 0.3
layout: bottom-center-card
choices:
  - Dans les profondeurs de la pipeline
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

Plus concrètement, un plugin comme `vite-plugin-laravel` va se servir du hook `configureServer` pour récupérer toutes les informations dont il a besoin et venir écrire le fichier dès lors lors que le serveur est accepte des requêtes.
-->

---
name: unplugin-macro - Un plugin pour créer des macros
group: Advanced Capabilities
timing: 0
layout: bottom-center-card
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
TODO: Missing text for this slide
-->

---
name: unplugin-macro - Un plugin pour créer des macros - Plugin Internals
group: Advanced Capabilities
timing: 0
layout: bottom-center-card
choices:
  - Dans les profondeurs de la pipeline
---

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    (() => {
      return {
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
      }
    })()
  ]
})
```

<!--
Plus concrètement, le plugin `unplugin-macro` va utiliser le hook `transform` pour trouver les macro, via un walker dans l'AST du code source wt la balise `with { type: 'macro' }`, et venir l'exécuter pour la remplacer par le résultat de l'exécution.

C'est un plugin relativement complexe mais qui démontre que tout est possible avec ce plugin.
-->

---
name: Nitro - Un backend
group: Advanced Capabilities
timing: 0
---

<NitroABackend />

<!--
Vite est connu pour sa capacité à fournir une plateforme de développement robuste pour le frontend.

Sauf que certains se sont ce sont demandé s'il n'était pas possible d'aller plus loin.

Vite c'est un serveur et il est possible d'y injecter ses propres middleware. Que se passerait-il si on forward les requêtes vers un autres serveur, qui s'occupe de la traiter de de renvoyer la requête ?
-->

---
name: Nitro - Un backend - Plugin Internals
group: Advanced Capabilities
timing: 0
ready: true
choices:
  - Dans les profondeurs de la pipeline
---

```ts {*}{lines:true}
// Extremely simplified pseudo-code of the Nitro plugin
import { defineConfig } from 'vite'
import { createContext, createNitro, NitroPluginContext } from 'nitro'

export default defineConfig({
  plugins: [
    (() => {
      const ctx: NitroPluginContext = createContext(pluginConfig);

      return {
        name: 'nitro',
        async config(config) {
          ctx.nitro = await createNitro(ctx);
        },
        configureServer(server) {
          server.middlewares.use(function nitroDevMiddlewarePre(req, res, next) {
            if (isNitroRequest(req.url)) {
              nitroDevMiddleware(req, res, next);
            } else {
              next();
            }
          });
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
name: Dans les profondeurs de la pipeline
group: Deep Dive & Conclusion
timing: 0.1
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
timing: 0.2
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
timing: 0.8
choices:
  - Live Coding
  - Q&A
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
timing: 0.8
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
timing: 0.1
ready: true
choices:
  - Conclusion
---

<!--

Il semblerait que vous ayez des questions ! Alors allons-y !

Qui commence ?

 -->

---
name: Conclusion
group: Deep Dive & Conclusion
timing: 0.2
layout: outro
ready: true
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Watch the <a href="https://youtu.be/bmWQqAKLgT4" target="_blank">Vite documentary on YouTube</a>.
  </li>
  <li>
    Read the <a href="https://vite.dev/guide/why" target="_blank">Why Vite page</a> on the Vite documentation.
  </li>
    <li>
    Explore the <a href="https://antfu.me/posts/journey-with-icons-continues" target="_blank">Anthony's journey with icons</a>.
  </li>
  <li>
    Check out the <a href="https://vite.dev/guide/api-plugin" target="_blank">Vite plugin API documentation</a>.
  </li>
  <li>
    Dive into all the code source of plugins mentioned.
  </li>
  <li>
    Join the community on <a href="https://chat.vite.dev/"  target="_blank">Discord</a>.
  </li>
</ul>

<!--
Si vous cherchez à en savoir plus, je vous invite à regarder le documentaire sur Vite sur YouTube, à lire la page "Why Vite" dans la documentation officielle, à suivre le parcours d'Anthony avec les icônes, à explorer la documentation de l'API des plugins Vite, à plonger dans le code source de tous les plugins mentionnés et à rejoindre la communauté sur Discord.

Et à parcourir les autres chemins de cette présentation pour découvrir d'autres facettes de Vite.

Merci à tous, c'était Estéban, et si vous avez un feedback, c'est juste là.
-->

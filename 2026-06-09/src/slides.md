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
transition: fade-out
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: "Au cœur d'une pipeline : démystifions Vite et ses plugins"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: vite,bundlers,esm,plugin-development,module-transforms,virtual-modules
event: Paris TypeScript
date: 09 juin 2026
chooseYourOwnAdventure: true
ready: true
timing: 0.2
---

# Au cœur d'une pipeline:<br>démystifions Vite et ses plugins

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
img: ./vite-background.png
transition: slide-up
---

<img src="./assets/vite-logo-color-dark.svg" />

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
name: What is a Bundler?
group: Introduction
ready: true
timing: 0.8
layout: bottom-left-card
img: >-
  https://images.unsplash.com/photo-1615099833617-01e3d6dbe2e4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<div class="flex flex-col gap-2 text-2xl font-bold">
  <div class="flex flex-row items-center gap-2">
    <span v-click="2">compiler</span> <span v-click="2" class="i-ph-arrow-right-bold inline-block forward:delay-100"></span> <span v-click="1" class="forward:delay-100">executable</span>
  </div>
  <div class="flex flex-row items-center gap-2">
    <span v-click="3">bundler</span> <span v-click="4" class="i-ph-arrow-right-bold inline-block forward:delay-100"></span> <span v-click="4" class="forward:delay-100">bundle</span>
  </div>
</div>

<!--
[slow] Je vous l'avez promis. C'est quoi un bundler ?

On a l'habitude de démarrer une application avec un executable, executable produit avec un compilateur. Et ben dans le web, c'est pareil.
On a un bundler qui va produire un bundle qui permet de démarrer votre application web depuis un navigateur.

Du coup, on peut vraiment voir le bundler comme un compilateur, et le bundle comme l'exécutable du web.

Trop chouette, on a compris ce qu'était un bundler !
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

C'est long. c'est trop long. [fast] et moi bah, j'ai que 20 minutes et j'ai vraiment envie de vous transmettre un concentré doooncc là, c'est pas possible.
-->

---
name: Vite in a Nutshell
group: Vite Core
ready: true
timing: 0.8
layout: center-card
img: ./vite-background.png
clicks: 5
---

<ViteInANutshell />

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
timing: 2.4
layout: full
---

<ViteExplainedVisually />

<!--
[take your time]

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

Mais du coup, pourquoi Vite a pris le dessus ?
-->

---
name: Why Vite Took Over
group: Vite Core
timing: 1.8
ready: true
layout: center-card
img: ./vite-background.png
clicks: 6
---

<WhyViteTookOver />

<!--
[slow] Vite, il a pris le dessus parce qu'il a su répondre à des besoins qui étaient devenus critiques pour les développeurs.

1. [click] Native ESM: Vite utilise les modules ECMAScript natifs du navigateur, ce qui élimine le besoin de bundler pendant le développement et accélère considérablement le temps de démarrage.
2. [click] Dev server performance: Grâce à l'utilisation d'esbuild pour la transformation rapide du code, Vite offre des performances de serveur de développement exceptionnelles, même pour les grands projets.
3. [click] On-demand transformation: Vite transforme les fichiers à la demande, ce qui signifie que seuls les fichiers nécessaires sont transformés et servis, réduisant ainsi le temps de chargement.
4. [click] Simplified configuration: Vite propose une configuration plus simple et plus intuitive que les bundlers traditionnels, ce qui facilite la prise en main et la personnalisation.
5. [click] Ecosystem alignment: Vite a été conçu pour s'intégrer parfaitement avec les frameworks modernes et les outils de développement dont Rollup dont il tire l'interface pour les plugins, ce qui a contribué à son adoption rapide dans la communauté.

-->

---
name: Some Definitions
group: Vite Core
ready: true
timing: 0.9
layout: center
img: >-
  https://images.unsplash.com/photo-1575573560187-ea323357d550?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<SomeDefinitions />

<!--
D'ailleurs, on va voir beaucoup de concepts, je vous propose qu'on prenne quelques minutes pour les définir.

1. module ECMAScript : Un fichier JavaScript qui utilise import / export.
2. identifiant de module : La chaîne utilisée pour désigner un module dans un import. Par example : 'vue', './App.vue', 'virtual:my-module'.
3. Hook: Une fonction qu'un plugin expose pour intervenir à une étape précise de la pipeline. Par example : resolveId, load, transform.
4. Module virtuel: Un module qui n'existe pas sur le disque, mais qui est généré à la volée par un plugin.

https://chatgpt.com/share/69dd6e09-59d4-8326-80ea-147f076d29e0
-->

---
name: Everything Is a Plugin
group: Feature Plugins
ready: true
timing: 1.9
layout: image
img: ./vite-background.png
---

<EverythingIsAPlugin />

<!--
[whispers] Bon, par contre, j'ai un petit secret à vous dire. [small pause] Ça reste en vous et moi hein?

[slow] Dans Vite [pause], toutes les fonctionnalités [pause], sont des plugins. [pause] Toutes ! [click]

[whispers] Et ça, mmmh, c'est vraiment bien parce que ça veut dire que, bah, que, qu'on peut faire tout ce qu'on veut quand on crée un plugin.

- Gestion des pages HTML ? On peut !
- Support natif du JSX ? C'est intégré !
- Gestion du CSS ? C'est fait aussi !
- Les assets statiques ? C'est no brainer, ça s'occupe même du hash !
- L'import de JSON dans un fichier ? Facile, c'est géré !
- Les glob imports ? Oui, ça fonctionne !
- Les imports dynamiques ? Vous vous en doutez, c'est built-in !
- Et puis, le WebAssembly et les Web Workers, pas besoin de s'en soucier, Vite le gère aussi !

Breeeef, tout est possible. Mais surtout surtout surtout, le point à retenir, de tout ça, ce ne sont que des plugins.

Et je vous propose qu'on s'explore celui sur les assets statiques.
-->

---
name: An Image Loaded in a TypeScript File
group: Feature Plugins
ready: true
timing: 0.6
layout: bottom-left-card
img: >-
  https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
---

```ts
import img from './image.png'
```

::outside::

<div v-click class="theme-click-reveal-overlay absolute z-10 inset-0 backdrop-blur-md" />
<img v-after src="./assets/img-is-js.png" alt="Image imported as JavaScript visualization" class="absolute z-20 h-4/5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

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
img: >-
  https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
layout: bottom-right-card
img: >-
  https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<AnImageLoadedInATypeScriptFileBuildTree />

<!--
Au build, Vite va inliner les images de moins de 4ko pour réduire le nombre de requêtes et ajouter un hash dans le nom des autres pour facilement invalider les caches.
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
img: >-
  https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
Pour bien le comprendre, je vous propose qu'on se build notre premier plugin Vite.

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
img: >-
  https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
img: >-
  https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
img: >-
  https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
img: >-
  https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<BackgroundImage />

<Card v-click absolute top-14 inset-x-10 -bottom-10>
  <h2 class="text-center mb-2 text-neutral-700 flex flex-row items-center justify-center gap-2"><span class="i-vscode-icons-file-type-npm inline-block size-5"></span>vite-plugin-inspect</h2>
  <iframe src="/__inspect" class="overflow-hidden w-full h-full" />
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
img: >-
  https://images.unsplash.com/photo-1552084089-2abe7dc04d7a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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

Et c'est le cas. On se plonge dedans ?
-->

---
name: A Plugin for Virtualization - Plugin Internals
group: Virtualization
ready: true
timing: 1.3
layout: bottom-center-card
img: >-
  https://images.unsplash.com/photo-1767482061466-0b4cd8958c86?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
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
Tout commence par un plugin, [click] avec son petit nom là, il est tout mignon.

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
img: >-
  https://images.unsplash.com/photo-1767482061466-0b4cd8958c86?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
transition: slide-up
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
name: Virtualization - Recap - List
ready: true
timing: 1.2
layout: recap
inalia:
  emoji: false
---

<RecapList
  title="Virtualization in 3 Points"
  :items="[
    {
      title: 'Vite can respond to requests with virtual modules',
      description: 'Modules that do not exist on the disk but are generated on the fly by a plugin'
    },
    {
      title: 'To create a virtual module, use the resolveId and load hooks',
      description: 'Take the ownership of an import with resolveId and return the code with load'
    },
    {
      title: 'Used in many plugins and very powerful',
      description: 'It allows you to inject dynamic data, generate code on the fly, and much more'
    }
  ]"
/>

<!--
Ok, on vient de voir du virtuel dans tous les sens, [click] on va se faire un petit récap.

- [click] Vite peut répondre à des requêtes avec des modules virtuels, c'est à dire des modules qui n'existent pas sur le disque mais qui sont générés à la volée par un plugin.
- [click] Pour créer un module virtuel, il faut utiliser les hooks resolveId et load. Avec resolveId, on prend la main sur un import spécifique, et avec load, on retourne le code de ce module.
- [click] C'est une technique utilisée dans beaucoup de plugins et c'est très puissant. Ça permet d'injecter des données dynamiques, de générer du code à la volée, et les possibilités sont sans limites.
-->

---
name: Other Plugin Capabilities
group: Advanced Capabilities
ready: true
timing: 0.7
layout: image
img: ./vite-background.png
---

<OtherPluginCapabilities />

<!--
On a vu différents hooks, pour agir sur les modules, se brancher sur le cycle de vie de Vite, on a vu la virtualisation, un petit example. Ce que je vous propose, c'est qu'on se plonge concrètement dans les diverses capacités des plugins.

Ça m'fait penser, on va explorer l'une d'entre elles en profondeur, et vous avez la possibilité de choisir laquelle. [show qr code]

[explain the different plugin capabilities]
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
name: Your Turn
ready: true
timing: 0.5
layout: keep-in-mind
confettiClicks: 1
---

In <span class="text-primary">20 minutes</span>, you discovered<br>what you need to build<br><span class="text-primary">your Vite plugin</span>.

::outside::

<img v-click src="./assets/good-job.gif" class="absolute left-10 bottom-10 w-50" />
<img v-after src="./assets/good-job.gif" class="absolute right-10 bottom-10 w-50" />

<!--
Compréhension de Vite, de sa pipeline, transformation de modules sur demande et la génération de modules virtuels, exploration de l'écosystème, c'est qu'on en a fait des choses.

Finalement, en 20 minutes, on a découvert le nécessaire pour réaliser notre plugin Vite.

[pause]

[click] Sincèrement, vous pouvez être fière de vous ! Bravo !
-->

---
name: Outro
timing: 1
layout: outro2
ready: true
---

<!--
Ce qui est chouette, c'est que ce soir, j'ai envie de vous faire un cadeau à tous. En scannant ce QR code, vous pouvez avoir accès à du contenu additionnel pour concrétiser votre maîtrise de Vite et même aller plus loin dans certain des concepts qu'on a vu ensemble. C'est du contenu exclusif, uniquement disponible derrière ce QR code.

Merci à tous, c'était Estéban.

Ça me ferait très plaisir de pouvoir lire vos retours,

et si l'envie vous en dit, on se retrouve sur l'internet.

Merci !
-->

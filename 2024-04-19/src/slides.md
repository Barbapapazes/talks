---
layout: cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
themeConfig:
  primary: '#fde047'
fonts:
  sans: Nunito
growSeed: 7
title: Unifié et Universel, le JavaScript avec UnJS
---

<h1 flex="~ col">
  <span>Unifié et Universel,</span>
  <span flex="~ row gap-4">le <span v-mark.yellow.underline.delay300="{at:1,padding:-8,seed:42}">JavaScript</span><span flex="~ items-center"> avec <img src="/unjs.svg" h-12 ml-6 mr-2 />UnJS</span></span>
</h1>

<div abs-br mx-10 my-11 flex="~ col gap-4 items-end" text-left>
  <span>DevoxxFR</span>
  <div text-xs opacity-75 mt--4>19 avril 2024</div>
</div>

<!--
Bonjour à tous !

J'espère que vous passez une bonne Devoxx...
... et que vous allez bien parce que les 15 prochaines minutes que nous allons passer ensemble s'annoncent intenses.

Nous allons découvrir ce qu'est UnJS et sa vision du JavaScript [click] unifiée et universel.

Préparez vos téléphones, il y aura quelques QR codes à scanner.
-->

---
layout: intro
class: ml-40
growSeed: 32
---

# Estéban Soubiran

<div class="leading-10 opacity-80">
Développeur web chez <span v-mark.yellow.circle="{at:1,padding:12,seed:4,strokeWidth:2,iterations:1}">Infomaniak</span><br>
Élève-ingénieur en cyber-sécurité<br>
Membre d'<span v-mark.yellow.underline="{at:2,padding:-2,seed:2,strokeWidth:2}">UnJS</span><br>
</div>

<div my-10 w-min flex="~ gap-1" items-center justify-center>
  <div i-simple-icons-x opacity-50 ma text-xl />
  <div><a href="https://twitter.com/soubiran_" target="_blank" class="border-none! font-300">soubiran_</a></div>
  <div i-ph-github-logo-duotone opacity-50 ma text-xl ml4/>
  <div><a href="https://github.com/barbapapazes" target="_blank" class="border-none! font-300">barbapapazes</a></div>
  <div i-ph-link-duotone opacity-50 ma text-xl ml4 />
  <div><a href="https://esteban-soubiran.site" target="_blank" class="border-none! font-300">esteban&#8209;soubiran.site</a></div>
</div>

<!--
Avant de rentrer dans le cœur du sujet, qui suis-je ?

Moi, c'est Estéban.

Actuellement, je suis développeur web chez [click] Infomaniak, un cloud provider éthique et Suisse. En parallèle, je termine mes études d'ingénieur en cyber-sécurité.

Dans mon temps libre, j'adore écrire du code, des articles, partager ce que j'apprends, échanger et participer à divers projets open-source. C'est comme ça que depuis 8 mois, j'ai intégré l'équipe [click] d'UnJS.

Si vous voulez voir un peu tout ce que je fais, vous pouvez me suivre sur X, c'est là où je suis le plus actif.
-->

---
grow: bottom
---

<Suspense>
  <InteractiveTalks
    :slide="3"
    talkSlug="unifie-et-universel-le-javascript-avec-unjs"
    questionSlug="connaissez-vous-unjs"
  />
</Suspense>

<!--
Avant d'aller plus loin, je suis curieux de savoir qui parmi vous connaît UnJS.

Pour cela, je vous invite à flasher le QR code et tout simplement répondre à la question.

Si l'écosystème ne vous parle pas trop, c'est parce qu'il est finalement assez récent. Il a à peine plus de deux ans.

Dans le même temps, il cible principalement les développeurs JavaScript aui publient des paquets sur npm.

Pour autant, on verra que c'est un vrai couteau suisse et qu'il pourrait vous être très pratique dans vos prochains projets JavaScript.

Alors, que nous donne ce graphique ? [improviser]
-->

---
grow: left
name: history
---

<div grid="~ cols-11" h-full gap-3 items-center justify-items-center>
  <v-click at="4">
    <div flex="~ col items-center justify-center" gap-1>
      <img w-10 src="https://unjs.io/assets/logos/bundle-runner.svg" />
      <span class="text-[0.50rem]" op-50 text-center>bundle-runner</span>
    </div>
  <div flex="~ col items-center justify-center" gap-1>
      <img w-10 src="https://unjs.io/assets/logos/c12.svg" />
      <span class="text-[0.50rem]" op-50 text-center>c12</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/changelogen.svg" />
        <span class="text-[0.50rem]" op-50 text-center>changelogen</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/citty.svg" />
        <span class="text-[0.50rem]" op-50 text-center>citty</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/consola.svg" />
        <span class="text-[0.50rem]" op-50 text-center>consola</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/cookie-es.svg" />
        <span class="text-[0.50rem]" op-50 text-center>cookie-es</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/defu.svg" />
        <span class="text-[0.50rem]" op-50 text-center>defu</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/destr.svg" />
        <span class="text-[0.50rem]" op-50 text-center>destr</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/fontaine.svg" />
        <span class="text-[0.50rem]" op-50 text-center>fontaine</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/fs-memo.svg" />
        <span class="text-[0.50rem]" op-50 text-center>fs-memo</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/get-port-please.svg" />
        <span class="text-[0.50rem]" op-50 text-center>get-port-please</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/giget.svg" />
        <span class="text-[0.50rem]" op-50 text-center>giget</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/h3.svg" />
        <span class="text-[0.50rem]" op-50 text-center>h3</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/hookable.svg" />
        <span class="text-[0.50rem]" op-50 text-center>hookable</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/httpxy.svg" />
        <span class="text-[0.50rem]" op-50 text-center>httpxy</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/image-meta.svg" />
        <span class="text-[0.50rem]" op-50 text-center>image-meta</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/ipx.svg" />
        <span class="text-[0.50rem]" op-50 text-center>ipx</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/jimp-compact.svg" />
        <span class="text-[0.50rem]" op-50 text-center>jimp-compact</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/jiti.svg" />
        <span class="text-[0.50rem]" op-50 text-center>jiti</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/knitwork.svg" />
        <span class="text-[0.50rem]" op-50 text-center>knitwork</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/listhen.svg" />
        <span class="text-[0.50rem]" op-50 text-center>listhen</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/magicast.svg" />
        <span class="text-[0.50rem]" op-50 text-center>magicast</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/mkdist.svg" />
        <span class="text-[0.50rem]" op-50 text-center>mkdist</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/nanotar.svg" />
        <span class="text-[0.50rem]" op-50 text-center>nanotar</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/nitro.svg" />
        <span class="text-[0.50rem]" op-50 text-center>nitro</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/node-fetch-native.svg" />
        <span class="text-[0.50rem]" op-50 text-center>node-fetch-native</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/nypm.svg" />
        <span class="text-[0.50rem]" op-50 text-center>nypm</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/ofetch.svg" />
        <span class="text-[0.50rem]" op-50 text-center>ofetch</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/ohash.svg" />
        <span class="text-[0.50rem]" op-50 text-center>ohash</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/pathe.svg" />
        <span class="text-[0.50rem]" op-50 text-center>pathe</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/perfect-debounce.svg" />
        <span class="text-[0.50rem]" op-50 text-center>perfect-debounce</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/pkg-types.svg" />
        <span class="text-[0.50rem]" op-50 text-center>pkg-types</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/radix3.svg" />
        <span class="text-[0.50rem]" op-50 text-center>radix3</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/rc9.svg" />
        <span class="text-[0.50rem]" op-50 text-center>rc9</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/scule.svg" />
        <span class="text-[0.50rem]" op-50 text-center>scule</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/theme-colors.svg" />
        <span class="text-[0.50rem]" op-50 text-center>theme-colors</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/ufo.svg" />
        <span class="text-[0.50rem]" op-50 text-center>ufo</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unbuild.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unbuild</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/uncrypto.svg" />
        <span class="text-[0.50rem]" op-50 text-center>uncrypto</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unctx.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unctx</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unenv.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unenv</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unhead.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unhead</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unimport.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unimport</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unpdf.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unpdf</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unplugin.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unplugin</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unstorage.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unstorage</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/untun.svg" />
        <span class="text-[0.50rem]" op-50 text-center>untun</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/untyped.svg" />
        <span class="text-[0.50rem]" op-50 text-center>untyped</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/uqr.svg" />
        <span class="text-[0.50rem]" op-50 text-center>uqr</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/webpackbar.svg" />
        <span class="text-[0.50rem]" op-50 text-center>webpackbar</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/automd.svg" />
        <span class="text-[0.50rem]" op-50 text-center>automd</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/confbox.svg" />
        <span class="text-[0.50rem]" op-50 text-center>confbox</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/crossws.svg" />
        <span class="text-[0.50rem]" op-50 text-center>crossws</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/db0.svg" />
        <span class="text-[0.50rem]" op-50 text-center>db0</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/mdbox.svg" />
        <span class="text-[0.50rem]" op-50 text-center>mdbox</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/undocs.svg" />
        <span class="text-[0.50rem]" op-50 text-center>undocs</span>
    </div>
    <div flex="~ col items-center justify-center" gap-1>
        <img w-10 src="https://unjs.io/assets/logos/unwasm.svg" />
        <span class="text-[0.50rem]" op-50 text-center>unwasm</span>
    </div>
  </v-click>

  <div col="start-4 span-5" row="start-2 span-4" relative w-full h-full>
    <div v-click.hide="3" flex="~ items-center justify-center" h-full gap-12>
      <a v-click href="https://github.com/pi0" target="_blank" flex="~ col items-center justify-center" gap-1 class="!border-b-0">
        <img src="https://github.com/pi0.png" rounded-full h-12>
        <span text-sm op-60> Pooya Parsa </span>
      </a>
      <a v-click href="https://github.com/nuxt" target="_blank" flex="~ col items-center justify-center" gap-1 class="!border-b-0">
        <img src="https://github.com/nuxt.png" rounded-sm h-12>
        <span text-sm op-60> Nuxt </span>
      </a>
    </div>
    <div v-click="3" absolute top="1/2" left="1/2" translate="x--1/2 y--1/2" flex="~ col justify-center items-center" gap-4>
    <img  src="https://github.com/unjs.png" rounded-md h-48 w-48 >
    <div text-lg op-50 flex="~" gap-4>
      <span flex="~ justify-center items-center" gap-2>+50k <span i-ph-star-duotone inline-block></span></span>
      <span flex="~ justify-center items-center" gap-2>+400m <span i-ph-chart-line-up-duotone inline-block></span></span>
      <span flex="~ justify-center items-center" gap-2>+150 <span i-ph-person-duotone inline-block></span></span>
    </div>
    </div>
  </div>
</div>

<!--
Pour la petite histoire, ça [click], c'est Pooya Parsa. Depuis des années, il développe des outils pour faciliter sa vie de développeur.

En 2020, il devient framework architect de [click] Nuxt3 et avec cette nouvelle version, il naît une volonté de faire de Nuxt un framework indépendant à la fois des runtimes et des cloud providers.

Pour cela, il est décidé d'extraire des parties du code de Nuxt. Cette opération, elle a pour but de faciliter la maintenance et de poser des bases solides et unifiées pour les autres auteurs de paquets npm et tous ces meta-frameworks front-end de l'écosystème s'essayant au back-end.

C'est ainsi [click] qu'UnJS est né en 2022. Aujourd'hui, il ne s'agit que d'une organisation sur GitHub, indépendante de Nuxt.

Depuis, l'écosystème a bien évolué et compte désormais [click] 63 paquets, plus de 50 000 étoiles, 400 millions de téléchargements par mois et 150 contributeurs.

Découvrons maintenant quelques un de ses paquets !
-->

---
layout: two-cols
name: ofetch
---

<PackageTitle name="ofetch" />

Une meilleure API de `fetch` qui fonctionne avec Node, le navigateur et les workers.

- Création d'une instance pré-configurable
- Simple et Fonctionnel
- Utilisable avec tous les runtimes

::right::

```ts
import { ofetch } from 'ofetch'

const api = ofetch.create({
  baseURL: 'https://api.example.com',
  async onRequestError({ request, options, error }) {
    // Use interceptors to handle errors
  },
})
```

```ts
const data = await api('/api/posts')
/**
 * {
 *  data: [
 *    { id: 1, title: 'Hello' },
 *    { id: 2, title: 'World' },
 *  ],
 * }
 */
```

<!--
Celui-là devrait vous plaire.

`ofetch`, c'est similaire au `fetch` du navigateur, en mieux et qui fonctionne dans Node comme dans un Worker. Jusqu'à récemment, `fetch` n'existait pas dans Node et en fonction de votre environnement, votre JavaScript n'avait pas les même capacités et vous deviez installer des paquets supplémentaires.

Il a quelques fonctionnalités en plus comme la possibilité de faire ses instances, de se brancher à des hooks, pratique pour demander un nouvel access token ou loger les erreurs, et surtout, il désérialise automatiquement la réponse, fini l'appel du `.json`.

Utiliser `ofetch` permet d'avoir une API consistante entre le serveur et le client. C'est un point  important pour un framework frontend qui fait du SSR puisque l'appel doit pouvoir se faire depuis le serveur et le client de manière identique.
-->

---
layout: two-cols
name: nypm
---

<PackageTitle name="nypm" />

Le gestionnaire de paquets unifié<br /> pour Node.js et Bun.

- Détection automatique
- Interface pour interagir programmatiquement

::right::

<span op50> CLI </span>

```bash
# ✨ Auto-detect
npx nypm i my-super-dep
```

<span op50> Programmatiquement </span>

```ts
import { addDependency } from 'nypm'
```

<!--
npm, yarn, yarn version 2, pnpm et maintenant bun, ça commence à faire beaucoup de package manager. Et ça devient d'autant plus complexe quand on passe notre journée à sauter de projet en projet, de reproduction en reproduction et qu'il faut à chaque fois trouver le bon pour installer les dépendances.

L'idée de nypm, c'est de ne plus avoir à réfléchir quand vous _cloner_ un projet ou que vous faites un _pull_ parce qu'il est une couche au dessus. En fonction de différents indices comme votre _lock file_, `nypm` va choisir le bon gestionnaire de paquets pour executer la bonne commande. Et ça, c'est génial, vous n'avez plus que un paquet et une commande pour les gouverner tous.

Dans le même temps, son architecture modulaire fait qu'il peut être utilisé programmatiquement, dans un CLI ou un script par example.

Le paquet expose toutes ses fonctions utilitaires. Cette philosophie, c'est vraiment l'esprit UnJS, pour vous permettre de construire par dessus, de l'étendre, avec des bases solides et valables quelque soit l'environnement.
-->

---
layout: two-cols
name: unbuild
---

<PackageTitle name="unbuild" />

Un système de _build_ JavaScript unifié.

- Inférence du `package.json`
- Génération de CJS, ESM et Types
- _Bundleless build_
- _Passive watcher_

::right::

```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

```bash
npx unbuild
```

<!--
Celui-là, c'est peut-être mon préféré.

Je me souviens quand j'ai commencé à vouloir publier mes premiers paquets npm, mettre en place les outils nécessaires pour construire le paquet, c'était l'enfer, et une fois que je pensais avoir réussi, je me suis rendu compte que j'allais maintenant devoir le faire avec TypeScript.

Avec ce unbuild, fini les maux de tête. Il suffit d'écrire correctement son `package.json` copié depuis le readme d'unbuild, lançer `npx unbuild` et le tour est joué. Votre paquet est prêt à être publié avec ses types, compatible CommonJS et ESM.

Dessous, c'est du `rollup` et donc ça reste customisable.
-->

---
layout: two-cols
name: changelogen
---

<PackageTitle name="changelogen" />

Magnifique changelog grâce aux commits conventionnels.

- Génération du changelog automatisée
- Saut de version automatique avec semver
- Fonctions exposées pour une utilisation dans d'autres scripts

::right::

<span op50> Les commits </span>

```sh
feat: add new feature
fix: fix a bug
docs: update documentation
```

<span op50> La commande </span>

```bash
npx changelogen@latest --release
```

<span op50> Le résultat </span>

```txt
🚀 Enhancements
add new feature (#134)
🩹 Fixes
fix a bug (#133)
📖 Docs
update documentation (#135)
❤️ Contributors
Barbapapazes
```

<!--
Faire une _release_, c'est un processus plus compliqué qu'il en a l'air. Il faut penser à choisir et change la version, faire le _changelog_, faire le commit et faire le tag avec la bonne version sur le bon commit. Il est facile de se tromper, encore plus quand on joue avec des _prerelease_ et tout ça sur différents projets, en même temps.

Changelogen se base sur vos commits pour faire tout ça. Rien à penser et en plus, on est sûr que ce soit bon à tous les coups.

Comme nypm, il expose toute ses fonctions pour être étendu dans un script pour son projet ou un autre paquet, comme changelogithub.
-->

---
layout: two-cols
name: defu
---

<PackageTitle name="defu" />

Attribuer des propriétés par défaut de manière récursive.

- Léger et rapide
- Fusionner avec des fonctions, des tableaux et personnalisable
- Types inclus

::right::

```ts
defu({
  vite: {
    plugins: ['custom'],
    ssr: true
  }
}, {
  vite: {
    plugins: ['build-in'],
    outDir: 'dist',
    ssr: false
  }
})
```

```txt
{
  vite: {
    plugins: [ 'custom', 'build-in' ],
    outDir: 'dist',
    ssr: true
  }
}
```

<!--
Oooh, defu. Simple mais tellement pratique et depuis que je l'ai essayé, je l'ai adopté partout.

Quand on crée des outils, que ce soit un framework ou un petit utilitaire, c'est nécessaire de laisser le développeur les configurer en passant des options.

Le plus souvent, on accepte un objet que l'on merge avec la configuration par défaut. Mais quand l'objet est sur plusieurs niveaux ou qu'il y a des tableaux, comment on gère ?

À la main ou récursivement, sur tous les objets et les sous objets mais c'est souvent la galère et on se retrouve à dupliquer du code de projet en projet.

Defu vient régler exactement ce problème en mergeant récursivement objets et tableaux. Sur ce petit example, on voit que nos 2 tableaux ne font plus que un et que nos 2 objets ont été unifié.
-->

---
layout: two-cols
name: h3
---

<PackageTitle name="h3" />

- Léger et _tree-shakeable_
- Composable et _lazy loaded_
- Agnostique du _runtime_

::right::

```ts
export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')

  const body = await readBody(event)
  const query = getQuery(event)

  if (!body)
    throw createError({ statusCode: 422 })

  if (query)
    return query

  return sendRedirect(event, '/success')
})
```

<!--
H3, c'est comme Express mais entièrement tree shakable et en plus moderne. Dans votre bundle final, vous n'aurez que ce que vous utilisez. Et on le verra, ça a son importance.

L'API est pensée pour être hyper intuitive et facile avec des composables. Par example, vous pouvez vous assurer de la méthode de la requête, récupérer le body ou la query avec de simple composables. Vous pouvez même throw une erreur ou retourner du json, tout est géré !

Cette approche, dans la conception de h3, d'avoir une grande modularité, permet d'avoir un temps de démarrage, le fameux cold start dans l'edge, sous la barre des 2ms et ça c'est vraiment rapide.
-->

---
layout: two-cols
name: nitro
---

<PackageTitle name="nitro" />

- Portable et compacts
- Personnalisable et extensible
- KV (unstorage), DB (db0), WebSocket (crossws) intégrés

::right::

<img src="/nitro.png" rounded />

<div text-center mt-2>
  <a href="https://nitro.unjs.io" target="_blank" class="border-none! op50">nitro.unjs.io</a>
</div>

<!--
H3, c'est sympa mais ça reste bas niveau et quand on veut faire des choses sérieuses, Nitro devient le compagnon idéal.

Nitro, c'est à la fois un framework pour construire un backend dans l'edge et un toolkit pour le prochain framework full-stack. C'est lui qui propule Nuxt, Analog, Vinxi et bientôt TanStack Start.

Je pourrais en parler 1h, je n'ai pas vraiment le temps et je vous invite sincèrement à le découvrir et l'explorer. Il repose sur tout ce que j'ai pu vous présenter jusque là.

Un petit fait quand même, il a été optimisé pour l'edge à tel point qu'en production, il tient dans moins de 1mb, node_modules inclus.

Il peut être déployé sur plus de 20 providers automatiquement, sans avoir à être configuré, et est compatible avec tous les runtimes.
-->

---
name: std-env
class: flex flex-col items-start justify-center
---

<PackageTitle name="std-env" />

Utilitaires JavaScript indépendants du runtime.

- Détection du _provider_ et du _runtime_
- CI / TTY / OS / Développement / Version

<div abs-bl p-8 right-0  flex="~ justify-between items-center">
  <span class="i-devicon-plain-amazonwebservices-wordmark?mask" inline-block h-14 w-14></span>
  <span class="i-devicon-plain-azure-wordmark?mask" inline-block h-24 w-24></span>
  <span class="i-devicon-plain-cloudflare-wordmark?mask" inline-block h-24 w-24></span>
  <span class="i-devicon-plain-netlify-wordmark?mask" inline-block h-24 w-24></span>
  <span class="i-devicon-vercel-wordmark?mask" inline-block h-24 w-24></span>
  <span class="i-devicon-plain-circleci-wordmark?mask" inline-block h-14 w-14></span>
  <span class="i-devicon-plain-gitlab-wordmark?mask" inline-block h-12 w-12></span>
</div>

<!--
AWS, Azure, Cloudflare, Netlify ou Vercel, vous savez ce qu'ils n'ont pas en commun ? La manière de les configurer pour déployer votre application.

Pour permettre le déploiement sans configuration de Nitro, std-env est en mesure de détecter le provider et le runtime grâce à plusieurs indices pour mettre à jour la configuration. Le développeur n'a rien à faire ni à réfléchir lorsqu'il déploie son application.

Ainsi, vous pouvez améliorer la DX de vos outils en adaptant le comportement à l'environnement.
-->

---
layout: two-cols
name: magic-regexp
---

<PackageTitle name="magic-regexp" />

Une alternative compilée, sûre et lisible à RegExp.

- Syntax naturelle et compréhensible
- Groupes capturés typés automatiquement
- Compilation en RegExp native

::right::

```ts
// Simple Semver Matcher
createRegExp(
  oneOrMore(digit).groupedAs('major'),
  '.',
  oneOrMore(digit).groupedAs('minor'),
  maybe('.', oneOrMore(char).groupedAs('patch'))
)
```

<!--
Les regexp, ça vous parle ? Ça peut vite devenir technique et difficile à maintenir.

Maintenant, imaginez si on avait la possibilité de les écrire avec du langage naturel et des mots qui font sens, on prendrait peut être un peu plus de plaisir. Moi en tout cas, je suis bien d'accord avec ça.

Là, sur l'example, tout le monde peut me dire ce que fait la regexp ? Des mots simpes qui font sens, ensemble.

Beh, c'est ça magic-regexp, tout simplement, des mots simples qui ensemble font sens pour vous aider à constuire et maintenir vos regexp.

En cadeau, le type de la fonction `createRegExp`vous montre la regexp générée et les groupes capturés sont typés. Magique !

Attention quand même, ce n'est pas une raison pour mettre des regexp partout !
-->

---
name: Et tellement plus
---

<Suspense>
  <SoMuchMore />
</Suspense>

<div abs-br pr-10 pb-10 flex="~ col gap-1" items-start>
  <div flex="~ gap-1" items-center>
    <div i-simple-icons-x opacity-50 text-xl/>
    <div><a href="https://twitter.com/soubiran_" target="_blank" class="border-none! font-300">soubiran_</a></div>
    </div>
  <div flex="~ gap-1" items-center>
    <div i-ph-github-logo-duotone opacity-50 text-xl />
   <div><a href="https://github.com/barbapapazes" target="_blank" class="border-none! font-300">barbapapazes</a></div>
  </div>
  <div flex="~ gap-1" items-center>
    <div i-ph-link-duotone opacity-50 text-xl />
    <div><a href="https://esteban-soubiran.site" target="_blank" class="border-none! font-300">esteban&#8209;soubiran.site</a></div>
  </div>
</div>


<!--
Et voilà ! Ce que vous venez de voir n'est qu'un aperçu de tout ce que propose UnJS et de tout ce qu'il est possible de faire avec.

Par example, il y a unplugin pour développer des plugins pour Vite, Webpack, Rollup, Rspack, Rolldown avec une API unique, il y a citty pour créer des CLI simplement, c12 pour la gestion facilité de la configuration, uqr pour faire des QR code comme celui-ci et encore beaucoup beaucoup d'autres.

J'espère vous avoir donné envie d'explorer l'écosystème avec cette courte introduction.

Dites moi quels sont vos paquets préféré en flashant le QR code et si vous avez des questions, c'est le moment !

Merci à tous.
-->

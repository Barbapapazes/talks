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

- Créé par Evan You (créateur de Vue.js)
- Né d'une frustration : les temps de démarrage trop longs des bundlers traditionnels
- Inspiration initiale : serveur de développement pour Vue.js utilisant les ES modules natifs
- "Vite" signifie "rapide" en français - un clin d'œil à sa philosophie
- Première version publique : début 2020
- Évolution : d'un outil pour Vue.js à un build tool universel

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

## Deux composants majeurs

- **Dev Server** : Sert les fichiers source via ES modules natifs
- **Build Command** : Bundle avec Rollup pour la production

## Le cycle d'une requête en dev

1. Le navigateur demande un module (ex: `/src/main.js`)
2. Le serveur reçoit la requête
3. La **plugin pipeline** traite la requête (`resolveId` → `load` → `transform`)
4. Le code transformé est servi au navigateur
5. Instant Server Start + Lightning Fast HMR ⚡️

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

- **VoidZero** : Nouvelle entreprise fondée par Evan You pour industrialiser l'écosystème
- **Rolldown** : Bundler écrit en Rust, compatible Rollup, pour remplacer Esbuild+Rollup
- Objectif : unifier dev et build avec le même bundler
- Fin de la dualité Esbuild (dev) / Rollup (build)
- Performance accrue grâce à Rust
- Meilleure cohérence entre environnements dev et production
- **Environment API** : Support multi-environnements (client, SSR, worklets...)

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

- Le cœur de Vite est **minimaliste** par design
- Toutes les fonctionnalités passent par des **plugins**
- Même l'import CSS, JSON, assets... sont gérés par des plugins internes
- Philosophie : si Vite peut le faire avec un plugin, vous aussi !
- Gage de qualité : l'API plugin est suffisamment puissante
- Interface universelle de plugins compatible Rollup/Rolldown
- Les plugins tiers ont le même niveau d'accès que les plugins internes

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

```ts
import './style.css' // ← Ça ne devrait pas fonctionner en JS natif !
```

## Le plugin CSS intervient

1. **resolveId** : Identifie le fichier `style.css`
2. **load** : Lit le contenu CSS du disque
3. **transform** : Transforme le CSS en JavaScript qui :
   - Crée un élément `<style>` dans le `<head>`
   - Y injecte le CSS
   - Supporte le HMR pour mise à jour instantanée
4. Le navigateur reçoit du JavaScript pur

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

```ts
import img from './image.png' // Retourne l'URL publique
import imgUrl from './image.png?url' // Explicitement l'URL
import imgRaw from './image.png?raw' // Contenu brut
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

## Pourquoi pré-bundler ?

### 1. Conversion de format
- Beaucoup de dépendances npm sont en **CommonJS**
- Le navigateur ne comprend que **ESM**
- Esbuild convertit CJS → ESM à la volée

### 2. Performance
- `lodash-es` = 600+ modules = 600+ requêtes HTTP !
- Esbuild bundle tout dans `.vite/deps/lodash-es.js`
- Une seule requête, démarrage quasi-instantané
- Mise en cache agressive

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

```ts
export default function monPlugin() {
  return {
    name: 'mon-plugin', // Obligatoire
    resolveId(id) { /* ... */ },
    load(id) { /* ... */ },
    transform(code, id) { /* ... */ },
    // + autres hooks
  }
}
```

- Un plugin = objet avec des **hooks**
- Appelés par le **PluginContainer** dans un ordre précis
- Chaque hook peut retourner une valeur ou `null`
- Hooks compatibles Rollup + extensions Vite-specific

---
name: La théorie des plugins Vite
group: Inside a Plugin
timing: 0
---

## Lifecycle d'une requête module

1. **buildStart** (une fois au démarrage)
2. Pour chaque module demandé :
   - **resolveId** : Résoudre le chemin
   - **load** : Charger le contenu  
   - **transform** : Transformer le code
3. **buildEnd** (à la fermeture)

## Caractéristiques

- Hooks appelés dans l'ordre d'enregistrement des plugins
- Peuvent être **synchrones** ou **asynchrones**
- Le premier hook qui retourne une valeur "gagne"
- `this` contexte avec utilitaires (`this.resolve()`, `this.error()`, etc.)

<!--

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

<!--

quand, ou et quoi

-->

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

## @vitejs/plugin-vue

- **resolveId** : Gère les query params (`?vue&type=style`)
- **load** : Pour les requêtes de sous-parties (styles, scripts)
- **transform** : Compile les SFC (Single File Components)
  - Template → render function
  - `<script setup>` → JavaScript standard
  - `<style scoped>` → CSS avec hash unique
- **handleHotUpdate** : HMR granulaire par bloc (template vs script vs style)

## Pattern : plugin avec enforce
- Un plugin `pre` pour parser le SFC
- Un plugin `post` pour finaliser

---
name: Auto Import Plugin (unplugin-auto-import)
group: Concrete Examples
timing: 0
choices:
  - Visualiser la pipeline
---

## unplugin-auto-import

```ts
// Avant
import { ref, computed } from 'vue'

// Après (auto-importé)
const count = ref(0)
const double = computed(() => count.value * 2)
```

- **transform** : Détecte les identifiants non déclarés
- Injecte automatiquement les imports manquants
- Génère un fichier `.d.ts` pour TypeScript
- Supporte Vue, React, VueUse, et custom imports
- **unplugin** = compatible Vite, Webpack, Rollup, esbuild

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

## Modules virtuels

- N'existent **pas sur le disque**
- Créés à la demande par un plugin
- Convention : préfixe `virtual:` pour l'utilisateur
- Internement : préfixe `\0` pour éviter résolution filesystem

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
- **HMR** : mise à jour des routes quand fichiers changent
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

## VitePress Data Loaders

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
- Pas de waterfall requests

---
name: Icons Plugin - Des icons virtuels
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

```ts
import { version, buildDate } from 'virtual:app-info'
```

## Plugin custom 'app-info'

```ts
{
  name: 'virtual-app-info',
  resolveId(id) {
    if (id === 'virtual:app-info') return '\0' + id
  },
  load(id) {
    if (id === '\0virtual:app-info') {
      return `export const version = "${pkg.version}"
              export const buildDate = "${new Date().toISOString()}"`
    }
  }
}
```

- Injection de métadonnées build-time
- Accès à `process.env`, `package.json`, git hash...

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

## Comment ça marche ?

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

## configureServer hook

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

- Accès au serveur Express/Connect de Vite
- Ajouter des routes custom (API, webhooks...)
- Proxy, authentification, logging...
- Exemple : Laravel Vite Plugin pour communiquer avec PHP

---
name: Run Plugin - Un plugin pour exécuter des commandes
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## Hooks de lifecycle

```ts
{
  name: 'run-codegen',
  async buildStart() {
    // Exécuter avant le build
    await execAsync('npm run generate:types')
  },
  async buildEnd() {
    // Après le build
    console.log('Build terminé!')
  },
  async closeBundle() {
    // Après écriture des fichiers
    await execAsync('npm run post-build')
  }
}
```

- Intégration avec outils externes
- Génération de code
- Post-processing

---
name: Virtual Plugin - Un plugin pour virtualiser des modules
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## vite-plugin-virtual

```ts
import virtual from 'vite-plugin-virtual'

export default {
  plugins: [
    virtual({
      'virtual:config': `export default ${JSON.stringify(myConfig)}`,
      'virtual:features': () => {
        return `export const features = ${generateFeatures()}`
      }
    })
  ]
}
```

- Simplifie la création de modules virtuels
- Valeurs statiques ou fonctions dynamiques
- Utile pour injecter des configs, feature flags...

---
name: Laravel Vite - La communication inter-processus
group: Advanced Capabilities
timing: 0
choices:
  - Dans les profondeurs de la pipeline
---

## laravel-vite-plugin

- Laravel (PHP) ↔ Vite (Node.js) communiquent
- Plugin expose un fichier manifest avec les assets
- En dev : hot file pour indiquer que le serveur Vite est up
- Laravel sait si utiliser Vite dev server ou build assets
- **configureServer** : middleware pour gérer compatibilité

## Pattern
```ts
configureServer(server) {
  // Écrire hot file
  writeFileSync('public/hot', server.config.server.port)
}
```

- Inter-op entre runtimes différents

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

## vite-plugin-inspect

- UI web pour inspecter la plugin pipeline en temps réel
- Accessible via `/__inspect/`
- Visualise :
  - Tous les modules chargés
  - Ordre d'exécution des plugins
  - Transformations successives du code à chaque étape
  - Temps d'exécution de chaque hook

## Pourquoi c'est indispensable ?

- Déboguer les conflicts entre plugins
- Comprendre les transformations appliquées
- Optimiser les performances

<!--

sortir vite-plugin-inspect pour voir les différents hooks, les différents plugins et les modifications successives parce que jusque là, c'est juste une boite noire

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
      if (result) return result
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

## Le problème

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

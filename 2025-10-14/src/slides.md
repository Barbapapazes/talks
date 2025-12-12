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
  - slidev-addon-graph
title: "La réactivité et les signaux : démystifions la magie du frontend"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,vue,reactivity,frontend
event: Paris TypeScript
date: 14 octobre 2025
---

# La réactivité et les signaux :<br> démystifions la magie du frontend

---
name: Overview
layout: inalia-overview
---

---
name: Quel framework pour le frontend ?
---

<Inalia
  question="Quel framework pour le frontend ?"
  type="multiple_select"
  chart="bar"
  :data="[{ label: 'Vue', count: 13, color: '#35C63F' }, { label: 'React', count: 31, color: '#00E3E6' }, { label: 'Angular', count: 14, color: '#BF00E6' }, { label: 'Svelte', count: 4, color: '#E66200' }, { label: 'Solid', count: 1, color: '#008CE6' }, { label: 'Qwik', count: 0, color: '#E500E6' }, { label: 'Aucun', count: 2, color: '#E60045' }, { label: 'Un autre', count: 0, color: '#000000' }]"
/>

<!--

Profiter de la question pour évoquer que chaque framework a une manière différente de gérer la réactivité et aujourd'hui, on va en voir une mais qui est celle vers laquelle les frameworks tendent. Même Angular fait des signaux.

Les différents systèmes de réactivité :
https://www.youtube.com/watch?v=XB993rQ-5DY
https://www.builder.io/blog/reactivity-across-frameworks
  - Dirty checking
  - Observable
  - Signals

-->

---
name: Qui s'est déjà questionné sur le fonctionnement profond de la réactivité de son framework ?
---

<Inalia
  question="Qui s'est déjà questionné sur le fonctionnement profond de la réactivité de son framework ?"
  type="single_select"
  chart="donut"
  :data="[{ label: 'Moi', count: 30, color: '#00E650' }, { label: 'Pas moi', count: 16, color: '#E60089' }]"
/>

---
name: L'équation
layout: center
transition: slide-left
clicks: 1
---

<h1 class="text-4xl font-mono">
  <span :class="{ 'text-red-500 dark:text-red-400': $clicks === 1 }">ui</span> = <span :class="{ 'text-purple-500 dark:text-purple-400': $clicks === 1 }">fn</span>(<span :class="{ 'text-blue-500 dark:text-blue-400': $clicks === 1 }">state</span>)
</h1>

<!--

J'aime bien commencer cette présentation par cette équation qui nous dit que `ui=fn(state)`.

Généralement, on a plutôt l'habitude de la voir quand on parle de React. `ui`, l'interface utilisateur, est la la résultante de l'évaluation d'une function `fn` qui prend en paramètre l'état de l'application `state`. Si on traduit ça avec des mots dont on a l'habitude, on reconnaît que `fn`, c'est une function, un composant, et `state`, c'est les props que l'on passe à ce composant. L'`ui` est donc le JSX que l'on va retourner depuis cette function.

Mais ce qui est intéressant, c'est que l'on peut faire un parallèle avec notre réactivité. `fn` peut-être perçue comme une boite noire, un système dis réactif dans notre cas qui va muter l'interface utilisateur en fonction de l'état de l'application et automatiquement.

Et finalement, c'est ça la réactivité. C'est cette interface qui est pilotée par l'état de l'application sans intervention de notre part.

Et en faite, vous l'avez tous déjà vue et manipulée...[click]...avec Excel.
-->

---
name: L'Excel
layout: center-top-card
transition: slide-up
img: https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
imgClass: object-bottom
---

<Excel />

<!--

Présenter l'Excel, la formule et cette idée d'interface dirigée par l'état de l'application.

Évoquer la notion de propagation de changement.

-->

---
name: Alien Signals
layout: bottom-left-card
img: https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
positionClass: right-2/5
---

```ts {monaco-run}
import { computed, effect, signal } from 'alien-signals'

const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total: ${total()}`)
})

//
```

<!--
Mais ce qui va nous intéresser aujourd'hui, c'est ce code là. On y retrouve notre Excel avec quantity, price, total qui est une fonction de la quantité par le prix et puis l'affichage du total.

La librairie qu'on va analyser, c'est Alien Signals. C'est une implémentation bas niveau d'un système de réactivité, tellement bas niveau que l'API d'Alien Signals elle-même est basée sur ces primitives. D'ailleurs, il est possible de l'utiliser pour refaire les signaux d'à peu près tous les frameworks et même ceux du TC39. C'est aussi la librairie la plus performante sur le marché et elle est utilisé dans le système de réactivité de Vue.js dans la version 3.5 et 3.6.

C'est intéressant de noter que la logique d'Alien Signals est agnostique du language et elle a été portée dans d'autres languages comme Dart, Java, C#, Go, Lua.

Elle a été développée par Johnson Chu pour répondre à ces besoins dans Volar, le framework d'extension pour LSP. Johnson travaille aussi sur Vue Language Server et la réactivité dans Vue.js.

Du coup, l'objectif, c'est de comprendre pourquoi, quand je mets à jour la quantité, le système sait qu'il doit ré-exécuter la fonction de callback de l'effet.

-->

---
name: Présentation
layout: intro
intro: Ingénieur logiciel Avionique chez <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

---
name: Alien Signals
layout: bottom-left-card
img: https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
positionClass: right-2/5
---

```ts {monaco-run}
import { computed, effect, signal } from 'alien-signals'

const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total: ${total()}`)
})

quantity(3)
```

<!--

Mais on n'est pas là pour parler de moi. Aujourd'hui, on est là pour parler d'Alien Signals et plus précisément, on est là pour comprendre comment `effect` sait qu'il doit ré-executer sa fonction de callback lorsque l'une de ses dépendances, direct ou non, comme `quantity` ou `price`, change.

Mais avant d'aller plus loin, on va faire un peut de théorie des graphes.

-->

---
name: Théorie des graphes
transition: slide-up
class: relative
clicks: 4
---

<GraphTheory class="absolute inset-4" />

<!--
Un graph, c'est une structure mathématique qui permet de représenter des relations entre des objets.

Le premier élément, c'est le noeud [click], ou node, qui représente l'endroit où on lieu les calculs. Dans un graph, on peut avoir plusieurs noeuds [click], et chaque noeud peut relié avec un ou pluieurs autres neouds avec un lien, link, ou edge. Dans notre cas, on remarque que le lien est une flèche, ce qui signifie que le graph a une direction, on dit alors qu'il est orienté. On ne peut parcourir les liens que dans le sens de la flèche.

Évidemment, on peut avoir plus que deux noeuds [click], comme avec C, ou avec [click] tout ces autres noeuds.

Ensuite, notre graph, il est dit acyclique, c'est à dire qu'il n'est pas possible de revenir sur un noeud déjà parcouru. Si on mettait un lien orienté de C vers A, alors le graph deviendrait cyclique puisqu'il serait possible de boucler.

Enfin, il y a une dernière notion qui nous intéresse, c'est celle du tri topologique. Un tri topologique est un ordre linéaire des noeuds d'un graph orienté acyclique tel que pour chaque lien orienté, le noeud de départ vient avant le noeud d'arrivée dans l'ordre.

Prendre un example pour le tri topologique et le faire visualiser comme un tableau dans lequel on place les noeuds les un après les autres.

-->

---
name: Liste doublement chaînée
class: relative
clicks: 3
---

<DoubleLinkedList class="absolute inset-4" />

<!--

Il y a un autre concept dont il faut qu'on parle avant de rentrer dans le code d'Alien Signals, c'est celui de la liste doublement chaînée.

Et ce qui est bien avec ces lites doublements chaînées, c'est qu'on peut les représenter avec un graph orienté.

Présenter la slide.

-->

---
name: Le lien entre les graphes et la réactivité
layout: bottom-left-card
img: https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts {all|3-4|6|8-10|all}
import { computed, effect, signal } from 'alien-signals'

const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total: ${total()}`)
})
```

::outside::

<div class="absolute right-14 bottom-10">
  <Card class="h-75.5 w-75.5 relative">
    <GraphAndReactivity v-if="$clicks < 5" class="absolute inset-4" />
    <v-click>
      <GraphAndReactivityDoubleLinked class="absolute inset-4" />
    </v-click>
  </Card>
</div>

<!--
- Visualisation logique
- Visualisation de communication entre les éléments

Deux représentation distinctes pour faciliter la suite.

-->

---
layout: bottom-left-card
transition: slide-up
cardClass: w-80
img: https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=2292&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts
signal()

computed(() => {})

effect(() => {})

effectScope(() => {})
```

<!--
Expliquer la notion de subscriber et de dependency pour chacun des éléments

- signal: dependency
- computed: dependency et subscriber
- effect: dependency et subscriber
- effectScope: subscriber

dependency: on peut s'y abonner

subscriber: s'il porte des dependencies, il s'abonne
-->

---
name: Signals finally explained (Part 1)
transition: slide-up
layout: bottom-left-card
img: https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts {*}{lines:true}
export function signal<T>(): WriteableSignal<T | undefined>
export function signal<T>(oldValue: T): WriteableSignal<T>
export function signal<T>(oldValue?: T): WriteableSignal<T | undefined> {
  return signalGetterSetter.bind({
    currentValue: oldValue,
    subs: undefined,
    subsTail: undefined,
  }) as WriteableSignal<T | undefined>
}
```
```ts {*}{lines:true}
function signalGetterSetter<T>(this: Signal<T>, ...value: [T]): T | void {
  if (value.length) {
    if (this.currentValue !== (this.currentValue = value[0])) {
      const subs = this.subs
      if (subs !== undefined) {
        propagate(subs)
        if (!batchDepth) {
          processEffectNotifications()
        }
      }
    }
  }
  else {
    if (activeSub !== undefined) {
      link(this, activeSub)
    }
    return this.currentValue
  }
}
```
````

<!--

Explication des différents types de réactivité au moment du propagate avec le pull, push et pull-push.

-->

---
name: What the f*ck is push, pull and pull-push?
transition: slide-down
---

<div class="flex">
  <img v-click src="/push.png" alt="push" class="w-1/2" />

  <img v-click src="/pull.png" alt="pull" class="w-1/2" />
</div>

---
name: Signals finally explained (Part 2)
transition: slide-up
layout: bottom-left-card
img: https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts {*}{lines:true}
function signalGetterSetter<T>(this: Signal<T>, ...value: [T]): T | void {
  if (value.length) {
    if (this.currentValue !== (this.currentValue = value[0])) {
      const subs = this.subs
      if (subs !== undefined) {
        propagate(subs)
        if (!batchDepth) {
          processEffectNotifications()
        }
      }
    }
  }
  else {
    if (activeSub !== undefined) {
      link(this, activeSub)
    }
    return this.currentValue
  }
}
```
```ts {*}{lines:true}
function computedGetter<T>(this: Computed<T>): T {
  const flags = this.flags;
  if (flags & (SubscriberFlags.Dirty | SubscriberFlags.PendingComputed)) {
    processComputedUpdate(this, flags);
  }
  if (activeSub !== undefined) {
    link(this, activeSub);
  } else if (activeScope !== undefined) {
    link(this, activeScope);
  }
  return this.currentValue!;
}
```
```ts {*}{lines:true}
function runEffect(e: Effect): void {
  const prevSub = activeSub;
  activeSub = e;
  startTracking(e);
  try {
    e.fn();
  } finally {
    activeSub = prevSub;
    endTracking(e);
  }
}
```
```ts {*}{lines:true}
const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total: ${total()}`)
})
```
```ts {*}{lines:true}
const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total ${quantity()} * ${price()}: ${total()}`)
})
```
````

---
name: Signals made easy
transition: slide-down
---

<div class="size-full flex items-center justify-center">
  <img src="/alien-signals.png" alt="alien signals" class="w-full" />
</div>

---
name: Problèmes
layout: center-card
img: https://images.unsplash.com/photo-1706211306896-92c4abb298d7?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<div class="font-semibold text-xl leading-10">
  <div v-click :class="{ 'opacity-20': $clicks > 1 }">Glitches</div>
  <div v-click :class="{ 'opacity-20': $clicks > 2 }">Cyclic dependencies</div>
  <div v-click :class="{ 'opacity-20': $clicks > 3 }">Interaction with mutable state</div>
  <div v-click>Dynamic updating of the graph of dependencies</div>
</div>

<!--

Le truc, c'est que présenté comme ça, ça a l'air super simple la réactivité. Une variable globale et c'est fini.

Sauf que non parce qu'aujourd'hui, il existe 4 problèmes non résolus dans la réactivité. Non résolu dans le sens où il n'existe pas de solution, d'algorithme, qui permet de résoudre ces problèmes complètement.

Et c'est d'ailleurs dans l'approche de ces problèmes que l'on va voir la différence entre les différents systèmes de réactivité.

Expliquer les problèmes un par un mais préciser que c'est géré par le framework et que théoriquement, c'est transparent pour vous. Mais en avoir conscience permet de mieux écrire son code et potentiellement de mieux comprendre de possibles bugs.

-->

---
name: Construire son framework
layout: center-card
transition: slide-up
img: https://images.unsplash.com/photo-1631106254201-ffbee2305c5b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts
const count = signal(0)

effect(() => {
  document.body.innerHTML = `Count is: ${count()}`
})

count(count() + 1)
```

<!--

Bon, merci Estéban pour toutes ces explications mais concrètement, comment ça s'inscrit dans un framework ?

Du coup pour vous, j'ai décidé de créer un nouveau framework frontend. Oui, encore.

Et le voici.

Présenter le code et expliquer le lien avec un framework et sur le fait qu'on retrouve `ui=fn(state)`.

Notre interface utilisateur, notre `ui`, est bien le résultat de `fn`, notre effect, de `state`, notre signal et notre interface est effectivement pilotée par l'était, le signal `count`.

-->

---
name: Dans Vue
layout: center-card
imgClass: object-start
img: https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts
instance.scope.on()
const effect = (instance.effect = new ReactiveEffect(componentUpdateFn))
instance.scope.off()
```

<!--

Et dans un vrai framework, comme Vue, ça se passe comment ?
Et bien ça se passe comme ça.

Expliquer le code et faire le lien avec la slide précédente.

Chacun des composants a son propre scope et donc le re-rendu, lors d'un changement d'état se fait au niveau du composant.

C'est d'ailleurs l'un des grands changements dans Vue Vapor où la ganularité de la réactivité sera faite au niveau des noeuds du DOM et non plus au niveau des composants. C'est possible grâce aux signaux et c'est du coup beaucoup plus performant mais ça pourrait faire l'objet d'une autre présentation.

-->

---
layout: outro
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Explore the <a href="https://github.com/stackblitz/alien-signals" target="_blank">Alien Signals</a> source code
  </li>
  <li>
    Watch <a href="https://www.youtube.com/watch?v=XB993rQ-5DY" target="_blank">Reactivity across frameworks</a>
  </li>
  <li>
    Read <a href="https://www.builder.io/blog/reactivity-across-frameworks" target="_blank">Unveiling the Magic: Exploring Reactivity Across Various Frameworks</a>
  </li>
  <li>
    Stay curious and keep learning!
  </li>
</ul>

<!--

References:

- https://en.wikipedia.org/wiki/Graph_theory
- https://en.wikipedia.org/wiki/Reactive_programming
- https://github.com/stackblitz/alien-signals/pull/19
- https://juejin.cn/post/7491309861181161511
- https://www.youtube.com/watch?v=2ZahQhb98-E

-->

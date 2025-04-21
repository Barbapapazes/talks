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
remoteAssets: true
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
  - slidev-addon-graph
title: "La réactivité et les signaux: démystifions la magie du frontend"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,vue,reactivity,frontend
event: Devoxx France
date: 17 avril 2025
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
  :data="[
    { label: 'Vue', count: 23, color: '#40B07F' },
    { label: 'Angular', count: 132, color: '#A422EC' },
    { label: 'React', count: 47, color: '#5AC5DD' },
    { label: 'Svelte', count: 6, color: '#FF3D00' },
    { label: 'Solid', count: 1, color: '#568DC8' },
    { label: 'Qwik', count: 1, color: '#AE80F4' },
    { label: 'Aucun', count: 5, color: '#000000' },
    { label: 'Un autre', count: 6, color: '#D65C60' }
  ]"
/>

<!--

Profiter de la question pour évoquer que chaque framework a une manière différente de gérer la réactivité et aujourd'hui, on va en voir une mais qui est celle vers laquelle les frameworks tendent. Même Angular fait des signaux.

- Différents systèmes de réactivité
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
  :data="[
    { label: 'Oui', count: 153, color: '#F9C3C5' }, { label: 'Non', count: 38, color: '#D65C60' }
  ]"
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

On peut faire un parallèle avec notre réactivité. `fn` peut-être perçue comme une boite noire, un système dis réactif dans notre cas qui va muter l'interface utilisateur en fonction de l'état de l'application et automatiquement.

Et le plus simple, pour illustrer ça [click], c'est de sortir un Excel.
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

Parler de la notion de propagation de changement.

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

On y retrouve exactement notre Excel.

Et pourquoi Alien Signals ? Tout simplement parce que c'est agnostique du framework (et même du language) et que c'est tellement bas niveau, qu'est il possible de refaire la réactivité de certains frameworks et d'implémenter la RFC du TC39 sur les signaux.

Développé par Johnson Chu pour répondre à ces besoins dans Volar, le framework d'extension pour LSP.

Finalement, c'est une implémentation qui permet de faire évoluer celle de Vue 3 donc ce n'est pas un petit projet random.

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

-->

---
name: Théorie des graphes
transition: slide-up
class: relative
clicks: 4
---

<GraphTheory class="absolute inset-4" />

<!-- théorie des graphs avec les noeuds, les liens

un graph est une structure mathématique aui permet de représenter des relations entre des objets

graph orienté

on ne peut accéder aux noeuds suivant que en ayant parcouru les noeuds précédents

-->

---
name: Liste doublement chaînée
class: relative
clicks: 3
---

<DoubleLinkedList class="absolute inset-4" />

---
name: Vous suivez encore ? 🫣
---

<Inalia
  question="Vous suivez encore ? 🧣"
  type="single_select"
  chart="donut"
  :data="[
    { label: 'Oui, évidemment', count: 93, color: '#F9C3C5' },
    { label: 'Oui, enfin je crois', count: 59, color: '#EF676C' },
    { label: 'Non, là c\'est trop 🤯', count: 6, color: '#8F3D40' }
  ]"
/>

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

-->

---
name: Signals finally explained
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
````

<!-- TODO:  -->
<!-- expliquer les choses dans les détails dès l'explication sur les signaux-->
<!-- parler du fait qu'on a tout un éventail de type de fonctionnement de la réactivité (c'est au moment du propagate, pull, push, pull-push) -->

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

<!-- TODO:  -->
<!-- l'une des complexités résides dans 4 règles à respecter -->
<!-- parler du diamant problème ? ça peut faire un truc très concret hyper intéressant sur les 4 problèmes qui peuvent se poser  -->

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

<!-- réactivité dans le frontend avec un effect qui render un html on vit de faire note ui=fn(state)-->
<!-- on peut reset le compteur des frameworks -->
<!-- c'est littéralement comme ça que fonctionne le mode vapor -->
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

<!-- TODO: conclure sur le fait qu'on est au niveau composant et qu'un projet comme Vue Vapor va permettre d'être au niveau des éléments du DOM donc beaucoup plus performant.

https://www.youtube.com/watch?v=2ZahQhb98-E

-->

<!-- réactivité chez Vue, concrètement et  -->
<!-- voir si on peut pousser davantage et expliquer vapor aussi (avec du code compilé) -->
<!-- réactivité dans le paysage du frontend -->
<!-- ou alors avoir une ouverture avec cette notion pour un potentiel épisode 2 -->

<!-- faire une conclusion sur le fait que tous les frameworks sont différents mais que la logique est là -->

---
layout: outro
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Explore the <a href="https://github.com/stackblitz/alien-signals" target="_blank">Align Signals</a> source code
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

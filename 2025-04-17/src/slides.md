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
name: L'équation
layout: center
transition: slide-left
clicks: 1
---

<h1 class="text-4xl font-mono">
  <span :class="{ 'text-red-500 dark:text-red-400': $clicks === 1 }">ui</span> = <span :class="{ 'text-purple-500 dark:text-purple-400': $clicks === 1 }">fn</span>(<span :class="{ 'text-blue-500 dark:text-blue-400': $clicks === 1 }">state</span>)
</h1>

---
name: L'Excel
layout: center-top-card
transition: slide-up
img: https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
imgClass: object-bottom
---

<Excel />

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

---
name: Présentation
layout: intro
intro: Ingénieur logiciel chez <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
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

---
name: Théorie des graphes
transition: slide-up
class: relative
clicks: 4
---

<GraphTheory class="absolute inset-4" />

---
name: Liste doublement chaînée
class: relative
clicks: 3
---

<DoubleLinkedList class="absolute inset-4" />

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
img: https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=2292&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts
signal()

computed(() => {})

effect(() => {})

effectScope(() => {})
```

---
name: Signals finally explained
layout: bottom-left-card
img: https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

````md magic-move
```ts
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
```ts
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
```ts
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
```ts
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
```ts
const quantity = signal(0)
const price = signal(15)

const total = computed(() => quantity() * price())

effect(() => {
  console.log(`Total: ${total()}`)
})
```
````

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

<!-- réactivité dans le frontend avec un effect qui render un html -->

---
name: Dans Vue
layout: center
---

```ts
instance.scope.on()
const effect = (instance.effect = new ReactiveEffect(componentUpdateFn))
instance.scope.off()
```

<!-- réactivité chez Vue, concrètement -->
<!-- voir si on peut pousser davantage et expliquer vapor aussi (avec du code compilé) -->
<!-- réactivité dans le paysage du frontend -->
<!-- ou alors avoir une ouverture avec cette notion pour un potentiel épisode 2 -->

---

<div>

</div>

---

<!-- slide de fin -->


<!--

- un code très simple et le code, concret de la library (pour expliquer le fonctionnement de la library)

- explication de l'ensemble des manière de la réactivité dans le frontend (de react à solid)
- et puis comment concrètement ça fonctionne dans Vue
- et puis finalement, le fine grained reactivity avec vue vapor

 -->

<!--

- [ ] ajouter une slide à la fin pour demander aux gens ce qu'ils ont pensé de la conférence (via inalia ofc)
- [ ] une page récap de tous les liens dans inalia ? et ça s'active au fur et à mesure
- [ ] il faut garder les liens pour les mettre dans les slides
- [ ] continuer à bosser les slides et commencer la un paquet pour tout et pour rien

Plan

- ui = fn(state)
utilisé à la base pour décrire react puisque dans un react, vous avez les props en entrée et l'output de la function est le DOM, finalement ça veut dire que l'interface est pilotée par l'état de l'application

mais cette équation est en réalité tout aussi valable pour la réactivité où fn est une boite noire, dans notre cas, un système de réactivité

- démo concrète avec un tableau Excel (parce que ça fonctionne exactement pareil)
- démo de ce dont on va parler (un truc rapide) avec un monaco-run (en mode on va parler de alien-signals parce que c'est aujourd'hui l'implémentation la plus efficiente et bas niveau que l'on peut trouver) et puis c'est du concret parce que ça alimente le système de réactivité de Vue (lui aussi complètement indépendant de Vue) et réimplémentée dans pleins de languages

- introduction (ne mettre que Laravel, Vite et Vue) (et ajouter discord)

- parler un peu en mode personnel du fait que ça ressemble à de la magie et comment à partir d'un langage pas du tout réactif on arrive à faire du réactif
(se mettre dans un modèle où on construit un système de réactivité pour expliquer comment ça fonctionne) (et que j'ai fait du vue 2 avec un plain object javascript puis de l'angular avec les observables et que tout ça a pété mon crane parce que dans le javascript pur, il n'y a rien de tout ça)

Théorie des graphes
- un graph est une structure mathématique aui permet de représenter des relations entre des objets

- fonctionnement d'alien signals
  - remettre l'example pour expliquer ce que l'on va voir ensemble

- un peu de théorie d'abord et ensuite, on va lier ça à la pratique
théorie des graphs dans un premier temps puis théorie de la réactivité

- Différents systèmes de réactivité
https://www.youtube.com/watch?v=XB993rQ-5DY
https://www.builder.io/blog/reactivity-across-frameworks
  - Dirty checking
  - Observable
  - Signals

- Précisément dans Vue (et du coup, il faut potentiellement l'expliquer)
instance.scope.on() (pour capturer les effets => devient l'effet scope actif)
const effect = (instance.effect = new ReactiveEffect(componentUpdateFn)) => watch pour mettre à jour le DOM lorsque l'une des dépendances change (et trigger les parents via les emit)
instance.scope.off() (restore l'effet scope actif par le précédent)

https://www.youtube.com/watch?v=2ZahQhb98-E

et un coup sur Vue Vapor parce que du coup, on n'as pas de Virtual DOM et un effectScope autour de chacun des éléments du dom qui doivent être réactif

et comme ça, on aura fait le tour de la réactivité dans le frontend

et à la fin, ajouter toutes les questions et tout (avec Inalia qu'il faut continuer à développer)

 -->

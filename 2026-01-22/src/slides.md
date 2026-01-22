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
title: "Inertia: Un Anneau pour les gouverner tous."
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,inertia,spa,laravel,vue,react,svelte,framework
event: Paris TypeScript
date: 9 décembre 2025
---

# Inertia: Un Anneau<br />pour les gouverner tous.

<!--

Bonsoir tout le monde, j'espère que vous allez bien.

-->

---
layout: intro
intro: Ingénieur chez <span class="i-custom-takima inline-block size-5 align-text-top"></span> Takima
---

<!--

Je me présente, je m'appelle Estéban ...

-->

---
name: Overview
layout: inalia-overview
transition: slide-up
---

<!--

Avant d'aller plus loin, je vous invite à scanner ce QR code...

-->

---
name: Qui êtes-vous ?
---

<Inalia :questionId="3" />

<!--

Pour bien commencer ce petit talk, j'aimerais en savoir un peu plus sur vous. Qui êtes-vous ? On va commencer simple. Vous pouvez répondre via la page sur laquelle vous avez atterri juste avant ou simplement en scannant ce QR code. Vous pouvez mettre choisir plusieurs choix dans la liste. L'idée, c'est de pouvoir adapter un petit peu adapter la présentation avec les réponses que vous allez pouvoir faire.

-->

---
name: Inertia, ça vous parle ?
---

<Inalia :questionId="2" />

<!--

Et tant qu'on est à apprendre à ce connaître, est-ce que Inertia ça vous parle ? Est-ce que vous l'avez déjà utilisé ? C'est peut-être la première fois que vous entendez ce nom ce soir ? Je veux tout savoir !

-->

---
name: Qu'est-ce que je fais ici ?
---

<img src="/devoxx-2023.jpg" class="absolute inset-0" />

<!--

Avec toutes cette belle présentation, commençons.

Je suis très heureux d'être ici ce soir et en même temps, je suis un peu gêné.

Ça fait 3 ans que j'écris des conférences et si la première a pu être laborieuse, je crois que celle-ci a été, et de très loin, la plus complexe. Non pas parce que le sujet est particulièrement compliqué, mais parce que on vit dans une étrange période où vous avez tous un Aristote (précepteur d'Alexandre le Grand) dans votre poche, disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.

-->

---
name: Dis-m'en plus sur Inertia
layout: ai
---

<TellMeMoreAboutInertia user-prompt="Je suis développeur web et j'ai vu passer un project qui s'appelle Inertia. Tu peux m'en dire plus ?" />

<!--

Demandez-lui [enter] s'il peut vous en dire plus sur ce qu'est Inertia et en quelques secondes, [enter] ils vous répondra mieux que je ne pourrais le faire.

[expliquer et donner du context avec la réponse de l'IA comme support]

-->

---
name: Pourquoi venir m'écouter parler ce soir ?
---

<Inalia :questionId="4" />

<!--

// ajouter un bouton pour demander à l'IA de résumer les réponses des gens (oui, faut le faire ça, ça peut -être marrant)

 -->

<!--

Mais alors, pourquoi venir m'écouter parler ce soir, pendant 20 minutes ? C'est une question que je me suis posée et plus généralement, c'est l'enseignement et l'apprentissage qui est remis en question. Qu'est-ce que doit être le professeur, le conférencier aujourd'hui, dans un monde où il n'est plus le sachant ? Dans un monde où l'intelligence est disponible as a service ? Pour l'instant, je vous le dit, je n'ai pas la réponse. D'autant que si ça se trouve, vous êtes juste venus pour écouter Eduardo et manger des pizzas. Et c'est ok. Si vous voulez manger des pizzas, on peut aller manger des pizzas.

-->

---
name: Les alternatives à Inertia
layout: ai
transition: slide-up
---

<InertiaAlternatives user-prompt="Si je ne veux pas utiliser Inertia, quelles sont les alternatives ? (présente les avantages et les défauts de ces autres solutions)" />

<!--

Mais on pourrait se dire quand même : "Estéban, tu dois pouvoir apporter de la transversalité, un contexte, une vision que l'IA ne peut pas avoir." Si seulement... [enter] Mais demandons-lui pour voir. [enter] Je ne vais pas vous mentir, face à ça, je me sens un peu con et inutile.

[expliquer et donner du context avec la réponse de l'IA comme support]

Sur les recommandations, je ne suis relativement pas d'accord avec l'IA.

Par défaut, je partirais sur Inertia. Ensuite, s'il y a des besoins fort en SEO, il est possible d'activer le SSR d'Inertia. S'il y a des contraintes organisationnelles fortes, comme un découpage entre ceux qui font du frontend et ceux qui font du backend, ou une organisation tournée microservices, là, oui, faire une SPA classique avec une API REST c'est sûrement plus adapté. Mais regardez bien autour de vous, dans vos organisations, dans vos outils internes, je suis prêt à parier qu'Inertia suffit la plupart du temps. Dans les app de type CRUD, c'est exceptionnel comme outil.

-->

---
name: Spécificités d'Inertia
layout: ai
---

<InertiaSpecificities user-prompt="Tu peux me donner des spécificités Inertia ? Ses grandes features ? Avec du code" />

<!--

Maintenant qu'on a vu ce qu'était Inertia, son placement dans l'écosystème face à d'autres solutions, peut-être qu'on pourrait commencer à tester l'outil. Ou peut-être qu'on peut juste demander à l'IA. [enter]

[expliquer et donner du context avec la réponse de l'IA comme support]

-->

---
name: Qu'est-ce qu'on fait maintenant ?
layout: center-card
img: https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# Qu'est-ce qu'on fait maintenant ?

<!--

Alors maintenant qu'on a dit tout ça, qu'est-ce qu'on fait ? Je pourrais vous laisser avec vos téléphones. J'ai apporté le sujet, vous pouvez continuer à creuser avec votre assistant préféré et bénéficier d'un apprentissage personnalisé.

-->

---
name: Que voulez-vous faire ce soir ?
---

<Inalia :questionId="5" />

<!--

Donc je vous le demande, que voulez-vous faire ce soir ?

En fait, il y a deux choses que je peux vous apporter. La première, c'est vous apprendre à parler avec l'IA d'un sujet que vous ne maîtriser pas. Mais ça pourrait faire l'objet d'un autre talk donc on ne va pas le faire ce soir. La seconde, c'est vous apporter un retour d'expérience terrain, concret et réel de l'utilisation d'Inertia. Ce que je vous propose, c'est qu'on se penche sur du code et sur vos questions en lien avec Inertia sur des sujets où l'IA ne pourrait pas vous répondre facilement, sur des cas potentiellement très spécifiques à vos projets.

Pour la suite, lever la main, interagissons ensemble et si vous voulez faire du complément à ce que je dis ou même vais faire, à apporter des précisions. C'est votre soirée aussi.

-->

---
name: Live Coding
layout: center-card
img: https://images.unsplash.com/photo-1756489693617-b6586eed7e51?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# Live Coding

<!--

- Traditional monolith
- How to make our app interactive?
- Link
- Form
- Optional Props

-->

---
name: Outro
layout: outro
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Check out Inertia website <a href="https://inertiajs.com/" target="_blank">inertiajs.com</a>
  </li>
  <li>
    Explore the <a href="https://inertiajs.com/demo-application" target="_blank">demo application</a>.
  </li>
    <li>
    Learn more about <a href="https://inertiajs.com/the-protocol" target="_blank">the protocol</a>.
  </li>
  <li>
    Join the community on <a href="https://discord.gg/inertiajs"  target="_blank">Discord</a>.
  </li>
</ul>

<!--
Ce que vous venez de découvrir, au travers une tentative nouvelle, ce n'est qu'un aperçu de tout ce qu'il est possible de faire avec Inertia. Je vous invite à aller lire la documentation et à explorer l'application de démonstration pour avoir une vision plus réaliste.

Honnêtement, donnez-lui une chance, vous ne le regretterez pas.

Merci à tous !

C'était Estéban. Et pour laisser un feedback, c'est juste là.
-->

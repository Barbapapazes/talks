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
title: "Inalia: Un Anneau pour les gouverner tous."
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,e18e,web,performance
event: Paris TypeScript
date: 9 décembre 2025
---

# Inalia: Un Anneau<br />pour les gouverner tous.

<!--

Bonsoir tout le monde, j'espère que vous allez bien.

-->

---
layout: intro
intro: Ingénieur chez <span class="i-custom-takima inline-block size-5 align-text-top"></span> Takima
---

<!--

Je me présente, Estéban ...

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

<!-- <Inalia :questionId="1" /> -->

<!--

Slide avec un sondage pour demander aux gens qui ils sont (développeurs, managers, étudiants, curieux de l'IA, CTO, juniors, seniors, etc.)

 -->

 <!--

 potentiellement ajouter une slide pour demander si les gens connaissent Inertia ou pas et s'ils l'ont déjà utilisé ou pas

  -->

<!--

Pour bien commencer ce petit talk, j'aimerais en savoir un peu plus sur vous, qui êtes-vous ? Vous pouvez répondre via la page sur laquelle vous avez atterri en scannant le QR code juste avant ou simplement en scannant ce QR code. Vous pouvez mettre choisir plusieurs choix dans la liste. L'idée, c'est de pouvoir adapter la présentation en fonction des profils présents dans la salle.

-->

---
name: Qu'est-ce que je fais ici ?
---

<img src="/devoxx-2023.jpg" class="absolute inset-0" />

<!--

Je suis très heureux d'être ici ce soir et en même temps, je suis un peu gêné.

Ça fait 3 ans que j'écris des conférences et si la première a pu être laborieuse à écrire, je crois que celle-ci a été, et de très loin, la plus complexe. Non pas parce que le sujet est particulièrement compliqué, mais parce que on vit dans une étrange période où vous avez tous un Aristote (précepteur d'Alexandre le Grand) dans votre poche, disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.

-->

---
name: Dis-m'en plus sur Inertia
layout: ai
---

<TellMeMoreAboutInertia user-prompt="Je suis développeur web et j'ai vu passer un project qui s'appelle Inertia. Tu peux m'en dire plus ?" />

<!--

Demandez-lui s'il peut vous en dire plus sur ce qu'est Inertia [enter] et en quelques secondes, ils vous répondra mieux que je ne pourrais le faire. [enter]. [lire le résultat et passer sur les informations importantes]

-->

---
name: Pourquoi venir m'écouter parler ce soir ?
---

<!-- <Inalia :questionId="2" /> -->

<!--

// slide avec la question "Pourquoi venir m'écouter parler ce soir ?" (en texte libre et peut-être revoir la présentation de la slide de base de Inalia via une slide custom)
// ajouter un bouton pour demander à l'IA de résumer les réponses des gens

 -->

<!--

Mais alors, pourquoi venir m'écouter parler ce soir, pendant 20 minutes ? C'est une question que je me suis posée et plus généralement, c'est l'enseignement qui est remis en question. Qu'est-ce que doit être le professeur, le conférencier aujourd'hui, dans un monde où il n'est plus le sachant ? Dans un monde où l'intelligence est disponible as a service ? Pour l'instant, je n'ai pas la réponse. D'autant que si ça se trouve, vous êtes juste venus pour écouter Eduardo et manger des pizzas. Et c'est ok. Si vous voulez manger des pizzas, on peut aller manger des pizzas.

-->

---
name: Les alternatives à Inertia
layout: ai
---

<InertiaAlternatives user-prompt="Si je ne veux pas utiliser Inertia, quelles sont les alternatives ? (présente les avantages et les défauts de ces autres solutions)" />

<!--

Mais on pourrait se dire quand même : "Estéban, tu dois pouvoir apporter de la transversalité, un contexte, une vision que l'IA ne peut pas avoir." Si seulement... [enter] Mais demandons-lui pour voir. [enter] Je ne vais pas vous mentir, face à ça, je me sens un peu con et inutile.

[lire et expliquer la réponse de l'IA]

-->

---
name: Qu'est-ce qu'on fait maintenant ?
---

<!--

Alors maintenant qu'on a dit ça, qu'est-ce qu'on fait ? Je pourrais vous laisser avec vos téléphones et puis vous dire que vous avez tout ce qu'il vous faut dans la poche. J'ai apporté le sujet, vous pouvez creuser avec votre assistant préféré et bénéficier d'un apprentissage personnalisé.

-->

---
name: Que voulez-vous faire ce soir ?
---

<!-- <Inalia :questionId="3" /> -->

<!--

// slide qui demande ce que les gens aimeraient apprendre ce soir, en sachant que je suis là, en physique.

// TODO: rebosser le texte

Donc je vous le demande, que voulez-vous faire ce soir ?

En fait, il y a deux choses que je peux vous apporter. La première, c'est vous apprendre à parler avec l'IA d'un sujet que vous ne maîtriser pas. La seconde, c'est vous apporter un retour d'expérience terrain, concret et réel de l'utilisation d'Inertia. Pour la première, ça pourrait faire l'objet d'une conférence à part entière donc on ne va pas le faire ce soir. Pour la seconde, on peut se pencher sur du code et sur vos questions en lien avec Inertia sur des sujets où l'IA ne pourrait pas vous répondre facilement. Et il y en a.

// Ajouter le fait que les gens peuvent lever la main pour poser des questions en direct, qu'on fasse un truc plus interactif, qu'on en discute ensemble, et que si vous voulez ajouter des choses, aller y

-->

---
name: Live Coding
---

<!--

linkedin

Les conférences sont mortes et enterrées, vive les conférences !
ou un truc du genre pour dire qu'il va falloir fortement se réinventer pour continuer à intéresser les gens

écrire un article sur ça sur mon blog (avec des passages de la conférence

j'étais à un concert et punaise, sortir le nez de la folie de l'IA, le temps de quelques heures, pour se laisser porter par la création de l'autre, un plaisir devenu rare et pourtant si appréciable

What are we doing now ?
Where is the sense of what we are doing now ?

-->

<!--

- À quel type de projet Inertia est-il vraiment destiné, et dans quels cas il vaut mieux éviter ?
- Comment penser son application mentalement : SPA, MPA, ou un hybride ?
- Quels sont les concepts à absolument comprendre pour être productif rapidement ?
- Peux-tu montrer un vrai cas d’usage en production, avec ses avantages et ses limites ?
- Quand tu as commencé avec Inertia, qu’est-ce qui a été plus simple que prévu ? Et qu’est-ce qui a été plus compliqué ?
- Quels sont les compromis assumés par Inertia ?

-->

<!--

et si tu faisais un talk ? je t'accompagne pour te lancer

-->

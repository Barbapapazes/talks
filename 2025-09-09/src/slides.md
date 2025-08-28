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
# addons:
#   - slidev-addon-inalia
title: "Inertia: Un Anneau pour les gouverner tous"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,full-stack,inertia,javascript,laravel
event: HumanTalks Paris
date: 9 septembre 2025
---

# Inertia: Un Anneau<br />pour les gouverner tous

<!--

TODO: trouver un moyen de filer un lien vers les slides rapidos
TODO: Twitch dans les réseaux sociaux et retirer le bluesky

De quoi on parle pendant 10 minutes ?

Objectif: Donner envie à l'audience d'essayer Inertia dans un projet

- Cover
- QR code Inalia
- Qu'est-ce que Inalia (AD)

- Présentation rapide
- Timer 10 minutes

- Question Inalia (As-tu déjà utilisé Inertia ?) (multi-select) (début des explications de ce qu'est Inertia)
  - jamais
  - en perso
  - en pro

- Inertia  (optionnel)

- Live Coding (dans la seconde moitié donc 5 minutes) (démontrer la simplicité apportée par Inertia)
  - utilisation classique d'un template engine
  - view() => inertia() dans le retour des contrôleurs (swap)
  - parler de l'implication de passer de `view` à `inertia`. Dynamiser le frontend donc utilisation d'un framework frontend et donc, implicitement, nécessite de construire une API. (repasser sur des slides pour l'expliquer)
  - useForm (only, optional, defer) (nouveau composant form)
  - Link
- Résumé, Fin et Feedback

 -->

---
name: Overview
layout: inalia-overview
---

---
name: Inalia
layout: inalia
---

<!--

le qr, la question, les feedback, tout viens de là
plateforme pour rendre interactifs les talks
intégré à Slidev

et on le fait sur Twitch, alors venez

(en 30 secondes max)

 -->

---
name: Intro
layout: intro
intro: Ingénieur logiciel Avionique chez <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

---
name: Countdown
---

---
name: Qui a déjà utilisé Inertia ?
---

<Inalia :questionId="1" />

---
name: De la théorie à la pratique
layout: center-card
img:
---

# Talk is cheap.<br />Show me the code.

<!--

Présentation des fichiers importants
- web.php
- resources/{views,js}

Habituellement, template engine server-side (blade dans notre cas)

Mais qu'est-ce qui se passe si on veut une application interactive avec un framework frontend ?

TODO: dans l'exemple de base, passer des props dans la view pour montrer que ça fonctionne bien lors du changement ensuite vers (inertia)

API



 -->

---
name: Du rendu côté serveur à la SPA
---

<!--

à voir mais la slide pourrait disparaître dans la mesure où tout peut se dire à l'oral

(ou juste mettre le mot API en énorme sur la slide)

text à dire : https://inertiajs.com/who-is-it-for#:~:text=But%20what%20happens,a%20better%20way.

mais il existe une autre voie, c'est Inertia.

 -->

---
name: Encore du code
layout: center-card
img:
---

# I want more.

<!--

passage de view() à inertia() dans web.php pour montrer que ça fonctionne pareil et que le template engine devient le framework JS

écrire le Route::get('/register', ...) en live
ajouter le composant Form en live
ajouter le processing en live
ajouter la gestion des erreurs en live

ajouter un lien vers l'index.vue


TODO: faire une nouvelle page qui ne charge rien. sauf le time via une props, avoir un button pour load data, déjà ça load mais ça change le time, donc on met le only

-> on peut être très granulaire dans la gestion des data
et il existe même un defer pour ne charger que les données après le chargement de la page ou lorsque le composant est visible.


TODO: mettre le code final ici

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



 -->

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
title: "Inertia: Un Anneau pour les gouverner tous"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,full-stack,inertia,javascript,laravel
event: HumanTalks Paris
date: 9 septembre 2025
---

# Inertia: Un Anneau<br />pour les gouverner tous

<!--

_Il faut démarrer l'application Laravel (https://github.com/barbapapazes/inertia-un-anneau-pour-les-gouverner-tous) et se mettre dans le fichier `routes/web.php`._

Bonsoir tout le monde !

Vous allez bien ?

L'objectif des 10 prochaines minutes est simple, vous donnez l'envie de tester Inertia dans vos projets. Inertia, c'est un outil que j'utilise tant professionnellement que personnellement et dont je ne peux plus me passer aujourd'hui.

-->

---
name: Overview
layout: inalia-overview
---

<!--

Avant d'aller plus loin, je vous invite à scanner ce QR code.

Il vous mènera sur une page où vous allez pouvoir retrouver mes réseaux, répondre à des questions, pour le moment, ne le faites pas, et même poser vos questions auxquelles je vais pouvoir répondre au fur et à mesure.

À la fin, vous pourrez me donner un feedback. Mais à la fin, parce que ça ne serait pas très objectif de le faire dès maintenant.

Et à tout moment, vous pouvez réagir à ce que je dis, si vous trouvez ça drôle, si vous aimez ou simplement si vous êtes d'accord.

-->

---
name: Inalia
---

<div class="absolute top-1/2 left-1/2 -translate-1/2 space-y-2">
  <div class="flex flex-row items-center gap-2">
    <img src="https://inalia.app/favicon.svg" alt="Inalia logo" class="size-16" />
    <span class="text-5xl font-serif font-medium"> Inalia </span>
  </div>
</div>

<div class="absolute bottom-10 right-1/2 translate-x-1/2 space-y-2 text-center text-lg opacity-60 font-light">
  <p class="">
    Développé en live sur <a href="https://twitch.tv/barbapapazes" class="font-normal border-0">Twitch</a>
  </p>
  <hr />
  <p>
    Accessible sur <a href="https://inalia.app" class="font-normal border-0"> inalia.app </a>
  </p>
</div>

<!--

Derrière le QR code et la page sur laquelle vous venez d'atterrir, il y a une plateforme qui s'appelle Inalia.

Inalia, c'est un SaaS que je développe en live sur Twitch avec l'objectif de rendre nos présentations plus interactives et même mémorables !

Il va sortir de sa bêta privée dans les prochaines semaines et vous pouvez dès à présent vous pré-inscrire sur inalia.app.

-->

---
name: Intro
layout: intro
intro: Ingénieur logiciel Avionique chez <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

<!--

Mais l'objectif ce soir, c'est surtout de vous parler d'Inertia.

Avant de rentrer dans le vif du sujet, je me présente, je m'appelle Estéban. Je suis ingénieur logiciel Avionique chez MaiaSpace. MaiaSpace c'est une filiale d'ArianeGroup qui vise à développer un lanceur spatial partiellement réutilisable.

Quand je ne suis pas au travail, je gravite autour des écosystèmes de Laravel, Vite, Vue et Nuxt.

Et lorsqu'il me reste un peu de temps j'écris des articles.

Dans le même temps, vous pouvez me retrouver partout et surtout sur Twitch où je stream plusieurs fois par semaine.

-->

---
name: Qui a déjà utilisé Inertia ?
---

<Inalia
  question="Qui a déjà utilisé Inertia ?"
  type="single_select"
  chart="donut"
  :data="[{ label: 'Oui', count: 0, color: '#0FA91A' }, { label: 'Non', count: 18, color: '#A91E0F' }]"
/>

<!--

Mais assez parlé de moi, parlons vraiment d'Inertia.

Qui, parmi vous, a déjà utilisé Inertia ?

Je vous laisse y répondre soit via la page Inalia sur laquelle vous êtes arrivé en cliquant sur la première question, soit via le QR code juste ici.

En attendant, laissez-moi vous parler un peu d'Inertia.

Inertia n'est ni un nouveau framework frontend, ni un framework backend. C'est un protocole qui permet de lier les deux et qui vient s'ajouter à votre stack par le biais d'adaptateurs. Ainsi, il permet de créer ce qu'ils appellent un "modern monolith".

Je sais, ça peut sembler un peu abstrait pour l'instant, mais vous allez voir, c'est assez transparent et très puissant.

-->

---
name: De la théorie à la pratique
layout: center-card
img:
---

# Talk is cheap.<br />Show me the code.

<!--

Pour vous convaincre d'essayer l'outil, rien de mieux qu'un peu de code.

Là, on se trouve dans une application Laravel avec l'adaptateur Inertia d'installé.

Sous vos yeux, c'est le fichier `web.php` dans lequel on définit les routes de notre application.

On y voit la route `/` qui renvoie une vue `index` avec une prop `time` qui contient l'heure actuelle et une seconde prop `event` qui contient le nom du meetup.

```php
Route::get('/', function () {
    return view('index', [
        'time' => now()->toDateTimeString(),
        'event' => 'HumanTalks Paris',
    ]);
});
```

La vue, c'est la suivante.

_Ouvrir le fichier resources/views/index.blade.php_

```blade
<div>
  Il est actuellement {{ $time }} à {{ $event }}.
</div>
```

Rien de bien sorcier, c'est une page rendue complètement côté serveur avec un template engine. D'ailleurs, on peut s'y rendre.

Maintenant, imaginons que l'on veuille rendre cette superbe application interactive. Quels sont nos choix ?

- Utiliser une librairie comme Alpine ou Unpoly

Ça ne me va pas du tout. Ces libraries n'ont pas du tout la puissance d'un framework frontend moderne dont on va avoir besoin.

- Construire une API JSON et utiliser un framework frontend comme Vue, React ou Svelte

Ça ne me va pas non plus. Construire une API, c'est long, c'est complexe, ça complexifie le frontend et puis ensuite, il faut la maintenir.

Donc on est coincé ? Fin du talk ? Merci au revoir, on remballe.

Évidemment non, grâce à Inertia.

Comme je vous le disais tout à l'heure, Inertia, c'est un un protocole entre le frontend et le backend avec des adaptateurs ce qui veut dire que plutôt que de renvoyer une vue, on va renvoyer une page Inertia.

_Changement de `view()` en `inertia()`_

```php
Route::get('/', function () {
    return inertia('index', [
        'time' => now()->toDateTimeString(),
        'event' => 'HumanTalks Paris',
    ]);
});
```

_Ouvrir le résultat dans le navigateur._

Visuellement, aucune différence ! Et pourtant, on vient de remplacer le template engine par Vue.

_Ouvrir le fichier `resources/js/Pages/index.vue`_

```vue
<script setup>
const props = defineProps({
  time: String,
  event: String,
});
</script>

<template>
  <div>
    Il est actuellement {{ props.time }} à {{ props.event }}.
  </div>
</template>
```

_Écrire un `Bonjour !` avant le `Il est actuellement` pour qu'on voit que ça fonctionne._

C'est peut-être un détail pour vous, mais ça veut dire qu'on peut profiter de tout l'écosystème frontend qu'on connaît. C'est à dire les paquets npm et Vite.

Mais, c'est pas tout ! Inertia vient avec un tas de fonctionnalités pour tout nous simplifier le développement de ces modern monolith.

L'une des choses que l'on fait le plus, c'est devoir gérer des formulaires. Inertia vient avec un composant `Form`.

Définissons une nouvelle route `/register`.

_Ouvrir le fichier `routes/web.php`._

```php
Route::get('register', function () {
    return inertia('register');
});
```

Cette route renvoie la page `register` que l'on peut aller explorer.

Vous devez savoir que j'ai préparé la route POST `/register` pour recevoir les données du formulaire.

_Scroller un peu plus bas dans le fichier `routes/web.php`._

_Ouvrir le fichier `resources/js/Pages/register.vue`_

C'est rien de plus qu'un formulaire avec quelques champs avec quelques inputs.

Allons voir la page et soumettons le formulaire.

_Ouvrir la page `/register` dans le navigateur et soumettons le formulaire._

On voit directement un problème. La page se recharge complètement. Ce n'est pas très cohérent avec l'utilisation d'un framework frontend.

Maintenant, remplaçons le formulaire HTML par le composant `Form` d'Inertia.

```vue
<script setup>
import { Form } from '@inertiajs/vue3';
</script>

<template>
  <Form method="post" action="/register">
    <input name="email" type="email" placeholder="Email" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </Form>
</template>
```

Si l'on soumet à nouveau le formulaire, la page ne recharge plus !

Mais ce n'est pas tout.

On peut gérer les erreurs de validation, afficher un message dès lors que le formulaire est soumis et même le réinitialiser automatiquement.

```vue
<script setup>
import { Form } from '@inertiajs/vue3';
</script>

<template>
  <Form method="post" action="/register" reset-on-success #default="{ errors, recentlySuccessful }">
    <input name="email" type="email" placeholder="Email" />
    <div v-if="errors.email" class="error">{{ errors.email }}</div>

    <input name="password" type="password" placeholder="Password" />
    <div v-if="errors.password" class="error">{{ errors.password }}</div>

    <span v-if="recentlySuccessful">
      Registered.
    </span>
    <button type="submit">Register</button>
  </Form>
</template>
```

Pour naviguer de page en page, Inertia vient aussi avec un composant `Link`.

```vue
<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
  <Link href="/">Home</Link>
</template>
```

Ça peut sembler naturel mais si on y réfléchit quelque instant, c'est assez génial parce qu'on n'a pas définit de router côté client. On utilise le router du serveur et on évite de dupliquer cette logique.

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

Ce que vous venez de découvrir, ce n'est qu'un aperçu de tout ce qu'il est possible de faire. Je vous invite à aller lire la documentation et à explorer l'application de démonstration pour avoir une vision plus réaliste.

Il est bon de rappeler qu'Inertia, ce n'est pas magique et ça ne résoudra pas tous vos problèmes. Mais ça peut en résoudre vraiment beaucoup et vous permettre de garder conserver une grande vélocité.

Honnêtement, donnez-lui une chance, vous ne le regretterez pas.

Merci à tous !

C'était Estéban. Et pour laisser un feedback, c'est juste là.

 -->

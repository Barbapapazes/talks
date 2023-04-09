---
layout: cover
highlighter: shiki
css: unocss
name: Unpoly pour reprendre le contrôle !
colorSchema: dark
transition: fade-out
title: Unpoly pour reprendre le contrôle !
---

<h1 relative z-1>
  <div text-primary font-semibold>
    Unpoly
  </div>
  <div>
    pour reprendre le contrôle !
  </div>
</h1>

<div uppercase text-lg tracking-wider>
  Estéban Soubiran  
</div>

<div abs-br class="-right-12 -bottom-12">
  <img src="/green-cloud.png" />
</div>

<div abs-br mx-10 my-12 flex="~ col" text-sm text-right>
  <span>
    Devoxx · web
  </span>
  <span opacity-80>
    12 avril 2023
  </span>
</div>

<!--
Salut et bienvenu.

Ce soir, nous allons pouvoir discuter d'un outil qui s'appelle Unpoly.

Avant de vous en dire plus, qui parmis vous a déjà fait du web avec des frameworks frond-end comme React, Angular, Vue, Svelte, Qwik ?

...

Et qui a déjà pu faire du web avec des frameworks come Laravel, Rails, Django ou AdonisJS ?

...
-->

---
name: Intro
layout: intro
---

<h1>
  Estéban Soubiran
</h1>

<div mt-8 leading-10 opacity-80>
  <div>
    Élève ingénieur en cybersécurité
  </div>
  <div>
    Responsable du Classement des Associations
  </div>
  <div>
    Développeur web chez Aneo
  </div>
</div>

<div mt-12 flex="~ row" gap-8 font-light transition>
  <a class="border-none! group" href="https://esteban-soubiran.site">
    <ph-user-light class="group-hover:text-primary" />
    <span> esteban-soubiran.site </span>
  </a>
  <a class="border-none! group" href="https://github.com/barbapapazes">
    <ph-github-logo-light class="group-hover:text-primary"/>
    <span> Barbapapazes </span>
  </a>
  <a class="border-none! group" href="https://www.linkedin.com/in/esteban25/">
    <ph-linkedin-logo-light class="group-hover:text-primary"/>
    <span> Estéban Soubiran </span>
  </a>
</div>

<!-- TODO: Mette une meilleure qualité -->
<img src="https://esteban-soubiran.site/esteban.webp" abs-tr w-35 mt-32 mr-40 rounded-full />

<!--
Avant de commencer qui suis-je ?

Je m'appelle Estéban Soubiran. Je suis actuellement 
- Élève ingénieur en cybersécurité à l'INSA Centre Val de Loire
- Responsable du Classement des Associations, une véritable aventure pour les associations étudiantes aux travers différents évènements en ligne et physique
- Développeur web chez Aneo, une agence en transformation digital

Vous pouvez me retrouver principalement sur LinkedIn où je suis le plus actif ou sur GitHub où où ce talk sera déposée.
-->

---
name: Le fil rouge
layout: section
---

<h1 relative z-1>
  Notre <span text-primary>fil rouge</span>
</h1>

<v-click>

  <div abs-br class="-right-12 -bottom-12">
    <img src="/green-cloud.png" scale-110 />
  </div>

  <div abs-br class="-right-4 -bottom-4">
    <img src="/yellow-cloud.png" scale-105 />
  </div>

  <div abs-br right-2 bottom-4>
    <img src="/atom.png" h-75 />
  </div>

</v-click>

<v-click>
  <div relative z-1 opacity-80 text-xl>
    <div>
      Atom, le robot qui voulait faire une webapp
    </div>
  </div>
</v-click>

<!--
Tout au long de cette présentation, nous allons avoir un fil rouge.

Ce fil rouge, nous l’appellerons Atom (nom du robot de Real Steel) et c'est lui, ce petit robot.

Atom, il n'y connaît pas grand chose dans le développement web parce qu'il vient de commencer. Mais il a quand même de grandes ambitions. Il a envie de se faire une petite webapp pour gérer les talks qu'il a vu et ceux qu'il aimerait aller voir dans les années à venir.

TODO: voir l'application qu'on veut dev ce soir mais faire un lien avec le classement des associations la plateforme de vote (et surtout l'article sur mon site)
-->

---
name: La MERN stack
---

<h1>
 La <span text-primary> MERN </span> stack
</h1>

<div flex="~" justify-evenly items-center h-90 text-2xl>
  <div w-full grid="~ cols-4">
  <v-clicks>

  <div flex="~ col" items-center gap-4>
    <vscode-icons-file-type-mongo w-30 h-30 shrink-0/>
    <div><span text-primary>M</span>ongoDB</div>
  </div>

  <div flex="~ col" items-center gap-4>
    <simple-icons-express w-30 h-30 shrink-0/>
    <div><span text-primary>E</span>xpress</div>
  </div>

  <div flex="~ col" items-center gap-4>
    <vscode-icons-file-type-reactjs w-30 h-30 shrink-0/>
    <div><span text-primary>R</span>eact</div>
  </div>

  <div flex="~ col" items-center gap-4>
    <vscode-icons-file-type-node w-30 h-30 shrink-0/>
    <div><span text-primary>N</span>ode.js</div>
  </div>

  </v-clicks>
  </div>
</div>

<v-click>
<div text-center opacity-80 text-xl>
  Il se lance alors à corps perdu...
</div>
</v-click>
<!-- TODO: Voir pour remettre un point pour appuyer sur le fait qu'on veut faire ce type d'application (peut-être remettre les spec) -->

<!--
Pour mener à bien la réalisation de sa webapp, Atom va faire un tour sur YouTube et puis il va tomber sur la MERN stack.

La MERN stack, c'est
- MongoDB pour la base de données
- Express pour le serveur, accessoirement obsolète
- React pour le front-end
- Node.js pour supporter Express et React

Avec elle, il se lance à corps perdu en s'imaginant que le voyage va être cool et simple !
-->

---
name: Les obstacles
---

<h1>
  <span text-primary>"</span>Quelques<span text-primary>"</span> obstacles
</h1>

<v-click>
  <div abs-tr class="-top-12 -right-24">
    <img src="/lemon-cloud.png" rotate-20 />
  </div>
  <div abs-tr class="-top-4">
    <img src="/atom.png" h-75 rotate-60 v-if="$slidev.nav.clicks < 17 && $slidev.nav.currentPage === 5" />
  </div>
</v-click>

<div mt-8 grid="~ cols-5" gap-y-6 class="w-3/4">
  <v-clicks>
    <vscode-icons-file-type-babel2 w-16 h-16/>
    <logos-webpack w-16 h-16/>
    <logos-vitejs w-16 h-16/>
    <logos-esbuild w-16 h-16/>
    <logos-rollupjs w-16 h-16/>
    <vscode-icons-file-type-mongo w-16 h-16/>
    <simple-icons-express w-16 h-16/>
    <vscode-icons-file-type-reactjs w-16 h-16/>
    <logos-nextjs-icon w-16 h-16/>
    <logos-remix-icon bg-white p-1 rounded w-16 h-16/>
    <logos-swr bg-white p-1 rounded w-16 h-16/>
    <logos-redux w-16 h-16/>
    <vscode-icons-file-type-vanilla-extract w-16 h-16/>
    <logos-react-query-icon w-16 h-16/>
    <logos-storybook-icon w-16 h-16/>
  </v-clicks>
</div>

<v-click>
  <div></div>
</v-click>
<div abs-tr class="-top-4">
  <img src="/atom.png" h-75 rotate-60
      v-if="$slidev.nav.clicks >= 17 || $slidev.nav.currentPage === 6"
      v-motion
      :initial="{ y: 0 }"
      :enter="{ y: 300, rotate: 60 }"
    />
</div>


<!-- <div mt-12 flex="~ row" justify-evenly text-5xl>
<v-clicks>
   <div border-b-1px border-primary>
    SSR
  </div>
   <div border-b-1px border-primary>
    SSG
  </div>
   <div border-b-1px border-primary>
    CSR
  </div>
</v-clicks>
</div> -->

<!--
Mais voilà, au cours du développement de sa webapp, il tombe de haut. Lui qui pensait que c'était l'histoire de quelques heures, il se retrouve à devoir apprendre et comprendre tout un tas de concept ou à faire des choix complexes.

- Babel
- Webpack
- Vite
- Esbuild
- Rollup
- MongoDB
- Express
- React
- Next
- Remix
- SWR
- Redux
- Vanilla Extract
- React Query
- Storybook

Quelques outils parmi d'autres.

Il se pose ensuite la question de s'il doit faire du SSR (Server Side Rendering), du SSG (Server Side Generation) ou du CSR (Client Side Rendering).

Pour Atom, ça commence à faire vraiment, vraiment, beaucoup d'outils d'un coup et il a l'impression qu'il ne va jamais s'en sortir, qu'il ne va jamais réussir à construire sa webapp.
-->

---
name: La solution
layout: section
---

<h1>
  La solution : <v-click><span text-primary>Unpoly</span></v-click>
</h1>

<!--
Heureusement, on a une solution pour Atom. Il s'agit de **Unpoly** !

Et oui, c'est quand même le titre de cette présentation, il est temps qu'on en parle.
-->

---
name: Complexité actuelle
---

<h1 text-center>
  Complexité <span text-primary>actuelle</span>
</h1>

<div abs-b mb-6 flex="~ row" justify-center>
  <img src="/current_complexity.png" class="w-3/4" />
</div>

<div abs-b mb-4 opacity-60 text-xs text-center>
  Crédit <a href="https://twitter.com/triskweline" class="border-none!">@triskweline</a> 
</div>

<!--
Avant de vous expliquer ce qu'est Unpoly et comment ça peut résoudre les problèmes d'Atom, on va s'intéresser rapidement à la complexité d'une webapp de nos jours.

On n'a ici les grands composants du serveur et du client d'une webapp.

Sur ce graphique, on peut remarquer 3 choses :
- C'est très complexe. Il y a beaucoup d'éléments.
- Le client ajoute une complexité important, à lui-même et au serveur puisqu'on voit la présence d'API sur le serveur.
- Il existe une redondance sur certaine partie comme l'autorisation, le routage et la gestion des dépendances.

Une complexité comme celle-ci est difficilement gérable par une unique personne et est induite par les Single Page App (SPA).
-->

---
name: Complexité recherchée
---

<h1 text-center>
  Complexité <span text-primary>recherchée</span>
</h1>

<div abs-b mb-6 flex="~ row" justify-center>
  <img src="/required_complexity.png" class="w-3/4" />
</div>

<div abs-b mb-4 opacity-60 text-xs text-center>
  Crédit <a href="https://twitter.com/triskweline" class="border-none!">@triskweline</a> 
</div>

<!--
Nous ce que l'on aimeriait, c'est cette complexité.

On observe la disparition de beaucoup d'éléments et presque plus rien chez le client. Une complexité comme celle-ci est gérable par une unique personne.

Bien sûr, cette simplification a 1 coût.
-->

---
name: Le nouvel idéal
---

<div flex="~ row" justify-center items-center h-full>
  <img src="/sweet_spot.png" class="w-8/12" />
</div>

<div opacity-60 text-xs text-center>
  Crédit <a href="https://twitter.com/triskweline" class="border-none!">@triskweline</a> 
</div>

<!--
Ce coût, c'est un compromis qu'il existe entre la fidélité de l'UI et la complexité.

La fidélité de l'UI, c'est la capacité de l'UI à être 

Pour les single page app, le compromis est une grande complexité pour une grande fidélité de l'UI.

Les SPA sont un excellent choix pour un certain type d'UI et donc de webapp. La philosophie autour d'Unpoly est de considérer ce type d'UI comme une exception et non comme le standard.

De l'autre côté, pour les multi page app (aussi appelée server-side app), le compromis est une petite complexité pour une petite fidélité de l'UI. L'idée autour d'autour d'Unpoly est de considérer que la plus part des problèmes peuvent être résolu avec ces Multi-Page App.

Ainsi, il se trouve que l'on peut trouver un compromis entre les 2 pour atteindre un nouvel idéal. Ce nouvel idéal, c'est une webapp construite à l'aide d'une multi page app et d'unpoly.

Unpoly permet un compromis intéressant puisqu'il n'ajoute que peu de complexité pour un gain important en terme de fidélité de l'UI.
-->

---
name: Multi Page App font bien
---

<h1 flex="~ col">
  <span> Ce que les Multi-Page App </span>
  <span text-green-400 font-semibold> font bien </span>
</h1>

<ol mt-12 text-2xl>
  <li>
    Large choix d'outils matures et éprouvés
  </li>
  <li>
    Technologie peu complexe
  </li>
  <li>
    Accès aux données de manière synchrone
  </li>
  <li>
    Temps du premier rendu (FCP)
  </li>
  <li>
    Fonctionne sur tous les types d'appareils
  </li>
</ol>

<!--
Du coup, pour comprendre Unpoly, voyons déjà ce qu'une multi page app fait de bien.

- Large choix d'outils matures et éprouvés comme Laravel, Rails, Django, etc.
- Technologie peu complexe
- Accès aux données de manière synchrone (pas besoin de faire des requêtes AJAX)
- Temps du premier rendu (FCP) rapide
- Fonctionne sur tous les types d'appareils

FCP: First Contentful Paint
-->

---
name: Multi Page App ne font pas bien
---

<h1 flex="~ col">
  <span> Ce que les Multi Page App </span>
  <span text-red-400 font-semibold> ne font pas bien </span>
</h1>

<ol mt-12 text-2xl>
  <li>
    Retour d'information sur l'interaction lente
  </li>
  <li>
    Chargement des pages détruit les états transitoires
  </li>
  <li>
    Interactivité limitée notamment sur la gestion des "layers"
  </li>
  <li>
    Animations complexes
  </li>
  <li>
    Gestion des formulaires complexes
  </li>
</ol>

<!--
Mais bien évidemment, une multi page app n'est pas parfaite.

- Retour d'information sur l'interaction lente
- Chargement des pages détruit les états transitoires
- Interactivité limitée notamment sur la gestion des "layers"
- Animations complexes (bien que la nouvelle API d'animation de Chrome puisse changer la donne)
- Gestion des formulaires complexes

Maintenant que l'on a la complexité en tête et les points faibles des multi page app, voyons comment Unpoly peut nous aider à atteindre l'idéal recherché.
-->
---
name: Démo
layout: section
---

<h1 text-primary>
  Démo
</h1>

---
name: Normal page flow
---

# Normal page flow

<div mt-20>
  <img src="/classic_page_flow.png" />
</div>

<div mt-4 text-lg>
  Les pages sont rendus entièrement par le serveur à chaque requête.
  <br />
  Les états qui ne sont pas dans l'URL sont perdus when on change de page.
</div>

<div abs-b mb-8 opacity-60 text-xs text-center>
  Crédit <a href="https://twitter.com/triskweline" class="border-none!">@triskweline</a> 
</div>


---
name: Unpoly page flow
---

# Unpoly page flow 

<div mt-20>
  <img src="/unpoly_page_flow.png" />
</div>

<div mt-4 text-lg>
  Par défaut, les pages sont toujours rendus entièrement par le serveur à chaque requête mais on utilise seulement un fragment.
  <br />
  Ce fonctionnement permet de garder les états qui ne sont pas dans l'URL.
</div>

<div abs-b mb-8 opacity-60 text-xs text-center>
  Crédit <a href="https://twitter.com/triskweline" class="border-none!">@triskweline</a> 
</div>

---
name: Progressive enhancement
---

# Progressive enhancement


<div mt-16 flex="~ row" justify-center>
  <img src="/progressive_enhancement.png" w-60/>
</div>

<div mt-8 text-center text-lg>
  Stratégie de développement où le <span text-primary>contenu est accessible par default</span>
  <br />
  et les fonctionnalités dépendants de l'environnement
</div>


<!--
Le progressive enhancement, c'est quoi ?

C'est une stratégie de développement qui met l'accent sur le contenu de la page permettant à chacun des utilisateurs d'accéder à l'information. Dans le même temps, on ajoute des fonctionnalités supplémentaires pour les utilisateurs qui ont un navigateur moderne ou une connexion internet rapide.

Pour bien comprendre, une petite métaphore s'impose. Imaginer un ascenseur et un escalator.
Si l'ascenseur est en panne, c'est pénible parce qu'il n'y a plus de moyen de monter dans les étages.
Mais si l'escalator est en panne, rien de grave, on peut toujours monter à pied. C'est simplement un peu plus long.

Et l'un comme l'autre ne vont pas partout.

Dans cette métaphore, l'ascenseur est notre SPA. C'est rapide, c'est moderne mais si ça casse, on ne peut plus rien faire.

L'escalator est notre multi page app avec Unpoly. Là, si Unpoly casse, on peut toujours utiliser l'app sans problème.

Regardons cela de plus près dans la démo.
-->

---
name: Et plus encore
---

<h1>
  Et <span text-primary> plus encore </span>
</h1>

<ul mt-8 text-2xl>
  <li>Customisation très poussée</li>
  <li>Animation</li>
  <li>Mise à jour passive des éléments</li>
  <li>Server Protocol</li>
</ul>

<!--
Unpoly, c'est plus que cela :
- Customisation très poussée qui permet d'adapter les attributs à énormément de situation. Tout les CSS sur les modals sont aussi personnalisable.
- Une possibilité d'animer les transitions entre les pages pour une application plus naturelle.
- Mise à jour passive des éléments pour permettre de mettre à jour des éléments sans recharger la page et sans interaction de l'utilisateur.
- Server Protocol pour ne rendre que les éléments qui ont changé et non la page entière. Cela permet de gagner en performance et en bande passante.
-->


---
name: Conclusion
---

<div mt-40 text-4xl text-center leading-10>
  Ne tombez pas dans le <span text-red-600>train de la hype</span> <br /> et choisissez l'<span text-primary>outil adapté</span> à votre projet.
</div>


<v-click>
  <div abs-bl mb-20 ml-12>
    <div>D'autres outils similaires</div>
    <ul>
      <li>Alpine.js, A rugged, minimal framework for composing behavior directly in your markup.</li>
      <li>html, high power tools for HTML</li>
    </ul>
  </div>
</v-click>

<!--
La conclusion de ce talk serait finalement de faire attention de ne pas tomber dans le train de la hype et de prendre le temps de choisir l'outil adapté à votre projet.

D'autant plus qu'il existe d'autres outils pour vous aider à atteindre ce nouvel idéal :
- Alpine.js, A rugged, minimal framework for composing behavior directly in your markup.
- html, high power tools for HTML

Mais pour autant, il existe des cas, rares, où rien ne pourra égaler une bonne SPA.
-->

---
name: Sources
---
# Sources

<ul>
  <li>
    <a href="https://unpoly.com">Site officiel d'Unpoly</a>
  </li>
  <li>
    <a href="http://triskweline.de/unpoly-rugb/#/">We're breaking up with JavaScript Frontends</a> par Henning Koch
  </li>
  <li>
    <a href="https://www.youtube.com/watch?v=860d8usGC0o&t=795s&ab_channel=JamstackTV">Have Single-Page Apps Ruined the Web?</a> par Rich Harris
  </li>
  <li>
    <a href="https://www.kryogenix.org/code/browser/everyonehasjs.html">Everyone has JavaScript</a> par Stuart Langridge
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Progressive_enhancement"> Progressive enhancement</a> par Wikipedia
  </li>
  <li> 
    <a href="https://github.com/adonisjs-community/polls-app">Polls App</a>par AdonisJS
  </li>
  <li> 
    <a href="https://github.com/adonisjs-community/polls-app">Remix Jokes</a>par AdonisJS
  </li>
  <li> 
    <a href="https://github.com/thetutlage">Harminder Virk</a>
  </li>
  <li> 
    <a href="https://github.com/romainlanz">Romain Lanz</a>
  </li>
</ul>

---

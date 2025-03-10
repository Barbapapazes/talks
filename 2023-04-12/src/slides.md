---
htmlAttrs:
  lang: fr-FR
  dir: ltr
layout: cover
highlighter: shiki
css: unocss
name: Unpoly pour reprendre le contrôle !
colorSchema: dark
themeConfig:
   primary: '#0de07d'
transition: fade-out
title: Unpoly pour reprendre le contrôle !
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: unpoly,web,devoxxfr,development
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
Salut et bienvenu !

Ce soir, nous allons pouvoir discuter d'un outil qui s'appelle Unpoly.

Avant de vous en dire plus, qui parmi vous a déjà fait du web avec des frameworks frond-end comme React, Angular, Vue, Svelte, Qwik ?

...

Ok merci et qui a déjà fait du web avec des frameworks back-end comme Laravel, Rails, Django ou AdonisJS ?

...

Génial, merci.
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
    Développeur web chez Aneo
  </div>
  <div>
    Responsable du Classement des Associations
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

<img src="https://esteban-soubiran.site/esteban.webp" abs-tr w-35 mt-32 mr-40 rounded-full />

<!--
Avant de commencer qui suis-je ?

Je m'appelle Estéban Soubiran. Je suis actuellement
- Élève ingénieur en cybersécurité à l'INSA Centre Val de Loire
- Développeur web chez Aneo, une agence en transformation digital
- Responsable du Classement des Associations, une aventure pour les associations étudiantes aux travers différents évènements en ligne et physique qui a pour objectif de rassembler, promouvoir et valoriser la vie associative étudiante.

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

  <div abs-br right-24 bottom-8>
    <img src="/atom.png" h-64 />
  </div>
</v-click>

<!--
Tout au long de cette présentation, nous allons avoir un fil rouge.

Ce fil rouge, nous l’appellerons [Atom](1) et c'est lui, ce petit robot.

[1]: Il s'agit du nom du robot de Real Steel.
-->

---
name: Atom et son application
---

<h1>
  <div>La plateforme de vote : <span text-primary> spécifications </span></div>
</h1>

<div abs-tr mr-16 mt-8>
  <img src="/classement-des-associations.png" w-12 h-12 />
</div>

<ul v-click relative mt-12 text-2xl>
  <li>Visualiser, ajouter et modifier les associations qui participent au Classement (textes et fichiers)</li>
  <li>Permettre à chacun de voter avec une adresse mail</li>
  <li>Visualiser sur des graphiques le nombre de vote par jour</li>
  <li>Être SEO friendly</li>
  <li>Avoir une expérience utilisateur rapide et moderne</li>
  <li>Être maintenable et peu complexe</li>
</ul>

<div abs-b mx-12 mb-12 v-click flex justify-between text-2xl>
  <div flex gap-2>
    <ph-user-duotone/>
    <div><span text-primary>100 000</span> visites</div>
  </div>
  <div flex gap-2>
    <ph-coin-vertical-duotone/>
    <div><span text-primary>25 000</span> votes</div>
  </div>
  <div flex gap-2>
    <ph-envelope-open-duotone/>
    <div><span text-primary>45 000</span> mails</div>
  </div>
</div>

<!--
Atom, il est développeur web **débutant** au sein du Classement des Associations. Pour septembre, il doit développer une plateforme de vote pour permettre aux associations d'être challengées sur leurs capacités à mobiliser leur communauté.

La plateforme doit permettre de :
- Visualiser, ajouter et modifier les associations qui participent au Classement
- Permettre aux personnes de voter avec une adresse mail
- Visualiser sur des graphiques le nombre de vote par jour
- Être SEO friendly, c'est à dire que les moteurs de recherche doivent pouvoir indexer facilement les pages de l'application.
- Avoir une expérience utilisateur rapide et moderne, c'est à dire que les utilisateurs doivent pouvoir naviguer rapidement entre les différentes pages de l'application.
- Être maintenable et peu complexe, c'est à dire que le code doit être facile à comprendre et à modifier.

L'application doit être capable de supporter :
- 100 000 visites par mois
- 25 000 votes par mois
- 45 000 mails par mois
-->

---
name: La MERN stack
---

<h1>
 La stack d'Atom : <span v-click text-primary> MERN </span>
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

<!--
Atom, comme il est débutant, il va faire un tour sur YouTube pour voir comment il pourrait développer sa plateforme de vote. Il tombe sur une vidéo qui lui parle de la MERN stack.

La MERN stack, c'est
- MongoDB pour la base de données
- Express pour le serveur, accessoirement obsolète
- React pour le front-end
- Node.js pour supporter Express et React

Il décide de partir avec cette stack parce qu'il a vu qu'avec React il peut créer une expérience utilisateur moderne et rapide avec des modals et valider ses formulaires depuis le client son application.
-->

---
name: Le parcours d'Atom - API JSON
---

<h1 flex justify-between>
  <div> Le parcours d'Atom - <span text-primary> API JSON </span></div>
  <div flex items-center gap-2>
    <vscode-icons-file-type-mongo w-6 h-6 />
    <simple-icons-express w-6 h-6 />
  </div>
</h1>

<div mt-12 grid="~ cols-5" gap-y-8>
  <div relative>
    <img src="/atom.png" absolute h-30 scale-x--100 class="top-1/2 left-1/2 transform translate--1/2" />
  </div>
  <div v-click border-1 border-red-900 border-opacity-80 bg-red-900 bg-opacity-10 rounded-md p-3>
    <div text-red-400>
      <ph-package-duotone w-5 />
      Dépendances
    </div>
    <div mt-2 opacity-80 text-sm>
      Trouver et gérer les bons paquets
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-right-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-blue-900 border-opacity-80 bg-blue-900 bg-opacity-10 rounded-md p-3>
    <div text-blue-400>
      <ph-database-duotone w-5 />
      Modèles
    </div>
    <div mt-2 opacity-80 text-sm>
      Définir la structure des données
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-bend-right-down-bold w-8 h-8/>
  </div>
  <div v-after col-start-5 border-1 border-orange-900 border-opacity-80 bg-orange-900 bg-opacity-10 rounded-md p-3>
    <div text-orange-400>
      <ph-diamonds-four-duotone w-5 />
      Routage
    </div>
    <div mt-2 opacity-80 text-sm>
      Définir les routes de l'application
    </div>
  </div>
  <div v-click col-start-4 row-start-2 flex="~ row" justify-center items-center>
    <ph-arrow-left-bold w-8 h-8 />
  </div>
  <div v-after col-start-3 row-start-2 border-1 border-gray-700 bg-gray-900 bg-opacity-10 rounded-md p-3>
    <div text-gray-400>
      <ph-plugs-duotone w-5 />
      API
    </div>
    <div mt-2 opacity-80 text-sm>
      Gérer les requêtes (filtres, pagination, etc.)
    </div>
  </div>
  <div v-click col-start-2 row-start-2 flex="~ row" justify-center items-center>
    <ph-arrow-left-bold w-8 h-8 />
  </div>
  <div v-after col-start-1 row-start-2 border-1 border-green-900 border-opacity-80 bg-green-900 bg-opacity-10 rounded-md p-3>
    <div text-green-400 flex justify-between>
      <ph-lock-duotone w-5 />
      <span>Authentification</span>
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Sécuriser les accès à l'API
      </div>
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-bend-down-right-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-amber-900 border-opacity-80 bg-amber-900 bg-opacity-10 rounded-md p-3>
    <div text-amber-400>
      <ph-key-duotone w-5 />
      Autorisations
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Gérer qui peut accéder à quoi
      </div>
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-right-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-violet-900 border-opacity-80 bg-violet-900 bg-opacity-10 rounded-md p-3>
    <div text-violet-400>
      <ph-globe-duotone w-5 />
      Production
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Rendre l'application disponible
      </div>
    </div>
  </div>
</div>

<!--
TODO: mettre au conditionel le texte de l'API JSON et celle du front-end modern

Du coup, Atom se lance.

Il commence par trouver, installer et lier ensemble les différentes dépendances de son projet. Ensuite, il structure les données de son application. Puis il définit les routes de son application et il y gère les requêtes en y ajouter des filtres, du tri et de la pagination. Enfin, il sécurise les accès à l'API via de l'authentification et des autorisations, notamment pour que les administrateurs puissent ajouter et modifier les associations.

Pour finir, il rend son application disponible au monde entier en la mettant en production.

Pour Atom, c'est clairement pas une étape facile parce que Express, à la base, c'est jsute un router et parce qu'il doit gérer la connexion entre toutes ces dépendances comme celles de la base de données, de l'authentification, de la gestion des mails, etc.
-->

---
name: Le parcours d'Atom - Front-end
---

<h1 flex justify-between>
  <div> Le parcours d'Atom - <span text-primary> Frond-end modern </span></div>
  <div flex items-center gap-2>
    <vscode-icons-file-type-reactjs w-6 h-6 />
    <vscode-icons-file-type-node w-6 h-6 />
  </div>
</h1>

<div mt-12 grid="~ cols-5" gap-y-8>
  <div relative>
    <img src="/atom.png" absolute h-30 scale-x--100 class="top-1/2 left-1/2 transform translate--1/2" />
  </div>
  <div v-click border-1 border-red-900 border-opacity-80 bg-red-900 bg-opacity-10 rounded-md p-3>
    <div text-red-400>
      <ph-package-duotone w-5 />
      Dépendances
    </div>
    <div mt-2 opacity-80 text-sm>
      Trouver et gérer les bons paquets
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-right-bold w-8 h-8 />
  </div>
  <div v-after col-start-4 border-1 border-orange-900 border-opacity-80 bg-orange-900 bg-opacity-10 rounded-md p-3>
    <div text-orange-400>
      <ph-diamonds-four-duotone w-5 />
      Routage
    </div>
    <div mt-2 opacity-80 text-sm>
      Définir les routes de l'application
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-bend-right-down-bold w-8 h-8/>
  </div>
  <div v-after col-start-5 row-start-2 border-1 border-gray-700 bg-gray-900 bg-opacity-10 rounded-md p-3>
    <div text-gray-400>
      <ph-plugs-duotone w-5 />
      API
    </div>
    <div mt-2 opacity-80 text-sm>
      Récupération des données à l'API
    </div>
  </div>
  <div v-click col-start-4 row-start-2 flex="~ row" justify-center items-center>
    <ph-arrow-left-bold w-8 h-8 />
  </div>
  <div v-after col-start-3 row-start-2 border-1 border-amber-900 border-opacity-80 bg-amber-900 bg-opacity-10 rounded-md p-3>
    <div text-amber-400>
      <ph-key-duotone w-5 />
      Autorisations
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Gérer qui peut accéder à quoi
      </div>
    </div>
  </div>
  <div v-click col-start-2 row-start-2 flex="~ row" justify-center items-center>
    <ph-arrow-left-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-blue-900 border-opacity-80 bg-blue-900 bg-opacity-10 rounded-md p-3>
    <div text-blue-400>
      <ph-cursor-click-duotone w-5 />
      Accessibilité
    </div>
    <div mt-2 opacity-80 text-sm>
      Tout le monde doit pouvoir l'utiliser
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-bend-down-right-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-green-900 border-opacity-80 bg-green-900 bg-opacity-10 rounded-md p-3>
    <div text-green-400>
      <ph-eye-duotone w-5 />
      SEO
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Optimiser le référencement
      </div>
    </div>
  </div>
  <div v-click flex="~ row" justify-center items-center>
    <ph-arrow-right-bold w-8 h-8 />
  </div>
  <div v-after border-1 border-violet-900 border-opacity-80 bg-violet-900 bg-opacity-10 rounded-md p-3>
    <div text-violet-400>
      <ph-globe-duotone w-5 />
      Production
    </div>
    <div>
      <div mt-2 opacity-80 text-sm>
        Rendre l'application disponible
      </div>
    </div>
  </div>
</div>

<!--
Avoir développé l'API JSON, ça ne suffit pas. Atom doit maintenant développer l'application web qui va consommer l'API. C'est reparti, il choisi ses dépendances et les glue ensemble. Il gère le routage. Ensuite, il s'occupe de récupérer les données de l'API en faisant attention à la gestion des erreurs, les retry, la validation des formulaires et l'envoi des fichiers comme les images. Puis il s'occupe de la gestion des autorisations, de l'accessibilité et du référencement en prenant en compte qu'il veut une interface moderne. Pour cette partie, il doit générer ses pages côté serveur pour qu'elles soient indexables par les moteurs de recherche. Du coup, il va devoir apprendre un méta framework comme Next.js ou Remix.

Enfin, il va devoir déployer l'application sur un serveur et la rendre disponible pour les utilisateurs.
-->

---
name: Le problème
---

<h1>
  Les <span text-primary>3 problèmes</span> d'Atom
</h1>

<div mt-28 flex justify-between text-2xl>
  <div v-click flex="~ col" items-center>
    <ph-hourglass-medium-duotone w-20 h-20 />
    <div mt-4>
      <span text-primary>Temps</span> limité
    </div>
  </div>
  <div v-click flex="~ col" items-center>
    <ph-chart-line-up w-20 h-20 />
    <div mt-4>
      <span text-primary>Complexité</span> trop élevée
    </div>
  </div>
  <div v-click flex="~ col" items-center>
    <ph-wrench-duotone w-20 h-20/>
    <div mt-4>
      <span text-primary>Maintenabilité</span> difficile
    </div>
  </div>
</div>

<!--
Bon là, pour Atom, ça comment à devenir compliqué parce que son temps est limité, qu'il est le seul développeur et que gérer 2 applications en production demande du temps.

Ensuite, il aimerait bien ajouter des fonctionnalités au cours du temps pour améliorer l'application et l'expérience utilisateur avec des graphiques de visualisation des votes. Mais clairement, l'application est devenu beaucoup trop complexe entre la gestion des dépendances, le routage serveur et client et toutes les autorisations.

Et si le simple fait d'ajouter quelques fonctionnalités est déjà compliqué, alors imaginer devoir maintenir l'application pendant plusieurs années, c'est carrément impossible. Sauf que le Classement des Associations, ça fait 11 ans qu'il existe et que la plateforme de vote va devoir tenir dans le temps.
-->

---
name: La solution
layout: section
---

<h1 v-click>
 <span text-primary>Unpoly</span>
</h1>

<div v-after opacity-80>
  The unobtrusive JavaScript framework
  <br />
  for server-side web applications
</div>

<!--
Mais nous, on a une solution pour Atom. Elle s'appelle Unpoly.

Unpoly, c'est un script que vous ajoutez simplement à votre application web rendu côté serveur type Laravel, Symfony, Rails, Adonis ou n'importe quel framework du même style et même WordPress et qui vous permet de lui faire bénéficier d'une expérience utilisateur moderne.

Autrement dit, Unpoly est un outil pour construire des applications web sans la complexité des frameworks front-ends mais avec leurs expériences utilisateurs. La promesse est belle.
-->

---
name: Ce que les applications rendus côté serveur font de bien
---

<h1 flex="~ col">
  <span> Ce que les applications rendus côté serveur </span>
  <span text-green-400 font-semibold> font de bien </span>
</h1>

<ul mt-12 text-2xl>
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
</ul>

<!--
Du coup, commençons par comprendre ce que les applications rendus côté serveur font de bien.

- Large choix d'outils matures et éprouvés comme Laravel, Symfony, Rails, Adonis...
- Technologie peu complexe puisque vous faites votre rendu côté serveur donc pas besoin de dupliquer le travail côté client.
- Accès aux données de manière synchrone, pas besoin de faire des requêtes AJAX.
- Temps du premier rendu (FCP) plus rapide car le navigateur n'a pas besoin de télécharger le JavaScript pour afficher la page (ou alors de compliquer le code du client pour y faire du rendu côté serveur).
- Fonctionne sur tous les types d'appareils puisque c'est directement de l'HTML qui arrive dans le navigateur.
-->

---
name: Ce que les applications rendus côté serveur ne font pas bien
---

<h1 flex="~ col">
  <span> Ce que les applications rendus côté serveur </span>
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
En revanche, il y a des points sur lesquels les applications rendus côté serveur sont moins bien qu'une application avec un gros framework front-end comme React, Vue ou Angular.

- Retour d'information sur l'interaction lente, par exemple, quand on clique sur un bouton, il faut attendre que la page se recharge pour voir si l'action a été effectuée ou non.
- Chargement des pages détruit les états transitoires. C'est à dire que tout ce qui n'est pas dans l'URL est perdu quand on change de page. Par exemple, si on a un formulaire avec des champs remplis, quand on change de page, tout est perdu.
- Interactivité limitée notamment sur la gestion des "layers". La création des modals et des popups est plus compliquée et moins flexible. que dans une application avec un gros framework front-end.
- Animations complexes, par exemple, quand on veut faire une animation de transition entre 2 pages, c'est pratiquement impossible.
- Gestion des formulaires complexes avec des champs dynamiques, par exemple, quand on veut ajouter un champ dans un formulaire, c'est compliqué.

C'est là qu'intervient Unpoly.
-->

---
name: Unpoly change la donne
---

<h1>
  <span> Unpoly </span>
  <span text-primary> change la donne </span>
</h1>

<div v-click mt-24 grid="~ cols-4" gap-4 text-2xl>
  <div flex="~ col" items-center gap-4>
    <ph-puzzle-piece-duotone w-16 h-16 />
    <div text-center>
      25 <br /> <span text-primary>attributs HTML</span>
    </div>
  </div>
  <div flex="~ col" items-center gap-4>
    <ph-book-duotone w-16 h-16 />
    <div text-center>
      Logique <br /> <span text-primary>serveur centrée</span>
    </div>
  </div>
  <div flex="~ col" items-center gap-4>
    <ph-stack-duotone w-16 h-16 />
    <div text-center>
      Supporte <br /> <span text-primary>tous les langages</span>
    </div>
  </div>
  <div flex="~ col" items-center gap-4>
    <ph-battery-charging-duotone w-16 h-16 />
    <div text-center>
      Gère la <span text-primary>navigation</span>, <br /> les <span text-primary>formulaires</span>, <br /> les <span text-primary>animations</span> <br /> et les <span text-primary>interactions</span>
    </div>
  </div>
</div>

<!--
Évidemment, si je vous parle d'Unpoly, c'est parce qu'il permet de combler une partie des lacunes des applications rendus côté serveur.

- Des attributs HTML pour écrire une interface utilisateur moderne. Par exemple, pour faire une animation de transition entre 2 pages, il suffit d'ajouter un attribut à la balise HTML.
- Une logique qui reste sur le serveur dans le sens où il n'y a pas besoin de dupliquer la logique côté client. C'est le serveur qui gère tout comme le routage ou la validation des formulaires.
- Fonctionne avec n'importe quel langage de serveur. Évidemment puisque Unpoly est un script JavaScript qui est lu et interprété sur le client
- Gère la navigation, les formulaires, les animations et les interactions. C'est à dire que vous pouvez faire des formulaires complexes avec des champs dynamiques, des animations de transition entre 2 pages, des modals et des popups avec quelques attributs HTML.
-->

---
name: Démo
layout: section
---

<h1 text-primary>
  Démo
</h1>

<!-- TODO: faire un tour sur la documentation pour s'assurer qu'on oublie rien d'important -->
<div v-click flex justify-start>
  <ol mt-12 text-left text-xl>
    <li>
      Installer Unpoly
    </li>
    <li>
      Découverte des attributs <code>up-target</code>, <code>up-instant</code>, <code>up-preload</code>
    </li>
    <li>
      Gestion des formulaires avec l'attribut <code>up-submit</code>
    </li>
    <li>
      Création d'une modal avec l'attribut <code>up-layer</code>
    </li>
    <li>
      Personnalisation de la modal
    </li>
    <li>
      Mise en situation de <code>up.compiler</code>
    </li>
    <li>
      Inspection des requêtes avec le <code>server protocol</code>
    </li>
  </ol>
</div>

---
name: Normal page flow
---

# Flux classique des pages

<div mt-20>
  <img src="/classic_page_flow.png" />
</div>

<!--
Le flux classique des pages est le suivant. À chaque changement de page, l'intégralité de la page est rechargé. Le CSS est parsé à nouveau et le JavaScript est ré-exécuté. Les états qui ne sont pas dans l'URL sont perdus.
-->

---
name: Flux Unpoly des pages
---

# Flux Unpoly des pages

<div mt-20>
  <img src="/unpoly_page_flow.png" />
</div>

<!--
Le flux Unpoly est le suivant. Par défaut, les pages sont toujours rendus entièrement par le serveur à chaque requête mais on utilise seulement un fragment. Ce fonctionnement permet de garder les états qui ne sont pas dans l'URL.
-->

---
name: Amélioration progressive
---

# Amélioration progressive

<div opacity-80 mt--4>
  Progressive enhancement
</div>

<div mt-16 flex="~" justify-center text-2xl>
  <div grid="~ cols-12" gap-2>
    <div px-8 py-4 col-span-4 col-start-5 flex gap-2 justify-center border-1 border-yellow-900 rounded border-opacity-80 bg-yellow-900 bg-opacity-10 text-yellow-400>
      <vscode-icons-file-type-js-official/>
      <div> JS </div>
    </div>
    <div px-8 py-4 col-span-8 col-start-3 flex gap-2 justify-center border-1 border-blue-900 rounded border-opacity-80 bg-blue-900 bg-opacity-10 text-blue-400>
      <vscode-icons-file-type-css/>
      <div> CSS </div>
    </div>
    <div px-8 py-4 col-span-12 flex gap-2 justify-center border-1 border-orange-900 border-opacity-80 rounded bg-orange-900 bg-opacity-10 text-orange-400>
      <vscode-icons-file-type-html/>
      <div> HTML </div>
    </div>
  </div>
</div>

<!--
Finalement, Unpoly permet de mettre en place de l'amélioration progressive.

Pour bien comprendre de quoi il s'agit, faisons une petit analogie avec un ascenseur et un escalator.

D'un côté, dans un immeuble, vous avez un ascenseur.
De l'autre côté, dans un autre immeuble, vous avez un escalator.

Si l'ascenseur est en panne, c'est pénible parce qu'il n'y a plus de moyen de monter dans les étages.
Mais si l'escalator est en panne, rien de grave, on peut toujours monter les escaliers à pied. L'expérience est simplement dégradée.

Et bien l'amélioration progressive, c'est exactement ça. C'est une stratégie de développement qui différencie strictement le contenu de la présentation de tel sorte que que si on retire le JavaScript ou le CSS de notre application web, on a toujours une page qui fonctionne et qui permet d'y retrouver le contenu. On peut toujours naviguer et toujours remplir des formulaires. C'est simplement moins beau et moins fluide.

Alors bien sûr, un escalator, ça ne va pas partout et un ascenseur non plus ! Il faut choisir le bon en fonction de la situation, c'est pareil avec Unpoly et React.
-->

---
name: Conclusion
---

<div v-click mt-40 text-4xl text-center leading-10>
  Le <span text-primary>web</span>, ce n'est pas si compliqué !
</div>

<div v-after mt-2 text-lg text-center opacity-80>
  (avec les bons outils)
</div>

<div v-click abs-b text-center mb-8 opacity-80>
  Merci
</div>

<!--
Finalement, il existe des alternatives à React et le web, c'est pas si compliqué mais avec les bons outils !

Unpoly fait parti de ses bons outils pour vous permettre de reprendre le contrôle sur votre vision du web et votre approche que vous en avez !

Mais pour autant, il existe des cas, rares, où rien ne pourra égaler un framework front-end.

Merci
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
    <a href="https://github.com/adonisjs-community/polls-app">Polls App</a> par AdonisJS
  </li>
  <li>
    <a href="https://github.com/adonisjs-community/polls-app">Remix Jokes</a> par AdonisJS
  </li>
  <li>
    <a href="https://github.com/thetutlage">Harminder Virk</a>
  </li>
  <li>
    <a href="https://github.com/romainlanz">Romain Lanz</a>
  </li>
</ul>

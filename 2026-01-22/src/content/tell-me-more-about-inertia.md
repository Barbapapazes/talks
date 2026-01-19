Inertia (souvent appelé **Inertia.js**) est une **bibliothèque JavaScript conçue pour créer des applications web modernes de type SPA (Single Page Application)** tout en utilisant **ton backend comme dans les applications classiques côté serveur** (routing, contrôleurs, ORM, authentification, etc.). Elle se présente comme une **approche dite du “modern monolith”** (le monolithe moderne). ([inertiajs.com][1])

### Concept principal

* Inertia **n’est pas un framework complet** comme Nuxt, Next ou Angular : c’est une **bibliothèque qui sert de “colle”** entre un backend (Laravel, Rails, etc.) et un frontend moderne (Vue, React ou Svelte). ([inertiajs.com][1])
* Elle permet d’éviter de **construire une API REST/GraphQL** séparée : **tu écris toujours tes routes et contrôleurs côté serveur comme d’habitude**, mais au lieu de renvoyer du HTML serveur (Blade, ERB, etc.), tu renvoies des composants JavaScript avec leurs données. ([inertiajs.com][2])

### Comment ça fonctionne

* Le serveur rend une page initiale avec une template contenant un `<div id="app">` et charge ton app JavaScript. ([inertiajs.com][3])
* Quand un lien Inertia est cliqué, **Inertia intercepte la navigation** (via un composant `<Link>` ou une méthode comme `Inertia.visit()`), fait une requête XHR et récupère une réponse JSON avec : nom de composant + données (props). ([inertiajs.com][4])
* Inertia remplace alors dynamiquement le composant affiché sans recharger toute la page, **simulant une vraie SPA** sans routing client lourd ni API dédiée. ([inertiajs.com][4])

### Avantages

* Permet d’avoir **l’interactivité d’une SPA** tout en gardant **le modèle de développement serveur classique**. ([inertiajs.com][2])
* **Aucune API à construire ou maintenir** (contrairement à une SPA classique qui sépare backend et frontend). ([inertiajs.com][2])
* Réutilise ce que tu connais déjà : routing serveur, contrôleurs, ORM, middleware. ([inertiajs.com][4])

### Limitations / points d’attention

* Pas de routing client riche comme avec Vue Router ou React Router : Inertia s’appuie sur le routage serveur. ([inertiajs.com][1])
* SEO peut être moins optimal que du SSR classique (comme avec Nuxt) **sans configuration supplémentaire** (par exemple SSR ou pre-rendering). ([Reddit][5])
* Besoin d’adaptateurs spécifiques selon frontend (Vue/React/Svelte) et backend (officiellement Laravel et Rails, communautés pour d’autres). ([inertiajs.com][1])

### Cas d’usage typique

* Applications où tu veux **une expérience SPA fluide** mais **sans gérer une API séparée**, par exemple avec Laravel + Vue/React. ([m.php.cn][6])

En résumé, Inertia est une **approche pragmatique pour moderniser des applications serveur classiques** en leur donnant le comportement d’une SPA sans toute la complexité habituelle du découplage frontend/backend.

[1]: https://inertiajs.com/docs?utm_source=chatgpt.com "Introduction - Inertia.js Documentation"
[2]: https://inertiajs.com/docs/v1/core-concepts/who-is-it-for?utm_source=chatgpt.com "Who Is Inertia.js For? - Inertia.js Documentation"
[3]: https://inertiajs.com/docs/v1/installation/server-side-setup?utm_source=chatgpt.com "Server-side Setup - Inertia.js Documentation"
[4]: https://inertiajs.com/how-it-works?utm_source=chatgpt.com "How It Works - Inertia.js Documentation"
[5]: https://www.reddit.com/r/webdev/comments/moukod?utm_source=chatgpt.com "Had anyone worked with InertiaJS? How was your experience?"
[6]: https://m.php.cn/en/faq/1796839148.html?utm_source=chatgpt.com "What is Inertia.js and how to use it with Laravel and Vue/React?-Laravel-php.cn"

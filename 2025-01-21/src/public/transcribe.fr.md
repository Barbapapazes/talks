Bonjour à tous, je suis très heureux d’être là ce soir pour parler de comment devenir full‑stack avec TypeScript. C’est ma première fois ici, mais pas mon premier talk.

Je m’appelle Estéban Soubiran, je suis développeur web full‑stack chez MaiaSpace. MaiaSpace développe des lanceurs spatiaux légers partiellement réutilisables, bref, on lance des roquettes dans l’espace.

Je fais pas mal d’open source et je gravite autour de plusieurs écosystèmes comme Vite, Vue, Nuxt, autour de l’écosystème de Nuxt et de Laravel. Quand j’ai le temps, j’écris des articles sur mon blog pour répondre à des questions que je me suis posées et dont je ne trouvais pas la réponse en ligne, par exemple comment rentrer dans le développement web en reconversion, ou comment démarrer parfaitement un projet Nuxt.

Vous pouvez sortir votre téléphone, scanner le QR code ou taper l’URL pour répondre à quelques questions afin que j’adapte le talk. Vous êtes majoritairement full‑stack, avec environ 40% plutôt front‑end ou back‑end.

Toujours avec votre téléphone, quand vous faites du back‑end, quel langage utilisez‑vous ? Vous pouvez choisir plusieurs réponses. C++, personne ? Vous faites principalement du back‑end en JavaScript ou TypeScript, parfois les deux, parfait pour la suite.

Quand on commence le développement web, on apprend souvent d’abord HTML, puis on ajoute du style avec CSS, et rapidement on veut des interactions avec JavaScript. Ensuite on regarde des frameworks front‑end comme React, Angular ou Svelte pour construire des applications plus interactives.

Puis on découvre les méta‑frameworks front‑end qui facilitent encore la vie, comme Next, Nuxt et Astro. C’est super pour le front, mais dans le monde il y a aussi le back‑end, indispensable pour stocker des données et créer des applications réellement intéressantes.

Les méta‑frameworks front‑end proposent parfois un peu de back‑end via des APIs côté serveur, mais ça va rarement très loin. Ça couvre des cas simples comme accéder à une base de données ou un cache, mais dès qu’il faut du robuste, des tests et de la complexité, ça devient vite limité.

Côté back‑end pur, on a Express, Fastify, Nest et Adonis. Ce soir, pour devenir full‑stack en TypeScript, on s’intéresse à eux plutôt qu’aux frameworks et méta‑frameworks front‑end.

Parlons maintenant de “high scope” et “low scope”. Les frameworks high scope abstraient beaucoup de complexité pour vous rendre productifs immédiatement, tandis que les low scope laissent plus de liberté mais demandent de tout assembler avant d’écrire du métier.

Express et Fastify sont low scope, ce sont des routeurs qui lient un verbe HTTP et une URL à une fonction. Nest est construit dessus, apporte un pseudo injecteur de dépendances et une architecture façon Angular, avec quelques avantages mais aussi des inconvénients selon moi.

Adonis couvre tout le spectre du low au high scope. On peut écrire du métier dès le jour 1 avec le starter, tout en pouvant entrer dans ses entrailles pour l’adapter exactement au besoin.

Conclusion intermédiaire : pour devenir full‑stack en TypeScript sans multiplier les outils, Adonis est un très bon candidat. On va donc l’utiliser, et voir concrètement à quoi cela ressemble.

Adonis est un framework back‑end qui existe depuis 2015. La version 6, sortie en janvier dernier, a été entièrement réécrite en TypeScript. C’est un framework “fully featured” qui intègre de nombreuses fonctionnalités sans bricolage de dépendances NPM ni stack Frankenstein.

Vous avez un ORM Lucid, l’authentification, l’autorisation, la gestion des fichiers uploadés, un rate limiter, l’internationalisation, le cache et du HMR côté serveur. Le HMR évite de relancer toute l’appli à chaque changement et réduit le temps de rechargement à quelques dizaines de millisecondes.

On trouve aussi l’envoi d’e‑mails, de la type‑safety entre client et serveur via l’inférence des retours de contrôleurs, et un framework de tests. Beaucoup de stacks négligent les tests, ici c’est prévu dès le départ.

Regardons le code. On définit d’abord des routes qui lient un verbe HTTP et une URL à une méthode de contrôleur. Les chaînes sont inférées depuis les méthodes du contrôleur, donc si une méthode n’existe pas, TypeScript lève une erreur.

On génère ensuite un contrôleur avec le CLI Ace. Puis on définit un modèle avec l’ORM Lucid, par exemple un Post avec id, title et content. Adonis vous laisse libre d’utiliser un autre outil pour la base si vous préférez.

On ajoute un validateur avec Vine pour éviter que les utilisateurs n’envoient n’importe quoi. Vine est conçu pour les payloads HTTP, contrairement à Zod qui traite des types JavaScript. Par exemple, la nuance entre champ vide, null, undefined ou absent est gérée correctement.

On assemble le tout : on pagine en lisant page et limit depuis la requête, on valide l’entrée dans store puis on crée le post, et on récupère un post par id dans show via HttpContext.params. Il n’y a pas de code caché, juste ce qui est montré.

Côté authentification, en quelques lignes on récupère email et password, on vérifie les credentials de manière sécurisée contre les attaques temporelles, puis on authentifie et on redirige l’utilisateur. C’est rapide à mettre en place.

Pour l’OAuth, on redirige vers GitHub, on gère le callback et on récupère l’utilisateur. En trois lignes clés, on a une authentification via un provider externe et on peut réutiliser la logique précédente.

Pour l’autorisation, on définit des policies et on utilise le bouncer dans le HttpContext : on autorise ou on bloque, et tout est bien typé. Par exemple, seul l’auteur d’un post peut le modifier, et les paramètres attendus par la policy sont inférés.

Pour les tests, Japa est intégré. On peut créer un post en base, faire une requête POST et vérifier le retour. C’est simple et disponible dès le starter.

Pour l’injection de dépendances, on crée un contrat via une classe abstraite, par exemple RepositoryService, puis des implémentations comme GitHubRepositoryService ou GitLabRepositoryService. On lie l’implémentation choisie dans le conteneur au démarrage et on peut accéder à la config lors de la création.

C’est pratique pour échanger des dépendances, et très utile en tests avec un FakeRepositoryService pour éviter d’appeler l’API GitHub. On swap la dépendance au début du test et on vérifie le comportement attendu.

Par défaut, Adonis propose une structure MVC classique avec controllers, models et views. On peut aussi structurer par features, ou aller vers une architecture hexagonale grâce à l’injection de dépendances puissante.

Pour apprendre Adonis, Adocasts propose une excellente série “Apprendre Adonis 6” avec 113 vidéos pour 14 heures de contenu. Une partie est gratuite et le reste est abordable.

Côté front‑end, vous faites ce que vous voulez. Vous pouvez exposer une API JSON consommée par une app web ou mobile, l’utiliser dans un monorepo, ou travailler avec Inertia pour garder la simplicité du routeur back‑end tout en profitant d’un framework front‑end. Adonis propose aussi le moteur de templates Edge pour le rendu côté serveur.

Si ça vous intéresse, consultez la documentation, apprenez avec adocasts.com et rejoignez leur communauté sur Discord. Et dites‑moi via le QR code ce que vous avez envie d’essayer en premier.

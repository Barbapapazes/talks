Bonjour à tous. Ça me fait très plaisir d'être ici, j’espère que vous allez bien. On n’est pas nombreux mais vous êtes très éparpillés.

On va découvrir ensemble ce qu’est UnJS. On va le faire de façon interactive pour deux raisons: poser vos questions à tout moment, et composer le talk ensemble. Préparez vos téléphones pour scanner quelques QR codes pendant la présentation; plus on sera réactifs, plus vite on ira boire des bières.

Qui suis‑je ? Je suis Estéban Soubiran. Je suis développeur web chez Infomaniak, un cloud provider éthique et suisse, à Genève. En parallèle, je termine des études d’ingénieur en cybersécurité et je contribue à l’open source; depuis août dernier, j’ai rejoint l’équipe UnJS sur GitHub. Vous pouvez me suivre principalement sur Twitter/X.

Avant d’aller plus loin, qui connaît l’écosystème UnJS ? Il est assez récent, environ 2 ans, plutôt orienté vers les développeurs qui publient des paquets sur npm. C’est un vrai couteau suisse utile dans beaucoup de projets.

Petit historique. Un développeur a commencé à extraire et structurer des outils pour améliorer l’expérience développeur. En 2020, il devient framework architect et pilote la manière dont Nuxt est construit. Avec Nuxt 3, l’objectif est d’être agnostique du runtime et du provider et d’être compatible avec l’Edge, ce qui amène à extraire des parties communes en paquets réutilisables et partageables.

En 2022 naît UnJS. Aujourd’hui, c’est plus de 63 paquets, plus de 50 000 étoiles sur GitHub (tout paquets confondus), environ 400 millions de téléchargements par mois et 150 contributeurs. UnJS est une organisation GitHub, pas une entreprise, et l’écosystème a beaucoup évolué depuis 2022.

L’écosystème est pensé pour les auteurs de paquets npm. Si vous en avez déjà publié, vous avez sans doute rencontré des difficultés: build, génération de changelog, release et publication sur GitHub/npm. Avec des dizaines de paquets à gérer, il faut automatiser.

Vite s’impose dans le frontend, mais on garde parfois Webpack, Rollup ou esbuild selon les besoins. Chacun a sa propre interface de plugin, donc écrire un plugin portable demande souvent plusieurs codebases à maintenir. unplugin résout ce problème: une seule codebase et une seule interface pour générer des plugins compatibles avec Vite, Rollup, Webpack, esbuild, etc., ce qui unifie la communauté autour d’un seul paquet.

Parlons de H3. C’est comme Express mais entièrement tree‑shakable. Tous les utilitaires que vous importez, par exemple getQuery ou readBody, sont éliminés du bundle s’ils ne sont pas utilisés. L’API est pensée pour être simple et intuitive: vérifier la méthode, lire le body, récupérer la query, retourner du JSON.

H3 a été conçu pour l’Edge, où le temps de démarrage est critique. À titre d’ordre de grandeur, H3 démarre en moins de 2 ms et peut traiter la requête très rapidement. À titre de comparaison, avec Nuxt 2 on était plutôt autour de 300 ms de cold start côté serveur.

Pourquoi vouloir être agnostique du runtime ? Pour l’Edge. Aujourd’hui, quand on déploie une app serveur (Laravel, Rails, etc.), on choisit un datacenter; les utilisateurs du monde entier tapent ce point unique. L’Edge reprend le principe des CDN, présents partout, pour réduire la latence et adapter le contenu à la région. Le code est packagé (par exemple en zip) et exécuté à la demande au plus près de l’utilisateur; il doit donc être léger et démarrer très vite. Si une fonction met déjà ~500ms à démarrer, on perd le bénéfice.

H3 reste bas niveau. Pour des projets plus ambitieux, Nitro est le compagnon idéal. Nitro peut s’utiliser en standalone pour construire et déployer des API (Cloudflare, serveur perso, etc.), et c’est aussi un toolkit pour des frameworks full‑stack. Il est utilisé par d’autres écosystèmes, par exemple Solid et bientôt TanStack Start.

Nitro offre des primitives haut niveau: intégrations base de données, WebSocket, storage clé‑valeur, et se déploie partout. Sa force est d’être agnostique avec un système de presets détectés automatiquement selon l’environnement pour cibler le bon provider. On peut le personnaliser et l’étendre via des plugins.

Autre point intéressant: en build, Nitro sait « s’auto‑éjecter » et reconstruire un projet prêt à déployer, y compris les node_modules, avec un bundle souvent inférieur à 1 Mo. Nitro propulse Nuxt.

Pour le stockage clé‑valeur, unstorage propose une interface agnostique du backend avec un système de drivers. On peut utiliser un driver fichier en développement, puis déployer sur un provider comme Vercel sans changer le code. On peut aussi monter dynamiquement des préfixes vers des drivers différents selon le chemin.

Comparé à des solutions multilayer comme BentoCache (utilisé par Adonis), unstorage est conçu avec l’Edge en tête. Les fonctions étant éphémères, le cache applicatif local est moins pertinent; on délègue souvent le cache à l’infrastructure.

Un mot sur MagicRegex. Les regex deviennent vite difficiles à lire et maintenir. MagicRegex permet de les exprimer en langage naturel structuré, et génère la regex correspondante, avec des groupes capturés typés côté TypeScript. La fonction createRegex affiche la regex générée dans l’IDE.

Côté performances, si la regex est statique (sans paramètres), elle est compilée en regex classique, sans surcoût. Si elle est dynamique, il y a un léger overhead connu et minimal.

Pour finir, on aurait aussi pu parler de citty pour créer des CLI, de defu pour fusionner des objets de configuration, de c12 pour charger des configurations depuis la machine et les fusionner, ou encore d’unbuild pour créer des paquets npm sans configuration.

Je travaille surtout sur le site et la documentation. En écrivant la doc, on trouve des bugs et on les corrige rapidement, et je contribue aussi sur des paquets accessibles comme citty ou consola. Merci, et si vous avez des questions, n’hésitez pas.

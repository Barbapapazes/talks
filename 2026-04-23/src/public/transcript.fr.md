Bonjour à tous, j'espère que vous allez bien. Nous allons démarrer sans slides, ce n'est pas grave.

Je suis très heureux que vous soyez là. Je n'ai plus de micro, mais j'ai des slides et tout le nécessaire. Pour bien commencer, je vous propose qu'on prenne une photo tous ensemble : si vous ne voulez pas être sur la photo, mettez une main devant votre visage. Souriez.

Petit contexte rapide sur Vite : c'est un outil simple et omniprésent. Prenez le nom d'un framework que vous connaissez — tant que ce n'est pas Next, Vite est probablement impliqué. Il est utilisé par Angular, React, Vue, Nuxt, Astro et bien d'autres. La question intéressante est : pourquoi Vite fait-il l'unanimité ?

Parce que c'est un bundler pas comme les autres.

Si le terme « bundler » n'est pas familier, pensez à Webpack : c'était le bundler dominant ces dix dernières années, mais son adoption commence à stagner. Depuis, d'autres solutions sont apparues : Vite, Rspack, Snowpack, SWC. La vraie question est pourquoi Vite a pris le dessus, et c'est ce que nous allons explorer.

Je m'appelle Estéban Soubiran et je suis ingénieur logiciel chez Takima. Je suis passionné par le front et j'ai découvert Vite il y a quelques années ; j'ai envie de vous partager un condensé de ce que j'ai appris.

Autre nouveauté cette année : vous pouvez influencer le contenu du talk en scannant le QR code affiché et en choisissant un thème. Pendant que vous explorez, nous allons voir ce qu'est un bundler.

Dans le logiciel, on démarre souvent une application avec un exécutable produit par un compilateur. Sur le web, c'est similaire : un bundler produit un bundle. On peut donc comparer le bundler au compilateur et le bundle à l'exécutable du web.

Visualisons l'architecture : d'un côté le navigateur, de l'autre le système de fichiers contenant une application Vite + Vue + TypeScript standard. Par exemple, dans `main.ts` on importe Vue, `App.vue` et on crée l'application ; on a aussi un `index.html`.

Au milieu se trouve Vite : le navigateur envoie des requêtes HTTP à Vite, Vite lit le système de fichiers, transforme les fichiers à la demande et renvoie des réponses au navigateur.

Si l'on regarde les requêtes dans l'inspecteur, on voit d'abord le chargement de la racine (`index.html`) qui inclut le client Vite et référence `main.ts`. Ensuite `main.ts` importe `style.css`, Vue et `App.vue`. Le navigateur reçoit finalement du JavaScript : Vite transforme les sources (par exemple un composant Vue) et renvoie du code JavaScript compréhensible par le navigateur.

Vite se distingue parce qu'il utilise nativement les modules ECMAScript (ESM). Il sert directement des fichiers JavaScript au navigateur plutôt que d'effectuer un gros bundle initial comme Webpack. Son serveur de développement est extrêmement rapide : il démarre instantanément et transforme les fichiers à la demande. Sa configuration est simple et il s'appuie sur Rollup pour la production, ce qui permet de réutiliser l'écosystème de plugins Rollup.

Définitions rapides : un module ECMAScript est un fichier qui utilise `import`/`export`. L'identifiant d'un module est la chaîne passée à `from`. Un hook est une fonction qui permet de se brancher à différents moments du pipeline Vite. Un module virtuel est un module ESM qui n'existe pas sur le disque et qui est généré à la volée.

Important à retenir : dans Vite, tout est plugin. La gestion du HTML, le support JSX, le CSS (avec HMR, CSS modules et préprocesseurs comme Sass), les assets statiques et le hachage, le JSON, les imports globaux, les imports dynamiques, WebAssembly, les Web Workers — tout cela est assuré par des plugins.

Par exemple, importer `style.css` depuis JavaScript fonctionne parce que Vite transforme le CSS en JavaScript et renvoie du JS au navigateur via le plugin CSS.

Récapitulatif : Vite, c'est trois choses principales — un serveur web de développement qui transforme les fichiers à la demande, un bundler pour la production et un système de plugins extensible.

Voyons maintenant comment créer un plugin simple. Un plugin est une fonction qui retourne un objet avec un `name` et des hooks. Les trois hooks principaux sont `resolveId`, `load` et `transform`.

`resolveId` permet d'intercepter et éventuellement de renvoyer ou modifier l'identifiant d'un module. `load` reçoit un identifiant et peut renvoyer le contenu du module — depuis le disque, une API ou même du code généré dynamiquement. `transform` reçoit le code et l'identifiant et peut effectuer des transformations (par exemple remplacer `foo` par `bar` ou compiler un SFC Vue en JavaScript).

Lorsque plusieurs plugins existent, Vite exécute la pipeline : pour chaque hook, il itère sur les plugins et transmet l'output d'un plugin en input du suivant. Par exemple, `resolveId` du plugin Vue peut gérer `App.vue`, puis `load` lira le fichier depuis le disque et `transform` convertira le SFC en JavaScript, éventuellement suivi d'autres transformations par des plugins personnalisés.

Le plugin « Vite Plugin Inspect » est utile pour visualiser la stack de plugins appliquée à un fichier ; il montre quels plugins ont traité le fichier et quelles transformations ont été effectuées.

Un plugin peut aussi s'inscrire dans le cycle de vie complet de Vite : la méthode `config` permet de modifier la configuration, `configResolved` reçoit la configuration finale, `buildStart` et `buildEnd` permettent d'effectuer des tâches au début et à la fin du build, comme générer des fichiers ou sitemap.

Exemples pratiques :

- « Simple Transform Plugin » : remplace une constante `buildTime` dans `main.ts` par la date de build via le hook `transform`.
- « ExternalMarkDownloader » : permet d'importer `dailynews.md` qui n'existe pas localement, de récupérer son contenu depuis une URL, de transformer le Markdown en HTML et d'exporter ce HTML pour l'injecter dans l'application.

Le concept de module virtuel permet d'importer `virtual:myPlugin` même si le fichier n'existe pas. Un plugin peut `resolveId` l'identifiant `virtual:my-plugin`, préfixer l'id selon la convention interne et `load` retourner une chaîne JavaScript valide. Le paquet `vite-plugin-virtual` facilite cela en acceptant une map nom->valeur ou des fonctions génératrices.

Cela ouvre beaucoup de possibilités : injecter le dernier hash Git au build time, récupérer des données d'une API et les inclure dans le bundle, générer des routes automatiquement (comme le fait Vue Router), etc.

Un cas concret : un plugin d'icônes. Vous pouvez importer `~/icon-library/icon-name` et obtenir un composant Vue contenant le SVG. Le plugin `resolveId` crée l'identifiant virtuel, `load` appelle Iconify pour récupérer l'icône en SVG et renvoie du JavaScript. Ainsi, vous avez accès à des centaines de milliers d'icônes sans les installer et sans appel API au runtime, car tout est résolu au build time.

Pour résumer la virtualisation en trois points : Vite peut générer des modules virtuels à la volée ; `resolveId` et `load` sont les hooks clés pour créer ces modules ; la technique est largement utilisée pour l'injection de données au build time, la génération de code et d'autres automatisations.

Vite propose encore plus : HMR pour mettre à jour l'interface sans perdre l'état, possibilité d'ajouter des middleware au serveur de développement, des command runners pour exécuter des tâches pendant que Vite tourne, communication inter-process, des macros pour injecter du code au build time et même des serveurs full-stack intégrés via des plugins, comme Nitro.

Avec Nitro, par exemple, le navigateur envoie une requête à Vite, Vite peut la forwarder à Nitro qui exécute la logique backend (appels API, accès base de données) et renvoie une réponse que Vite transmet au navigateur. Tout cela s'intègre via des hooks comme `configureServer` et des middlewares.

En bref, Vite est une pipeline entre vos fichiers et le navigateur : chaque requête peut être transformée à la volée par une série de plugins, et vous pouvez créer des modules qui n'existent pas pour faire presque tout ce que vous voulez.

Quelques conseils pratiques :

- Les plugins s'exécutent dans l'ordre d'enregistrement ; utilisez la propriété `enforce` pour contrôler l'ordre (`pre`, normal, `post`).
- Pour filtrer les identifiants efficacement, préférez un filtre basé sur une regex plutôt que d'effectuer des checks dans le hook, cela réduit le coût d'interop entre Node.js et Rollup.

En 45 minutes, vous avez vu l'essentiel pour écrire vos premiers plugins : `resolveId`, `load`, `transform` et quelques hooks de cycle de vie comme `configureServer`. Avec ces éléments, vous pouvez créer des plugins pour transformer du code, injecter des données au build time ou intégrer un backend.

Merci à tous, c'était Estéban Soubiran. Je suis ravi de lire vos retours. Si vous avez des questions, c'est le moment.

Concernant la sécurité des plugins d'icônes : il existe un risque car on récupère du contenu depuis une API externe, mais Iconify peut être self-hosté et comporte des mécanismes de protection. Comme toujours, auditez les plugins que vous installez et préférez les solutions largement utilisées et bien maintenues.

Sur la migration de Webpack vers Vite : tout dépend de votre projet et des customisations que vous avez faites dans Webpack. Pour des applications peu personnalisées, la transition est souvent simple, mais certains plugins ou fonctionnalités (par exemple Module Federation) peuvent nécessiter des solutions alternatives ou des plugins spécifiques.

Pour l'autocomplétion avec des modules virtuels, il est possible de fournir des déclarations de types (DTS) ou de générer des types dans `node_modules` pour permettre l'autocomplete dans l'éditeur, même si le module n'existe pas physiquement.

Enfin, les imports résolus au build time permettent de préfetcher des ressources ; pour des cas où le code doit être exécuté pour récupérer les données, il faut prévoir des stratégies comme une white-list ou des valeurs de secours.

Merci encore — des questions ?

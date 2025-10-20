Bonjour à tous, je suis ravi d’être ici aujourd’hui.

Depuis la sortie de Nuxt 3, la promesse est « créer des applications web full‑stack performantes et prêtes pour la production ». Mais qu’est‑ce que cela signifie vraiment, et où en est‑on aujourd’hui ?

Gardez votre téléphone à portée de main ; il y aura un QR code à scanner dans quelques diapositives.

Avant d’entrer dans le sujet, je me présente. Je suis Estéban Soubiran et j’utilise Nuxt depuis des années. Je crée des modules comme nuxt-authorization pour gérer les permissions dans les applications, et j’écris des articles sur tout ce avec quoi je travaille, comme Vue, Nuxt, VitePress et Laravel.

Vous pouvez facilement me retrouver en ligne si vous voulez suivre mon travail ou me poser des questions.

Nous repensons la manière de construire les applications.

Cette citation n’est pas de moi mais de Cloudflare en 2020 à propos de leurs Workers. Les Workers sont du code JavaScript qui s’exécute sur le réseau Edge de Cloudflare, mais nous y reviendrons plus tard.

Nous allons voir pourquoi cette idée est importante et comment elle se reflète dans les services de Cloudflare, mais avant cela, comprenons comment les applications sont construites aujourd’hui.

Quels sont les besoins essentiels d’une application web ? Cela nous aide à nous aligner et à comprendre Cloudflare.

La réponse, c’est « tous ». Toute application web a besoin d’une base de données, d’un KV store, d’un stockage de blobs, d’une file de messages et d’un service d’e‑mail.

Sans l’un d’eux, construire une application web sérieuse devient très difficile. Dans une application traditionnelle, on peut regrouper le KV store et la file dans une base de données pour simplifier l’architecture.

Une fois l’application prête, il faut la déployer quelque part pour la rendre accessible à tous.

Traditionnellement, on déploie l’application sur un seul serveur à un endroit donné. Ce serveur d’origine est la source de vérité de l’application, et plus les utilisateurs sont éloignés, plus l’application sera lente pour eux.

Par exemple, une application déployée à Paris sera rapide pour les utilisateurs européens, mais pour ceux d’Océanie, comme à Sydney, elle commencera à être lente, ce qui peut poser problème.

Maintenant que nous savons comment les applications traditionnelles sont construites et déployées, voyons comment Cloudflare repense tout cela.

D’abord, parlons du réseau de Cloudflare, qui est la fondation de tous leurs services. Il y a plus de 330 datacenters — chaque petit point sur cette magnifique carte.

Cloudflare se situe à moins de 50 millisecondes de 99 % de la population. C’est incroyable, et contrairement aux fournisseurs classiques avec des régions comme eu-west-3 ou us-east-1, Cloudflare a une seule région : la Terre.

Cela signifie que votre code est déployé au plus près de tout le monde, sans que vous ayez à le gérer.

Au-dessus du réseau, Cloudflare a bâti un ensemble de services que les développeurs peuvent utiliser pour construire des applications. Vous vous souvenez des besoins essentiels évoqués plus tôt ?

On trouve un key‑value store, une base de données, un stockage de blobs, une file de messages et un service d’e‑mail. Cloudflare propose un service pour presque chacun d’eux.

KV pour le stockage clé‑valeur distribué, D1 pour une base SQL scalable, R2 pour le stockage de blobs, et Queues pour gérer les tâches asynchrones. La seule pièce manquante est l’e‑mail, mais peut‑être un jour.

Ce sont des primitives, mais grâce à leur nature distribuée et serverless, Cloudflare peut offrir une gamme de services de plus haut niveau qui s’appuient sur ces primitives.

Pages pour déployer des applications full‑stack en quelques secondes, Vectorize et Workers AI pour construire et déployer des applications, Web Analytics pour suivre et analyser votre trafic, Workflows pour automatiser vos applications, et Durable Objects pour coordonner plusieurs clients.

À chaque fois, l’idée est la même : vous écrivez le code et ils s’occupent du reste. Vous déployez dans la région « Terre », et tous les services sont interconnectés.

L’expérience développeur est incroyable — inimaginable auparavant. Mais avec tous ces services, la complexité augmente, et les intégrer dans un framework peut être un défi.

C’est un nouveau paradigme qu’il faut comprendre et apprivoiser.

C’est là qu’intervient NuxtHub. Nous connaissons tous l’amour de Nuxt pour une bonne DX.

Les applications Nuxt — spécialement les applications full‑stack — rendent l’utilisation des services Cloudflare très simple.

D’abord, c’est un module qui encapsule les services Cloudflare (KV, D1, R2 et Queues). Tout fonctionne en local et en production sans changer de code.

C’est aussi un CLI pour accélérer le développement et le déploiement : vous pouvez créer une nouvelle application, accéder au stockage à distance et déployer en une minute.

Enfin, c’est un tableau de bord pour gérer vos applications. Vous pouvez voir les déploiements et les logs, et même administrer vos données.

Parce qu’il est construit au-dessus des services Cloudflare, vous pouvez déployer depuis un dépôt Git ou vers un domaine personnalisé en quelques secondes, à un prix très abordable.

NuxtHub ajoute aussi des services de plus haut niveau comme Vectorize, Browser, Rendering, Realtime et Cron.

Et si vous ne me croyez pas, lisez les mots de Sébastien Chopin, créateur de Nuxt, à propos de NuxtHub.

Vous pouvez commencer aujourd’hui gratuitement.

Merci à tous, j’espère vraiment que ce talk vous a plu, et si vous avez des questions, n’hésitez pas à les poser dans le chat.

Nous avons quelques questions. L’expérience côté serveur dans Nuxt 3 se compare‑t‑elle à d’autres frameworks ?

C’est une question très difficile, parce que c’est l’expérience Nuxt — une excellente DX — et vous avez aussi Nitro. C’est différent parce que NuxtHub cible Cloudflare et le serverless, mais vous pouvez déployer partout grâce à Nitro.

Merci. Dernière question : à l’avenir, quelles fonctionnalités ou intégrations vous enthousiasment le plus dans l’évolution full‑stack de Nuxt ?

La partie auth est peut‑être la plus excitante, parce que lorsque vous pourrez intégrer n’importe quel fournisseur d’auth en quelques lignes de code, comme Sébastien l’a montré au début de Nuxt Nation, ce sera génial. Et quand vous pourrez gérer vos utilisateurs depuis un tableau de bord prêt à l’emploi, ce sera encore mieux.

Il faut attendre, car je pense que des gens y travaillent, donc il faut être patient.

Merci beaucoup pour votre temps aujourd’hui.

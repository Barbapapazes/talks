Bonjour à tous, j’espère que vous passez une bonne Devoxx. Pendant les 15 prochaines minutes, on va découvrir ce qu’est UnJS et sa vision d’un JavaScript unifié et universel.

Préparez vos téléphones, il y aura quelques QR codes à scanner.

Avant d’entrer dans le vif du sujet, qui suis‑je ? Je m’appelle Estéban Soubiran. Je suis développeur chez Infomaniak, un cloud provider éthique et suisse, et en parallèle je termine mes études d’ingénieur en cybersécurité.

Dans mon temps libre, j’adore écrire du code et des articles, partager ce que j’apprends, échanger et contribuer à des projets open source. Depuis huit mois, j’ai intégré l’équipe d’UnJS, dont on va parler aujourd’hui. Vous pouvez me retrouver sur X, anciennement Twitter, c’est là où je suis le plus actif.

Avant d’aller plus loin, qui parmi vous connaît UnJS ? Flashez le QR code et répondez à la question.

Si l’écosystème ne vous parle pas trop, c’est normal, il est assez récent, un peu plus de deux ans. Pourtant, c’est un vrai couteau suisse qui peut vous être utile dans vos projets, que vous publiiez des paquets sur npm ou non.

Pour la petite histoire, voici Pooya Parsa. Depuis des années, il développe des outils pour se faciliter la vie en tant que développeur. En 2020, il devient framework architect de Nuxt, le méta‑framework de Vue, avec la volonté de le rendre indépendant des runtimes et des cloud providers.

Pour y parvenir, des parties du code de Nuxt ont été extraites afin de faciliter la maintenance et de poser des bases solides et unifiées pour les auteurs de paquets npm et les méta‑frameworks front‑end qui veulent se lancer dans le back‑end. C’est ainsi qu’UnJS est né en 2022.

Depuis, le projet a bien évolué. C’est aujourd’hui une organisation indépendante sur GitHub qui compte plus de 63 paquets, 50 000 étoiles, 400 millions de téléchargements par mois et 150 contributeurs.

Découvrons quelques paquets. D’abord, ofetch, similaire à fetch du navigateur, mais qui fonctionne à la fois dans Node et dans les workers. Il offre des fonctionnalités en plus comme la création d’instances, des hooks pour, par exemple, redemander un access token ou logger les erreurs, et il désérialise automatiquement la réponse, ce qui évite d’appeler systématiquement .json(). Utiliser ofetch permet aussi d’avoir une API consistante entre client et serveur.

Ensuite, nypm. Entre npm, Yarn, Yarn 2, pnpm et désormais Bun, on a beaucoup de package managers, et c’est pénible quand on passe de projet en projet. L’idée de nypm est de ne plus réfléchir après un clone ou un pull : il choisit automatiquement la bonne commande et le bon package manager pour installer les dépendances. C’est un paquet et une commande pour les gouverner toutes.

Son architecture est modulaire, il peut donc être utilisé dans vos scripts ou par d’autres paquets npm, et il expose toutes ses fonctions utilitaires. C’est la philosophie UnJS : réutiliser simplement.

Unbuild est peut-etre mon préféré. Il y a quelques années, publier mes premiers paquets sur npm et configurer l’outillage était un enfer, puis il fallait refaire pour TypeScript. Avec unbuild, on écrit correctement le package.json, on suit le README et on lance npx unbuild : votre paquet est prêt à être publié, avec ses types, et compatible CommonJS. Sous le capot, c’est Rollup, donc ça reste très personnalisable.

Une fois le paquet publié, on veut faire des releases. Choisir la bonne version, mettre à jour partout, générer le changelog, committer et taguer le bon commit, c’est facile de se tromper, surtout avec des pre‑releases ou quand on gère plusieurs paquets. Changelogen se base sur vos commits pour faire tout ça, génère le changelog, crée la release et le tag, et publie ce qu’il faut. Comme nypm, il expose ses fonctions utilitaires et peut être étendu dans vos scripts ou intégré à d’autres outils comme changelogithub.

Defu est un autre outil simple et très pratique. Quand on crée des outils, on laisse souvent passer des options pour configurer, puis on fusionne avec des valeurs par défaut. Dès que l’objet est profond ou contient des tableaux, on duplique du code. Defu merge récursivement objets et tableaux : les éléments se combinent proprement, y compris en profondeur.

H3, chez UnJS, c’est un peu comme Express, mais entièrement en TypeScript et plus moderne : dans votre bundle final, vous n’avez que ce que vous utilisez. L’API est pensée pour être intuitive, avec des composables; on peut vérifier la méthode HTTP, récupérer le body ou la query, gérer les erreurs, renvoyer du JSON ou un redirect, tout est géré pour vous.

Cette conception très modulaire permet un temps de démarrage, le fameux cold start dans l’edge, sous la barre des 2 ms. C’est très rapide.

H3 c’est sympa mais bas niveau; pour des projets plus sérieux, le compagnon idéal, c’est Nitro. Nitro est à la fois un framework pour des backends dans l’edge et un toolkit pour les prochains frameworks full-stack. Il propulse Nuxt, Analog, Vinxi et bientôt TanStack Start.

Il a été tellement optimisé pour l’edge qu’en production il tient dans moins de 1 Mio, node_modules exclus. Il peut être déployé automatiquement sur plus de 20 cloud providers, sans configuration, et il est compatible avec tous les runtimes.

std-env détecte l’environnement et le runtime grâce à différents indices, afin d’adapter automatiquement la configuration de Nitro. Le développeur n’a rien à faire au déploiement. Vous pouvez d’ailleurs améliorer la DX de vos outils en adaptant leur comportement à l’environnement.

Le petit dernier devrait vous plaire : magic-regexp. Les regex peuvent devenir techniques et difficiles à maintenir; imaginez un langage simple pour les écrire. Magic-regexp, ce sont des mots simples qui font sens ensemble et aident à construire et maintenir vos regex, lisibles en langage naturel.

En bonus, le type de la fonction createRegExp montre la regex générée et les groupes capturés sont automatiquement typés. Fini les typos et le typage manuel qui diverge.

Attention, ce n’est pas une raison pour mettre des regex partout.

Ce que vous venez de voir n’est qu’un aperçu de ce que propose UnJS. On a par exemple unplugin pour développer des plugins pour Vite, Webpack, Rollup, Rspack et Rolldown avec une API unique. On a citty pour créer des CLI simplement, [inaudible] pour la gestion de configuration, uqr pour générer des QR codes, et bien d’autres.

N’hésitez pas à voter pour me dire quel est votre paquet préféré en flashant le QR code. Des questions ?

Qu’est-ce qu’UnJS apporte de plus, est-ce juste une organisation qui développe ces paquets ? UnJS est une organisation GitHub qui regroupe et développe ces paquets, avec l’objectif de rendre des briques front-end issues de Nuxt utilisables dans de nombreuses situations. Ils sont bien développés et maintenus, utilisés par Nuxt et beaucoup d’autres paquets.

Par exemple, jiti occupe une place importante : vous pouvez exécuter directement un fichier TypeScript en l’appelant avec jiti, et il peut aussi être utilisé programmatiquement; il est notamment utilisé chez Tailwind. Il y a des paquets utiles au low-level dans l’écosystème npm, et d’autres comme Nitro intéressent les développeurs qui veulent publier un petit back-end dans l’edge.

À votre avis, c’est prod-ready ? Oui, sans aucun souci. La plupart de ces paquets sont utilisés par Nuxt, entre autres. Sur le site unjs.io, vous pouvez voir quels paquets sont publiés sur npm et quels projets sur GitHub les utilisent. Ça fonctionne en production, Nuxt est utilisé par de grandes entreprises. [inaudible]

Je comprends qu’il y a des paquets dont le but est d’unifier, et pour d’autres, par exemple changelogen, on pourrait comparer à release-it. Beaucoup de paquets viennent de Nuxt ou d’outils initialement créés par Pooya. Changelogen expose toutes ses fonctions utilitaires, ce qui permet à d’autres paquets de le réutiliser, comme changelogithub d’Anthony Fu qui pousse automatiquement vos releases depuis GitHub Actions.

C’est aussi la volonté d’UnJS : favoriser la réutilisation et l’extensibilité. Très souvent, un paquet npm est utilisable mais pas extensible; UnJS cherche à régler ce problème avec des paquets réutilisables et extensibles. [inaudible]

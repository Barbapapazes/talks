Bonjour à tous, très heureux aujourd’hui d’être à Devoxx pour vous parler d’un sujet assez méconnu mais que j’aime beaucoup: les paquets en JavaScript. Aujourd’hui, on a des paquets pour tout… et très souvent des paquets pour rien. C’est exactement ce qu’on va explorer.

Avant de commencer, je vous invite à scanner le QR code ici. Vous arriverez sur un petit tableau de bord avec tous mes réseaux et une question; pour l’instant, ne cliquez pas dessus, on y répondra plus tard.

Vous pouvez aussi noter mon talk, mais je vous conseille de le faire à la fin. Tout en bas, vous avez des émojis sur lesquels cliquer pour réagir en temps réel si vous trouvez quelque chose intéressant ou si vous avez un coup de cœur.

J’aime bien introduire le sujet avec ce graphique qui montre l’évolution des téléchargements du paquet is-string. is-string permet de vérifier si un objet en JavaScript est une chaîne de caractères. Au plus haut, on voit 160 millions de téléchargements par mois.

Vous pourriez dire: 160 millions par mois, c’est beaucoup, mais qu’est-ce que ça signifie ? J’ai ajouté React à titre de comparaison: au maximum, React plafonne entre 120 et 140 millions. J’ai aussi ajouté Tailwind pour un autre point de repère.

Ce qui m’étonne, et j’aimerais qu’on le vérifie ensemble: qui parmi vous a déjà installé is-string ? Je suis à peu près sûr qu’en fait personne ici ne l’a jamais installé, alors que c’est plus téléchargé que React. Effectivement, ça se vérifie: globalement, personne ici n’a jamais installé is-string.

Pourtant, quand on installe un paquet avec npm, on n’installe pas que le code exécutable qui nous intéresse. On récupère aussi le README, le package.json, des sous-dépendances, la licence, etc. Au final, on installe souvent bien plus que le strict nécessaire. C’est important, car on ne veut pas que notre node_modules devienne la chose la plus lourde de l’univers, pour le bien de votre machine, de vos temps d’installation et même du trafic Internet.

Avant d’aller plus loin, je me présente: je m’appelle Estéban Soubiran. Je suis ingénieur logiciel avionique chez MAIA Space, une filiale d’ArianeGroup.

Je contribue pas mal à différents écosystèmes et projets open source, notamment autour de Laravel, Vite, Vue et Nuxt. Quand j’ai du temps libre, j’écris des articles: l’un explique selon moi la meilleure manière de gérer des modales, notamment le stacking; un autre parle de Fusion et montre comment écrire du PHP dans des composants Vue SFC, un exercice un peu étrange mais très utile pour comprendre le fonctionnement de Vite.

Vous pouvez me retrouver sur mon site, sur mes réseaux sociaux ou sur le Discord pour discuter.

Revenons à is-string et vérifions ce que je disais. Peut‑être que, lorsqu’on l’installe, la plupart de ce qu’on récupère n’est pas du code. J’utilise un web container ici, mais tout ce que je fais peut être refait sur votre machine, y compris dans vos projets via la commande npx.

Avec Node Modules Inspector, on installe le paquet, il réalise des analyses et on navigue dans l’interface pour voir différents indicateurs. Première observation: installer is-string installe aussi 15 autres paquets, juste pour vérifier si un objet est une chaîne de caractères, soit 254 Ko de données sur votre ordinateur.

Dans le report review, on voit le classement des paquets du plus lourd au moins lourd et la répartition de ce qu’on installe. La partie JavaScript (en orange) est minoritaire: sur ces 254 Ko, seulement 10 à 20% correspondent au code réellement utile.

is-string a un nom explicite et on se dit vite qu’on peut faire typeof valeur === 'string' à la place. Le problème, c’est qu’il existe beaucoup d’autres paquets aux noms moins clairs, plus difficiles à identifier et à remplacer, que ce soit en auditant un projet que vous maintenez ou en évaluant une dépendance avant de l’installer.

C’est pour cela qu’un écosystème s’est développé, E18E (Ecosystem Performance), avec trois objectifs.

D’abord cleanup: nettoyer l’écosystème en proposant des PR, en modernisant ou en forquant des projets. Ensuite level up: améliorer l’écosystème, par exemple avec des plugins ESLint qui vérifient que votre package.json n’utilise pas des dépendances obsolètes ou remplaçables par des fonctions disponibles dans le runtime. Enfin speed up: en nettoyant et en réduisant les fichiers et les dépendances, on accélère naturellement les installations et les chargements.

Je vais vous montrer quelques outils pour auditer un module avant de l’installer, comprendre ce qui se passe derrière, et aussi analyser votre propre package.json pour détecter des dépendances remplaçables par des alternatives plus modernes.

Premier outil: Package Size. Je l’utilise à chaque fois que j’installe une dépendance pour voir ce qui se cache derrière. Comme Node Modules Inspector, il installe le paquet dans un web container et affiche les résultats: ici, 15 paquets, environ 250 à 270 Ko, avec la composition (ESM/CommonJS, types, sous‑dépendances), et des liens vers GitHub ou npm.

La section bundle size est intéressante: au moment du bundling, est‑ce l’intégralité du paquet qui passe ? Pour simplement vérifier une chaîne de caractères, c’est quand même 14 Ko qui entrent dans votre application.

Deuxième outil: DepTree. Vous pouvez saisir le nom d’un paquet (par exemple is-string) ou téléverser votre package.json, même pour un projet interne non publié sur npm. DepTree s’appuie sur le travail d’E18E, qui maintient une liste de correspondances entre paquets à éviter et alternatives plus modernes.

DepTree relie vos dépendances à ces alternatives et propose des remplacements concrets. Par exemple, is-string peut souvent être remplacé par typeof valeur === 'string'. On voit aussi des paquets comme function-bind, remplaçable aujourd’hui par Function.prototype.bind, ou sError, remplaçable par les types d’erreurs intégrés au runtime. On ne pense pas toujours à ces remplacements, et vous aurez sûrement des surprises en testant l’outil sur vos projets.

Dernier outil: npmgraph. Il dessine l’ensemble du graphe de dépendances de votre package.json. Prenons Storybook 8.2: c’est environ 400 modules (dépendances et sous‑dépendances). Le graphe est massif, ce qui explique des installations lourdes et des temps de chargement élevés.

Ils ont travaillé pendant plusieurs mois avec l’équipe E18E. Résultat avec Storybook 8.4: sur ma machine ça charge bien plus vite, et le graphe est réduit à environ une vingtaine de dépendances. C’est donc possible de travailler sur ses dépendances pour arriver à quelque chose de plus digeste.

Au‑delà des performances, cela simplifie la gestion du projet: moins de dépendances, c’est moins de mises à jour et moins de risques lors des changements majeurs. Avec npmgraph, vous verrez très vite s’il y a du désordre dans votre package.

Pour aller plus loin, je vous invite à visiter e18e.dev. Si vous voulez explorer plus en profondeur les remplacements vus avec DepTree, consultez le dépôt module-replacement; il existe même un paquet du même nom.

Vous avez aussi une règle ESLint qui scanne automatiquement votre package.json et signale qu’une alternative moderne existe quand vous ajoutez un paquet obsolète. Exemple simple: peut‑être utilisez‑vous globby pour faire des glob, alors qu’aujourd’hui une alternative est directement intégrée dans fs avec Node 22. La règle vous dira: « dans ton package.json, ce paquet peut être remplacé ».

Enfin, rejoignez la communauté sur Discord: ils sont très avenants et collaborent avec de nombreux écosystèmes, notamment Vite, pour diffuser ces bonnes pratiques.

Merci à tous. Si ça vous a plu, vous pouvez noter le talk en scannant le QR code. Il nous reste une minute vingt pour des questions.

[inaudible]

Pourquoi is-string est‑il si « gros » ? is-string n’est pas qu’un simple typeof valeur === 'string'. En JavaScript, on peut créer une chaîne avec new String('…'); dans ce cas, typeof renvoie 'object' et non 'string'.

La question est donc: voulez‑vous réellement supporter cet usage dans votre outil ? D’après Patak, lead dev de Vite, ils n’ont jamais eu de retour d’utilisateur disant « j’utilise new String, et donc ça ne marche pas ». Personne ne fait new String en pratique, donc ils n’utilisent pas is-string et ça ne pose pas problème.

is-string fait plus que le strict typeof, ce qui explique sa popularité et sa taille relative, mais ça ne signifie pas que vous en avez besoin dans votre contexte.

Merci à tous.

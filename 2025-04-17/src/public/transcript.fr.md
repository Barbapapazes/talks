Bonjour à tous, je suis très heureux aujourd’hui d’être à Devoxx pour vous parler d’un sujet que j’aime beaucoup: la réactivité des signaux dans le front‑end. Vous êtes nombreux, je ne m’attendais pas à un tel intérêt, et c’est très cool.

Avant de commencer, je vous invite à scanner le QR code pour accéder à une page interactive. Vous y trouverez mes réseaux, des questions auxquelles nous répondrons au fur et à mesure, la possibilité de noter le talk à la fin, de poser des questions pour la session Q&A, et de réagir en temps réel si quelque chose vous plaît.

Pour bien démarrer, dites‑moi quel framework vous utilisez en front‑end, via la page ou le second QR code. Chaque framework gère sa réactivité à sa manière. Aujourd’hui, nous allons regarder les signaux, et plus précisément une façon de les implémenter; vous verrez que ce que nous allons explorer est applicable ailleurs.

Je voudrais vous poser une question: vous êtes‑vous déjà demandé comment fonctionne réellement votre framework front‑end? Par exemple, quand vous cliquez sur un élément, comment une autre partie de l’interface se met‑elle à jour automatiquement? Avez‑vous déjà trouvé des réponses? C’est ce que nous allons voir.

Je commence par une équation: l’interface utilisateur est une fonction de l’état. On la voit souvent avec React: un composant (la fonction) retourne du JSX (l’UI) et prend des props (le state). On peut l’appliquer à notre modèle de réactivité: l’UI est pilotée par une “boîte noire” que nous appelons la réactivité, qui prend l’état en entrée. Quand on modifie l’état, l’interface se met à jour.

Vous connaissez ce modèle sans le savoir grâce à Excel. Imaginons un tableau avec trois lignes et trois colonnes: en B1 la quantité, en B2 le prix unitaire, et en B3 une formule qui dit que le total est égal à B1 × B2. [inaudible] C’est déstabilisant mais amusant. Si on passe la quantité de 0 à 3, B3 se met automatiquement à 45; si on met 2, le total devient 30. L’interface est bien pilotée par l’état.

Ce qui nous intéresse aujourd’hui, ce n’est pas Excel mais le code et les signaux. Nous allons décortiquer une bibliothèque: Alien Signals. Mon objectif est qu’à la fin vous compreniez parfaitement ce qui se passe sous le capot de ces quelques lignes.

Pourquoi Alien Signals? Cette bibliothèque a été développée par Johnson Chu, qui contribue beaucoup à Vue.js côté Reactivity API. Pour des besoins rencontrés notamment sur Volar (LSP multiples dans un même fichier, utile dans Vue.js avec ses trois blocs, et dans Astro avec du JS et du HTML), il s’est demandé jusqu’où on pouvait optimiser les signaux. Aujourd’hui, Alien Signals est l’implémentation de signaux la plus efficace de l’écosystème JavaScript. Elle a d’autres avantages: la logique est langage‑agnostique, avec des implémentations en Rust, Go et Lua. On peut réimplémenter la plupart des signaux des autres frameworks, ainsi que ceux en cours de standardisation au TC39.

Reprenons l’exemple Excel: si on modifie la variable quantity, l’effect se relance et le total se met à jour à 15. Notre objectif est de comprendre comment l’effect sait se mettre à jour automatiquement quand quantity change.

Avant d’aller plus loin, je me présente. Je m’appelle Estéban Soubiran, je suis ingénieur logiciel avionique chez MaiaSpace, une filiale d’ArianeGroup qui développe des lanceurs partiellement réutilisables. À côté, je contribue à l’open source dans les écosystèmes Laravel, Vite, Vue et Nuxt. On peut discuter Angular et React, même si c’est moins mon point fort.

Quand j’ai un peu de temps, j’écris des articles. Le dernier présente, selon moi, une bonne façon de gérer des modales qui se superposent élégamment. J’ai aussi écrit sur Fusion, qui permet d’écrire du PHP dans un fichier Vue SFC, un concept un peu étrange mais riche d’enseignements sur Vite. Vous pouvez tout retrouver sur mon site et me contacter sur les réseaux ou sur Discord pour échanger.

Ce qui nous intéresse, ce sont les signaux. Pour bien comprendre, faisons un peu de mathématiques et de théorie des graphes. [inaudible]

Un graphe est une structure mathématique qui représente des liens entre des objets. On y trouve des nœuds (là où se fait le calcul) et des arêtes, les liens orientés d’un nœud vers un autre. Si une arête va de A vers B, on peut aller de A à B, puis de B à C, mais pas remonter si les flèches ne le permettent pas.

Dans un graphe orienté, on peut effectuer un tri topologique: ordonner les nœuds de sorte qu’on ne visite un nœud qu’après tous ses parents. Par exemple, si A a comme parent D, on doit d’abord traiter D. On parcourt ainsi le graphe jusqu’à passer par tous les nœuds. Il existe plusieurs tris topologiques possibles pour un même graphe. On parle alors de DAG, graphe orienté acyclique. En présence d’un cycle (par exemple un lien de C vers A), on pourrait boucler indéfiniment.

Autre notion utile: les listes doublement chaînées. On peut les voir comme un graphe où chaque élément connaît son suivant et son précédent. On peut donc naviguer dans les deux sens: de A à B, de B à C, puis revenir de C à B et de B à A.

Associons ces notions au code vu au début. Les signaux sont des nœuds du graphe. Une computed est une valeur calculée à partir d’autres signaux: on représente le nœud total relié à quantity et à price. Total a donc deux dépendances. Un effect, dont la fonction de rappel accède à total, est relié à total. Cette première vue décrit comment les éléments sont liés.

On peut aussi représenter ces liens avec une liste doublement chaînée pour comprendre comment on navigue dans le graphe. Cette seconde vue nous aide à modéliser les abonnements et désabonnements dynamiques.

Passons au code d’Alien Signals et à ses primitives. Signal stocke une valeur; computed calcule une valeur à partir d’autres signaux; effect exécute une fonction en réaction aux changements; effectScope regroupe des effects pour se désabonner en bloc. Une primitive peut être dépendance, abonné (subscriber), ou les deux: un signal est une dépendance; une computed est à la fois abonné de ses dépendances et dépendance d’autres nœuds; un effect est abonné, et peut servir de dépendance dans certains cas; un effectScope gère la durée de vie.

Regardons l’implémentation d’un signal. La fonction interne qui gère get et set a deux parties. Côté get, si un activeSub (abonné actif) existe, on crée un lien entre le signal et cet abonné via une structure partagée des deux côtés, ce qui alimente notre liste doublement chaînée. Puis on retourne la valeur.

Côté set, on récupère les abonnés et on propage le changement. Pour comprendre la propagation, il faut évoquer trois modèles de réactivité. En pull, ce sont les abonnés qui interrogent régulièrement leurs dépendances pour savoir si elles ont changé; c’est inefficace. En push, la dépendance pousse sa nouvelle valeur vers ses abonnés au moment du changement; c’est réactif mais force les computed à se recalculer immédiatement, même si personne ne lira la valeur.

Alien Signals utilise un modèle push‑pull, le meilleur des deux mondes. Lors d’un set, la dépendance propage un simple drapeau (flag) vers ses abonnés, ce qui est très performant. Ensuite, au moment où un abonné a besoin de la valeur (par exemple lorsqu’on lit une computed), il effectue le calcul “à la demande”. Les computed sont donc paresseuses (lazy) par nature et évitent des recalculs inutiles. La propagation collecte aussi les effects concernés pour ne les exécuter qu’une seule fois après avoir levé tous les flags.

Côté computed, on vérifie les flags; par défaut, une computed est dirty au premier run. Elle se déclare temporairement comme activeSub, exécute sa fonction de rappel pour lire ses dépendances, puis, s’il existe un abonné actif plus haut, elle crée le lien correspondant. Si un effectScope est actif, l’abonnement y est enregistré. Enfin, elle retourne sa valeur.

Pour effect, la mécanique clé est simple: on place l’effect en activeSub, on exécute sa fonction de rappel, puis on rétablit l’état précédent. Avec cette seule variable globale activeSub, tout s’imbrique: pendant l’exécution, chaque get de signal voit qu’un abonné actif existe et crée le lien entre dépendance et abonné. C’est toute la “magie” de la réactivité par signaux avec une unique variable globale.

[inaudible]

Tout n’est pas trivial pour autant. Quatre problèmes demeurent sans solution universelle, et chaque implémentation apporte ses stratégies. D’abord le glitch: lorsque deux valeurs lues dans une computed peuvent changer à des temps différents, l’ordre d’exécution peut produire un état intermédiaire incohérent. Ensuite les dépendances cycliques: un cycle dans le graphe peut conduire à une boucle infinie; on introduit des points d’arrêt, mais le moment où l’on coupe varie selon l’implémentation.

Troisièmement, l’interaction avec des états muables: si vous mettez un objet ou un tableau dans un signal et qu’il change pendant l’évaluation, cela peut fausser les résultats. Alien Signals choisit de ne pas accepter objets ni tableaux, ce qui simplifie et améliore les performances. Enfin, la mise à jour dynamique du graphe de dépendances: que se passe‑t‑il quand on ajoute ou retire un nœud en plein calcul? La gestion dépend de l’algorithme et sort du cadre de cette présentation.

Mais une fois qu’on a vu ça, on peut se demander: concrètement, dans un framework, comment ça se passe? Savoir comment fonctionnent les signaux, c’est bien, mais si derrière on ne peut pas les utiliser dans un framework, c’est frustrant.

Pour le plaisir des personnes qui font du JavaScript front‑end, j’ai “fait” un nouveau framework front‑end. [inaudible] Vous allez me dire: “Estéban, tu te moques de nous, ça n’a pas du tout la gueule d’un framework front‑end.” Il manque des morceaux, mais la base y est.

On définit un signal count initialisé à 0, puis on met un effect qui se relance à chaque fois que count change. Ensuite, on met à jour count avec un +1. Quand on fait +1, l’effect se relance et la page HTML se met à jour. On peut imaginer un bouton avec un event listener qui appelle cette fonction à chaque clic.

C’est exactement ce qui se passe dans un framework front‑end: quand vous modifiez des variables, l’interface, pilotée par le state, change. L’UI est égale à f(state). On a donc refait un petit framework front‑end.

Et si on creuse, c’est exactement ce qu’on trouve dans Vue.js. Le code est plus fourni pour gérer les edge cases, mais l’idée est la même. On démarre un effectScope que l’on arrêtera ensuite. Entre‑temps, on crée un ReactiveEffect (dans la Composition API de Vue.js) à qui l’on passe componentUpdateFn.

Dans cette fonction, on exécute le script du composant (où l’on définit nos signaux) et la fonction qui met à jour le DOM. Autrement dit, la fonction passée à ReactiveEffect lit les signaux et met à jour le DOM, exactement comme dans notre exemple. Vue.js englobe chaque composant dans un effect afin que le composant se mette à jour, sans réévaluer toute l’application, dès qu’un signal change.

Peut‑être avez‑vous entendu parler de Vapor, qui arrive dans Vue 3.6. Vapor, et c’est aussi l’approche de Qwik ou de Solid, change légèrement le modèle: au lieu d’un effect qui englobe tout le composant, on attache des effets au niveau des éléments du DOM. On obtient une réactivité fine‑grained, chirurgicale, qui ne mute que l’élément du DOM concerné quand un signal change, et on peut se passer du Virtual DOM.

Ces évolutions rendent les frameworks beaucoup plus efficaces. C’est l’une des raisons pour lesquelles Angular passe aussi sur les signaux. Pour en savoir plus, explorez le code source d’Alien Signals: deux fichiers, une centaine de lignes, mais un JavaScript peu commun.

Vous pouvez regarder la vidéo “La réactivité cross‑frameworks” pour mieux comprendre les différents modèles, et lire un article du créateur de Qwik qui explique tout cela. Restez curieux et continuez d’apprendre. Merci à tous, c’était Estéban Soubiran; pour noter le talk, scannez le QR code.

Comme on a 12 minutes d’avance, passons aux questions. [inaudible] “Bonjour, merci Estéban de porter ce sujet passionnant. J’ai vu sur la page d’Alien Signals un benchmark comparé aux nouveaux signals d’Angular; c’est assez catastrophique. Est‑ce que ça a du sens d’importer RxJS dans un projet Angular ?” [inaudible]

Aujourd’hui, par exemple, on peut utiliser Alien Signals dans React; des wrappers existent pour rendre ça agréable. L’un des problèmes d’Angular, c’est que la manière dont les signaux y sont mis en place est extrêmement couplée au framework. Rien ne t’interdit d’utiliser RxJS dans Angular, mais tu perdrais ce couplage fort, avantageux pour certaines fonctionnalités, notamment tout ce qu’ils apportent récemment sur les ressources et la récupération de données depuis une API.

En pratique, c’est compliqué à bien recoller au framework. À l’inverse, l’implémentation d’Alien Signals remonte petit à petit dans la réactivité de Vue.js, parce que la réactivité de Vue.js est découplée du framework. J’espère que ça répond à la question.

Autre question: “Est‑ce qu’on peut voir les signaux demain comme des primitives de base de JavaScript, comme les Observables aujourd’hui ?” Dans le sens de primitives natives? Aujourd’hui, c’est porté au TC39 avec la proposal “signals”. Le comité (standardisation d’ECMAScript) vise à implémenter des signaux en tant que primitives pour unifier les patterns des frameworks, puisque tous commencent à utiliser les signaux.

C’est compliqué: ceux qui portent la proposal ont du mal à se coordonner avec l’ensemble des frameworks, chacun ayant des besoins spécifiques. Mais une proposal, c’est une spec; on peut l’implémenter. Alien Signals propose un paquet compatible avec la proposal du TC39 (voir le README). On peut donc l’utiliser dès maintenant, même si ce ne sont pas encore des primitives natives; l’échéance est incertaine et cela pourrait ne jamais aboutir.

Merci. Pas d’autres questions? Vous avez tout compris. [inaudible]

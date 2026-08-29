Bonjour à tous et merci d’être là aujourd’hui. On va parler d’un sujet que j’aime beaucoup et qui est assez peu expliqué sur Internet: la réactivité basée sur des signaux, et essayer de comprendre ce qui se passe dans notre front-end.

Avant d’aller plus loin, je vous invite à scanner le QR code. Vous y trouverez mes réseaux, une question à ne pas ouvrir tout de suite pour garder le fil de la présentation, un lien pour noter le talk à faire plutôt à la fin, ainsi que des réactions en bas de page pour réagir en temps réel.

Je lance d’abord une question simple pour savoir quels frameworks vous utilisez côté front-end. Si ça ne marche pas, ce n’est pas grave; on continue. L’idée est que la présentation est agnostique du framework: on va traiter des concepts fondamentaux, utiles quel que soit votre outil.

J’aime commencer avec cette équation souvent associée à React: l’UI est la résultante d’une fonction qui prend un état en paramètre. On peut appliquer la même idée à un système de réactivité: fn n’est plus un composant, c’est une boîte noire qui produit l’UI à partir de l’état.

Vous avez tous déjà manipulé ce principe avec Excel. Dans un tableau avec quantité, prix unitaire et total, une cellule peut contenir une formule qui dépend des autres. Dès qu’on modifie une valeur, toutes les formules se mettent à jour: l’interface est pilotée par l’état. UI = fn(state).

Transposons ça en code. On crée deux signaux, quantity et price, un computed total = quantity × price, et un effect qui affiche le résultat. Quand on met à jour quantity, l’effect se relance et la vue affiche la nouvelle valeur, comme dans Excel. C’est précisément ce mécanisme que nous allons expliquer.

Je me présente: je m’appelle Estéban Soubiran, ingénieur logiciel avionique chez MySpace, filiale d’ArianeGroup, où l’on développe des lanceurs spatiaux partiellement réutilisables. Je contribue aussi à des écosystèmes front et back autour de Laravel, Vite, Vue et Nuxt, et j’écris des articles techniques; vous retrouverez tous les liens sur mon site.

Avant de plonger dans le code, un peu de théorie des graphes. Un graphe comporte des nœuds (les points où se font les calculs) et des liens (les flèches ou traits qui relient les nœuds). Ici, on s’intéresse aux graphes orientés, où la flèche donne un sens, et acycliques, où l’on ne peut pas revenir en arrière.

Le tri topologique est un ordre linéaire des nœuds tel que chaque nœud vient après tous ses parents. On ne peut marquer un nœud qu’une fois tous ses parents traités; il existe souvent plusieurs ordres valides. Autre notion utile: la liste doublement chaînée, où chaque élément connaît son précédent et son suivant, ce qui permet de naviguer dans les deux sens.

Revenons à nos signaux. Quantity et price sont deux nœuds sources. Le computed total dépend de ces deux nœuds, et l’effect dépend de total. Le graphe rend visibles ces relations, et l’on peut le parcourir dans un sens ou dans l’autre selon les besoins du moteur.

Passons à Alien Signal, une bibliothèque bas niveau et agnostique du framework et du langage, créée par Jan Sancha. L’algorithme a des ports dans d’autres langages (Lua, Java, etc.) et permet même d’implémenter la proposition de signaux du TC39.

Alien Signal expose quatre primitives: signal, computed, effect et effectScope. Deux catégories existent: les dépendances (qui portent des valeurs, comme les signaux) et les subscribers (computed, effect, effectScope) qui s’abonnent aux dépendances. Computed joue souvent les deux rôles: dépendance d’autres nœuds et abonné de ses sources.

Côté signal, l’API est un getter-setter. En lecture, s’il existe un activeSub (subscriber en cours), le signal crée un lien bidirectionnel entre lui et cet abonné, ce qui forme une liste doublement chaînée pour naviguer efficacement. En écriture, il récupère ses subscribers et propage la mise à jour.

Sur la propagation, il existe trois grands modèles. En push, les dépendances recalculent et poussent vers leurs abonnés, ce qui peut être coûteux si beaucoup de computed sont lourdes. En pull (polling), les abonnés interrogent périodiquement les dépendances, ce qui est réactif mais inefficace. Alien Signal utilise un modèle push-pull: les signaux lèvent des drapeaux (“j’ai changé”) et les abonnés décident quand recalculer. Les effects sont collectés et exécutés en lot pour éviter les doublons.

Pour computed, au début de l’exécution on traite les drapeaux via processComputedUpdates afin de savoir si la valeur doit être recalculée. Comme computed peut aussi être une dépendance, il se lie à activeSub quand il est lu, exactement comme un signal. Puis il renvoie sa valeur courante.

Côté effect, l’exécution place l’effect courant dans activeSub, puis appelle sa fonction de rappel. Toute lecture de signal ou de computed pendant cette exécution crée des liens vers cet effect. C’est ainsi que les dépendances et les abonnés se relient automatiquement.

Si on récapitule notre exemple: quantity et price n’ont pas de parents, computed total s’abonne à eux lors de sa première exécution, puis se retire d’activeSub. L’effect s’abonne à total. Une mise à jour de quantity lève un drapeau, total se marque sale si nécessaire, et l’effect est déclenché une seule fois avec la nouvelle valeur.

Ce mécanisme s’appuie sur des liens bidirectionnels et des listes doublement chaînées, ce qui permet de naviguer rapidement dans le graphe. Alien Signal est aujourd’hui l’une des implémentations de signaux les plus performantes de l’écosystème JavaScript, justement grâce à ces choix d’architecture.

Tout n’est pas magique pour autant. Quatre problèmes classiques existent: les glitches (des incohérences temporaires selon l’ordre d’exécution des parents), les dépendances cycliques (boucles à détecter et couper), les interactions avec un état muable (modifications structurelles pendant la résolution), et les mises à jour dynamiques du graphe (ajout/retrait de dépendances en cours de route). Selon les bibliothèques (Alien Signal, Preact, Solid, Qwik, etc.), les stratégies diffèrent; la plupart du temps c’est transparent pour l’utilisateur.

Faisons un mini “framework”. On crée un signal count = 0, un effect qui écrit "count is ${count()}" dans document.body.innerHTML, puis on incrémente count. L’effect relance, la page se met à jour; on a bien UI = fn(state).

Dans Vue.js, on retrouve ce schéma: création d’un reactive effect avec une fonction componentUpdateFn, exécution dans un scope qui s’ouvre et se ferme au niveau du composant. Chaque modification de state déclenche la mise à jour du composant. Le modèle push-pull évite de recalculer inutilement les computed, et le scope permet de nettoyer effets et signaux quand le composant est démonté. La tendance moderne pousse vers une granularité encore plus fine, au niveau des nœuds du DOM, comme on le voit dans Qwik et ce vers quoi tend Vue avec Vapor.

Pour aller plus loin, je vous invite à lire le code source d’Alien Signal, à regarder la vidéo "Reactivity Cross-frameworks", et un excellent article du créateur de Qwik qui illustre visuellement ces différences. Merci à tous; c’était Estéban Soubiran. Si vous souhaitez noter le talk, le lien est sur la page.

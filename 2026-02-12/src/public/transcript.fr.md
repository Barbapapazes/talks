Bonjour tout le monde et bienvenue.

Aujourd'hui, on va parler d'un sujet qui me tient beaucoup à cœur, qu'on a tendance à beaucoup utiliser, mais dont on ne sait pas forcément comment ça marche en profondeur. Aujourd'hui, on va parler des signaux et de la réactivité.

Avant d'aller plus loin, je vous propose qu'on fasse une petite photo tous ensemble. Ceux qui ne veulent pas être sur la photo, vous mettez votre main sur votre visage. Tout le monde sourit. Trop bien.

Ça, c'est pour le petit côté souvenir. Avant d'aller plus loin, je vous invite à scanner ce QR code avec votre téléphone.

Il vous amènera sur une page sur laquelle vous allez pouvoir retrouver mes différents réseaux. Vous allez aussi pouvoir répondre à des questions. Pour l'instant, ne le faites pas, on le fera au fur et à mesure.

Vous avez aussi la possibilité de poser des questions en temps réel, s'il y a des choses que vous ne comprenez pas. Je pourrai y répondre si c'est pertinent à ce moment-là. Vous allez aussi avoir la possibilité de me faire un feedback, plutôt à la fin pour être le plus objectif possible. Et puis à tout moment, vous pouvez réagir à ce que je dis, si jamais vous trouvez ça drôle, intéressant ou si simplement vous êtes d'accord.

C'est génial, tout fonctionne.

Pour bien commencer, ce qu'on va faire, c'est savoir quelle technologie vous utilisez pour votre front-end, quel framework vous utilisez. Soit vous répondez à la première question sur la page sur laquelle vous êtes arrivés juste avant, soit vous pouvez scanner le QR code qui est ici, en haut à droite.

Ce qui est intéressant, c'est qu'aujourd'hui on va parler de signaux et de réactivité. Finalement, quel que soit le framework que vous utilisez, pour une majorité Angular... Si vous faites du React, dommage, vous êtes les seuls à ne pas avoir de signaux. Ce n'est pas grave.

Mais pour tous les autres, ce qui est chouette, c'est qu'aujourd'hui on va parler de signaux et de réactivité à un niveau suffisamment bas pour que tout le monde puisse comprendre ce dont on va parler, peu importe votre langage. Globalement, on a plein de gens qui font du Vue, c'est cool, je vous aime bien. On a plein de gens qui font de l'Angular. Et puis après, on a d'autres frameworks qui sont utilisés.

J'aime bien commencer cette conférence par cette équation qui nous dit que UI est égale à fn(state). Souvent, cette équation va plutôt dans React.

Dans React, notre interface utilisateur est égale à la résultante d'une fonction, littéralement en JavaScript. Donc notre fn, ici, prend en paramètre des props. On a cette équation qu'on peut découper en trois gros blocs : notre interface utilisateur, notre fonction et notre état.

Ce qui est chouette avec la réactivité et les signaux, c'est qu'en réalité on peut reprendre cette même équation. Et plutôt que d'avoir en fn une fonction, comme on peut avoir en React, on va plutôt imaginer une boîte noire.

Cette fn, on va l'imaginer comme une boîte noire et on va dire que c'est notre système de réactivité. Tout l'objectif du talk aujourd'hui, ça va être de démystifier cette fn-là. Ce qu'on va dire, c'est que nos interfaces vont être pilotées par l'état. Donc notre UI va être pilotée par une boîte noire qui prend en paramètre un état.

En fait, c'est un concept que vous connaissez tous et que vous avez déjà manipulé à travers un tableau Excel.

Là, c'est un tableau Excel dans lequel on voit trois lignes et trois colonnes. On voit qu'en colonne B, on a une quantité de choses. En ligne 2, on a un prix unitaire par élément. Et enfin, on a le total.

Comme dans tout tableau Excel, on peut insérer une formule. On voit qu'ici, en B3, on va avoir le résultat qui va être égal à B1 fois B2.

Évidemment, comme dans tout tableau Excel aussi, si on change la quantité, plutôt que d'en avoir 0, et qu'on en met 1, ou même 3, on voit qu'automatiquement le total se met à jour. On a bien une interface qui est pilotée par l'état : on a changé l'état et automatiquement notre interface a réagi.

Évidemment, aujourd'hui, ce n'est pas d'Excel dont on veut parler, mais plutôt de ça.

Ce qu'on voit ici, c'est exactement comme notre tableau Excel de tout à l'heure. On va avoir une quantité de choses, un prix, puis derrière on va calculer un total qui, comme dans notre cellule B3, sera le résultat de quantity fois price. Ensuite, on va afficher quelque chose dans la console.

Ce qui est intéressant avec la librairie qu'on va utiliser ici, c'est qu'on va parler d'Alien Signals.

Alien Signals, c'est une librairie développée par Johnson Chu, qui travaille beaucoup sur la réactivité de Vue.js et aussi sur tout le LSP de Vue.js, notamment Volar. Il a eu des problématiques de performance et s'est demandé jusqu'où on pouvait pousser la réactivité pour qu'elle soit la plus performante possible. Il en est arrivé à développer Alien Signals, qui est aujourd'hui l'implémentation des signaux en JavaScript la plus performante qui soit.

Ce qui est aussi intéressant avec Alien Signals, c'est que son API publique, qu'on voit ici, est développée avec des API internes qui permettent de recréer toutes les implémentations de signaux de tous les frameworks, et notamment celle du TC39 pour la standardisation potentielle des signaux en JavaScript.

Ce qui est chouette avec Alien Signals, c'est qu'on est suffisamment bas niveau pour qu'on puisse tous partir de la même base et comprendre ensemble ce qui va se passer. Notre objectif, comme tout à l'heure dans le tableau, c'est que si quantity, au lieu de valoir 0, passe à 3, on voit ici que notre total vaut maintenant 45. Tout l'objectif des prochaines minutes, c'est de comprendre comment, en changeant quantity ici, ce truc-là sait qu'il doit tourner à nouveau pour nous afficher un nouveau total.

Je me présente, je m'appelle Estéban Soubiran, je suis ingénieur chez Takima.

Dans mon temps libre, je gravite plutôt autour des écosystèmes Laravel, Vite, Vue, Nuxt. Et quand il me reste du temps, je crée des articles, récemment sur des plugins Vite ou des plugins Markdown, entre autres.

Vous pouvez me retrouver à peu près partout, principalement sur LinkedIn, de temps en temps sur Twitch quand j'ai le temps, et sinon sur mon site internet. Mais on n'est pas là pour parler de moi, on est là pour parler d'Alien Signals et de comprendre ce qui se passe en profondeur.

Avant de vraiment creuser le sujet, ce qu'on va faire, c'est un peu de maths. On va faire un peu de théorie des graphes.

En théorie des graphes, on a deux grands éléments. Le premier, c'est le nœud, le node, qu'on représente ici sous la forme d'un carré, et c'est globalement là où vont avoir lieu les différents calculs.

On peut évidemment, dans notre graphe, placer différents nœuds et les relier entre eux avec des traits qu'on va appeler des liens, des edges, des links. Tout ça, c'est le même terme. Là, c'est intéressant de noter qu'entre A et B, on n'a pas juste un lien classique, on a un lien avec une flèche. Aujourd'hui, vous avez de la chance, vous voyez les flèches, parce que les fois précédentes, on ne les voyait pas.

On peut rajouter d'autres nœuds. Ici, on rajoute C et on a encore une flèche de B vers C. Là, on va dire que notre graphe est orienté parce qu'on ne peut passer que de A vers B, puis de B vers C. Une fois qu'on arrive à C, on ne peut pas revenir.

Évidemment, comme on est dans un graphe, on peut mettre beaucoup plus de nœuds. Ici, on a rajouté D, E et F, avec des flèches pour nous donner le sens dans lequel on peut le parcourir.

Là, on dit qu'on a un graphe orienté et, en plus de ça, qui ne fait pas de cycle. C'est-à-dire qu'une fois qu'on est arrivé à la fin du graphe, on ne peut pas revenir au début. On a donc un graphe acyclique.

Si on part de A, qu'on va à B, puis à C, on ne peut pas revenir quelque part. En revanche, si on imagine un lien entre C et A, dans ce cas-là on aurait un cycle puisqu'on pourrait faire A, B, C, remonter à A, et ainsi de suite. Mais là, ce n'est pas le cas.

Dans des graphes orientés acycliques, on a une propriété intéressante, c'est celle du tri topologique.

Un tri topologique, c'est un ordre linéaire des nœuds tel que chaque nœud de départ arrive avant, dans l'ordre, le nœud d'arrivée. Autrement dit, pour accéder au nœud suivant, il faut absolument qu'on soit passé par tous les nœuds qui seraient reliés à ce nœud-là.

Si on prend A par exemple, ce qu'on va faire, c'est regarder s'il a des parents. Est-ce que A a des parents ? Oui, il a un parent, c'est D. Est-ce qu'on est passé par D ? Non.

Il faut voir le tri topologique comme une espèce de liste dans laquelle on va essayer de classer nos différents nœuds. Comme on n'est pas passé par D, on ne peut pas commencer par A. Donc on va regarder D : est-ce que D a des parents ? Non. D n'a pas de parents, donc on peut commencer par D et le placer dans notre liste.

Ensuite, on peut reprendre A. On regarde : est-ce que A a des parents ? Oui, c'est D. Est-ce qu'on est passé par D ? Oui, donc on peut prendre A.

Puis on peut aller sur B. Est-ce que B a des parents ? Oui, c'est A, D et E. On n'est pas passé par ces trois-là, donc on ne peut pas encore le prendre. On va comme ça faire le tri de notre graphe. Par exemple, on peut faire D, puis A, puis F, puis E, puis B, puis C.

Ce qui est intéressant, c'est que pour un même graphe, vous avez plusieurs tris topologiques. On aurait très bien pu commencer par F et refaire la même chose.

Il y a un deuxième type de graphe qui va nous intéresser pour la suite : la liste doublement chaînée.

Dans une liste doublement chaînée, ce qui est chouette, c'est qu'on peut aussi la représenter sous la forme d'un graphe, avec un nœud A qu'on va relier à un nœud B. Mais là, on va créer un lien entre A et B, et un autre entre B et A.

Pourquoi on dit qu'on est dans une liste doublement chaînée ? Parce qu'on est dans une liste, on a relié nos éléments entre eux, et doublement parce qu'on peut passer de A à B et de B à A. Évidemment, si on rajoute des éléments dans notre graphe, il faut aussi les lier doublement. Pour le coup, on est dans des graphes cycliques puisqu'on peut passer de A à B, de B à C et revenir jusqu'à A.

Ça, c'était pour la partie mathématiques, globalement la plus facile. J'espère que vous suivez encore, parce qu'on va pouvoir maintenant s'attaquer à la partie la plus intéressante, à savoir du code.

Je vous le rappelle, c'est ça notre exemple qu'on a pris depuis le début, avec notre quantité, notre prix, notre total, et à la fin une fonction qui nous permet d'afficher des choses.

Pourquoi on a fait un peu de théorie des graphes juste avant ? Parce que ça va nous permettre de visualiser un peu le dessous de ces lignes de code-là.

Si on prend par exemple nos signaux, on se dit que c'est l'endroit où il y a de la compute, où il se passe des choses, donc on peut les représenter sous forme de nœuds. Là, j'ai deux nœuds : le nœud quantity et le nœud price.

Ensuite, ma computed, on peut faire pareil, on peut la représenter sous forme d'un nœud. On peut relier quantity à total et price à total. Pourquoi ? Parce qu'on voit ici qu'ils sont dans la fonction de callback.

Ensuite, on peut faire pareil avec l'effect : on va le représenter sous forme de nœud, et on va relier total à effect. Là, on a une représentation plutôt logique des choses.

C'est-à-dire qu'on a computed qui englobe quantity et price, donc on a les deux flèches ici. Ensuite, on a l'effect qui englobe total, donc on a la flèche ici. Ça, c'est la partie logique. Mais si on change un peu notre graphe et qu'on prend plutôt une représentation de la manière dont ils vont communiquer entre eux, on peut représenter ça sous forme d'une liste doublement chaînée.

Dans cette représentation, vous avez chacun des éléments qui est relié à chacun des autres par deux flèches, ce qui nous permettra par la suite de passer de quantity à total, de total à effect, d'effect à total, puis vers price.

Globalement, ce qu'il faut retenir, ce n'est pas nécessairement que ça ressemble exactement à ça, mais que ça vous permet de vous donner une idée visuelle de ce à quoi ça pourrait ressembler. Sur la suite de ce qu'on va voir, ça peut vous aider si vous êtes plutôt du genre à visualiser pour comprendre.

Maintenant, ce qu'on va voir, c'est ces quatre API-là, qui sont en fait l'API publique d'Alien Signals, et comment, à la fin, on arrive à avoir ce fameux total qui vaut 45.

Ça, c'est les quatre fonctions de l'API publique. L'effectScope, on ne s'en occupera pas trop. Nous, on va surtout s'occuper du signal, de la computed et de l'effect.

Il y a une propriété là-dessus qui est hyper importante, c'est celle de subscriber et de dependency. C'est un point hyper important à comprendre. Vous avez la possibilité d'être soit dependency de quelque chose, soit subscriber, donc abonné à une dependency.

Un signal, c'est l'élément de base dans lequel vous allez attribuer une valeur ou récupérer la valeur qui lui a été attribuée. C'est une boîte dans laquelle vous mettez une valeur ou vous pouvez la récupérer, et ça, c'est une dependency.

Vous avez ensuite la computed, qui va être une fonction en read-only sur laquelle vous allez passer une fonction de callback, et qui va vous retourner une fonction. Computed, c'est un subscriber parce que vous pouvez lui passer, dans sa fonction de callback, des dependencies. Mais c'est aussi une dependency, parce qu'une computed peut être mise dans une autre computed.

Vous avez ensuite l'effect, qui lui est subscriber puisque vous pouvez lui mettre des signaux ou des computed, et donc il va venir s'abonner à des dependencies.

Ensuite, vous avez l'effectScope. Lui, il n'est que subscriber et va pouvoir créer une espèce de zone fermée dans laquelle vous allez éviter de faire sortir la réactivité. Mais ce serait le sujet d'une autre conférence.

Maintenant qu'on a vu ça, on va pouvoir se plonger dans le vrai code source d'Alien Signals. À partir de maintenant, tout le code que vous allez voir, c'est du code qui provient du code source d'Alien Signals. Il n'a pas été modifié, donc on va vraiment le voir en détail et le comprendre.

Ce qu'on voit là, c'est donc le signal et son implémentation. On lui passe une valeur et on a ensuite un signal getter-setter avec un .bind.

Super, mais on ne va pas comprendre grand-chose. Donc nous, ce qu'on va faire, c'est directement se plonger dans le signal getter-setter. Pour la computed et pour l'effect, on fera exactement pareil tout à l'heure, mais je vous passerai cette première partie.

Si on rentre dans SignalGetterSetter, ce qu'on voit, c'est 19 lignes, en réalité découpées en deux parties. La première, c'est de la ligne 2 à la ligne 13, puis de la ligne 13 à la ligne 18. Sur la première partie, on est en mode setter, donc on s'en occupera juste après. Sur la seconde partie, de la ligne 13 à la ligne 17, on est en mode getter, c'est-à-dire qu'on va récupérer la valeur du signal.

Ce qu'on va faire, c'est regarder s'il y a un ActiveSub. S'il y en a un, on va créer un lien, donc un objet, et on va le donner à la fois à nous-mêmes et à l'ActiveSub.

En créant un lien et en le donnant à la fois à nous-mêmes et à l'ActiveSub, on se lie doublement à l'ActiveSub. D'où la notion de liste doublement chaînée. Et puis à la fin, on retourne la valeur qui est contenue dans le signal.

Ensuite, dans la première partie, on est en mode setter. On va regarder si la valeur qu'on lui assigne est la même que celle qu'il a déjà en lui. Si elle est différente, on va récupérer le subscriber, propager quelque chose au subscriber, puis process les effects.

On process les effects dans un second temps, après la propagation, parce que si jamais votre signal est contenu plusieurs fois dans l'effect, c'est pour éviter de faire tourner plusieurs fois le même effect. C'est pour ça qu'il y a deux étapes bien séparées.

Mais il y a quand même cette étape de propagate. On ne sait pas trop ce qui s'y passe. Ce serait chouette de savoir un peu plus ce qui s'y passe, parce que ça a l'air d'être le cœur du système. Pour ça, il va falloir qu'on se penche sur les différents types de réactivité.

La première réactivité qui existe, c'est une réactivité de type push. Là, on va plutôt se mettre du point de vue de la dependency. On imagine qu'on se met dans quantity, on vient lui assigner une nouvelle valeur, et ce qu'on va faire en mode push, c'est prendre cette nouvelle valeur, aller voir tous nos subscribers et leur dire : tiens, ma nouvelle valeur.

C'est un système qui est super simple à comprendre, super facile à mettre en place, mais qui a un défaut majeur : au moment où la dependency va venir donner sa valeur au subscriber, il faut que ça se fasse de manière récursive jusqu'à ce qu'on ne puisse plus le faire. Si vous avez un immense arbre de dependencies et de subscribers, il faut tout traverser et potentiellement tout recalculer.

Du coup, il y a une deuxième manière de faire, plutôt en mode pull. Là, vous allez vous mettre du point de vue des subscribers et regarder vos dependencies. De manière régulière, vous allez les voir et leur demander : « Coucou ma petite dependency, est-ce que tu as changé ? »

Vous allez faire ça de manière suffisamment régulière pour avoir un système un peu réactif, parce qu'en réalité vous êtes clairement sur un système de polling. Donc votre finesse de réactivité dépend de votre capacité à aller voir régulièrement vos dependencies. Ça pose un problème : ce n'est pas vraiment réactif.

Ça pose aussi des problèmes de performance, parce qu'en permanence vos subscribers vont voir toutes vos dependencies.

Du coup, on s'est dit que si on ne peut pas trop faire du push parce que ce n'est pas très performant, et si on ne peut pas trop faire du pull parce que ce n'est pas vraiment réactif, on va faire les deux en même temps : du push-pull.

Dans un système push-pull, ce qu'on va faire, c'est que plutôt que de pusher la valeur, on va aller voir nos subscribers et leur lever des flags. On va leur dire : « Coucou mon subscriber, j'ai changé. Je ne te dis pas ce qui s'est passé, mais j'ai changé. »

Par exemple, au moment où on va lire total, total va se regarder et dire : « J'ai changé, il faut que j'aille récupérer les nouvelles valeurs, me recalculer, et là je vais pouvoir faire ce que j'ai à faire. »

Dans Alien Signals, on n'est pas dans un push-pull, on est dans un push-pull-push, mais ce serait l'objet d'une autre conférence.

Revenons-en à notre signal. Ici, dans propagate, ce qui va se passer, c'est simplement qu'on va aller voir nos subscribers, lever des flags et leur dire : « J'ai changé. »

Ce qui est chouette, c'est que maintenant on peut aller voir ce qui se passe dans une computed, qui est à la fois une dependency et un subscriber.

Justement, on les voit, nos flags. Quand on active la computed, elle va regarder ces flags, elle va s'introspecter. Elle va se demander : est-ce que je dois tourner parce que c'est la première fois et que je n'ai jamais tourné, ou est-ce que je suis en pending ? Est-ce qu'un de mes enfants m'a dit qu'il avait changé ?

Si jamais c'est le cas, elle va faire tourner sa fonction de callback. Ensuite, comme sur le signal, elle va regarder s'il y a un ActiveSub. S'il y en a un, elle va créer un lien, donc un objet, qu'elle va donner à la fois à l'ActiveSub et à elle-même pour être doublement chaînée.

Elle va aussi regarder s'il y a un ActiveScope. Ça, c'est pour l'effectScope. Vous pouvez ignorer cette partie. Ensuite, elle va retourner sa valeur.

Maintenant, on peut aller regarder ce qui se passe dans l'effect.

Dans l'effect, on voit un ActiveSub. On voit qu'on va sauver le subscriber précédent, mettre le nouveau, faire tourner la fonction de callback, puis remettre le subscriber précédent dans l'ActiveSub et arrêter de traquer.

L'ActiveSub, dans Alien Signals, et dans tous les systèmes de réactivité, c'est une variable globale partagée dans tout le système, dans laquelle on va venir mettre le subscriber puis faire tourner la fonction de callback. Autrement dit, tout le système de réactivité ne fonctionne que sur une chose : une variable globale.

Il n'y a donc pas de magie. Il n'y a pas d'espèce de fonction cachée dans JavaScript. Tout ne passe que par une variable globale. En fait, c'est facile.

Si on reprend notre exemple de tout à l'heure, qu'est-ce qui se passe ? On va propager les changements dans nos parents. En l'occurrence, on n'a pas de parents, donc on ne fait rien du tout. On met juste la valeur 0 dans le signal. On fait pareil pour price, on met la valeur 15 dans le signal.

Ensuite, on va dans notre computed, on va faire tourner notre fonction de callback. Ou plutôt, quand on va faire tourner tout ça, on l'a vu, s'il y a un ActiveSub, il va faire des choses. Ce que je ne vous ai pas montré, c'est qu'au moment où il regarde ces flags dans le processComputedUpdate, il va passer la computed en tant qu'ActiveSub, puisqu'on a dit qu'une computed, ça peut être un subscriber. Donc on a computed qui se met en ActiveSub.

On a ensuite quantity qui est appelé en mode getter. On l'a vu : quand un signal est appelé en mode getter, on va lier quantity à computed. Ensuite, on va appeler price en mode getter. Pareil, il y a un ActiveSub, c'est computed, donc on va lier computed à price. Normalement, vous commencez à réimaginer le graphe qu'on a dessiné tout à l'heure.

Ensuite, on a l'effect. Pareil, il se met en ActiveSub, il fait tourner sa fonction de callback. Il y a total qui est appelé en mode getter, il crée un lien, il le donne à lui-même et à l'effect, et l'effect est lié à total. Puis ensuite, fin de l'histoire.

Mais comme cet exemple est un peu trop simple, j'ai décidé de le complexifier un peu. On rajoute quantity et price ici, dans l'effect.

Ce qui nous donne ce magnifique schéma. Voilà, ça, c'est le système de réactivité.

Vous avez ici en rouge les subscribers, et en bleu les dependencies. On voit que total est à la fois en rouge et en bleu, puisque c'est à la fois une dependency et un subscriber.

Quand on fait tourner total, donc la computed, on a dedans, dans la fonction de callback, quantity qu'on fait tourner en mode getter. On crée donc un lien qu'on donne à la fois à quantity et à total. Pareil dans la fonction de callback, il y a aussi price. Quand on le fait tourner en mode getter, on regarde si c'est un ActiveSub. C'est total, donc on crée un lien qu'on donne à la fois à total et à price.

On fait pareil pour l'effect. Tout à l'heure, on n'avait que total qui s'affichait, mais on a rajouté price et quantity, donc on crée les liens pareil. Entre chaque lien, on voit qu'il y a une liste doublement chaînée pour passer de lien en lien. Il y a des moments où il n'y en a pas, parce qu'il n'y en a juste pas besoin dans la suite.

Là, vous avez le graphe du lien entre les différents éléments du système de réactivité. S'il y a un truc à retenir, c'est ça. Mais vous pourrez repasser dessus plus tard, les slides sont disponibles.

Là, on a compris comment fonctionne le système de réactivité. Mais en réalité, dans la réactivité, il y a même plusieurs problèmes. Il y en a quatre, qui sont des problèmes qui n'ont mathématiquement pas de solution.

En fait, c'est dans la résolution de ces problèmes-là, ou en tout cas dans la tentative d'apporter une solution à ces problèmes-là, que vont se différencier les différents frameworks de réactivité.

Le premier, c'est celui du glitch. Si vous avez un nœud qui est lié temporellement au temps, si vous l'exécutez en premier ou en deuxième par rapport à un autre, vous n'allez pas forcément avoir le même résultat. Là, c'est votre framework qui va trouver une solution, mais aujourd'hui il n'y a pas de solution précise qui règle ça de manière absolue.

Vous avez ensuite la partie des dépendances cycliques. Dans un graphe avec des dépendances cycliques, vous allez potentiellement tourner en rond dans votre graphe. À quel moment est-ce que vous devez vous arrêter ? Quand vous faites un tour ? Quand vous l'avez résolu ? Là encore, c'est votre framework qui a décidé d'une certaine manière de l'implémenter.

Vous avez ensuite les interactions avec des états mutables. Vous avez par exemple un tableau qui est dans l'un de vos nœuds. Vous modifiez ce tableau. Est-ce que vous reprenez le calcul du graphe ?

Puis vous avez la mise à jour dynamique du graphe. Vous avez un graphe que vous commencez à résoudre, puis à un moment donné vous rajoutez un nœud ou vous en enlevez un. Est-ce que vous recommencez le calcul ? Est-ce que vous émettez une erreur ? Là encore, ce n'est pas vous qui vous en occupez, c'est votre framework qui a choisi une manière de répondre à cette problématique. Et c'est la réponse à ces quatre problèmes-là, entre autres, qui différencie les différents frameworks.

Mais tout ça, c'est très chouette. Moi, ce que je trouve encore plus chouette, c'est qu'on est dans l'écosystème JavaScript, et il y a un truc qu'on adore faire dans l'écosystème JavaScript, c'est créer de nouveaux frameworks.

Donc on va faire un nouveau framework front-end. Et voilà : ceci est un framework front-end.

Là, vous vous dites : « Mais Estéban, tu es fou, ce n'est pas un framework front-end. » Pourquoi ? Parce qu'on a dit au tout début du talk qu'on avait un état.

On a un signal dans lequel on met une quantité de choses. On met ici un count qui vaut 0. Ensuite, dans ce count, on a le innerHTML du body qu'on va venir modifier avec la valeur du count. Et puis on enroule tout ça avec un effect. Enfin, on vient modifier l'état.

Au moment où on va venir modifier l'état ici, notre HTML va se mettre à jour puisque notre effect va tourner à nouveau. On a bien notre interface utilisateur, notre UI, qui est égale à une fonction de l'état.

Donc on a un nouveau framework front-end. Finalement, ce n'était pas très compliqué.

Et là, vous allez vous dire : « Merci Estéban pour cette jolie démonstration, mais dans la vraie vie, ça ne marche pas comme ça. » Dans la vraie vie, ça marche comme ça.

Ce n'est pas simplifié, parce que c'est exactement les trois lignes que vous voyez là. Il faut les chercher, elles sont dans Vue.js. Ces trois lignes qui sont dans Vue.js, c'est exactement les mêmes lignes que ce qu'il y avait juste avant sur la slide précédente.

On commence par démarrer un scope. On englobe, en gros, la réactivité. Ce qu'on fait ensuite, c'est créer ce qu'eux appellent un reactive effect.

Dans Vue.js, vous avez vos composants SFC. Vous avez la partie script, vous avez la partie template. Là-dedans, vous allez avoir deux choses : votre script, dans lequel il y a vos signaux, puisque dans Vue.js les refs sont apparentées à des signaux.

Au moment où vous allez avoir une ref qui se met à jour, vous allez avoir votre effect qui va se remettre à tourner une nouvelle fois. Et dans cet effect, vous avez le template à mettre à jour.

Ce qui est intéressant à noter, c'est que là on parle de component et là on parle de scope. Je vous ai dit tout à l'heure que le scope permet de créer une frontière de réactivité.

Ça veut dire que la finesse de la réactivité d'un Vue.js, elle est au niveau du composant. Donc au moment où vous changez un signal ou une ref dans le script d'un composant Vue.js, c'est tout le composant qui se fait recalculer.

Et ça, ça va être différent en fonction des frameworks. Qwik ou Solid ont une réactivité plus fine. Et dans Vue Vapor, qui arrive dans la 3.6, la réactivité ne sera plus au niveau du composant, mais au niveau des éléments du DOM. C'est ces trois lignes-là qui expliquent ça.

Si vous voulez en savoir plus sur les signaux et la réactivité, vous pouvez aller voir le code source d'Alien Signals. 200, 300 lignes de pur bonheur.

Ça ne ressemble plus trop à du JavaScript, mais si vous n'êtes pas trop fan du JavaScript, il y a des réimplémentations dans à peu près tous les langages, parce que la logique et l'arithmétique derrière Alien Signals sont langage-agnostiques. Vous avez eu des ports en Go, en PHP.

Vous pouvez aussi aller voir la vidéo « Reactivity across frameworks », qui vous expliquera les différents types de réactivité et les différentes finesses de réactivité. Et si vous n'aimez pas trop regarder des vidéos, vous avez aussi un article qui explique à peu près la même chose.

Je vous invite à rester curieux et à continuer d'apprendre. Merci à tous, c'était Estéban.

Si vous avez des questions, c'est le moment.

La question était de savoir si, dans Vue.js classique, il y a des signaux. La réponse, c'est oui. Les signaux sont dans Vue.js depuis la version 3. En réalité, ils y sont même depuis la version 2.

En fait, avec Alien Signals, on peut réimplémenter les signaux de Vue.js. Et aujourd'hui, toute l'optimisation qui a été faite dans Alien Signals est en train d'être portée dans la réactivité de Vue.js depuis la version 3.4.

Il y a une partie qui a été faite en 3.4, une autre en 3.5, une prochaine en 3.6. Tous les gains de performance se font sans aucun breaking change pour l'utilisateur final. Et en 3.6, Vue.js deviendra l'un des frameworks les plus efficaces en termes de réactivité.

Peut-être que la question était aussi : est-ce qu'il faut utiliser Alien Signals dans Vue.js ? La réponse est non, puisque vous avez déjà la réactivité de Vue.js, et en fait c'est la même chose. En comprenant ça, vous comprenez Vue.js.

Ensuite, si vous voulez l'utiliser dans React, puisque React ne fonctionne pas du tout de cette manière-là, vous pouvez utiliser Alien Signals dans React. Des espèces de bridges ont été faits pour que ça fonctionne. Il y a un portage communautaire qui a été fait d'Alien Signals vers du code React, qui marche, je pense, très bien.

La question suivante, c'était : est-ce que le portage a été fait sur d'autres langages que JavaScript ? Est-ce qu'on peut avoir le même système de réactivité sur du back ? Oui.

Est-ce que ça a un intérêt sur du back, je ne sais pas. Mais étant donné que tout tient à une variable globale et que derrière tout l'algorithme a pu être porté, vous pouvez avoir ce système-là un peu façon Excel, d'interfaces réactives ou d'éléments réactifs dans votre code, de la même manière.

Après, vous aurez sûrement d'autres problèmes. Mais oui, c'est possible, ça a été fait et ça marche très bien.

S'il n'y a pas d'autres questions, c'est super.

Le graphe ? Je ne sais pas, j'ai arrêté de compter. Non, c'est long, c'est beaucoup d'heures.

Une dernière question : est-ce que le diapo est disponible ? Oui, à la fin il y a un lien.

Toutes mes slides sont sur mon site internet, sur /talk. Elles sont toutes là. Celles-là seront mises prochainement, mais comme le lien a déjà été donné, vous pouvez retrouver les mêmes slides sur d'autres conférences.

Avec plaisir. Merci.

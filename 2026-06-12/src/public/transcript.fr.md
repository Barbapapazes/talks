---
id: 2026-06-12/devlille
---
Bonjour à tous, j'espère que vous allez bien.

Je suis très heureux d'être ici avec vous, et je suis très heureux de vous voir aussi nombreux pour parler de Vite et de ses plugins.

Avant de commencer, j'aimerais qu'on fasse une petite photo tous ensemble. Ceux qui ne veulent pas être sur la photo, je vous invite simplement à mettre vos mains sur votre visage.

Allez, tout le monde sourit. Trop bien, vous êtes magnifiques.

Petit contexte rapide sur Vite : c'est un outil simple, et il est présent partout. Prenez le nom d'un framework que vous connaissez : tant que ce nom n'est pas Next, il y a Vite dedans.

Il est utilisé par Angular, React, Vue, Nuxt, Astro, TanStack, blablabla, bref, plein d'autres.

La question intéressante, c'est : pourquoi Vite fait-il tant l'unanimité ? Eh bien parce que c'est un bundler pas comme les autres.

Peut-être que “bundler”, ça ne parle pas forcément à tout le monde, alors on va prendre le temps de le réexpliquer.

Peut-être que certains d'entre vous ont entendu parler de Webpack, le bundler historique qui, ces dix dernières années, a beaucoup rayonné sur le web. Mais on le voit là, juste là, ça commence à stagner, alors même que le web continuait de progresser.

Et ça s'explique parce qu'il n'est plus tout seul. Il y en a d'autres : Vite, Rspack, Snowpack, SWC, bref, d'autres.

Mais la question qu'on peut se poser, c'est : pourquoi Vite prend-il le dessus ? Est-ce une hype ? Est-ce une réalité ? Qu'est-ce qui se passe ? C'est ce que je vous propose de voir ensemble.

Je m'appelle Estéban Soubiran et je suis ingénieur logiciel chez Takima.

J'ai une confidence à vous faire : je suis addict au front. J'ai découvert Vite il y a quelques années, et j'ai eu envie, en 45 minutes, de vous partager tout ce que j'ai découvert depuis.

Et j'ai une deuxième confidence à vous faire : je vais vous laisser le contrôle complet du talk. Enfin, quand je dis complet, ce n'est pas tout non plus, c'est vraiment les trucs les plus importants.

Donc vous allez pouvoir choisir le thème de cette conférence. Pour ça, je vous invite simplement à scanner le QR code, à répondre à la question, à aller sur la plateforme, à interagir avec, à jouer, et vous allez voir : le thème va changer au fur et à mesure.

Mais je vous l'avais promis : c'est quoi, un bundler ?

Aujourd'hui, on a l'habitude de démarrer une application avec un exécutable. Cet exécutable est produit avec un compilateur.

Eh bien, dans le web, on a notre bundler, qui va nous permettre de produire un bundle, et ce bundle, quand on va le lancer, va nous permettre de lancer notre application dans notre navigateur web.

En fait, on peut vraiment voir notre bundler comme le compilateur, et le bundle comme l'exécutable du web.

Alors tout ça, c'est très chouette, mais ça ne nous explique pas ce qu'est Vite.

Et moi je me dis : en 2026, est-ce qu'on ne demanderait pas à l'IA ce qu'est Vite ? Allez, on va lui demander.

Donc : je suis nouveau dans le monde du développement web, qu'est-ce que Vite et comment ça fonctionne ? On lui demande, elle cherche sur Internet, elle cherche, elle réfléchit, et elle nous répond.

Alors ça, c'est peut-être chouette, mais moi je n'ai que 45 minutes et j'ai vraiment envie de vous donner un condensé. Donc, qu'est-ce que Vite ?

Vite, c'est un serveur web : requête HTTP, réponse, tout ça.

C'est aussi basé sur les modules ECMAScript, avec les imports et les exports. C'est aussi capable de transformer des fichiers à la demande, et c'est aussi extensible à l'aide de plugins.

Et avec tout ça, vous savez tout sur Vite.

Alors, c'est super, mais ce n'est pas très visuel. Moi, j'aime bien quand c'est plus visuel.

Donc on va se faire un petit schéma. D'un côté, on va mettre notre navigateur. De l'autre, on va mettre notre système de fichiers.

C'est le starter Vite Vue standard, rien d'extraordinaire là-dedans. On a ici le `main.ts`, on a juste en dessous notre `app.vue`. C'est un starter.

Au milieu, on va rapidement placer Vite. Notre navigateur va discuter avec Vite en HTTP, et Vite va pouvoir lire les fichiers sur le système de fichiers.

Nous, ce qu'on va regarder là pour un peu mieux comprendre comment fonctionne Vite, c'est qu'on va se mettre dans le navigateur et regarder un petit peu les logs HTTP.

Qu'est-ce qu'on voit ? On voit qu'on a une première requête qui est faite sur `localhost:5173`. On va venir récupérer `index.html`.

Dans cet `index.html`, on voit que dans notre fichier source on a un `main.ts`, et le navigateur reçoit un `main.js`. Ça tombe bien pour nous : on voit qu'ici on récupère un `main.js`.

On peut regarder aussi : on voit qu'on va venir récupérer un `style.css` et un `app.vue`. On les avait tout à l'heure dans notre template, tout va bien.

Donc on vient ici, on voit qu'on a notre `style.css`, on l'ouvre et… OK, on avait du CSS sur notre système de fichiers. Si on cherche un peu, on voit qu'on a notre CSS, mais ça ressemble quand même beaucoup à du JavaScript.

Ensuite, on voit qu'on charge Vue, et on a notre `app.vue`. Pareil, on peut l'ouvrir. C'était un fichier Vue sur notre disque, mais là, visiblement, c'est du JavaScript.

Ce n'est pas très grave. Pour l'instant, ça ne nous intéresse pas beaucoup. Ce qui nous intéresse, c'est qu'on a un petit peu vu ce qui s'est passé, on a vu comment Vite était lié à notre navigateur et au système de fichiers, donc on y voit déjà beaucoup plus clair.

Pourquoi Vite s'est imposé en tant que bundler ? Vite s'est imposé en tant que bundler parce qu'il est natif ESM.

Il envoie les fichiers ESM directement dans votre navigateur, sans avoir à les pré-bundler. Donc ça va éviter que votre serveur mette deux ou trois minutes, et que vous ayez le temps d'aller vous faire un café au moment où vous démarrez votre bundler.

C'est aussi les performances du serveur de développement. Avec son HMR de quelques dizaines de millisecondes, vous sauvegardez un fichier, vous n'avez pas le temps de tourner le regard que déjà votre navigateur est à jour.

C'est aussi sa capacité à transformer des fichiers à la demande qui le rend aussi puissant. C'est une configuration beaucoup plus simple que celle de Webpack, par exemple, ce qui le rend beaucoup plus facile à prendre en main.

Enfin, et surtout, c'est son alignement avec l'écosystème, puisque, étant basé sur Rollup, au moment où il est sorti, tous les plugins Rollup étaient compatibles avec Vite.

Avec tout ça, on comprend mieux comment Vite s'est imposé.

Pour la suite, on va avoir besoin de se réaligner un petit peu sur quelques définitions.

La première, c'est celle des modules ECMAScript, qu'on peut globalement définir comme étant un fichier dans lequel on utilise les imports et les exports. Par exemple, le fichier `main.ts`, c'est un module ECMAScript.

On a aussi les identifiants d'un module. Quand vous faites `import quelqueChose from`, ce qu'il y a après le `from`, c'est ce qu'on va définir comme étant l'identifiant du module. Donc ici, ça peut être `vue`, ça peut être `./app.vue`, ça peut être `virtual:mymodule`, peu importe.

Vous avez aussi les hooks. Un hook, on va le définir comme une fonction que vous allez pouvoir mettre dans votre plugin, et qui va permettre de se brancher à différentes étapes de la pipeline.

Et puis enfin, vous avez la notion de module virtuel. Là, c'est un module ECMAScript qui, simplement, n'existe pas sur votre disque.

Maintenant qu'on est alignés avec tout ça, on va pouvoir creuser un petit peu plus Vite.

Dans Vite, il y a plein de fonctionnalités. Et juste après, on va creuser l'une d'elles. Donc si vous voulez choisir laquelle on va creuser, vous pouvez scanner le QR code et faire votre choix.

Et ça, c'est une bonne nouvelle pour nous, parce que ça veut dire qu'au moment où on va vouloir créer notre propre plugin, en fait, on pourra faire tout ce qu'on veut.

Par exemple, vous avez un plugin qui gère les fichiers HTML. Vous avez un plugin qui va gérer le JSX, donc vous pouvez directement écrire des fichiers JSX : c'est built-in dans Vite.

Vous pouvez aussi gérer directement le CSS avec le HMR, les modules et les préprocesseurs : tout ça, c'est géré dans Vite. Tout ce qui est static assets, pareil, le JSON, le glob import, c'est Vite qui s'en occupe à travers des plugins qui sont dédiés.

Le dynamic import, le WebAssembly et les WebWorkers, qui sont des trucs assez pénibles à mettre en place, Vite les gère pour vous.

Et ensemble, on va aller explorer le JSX qui se charge tout seul.

Là, vous avez un fichier dans lequel on voit bien qu'on a du JSX, un fichier JavaScript relativement standard. Le truc, c'est que ça, en vrai, ça ne marche pas.

Vous mettez ça dans votre navigateur, ça ne va pas marcher. En fait, ça ne va pas marcher, sauf si vous voulez envoyer du JavaScript à votre navigateur.

Mais nous, on a écrit du JSX. Donc comment on lui renvoie du JavaScript ? Eh bien parce qu'on a Vite qui va s'occuper de ça.

Si on se met un petit peu dans l'inspecteur de notre navigateur, on peut voir ce qu'il se passe. Ici, on est dans l'inspecteur, et on a bien notre requête qui part sur `localhost` et qui va venir charger, comme tout à l'heure, le `main.ts`, enfin en l'occurrence ici un `main.jsx`, puisqu'on a écrit du JSX dans notre `main.jsx`.

On le voit : on n'a effectivement pas du tout du JSX qui est retourné, mais du JavaScript. Et ça, c'est un plugin Vite qui va s'en occuper.

Et après, vous avez pareil avec l'item JSX. Toutes les fonctionnalités que vous avez vues juste avant sont gérées de la même manière par Vite.

Donc on a commencé à voir pas mal de choses. On a vu comment Vite s'est imposé en tant que bundler, on a vu pourquoi il avait pris le devant, on a vu comment Vite fonctionnait dans les grandes lignes.

Qu'est-ce qu'on retient de tout ça ? On retient que Vite, c'est un serveur web pour le développement, qui permet de gérer des requêtes depuis le navigateur et de les transformer à la demande.

Toutes les fonctionnalités que vous avez vues juste avant sont gérées de la même manière par Vite.

On retient aussi que c'est un bundler pour la production. Il va transformer nos fichiers, et il va nous permettre de les mettre en production sur un serveur pour qu'ils soient utilisés par nos clients, avec un hash comme il faut.

Et puis c'est aussi un système de plugins qui va nous permettre de l'étendre et de lui rajouter toutes les fonctionnalités dont on a besoin.

En parlant de plugins, il serait peut-être temps qu'on fasse notre premier plugin ensemble.

Un plugin, c'est ni plus ni moins qu'une fonction qui va retourner un objet. Et dans cet objet, on va donner un petit nom à notre plugin.

Ensuite, on va jouer avec différents hooks. Le premier, c'est `resolveId`. Le second, c'est `load`. Et le troisième, c'est `transform`.

À partir de là, vous venez de faire votre premier plugin. Alors on est d'accord, il ne fait pas grand-chose.

Donc ce que je vous propose, c'est qu'on aille explorer un petit peu les différents hooks pour mieux comprendre comment tout ça fonctionne.

Le premier hook, c'est `resolveId`. C'est le plus perturbant de tous parce que ce qu'il nous permet de faire, c'est de récupérer l'identifiant d'un module et de le retourner.

Alors dit comme ça, ça paraît un peu inutile, abstrait, mais on va le voir : ça va devenir un petit peu plus clair au fil de la présentation.

Le second hook, c'est `load`. Lui, ce qu'il nous permet de faire, c'est de passer de l'identifiant d'un module à son contenu.

Là par exemple, et c'est le comportement par défaut de Vite, on va récupérer l'identifiant d'un module, donc ici `src/components/HelloWorld.vue`, et on va aller lire le fichier sur le disque.

Mais il n'y a rien qui nous empêche d'aller faire un appel à une API, par exemple, et de récupérer le contenu pour le renvoyer. Parce qu'au final, quand on vient afficher, on récupère une chaîne de caractères : on pourrait faire pareil avec un appel à une API.

Et plus encore, il n'y a rien qui nous empêche de juste renvoyer une chaîne de caractères. En fait, ces trois cas-là sont parfaitement valides dans Vite.

Et puis le dernier hook, c'est `transform`, qui lui va récupérer à la fois le code qu'on a chargé juste avant dans `load` et l'id du module, et qu'on va simplement pouvoir modifier à la volée.

Donc là, cas simple : on va remplacer `foo` par `bar`. Ou, cas un peu plus complexe, si le fichier se termine par `.vue`, on va le transformer et le renvoyer au navigateur.

On va le transformer pour faire en sorte que ce soit du JavaScript compréhensible par le navigateur.

Alors tout ça, c'est bien beau, mais là, on n'a vu qu'un seul plugin. Comment on fait si on a plusieurs plugins ? Comment ils s'orchestrent ? Comment ils s'arrangent ? Comment ils se mettent en place ?

Tout ça, c'est ce que je vous propose de voir avec cette pipeline.

Dans cette pipeline, vous avez tout en haut la requête qui provient du navigateur. Tout en bas, vous avez la réponse qui va retourner au navigateur.

Entre les deux, vous avez les différents hooks qu'on a vus : `resolveId`, `load` et `transform`. Dans Vite, on a injecté deux plugins, le Vue plugin et le custom plugin, chacun avec les trois hooks.

Ce que va faire Vite, c'est que, pour chacun des hooks, il va itérer sur chacun des plugins. Et nous, on va se placer au fur et à mesure sur chacun des hooks et regarder l'input et l'output de chacun d'eux.

Donc on a la requête sur le composant `src/app.vue`. On arrive avec cette requête, on rentre dans `resolveId`, et puis on a le Vue plugin.

Dans le Vue plugin, on a bien en input notre `app.vue`, et en sortie on va renvoyer `app.vue`. Comme on a renvoyé quelque chose, Vite va arrêter l'itération ici et il va complètement skipper le plugin suivant.

Ensuite, on continue notre route. On arrive dans `load`. On voit le Vue plugin, on l'exécute. En input, on prend bien notre `app.vue`, et en output, on va lire le système de fichiers et renvoyer le composant.

Là pareil, Vite va arrêter l'exécution, et le custom plugin va se faire complètement skipper.

Puis notre requête arrive sur `transform`. On arrive avec notre code et notre identifiant de module. On rencontre le Vue plugin, et là on a un input, donc notre code, qui va se faire transformer en JavaScript.

Et là, le custom plugin va pouvoir aussi être exécuté, sauf qu'il va prendre en input non plus le code qu'on avait récupéré avec `load`, mais le code du hook précédent, qu'il va pouvoir lui aussi transformer.

Et enfin, toute la réponse en JavaScript ici est celle qui va être renvoyée au navigateur.

Tout ça, c'est super chouette, mais c'est sur mes slides, donc ça ne va pas vous permettre, à vous, de voir ce qui se passe dans vos projets.

Heureusement, on a un super plugin qui s'appelle `vite-plugin-inspect`, qui va nous permettre de faire ça.

Le plugin `vite-plugin-inspect`, vous pouvez tous l'installer dans vos projets Vite, et ça va fonctionner sans rien avoir à faire. Ce qu'il va vous permettre de faire, c'est justement de voir toute la stack de plugins qui est appelée, pour pouvoir inspecter un petit peu les transformations qui pourraient être faites.

Si on prend par exemple un fichier CSS, le fichier `a.css`, on voit qu'au départ il n'y a rien. Puis il est chargé depuis le disque avec la fonction `load`, qui est celle par défaut de Vite, et on voit que le fichier est chargé, il apparaît ici.

Ensuite, on va avoir une transformation CSS pour passer du CSS à du JavaScript, afin que le navigateur puisse le comprendre.

Mais on peut aussi aller voir un fichier Vue, par exemple. Si on cherche Vue et qu'on récupère celui-là, on voit qu'on vient charger le fichier depuis le disque.

Ensuite, carrément, on se permet d'injecter un petit peu de code en plus. Pourquoi pas ? Puis on va venir transformer ce fichier-là en JavaScript pour que le navigateur puisse le comprendre.

Donc on a vu les différents hooks qui permettaient de se brancher sur la requête. On a vu la pipeline, et on a vu aussi comment, dans vos projets, vous pouviez être en mesure de voir toute cette pipeline.

Moi, c'est un plugin qui m'a beaucoup aidé pour comprendre Vite, mais aussi pour débugger, parce que plus on écrit de plugins, plus ça peut vite être le bordel dans les transforms.

Mais dans les plugins Vite, vous avez aussi la possibilité de vous brancher sur d'autres éléments de Vite.

Par exemple, vous avez le hook `config`, qui va vous permettre de modifier la config avant qu'elle soit résolue. Donc là, par exemple, on va plutôt changer le `root` à `src`.

Vous avez aussi le hook `configResolved`, qui va vous permettre de récupérer la config résolue. Donc, une fois que tous les plugins sont passés dessus et qu'on a récupéré la config de l'utilisateur, là vous avez la configuration finale. C'est pratique pour inspecter, notamment, le `root`, par exemple.

Vous avez ensuite le hook `buildStart`, qui va être lancé au démarrage de Vite, et le hook `buildEnd`, qui va être lancé au moment où Vite s'éteint. Ils vont vous permettre d'avoir des side effects.

Vous avez par exemple, sur `buildStart`, la capacité d'inspecter un petit peu le projet, de le scanner, de préparer le terrain, et puis, avec `buildEnd`, de générer une sitemap, par exemple.

Mais tout ça, c'est super chouette, sauf que ça ne me dit pas concrètement à quoi ça ressemble. J'ai un peu l'impression d'avoir ma boîte de Lego : tous mes Lego sont bien beaux, ils sont bien rangés, mais je n'ai rien construit. Qu'est-ce qu'on peut en faire ?

Ce que je vous propose, c'est qu'on se construise ensemble deux plugins. Le premier, c'est `SimpleTransformPlugin`, qui va nous permettre de simplement faire une petite transformation dans un fichier.

On va reprendre un petit peu notre schéma du début. On va mettre notre navigateur d'un côté, notre système de fichiers de l'autre, et Vite au milieu.

Dans le fichier `main.ts`, on va simplement avoir une variable `buildTime` qui va avoir comme valeur `buildTime`.

Notre objectif, ça va être de remplacer cette valeur-là par la vraie valeur du build time, au moment où le fichier passe par Vite.

Concrètement, si on regarde un petit peu notre HTTP, ce qu'on aimerait au final, c'est avoir la possibilité de passer de ce `buildTime`-là, donc ça c'est ce qu'il y a sur notre système de fichiers, à cette valeur-là, une date. Ça, c'est ce que le navigateur reçoit.

Et entre les deux, il y a Vite, donc tout va se jouer dans un plugin.

Pour faire ça, on se fait un petit plugin. On lui donne un petit nom, parce qu'on aime bien nommer les choses, et on l'appelle `simple-transform`.

Ensuite, on va utiliser le hook `transform`, qui va récupérer le code de tous les fichiers. En l'occurrence, on n'en a qu'un, c'est `main.ts`, donc c'est facile.

On va remplacer simplement, dans ce fichier-là, la chaîne de caractères `buildTime` par une nouvelle date. Et là, vous vous retrouvez avec votre plugin qui transforme votre code à la volée, et dans votre navigateur vous avez la bonne date.

Ça, c'était relativement simple.

Ce qu'on peut faire aussi, c'est un chargement de markdown qui serait sur un autre serveur.

Là, ce qu'on a envie de faire, c'est que si on regarde un petit peu notre `main.ts`, on voit qu'on importe un objet qu'on nomme `HTML` depuis un import qui s'appelle `dailynews.md`.

Or, ce `dailynews.md`, on le voit, il n'est pas sur notre système de fichiers. Donc il va falloir jouer un petit peu avec les plugins pour qu'il se passe quelque chose.

Si on regarde un petit peu plus les requêtes et ce qui est fait au niveau des logs HTTP, on voit qu'on charge notre `main.ts`, et dans ce `main.ts`, on a toujours notre `dailynews.md`.

Notre objectif, c'est que dans notre navigateur, derrière, on mette ce HTML-là dans notre DOM.

La petite nouveauté, c'est que du coup, notre navigateur voit un import de `dailynews.md`, donc il fait aussi un appel pour récupérer `dailynews.md`. Puisque lui, on l'a vu, en fait il se fout un peu de ce qu'il y a dedans, il se fout de l'extension : lui, il charge.

Peu importe ce qu'il voit, il charge. Et il va donc charger `dailynews.md`.

On voit bien que sur notre système de fichiers on n'a rien, et pourtant on a bien ici un bloc HTML dans une variable qu'on exporte en `default`.

Là pareil, on va avoir un plugin qui va pouvoir s'occuper de ça.

Ce plugin-là va être légèrement plus complexe. On va l'appeler `external-markdown`, et on va avoir dedans une première fonction qui s'appelle `load`.

Son objectif, c'est de passer de l'identifiant d'un module à son contenu. Ce qu'on va faire, c'est filtrer tout ce qui ne finit pas par `.md`.

Et puis ensuite, on va faire une requête HTTP vers un autre serveur en utilisant l'identifiant du module pour aller charger le contenu.

Une fois qu'on a fait ça, on peut rajouter un autre hook, qui va nous permettre de récupérer ce qu'on a chargé juste avant dans le hook `load` et de transformer le markdown en HTML.

Si on regarde bien, on a exactement ce qu'on a vu tout à l'heure dans nos logs HTTP : on a notre variable qui va contenir le rendu de ce qu'on a chargé depuis le serveur externe, et on va l'exporter en HTML. Et ça, ce sera chargé dans le DOM.

Qu'est-ce qu'on retient de tout ça ? Là, on a quand même vu différents hooks, on a vu des exemples concrets, et ça commence à faire vraiment pas mal.

Sur les plugins Vite, ce qu'on retient, c'est qu'un plugin Vite, c'est finalement une fonction qui renvoie un objet, et que cet objet-là a, a minima, un nom.

Ensuite, ce qu'on retient, c'est qu'on a trois hooks principaux qui nous permettent d'agir sur les modules et sur les requêtes : le hook `resolveId`, le hook `load` et le hook `transform`.

Et puis enfin, ce qu'on retient aussi, c'est qu'il y a des hooks qui vont nous permettre d'agir sur le cycle de Vite. Et il y en a d'autres qu'on verra dans la suite.

Maintenant qu'on a vu tout ça, ce qui va nous intéresser, c'est une partie très importante dans Vite, sur laquelle on a souvent quelques difficultés à comprendre ce qu'il se passe : celle de la virtualisation.

C'est-à-dire qu'on va pouvoir faire des plugins pour virtualiser des modules. En fait, on l'a un petit peu vu tout à l'heure, mais là, on va vraiment entrer dans les détails.

Qu'est-ce que ça veut dire ? Si on se penche un petit peu plus sur notre schéma et qu'on regarde un petit peu notre projet, on va voir notre `main.ts`, dans lequel on va importer un module qui va s'appeler `virtual:mymodule`.

Si on cherche un petit peu dans notre projet, on n'a pas de module qui s'appelle comme ça, on n'a pas non plus de dépendance qui s'appellerait avec ce nom-là, et pourtant notre projet fonctionne très bien.

Ça fonctionne très bien parce que, si on regarde les logs HTTP, on voit bien que le navigateur le charge et qu'il a une réponse. La seule différence qu'on peut voir, c'est qu'il ne charge pas exactement `virtual:mymodule` : il va charger un `@id/__x00__`, et Vite va lui renvoyer `This is a virtual module`.

Mais comment tout ça fonctionne sous le capot ? Eh bien, sous le capot, si on se penche un petit peu plus là-dedans, tout part d'un plugin.

Dans ce plugin, c'est toujours cette fonction qui renvoie un objet, dans lequel on a un petit nom, et là on va l'appeler `MyVirtualModulePlugin`.

Dans ce plugin, ce qu'on va commencer par faire, c'est lui mettre une fonction `resolveId`.

Dans cette fonction `resolveId`, on va regarder si l'identifiant qui est passé à la fonction est égal à l'identifiant qu'on cherche, à savoir `virtual:mymodule`.

Si c'est le cas, on va renvoyer l'identifiant du module en le préfixant par `\0`.

Le préfixe, c'est simplement une convention de Rollup qu'on réapplique dans Vite.

En faisant ça, et je vous l'ai dit tout à l'heure, `resolveId` est un peu bizarre, mais en fait, en faisant ça, on dit simplement à Vite : t'inquiète, c'est moi qui gère.

On lui fait comprendre que, effectivement, cet import-là n'existe nulle part, sauf dans le plugin, et que le plugin s'occupera de transmettre le code dont Vite a besoin. Sinon, Vite panique et il vous met une petite erreur.

Ensuite, on va utiliser le hook `load`, qui permet de passer de l'identifiant d'un module à son contenu.

Et si c'est le cas, on renvoie simplement une chaîne de caractères. Dans ce cas-là, une chaîne de caractères en JavaScript valide, puisque ça va directement au navigateur.

Avec tout ça, vous avez fait un plugin qui vous permet de faire des modules virtuels, puisque votre module avec `virtual:mymodule` n'existe pas. Il n'existe que dans Vite, dans vos plugins.

Mais ça, c'est un peu verbeux à écrire, c'est un peu pénible. Donc vous avez un plugin qui vous permet de simplifier ça, qui s'appelle `vite-plugin-virtual`.

C'est un plugin qui est super simple : il prend en paramètre un objet clé-valeur, dans lequel vous avez en clé l'identifiant du module, et en valeur une fonction, une valeur, un peu tout ce que vous voulez, tant que c'est du JavaScript valide.

Là par exemple, on a `virtual:git:commit`, donc ça, c'est l'import. Vous allez pouvoir importer ça depuis un fichier `main.ts`, par exemple, et ça va venir exécuter la fonction.

Et dans la fonction, on le voit, ça va exécuter un sous-process en utilisant `git` pour renvoyer le dernier commit. Donc ça, c'est très pratique si vous avez besoin, dans vos interfaces, d'afficher le dernier commit au moment du build time, par exemple.

Mais vous avez aussi la possibilité de récupérer, par exemple, des données depuis une API. Donc là, ici, par exemple, on a fait un appel à une API, on récupère le JSON et on le renvoie en JavaScript.

Les modules virtuels, c'est beaucoup utilisé dans l'écosystème. On ne s'en rend pas compte, mais par exemple Vue Router utilise cette technique-là.

Pour pouvoir générer ses routes à la volée, donc pour pouvoir faire du filesystem routing, VitePress va l'utiliser pour vous permettre d'aller charger vos données depuis un CMS alors que vous construisez un site statique.

Vous en avez d'autres comme ça. Vous n'avez pas voté. Peut-être que je me suis trompé aussi, ça m'arrive. Donc on va aller regarder celui-là.

Dans ce plugin-là, ce qu'on va pouvoir faire, c'est faire des imports depuis `~build/info`, par exemple, dans notre projet, mais avec des infos qui sont récupérées au moment du build time.

On le voit ici : ce qu'afficherait la console, c'est ce qu'il y a juste en dessous, le petit bloc de code. Donc on récupère bien le dernier commit et une date. C'est même la date d'aujourd'hui.

Et ça, comment ça fonctionne ? En fait, ce plugin-là, qui s'appelle [inaudible], fonctionne exactement comme on l'a vu tout à l'heure.

On a cette fonction qui va renvoyer un objet dans lequel on a son petit nom. On a le fameux hook `resolveId`, qui permet de voir justement si l'identifiant est un identifiant connu et géré par le plugin.

Donc en fait, ce qu'on a fait tout à l'heure, c'est utilisé dans des plugins que vous pouvez installer, et là, vous venez de comprendre comment tous ces plugins-là fonctionnent.

Si on reprend l'exemple de Vue Router, ce serait exactement la même chose. Au moment où on rencontre l'identifiant, ici dans `load`, il viendrait lire tout le système de fichiers pour générer le router.

Et si on rajoute une autre fonctionnalité à notre plugin, on retrouve ce qu'on a vu tout à l'heure avec le plugin juste avant, qui nous permet de récupérer le dernier commit en exécutant un sous-process.

Et comme c'est du JavaScript qui tourne dans Node et non dans le navigateur, vous faites vraiment ce que vous voulez. Vous avez accès à toutes les API de Node.

Donc ça, c'est vraiment super pratique.

La partie virtualisation est un peu complexe, donc on va se faire un petit récap.

Vite peut répondre à des requêtes de modules qui n'existent pas. Donc votre navigateur, quoi qu'il arrive, lui, il voit un import, il l'importe.

Vous pouvez dire à Vite ce qu'il doit répondre, et ça se passe avec deux hooks principaux : `resolveId`, pour dire à Vite “t'inquiète, c'est moi qui gère ce module-là”, et le hook `load`, qui va permettre de renvoyer du contenu.

Et puis c'est aussi utilisé par beaucoup de plugins dans l'écosystème, sans forcément qu'on en ait conscience, que ce soit pour générer du code, injecter du code, et plein d'autres choses très intéressantes, comme pouvoir faire des macros.

Si on récapitule un petit peu à quoi ça ressemble, c'est globalement ça : vous avez votre identifiant, vous le préfixez par `\0`, et vous jouez avec `resolveId` et `load`.

Maintenant qu'on s'est dit tout ça, en fait, Vite peut faire encore plus de choses.

À partir des plugins, on peut vraiment énormément customiser Vite pour répondre à tous nos besoins.

Vous avez la possibilité, par exemple, d'interagir avec le HMR. Le HMR, qui permet de recharger les modules dans votre navigateur tout en gardant le state, vous pouvez jouer avec.

Vous pouvez aussi vous brancher dans les middlewares de Vite, puisque ça reste un serveur web, pour pouvoir afficher de nouvelles pages à votre développeur, par exemple.

C'est ce que fait le plugin `vite-plugin-inspect` sur la page qu'on a vue tout à l'heure, où je cherchais le CSS ou Vue. Ça, c'est une page qui est renvoyée au navigateur en se branchant sur un middleware.

Mais ça peut aussi vous permettre de faire un mock d'API, par exemple, le temps que votre API soit prête.

Vous avez la possibilité de l'utiliser comme un command runner ou un gestionnaire de process. Au moment où vous faites un changement sur des fichiers, vous pouvez lancer des sous-process pour récupérer des informations depuis une API ou régénérer les types.

Vous pouvez faire de la communication interprocess, vous pouvez même faire des macros. Et il y a des gens qui se sont dit : en fait, Vite est tellement fort sur le front-end qu'on pourrait aller un cran plus loin, et carrément lui mettre un serveur, pour que Vite devienne full-stack.

Avec un plugin.

Et ce que je vous propose, puisqu'on se plonge dans l'un d'entre eux, c'est de regarder le HMR.

Alors regardons le HMR. Pour ça, on va se plonger dans notre inspecteur et regarder un petit peu ce qui se passe.

On a ici toutes les requêtes qui sont faites par le navigateur sur notre template. Ce qu'on voit, c'est qu'ici on va charger notre `index.html`, avec toujours notre `src/main.ts`.

Là où c'est intéressant, c'est que Vite, lui, rajoute aussi à la volée un autre import : `@vite/client`.

Ce client-là va venir charger tout ce dont le navigateur a besoin pour faire du HMR, et tout ce dont Vite a besoin pour faire du HMR.

Parce qu'on le voit ensuite : on va charger notre `main.ts` de manière assez classique, notre `app.vue`, et ainsi de suite. Et là, en revanche, on voit une connexion WebSocket qui va venir se faire.

Dans cette connexion WebSocket, on va avoir les échanges entre le navigateur et Vite.

On va avoir par exemple comme message le fait que la connexion est bien faite et réalisée. On va avoir des petits messages `ping` pour dire “t'inquiète, je suis toujours vivant”.

Et puis de temps en temps, Vite va envoyer un message au navigateur et lui dire : là, j'ai une petite update de ce fichier-là, fais un truc.

Et là, le client Vite, `@vite/client`, va récupérer ça et justement recharger ce module-là.

Ce qui est intéressant, c'est que ça, vous pouvez aussi l'intercepter vous-mêmes pour faire, justement, avec vos plugins, de nouvelles fonctionnalités. Et on le voit dans notre navigateur : on a `app.vue` qui est rechargé.

Il est rechargé avec un suffixe `?t=` et une nouvelle date, simplement pour invalider le cache, puisque Vite a un cache très fort dans le navigateur.

Et donc ce plugin, comment il fonctionne dans les grandes lignes ? Ça va tout tourner autour d'un hook qui s'appelle `handleHotUpdate`, qui va nous permettre de récupérer un contexte.

Dans ce contexte, on va notamment avoir le fichier qui a été modifié, le serveur qui est Vite, on va pouvoir récupérer des informations, et tous les modules descendants du fichier qui a été modifié, puisqu'il y a tout un système de graphe.

L'idée, c'est que l'utilisateur va venir modifier un fichier. On peut venir invalider le graphe pour que Vite aille dire au navigateur : “Ce fichier-là a été touché, s'il te plaît, recharge-le.”

Et c'est ce genre de code qu'on va écrire. Honnêtement, vous avez choisi le plugin le plus compliqué, mais ce n'est pas très grave.

Alors maintenant qu'on a vu tout ça, qu'est-ce qu'il nous reste à voir ? Eh bien pas grand-chose, en fait. On a à peu près fait le tour.

À partir de maintenant, c'est un peu votre créativité qui va pouvoir jouer.

On a vu dans le navigateur qu'on pouvait importer un `style.css`, par exemple, qu'on pouvait importer un `virtual:mymodule`, et que le navigateur allait charger des choses. On a vu aussi qu'il y avait des événements auxquels il pouvait réagir, que ce soit une requête HTTP ou un fichier qui change.

De l'autre côté, on a Vite, sur lequel on a `resolveId`, `load` et `transform`, qui sont nos hooks principaux pour pouvoir réagir à tout ça.

En fait, c'est depuis le début la même pipeline dont on parle. Que ce soit pour modifier un fichier à la demande, pour faire un plugin virtuel, ou pour ajouter des fonctionnalités, c'est toujours la même pipeline avec ses trois hooks principaux.

Et puis, on l'a vu aussi, on peut, avec nos plugins, gérer des images, du markdown, mais il y en a d'autres. Et autour de cette pipeline, il y a tout un écosystème et tout plein d'idées qui vous permettent d'étendre toutes ces fonctionnalités-là.

Donc si on récapitule tout ça, qu'est-ce qu'on garde en tête ? On peut garder en tête que, finalement, Vite, c'est une pipeline entre vos fichiers et votre navigateur, et que, pour chaque requête, vous avez la possibilité de la transformer.

Ce qu'on garde aussi en tête, c'est qu'un plugin, ça peut créer des modules qui n'existent pas. Ça, c'est dingue, mais c'est assez génial.

Donc vous pouvez générer plein de trucs à la demande, que ce soit à partir de données qui existent, de données sur un serveur distant, ou en exécutant des sous-process.

Et puis au final, tout peut être étendu par un plugin. On l'a vu avec les fonctionnalités étendues : il y a carrément des gens qui font de Vite un serveur full-stack.

Et si on récapitule à quoi ressemble un plugin, c'est donc cette fameuse fonction qui renvoie un objet avec un nom, `resolveId`, `load` et `transform`.

Et des hooks en plus, notamment `handleHotUpdate`, on l'a vu, ou `configureServer`, pour justement créer des middlewares.

Avec tout ce que vous avez vu là, vous avez globalement la capacité de créer maintenant vos premiers plugins tout seuls. Ça, c'est quand même super chouette.

Ce que je vais vous montrer là, c'est vraiment des trucs avancés. C'est sympa à connaître, et c'est chouette quand on en a besoin. On n'en a pas besoin tous les jours.

Par défaut, les plugins Vite sont exécutés dans l'ordre dans lequel ils sont enregistrés. Donc ça veut dire que là, on va d'abord exécuter le Vue plugin, ensuite le custom plugin, et enfin `another-plugin`.

La question qu'on peut se poser, c'est : peut-être que moi, j'ai envie que mon plugin s'exécute avant, après. Alors on peut le réordonner, c'est vrai.

Mais si vous avez des plugins qui viennent d'ailleurs, parce qu'un plugin peut aussi donner à Vite plusieurs plugins ? Un plugin peut retourner non pas un objet, mais un tableau d'objets.

Là, vous ne pouvez pas trop réordonner vos plugins à l'intérieur. Et même par rapport aux plugins qui sont built-in dans Vite, comment vous faites pour pouvoir réorganiser vos plugins par rapport à ça ?

En fait, il faut imaginer trois grands sacs. Vous avez un sac `pre`, un sac `post`, et le sac du milieu, qui n'a pas de nom.

Et avec la propriété `enforce`, vous allez pouvoir réorganiser un petit peu vos plugins.

Dans l'exemple, vous allez avoir d'abord le plugin `another-plugin` qui va s'exécuter en premier, parce que vous l'avez mis en `pre`. Ensuite, vous avez le Vue plugin qui va s'exécuter en second, parce que lui est dans le sac du milieu, dans lequel il n'a pas de propriété `enforce`. Et le custom plugin, lui, va être exécuté en dernier avec la propriété `enforce: 'post'`.

Et il y a un second truc qui est intéressant. Depuis que Vite en version 8 est passé sous Rolldown, vous avez du Rust qui tourne, et vous avez donc un overhead du passage de Rust à JavaScript pour exécuter les plugins.

Et on l'a vu quand on faisait du filtrage, que ce soit pour filtrer du `.vue` ou du `.md`. Globalement, ce qu'on faisait à chaque fois, c'était un `if`.

Ça se terminait par `.md`, et dans ce cas-là, on faisait juste un `return`, on n'exécutait rien. Mais ça, pour Rolldown, ça veut dire qu'il faut quand même aller exécuter le plugin JavaScript.

Du coup, vous avez maintenant une nouvelle manière d'écrire ça : c'est simplement en transformant `transform`, et tous les hooks dans lesquels vous avez besoin de faire des filtres, en objet.

Vous allez pouvoir préfiltrer en amont, et la regex va être donnée à Rolldown directement pour pouvoir filtrer ça côté Rust et éviter de revenir en JavaScript.

Et finalement, en 45 minutes, vous avez découvert tout ce qu'il vous faut pour construire vos premiers plugins Vite, et c'est quand même assez génial.

Merci à tous, c'était Estéban Soubiran. Si ça vous a plu, je vous invite à laisser un feedback.

Et si tout ça vous a paru un peu abstrait, un peu théorique, j'ai pour vous un petit cadeau avec le deuxième QR code : vous avez 45 minutes de contenu sur lequel on va pouvoir rentrer vraiment dans la pratique, 45 minutes de contenu vidéo sur lequel vous allez pouvoir créer des plugins pas à pas avec moi, et vous allez pouvoir voir un petit peu plus concrètement tout ce qu'on a vu là. Merci.

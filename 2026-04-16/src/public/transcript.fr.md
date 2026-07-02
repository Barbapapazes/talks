Bonjour à tous, j'espère que vous allez bien. Je suis très heureux que vous soyez aussi nombreux aujourd'hui.

Avant de commencer, je vous propose qu'on fasse tous ensemble une petite photo. Pour garder un petit souvenir, si jamais vous ne voulez pas être sur la photo, vous mettez vos deux mains sur votre tête.

Allez, tout le monde sourit. Trop bien, vous êtes tous trop beaux.

Aujourd'hui, on va parler de Vite. Avant ça, petit contexte rapide sur Vite : c'est un outil simple, présent partout. Prenez un framework que vous connaissez, tant que ce nom n'est pas Next, il y a Vite dedans. Il est utilisé par Angular, React, Vue, Nuxt, Astro, [inaudible], bref, plein d'autres.

La question intéressante, c'est : pourquoi Vite fait tant l'unanimité ? Parce que c'est un bundler pas comme les autres.

Alors peut-être que « bundler », ça ne parle pas forcément à tout le monde. Du coup, on va prendre le temps de l'expliquer.

Peut-être que certains d'entre vous ont entendu parler de Webpack, le bundler historique qui a dominé le paysage ces dix dernières années et qui reste encore aujourd'hui très largement utilisé. Mais, alors même que le web a continué de progresser, il n'est plus tout seul : il y a Vite, Rspack, Snowpack, SWC, bref, d'autres outils. Pourtant, on le voit, c'est Vite qui a pris le dessus.

Pourquoi ? Est-ce une hype ? Est-ce une réalité ? Que se passe-t-il ? C'est ce qu'on va essayer de savoir aujourd'hui.

Je m'appelle Estéban Soubiran et je suis ingénieur logiciel chez Takima. J'ai une petite confidence à vous faire : je suis addict au front. J'ai découvert Vite il y a quelques années et j'ai eu envie de vous partager un condensé de tout ça.

Aujourd'hui, vous allez pouvoir prendre le contrôle complet du talk. Enfin, quand je dis complet, ce n'est pas tout non plus : c'est vraiment sur les trucs les plus importants, c'est-à-dire que vous allez pouvoir choisir le thème de cette conférence.

Pour ça, vous allez juste avoir à scanner le QR code. C'est parti, vous pouvez le scanner avec votre téléphone, accéder à une interface avec différents boutons, cliquer dessus, faites-vous plaisir, et nous, pendant ce temps, on va commencer.

Je vous l'avais promis : un bundler, c'est quoi ? Aujourd'hui, on a l'habitude de démarrer nos applications avec un exécutable produit par un compilateur. Dans le web, c'est pareil.

On a un bundler qui va produire un bundle, et ce bundle, on va pouvoir l'utiliser pour démarrer nos applications web dans notre navigateur. On peut vraiment voir le bundler comme un compilateur, le bundle comme un exécutable, et finalement le bundle comme l'exécutable du web.

Trop bien, je vois que vous vous êtes tous bien connectés. Et maintenant, en plus, on sait ce qu'est un bundler.

Mais nous, ce qui nous intéresse aujourd'hui, c'est de savoir ce qu'est Vite en 2026. Est-ce qu'on ne demanderait pas à une IA : « Je suis nouveau dans le monde du développement web, qu'est-ce que Vite et comment ça fonctionne ? »

Elle recherche sur internet, elle réfléchit, puis elle réfléchit encore un petit peu et elle nous répond. Mais c'est long, super long, et moi je n'ai que 45 minutes. J'ai vraiment envie de vous transmettre un condensé.

Voici donc les trucs les plus importants à savoir sur Vite : c'est un serveur web, avec requête, réponse, HTTP. C'est basé sur les modules ECMAScript, avec l'import et l'export. Ça transforme les fichiers à la demande. C'est extensible à l'aide de plugins.

Tout ça, c'est super, mais ce serait encore mieux si on pouvait le rendre un peu plus visuel. Pour ça, on va placer à gauche un navigateur, à droite un système de fichiers — le starter Vite Vue TypeScript standard, dans lequel on a notre main.ts avec l'import d'un style et d'un composant app.vue, ainsi qu'un app.vue assez traditionnel.

Au milieu, on place rapidement Vite. Puis on fait communiquer le navigateur en HTTP avec Vite, et Vite vient lire le système de fichiers pour pouvoir renvoyer une réponse.

Pour comprendre comment tout ça fonctionne, on va se placer dans le navigateur et regarder les logs HTTP. On voit que le navigateur en fait plusieurs.

Commençons par requêter le document, donc l'index.html, dans lequel on va trouver le client Vite et le main.ts. Ensuite, il va requêter le main.ts, dans lequel on récupère notre style.css et notre app.vue.

Ensuite, on va requêter notre style.css. C'est bizarre : ce n'est pas du CSS, on dirait quand même beaucoup du JavaScript. Mais si on cherche un peu, on retrouve bien notre CSS de départ sur le système de fichiers.

Puis il récupère Vue. Ensuite, il récupère aussi notre composant app.vue. Ce n'est pas non plus un app.vue au sens brut du terme, c'est aussi du JavaScript. On démystifiera ça un peu plus tard, mais on voit qu'il a globalement chargé tout ce qu'on voulait, et on a déjà une meilleure vision de la manière dont fonctionne Vite.

Maintenant, le truc, c'est que ça ne répond pas à notre question : pourquoi Vite a pris le dessus sur Webpack ? Vite a pris le dessus parce qu'il utilise nativement l'ESM, et donc, au démarrage, il n'a pas besoin de bundler toute notre application.

Il a aussi pris le dessus parce qu'en développement, il a de bien meilleures performances que Webpack. Instantanément, votre serveur Vite démarre et vous pouvez l'utiliser. Ensuite, il y a toute cette transformation à la demande, toute cette pipeline qu'on va voir par la suite, qui lui permet justement de prendre le dessus.

Et puis il a aussi une configuration beaucoup plus simple, si vous avez déjà essayé de configurer Webpack. Ce n'est pas très marrant, et surtout Vite est aligné avec l'écosystème. Dans Vite, vous pouvez réutiliser tous les plugins Rollup.

On a déjà plein d'infos, mais il y a quand même pas mal de mots un peu techniques. Ce que je me dis, c'est qu'on pourrait les définir, comme ça on part tous sur de bonnes bases.

Le premier, c'est les modules ECMAScript. En gros, ce sont des fichiers JavaScript sur lesquels vous faites des imports et des exports, mais on les appelle des modules, pas des fichiers. Vous avez par exemple votre main.ts, votre app.vue ou votre style.css.

L'identifiant du module, c'est la string qui va identifier votre module. Quand vous faites un import from, c'est ce qu'il y a après le from. Ça, c'est l'identifiant de votre module. On a par exemple ici vue pour charger le paquet Vue.

Vous avez ensuite les hooks. Là, ce sont toutes les fonctions qui vont permettre de s'immiscer dans différentes étapes de la pipeline de Vite. Enfin, la dernière notion, c'est le module virtuel : l'idée qu'on a un module, au sens ECMAScript, qui n'existe pas sur le disque, mais qui est quand même récupéré par le navigateur.

Trop bien, on a tout ce qu'il faut. On va donc pouvoir avancer un petit peu.

J'ai un petit secret pour vous, mais comme c'est un secret, il faut absolument que ça reste entre vous et moi : toutes les fonctionnalités sont des plugins. Et ça, c'est super, parce que quand nous, on va vouloir construire un plugin, ça veut dire qu'on va pouvoir faire tout ce qu'on veut.

D'ailleurs, juste après, on va explorer l'un de ces plugins-là, et vous pouvez déjà choisir lequel en votant juste ici. Dans Vite, on retrouve différents plugins qui correspondent à ces fonctionnalités : la gestion des pages HTML, qu'il y en ait une ou plusieurs à la racine du projet.

La gestion du JSX, donc vous pouvez écrire du .jsx ou du .tsx et ce sera géré ; la gestion du CSS avec le HMR, les modules CSS ou même les preprocessors ; la gestion des assets statiques, avec notamment l'ajout d'un hash pour invalider les caches ; la gestion de l'import JSON, du glob import et du dynamic import.

Tout ça, ce sont des plugins, et c'est no-brainer, c'est directement dedans. Il y a aussi le WebAssembly et les Web Workers, que vous pouvez utiliser sans avoir à configurer quoi que ce soit.

Par la suite, ce qu'on va explorer, c'est celui-là. Il y a justement un truc dont il faut qu'on parle.

Là, on est en train d'importer une image dans un fichier JavaScript ou TypeScript, mais en vrai, ça ne marche pas normalement. Essayez d'importer une image dans un fichier JavaScript : JavaScript ne va pas être trop content. Et pourtant, dans Vite, ça fonctionne.

Ça fonctionne parce que le navigateur se fout de l'extension. Tant que vous lui renvoyez du JavaScript, il s'en fout.

Mais ça veut dire qu'on lui renvoie du JavaScript au navigateur, alors qu'on a chargé une image ? C'est un peu bizarre. Donc ce qu'on va faire, c'est aller dans l'inspecteur du navigateur et regarder ce qu'il se passe.

Dans l'inspecteur, on va récupérer le document, l'index.html, dans lequel on a bien le chargement du main.ts. Ensuite, on a le main.ts qui va être chargé, et on va y importer notre image, image.jpg.

Puis cette image.jpg, le navigateur la demande, et Vite renvoie un export default avec le chemin de notre image. Finalement, Vite a transformé la requête pour renvoyer le chemin vers l'image, et non directement l'image elle-même, et donc ça fonctionne.

Après ça, on peut l'utiliser dans notre template pour afficher l'image. Un autre truc en plus sur les images dans Vite, c'est qu'au moment du build, Vite va rajouter un hash dans les images, comme il le fait pour les fichiers, afin de pouvoir invalider les caches.

C'est ce qu'on voit juste ici. Et si on regarde un petit peu notre index.js, on voit que notre image est juste là.

Ça commence à faire pas mal de choses, donc ce que je vous propose, c'est qu'on se fasse un petit récap. Vite, c'est un serveur pour le développement qui gère les requêtes et les réponses et qui peut transformer les fichiers à la demande.

C'est aussi un bundler pour la production, capable de prendre notre code, le transformer, puis permettre qu'il soit utilisé dans les navigateurs de nos clients. Et enfin, c'est un système de plugins qui permet d'étendre toutes ses fonctionnalités et de lui faire faire tout ce qu'on veut.

Tout ça, c'est très cool. Mais qu'est-ce que ça veut dire, lui faire faire tout ce qu'on veut ? Le mieux pour le savoir, c'est qu'on construise notre premier plugin.

Un plugin, c'est une fonction qui retourne un objet, et comme on aime bien donner des petits noms aux choses, à notre plugin on lui donne aussi un petit nom. Là, on va l'appeler myPlugin.

Ensuite, vous avez trois méthodes qui vont vous permettre d'agir avec les requêtes : resolveId, load et transform. Et voilà, vous venez de faire votre premier plugin.

Bon, il ne fait pas grand-chose, il ne fait même rien en fait. Du coup, ce que je vous propose, c'est qu'on se plonge dans chacun des hooks pour comprendre ce qu'ils font.

Le premier, resolveId, c'est le plus perturbant. Ce qu'il nous permet de faire, c'est de récupérer l'identifiant d'un module et de le renvoyer, ou d'en renvoyer un nouveau. Et c'est tout.

Si ça vous paraît flou ou d'un intérêt très limité, c'est normal, c'est toujours l'effet qu'il fait la première fois. Ensuite, on a le hook load.

Ce qu'il nous permet de faire, c'est de passer de l'identifiant d'un module à son contenu. Là, par exemple, on va venir lire le système de fichiers à partir de l'identifiant fourni par Vite.

Mais en vrai, rien ne nous empêche d'aller lire un fichier ailleurs, de faire une requête à une API, ou même de renvoyer du code dans une chaîne de caractères comme si c'était un fichier, alors qu'en fait ce fichier n'existe pas. Ces trois cas-là sont parfaitement valides.

Enfin, on a le hook transform, qui va nous permettre de transformer notre code. Cas simple : on va remplacer foo par bar.

Cas un peu plus complexe : si le fichier est un fichier Vue, on va le transformer en JavaScript pour le navigateur. Très bien, on a vu notre premier plugin, on a construit ensemble notre premier plugin, on a vu les différents hooks.

Mais il reste quand même une question : comment on gère quand il y a plusieurs plugins ? Ce que je vous propose, c'est qu'on se place dans la pipeline de Vite et qu'on regarde ça ensemble.

Vous avez la pipeline de Vite dans laquelle on a deux plugins, Vue Plugin et Custom Plugin. Vous avez les différents hooks, resolveId, load et transform. En haut, vous avez la requête qui arrive, et en bas, vous avez la réponse qui ressort.

Le système va itérer sur chacun des plugins, et nous, on va regarder l'input et l'output de chacun d'entre eux. Donc on a une requête pour app.vue.

On entre dans resolveId, on rencontre Vue Plugin, on a en input app.vue, et on décide que Vue Plugin va aussi renvoyer app.vue. Le système skip alors les autres plugins de resolveId.

Ensuite, on continue notre route, on rencontre load, puis Vue Plugin. En input, on a l'id de tout à l'heure, donc app.vue, et là, on va lire le système de fichiers et charger le fichier Vue associé.

Là pareil, le système skip complètement les autres plugins, et donc Custom Plugin, mon pauvre, tu n'es encore pas appelé. Ensuite, on continue d'avancer, on rentre dans transform, et on a Vue Plugin qui est appelé.

Il reçoit en entrée le code qu'on a chargé juste avant depuis le système de fichiers, et il va venir le transformer pour que ce soit lisible par le navigateur. Là, en revanche, Custom Plugin se fait appeler avec l'output du plugin d'avant, et il peut lui-même le modifier, changer des choses s'il en a envie, puis derrière ça part pour le navigateur.

Trop bien, on a compris beaucoup de choses. Ce qui serait hyper chouette aussi, c'est que là, finalement, tout ça, c'est juste dans mes slides, mais vous pourriez vous aussi voir ce qui se passe dans vos pipelines Vite : quels plugins sont appelés, dans quel sens, et quelles transformations ils font.

Ça tombe bien, on a un super plugin qui s'appelle vite-plugin-inspect et qui vous permet de faire ça. Si on cherche un petit module CSS, on a ici toute la stack des plugins.

On voit qu'on passe de rien à charger le fichier depuis le système de fichiers, puis ensuite on a le plugin CSS qui va le transformer en JavaScript pour le navigateur. Et ça, on peut aussi le faire pour un petit fichier Vue.

On va le charger depuis le disque, puis on va venir le transformer pour que ce soit compréhensible par le navigateur. Trop chouette. Et ça, vous pouvez l'installer dans tous vos projets Vite pour découvrir un peu ce qui se passe en coulisses et quelles modifications peuvent être faites.

Mais là, notre plugin a surtout agi sur les requêtes : il les a modifiées à la volée, il les a résolues, il les a chargées. Mais est-ce qu'on peut faire d'autres trucs avec un plugin Vite ?

Avec un plugin Vite, on peut se brancher dans tout le cycle de Vite. Ça veut dire qu'on a par exemple accès au hook config, qui va nous permettre de récupérer et de modifier la config. Ici, on va assigner src à root.

Ensuite, vous avez aussi le hook configResolved, qui permet de récupérer la configuration, de la stocker, puis de la réutiliser ailleurs dans votre plugin. Vous avez aussi les hooks buildStart et buildEnd, qui sont respectivement appelés au démarrage de Vite et à la fin du build.

Le premier va permettre de préparer le terrain, et le second, par exemple, de générer une sitemap. Mais bon, on a vu Vite, on a vu comment construire un plugin, on a vu les différents hooks, on a vu comment s'intégrer dans le cycle de vie.

Moi, là, j'ai un peu l'impression d'être devant mes Lego : j'ai toutes mes pièces, elles sont bien rangées, mais je ne sais pas trop ce qu'on peut faire avec tout ça. Donc il serait peut-être temps de se construire des petits trucs un peu concrets.

Ce que je vous propose, c'est qu'on se construise deux petits plugins ensemble. Le premier, ça va être Simple Transform Plugin, qui va nous permettre de faire une transformation assez simple à l'aide d'un plugin Vite.

Pour ça, on va visualiser un petit peu tout ce qui va se passer. Là, on a notre navigateur à gauche, Vite au milieu, et notre système de fichiers. Ce qui nous intéresse, c'est le main.ts.

On a une variable, une constante, et ce qui va nous intéresser, c'est de remplacer cette chaîne de caractères-là par la date à laquelle le système a build notre projet.

Pour ça, on va aller dans le navigateur et regarder l'output attendu. On a nos différentes requêtes avec notre index.html qui va venir récupérer le main.ts, puis enfin notre main.ts. On le voit sur notre système de fichiers, on a bien le build time, mais en revanche, dans le navigateur, on reçoit bien une nouvelle date.

Ce qui nous intéresse, c'est donc de construire un plugin qui nous permette de passer de ce qu'on a à droite à ce qu'on a à gauche.

On fait donc un plugin. Un plugin, on l'a dit, c'est une fonction qui renvoie un objet avec un petit nom.

Ensuite, on va utiliser le hook transform, qui va nous permettre de faire cette modification. On va simplement récupérer le code, puis remplacer notre string par la date.

Et là, on se retrouve avec ce qu'on a vu juste avant : on a la date inscrite dans notre fichier. Facile.

Deuxième plugin : notre deuxième plugin va nous permettre de charger du Markdown depuis une API et de le transformer en HTML pour qu'on puisse l'injecter dans une page.

Pareil, on va visualiser un petit peu ce que ça donne. Ici, dans notre main.ts, on voit qu'on charge depuis un module qui s'appelle dailynews.md.

Ce dailynews n'existe pas dans notre système de fichiers. C'est un peu bizarre, mais si on regarde les logs du navigateur, on a une requête sur dailynews.md.

Et si on regarde dans notre main.ts, on voit que notre dailyNews est bien présent. Dedans, on a un JavaScript valide, dans lequel on a de l'HTML exporté, qu'on va pouvoir utiliser derrière.

Très bien. Nous, ce qu'on veut, c'est un plugin qui nous permette de faire ça. Pour ça, pareil, c'est une fonction qui retourne un objet. On lui donne un petit nom, et on l'appelle externalMarkdown.

Ensuite, on va utiliser des hooks. Au moment où il voit qu'on a un fichier qui finit par .md, il va faire un appel à une API, récupérer le texte, puis le renvoyer.

Tout à l'heure, on lisait le système de fichiers. Là, on vient lire une API. Ensuite, on va utiliser le hook transform, qui va nous permettre, avec Markdown It, de rendre ce code-là en HTML.

Du coup, quand le navigateur vient charger notre dailynews.md, on se retrouve avec ce contenu-là. C'est celui qu'on a vu tout à l'heure dans la visualisation.

Trop chouette. Voilà, on est des petits experts des plugins Vite maintenant.

On va se faire un petit récap parce que, depuis le début, on a vu beaucoup de choses. On a vu ce qu'était Vite, on a vu un petit peu sa pipeline, on a vu comment construire un plugin, et on s'est même construit nos premiers plugins ensemble.

Les trois points à retenir sur les plugins Vite, c'est qu'un plugin Vite, c'est finalement une fonction qui retourne un objet, avec un petit nom. Il y a trois hooks principaux : resolveId, load et transform.

On a aussi des hooks qui nous permettent de nous brancher dans le cycle de vie de Vite. Et concrètement, en termes de code, ça ressemble à ça : notre fonction, son petit nom et nos différents hooks.

Maintenant, depuis le début, je vous parle du fait qu'on peut retourner du code pour des trucs qui n'existent pas, des modules qui n'existent pas sur le système de fichiers. Ça, ça s'appelle la virtualisation, ou les modules virtuels, et c'est un concept hyper important dans Vite, utilisé dans énormément de modules.

Ce que je vous propose, c'est qu'on voie ça ensemble. Pour ça, on va commencer par visualiser ce qu'on veut.

On est toujours avec notre navigateur, Vite et le système de fichiers. On a notre main.ts dans lequel on va charger un virtual:my-plugin.

Ce qui est intéressant à remarquer, c'est qu'on n'a pas de fichier qui s'appelle virtual:my-plugin. Et si on regarde le package.json, il n'y a pas non plus de dépendance qui s'appelle virtual-my-plugin.

C'est quand même un peu chelou, et pourtant ça marche. Si on se place dans le navigateur et qu'on regarde les requêtes, on voit que, dans notre main.ts, il est préfixé par /@id/__x00__.

Puis ensuite, on a notre virtual:my-plugin, sur lequel on n'a rien dans le système de fichiers, mais qui nous renvoie pourtant bien une string avec un fichier JavaScript valide.

Ça, c'est hyper bizarre. Est-ce qu'il n'y aurait pas un plugin Vite qui permettrait de faire ça ? C'est effectivement un plugin Vite, et on va le créer ensemble.

Pour qu'on comprenne bien comment tout fonctionne, on reprend notre fonction qui retourne un objet avec un petit nom. Dans le hook resolveId, on va regarder si l'id vaut le moduleId qu'on recherche.

On va simplement le préfixer par \0. Ça, c'est une convention dans Vite et dans Rollup.

Ensuite, on va utiliser le hook load. Si moduleId vaut bien celui qu'on cherche, donc celui qui est préfixé par \0, on va simplement renvoyer une string.

Et là, vous venez de créer votre premier module virtuel. C'est pas mal, non ?

C'est pas mal, mais c'est un peu verbeux. À chaque fois qu'il faut faire un module virtuel, c'est quand même assez long. Donc il y a un super plugin qui s'appelle vite-plugin-virtual et qui nous permet exactement de faire ça.

Son utilisation est super simple. En fait, c'est un dictionnaire clé-valeur dans lequel, en clé, vous avez tout simplement le moduleId, et en valeur, vous avez une string ou une fonction qui vous permet de retourner un peu ce que vous voulez.

Comme ça peut être une fonction, vous avez beaucoup de possibilités. Ici, par exemple, on va exécuter un petit process et renvoyer le dernier commit.

Mais on pourrait aussi, avec virtual API data, faire carrément un appel à une API et renvoyer toutes les données, pour avoir des données statiques dans notre build et ne pas avoir à refaire un appel à l'API côté client.

Franchement, c'est pas mal. Pour la suite, on va pouvoir en construire un nous-mêmes, et visiblement, vous avez choisi VitePress.

Explorons VitePress. VitePress est un outil basé sur Vite qui permet de générer des sites statiques.

L'une des fonctionnalités intéressantes, c'est celle des fichiers .data.js, qui vont permettre, dans une fonction load, d'aller charger de la donnée, potentiellement depuis un CMS, pour que votre site VitePress reste statique quand vous l'envoyez chez le client, tout en mettant à jour ces données à chaque build.

Et c'est ce qu'on voit ici dans notre composant Vue : on vient récupérer les data. En fait, tout ça fonctionne avec un plugin virtuel, et on va le recréer nous-mêmes.

Donc tout commence par un petit objet avec un petit nom, vous avez l'habitude. Ensuite, on va avoir le hook resolveId, qui va regarder si le fichier termine par .data.js, et si c'est le cas, il va tout simplement le préfixer par \0.

Puis on va utiliser le hook load. On va venir exécuter la fonction load. Potentiellement, dans cette fonction, on fait un appel à une API, à un CMS, à ce que vous voulez ; on peut même imaginer exécuter des sous-process, build un autre projet. On a vraiment le choix, on est en JavaScript, on est plutôt libre.

Derrière, on va renvoyer toutes ces données dans un nouveau fichier. Et c'est ce qui vous permet, comme on l'a vu tout à l'heure, de venir charger toutes les données, de les récupérer et de les utiliser, avec des données statiques dans votre site une fois buildé.

Ça fait beaucoup, beaucoup, et j'ai très soif.

Depuis le début, on a vu ce qu'était Vite, un petit peu sa pipeline, comment fonctionnaient les plugins Vite, les différents hooks de Vite, les plugins virtuels avec des modules virtuels, et on a même vu un exemple concret.

Qu'est-ce qu'on retient de tout ça sur la virtualisation ? Que Vite peut répondre à des requêtes avec des modules virtuels, c'est-à-dire avec des modules qui n'existent pas sur le disque. Et ça, c'est hyper pratique, parce que ça permet de générer des données à la volée quand on en a besoin.

Dans les exemples, on avait vu Vue Router, qui peut générer tout le fichier de définition de vos routes. Pour créer un module virtuel, vous allez utiliser les hooks resolveId et load.

Load vous permet de retourner du code, quelle qu'en soit la provenance. Et enfin, vous pouvez utiliser tout ça de manière très puissante, puisque vous pouvez générer plein de données, générer du code à la volée, aller chercher des API externes. En fait, vous faites tout ce que vous voulez, puisque vous avez toute la main sur le système.

Maintenant, la question qui se pose, c'est que Vite peut faire encore plus. On a vu des trucs très cool, mais je vous l'ai dit au début : avec un plugin Vite, on peut faire tout ce qu'on veut.

On peut par exemple se brancher dans le HMR, le Hot Module Replacement, qui nous permet de recharger certains modules, ou même les fichiers de style, en préservant l'état de l'application.

On peut aussi, puisque Vite est un serveur web, se brancher directement dedans et créer des middlewares custom. Ça peut nous permettre d'afficher de nouvelles pages en développement, ou de faire de fausses API.

On peut aussi avoir un command runner. Au moment où vous faites des choses dans Vite, vous pouvez exécuter des commandes en parallèle pour automatiser des tâches.

Vous êtes par exemple dans votre projet Vite côté front-end, vous voulez automatiser l'extraction des types d'API depuis votre backend : vous mettez ça dans le command runner, et comme ça, vous pouvez le faire automatiquement sans risquer de l'oublier.

Vous pouvez aussi faire de la communication inter-process. Si vous avez un process en PHP et un autre en Node.js, vous pouvez faire communiquer les deux à travers des fichiers.

Il y a aussi tout un système de macros que des gens ont construit, qui vous permet de remplacer du code au moment du build time, comme on peut le faire en C. Et puis, surtout, il y a des gens qui se sont dit : Vite, c'est quand même super chouette, c'est très fort, mais bon, ça ne fait que du front-end. Qu'est-ce qui se passe si on lui met carrément un petit serveur dedans et qu'on s'en sert pour faire un framework full stack ?

Tout ça, on va explorer l'une de ces fonctionnalités ensemble. Et visiblement, vous voulez qu'on explore le HMR, donc allons-y.

Dans le HMR de Vite, ce qu'on va commencer par faire, c'est regarder comment ça se passe dans l'inspecteur du navigateur. On a nos différentes requêtes qui partent, on récupère l'index.html, dans lequel on a notre client Vite.

Ce client Vite, c'est Vite qui l'injecte, et il est juste ici. Ce client va permettre à l'application de créer une connexion WebSocket, qu'on voit juste ici, entre le serveur web qui est sur votre machine et la page qui est dans votre navigateur.

Les deux vont pouvoir s'échanger des messages dans les deux sens. On peut le voir ici : ils se font un petit ping-pong ensemble.

Et puis, Vite, le serveur de développement, va pouvoir envoyer des messages au navigateur en lui disant : « Mon petit gars, il y a le /src/app.vue qui a changé. » Il faudrait que tu le mettes à jour.

Le client Vite reçoit ça, et on le voit juste ici : il y a une nouvelle requête qui part pour récupérer la nouvelle version du composant app.vue. Donc ça, c'est le HMR. Quand vous modifiez vos fichiers, ça va directement refléter le changement dans votre navigateur.

Ce qui est cool avec les plugins Vite, c'est qu'on peut leur faire faire tout ce qu'on veut et qu'on peut se brancher là-dedans. On peut se brancher dans le HMR avec le hook handleHotUpdate.

Ce que ce hook va faire, c'est récupérer les fichiers modifiés. Là, par exemple, si on voit que le fichier qui a été modifié, c'est myext, donc ça pourrait être un fichier .ts, on peut le récupérer puis l'invalider dans le graph.

Et dans ce cas-là, c'est à ce moment qu'on a des messages WebSocket qui repartent. Mais en fait, rien ne nous interdit, dans ce hook-là, de dire : à partir du moment où ce fichier est modifié, je fais tourner un sous-process, par exemple. On peut automatiser des choses de cette manière-là.

Depuis le début, ce qu'on a vu, c'est que dans le navigateur, on pouvait faire un import de style.css, un import de modules virtuels, voir les fichiers qui changent, réagir au moment où des requêtes HTTP arrivent. En fait, tout ça, depuis le début, c'est la même pipeline.

Tout passe par la même chose, et tout passe par Vite avec son resolveId, son load et son transform. Ce qu'on a vu aussi, c'est qu'on a des plugins built-in dans Vite, comme ceux sur le CSS ou le JSX, mais aussi d'autres qu'on peut construire nous-mêmes.

On en a aussi pour les routes, pour les icônes, pour récupérer des informations de build si vous voulez le dernier commit, par exemple. Et vous avez la possibilité de jouer tout autour de cette pipeline avec le HMR, avec tout le cycle de vie de Vite, avec les différents hooks, carrément les middlewares, et ainsi de suite.

Finalement, qu'est-ce qu'on retient de tout ça ? On retient que Vite, c'est une pipeline entre votre système de fichiers et votre navigateur. Il modifie les fichiers à la demande et les transforme comme vous le voulez.

On sait aussi que vous pouvez créer des plugins qui permettent de créer des modules qui n'existent pas, et ça, c'est hyper fort. Ça permet de faire tout un tas de choses, comme on l'a vu tout à l'heure pour récupérer des données depuis une API.

Et enfin, tout dans Vite peut être étendu par un plugin. Donc si vous ne trouvez pas votre bonheur dans Vite, faites un plugin, et normalement, vous aurez votre bonheur.

En termes de code, un plugin, c'est ça : on a une fonction qui retourne un objet avec son petit nom, les trois principaux hooks pour transformer les modules, resolveId, load et transform, et puis plein d'autres pour agir dans le cycle de vie de Vite.

Le handleHotUpdate, on l'a vu. Le configureServer, par exemple, nous permettrait de nous brancher dans le serveur web de Vite et de créer tout simplement des middlewares.

Avec tout ça, vous avez tout ce qu'il vous faut pour créer vos propres plugins. Mais si vous voulez aller un peu plus loin, j'ai deux petits bonus pour vous.

Le premier bonus, c'est que dans Vite, l'ordre d'enregistrement des plugins est hyper important, puisque c'est dans cet ordre-là que Vite va les exécuter. Ici, Vite va exécuter Vue Plugin, puis Custom Plugin, puis Another Plugin.

Vous avez dans vos plugins une propriété enforce qui vous permet de choisir à quel moment ils vont être exécutés. Dans ce cas-là, par exemple, vous avez Another Plugin en première exécution parce que vous avez enforce mis en pre, puis Vue Plugin, puis celui en post, donc Custom Plugin. Vous pouvez donc changer l'ordre d'exécution de vos plugins.

Deuxième truc et astuce : quand vous avez des hooks, ils vont être exécutés à chaque fois, et votre manière de filtrer les modules que vous ne voulez pas récupérer, c'est souvent avec un petit conditionnel qui regarde si ce n'est pas un fichier.

Ça pose un problème parce qu'à chaque fois que votre plugin est exécuté, cette fonction-là l'est aussi. Maintenant, avec Rolldown, vous avez un overhead du passage de Rust vers Node.js. Ce qu'ils ont fait, c'est un petit filtre qui vous permet d'éviter d'exécuter votre fonction en JavaScript, et donc d'éviter cet overhead.

En 45 minutes, vous avez finalement découvert tout ce qu'il vous faut pour comprendre ce qu'est Vite, comprendre ce qu'est la pipeline de Vite, comprendre comment tout ça fonctionne, comprendre comment construire vos premiers plugins, et avec quels hooks leur permettre de faire quoi.

Maintenant, vous avez toutes les clés pour les faire vous-mêmes. Bravo.

Merci à tous, c'était Estéban Soubiran. Je serai très ravi de pouvoir lire vos feedbacks, et sinon, on se retrouve sur internet.

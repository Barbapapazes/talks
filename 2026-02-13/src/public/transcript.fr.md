---
id: 2026-02-13/touraine-tech
---
Je vais vous présenter un sujet qui me tient beaucoup à cœur. On n’y accorde pas souvent beaucoup de temps ni beaucoup d’importance, et c’est celui des paquets en JavaScript.

Avant d’aller plus loin, je vous invite à scanner le QR code qui est juste là. Il va vous amener sur une page sur laquelle vous allez pouvoir retrouver l’ensemble de mes réseaux, répondre à des questions — pour l’instant, ne le faites pas, on le fera au fur et à mesure —, retrouver le lien pour me laisser un feedback, ce que je vous conseille plutôt de faire à la fin si vous voulez être objectif, et puis, à tout moment, réagir à ce que je dis si vous aimez, si vous êtes d’accord ou si simplement vous trouvez ça drôle.

Ça fonctionne. J’aime bien commencer cette présentation par ce diagramme, ce schéma.

Ce qu’on voit, c’est le nombre de téléchargements par mois du package is-string. Là, c’était 2024, et on voit qu’il atteint à peu près 160 millions de téléchargements par mois, avec une courbe globalement croissante.

Alors vous allez me dire : super, 160 millions de téléchargements, c’est cool, mais est-ce que c’est beaucoup ou pas beaucoup ? En vrai, on n’en sait rien, donc je vous ai mis React en comparaison.

React, au maximum du pic, ici, est à 140 millions. Et globalement, on voit qu’on est en dessous, entre 20 et 40 millions.

Je vous ai mis Tailwind aussi, pour avoir un autre point de comparaison. Du coup, moi, je me pose la question : est-ce que vous, vous avez déjà téléchargé is-string ?

Parce qu’en fait, je suis à peu près sûr que personne ici dans la salle n’a installé is-string. Et ça, c’est un problème, parce que visiblement is-string est hyper téléchargé.

Quand on installe des packages comme is-string, en réalité, on va installer le code source qui nous intéresse, mais aussi potentiellement de la documentation, des tests, des fichiers sources et des choses qui ne nous intéressent pas nécessairement. Et il y a un truc qu’on ne veut pas, c’est que nos node_modules deviennent la chose la plus lourde dans l’univers.

Nous, ça, on n’a pas envie, déjà parce que notre machine n’a pas une place illimitée, et puis parce qu’à chaque fois qu’on fait un npm install, par exemple, on ne veut pas que ça dure 5 minutes, 10 minutes ou des heures entières. Donc ça, nous, on ne le veut pas.

Ce qu’on va voir pendant les 10 prochaines minutes, c’est justement plein d’outils qui vont vous permettre de mieux comprendre ce qui se passe dans vos node_modules. Je me présente : je suis Estéban Soubiran, je suis ingénieur chez Takima.

Dans mon temps libre, je gravite principalement autour des écosystèmes de Laravel, Vite, Vue et Nuxt, et quand il me reste du temps, j’écris des articles. Sinon, vous pouvez me retrouver à peu près partout, principalement sur mon site, et de temps en temps sur Twitch quand j’ai le temps.

Ce qu’on va essayer de voir ensemble, c’est comment démystifier ce qu’il y a dans nos node_modules, comment mieux les comprendre et comment savoir si, justement, il y a des packages qu’on a besoin, ou pas, d’installer. Pour passer sur une flopée d’outils, le premier, c’est Node Modules Inspector.

Node Modules Inspector, c’est à la fois un package et un site web. Vous pouvez l’utiliser en local ou en ligne, et il va automatiquement analyser ce qui se passe quand vous installez un package, donc nous, on va essayer avec is-string.

Ce qui va se passer, c’est que vous allez avoir un WebContainer qui va se lancer. Le paquet va être installé exactement comme si c’était en local, sauf que ça tourne dans votre navigateur, et derrière, il y a plein d’analyses qui vont être faites pour avoir une meilleure vue de ce qu’on a dans le paquet.

On va pouvoir lister, par exemple, quels sont les fichiers qui vont être installés au moment où vous installez le package is-string. C’est peut-être parce que le Wi-Fi est un peu lent, mais on va avoir le listing de l’ensemble des fichiers qui vont venir.

On va voir notamment une métrique intéressante, c’est celle du nombre de packages qui sont installés. Quand on installe is-string, vous avez ici 15 packages qui sont installés.

Ensuite, vous avez aussi 254 kilos de trucs installés au moment où vous installez is-string. Et dans le rapport, vous avez en gros les 15 paquets qui sont installés.

Nous, ce qui nous intéresse quand on installe un package JavaScript, c’est plutôt le JavaScript. C’est ce qui est en jaune ici, et on voit que, quand on installe is-string, globalement, on a de la doc, des tests, de gros JSON et un petit peu de JavaScript.

En gros, c’est entre 10 et 20 %. Donc ça veut dire que, sur les 250 kilos, en réalité, vous n’avez que 10 à 20 % de code qui vous intéresse réellement.

Il y a plein de fonctionnalités là-dedans, mais je vous laisserai découvrir tout ça de votre côté. Autour de cette problématique d’installation des packages, il y a un écosystème qui s’est créé, qui s’appelle Ecosystem Performance, et qui a 3 grands objectifs : nettoyer l’écosystème JavaScript, le faire monter en niveau et l’accélérer.

Pour ça, ils ont différentes initiatives. La plus connue, c’est celle où ils vont voir des paquets, des mainteneurs, et faire des pull requests pour leur dire : « plutôt que d’utiliser ça, tu devrais utiliser ça ».

Tout ça est traqué dans un repo dans lequel il y a des issues qui permettent de tout lister et de tout suivre. Ils l’ont fait, par exemple, avec Storybook, et on ira voir à la fin un exemple de comment les dépendances de Storybook ont évolué.

Quand ce n’est pas possible parce que le mainteneur ne maintient plus le projet, ou qu’il y a une possibilité de faire mieux avec les nouvelles API, ils vont carrément forker le projet, ou carrément le réécrire entièrement dans une version beaucoup plus moderne. Et enfin, il y a une dernière chose qu’ils font : ils mettent à disposition du tooling, que ce soit des règles ESLint.

Après différentes initiatives, ils ont proposé du tooling pour permettre à vous, développeurs, de faire un rapprochement entre des choses à ne plus utiliser, que ce soit des API natives ou des paquets sur NPM, et des nouvelles API qui seraient sorties ou des nouveaux paquets qui auraient été réécrits. Ils ont donc une grande base de données qui fait le lien entre des trucs à ne plus utiliser et des trucs à préférer.

L’un des outils que j’utilise le plus, jusqu’à ce que Node Modules Inspector sorte, c’est Package Size, qui va nous permettre de faire à peu près comme Node Modules Inspector, c’est-à-dire installer le package via un WebContainer et faire toute l’analyse. C’est très pratique : vous installez un paquet, vous ne voulez pas trop vous prendre la tête, vous voulez savoir ce qu’il y a dedans, vous allez sur Package Size, vous l’installez et vous avez tout de suite l’info.

Là, on retombe avec nos 270 kilos et nos 15 packages. Donc là, on se dit qu’il y a un petit red flag : est-ce que vraiment on veut l’installer ? Ce n’est pas sûr.

C’est, je dirais, la précédente version de Node Modules Inspector. Le site d’après, c’est Deptri.

Lui, c’est un tooling un peu différent, parce qu’il se base justement sur cette fameuse base de données entre les trucs à ne plus utiliser et les trucs à utiliser. En installant is-string, ou en uploadant carrément votre package.json, il va aller télécharger toutes les sous-dépendances et faire le lien entre cette base de données et les sous-dépendances pour vous dire : attention, ce truc-là a un remplacement natif, donc tu n’as pas forcément besoin de l’installer, ou alors c’est une micro-utility, donc tu pourrais toi-même écrire le code, ou juste ne pas l’installer parce qu’il y aurait d’autres remplacements.

Par exemple, pour is-string, vous pourriez faire un typeof de votre objet égal à une string. Mais vous en avez d’autres, parce que is-string, on sait ce que ça fait, c’est écrit dans le nom.

Vous avez par exemple isError, qui peut être remplacé par des choses plutôt natives comme Error, evalError ou d’autres, ou function-bind, dont on ne se dit pas tout de suite : « ce truc-là, on peut le remplacer ». Là, vous pouvez avoir l’info sur tout ce qu’on pourrait remplacer.

Donc ça, c’est pratique, et en plus de ça, vous pouvez uploader votre package.json. Toute la base de données utilisée là est aussi disponible via une règle ESLint.

Vous pouvez mettre une règle ESLint dans ESLint, et automatiquement, quand vous installez un package, ESLint peut vous crier à la tête : là, ce que tu installes, en réalité, tu pourrais l’installer mieux. Et puis enfin, le dernier que j’aime bien regarder aussi, c’est npmgraph, qui va me permettre de visualiser le graphe de dépendances et de sous-dépendances d’un projet sur NPM.

Et là, plutôt que d’utiliser is-string, ce qu’on va faire, c’est partir sur Storybook en version 8.2. Pourquoi Storybook ? Parce qu’à partir de la version 8.2, ils se sont dit : « on a quand même un sacré problème », et vous allez le voir.

On a peut-être trop de dépendances. De là à là, ce ne sont que des dépendances.

Si on le met sous ce format-là, ça donne un truc comme ça : à peu près 400 dépendances. Storybook s’est dit qu’il y avait un problème à plusieurs niveaux : le premier, c’est qu’il y a trop de dépendances, donc si on a un mainteneur qui nous lâche sur l’une de ces sous-dépendances, on est cuits.

Ensuite, c’est autant de possibilités de se faire hacker via des attaques par supply chain. C’est aussi une problématique pour vous, en tant qu’utilisateur de Storybook, parce qu’à chaque fois que vous installez Storybook, vous installez tout ça.

Ça veut dire beaucoup de requêtes qui partent, ça veut dire que ça prend du temps. Ça, c’est sur la partie installation, mais quand vous démarrez Storybook, il faut aussi aller lire tous les fichiers de toutes ces dépendances-là, donc c’est aussi un Storybook qui va prendre du temps à démarrer.

Storybook s’est dit que là, ce n’était pas possible, qu’il y avait vraiment un problème pour eux et pour les développeurs qui les utilisent. Donc ils ont collaboré avec Ecosystem Performance, avec E18E, et ils se sont dit : comment on fait pour améliorer la situation ?

Ça leur a pris des mois et des mois, et ils ont sorti un blog post sur tout ce qui s’est passé. En version 8.4, il y a eu une grosse évolution, mais je vais vous montrer directement la version 10, sur laquelle il y a eu, au fur et à mesure, encore d’autres évolutions.

Aujourd’hui, on en est là : une vingtaine, je crois, de dépendances, avec toujours les mêmes fonctionnalités. Donc ça veut dire que, pour vous, c’est moins d’installation, un package plus petit, un temps de chargement plus rapide, et pour eux, une maintenance largement simplifiée.

Je vous invite à tester avec différents packages que vous pouvez connaître, c’est hyper intéressant à voir. Et puis, si vous voulez en savoir plus, je vous invite à aller directement sur le site de E18E.

Vous trouverez la liste de tous ces outils-là et aussi d’autres informations sur comment ils travaillent et comment vous pouvez contribuer. Ce qui est chouette avec l’écosystème E18E, c’est que c’est un écosystème ouvert, dans lequel vous pouvez soit aller prendre des issues et participer, soit, si vous êtes mainteneur, savoir comment vous pouvez améliorer les dépendances dans vos packages, ou, si vous êtes juste développeur dans un projet, savoir ce qu’il faut installer, ne pas installer, et ce que vous pourriez remplacer.

Tout le monde peut venir contribuer. Ils ont un super Discord sur lequel vous pouvez poser des questions, et ils vous répondront.

Ils ont aussi cette fameuse base de données sur laquelle plein d’outils se basent aujourd’hui, dont la règle ESLint et le site Deptri, sur lequel vous pouvez aussi aller voir pour comprendre les suggestions de remplacement qui sont faites, notamment parce qu’il y a des README à chaque fois qui expliquent pourquoi ils les remplacent. Et puis vous avez cette fameuse règle ESLint, que vous pouvez installer dans vos projets au besoin.

Voilà, merci à tous, c’était Estéban Soubiran, et si jamais vous avez un feedback, c’est juste là. Merci.

Il nous reste un peu de temps pour les questions, si vous en avez. La question, c’est : est-ce qu’on voit une décroissance en termes de téléchargement de ces packages-là ?

Je ne sais pas. Je n’ai pas mis à jour le chart, mais, de mémoire, de ce que j’ai pu voir, en fait, non.

On est sur des chiffres tellement énormes, et c’est utilisé tellement partout, et aujourd’hui c’est encore tellement petit comme initiative au vu de la taille et de l’ampleur de l’écosystème JavaScript, que pas trop encore. Et puis, après, tout le tooling moderne arrive à partir de 2019-2020, donc eux ne peuvent pas faire baisser, puisqu’ils n’étaient pas dedans de base.

La question, c’est : quand on bundle avec Vite dans un projet, est-ce que toutes les dépendances utilisées sont bundlées ? La réponse est non : il va y avoir du tree shaking, donc il va choisir uniquement celles qui sont utilisées.

L’intérêt n’est pas nécessairement là. L’intérêt est à la fois au moment de l’installation et au moment de l’utilisation, et c’est aussi tous les risques de sécurité dont j’ai parlé, mais si tu utilises is-string dans ton projet, forcément, tu vas te retrouver avec tout bundlé dans ton projet.

Merci.

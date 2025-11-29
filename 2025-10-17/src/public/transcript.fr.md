Et voilà déjà la dernière session de ce Devfest. Vous êtes les survivants, et le speaker aussi, bravo à vous.

Vous voulez découvrir comment améliorer vos pipelines, réduire la taille de vos builds, simplifier la maintenance de vos projets et limiter la surface d'attaque de vos apps ?

Estéban Soubiran va vous guider dans l'exploration d'un monde où JavaScript est plus propre, plus rapide et plus sûr. Merci de l'accueillir chaleureusement.

J'espère que vous allez bien. Je suis très heureux d'être là aujourd'hui pour vous parler pendant les prochaines dizaines de minutes de JavaScript et de ses paquets, ses non-modules.

Avant de commencer, j'aimerais qu'on fasse une petite photo tous ensemble parce que j'adore ça et surtout parce que la salle aujourd'hui est immense. Si on peut avoir un peu de lumière ce serait super. Pas de lumière, ce n'est pas grave, on la fait sans lumière. Allez tout le monde sourit. Super.

Pour bien commencer cette présentation, je vais vous inviter à scanner ce QR code. Il vous amènera sur une page où vous pourrez retrouver mes différents réseaux. Vous pourrez aussi répondre à une question, mais pour l'instant ne le faites pas, et tout au long de mon talk réagir à ce que je dis si vous aimez, si vous n'aimez pas, ou si vous êtes d'accord.

À la fin vous pourrez retrouver le lien pour noter le talk, mais je vous conseille de le faire à la fin, c'est plus objectif. À tout instant si vous avez des questions vous pouvez les poser. [inaudible]

J'aimerais commencer par ce graphique qui nous montre combien de fois est téléchargé le paquet IsoString par mois. On voit qu'il est téléchargé 160 millions de fois par mois en 2024.

160 millions, c'est difficile à se représenter. On va le mettre en parallèle d'un autre paquet que vous connaissez tous, React. React est téléchargé 140 millions de fois.

IsoString est donc plus téléchargé que React. Pas mal. On le met aussi en parallèle de Tailwind CSS qui lui tourne autour de 60 millions de téléchargements.

Pourtant, si on regarde, en théorie personne n'a jamais installé le package isostring. On peut se demander d'où viennent tous ces téléchargements et en quoi cela nous impacte vraiment d'avoir téléchargé le package is-odd-string.

Ça a plusieurs conséquences. La première c'est que IsoString, quand vous le téléchargez, il installe des sous-dépendances. Quand vous téléchargez un package vous téléchargez le code mais aussi potentiellement sa documentation, ses tests, ses sources, et tout ça ne vous intéresse pas forcément.

On a trois personnes qui ont installé IsoString, moins de 3%, donc très peu de monde.

La problématique c'est que si on rapporte ça sur plusieurs paquets, potentiellement sur des dépendances de sous-dépendances utilisées dans des paquets que vous utilisez ou construisez, on se rend compte que nos node_modules deviennent la chose la plus lourde de l'univers. Ça pose souci pour nos ordinateurs qui ne sont pas infinis.

Aujourd'hui on va essayer de comprendre ce qui se passe dans nos node_modules et comment on peut les nettoyer, et utiliser des choses plus propres que useString.

Avant d'aller plus loin, je me présente, je m'appelle Estéban Soubiran, je suis ingénieur logiciel chez MaiaSpace, une filiale d'ArianeGroup qui vise à développer un lanceur spatial partiellement réutilisable. Dans mon temps libre je gravite autour de quatre écosystèmes : Laravel, Vite, Vue et Nuxt.

Quand j'ai du temps libre j'écris des articles, récemment sur comment construire une application IA. Vous pouvez me retrouver partout, aussi sur Twitch ou sur mon site soubeyrand.dev.

On est là pour parler de non-modules et on commence par un premier outil qui s'appelle Non-Modules Inspector. Cet outil permet d'analyser ce qui se passe dans un paquet.

On va chercher à installer le package isostring. Un webcontainer démarre et on l'installe comme en local. Cet outil vous pouvez aussi l'utiliser en local pour inspecter vos node_modules.

Il installe le paquet l10n-string puis l'analyse et nous donne des statistiques. On voit qu'en installant isostring on a installé 15 packages.

Ça fait déjà beaucoup. On a aussi installé 254 kilos de ressources pour un paquet qui permet de savoir si c'est une question de caractère.

On peut observer ce qu'on a installé. On a installé de la documentation et des tests, et au final la partie JavaScript, le code qui nous intéresse réellement, est très peu présente, autour de 10 à 15% en moyenne sur les 15 paquets.

Ces paquets installent des sous-dépendances et la plupart des choses installées ne sont pas intéressantes. C'est dommage.

Pour pallier à ça, un écosystème s'est mis en place, Ecosystem Performance ou E18e. Il a trois missions : level up pour améliorer l'écosystème JavaScript, clean up pour le nettoyer, et speed up pour l'accélérer.

Ils le font avec différents outils sur différents plans. Ils créent des outils, ceux que je vais vous montrer ont été créés par eux ou par la communauté.

Ils maintiennent une base de données qui relie des choses à ne plus utiliser à des paquets recommandés ou des fonctionnalités devenues natives au runtime.

Ils vont forker des paquets qui ne sont plus maintenus pour les remettre au goût du jour, se débarrasser des features non utilisées et des dépendances inutiles. Ils aident d'autres paquets à se mettre à jour.

Ils proposent des pull requests pour enlever des paquets à ne plus utiliser, et vont voir des projets plus gros comme Storybook pour nettoyer leurs package.json et vous permettre d'avoir des dépendances plus propres.

On va parcourir les différents outils pour voir leur travail. Ils ont aussi créé un plugin ESLint pour voir dans vos node_modules et vos package.json des choses dépréciées.

Le premier outil c'est package-size, créé avant non-module-inspector. On cherche is-string. Il installe le package dans un webcontainer et nous donne des statistiques.

C'est un outil que j'utilise à chaque fois avant d'installer un package que je ne connais pas pour savoir ce qui va se passer et si ça vaut le coût. On retombe sur les mêmes statistiques : 15 packages, 270 kilos (250 tout à l'heure) et on voit le désordre quand on installe Isostringue. Je vous le recommande, c'est simple et rapide.

Ensuite un autre outil qui s'appelle DepTree. Il récupère un paquet à analyser ou vous pouvez uploader votre package.json. Il inspecte l'arbre de dépendances et propose, via la base de données E18E, des alternatives plus modernes ou carrément des choses dans le runtime.

On voit que is-string est considéré comme une micro-utility, un package qui ne répond qu'à une seule fonction, avec une alternative native : utiliser typeof sur l'objet. Tout ça pour ça.

Le problème c'est que isString est facile à détecter, son alternative moderne est évidente. D'autres packages sont plus difficiles. On a es-error remplacé aujourd'hui par des choses natives.

On a aussi function bind que vous pouvez utiliser nativement, et ainsi de suite. Ça vous permet de voir ça simplement. On voit ici la base de données utilisée.

On se rend compte que ES Error peut être remplacé par des choses natives. Function Bind aussi. Et ainsi de suite. La base de données est utilisée.

Enfin, le dernier outil très impressionnant c'est npm graph qui trace le graphe de toutes vos dépendances et sous-dépendances.

On ne va pas l'utiliser avec IsoString, pas assez impressionnant. On le regarde avec Storybook.

Il récupère le package.json, tous les node_modules, et pour chaque module ses dépendances jusqu'à tracer tout le graphe.

Ce que vous voyez c'est le graphe de dépendances de Storybook 8.2. Ça fait beaucoup et on pourrait se dire que ce n'est pas grave.

[inaudible]

Quand vous installez Storybook sur votre machine vous installez aussi toutes ses sous-dépendances. Ensuite, en tant qu'utilisateur, vous devrez charger tout ça ou le bundler. Ça fait énormément de fichiers à parcourir donc c'est plus long.

Pour les mainteneurs de Storybook, c'est autant de problématiques de paquets. Si un mainteneur arrête, un bout de Storybook peut s'effondrer. Si un mainteneur se fait hacker, c'est tout Storybook et son écosystème qui tombent. La surface d'attaque est immense.

Ils ont travaillé avec Ecosystem Performance pour passer de plus de 400 dépendances à, dans Storybook 8.4, quelques dizaines.

Pour vous ça veut dire une installation plus rapide et un temps de chargement plus rapide quand vous build votre Storybook. Pour eux, une maintenance facilitée.

Si vous cherchez plus d'infos vous pouvez aller sur le site E18.dev où vous retrouverez tous les outils et explications.

Vous pouvez explorer le module replacement repository, la base de données qui relie les choses à réutiliser et les nouveaux packages réécrits ou nettoyés, les remplacements modernes qui ont permis de construire les outils.

Vous pouvez essayer leur plugin ESLint. Vous pouvez rejoindre la communauté sur Discord pour discuter avec eux. Merci à tous, c'était Estéban Soubiran, et si vous voulez laisser un commentaire c'est juste là. Merci.

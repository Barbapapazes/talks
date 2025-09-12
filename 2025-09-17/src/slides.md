Je crois que c'est l'un des talks les plus complexe que j'ai eu à écrire.

Non pas parce qu'Inertia est techniquement difficile, c'est même relativement simple à côté d'un talk sur les signaux et la réactivité. Je crois que c'est l'intégration du facteur humain, à deux niveaux, qui a rendu sa création complexe.

Le premier niveau, c'est vous. On est aujourd'hui chez Takima, où il est plutôt question de Java et d'architecture distribuée. Mais on est au meetup Node.js, qui traite plutôt de JavaScript et de l'écosystème Node.js. Et l'écosystème Java et Node ont assez peu de choses en commun. Dans le même temps, Inertia, l'outil dont on va parler ce soir, est sorti de l'écosystème Laravel. J'ai donc trois écosystèmes à faire interagir ce soir avec un unique talk.

Le second niveau, c'est moi. Pour ce talk, j'ai jugé que vous faire simplement une énumération technique des fonctionnalités d'Inertia n'allait pas vous apporter grand chose ni même vous permettre de comprendre et d'apprécier les raisons pour lesquelles la communauté aime l'outil.

Et je me suis aperçu que ce second point était étroitement lié au contexte. Le contexte d'une réflexion, d'un moment, d'un récit est essentiel pour comprendre toute l'histoire. Et d'ailleurs, le contexte, n'a jamais eu autant d'importance qu'aujourd'hui. On peut le voir avec la manipulation de l'information sur les réseaux et même tout simplement au niveau des LLMs.

Alors laissez moi vous donner un peu de contexte. Comment j'en suis arrivé à utiliser Inertia et pourquoi je l'apprécie tant.

<!-- Image de la Nuit de l'Info 2018 -->

Ça, c'est moi. Et je me rends compte que je ne me fais pas de cadeau en faisant ça. C'était au moment de la Nuit de l'Info, donc en décembre 2018. À ce moment-là, je découvre le développement web et j'accroche de suite. Un grand canva, blanc, dans lequel vous pouvez faire absolument tout ce que vous voulez. Quelle liberté.

Enfin, une liberté, qu'il faut savoir l'utiliser. Et c'est là que tout se complexifie.

<!-- Timeline (à la Nuxt UI) avec toutes les dates mais sans échelle -->

En 2020, avec des amis, on a repris le projet d'une plateforme de tutorat pour la vie étudiante de mon école. On y a passé tellement d'heures à trois. Et pourtant, on n'a jamais rien livré. Personne n'a jamais vu un seul pixel de la nouvelle version.

<!-- Image de ma présentation de TEAM lors de ma soutenance -->

En 2021, avec un autre ami, on est revenu avec un nouveau projet pour la vie étudiante. L'idée était simple sur le papier, construire 4 plateformes pour faciliter la vie étudiante, pour former un écosystème. Sept mois de travail, une dispense d'un semestre pour travailler dessus à temps plein. Et pourtant, au bout du compte, on ne l'a jamais livré.

En 2022, j'ai construit une plateforme de vote pour un concours étudiant. En septembre, la plateforme était prête et en production. Pour la première fois depuis 4 ans, un projet a été livré. Enfin !

Maintenant, prenons un peu de recul. Pourquoi le dernier projet est-il enfin livré ?

Parce que je me suis concentré sur le fait de créer et livrer un moment, et non de simplement coder pour coder. Regardez, sur la plateforme de Tutorat, on avait un backend avec Feathersjs, deux frontend, un avec React et l'autre avec Vue et une application mobile en React Native. Pour l'écosystème, on avait un backend avec Adonis, 4 frontend avec Nuxt et une bibliothèque de composants. De son côté, la plateforme de vote, c'était simplement un backend Adonis avec template engine et un peu d'Unpoly. Rien de plus.

C'est exactement ce que vous permet Inertia, vous permettre de vous concentrer sur ce que vous créez pour livrer.

Mais concrètement, comment ça se traduit ?

<!-- TODO: live coding -->

Je crois qu'il y a manière de terminer ce talk.

La première, c'est

<!-- d'aller explorer inertia parce que c'est vraiment trop bien -->
<!-- la seconde, c'est que l'échec fait parti du process, essayez, tentez, et persévérez intelligemment vous ne savez pas ce qui pourrez arriver. -->
<!-- lien vers l'article de you can just do things -->

<!-- https://soubiran.dev/posts/you-dont-need-to-be-chosen-you-can-just-do-things -->

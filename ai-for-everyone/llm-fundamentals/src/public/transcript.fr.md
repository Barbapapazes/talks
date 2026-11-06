J'espère que vous allez bien. Je suis super content de pouvoir vous parler d'IA et, aujourd'hui, de LLM. En lisant ce titre, LLM Fundamentals, je me dis que c'est trop bien, mais c'est quoi, au juste, un LLM ?

Un LLM, c'est une machine dont l'unique objectif est de produire le prochain token. C'est tout, rien de plus.

Sauf qu'en réalité, c'est déjà beaucoup. Avec les différents mécanismes internes, on a des capacités émergentes comme traduire, écrire du code, planifier, résoudre des problèmes. En gros, avec un LLM, on peut faire beaucoup plus que juste produire le prochain token.

[inaudible]

Pour bien comprendre ça, le mieux, c'est de s'attaquer au LLM par l'autre côté, par ce qu'il n'est pas. Un LLM, ce n'est pas une suite d'instructions écrites à la main. Par exemple, vous ne trouverez pas dans un LLM des conditions comme "si le message contient free ou urgent, alors c'est un spam".

Si vous veniez à envoyer ce message, il n'y aurait pas ces règles pour dire que, parce que ce message contient "urgent", alors c'est un spam. Un LLM, c'est plutôt ça.

Ici, on a notre modèle à droite et, pour le moment, il ne sait rien faire. L'idée, c'est que pendant sa phase d'entraînement, il va ajuster ses poids, on entend aussi "paramètres" à la place de "poids", pour être en mesure de nous donner le bon prochain token. Pour ça, on lui donne une grande quantité de texte à gauche, c'est sa base pour apprendre.

Maintenant qu'il a appris, ses poids sont fixés et le modèle n'a plus accès au corpus de texte. Ça, c'est hyper important parce que ça veut dire qu'un LLM, ce n'est pas une base de données. Ce n'est pas non plus un système auto-apprenant.

Une fois qu'on a fait tout ça, on peut envoyer du texte pour que le LLM le complète. Si on prend notre exemple sur la capitale de France, il nous le complète avec "Paris".

Ce qui est intéressant, c'est qu'on peut aussi lui demander de classifier si un message est un spam. Il saura alors nous répondre. C'est l'une de ses capacités émergentes.

Depuis tout à l'heure, je vous parle de tokens, mais concrètement, c'est quoi, un token ? Si on reprend notre phrase "The capital of France is", la première étape, c'est de la découper en morceaux. Ces morceaux, c'est ce qu'on appelle des tokens.

Dans cet exemple, on pourrait croire qu'un token, c'est un mot, mais pas forcément. Le mot "unbelievable", par exemple, est découpé en trois tokens : "un", "beli" et "vable".

Selon le tokenizer, un token peut être un mot, un bout de mot ou même un caractère. Pour faire le découpage de la slide, j'ai utilisé le tokenizer des anciens modèles d'OpenAI. Ce n'est pas aléatoire.

Ensuite, chaque token correspond à un identifiant dans le vocabulaire du modèle. C'est juste un numéro, et deux numéros proches, ça ne veut pas dire que les tokens se ressemblent. Ces numéros permettent de retrouver un tableau de nombres qu'on appelle un embedding.

Cette représentation, c'est la signification d'un mot vue par la machine. Elle a été apprise pendant l'entraînement. C'est vraiment un tableau avec dedans plein de caractères, 1 024, 2 048, beaucoup.

On est parti d'une phrase qu'on a découpée en tokens, et maintenant, on a des nombres sur lesquels notre modèle va pouvoir travailler. On a nos tokens ici, chacun représenté par une liste de nombres, mais maintenant, qu'est-ce qu'on en fait ?

On envoie leurs embeddings dans un Transformer. C'est cette grosse boîte en plein milieu de la slide.

La première étape, c'est l'attention. Elle permet à chaque élément de récupérer de l'information dans les tokens qui le précèdent et dans lui-même. Concrètement, elle va pouvoir faire en sorte que le petit mot "est" ait la connaissance de "capitale" et de "France".

Elle permet de savoir ce qu'il y a avant et d'en récupérer le sens. Ensuite, on passe dans le MLP, qui récupère toutes ces informations et les transforme en un nouveau vecteur.

Ces deux opérations, on les répète sur plusieurs couches. Du coup, on a la représentation des tokens qui évolue au fur et à mesure. L'embedding change.

À la fin, on prend la représentation du dernier token pour calculer un score pour chaque token du vocabulaire avant de passer tout ça en probabilités.

[inaudible]

À partir de là, en vulgarisant vraiment le plus possible, "Paris" a 78 % de chances d'être le prochain token.

Si on prend notre exemple, "la capitale de la France est", le LLM va calculer un score pour chacun des tokens de son vocabulaire. Ensuite, un algorithme va déterminer le prochain à sélectionner. Ici, il choisit "Paris", [inaudible], que l'on vient ajouter à la fin de la phrase.

Cette opération, on la recommence jusqu'à ce que le LLM décide de s'arrêter.

Maintenant qu'on a vu comment notre LLM fonctionne, revenons à sa caractéristique initiale, sélectionner le prochain token. Ce qui est intéressant, c'est qu'à partir de cette propriété, on peut lui faire faire trois choses.

La première, générer du texte et donc nous répondre. Ça, on l'a vu dans les exemples juste avant. Raisonner pour répondre à des problèmes plus complexes en prenant le temps avant de nous répondre, ou même appeler des tools et faire des actions pour interagir avec le monde extérieur.

Si on prend par exemple le reasoning, lorsque le modèle va faire face à un problème complexe, il va se servir de son espace de génération de texte pour générer davantage d'informations. Il va "penser", en quelque sorte. Son objectif, c'est d'y voir plus clair pour trouver la bonne solution.

Ce raisonnement, ça reste du texte, comme quand il vous donne la réponse. Sauf qu'il a appris que ce texte-là ne vous est pas destiné et qu'il a donc la liberté d'y mettre ce qu'il veut. Une fois qu'il a suffisamment réfléchi, il génère le texte pour nous donner la réponse.

Pour le tool calling, l'idée, c'est que le LLM va générer du texte un peu spécial destiné aux systèmes autour de lui. Lorsque le système aperçoit ce texte sur la slide, il le récupère, exécute une fonction externe et redonne au LLM le résultat de cette fonction. C'est tout.

Le point intéressant ici, c'est que ce sont des données structurées. Le modèle n'a pas sorti n'importe quelles données. Il les a sorties dans un format de type JSON que les systèmes informatiques, aujourd'hui, n'ont pas de mal à traiter.

Tout ça, c'est chouette, on a vu beaucoup de choses, mais qu'est-ce qu'on en retient ?

On en retient qu'un LLM apprend des patterns et que ce n'est pas une suite de règles écrites à la main. L'entraînement permet au modèle d'ajuster ses paramètres. À partir du moment où vous commencez à utiliser le modèle, ses paramètres sont fixés.

On apprend aussi que le LLM génère ses tokens les uns à la suite des autres et qu'à chaque fois, il refait toutes ces opérations d'attention et de MLP pour recalculer le score sur le dernier embedding et refaire son calcul de probabilité sur l'ensemble de son vocabulaire. Et ça, token par token.

Le reasoning génère des tokens dont le LLM peut se servir pour apporter une réponse plus complète, potentiellement plus juste. Il peut aussi générer du texte dans un format structuré que le système externe peut comprendre et récupérer pour exécuter des fonctions et agir sur le monde extérieur.

Trop chouette ! On a vu plein de choses sur le fonctionnement d'un LLM et on y voit beaucoup plus clair. Prenons quand même quelques instants pour comprendre la carte d'identité d'un LLM et mieux comprendre les annonces quand un LLM fait son apparition.

Là, vous avez trois cartes d'identité. La question, c'est comment ça se lit ? Ce qu'on voit tout en haut de chacune de ces cartes, OpenAI, Anthropic, DeepSeek, c'est le nom de l'entreprise qui a créé le modèle.

Ensuite, GPT-6.1-sol, Claude Opus 5.5, DeepSeek V4, c'est le nom du modèle.

Ensuite, on a son nombre de paramètres. On l'a vu, c'est le nombre de variables que le modèle va ajuster au cours de son entraînement pour pouvoir ensuite l'utiliser et nous répondre.

Sur des modèles commerciaux comme ceux d'OpenAI et d'Anthropic, qui sont fermés, donc pas publics, on n'a pas le nombre de paramètres. Sur un modèle comme DeepSeek, on est à 1,6 trillion de paramètres.

On voit en dessous "49B actifs". C'est parce que, quand il génère un token, il n'active que 49 milliards de ses paramètres.

Ensuite, on a le context window, la taille du contexte. C'est la quantité de tokens qu'on peut mettre dans son contexte avant qu'il nous dise qu'il n'y a plus de place et qu'on a besoin d'enlever des morceaux du contexte ou de redémarrer un nouveau contexte.

Aujourd'hui, sur la plupart des modèles, on est sur 1 million de tokens. Ça correspond à beaucoup de livres, puisqu'on considère aujourd'hui qu'un token, c'est 4 caractères.

[inaudible]

On est donc à 4 millions de caractères. Ça fait beaucoup de mots.

Ensuite, sur le weight, ces fameux poids, ces fameux paramètres, la question est de savoir si le modèle est public et si on peut le récupérer et l'installer sur notre machine pour l'utiliser librement.

En l'occurrence, sur les modèles commerciaux, notamment plutôt américains, ce n'est pas le cas. Ils sont pour la plupart fermés, donc pas récupérables.

Les modèles plutôt chinois ou français, je cite Mistral par exemple, sont dits en open weight. Vous pouvez récupérer le modèle, c'est l'équivalent d'un exécutable, le mettre sur votre machine et le faire tourner.

Un modèle à 1,6 trillion de paramètres, vous ne le ferez pas tourner sur votre machine. Mais un petit modèle avec 0.8 B, par exemple, donc 800 millions de paramètres, ça peut tout à fait tourner sur vos machines.

Merci à tous, c'était Estéban Soubiran. Si vous avez un feedback, c'est sur le premier QR code que ça se passe. Le second QR code vous permet de vous abonner à la newsletter pour ne rien manquer des prochains épisodes.

Merci !

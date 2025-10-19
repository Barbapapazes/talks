Bonjour à tous. Aujourd’hui, on va parler d’Unpoly, un outil destiné au web.

Avant de commencer, j’aimerais sonder la salle avec deux questions. Qui parmi vous a déjà fait du web avec des frameworks front-end modernes comme React, Angular ou Vue ? OK, une bonne majorité. Et qui a déjà fait du développement web avec des frameworks back-end comme Rails ou Laravel ? Beaucoup moins de personnes.

Je m’appelle Estéban Soubiran. Je suis élève ingénieur à l’INSA Centre Val de Loire en cybersécurité et développeur web chez ANEO, une agence de conseil. Je suis aussi responsable du classement des associations, un projet qui met en avant les associations étudiantes.

Vous pouvez me retrouver principalement sur LinkedIn ou sur GitHub. Pendant cette présentation, on suivra un fil rouge avec un petit robot qu’on va appeler Atom, développeur pour le classement des associations.

Pour septembre, sa mission est de réaliser une plateforme de vote afin d’évaluer la capacité des associations à mobiliser leur réseau. Les visiteurs pourront venir voter sur cette plateforme.

Parlons des spécifications pour bien comprendre la suite. Il y a une partie administration et une partie visualisation pour consulter les informations des associations participantes. Il faut permettre de voter, accepter une adresse e‑mail, la vérifier, l’enregistrer en base de données et envoyer des mails.

On doit visualiser des graphiques pour voir quand les gens votent, pour quelles associations, et la répartition des votes entre les plus votées et les moins votées. Le site doit être SEO friendly pour être facilement indexable et trouvable sur Google quand on tape le nom de l’association.

L’expérience utilisateur doit être rapide et moderne, donner envie de parcourir la plateforme, tout en restant maintenable et peu complexe. Atom n’a pas beaucoup de temps et il a d’autres choses à faire.

En termes de requirements, la plateforme devra accueillir 100 000 visites en 30 jours, 25 000 votes et envoyer 45 000 mails. C’est important pour comprendre pourquoi on veut une application maintenable, peu complexe et qui répond à ces contraintes.

Quelle stack choisir ? Atom débute un peu, il va sur YouTube voir comment coder ce type d’application et tombe sur la stack MERN. MongoDB pour la base de données, Express pour le serveur et l’API, React pour l’interface utilisateur, et Node.js pour faire tourner le tout.

Son parcours serait de construire une API JSON, gérer les dépendances d’Express, structurer les données pour la base et router l’API. Il doit gérer le filtrage, la pagination, le tri, l’authentification pour l’administration et les autorisations, puis la mise en production.

Ensuite, il faut faire le front-end avec React, choisir et configurer les dépendances, faire le routage, se connecter à l’API, itérer quand ça ne marche pas, et réimplémenter les autorisations côté client. Il y a l’accessibilité à traiter, et le SEO qui n’est pas évident, donc il faudra peut-être un méta‑framework comme Remix ou Next et un second déploiement.

Pour cette plateforme de vote, Atom devrait maintenir deux serveurs en production. Il a trois problèmes: un temps limité, une complexité trop élevée, et une maintenance difficile d’année en année pour un projet qui doit durer.

Notre solution pour Atom, c’est Unpoly. C’est un petit script qui permet de construire des applications fluides et modernes, tout en étant entièrement rendues côté serveur. La complexité d’un framework front-end, le second déploiement et la duplication de l’authentification et des autorisations disparaissent, car tout reste côté serveur.

Ce que les applications rendues côté serveur font bien: le choix d’outils matures comme Rails, Laravel ou Symfony, une complexité moindre que créer une API plus un front-end séparé, et un accès synchrone aux données sans multiples appels AJAX ou XHR.

Le premier rendu est très rapide et contient les données, ce qui est parfait pour le SEO. Et ça fonctionne sur tous les appareils, car on envoie du HTML et le contenu s’affiche même avec de mauvaises connexions.

Ce qui marche moins bien: le retour d’information sur l’interaction peut paraître lent, les états transitoires sont perdus s’ils ne sont pas dans l’URL, l’interactivité est limitée pour gérer des layers comme des modales et des pop‑ups, et les animations entre pages sont compliquées. La gestion de formulaires très complexes est plus délicate.

Unpoly change la donne en ramenant ces points faibles à un niveau acceptable. Unpoly, ce sont 25 attributs HTML ajoutés via un simple script que vous pouvez utiliser partout dans l’application.

La logique reste centrée côté serveur: pas besoin de valider ou d’autoriser à la fois côté client et côté serveur. Ça supporte tous les langages puisque vous continuez à construire côté serveur, et Unpoly est juste un bout de JavaScript inclus dans votre HTML. Il gère la navigation, les formulaires, les animations et les interactions.

Passons à la démo avec les grands éléments d’Unpoly. Voici la plateforme de vote qu’Atom a commencé, rendue entièrement côté serveur. Pour l’instant, elle est simple: des associations listées, on peut cliquer et filtrer.

Si je clique sur une association, toute la page recharge, et c’est pareil quand je reviens en arrière. Si je cherche une association, ça ne scrolle pas au bon endroit. L’application n’est pas très agréable.

Installer Unpoly est simple. C’est une dépendance NPM classique, ou on peut l’inclure via un CDN. Une fois inclus, on l’importe dans le fichier JS si on l’utilise via NPM, et c’est tout: pas d’autre JavaScript à écrire côté client.

Première amélioration: sur le lien de la carte d’une association, on ajoute up-target pour cibler l’élément à remplacer, par exemple l’élément avec l’attribut layout-main. Désormais, quand je clique, la page ne recharge pas et la navigation devient fluide.

Comment ça marche ? Les pages sont toujours rendues côté serveur, mais la requête est interceptée par Unpoly, qui envoie une requête XHR, récupère la page et ne remplace que l’élément ciblé. Le header ne change pas, donc son état reste intact.

On peut aller plus loin avec d’autres attributs. On ajoute up-instant pour déclencher l’action à l’appui et donner une sensation d’instantanéité. On ajoute up-preload pour précharger la page au survol, de sorte que la réponse soit disponible au clic.

On l’observe dans l’onglet Réseau: la page HTML est préchargée par Unpoly. Passons aux formulaires, notamment le filtre latéral des associations.

Le filtre est un formulaire classique qui met des données dans l’URL, récupérées par le serveur. On ajoute up-submit pour envoyer le formulaire sans recharger toute la page et un up-target sur la grille d’associations pour ne remplacer que cette zone.

En filtrant, la page ne se rafraîchit pas, les données se mettent à jour et le scroll est conservé. Si on veut remonter au début de la liste après filtrage, on ajoute up-scroll avec l’ID cible.

Unpoly gère très bien les modales. Par exemple, un graphique qui montre les votes par heure apparaît aujourd’hui sur une page dédiée. On veut l’ouvrir dans une modale: sur le lien, on utilise up-layer="modal" et on cible l’élément à afficher, par exemple un conteneur [modal].

Au clic, la modale apparaît. Le graphique n’apparaît pas encore, car il est créé avec Chart.js et le script ne s’est pas réexécuté. Unpoly permet d’exécuter des scripts selon les éléments chargés via up.compiler.

On écrit un compiler qui cible les canvas dans l’élément remplacé et initialise le graphique. La fonction de callback reçoit l’élément et des données. Avec l’attribut up-data, ces données sont automatiquement passées au compiler et le graphique s’affiche.

En quelques étapes, on a une modale et une expérience utilisateur bien meilleure. La modale est personnalisable: c’est un Web Component stylisable en CSS.

Côté requêtes, Unpoly a un cache: revenir sur une page utilise le cache au lieu de refaire une requête, ce qui se combine bien avec le préchargement. Unpoly ajoute aussi des headers, comme X-Up-Mode, pour que le serveur adapte la réponse.

Ouvrir le lien dans une nouvelle page n’affiche pas la croix de fermeture, alors que dans une modale elle apparaît. Le serveur peut détecter le mode et conditionner l’affichage, et un attribut permet de fermer la modale sans écrire de JavaScript.

Ce qu’on construit ici suit l’amélioration progressive: stricte séparation entre contenu, style et comportement. Si le JavaScript ou le CSS ne chargent pas, le HTML reste lisible.

Avec Unpoly, ce ne sont que de petits attributs. Sans le script, les liens restent des liens et l’application fonctionne, simplement avec une UX dégradée. Pensez à l’ascenseur et à l’escalator: si l’ascenseur tombe en panne, on est bloqué, alors que l’escalator reste utilisable.

Ce n’est pas une solution unique: parfois une SPA est indispensable, mais ce n’est pas l’approche de l’amélioration progressive. Sur le web, gardez le contrôle, choisissez bien vos outils, et faites comme Atom: faites le bon choix et utilisez Unpoly.

On me demande si toute la page HTML traverse le réseau lors d’une requête XHR. Oui, mais on peut jouer avec les headers. Comme on connaît le up-target, le serveur peut choisir de ne rendre que la partie utile.

Par exemple, si on rend la grille des associations, on n’a pas besoin de rendre les filtres, ce qui évite des appels à l’API. La page est plus légère sur le réseau et on économise des requêtes externes côté serveur.

On me demande aussi si la version CDN ou la version NPM change quelque chose. C’est la même librairie; la différence tient à la simplicité d’intégration selon le projet.

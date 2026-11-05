---
htmlAttrs:
  lang: en
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: "#6C1EB9"
codeCopy: false
transition: fade-out
theme: slidev-theme-personal
title: "The MCP server"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: ai,mcp,tool-calling,json-rpc
event: AI for Everyone
name: The MCP server
group: Introduction
ready: true
timing: 0.3
---

# The MCP server

<!--
Bonjour tout le monde !

Aujourd'hui, on va parler serveurs MCP.

Déjà parce que c'est super intéressant et puis parce c'est une brique dont on va avoir besoin pour construire des  petits agents.
-->

---
name: A conversation without tools
group: The limits of text
ready: true
layout: ai
timing: 1.1
---

<McpConversationDemo />

<!--
Imaginons qu'on travaile sur une application de suivi de projets et c'qu'on veut, c'est que les utilisateurs évitent éviter les suppressions accidentelles. Pour savoir comment faire, je demande à une IA.

[Entrée pour envoyer le message, puis laisser apparaître la réponse]

L'assistant propose de saisir le nom du projet avant de le supprimer. Ça me va.

[Entrée pour passer à la demande de création d'issue, puis l'envoyer]

Du coup, je lui demande d'en faire une issue sur GitHub. Il me rédige le contenu et il s'arrête. Il ne va pas plus loin. Il ne peut pas me créer l'issue.

C'est évidemment un problème mais qu'on peut corriger, on va voir comment !
-->

---
name: Tokens can request actions
group: Tool calling
ready: true
clicks: 1
timing: 0.5
---

<TokenCapabilities reveal-together />

<!--
Revenons à notre LLM. [click]

Son objectif c'est générer le prochain token. Il peut s'en servir pour répondre, raisonner et demande l'appel d'un outil.

Et justement, on pourrait se servir de cette capacté pour le faire appeller GitHub pour qu'il créé notre issue. Intéressant !
-->

---
name: A conversation with a tool
group: Tool calling
ready: true
layout: ai
timing: 0.3
---

<McpToolConversationDemo />

<!--
En faite ce qu'on aimerait, c'est ce workflow.

[Entrée pour saisir le message, puis Entrée pour l'envoyer]

Où l'agent va appeler le tool create_issue pour créer l'issue à notre place.
-->

---
name: Who talks to whom
group: Tool calling
ready: true
layout: full
timing: 0.8
---

<div class="absolute inset-0 flex items-center justify-center">
  <McpExchangeMap static />
</div>

<!--
Prenons un peu de hauteur sur le système et regardons ce qu'il se passe.

L'utilisateur échange avec l'application. L'application envoie les messages au modèle et reçoit ses réponses, dont les demandes d'appel d'outil.

Quand la demande contient create_issue, alors l'application appelle l'API de GitHub en HTTP pour faire l'action. L'application transmet le résultat au modèle et la conversation reprend.

Maintenant qu'on a cette overview, on peut se pencher sur du plus concret. Les échanges, il ressemble à quoi ?
-->

---
name: The model asks, the application calls
group: Tool calling
layout: full
clicks: 5
timing: 1.7
---

<McpToolCallWalkthrough />

<!--
En bas, on retrouve le graph qu'on a vu juste avant. Il va nous permettre de visualiser les intéractions entre les systèmes. À gauche, on va avoir le chat de notre application et à droite, le contenu des échanges entre les systèmes. C'est ça qui va nous intéresser.

Le premier truc qui se passe, c'est une requête avec notre message de l'application vers le provider. Dans cette requête, on y trouve le modèle, le message et surtout, la définition d'un tool qu'on met à disposition de l'IA pour qu'elle puisse l'appeler.

[click] Ensuite, le modèle nous répond avec avec justement, une demande de tool call pour create_issue. D'ailleurs, on y voit les différents paramètres pour le tool call. [click] Notre application l'intercept et execute une fonction qui va appeler l'API de GitHub. [click] L'API de GitHub nous retourne une réponse [click]  qu'on vient réintégrer dans l'appel à notre LLM, qu'on va appeler [click] et il va pouvoir nous répondre. Il a réussi à créer l'issue.
-->

---
name: A shared interface for tools
group: MCP servers
clicks: 1
timing: 1.6
---

<McpSharedInterface />

<!--
Regardons justement plusieurs applications. Chacune veut proposer la même action : créer une issue sur GitHub.

Sans interface commune, chacune peut écrire son propre code d'intégration. Les cadres montrent que ce code appartient à chaque application. Il faut comprendre l'API GitHub, gérer ses réponses et maintenir cette intégration.

Et ce travail revient pour les autres services qu'on veut connecter. Une intégration GitHub ne permet pas d'appeler Slack.

[click] MCP propose une interface commune entre les applications et les serveurs. Son nom complet est Model Context Protocol.

Le code qui sait appeler GitHub se trouve maintenant dans un serveur MCP. Plusieurs applications compatibles peuvent utiliser ce même serveur. Elles savent découvrir ses outils et lui demander de les exécuter.

Ça ne supprime pas le travail d'intégration. Quelqu'un doit toujours écrire le code qui appelle GitHub. Mais on peut le réutiliser au lieu de le réécrire dans chaque application.

Reprenons exactement notre demande pour voir ce qui change.
-->

---
name: The same action through MCP
group: MCP servers
layout: full
clicks: 5
timing: 2.5
---

<McpToolCallWalkthrough with-mcp />

<!--
Même utilisateur, même demande, même dépôt GitHub. Cette fois, un serveur MCP apparaît entre l'application et GitHub. Le modèle, lui, reste à la même place.

L'application commence par demander au serveur quels outils il propose. Elle n'a pas besoin de connaître à l'avance tous leurs noms et leurs paramètres.

[click] Le serveur décrit create_issue. L'application transmet cette description au modèle, comme elle le faisait tout à l'heure. Pour le modèle, il s'agit toujours d'un outil disponible pour répondre à la demande.

[click] Le modèle demande de créer l'issue avec le titre et la description. Avant, l'application exécutait directement son intégration GitHub. Maintenant, elle transmet la demande au serveur MCP.

C'est cette liaison que MCP standardise. Le modèle ne se connecte pas lui-même au serveur. L'application fait le lien entre sa conversation avec le modèle et les outils du serveur.

[click] Le serveur utilise son code pour contacter GitHub. L'opération reste la même : créer une issue dans le dépôt choisi. On a déplacé le code d'intégration, pas remplacé l'API GitHub.

[click] GitHub crée l'issue. Le serveur renvoie le résultat à l'application, qui le transmet au modèle. On peut suivre le retour jusqu'à notre conversation.

[click] Et voilà notre confirmation, avec l'issue numéro 42. Pour l'utilisateur, le résultat est identique. Il a demandé une issue et obtenu son lien.

La différence apparaît quand on branche une autre application compatible. Elle peut utiliser le même serveur, sans réécrire la création d'issue. C'est ce qu'on gagne avec MCP.
-->

---
name: A local server over stdio
group: MCP servers
transition: slide-up
timing: 0.6
---

<McpServerConnection transport="stdio" />

<!--
Le serveur MCP peut tourner sur notre machine. Avec stdio, l'application le lance comme un programme local et communique directement avec lui.

C'est utile pour un serveur qui travaille sur nos fichiers, par exemple. Pas besoin de déployer un service en ligne.

Il peut aussi contacter GitHub à distance. Local décrit l'endroit où le programme tourne, pas tout ce à quoi il peut accéder.
-->

---
name: A remote server over Streamable HTTP
group: MCP servers
timing: 0.7
---

<McpServerConnection transport="http" />

<!--
Le serveur peut aussi être hébergé à distance. Avec Streamable HTTP, l'application se connecte à son URL au lieu de lancer un programme sur notre machine.

[click] Une application en ligne, comme ChatGPT, peut alors l'utiliser aussi.

Dans les deux cas, le principe reste le même. L'application découvre ce que le serveur propose et lui transmet ses demandes. Il faut simplement vérifier que le client prend en charge les fonctionnalités qu'on veut utiliser.
-->

---
name: Discovering an MCP server
group: MCP servers
clicks: 1
timing: 0.9
ready: true
---

<McpDiscovery />

<!--
Avant de pouvoir commencer à utiliser un serveur MCP, il faut qu'il se dise bonjour avec le client.

Dans la première requête, le client appelle la méthode server/discover et la communication avec le serveur est en RPC, donc un seul endpoint à taper, et on précise la méthode dans le JSON.

[click] Ensuite, le serveur va répondre avec ses différentes capacités. On y voit les tools, et deux nouvelles, resources et prompts. L'intérêt c'est que ça permet au client d'adapter son interface en fonction de ce que supportent les MCP.

On y découvre aussi la version supportée. Ça c'est pour s'assurer qu'on parle bien le même language.
-->

---
name: Resources provide context
group: Beyond tools
ready: true
layout: ai
timing: 1.2
---

<McpResourceDemo />

<!--
On l'a découvert dans la slide précédente. Un serveur MCP peut mettre à disposition des ressources.

C'qu'on peut faire c'est de donner à notre chat le brief du projet pour qu'il tienne compte des besoins du produit, et lui poser une question sur le projet.

[Cliquer sur Add context, puis sélectionner Project brief]

[Entrée pour lancer la conversation]

Le document qu'on a ajouté il permet d'ajouter du context pour que l'IA est une réponse plus pertinente.

C'qu'est intéressant avec ça c'est qu'on peut imaginer une serveur MCP, centralisé, à disposition d'une équipe, pour permettre à chacun d'avoir accès aux mêmes documents et de garder une source de vérité, plutôt que d'avoir des documents un peu partout, potentiellent dans différent repo ou dossiers.
-->

---
name: 'Behind the scenes: resources/read'
group: Beyond tools
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
ready: true
timing: 0.7
---

<BackgroundImage />

<McpProtocolInspector kind="resources" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
D'un point de vu du protocol, ça fonctionne exactement comme le tool call.

On va commencer par demander au serveur toutes les resources disposnibles avec un resources/list. Ça permet de les afficher dans le dropdown qu'on a vu dans notre chat. Et puis dès qu'on en utilise un, un fait un demande au serveur avec resources/read et le serveur nous retourne le contenu du fichier.
-->

---
name: Prompts provide reusable messages
group: Beyond tools
layout: ai
ready: true
timing: 1.2
---

<McpPromptDemo />

<!--
Le serveur MCP il peut aussi exposer des prompts. Là où la ressource permet d'ajouter du context, le prompt c'est des instructions. Dans l'interface, ça apparait comme les commandes, avec le slash.

[Entrer /, puis sélectionner review_pull_request, paraméterer]

[Entrée pour lancer la conversation]

Ce qu'on voit, c'est que le prompt apparait dans l'input, avec les paramètres que j'avais passé, et l'IA s'est du coup mise en action. Trop pratique.

Et là, comme pour les ressrouces, ça peut permettre de partager des prompts à tout une équipe, une organisation, pour éviter d'avoir à les dupliquer dans tous les projets, entre tous les utiliateurs.
-->

---
name: 'Behind the scenes: prompts/get'
group: Beyond tools
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
ready: true
timing: 0.5
---

<BackgroundImage />

<McpProtocolInspector kind="prompts" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Là pour le coup, c'est exactement comme ce qu'on a vu juste avant. On demande au serveur tous les prompts de disponible. Il nous les renvoient.

Ensuite, quand on a besoin d'un, on envoie les différentes paramètres demandés et il nous le envoie le prompt !
-->

---
name: More MCP capabilities
group: Beyond tools
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
ready: true
timing: 0.3
---

<BackgroundImage />

<McpCapabilities />

<!--
Nous, on a vu 3 des capacités du MCP, les 3 principales, mais il en existe pleins d'autres comme la complétion, l'authentification, les MCP Apps, les tâches et mêmes les skills.
-->

---
name: What to remember
group: Key takeaways
layout: recap
ready: true
timing: 0.1
---

<RecapList
  title="What to remember"
  :items="[
    {
      title: 'The model asks. Code executes.',
      description: 'The application handles tool requests and sends the results back.'
    },
    {
      title: 'MCP provides a shared interface',
      description: 'Compatible clients discover and call tools through the same protocol.'
    },
    {
      title: 'Servers can share context and messages too',
      description: 'Resources provide content. Prompts provide reusable messages.'
    }
  ]"
/>

<!--
Qu'est-ce qu'on retient ?

[Lire le contenu]
-->

---
name: Thank you
group: Closing
layout: outro2
customFeedbackUrl: https://api.inalia.app/f/QDA48c
additionalContentUrl: https://beta.soubiran.dev/newsletter
additionalContentLabel: Get the next episodes
timing: 0.4
ready: true
---

<!--
Merci à tous, c'était Estéban.

Pour me faire un retour, vous pouvez scanner le premier QR code. Le second vous permet de vous abonner à la newsletter pour suivre les prochains épisodes !

Merci !
-->

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
timing: 0.4
---

# The MCP server

<!--
Bonjour tout le monde !

Aujourd'hui, on va parler des serveurs MCP.

Déjà parce que c'est super intéressant, et puis parce que c'est une brique dont on va avoir besoin pour construire de petits agents.
-->

---
name: A conversation without tools
group: The limits of text
ready: true
timing: 1.1
layout: ai
---

<McpConversationDemo />

<!--
Imaginons qu'on travaille sur une application de suivi de projets. Ce qu'on veut, c'est éviter que les utilisateurs suppriment des projets par accident. Pour savoir comment faire, je demande à une IA.

[Entrée pour envoyer le message, puis laisser apparaître la réponse]

L'assistant propose de saisir le nom du projet avant de le supprimer. Ça me va.

[Entrée pour passer à la demande de création d'issue, puis l'envoyer]

Du coup, je lui demande d'en faire une issue sur GitHub. Il me rédige le contenu et il s'arrête. Il ne va pas plus loin. Il ne peut pas me créer l'issue.

C'est évidemment un problème, mais on peut le corriger. On va voir comment !
-->

---
name: Tokens can request actions
group: Tool calling
ready: true
timing: 0.5
clicks: 1
---

<TokenCapabilities reveal-together />

<!--
Revenons à notre LLM. [click]

Son objectif, c'est de générer le prochain token. Il peut s'en servir pour répondre, raisonner et demander l'appel d'un outil.

Et justement, on pourrait se servir de cette capacité pour lui faire demander un appel à GitHub afin de créer notre issue. Intéressant !
-->

---
name: A conversation with a tool
group: Tool calling
ready: true
timing: 0.3
layout: ai
---

<McpToolConversationDemo />

<!--
En fait, ce qu'on aimerait, c'est ce workflow.

[Entrée pour saisir le message, puis Entrée pour l'envoyer]

L'agent appelle le tool create_issue pour créer l'issue à notre place.
-->

---
name: Who talks to whom
group: Tool calling
ready: true
timing: 0.8
layout: full
---

<div class="absolute inset-0 flex items-center justify-center">
  <McpExchangeMap static />
</div>

<!--
Prenons un peu de hauteur sur le système et regardons ce qui se passe.

L'utilisateur échange avec l'application. L'application envoie les messages au modèle et reçoit ses réponses, dont les demandes d'appel d'outil.

Quand la demande contient create_issue, alors l'application appelle l'API de GitHub en HTTP pour faire l'action. L'application transmet le résultat au modèle et la conversation reprend.

Maintenant qu'on a cette vue d'ensemble, on peut se pencher sur quelque chose de plus concret. Les échanges, ils ressemblent à quoi ?
-->

---
name: 'The model asks, the application calls'
group: Tool calling
ready: true
timing: 1.6
layout: full
clicks: 5
---

<McpToolCallWalkthrough />

<!--
En bas, on retrouve le graphe qu'on a vu juste avant. Il va nous permettre de visualiser les interactions entre les systèmes. À gauche, on a le chat de notre application et, à droite, le contenu des échanges entre les systèmes. C'est ça qui va nous intéresser.

Le premier truc qui se passe, c'est que l'application envoie une requête avec notre message au provider. Dans cette requête, on trouve le modèle, le message et surtout la définition d'un tool qu'on met à disposition de l'IA pour qu'elle puisse l'appeler.

[click] Ensuite, le modèle nous répond justement avec une demande de tool call pour create_issue. D'ailleurs, on y voit les différents paramètres du tool call. [click] Notre application l'intercepte et exécute une fonction qui va appeler l'API de GitHub. [click] L'API de GitHub nous retourne une réponse [click] qu'on vient réintégrer dans une nouvelle requête à notre LLM. [click] Il peut alors nous répondre que l'issue a bien été créée.
-->

---
name: A shared interface for tools
group: MCP servers
ready: true
timing: 1.2
clicks: 1
---

<McpSharedInterface />

<!--
Imaginons que je développe ChatGPT. Je dois écrire mon tool et son implémentation pour que mon application puisse se connecter à GitHub. Et si je développe Claude, ou même Cursor, je dois aussi le faire. En fait, ça veut dire que chaque application doit développer sa propre intégration.

On sent bien que c'est pas optimal.

Et c'est précisément là que [click] MCP, le Model Context Protocol, fait son apparition !

L'idée, c'est d'avoir une interface commune entre les applications et les serveurs. Le serveur est développé une fois, souvent par le service qui veut se faire appeler, et les applications n'ont plus qu'à se connecter.

D'ailleurs, on l'a vu, la responsabilité de développer l'intégration est passée des applications au service.
-->

---
name: The same action through MCP
group: MCP servers
timing: 1.4
layout: full
clicks: 5
---

<McpToolCallWalkthrough with-mcp />

<!--
De retour sur notre visualisation avec le même scénario que tout à l'heure.

Cette fois, on va regarder comment le système se comporte quand on place un serveur MCP.

Dans un premier temps, l'application demande au serveur MCP quels tools il peut mettre à sa disposition. [click] Le serveur lui répond, et on le voit ici, avec un tool create_issue.

[click] Ensuite, le modèle demande à appeler le tool et donc l'application transmet la demande au serveur. On y retrouve bien le nom du tool et les paramètres fournis par le modèle.

[click] Le serveur MCP s'occupe de faire un appel à l'API de GitHub.

[click] Le serveur MCP renvoie la réponse de l'API à l'application, [click] qui vient la réinjecter dans la conversation. Ça permet au modèle de nous répondre que c'est bon, l'issue est créée.
-->

---
name: A local server over stdio
group: MCP servers
ready: true
timing: 0.4
transition: slide-up
---

<McpServerConnection transport="stdio" />

<!--
Le serveur MCP peut tourner sur notre machine. Avec stdio, l'application le lance comme un programme local et communique directement avec lui via l'entrée et la sortie standard.

C'est l'ancienne manière de faire. Elle n'est plus trop utilisée.
-->

---
name: A remote server over Streamable HTTP
group: MCP servers
ready: true
timing: 0.6
---

<McpServerConnection transport="http" />

<!--
La nouvelle manière de faire, c'est avec Streamable HTTP. L'application se connecte à l'URL du serveur et c'est tout !

L'avantage, c'est que l'application n'a plus besoin d'avoir une machine à disposition. [click]

Ça veut dire qu'une application comme ChatGPT peut l'utiliser !

Après, dans les deux cas, via stdio ou Streamable HTTP, ça fonctionne de la même manière.
-->

---
name: Discovering an MCP server
group: MCP servers
ready: true
timing: 1.2
clicks: 1
---

<McpDiscovery />

<!--
Avant de pouvoir commencer à utiliser un serveur MCP, il faut que le client et le serveur se disent bonjour.

Dans la première requête, le client appelle la méthode server/discover et la communication avec le serveur est en RPC, donc un seul endpoint à taper, et on précise la méthode dans le JSON.

[click] Ensuite, le serveur va répondre avec ses différentes capacités. On y voit les tools et deux nouvelles capacités, les resources et les prompts. L'intérêt, c'est que ça permet au client d'adapter son interface en fonction de ce que prend en charge le serveur MCP.

On y découvre aussi la version prise en charge. Ça, c'est pour s'assurer qu'on parle bien le même langage.
-->

---
name: Resources provide context
group: Beyond tools
ready: true
timing: 1.2
layout: ai
---

<McpResourceDemo />

<!--
On l'a découvert dans la slide précédente. Un serveur MCP peut mettre à disposition des ressources.

Ce qu'on peut faire, c'est donner à notre chat le brief du projet pour qu'il tienne compte des besoins du produit, puis lui poser une question sur le projet.

[Cliquer sur Add context, puis sélectionner Project brief]

[Entrée pour lancer la conversation]

Le document qu'on a ajouté apporte du contexte pour que l'IA donne une réponse plus pertinente.

Ce qui est intéressant avec ça, c'est qu'on peut imaginer un serveur MCP centralisé, à disposition d'une équipe. Chacun peut alors accéder aux mêmes documents et garder une source de vérité commune, plutôt que d'avoir des documents un peu partout, potentiellement dans différents dépôts ou dossiers.
-->

---
name: 'Behind the scenes: resources/read'
group: Beyond tools
ready: true
timing: 0.7
img: >-
  https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpProtocolInspector kind="resources" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Du point de vue du protocole, ça fonctionne exactement comme le tool call.

On va commencer par demander au serveur toutes les ressources disponibles avec resources/list. Ça permet de les afficher dans le menu déroulant qu'on a vu dans notre chat. Et puis, dès qu'on en utilise une, on fait une demande au serveur avec resources/read et le serveur nous retourne le contenu du fichier.
-->

---
name: Prompts provide reusable messages
group: Beyond tools
ready: true
timing: 1.1
layout: ai
---

<McpPromptDemo />

<!--
Le serveur MCP peut aussi exposer des prompts. Là où la ressource permet d'ajouter du contexte, le prompt fournit des instructions. Dans l'interface, ça apparaît comme les commandes, avec le slash.

[Entrer /, puis sélectionner review_pull_request et renseigner les paramètres]

[Entrée pour lancer la conversation]

Ce qu'on voit, c'est que le prompt apparaît dans le champ de saisie, avec les paramètres que j'avais passés, et l'IA s'est du coup mise en action. Trop pratique.

Et là, comme pour les ressources, ça peut permettre de partager des prompts avec toute une équipe ou une organisation, pour éviter d'avoir à les dupliquer dans tous les projets et pour tous les utilisateurs.
-->

---
name: 'Behind the scenes: prompts/get'
group: Beyond tools
ready: true
timing: 0.5
img: >-
  https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpProtocolInspector kind="prompts" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Là, pour le coup, c'est exactement comme ce qu'on a vu juste avant. On demande au serveur tous les prompts disponibles. Il nous les renvoie.

Ensuite, quand on a besoin de l'un d'eux, on envoie les différents paramètres demandés et il nous renvoie le prompt !
-->

---
name: More MCP capabilities
group: Beyond tools
ready: true
timing: 0.3
img: >-
  https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpCapabilities />

<!--
Nous, on a vu trois des capacités de MCP, les trois principales, mais il en existe plein d'autres comme la complétion, l'authentification, les MCP Apps, les tâches et même les skills.
-->

---
name: What to remember
group: Key takeaways
ready: true
timing: 0.1
layout: recap
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
ready: true
timing: 0.4
layout: outro2
additionalContentLabel: Get the next episodes
additionalContentUrl: 'https://beta.soubiran.dev/newsletter'
customFeedbackUrl: 'https://api.inalia.app/f/QDA48c'
---

<!--
Merci à tous, c'était Estéban.

Pour me faire un retour, vous pouvez scanner le premier QR code. Le second vous permet de vous abonner à la newsletter pour suivre les prochains épisodes !

Merci !
-->

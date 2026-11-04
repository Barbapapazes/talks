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

Aujourd'hui, on va suivre une seule action : créer une issue sur GitHub depuis une conversation.

Voyons ce qu'un serveur MCP change dans cette histoire.
-->

---
name: A conversation without tools
group: The need
ready: true
layout: ai
timing: 0.9
---

<McpConversationDemo />

<!--
On travaille sur une application de suivi de projets. On veut éviter les suppressions accidentelles.

[Entrée pour envoyer le message, puis laisser apparaître la réponse]

L'assistant propose de saisir le nom du projet avant de le supprimer. Ça me va.

[Entrée pour passer à la demande de création d'issue, puis l'envoyer]

Du coup, je lui demande d'en faire une issue sur GitHub.

Il peut rédiger le contenu, mais pas créer l'issue. Produire du texte ne lui donne pas accès à GitHub.

Alors, comment passer de ce texte à une action ?
-->

---
name: Tokens can request actions
group: Tool calling
ready: true
clicks: 1
timing: 0.4
---

<TokenCapabilities reveal-together />

<!--
Revenons à notre LLM. [click] Il génère des tokens pour répondre, raisonner ou demander l'appel d'un outil.

Le tool calling, c'est donc aussi de la génération. Mais le modèle produit des données structurées destinées à l'application. Regardons ce qu'elle en fait.
-->

---
name: The model asks, the application calls
group: Tool calling
ready: true
layout: full
clicks: 5
timing: 2.4
---

<McpToolCallWalkthrough />

<!--
On commence sans MCP. En bas, le schéma montre qui parle à qui. L'application échange avec le modèle et appelle GitHub. À gauche, on garde la conversation de l'utilisateur.

L'application indique au modèle qu'un outil create_issue est disponible. Elle lui donne son nom, ce qu'il fait et les informations à fournir. Ici, le dépôt, le titre et la description de l'issue.

[click] Le modèle demande à utiliser cet outil. Il propose les informations nécessaires à partir de notre conversation. À ce stade, aucune issue n'existe sur GitHub. On a seulement une demande d'appel.

[click] L'application reçoit cette demande. C'est elle qui possède le code pour contacter GitHub, avec les autorisations nécessaires. Elle envoie la demande de création au bon dépôt.

[click] GitHub crée l'issue et renvoie son numéro et son lien. C'est maintenant que l'action a eu lieu. Pas au moment où le modèle a produit sa réponse.

[click] L'application transmet ce résultat au modèle. Sans ce retour, il ne saurait pas si la création a réussi ou échoué.

[click] L'assistant peut alors confirmer la création de l'issue numéro 42. L'utilisateur obtient son lien et peut aller la consulter.

Voilà, on a créé une issue depuis une conversation, sans serveur MCP. Le tool calling suffit, à condition que notre application sache exécuter l'outil.

Mais qui a écrit le code pour contacter GitHub ? L'équipe de cette application. Et si on veut la même chose dans une autre application ?
-->

---
name: A shared interface for tools
group: A shared protocol
ready: true
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
group: A shared protocol
ready: true
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
name: Resources provide context
group: Other uses
ready: true
layout: ai
timing: 1.1
---

<McpResourceDemo />

<!--
Un serveur MCP peut aussi partager du contenu. C'est le rôle des ressources.

Dans notre exemple, on veut donner à l'assistant le brief du projet pour qu'il tienne compte des besoins du produit.

[Cliquer sur Add context, puis sélectionner Project brief]

Je choisis Project brief. Il apparaît comme une pièce jointe, et je peux le retirer.

[Entrée pour lancer la conversation]

Ce document ne vient pas des fichiers de notre projet. Le serveur l'expose, puis l'application récupère son contenu pour l'ajouter au contexte du modèle.

Une équipe peut ainsi rendre un même document accessible dans plusieurs applications compatibles. Ici, on fournit des informations à l'assistant, on ne lui demande pas de modifier GitHub.
-->

---
name: Prompts provide reusable messages
group: Other uses
ready: true
layout: ai
timing: 1.2
---

<McpPromptDemo />

<!--
Les prompts permettent de partager des messages réutilisables. Par exemple, une équipe peut préparer des consignes communes pour demander une revue de pull request.

[Saisir /, puis sélectionner /review_pull_request]

Notre application les présente comme des commandes. Le message vient du serveur MCP, même si une autre application peut le présenter autrement.

[Situer Repository et Pull request, puis cliquer sur Use prompt]

Je précise le dépôt et le numéro de la pull request. Le serveur me renvoie les consignes complétées avec ces informations.

[Entrée pour envoyer le message]

Récupérer le prompt n'a pas lancé la revue. J'ai choisi un message, puis je l'ai envoyé au modèle. On a préparé la demande, pas exécuté une action.

Dernière question pratique : où tourne ce serveur ?
-->

---
name: A local server over stdio
group: Connecting
ready: true
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
group: Connecting
ready: true
timing: 0.7
---

<McpServerConnection transport="http" />

<!--
Le serveur peut aussi être hébergé à distance. Avec Streamable HTTP, l'application se connecte à son URL au lieu de lancer un programme sur notre machine.

[click] Une application en ligne, comme ChatGPT, peut alors l'utiliser aussi.

Dans les deux cas, le principe reste le même. L'application découvre ce que le serveur propose et lui transmet ses demandes. Il faut simplement vérifier que le client prend en charge les fonctionnalités qu'on veut utiliser.
-->

---
name: What to remember
group: Recap
ready: true
layout: recap
timing: 0.4
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

Le modèle demande, le code exécute.

MCP permet de réutiliser une intégration depuis plusieurs applications compatibles. Il ne remplace pas le tool calling.

Et les serveurs peuvent aussi partager du contenu et des messages réutilisables.
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

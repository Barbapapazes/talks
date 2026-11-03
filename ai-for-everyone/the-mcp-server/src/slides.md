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
timing: 0.5
---

# The MCP server

<!--
Bonjour tout le monde !

Aujourd'hui, on va s'intéresser aux serveurs MCP.

Dans la session sur les LLM, on a vu qu'un modèle pouvait demander l'appel d'un outil. Mais cet outil, comment est-ce qu'on le rend disponible dans notre application ?

C'est ce qu'on va regarder ensemble. Et pour commencer, partons d'une simple conversation.
-->

---
name: A conversation without tools
group: Demo
ready: true
layout: ai
transition: slide-up
timing: 1.3
---

<McpGitHubDemo />

<!--
Imaginons qu'on travaille sur une application de suivi de projets et qu'on veuille ajouter une fonctionnalité pour éviter que l'utilisateur supprime un projet par accident.

[Entrée pour envoyer le message, puis laisser apparaître la réponse]

L'assistant nous propose une modale de confirmation dans laquelle il faut saisir le nom du projet avant de pouvoir le supprimer. Moi, ça me va.

[Entrée pour passer à la demande de création d'issue, puis l'envoyer]

Du coup, je lui demande d'en faire une issue sur GitHub.

Et là, il nous dit qu'il peut rédiger le contenu, mais qu'il ne peut pas créer l'issue.

Et en vrai, c'est assez logique. Le modèle peut produire du texte, mais ça ne lui donne pas accès à GitHub.

Il faudrait donc lui donner cet accès.
-->

---
name: From conversation to action
group: Demo
ready: true
layout: ai
timing: 0.8
---

<McpGitHubDemo with-server />

<!--
On reprend la même conversation, mais cette fois, on connecte l'application à un serveur MCP.

[Ouvrir Integrations, puis Add MCP server]

[Saisir GitHub et https://github-mcp.example.com/mcp, puis cliquer sur Connect]

Le serveur fournit l'outil create_issue.

[Cliquer sur Start conversation, puis rejouer les deux échanges avec Entrée]

Cette fois, l'application peut l'appeler et notre issue est créée.

[Ouvrir l'appel d'outil pour montrer les arguments et le résultat, puis le refermer]

On retrouve les arguments et le résultat. Alors, comment ça fonctionne ?
-->

---
name: Connecting a tool to a model
group: Connect
ready: true
layout: center-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 1.2
---

````md magic-move
```jsonc
{
  "model": "gpt-6.1-sol",
  "input": "Create an issue in acme/project-dashboard to confirm project deletion.",
  "tools": [{ /* create_issue definition */ }]
}
```
```json
{
  "type": "function",
  "name": "create_issue",
  "description": "Create an issue in a GitHub repository.",
  "parameters": {
    "type": "object",
    "properties": {
      "repository": { "type": "string" },
      "title": { "type": "string" },
      "body": { "type": "string" }
    },
    "required": ["repository", "title", "body"],
    "additionalProperties": false
  },
  "strict": true
}
```
````

<!--
Pour comprendre ça, il faut qu'on revienne à la base.

Ça, c'est la requête envoyée à l'API d'OpenAI pour demander une génération de texte. On y retrouve plusieurs informations, dont une liste d'outils.

[click] Si on regarde de plus près, on retrouve notre outil `create_issue` et sa définition complète : son nom, sa description et le schéma JSON de ses paramètres. Cette définition est fournie au LLM pour lui permettre de demander un appel d'outil.

Et cette notion de "demander" est très importante. Le modèle produit la demande, mais c'est l'application qui exécute l'appel et ajoute le résultat au contexte.

Alors tout ça, c'est très chouette, mais ça ne nous explique pas pourquoi ajouter un protocole.
-->

---
name: Why MCP?
group: Connect
ready: true
layout: full
timing: 1.4
---

<McpWhyProtocol />

<!--
Imaginons qu'on soit GitHub et qu'on veuille rendre nos API accessibles depuis différentes applications, que ce soit [click] ChatGPT, [click] Notion ou même [click] Cursor.

L'opération reste la même. Pour créer une issue, on va devoir développer, pour chaque application, un outil qui appelle nos API.

Et GitHub n'est pas le seul service concerné. [click] Pour Notion, il faut faire la même chose. Pour Slack aussi, et pour vos applications aussi.

L'idée du Model Context Protocol, ou MCP, c'est d'utiliser un protocole commun pour ces échanges.

[click] Vous développez vos outils une fois et vous pouvez les réutiliser dans toutes les applications compatibles.

Des services comme GitHub, Notion ou Slack implémentent la spécification MCP côté serveur. Des applications comme ChatGPT, Claude ou Cursor la suivent côté client.

Concrètement, on développe une seule intégration pour plusieurs usages.
-->

---
name: Connecting over stdio
group: Connect
ready: true
transition: slide-up
timing: 0.3
---

<McpServerConnection transport="stdio" />

<!--
Pour connecter le client et le serveur, on a deux possibilités. Avec stdio, l'application lance le serveur sur la même machine et communique avec lui via son entrée et sa sortie standard.
-->

---
name: Connecting over Streamable HTTP
group: Connect
ready: true
timing: 0.4
---

<McpServerConnection transport="http" />

<!--
Avec Streamable HTTP, le serveur peut être hébergé à distance, comme celui de GitHub.

[click]

Ça permet aussi aux applications en ligne, comme ChatGPT, de s'y connecter. C'est ce qu'on a fait dans la démo.

Maintenant, qu'est-ce qu'ils s'échangent ?
-->

---
name: The first exchange
group: Connect
ready: true
clicks: 2
timing: 0.5
---

<McpInitialization />

<!--
La connexion commence par trois messages.

[View message]

Le client demande l'initialisation. C'est du JSON-RPC : le champ `method` indique l'opération demandée.

[click]

Le serveur répond avec ses capacités et la version du protocole.

[click]

Le client confirme qu'il est prêt. La connexion est établie.

Alors, quelles capacités peut proposer le serveur ?
-->

---
name: MCP server capabilities
group: Primitives
ready: true
clicks: 10
layout: center-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 0.6
---

<McpToolDefinition />

<!--
Oui, il y en a même beaucoup d'autres !

Un serveur MCP ne propose pas seulement [click] des outils. Il peut aussi proposer [click] des ressources, [click] des prompts, [click] de la complétion, [click] des apps, [click] des tâches et même [click] des skills.

Aujourd'hui, on va explorer les trois premières capacités, qui sont les plus utilisées.
-->

---
name: Calling a tool
group: Primitives
ready: true
layout: ai
transition: slide-up
timing: 0.6
---

<McpToolDemo />

<!--
Commençons par les outils. Demandons à notre assistant de créer une issue. [Entrée pour envoyer le message]

On voit que le modèle demande un appel à l'outil create_issue avec des paramètres. L'application exécute l'appel, puis reçoit le résultat. C'est fait, l'issue est créée.

Sympa et vraiment pratique ! Mais qu'est-ce qui se passe sous le capot ?
-->

---
name: 'Behind the scenes: tools/call'
group: Primitives
ready: true
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 0.8
---

<BackgroundImage />

<McpProtocolInspector kind="tools" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
D'abord, notre client demande au serveur la liste des outils disponibles pour transmettre leurs définitions au LLM. Dans la réponse du serveur, on découvre create_issue.

Ensuite, quand le LLM demande un appel d'outil, le client transmet la demande au serveur MCP avec le nom de l'outil et ses arguments. C'est ce qu'on voit ici.

Le serveur reçoit la demande, exécute la fonction et renvoie une réponse. Le client ajoute le résultat au contexte, et l'agent peut continuer.
-->

---
name: 'Resources: expose content'
group: Primitives
ready: true
layout: ai
transition: slide-up
timing: 1
---

<McpResourceDemo />

<!--
Deuxième capacité, les ressources.

Cette fois, on ne veut pas créer une issue. On veut donner à l'assistant des informations supplémentaires sur notre produit.

[Cliquer sur Add context, puis sélectionner Project brief]

Je choisis le document Project brief. Il apparaît un peu comme une pièce jointe, et je peux le retirer si je change d'avis.

[Entrée pour lancer la conversation]

Ce qui est intéressant, c'est que ce document ne fait pas partie des fichiers sources de notre projet. C'est un document exposé par le serveur MCP.

On peut donc utiliser un serveur MCP pour centraliser des documents communs à plusieurs projets.
-->

---
name: 'Behind the scenes: resources/read'
group: Primitives
ready: true
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 0.3
---

<BackgroundImage />

<McpProtocolInspector kind="resources" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Même logique de découverte : le client liste les ressources, puis récupère le contenu de celle qu'on a choisie pour l'ajouter au contexte du LLM.
-->

---
name: 'Prompts: expose templates'
group: Primitives
ready: true
layout: ai
transition: slide-up
timing: 1.2
---

<McpPromptDemo />

<!--
Troisième capacité, et dernière pour aujourd'hui, les prompts.

Imaginons qu'on veuille proposer une façon commune de demander une revue de pull request, sans réécrire les consignes à chaque fois.

[Saisir /, puis sélectionner /review_pull_request]

Notre application présente les prompts sous forme de commandes. Ça ressemble à l'utilisation d'un skill dans notre projet, sauf qu'ici, le prompt est fourni à distance. On peut le retrouver dans les applications compatibles qu'on connecte à ce serveur MCP.

[Situer les champs Repository et Pull request, puis cliquer sur Use prompt]

Je précise le dépôt et le numéro de la pull request comme arguments du prompt. Le serveur me renvoie alors un message prêt à envoyer, sans que j'aie à le rédiger.

[Entrée pour envoyer le message]

Magnifique !
-->

---
name: 'Behind the scenes: prompts/get'
group: Primitives
ready: true
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 0.7
---

<BackgroundImage />

<McpProtocolInspector kind="prompts" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
Ici aussi, le client liste les prompts, puis récupère celui qu'on a choisi en lui passant les arguments. Le serveur renvoie le message complété.

La différence entre ces trois capacités tient surtout à qui décide de les utiliser. Le modèle demande les appels d'outils, l'application gère les ressources et l'utilisateur choisit les prompts.

Les ressources apportent du contexte. Les prompts fournissent des messages prêts à compléter.
-->

---
name: What to remember
group: Recap
ready: true
layout: recap
timing: 0.1
---

<RecapList
  title="What to remember"
  :items="[
    {
      title: 'A shared protocol for external capabilities',
      description: 'MCP standardizes exchanges between applications and servers.'
    },
    {
      title: 'The model asks, the app acts',
      description: 'The app calls tools on behalf of the model.'
    },
    {
      title: 'Tools, resources and prompts',
      description: 'Share more than tools. Offer content and ready-to-use prompts too.'
    }
  ]"
/>

<!--
OK, qu'est-ce qu'on retient de tout ça ?

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

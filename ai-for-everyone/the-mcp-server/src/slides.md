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
Imaginons qu'on travaille sur une application de suivi de projets et qu'on aimerait une nouvelle feature, éviter que l'utilisateur supprime accidentellement un projet.

[Entrée pour envoyer le message, puis laisser apparaître la réponse]

L'assistant nous propose une modale de confirmation dans laquelle il faut saisir le nom du projet avant de pouvoir le supprimer. Moi, ça me va.

[Entrée pour passer à la demande de création d'issue, puis l'envoyer]

Du coup, je lui demande d'en faire une issue sur GitHub.

Et là, il nous dit qu'il peut rédiger le contenu, mais que bah il peut pas créer l'issue.

Et en vrai, c'est assez logique. Le modèle peut produire du texte, mais ça ne lui donne pas un accès à GitHub.

Il faudrait qu'on lui rajoute ce accès.
-->

---
name: From conversation to action
group: Demo
ready: true
layout: ai
timing: 1.5
---

<McpGitHubDemo with-server />

<!--
[Ouvrir Integrations, puis Add MCP server]

Pour ça, on va recommencer l'échange avec notre agent mais au préalable, on va lui connecter un serveur MCP.

[Saisir GitHub et https://github-mcp.example.com/mcp, puis cliquer sur Connect]

Ok, trop bien, notre MCP nous met à disposition un nouvel outil, create_issue.

[Cliquer sur Start conversation, puis rejouer les deux échanges avec Entrée]

Donc on va lui faire la même demande et une fois de plus, lui demande de créer l'issue.

Cette fois, on voit un appel à create_issue, puis la confirmation. Notre issue numéro 42 a été créée.

[Ouvrir l'appel d'outil pour montrer les arguments et le résultat, puis le refermer]

Et si on se penche sur le tool call, on y retrouve le dépôt, le titre et le contenu de l'issue avec le résultat de l'opération.

Magnifique ! Simplement avec un serveur MCP ! Mais concrètement, comment ça fonctionne ?
-->

---
name: Connecting a tool to a model
group: Connect
ready: true
layout: center-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
positionClass: w-200
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

Ça, c'est la requête envoyée à l'API d'OpenAI pour demander la génération de texte. On retrouve pleins d'infos dont une liste de tools.

[click] Si on regarde d'un peu plus proche, on y retrouve notre tool `create_issue` et tout sa définition : nom, description et schéma JSON. C'est ce contenu qu'est dans le système prompt pour permettre au LLM de demander un appel.

Et cette notion de "demander" elle est hyper important parce que si c'est le modèle qui produit la demande, c'est l'application qui l'exécute et renvoie le résultat dans le context.

Alors tout ça, c'est très chouette, mais ça nous explique pas pourquoi ajouter un protocol.
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
Imaginons, on est GitHub et on a des API qu'on aimerait bien appeler depuis différents systèmes que ce soit [click] ChatGPT, [click] Notion ou même [click] Cursor.

Bah l'opération ce sera toujours la même. Pour créer une issue, on va devoir à chaque fois créer un tool qui appellera nos API.

Le truc c'est que bah il est pas tout seul. [click] Notion, on va devoir faire la même chose, Slack aussi et vos applications aussi.

L'idée avec Model Context Protocol, MCP, c'est d'utiliser un protocole commun pour ces échanges.

[click] Vous développez vos tools une fois et vous pouvez les utiliser partout.

GitHub, Notion ou Slack implémentent la spec MCP côté serveur et des applications comme ChatGPT, Claude ou Cursor suivent la spec MCP côté client.

Concrètement, ça permet un développeur pour plusieurs usages.
-->

---
name: Connecting over stdio
group: Connect
ready: false
transition: slide-up
timing: 0.9
---

<McpServerConnection transport="stdio" />

<!--
Première possibilité, il tourne sur notre ordinateur.

Dans l'application, on a un client MCP. C'est lui qui communique avec le serveur, pas le modèle.

Avec stdio, l'application lance un processus serveur et échange des messages avec lui par son entrée et sa sortie standard.

[click] C'est donc l'application qui gère le lancement et l'arrêt de ce processus.

Local ne veut pas dire sans réseau. Notre serveur peut très bien appeler l'API GitHub sur Internet.

Et si on ne veut pas lancer ce serveur sur notre machine ?
-->

---
name: Connecting over Streamable HTTP
group: Connect
ready: false
timing: 1
---

<McpServerConnection transport="http" />

<!--
On peut aussi déployer le serveur séparément et s'y connecter avec Streamable HTTP.

C'est le cas qu'on a illustré dans la démo. On saisit une URL, et le client MCP de l'application se connecte à cette adresse. Il ne lance pas le serveur.

[click] Et notre application peut elle-même être hébergée en ligne, comme ChatGPT ici. Le serveur distant n'est pas réservé aux applications installées sur notre ordinateur.

Dans les deux cas, le modèle ne parle pas directement au serveur MCP. C'est toujours le client, dans l'application, qui s'en charge.

Alors, quand on clique sur Connect, qu'est-ce qu'ils se disent ?
-->

---
name: The first exchange
group: Connect
ready: false
clicks: 2
timing: 2
---

<McpInitialization />

<!--
Avant de récupérer les outils, le client et le serveur commencent par initialiser leur connexion.

[Ouvrir View message sur initialize]

Le client envoie initialize. On peut lire le message sans connaître tout JSON-RPC.

method indique l'opération demandée, params contient ses paramètres, et id permettra de retrouver la réponse correspondante.

Ici, le client annonce la version de MCP qu'il prend en charge, son identité et ses capacités. La version de JSON-RPC, tout en haut, est une autre information.

[Fermer la modale, puis click. Ouvrir la réponse du serveur]

Le serveur répond avec le même id. Il annonce lui aussi une version et ses capacités. Pour continuer, les deux doivent pouvoir utiliser la même version du protocole.

Dans cet exemple, le serveur annonce tools. Ça veut dire qu'il propose des outils. On n'a pas encore leur liste, et ça ne nous donne pas une autorisation sur GitHub.

[Fermer la modale, puis click. Ouvrir notifications/initialized]

Enfin, le client signale qu'il est prêt. Cette fois, il n'y a pas d'id. C'est une notification, elle n'attend pas de réponse.

[Fermer la modale, puis click]

Maintenant, on peut découvrir ce que le serveur propose.

[Référence technique, hors texte oral]
Exemples basés sur MCP 2025-11-25. project-chat et github-mcp sont fictifs.
https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle
-->

---
name: MCP server capabilities
group: Primitives
ready: true
clicks: 10
layout: center-card
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 0.5
---

<McpToolDefinition />

<!--
Un serveur MCP, ça ne paraît pas que d'exposer [click] des tools, ça permet aussi d'exposer [click] des ressources, [click] des prompts, [click] de la completions, [click] des apps, [click] des tasks et même [click] des skills.

Nous on va plutôt explorer les trois premiers aujourd'hui.
-->

---
name: Calling a tool
group: Primitives
ready: false
layout: ai
transition: slide-up
timing: 0.9
---

<McpToolDemo />

<!--
On retrouve notre demande de création d'issue, avec le dépôt, le titre et la description.

[Entrée pour envoyer le message, puis Entrée pour terminer l'animation si nécessaire]

Le modèle demande create_issue. L'application peut demander une confirmation selon l'opération et ses réglages, puis elle fait exécuter l'appel par son client MCP.

Le serveur crée l'issue et renvoie un résultat. L'application transmet ensuite ce résultat au modèle, qui peut nous confirmer la création.

Ici, ça reste bien sûr une simulation.

Mais à quoi ressemble l'échange entre le client et le serveur ?
-->

---
name: 'Behind the scenes: tools/call'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 1.3
---

<BackgroundImage />

<McpProtocolInspector kind="tools" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
[Montrer la requête tools/call]

On retrouve une requête JSON-RPC, comme pendant l'initialisation. Cette fois, la méthode s'appelle tools/call.

Dans les paramètres, on a le nom de l'outil et ses arguments. repository, title et body viennent de notre outil fictif. MCP ne nous impose pas ces noms.

Attention à la différence. Le modèle a demandé un appel d'outil. C'est le client MCP qui construit et envoie cette requête au serveur.

[Passer sur Response]

Le serveur fait l'opération auprès de GitHub, puis renvoie le résultat. Le même id permet de l'associer à la requête.

[Ouvrir tools/list, puis montrer Request et Response]

Et pour découvrir l'outil au départ, le client utilise tools/list. Le serveur lui donne les définitions disponibles, que l'application peut ensuite présenter au modèle.

On a donc deux moments distincts, découvrir l'outil et l'appeler.
-->

---
name: 'Resources: expose content'
group: Primitives
ready: false
layout: ai
transition: slide-up
timing: 1.3
---

<McpResourceDemo />

<!--
Deuxième possibilité, les resources.

Cette fois, on ne veut pas créer une issue. On veut donner à l'assistant des informations sur notre produit.

[Cliquer sur Add context, puis sélectionner Project brief]

Je choisis Project brief. C'est un document qui décrit notre application, Project Dashboard. Il apparaît en pièce jointe, et je peux le retirer si je change d'avis.

[Entrée pour lancer la conversation]

L'application récupère le contenu de ce document auprès du serveur et l'ajoute au contexte envoyé au modèle.

Le serveur ne glisse donc pas automatiquement ses documents dans toutes nos conversations. C'est l'application qui décide comment les utiliser. Ici, elle me laisse choisir.

On pourrait aussi exposer la lecture d'un document comme un outil. Avec une resource, on le présente comme du contenu à récupérer.
-->

---
name: 'Behind the scenes: resources/read'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 1.1
---

<BackgroundImage />

<McpProtocolInspector kind="resources" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
[Montrer la requête resources/read]

Pour lire notre document, le client envoie resources/read avec son URI.

Ici, elle commence par docs://. C'est un choix de notre serveur fictif, pas un format que toutes les resources MCP doivent utiliser.

[Passer sur Response]

Le serveur renvoie le contenu du document. On retrouve contents, au pluriel, qui contient ici du texte.

Cette réponse n'est pas une réponse du modèle. On a seulement récupéré des données. C'est ensuite l'application qui peut les ajouter au contexte.

[Ouvrir resources/list, puis montrer Response]

Et comme pour les outils, on peut d'abord découvrir les ressources disponibles avec resources/list. On retrouve leur URI, leur nom et éventuellement leur type de contenu.
-->

---
name: 'Prompts: expose templates'
group: Primitives
ready: false
layout: ai
transition: slide-up
timing: 1.4
---

<McpPromptDemo />

<!--
Troisième possibilité, les prompts.

Imaginons qu'on veuille proposer une façon commune de demander une revue de pull request, sans réécrire les consignes à chaque fois.

[Saisir /, puis sélectionner /review_pull_request]

Notre application présente les prompts sous forme de commandes. C'est un choix d'interface, MCP n'impose pas cette présentation.

[Situer les champs Repository et Pull request, puis cliquer sur Use prompt]

Je précise le dépôt et le numéro de la pull request. Le serveur utilise ces arguments pour préparer le message.

Et là, regardez, le texte est dans la saisie. On n'a encore rien envoyé au modèle.

[Entrée pour envoyer le message]

L'assistant nous demande le diff. C'est normal, notre prompt contient des consignes de revue, mais pas le contenu de la pull request.

Récupérer un prompt, ça ne lit pas automatiquement le dépôt et ça ne lance pas une revue tout seul.
-->

---
name: 'Behind the scenes: prompts/get'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
timing: 1.1
---

<BackgroundImage />

<McpProtocolInspector kind="prompts" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
[Montrer la requête prompts/get]

Côté protocole, on appelle prompts/get avec le nom du prompt et les arguments.

Les valeurs sont des chaînes de caractères, même pour le numéro de la pull request.

[Passer sur Response]

Le serveur renvoie des messages préparés à partir de ces arguments. Il ne renvoie pas une réponse du modèle, et il n'a pas démarré de génération.

[Ouvrir prompts/list, puis montrer Response]

Pour découvrir les prompts disponibles et les arguments qu'ils attendent, le client utilise prompts/list.

On retrouve donc la même logique de découverte, puis d'utilisation, mais ce qu'on récupère n'est pas la même chose. Ici, ce sont des messages prêts à utiliser.
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
Ok, qu'est-ce qu'on retient de tout ça ?

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

Si vous avez un feedback, c'est sur le premier QR code et le second vous permet de vous abonner à la newsletter pour ne rien manquer des prochains épisodes !

Merci !
-->

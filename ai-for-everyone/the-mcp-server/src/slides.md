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
ready: false
---

# The MCP server

<!--
Contenu attendu :
Présenter la session AI for Everyone consacrée au serveur MCP.
Annoncer l'objectif : comprendre comment une application utilisant un LLM accède à des capacités externes.

Les titres et interfaces seront en anglais, les notes orales en français.
Un seul serveur MCP GitHub fictif servira d'exemple pendant toute la présentation.
Objectif de durée pour la présentation complète : environ 15 minutes.
-->

---
name: A conversation without tools
group: Demo
ready: false
layout: ai
transition: slide-up
---

<McpGitHubDemo />

<!--
Contenu attendu :
Première moitié de la démo, avec le composant de chat existant.
Prévoir de revoir son architecture et de l'affiner si nécessaire pour les deux slides.

1. L'utilisateur demande une nouvelle fonctionnalité pour éviter les suppressions accidentelles de projets.
2. L'assistant propose une modale de confirmation où saisir le nom du projet avant sa suppression.
3. L'utilisateur accepte la proposition et demande d'en faire une issue sur GitHub.
4. L'assistant explique qu'il peut rédiger l'issue, mais ne peut pas la créer sans accès à GitHub.

Faire progresser la conversation par étapes, sans serveur MCP ni outil disponible.
Aucun appel réseau, token ou écriture GitHub réelle.

Transition orale : ajoutons l'accès à GitHub, puis reprenons exactement la même conversation.
-->

---
name: From conversation to action
group: Demo
ready: false
layout: ai
---

<McpGitHubDemo with-server />

<!--
Contenu attendu :
Seconde moitié de la démo, avec le même composant de chat.
Commencer par la configuration interactive d'un serveur MCP GitHub fictif.

Proposition de setup à affiner lors de l'implémentation :
1. Ouvrir un panneau Integrations dans l'application, puis cliquer sur Add MCP server.
2. Saisir le nom GitHub et une URL fictive, par exemple https://github-mcp.example.com/mcp.
3. Cliquer sur Connect et afficher l'état Connected, puis la disponibilité de create_issue.
   C'est l'application, via son client MCP, qui découvre l'outil, pas le modèle.
   Cette simulation ne représente pas un parcours réel d'authentification à GitHub.
4. Fermer le panneau et commencer un nouveau chat, sans reprendre l'historique de la première slide.

Rejouer la même conversation que sur la première slide :
1. L'utilisateur demande la même fonctionnalité pour éviter les suppressions accidentelles.
2. L'assistant propose la même modale de confirmation.
3. L'utilisateur accepte et demande d'en faire une issue sur GitHub.
4. Afficher un indicateur compact d'appel à create_issue, avec un état en cours puis terminé.
5. L'assistant confirme la création de l'issue fictive #42, Require confirmation before deleting a project.

Garder les mêmes messages utilisateur et la même proposition de fonctionnalité sur les deux slides.
Seule la capacité à créer l'issue change après la connexion au serveur.
Utiliser une présentation compacte de l'appel d'outil, inspirée de https://ui.nuxt.com/docs/components/chat-tool.
Les arguments et le résultat restent masqués par défaut. Cliquer sur l'appel d'outil pour les afficher en JSON, puis cliquer à nouveau pour les masquer.
Pour la suite, conserver le titre ci-dessus et le contenu de l'issue :
Before deleting a project, show a confirmation dialog requiring the user to type the project's name.

Distinguer la disponibilité de l'outil après connexion et son appel dans la conversation.
Aucun appel réseau, token ou écriture GitHub réelle, même lors de la saisie de l'URL.
Prévoir environ 3 à 4 minutes pour l'ensemble des deux slides.

Transition orale : comment l'application a-t-elle découvert cet outil, puis exécuté la demande du modèle ?
-->

---
name: Why MCP?
group: Connect
ready: false
---

# Why MCP?

<!--
Contenu attendu :
Montrer plusieurs applications et services reliés par des intégrations spécifiques.
Faire évoluer le visuel vers une interface MCP commune entre applications et serveurs.
Expliquer ce que le protocole standardise et le travail d'intégration qui reste nécessaire.

Comparer brièvement MCP, API REST et CLI.
Ces interfaces sont complémentaires : notre serveur MCP peut appeler l'API GitHub ou une CLI.
MCP ne remplace ni l'API GitHub, ni le mécanisme de tool calling du modèle.
Ne pas ajouter de slide d'architecture dédiée.
-->

<!--

faut d'abort comprendre comment on ajouter des tools à un llm (mettre du code) et ensuite passer via un mcp et donc on uniform les interfaces et on permet à n'importe qui d'ajouter un mcp, on l'a vu dans l'example d'avant, en quelques clicks, vous avez connecté un mcp

le problème du cli c'est qu'il faut un interpreteur donc un computer et ça couter cher, c'est aussi beaucoup de complexité

 -->

---
name: Connecting to a server
group: Connect
ready: false
---

# Connecting to a server

<!--
Contenu attendu :
Deux variantes d'un schéma simple pour situer les transports.
L'application hôte contient le client MCP, qui communique avec le serveur MCP.

Variante locale : un processus serveur, avec échanges via stdio.
Variante distante : un serveur accessible via Streamable HTTP.
Présenter les différences de déploiement et de gestion de connexion sans détailler HTTP.
Le serveur GitHub peut ensuite appeler l'API GitHub dans les deux cas.
Le modèle ne parle pas directement MCP.
-->

<!--

là, on rentre dans de la technique et faut montrer tout ce qu'on peut faire avec, dans les grandes lignes

 -->

---
name: The first exchange
group: Connect
ready: false
---

# The first exchange

<!--
Contenu attendu :
Introduire l'enveloppe JSON-RPC 2.0 à partir de l'initialisation de la connexion.
Révéler progressivement la requête initialize, la réponse et notifications/initialized.
Mettre en évidence la version du protocole et les capacités échangées.

Identifier jsonrpc, id, method, params et result ou error.
Expliquer qu'une notification n'attend pas de réponse et n'a pas d'id.
Annoncer la capacité tools ne transmet pas la liste des outils : la découverte vient ensuite.
Une capacité annoncée ne constitue pas une autorisation d'accès à GitHub.

Les exemples JSON seront ajoutés après vérification de la spécification MCP en vigueur.
-->

<!-- mettre en place l'inspector pour voir ce qu'ily a dedans -->

---
name: 'Tools: expose operations'
group: Primitives
ready: false
---

# Tools: expose operations

<!--
Contenu attendu :
Reprendre l'outil create_issue découvert dans la démo.
Expliquer son usage, son nom, sa description et le schéma de ses paramètres.
Montrer tools/list et sa réponse avec la définition de create_issue.
Relier cette découverte à l'apparition de l'outil dans l'application.

Garder le même serveur, le même dépôt fictif et les mêmes noms pendant toute la session.
Les descriptions et schémas permettent à l'application de présenter les outils au modèle.
Le serveur expose une opération qui peut avoir des effets sur un système externe.
-->

<!-- les différentes étapes possible, avec le visuel et le code (ou les call réseaux), avec une slide un peu comme les différentes capacités des outils -->

---
name: Calling a tool
group: Primitives
ready: false
layout: ai
transition: slide-up
---

<McpToolDemo />

<!--
Reprendre create_issue et l'issue fictive #42 de la démo.
Le modèle demande une opération, l'application l'exécute via son client MCP.
Une confirmation utilisateur peut précéder l'exécution selon l'hôte et l'opération.
Simulation uniquement, aucune écriture GitHub réelle.
Appuyer sur Entrée pour envoyer le message, puis pour terminer l'animation.
-->

---
name: 'Behind the scenes: tools/call'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpProtocolInspector kind="tools" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
L'inspecteur s'ouvre sur tools/call. Sélectionner Request ou Response à la souris.
Cliquer sur tools/list pour montrer la découverte si besoin. Les onglets restent sélectionnables à la souris.
Le nom repository est un paramètre de notre outil fictif, pas un champ imposé par MCP.
Distinguer la demande structurée du modèle de la requête JSON-RPC du client.
Le serveur appelle ensuite l'API GitHub, puis renvoie le résultat à l'application.
L'id relie la réponse à la requête. MCP utilise JSON-RPC, pas gRPC.
-->

---
name: 'Resources: expose content'
group: Primitives
ready: false
layout: ai
transition: slide-up
---

<McpResourceDemo />

<!--
Cliquer sur Add context au-dessus de la saisie, puis sélectionner Project brief dans la liste.
Les documents sélectionnés apparaissent à côté du bouton sous forme de pièces jointes amovibles.
On peut ajouter plusieurs documents. Utiliser Project brief pour cet exemple, puis lancer la conversation avec Entrée.
L'application lit la ressource sélectionnée et ajoute son contenu au contexte.
La ressource n'est pas automatiquement injectée dans le contexte du modèle.
Le document produit Project brief décrit Project Dashboard, une application de suivi de projets.
Les autres ressources donnent la politique de suppression et des retours clients, pas des fichiers du dépôt.
Lire ce fichier pourrait aussi être exposé comme un outil, selon le serveur et l'hôte.
-->

---
name: 'Behind the scenes: resources/read'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpProtocolInspector kind="resources" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
L'inspecteur s'ouvre sur resources/read. Sélectionner Request ou Response à la souris.
resources/list reste accessible dans la liste à gauche.
resources/list renvoie une liste resources avec uri, name et éventuellement mimeType.
L'URI docs:// est un choix de notre serveur fictif, pas un format universel MCP.
resources/read renvoie contents au pluriel, contrairement à content pour les outils.
La lecture seule ne lance pas le modèle. C'est l'application qui prépare le contexte.
-->

---
name: 'Prompts: expose templates'
group: Primitives
ready: false
layout: ai
transition: slide-up
---

<McpPromptDemo />

<!--
Saisir / dans la saisie, puis sélectionner /review_pull_request dans les suggestions, ou appuyer sur Entrée.
La commande ouvre une modale avec Repository et Pull request, préremplis pour la démo et modifiables.
Cancel ou Échap ferme la modale sans préparer de message.
Cliquer sur Use prompt pour récupérer le message à partir de ces arguments.
Le texte apparaît dans la saisie sans lancer le modèle. Appuyer ensuite sur Entrée pour l'envoyer.
Le prompt ne lit pas la pull request et n'exécute aucune action à lui seul.
L'assistant demande le diff, car le modèle de demande ne le contient pas.
-->

---
name: 'Behind the scenes: prompts/get'
group: Primitives
ready: false
img: https://images.unsplash.com/photo-1579792685643-a4bb28186899?auto=format&fit=crop&w=2340&q=80
---

<BackgroundImage />

<McpProtocolInspector kind="prompts" class="absolute top-20 left-40 -right-px -bottom-px" />

<!--
L'inspecteur s'ouvre sur prompts/get. Sélectionner Request ou Response à la souris.
prompts/list reste accessible dans la liste à gauche.
prompts/list décrit les prompts disponibles et leurs arguments.
Les valeurs des arguments de prompts/get sont des chaînes, y compris le numéro de PR.
La réponse contient des messages prêts à utiliser, pas une réponse du modèle.
Le serveur n'a ni exécuté la revue ni démarré une génération.
-->

---
name: MCP Apps
group: Apps
ready: false
layout: ai
---

<McpAppsDemo />

<!--
Contenu attendu :
Demander les issues ouvertes de acme/project-dashboard et montrer l'appel list_issues.
Une interface interactive apparaît dans le chat à la place d'une liste en texte.
Filtrer sur enhancement, puis ouvrir l'issue #42 créée dans la première démo.
Revenir à la liste avec Back to issues. Ces interactions ne nécessitent pas de nouveau message au modèle.
Il s'agit d'une illustration fictive en Vue, pas d'une intégration MCP Apps réelle.
Expliquer comment une ressource UI et son rendu par l'hôte permettent cette expérience.

Situer MCP Apps parmi les extensions du protocole.
Distinguer ce qui est standardisé, proposé ou spécifique à un hôte.
Vérifier la documentation MCP Apps et son statut avant de préparer les visuels et exemples.
Rester sur une présentation courte, sans détailler l'implémentation d'une app.
-->

---
name: What to remember
group: Recap
ready: false
layout: recap
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
Contenu attendu :
Récapituler le rôle de MCP et les trois primitives exposées par le serveur.
MCP standardise les échanges entre une application et des capacités externes.
L'application orchestre les interactions avec le modèle et le serveur MCP.
Tools expose des opérations, resources du contenu et prompts des modèles de demande.

Reprendre les exemples create_issue, Project brief et review_pull_request.
Ne pas ajouter de slide questions/pratique, de slide dédiée aux limites ou de construction de serveur.
Réserver sampling, elicitation et roots à la session sur le client MCP.
Ne pas développer Code Mode dans cette session.
-->

---
name: outro
layout: outro2
ready: false
---

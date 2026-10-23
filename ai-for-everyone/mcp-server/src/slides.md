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
name: From conversation to action
group: Demo
ready: false
---

# From conversation to action

<!--
Contenu attendu :
Une seule slide interactive pour toute la démo, avec une progression par étapes.
Conserver le même chat et son état pendant la séquence.

1. L'utilisateur propose d'exiger une confirmation avant de supprimer un projet.
2. L'assistant propose une modale où saisir le nom du projet.
3. L'utilisateur demande de créer une issue GitHub.
4. L'assistant peut rédiger l'issue, mais ne peut pas la créer sans accès au dépôt.
5. Ouvrir les intégrations de l'application et activer un faux serveur MCP GitHub.
6. Montrer une étape de découverte : l'outil create_issue devient disponible.
   C'est l'application, via son client MCP, qui découvre l'outil, pas le modèle.
7. Revenir au chat et demander à nouveau la création de l'issue.
8. Montrer un appel create_issue avec des arguments inspectables :
   title = Require confirmation before deleting a project
   body = Before deleting a project, show a confirmation dialog requiring the user to type the project's name.
9. Montrer un résultat fictif avec issue_number = 42, puis la confirmation de l'assistant.

Distinguer visuellement la découverte de l'outil et le choix du modèle de l'appeler.
Permettre de déplier les arguments et le résultat, de revenir en arrière et de réinitialiser.
Afficher Simulation en permanence. Aucun appel réseau, token ou écriture GitHub réelle.
Prévoir environ 3 à 4 minutes pour cette slide.

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

---
name: Calling a tool
group: Primitives
ready: false
---

# Calling a tool

<!--
Contenu attendu :
Rejouer l'appel create_issue de la démo avec les messages techniques correspondants.
Montrer tools/call avec name et arguments, puis le résultat contenant l'issue fictive #42.
Synchroniser la lecture de l'échange avec l'événement d'appel d'outil dans le chat.

Distinguer la demande structurée du modèle et l'appel MCP envoyé par le client.
L'application orchestre l'appel, le serveur exécute l'opération et renvoie le résultat.
L'application fournit ensuite le résultat au modèle pour qu'il réponde à l'utilisateur.
Situer une éventuelle confirmation utilisateur avant l'exécution, sans ajouter de slide dédiée.
-->

---
name: 'Resources: expose content'
group: Primitives
ready: false
---

# Resources: expose content

<!--
Contenu attendu :
Commencer par l'usage : ajouter le README du dépôt au contexte dans l'application.
Présenter le fichier comme une ressource lisible identifiée par une URI.
Montrer progressivement resources/list, puis resources/read et le contenu renvoyé.

Conserver le motif usage concret, puis échange JSON-RPC.
Expliquer à l'oral que lire le même fichier pourrait aussi être exposé comme un outil.
Le choix dépend de la manière dont le serveur expose le contenu et dont l'hôte le rend accessible.
Ne pas laisser entendre qu'une ressource est automatiquement injectée dans le contexte du modèle.
-->

---
name: 'Prompts: expose templates'
group: Primitives
ready: false
---

# Prompts: expose templates

<!--
Contenu attendu :
Commencer par l'usage : sélectionner le prompt review_pull_request dans l'application.
Renseigner le dépôt et le numéro de pull request fictifs.
Montrer prompts/list, puis prompts/get avec ses arguments et les messages renvoyés.

Un prompt est un modèle de demande réutilisable publié par le serveur.
Il ne constitue pas une action exécutable et ne lance pas le modèle à lui seul.
Conserver le motif usage concret, puis échange JSON-RPC.
-->

---
name: MCP Apps
group: Apps
ready: false
---

# MCP Apps

<!--
Contenu attendu :
Montrer une petite interface interactive d'issues GitHub affichée dans le chat.
Il s'agit d'une seconde illustration fictive, pas d'une intégration réelle.
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
---

# What to remember

<!--
Contenu attendu :
Récapituler le rôle de MCP et les trois primitives exposées par le serveur.
MCP standardise les échanges entre une application et des capacités externes.
L'application orchestre les interactions avec le modèle et le serveur MCP.
Tools expose des opérations, resources du contenu et prompts des modèles de demande.

Reprendre les exemples create_issue, README et review_pull_request.
Ne pas ajouter de slide questions/pratique, de slide dédiée aux limites ou de construction de serveur.
Réserver sampling, elicitation et roots à la session sur le client MCP.
Ne pas développer Code Mode dans cette session.
-->

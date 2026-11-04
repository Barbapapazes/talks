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
title: "How AI agents work"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: ai,llm,agents,tool-calling,permissions
event: AI for Everyone
name: How AI agents work
group: Introduction
ready: true
timing: 0.6
---

# How AI agents work

<!--
Bonjour tout le monde !

Dans LLM fundamentals, on a vu comment un modèle génère des tokens pour répondre, raisonner ou demander un outil.

Aujourd'hui, comment passe-t-on de cette demande à un système capable d'enchaîner les actions ?

On va suivre un exemple : trouver un bug et le corriger. Même modèle, même objectif, mais des outils et des modes d'exécution différents.
-->

---
name: What is an AI agent?
group: Introduction
layout: center-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop
positionClass: w-160
ready: true
timing: 0.4
---

<div class="text-xl font-bold">
  An AI agent uses a model to choose actions <span class="text-primary">toward a goal</span>.<br /><br />
  It acts through tools, observes the results, and decides what to do next.
</div>

<!--
Un agent utilise un modèle pour choisir des actions et atteindre un objectif. Il observe les résultats et décide de la suite, sans qu'on lui dicte chaque étape.

Son autonomie dépend des outils et des permissions qu'on lui donne.
-->

---
name: From tokens to actions
group: Understand
ready: true
timing: 1.3
clicks: 2
---

<TokenCapabilities reveal-together loop />

<!--
[click] On retrouve les capacités du LLM qu'on avait vu dans un épisode précédent : répondre, raisonner ou demander l'appel à un outil.

[click] Ce qu'est intéressant, c'est qu'on peut faire boucler cette génération. Dans ce cas, le résultat d'un outil par example rejoint le contexte et permet au modèle de continuer et de choisir à nouveau : répondre, raisonner ou demander l'apple à un outil.

Il peut ainsi lire du code, demander une correction, puis des tests. Une réponse finale peut arrêter la boucle. Ce qui compte, c'est que le modèle choisit la prochaine action à partir des informations disponibles, plutôt que de suivre une liste d'étapes entièrement fixée à l'avance comme le fait un workflow.

Mais qui exécute les demandes et rappelle le modèle ? Le modèle lui même ?
-->

---
name: The model and its harness
group: Understand
ready: true
timing: 1.9
clicks: 8
---

<AgentHarness />

<!--
Non et pour s'en rendre compte, rentrons dans ce qu'est [click] un agent.

Pour faire un agent, on a besoin [click] d'un modèle, peut-importe [click] le provider.

On a aussi besoin [click] d'un harness. C'est donc cet ensemble modèle et harness qui forme l'agent.

Dans le harness, on trouve :

- [click] La bouche agentique qui permet justement au modèle de looper arpès chacune de ses actions
- La création du contexte avec le prompt système, l'agents.md, les skills, les tools, ...
- [click] L'exécution des tools demandé par l'agent, qui s'execute dans un environnement, en dehors de l'agent, comme votre machine par example.
- La gestion des permissions pour éviter que le modèle puisse demander tout et n'importe quoi
- [click] On peut aussi avoir dans l'agent une notion d'était persistant, de mémoire entre les prompts ou entre les agents.
- Enfin, on retrouve le contrôle de l'éxecution avec la gestion des logs et des limites. C'est là qu'on retrouve la compaction par example.

Côté harness, on retrouve Claude Code, OpenCode, Codex, Pi. Et ce qui va les différenciers, c'est la manière dont il approche chacunes de ses problématiques.
-->

---
name: A brain and hands
group: Understand
layout: center-y
ready: true
timing: 0.6
---

<BrainAndHands />

<!--
Pour retenir cette séparation, imaginez un cerveau et des mains.

Le cerveau, ici, c'est le modèle et le harness : choisir la suite et organiser la boucle.

Les mains, ce sont les outils et leur environnement d'exécution : lire, modifier, tester avec un runtime qui limite leurs actions.

Maintenant qu'on a bien compris cette séparation, regardons leurs échanges.
-->

---
name: Decide, act, observe
group: Understand
ready: true
timing: 1.7
clicks: 13
---

<AgentLoop :step="$clicks" />

<!--
Objectif : corriger un bug. Cette trace est scénarisée, y compris les résumés de raisonnement. En dessous, on suit le contexte envoyé au modèle.

[click] Le harness ajoute l'objectif de l'utilisateur, puis appelle le modèle.

[click] Le modèle choisit d'inspecter le calcul du panier.

[click] Il demande une lecture. Aucun fichier n'est encore lu.

[click] Le harness vérifie les arguments et les permissions.

[click] L'outil exécute la lecture dans les limites du runtime.

[click] La remise est soustraite deux fois. Le résultat rejoint l'historique et le harness rappelle le modèle. Premier tour complet.

[click] Le modèle identifie la correction.

[click] Il demande de retirer la deuxième soustraction.

[click] Même mécanisme : contrôles, édition, résultat, nouvel appel.

[click] Maintenant, il prépare la vérification.

[click] Il demande les tests. Modifier le fichier ne suffit pas.

[click] Leur résultat rejoint aussi le contexte.

[click] Les douze tests passent ici. Le modèle répond et le harness arrête l'exécution, sans garantie d'absence d'autres bugs.

Une erreur, une annulation ou une limite de budget peuvent aussi arrêter la boucle.
-->

---
name: Four ways to run an agent
group: Configure
ready: true
timing: 1.7
clicks: 5
---

<HarnessLoadout :step="$clicks" />

<!--
La question qu'on peut se poser maintenant, c'est la manière dont on veut travailler avec ces agents. On ne veut pas toujours être dernière sa machine à regarder l'agent tourner, c'est pas toujours pertinant et justement, il exsite différentes configurations pour un agent qui utiliserait un même harness.

Le point important sur ces quatres configurations, c'est qu'elle ne sont pas mutiellement exclusive.

Prenons la première.

[click] En conversation, on échange et on guide la suite. On peut aussi connecter des outils.

[click] Pour le code, on donne accès aux fichiers et aux tests. Il faut encadrer ces accès, surtout avec un terminal.

[click] En arrière-plan, une file de tâches et des notifications permettent de partir faire autre chose. Il faut conserver la trace du travail.

[click] Avec la délégation, plusieurs agents ont chacun leur contexte et leurs permissions. Un coordinateur rassemble leurs résultats. Ça ajoute aussi du travail de coordination.

[click] Un agent peut combiner tout ça.

Je vous propose qu'on se plonge concrètement dans différentes situations pour visualiser ces différentes modes de fonctionnement.
-->

---
name: Without repository tools
group: Demo
layout: full
ready: true
timing: 0.5
clicks: 2
---

<AgentDemo mode="conversation" :step="$clicks" />

<!--
[click] Sans moyen d'accéder au code source, l'assistant nous demande le code et les tests.

[click] Il n'a rien lu ni modifié. Et ça, c'est parce que dans ce mode conversation, celui qu'on retrouve sur ChatGPT par example, manque d'outils pour le faire.

Alors ajoutons-les !
-->

---
name: Read, edit, test, repeat
group: Demo
layout: full
ready: true
timing: 1.5
clicks: 10
---

<AgentDemo mode="repository" :step="$clicks" />

<!--
Même modèle, même objectif. On ajoute lecture, édition et tests. Ici, ces actions sont autorisées sans confirmation humaine, mais contrôlées à chaque appel.

À gauche, la conversation. À droite, le projet et les résultats.

[click] Le modèle demande les fichiers.

[click] L'outil les retourne. Remise en double, et total attendu positif ou nul.

[click] Le modèle demande une première correction.

[click] L'édition est appliquée.

[click] Il demande les tests.

[click] Échec : vingt euros moins trente donne moins dix, au lieu de zéro.

[Laisser l'échec visible.]

[click] Avec ce résultat, il demande de borner le total à zéro.

[click] La deuxième édition est appliquée. Le test affiché correspond encore à l'ancienne version. Il faut le relancer pour vérifier le nouveau code.

[click] Il redemande les tests.

[click] Les deux cas passent. Le code est prêt à être revu, pas déployé.

Le résultat d'un outil a donc changé la décision suivante.
-->

---
name: Keep working in the background
group: Demo
layout: full
ready: true
timing: 1.2
clicks: 4
---

<AgentDemo mode="background" :step="$clicks" />

<!--
On repart du bug initial, avec les mêmes outils et permissions. Cette fois, la tâche attend dans une file.

[click] Le worker démarre la même boucle de lecture, correction et tests.

[click] Je quitte la conversation pour ma liste de tâches. Le worker continue sans moi. En revanche, reprendre après une panne demande un mécanisme prévu pour conserver l'état. Fermer la conversation et interrompre le worker sont deux choses différentes.

[click] Une notification annonce la fin. Les tests passent, le résultat attend ma revue.

[click] J'ouvre le résultat. On retrouve les appels et leurs résultats, y compris le test en échec et la deuxième correction.

La conversation fermée n'a pas arrêté le travail. Completed veut dire terminé, pas déployé.
-->

---
name: Delegate part of the work
group: Demo
layout: full
ready: true
timing: 1.1
clicks: 4
---

<AgentDemo mode="delegation" :step="$clicks" />

<!--
Dernière configuration. Même bug, même modèle pour le coordinateur et les deux sous-agents.

[click] Le coordinateur délègue la lecture du code et celle des tests. Chaque sous-agent a son contexte et peut seulement lire.

[click] Les rapports reviennent : remise en double d'un côté, total positif ou nul de l'autre. Les cartes permettent de retrouver les appels.

[click] Le coordinateur rassemble les informations et demande l'édition. Lui seul peut modifier les fichiers.

[click] La correction est appliquée, puis les deux tests passent.

Sur ce petit exemple, un seul agent suffisait. Déléguer ne garantit ni vitesse ni qualité.

Même modèle, même objectif. Le harness change les possibilités.
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
      title: 'An agent chooses actions toward a goal',
      description: 'It uses results to decide what to do next, until it stops or reaches a limit.'
    },
    {
      title: 'The model asks, the harness checks and dispatches',
      description: 'Tools execute allowed actions. The runtime enforces isolation.'
    },
    {
      title: 'Same LLM. Same objective. Different harness.',
      description: 'Tools and execution settings change what the agent can do.'
    }
  ]"
/>

<!--
Qu'est-ce qu'on retient ?

[lecture des différents éléments]
-->

---
name: Thank you
group: Closing
layout: outro2
customFeedbackUrl: https://api.inalia.app/f/8cR0I7
additionalContentUrl: https://beta.soubiran.dev/newsletter
additionalContentLabel: Get the next episodes
timing: 0.2
ready: true
---

<!--
Merci à tous, c'était Estéban !

Le premier QR code est pour vos retours. Le second, pour recevoir les prochains épisodes.

Merci !
-->

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
timing: 1
---

# How AI agents work

<!--
Bonjour tout le monde !

Dans LLM fundamentals, on a vu comment un modèle produit des tokens pour nous répondre, raisonner ou demander un appel d'outil.

Aujourd'hui, on va regarder ce qui lui permet d'enchaîner les actions pour accomplir une tâche. Si vous utilisez déjà un agent, vous allez reconnaître ce qui se passe dans votre outil. Sinon, on va le construire étape par étape.

On gardera le même exemple : trouver un bug et le corriger. Puis on changera les outils et la façon d'exécuter le travail, sans changer le modèle.

Mais d'abord, qu'est-ce qu'on appelle un agent ?
-->

---
name: What is an AI agent?
group: Introduction
layout: center-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop
positionClass: w-160
ready: true
timing: 0.7
---

<div class="text-xl font-bold">
  An AI agent uses a model to choose actions <span class="text-primary">toward a goal</span>.<br /><br />
  It acts through tools, observes the results, and decides what to do next.
</div>

<!--
Un agent IA, c'est un système logiciel qui utilise un modèle pour choisir et réaliser des actions vers un objectif.

Il peut utiliser des outils et adapter la suite en fonction des résultats, sans qu'on lui dise quoi faire à chaque étape.

Ça ne veut pas dire qu'il a tous les droits ou qu'il travaille toujours seul. Son autonomie dépend des outils, des permissions et des validations qu'on configure.
-->

---
name: From tokens to actions
group: Understand
ready: true
timing: 1.7
clicks: 2
---

<TokenCapabilities reveal-together loop />

<!--
[click] Dans la session précédente, on a vu qu'un LLM génère des tokens. Avec ça, il peut nous répondre, raisonner ou demander un appel d'outil.

Pour les outils, la distinction reste importante : le modèle génère une demande structurée. C'est le système autour de lui qui exécute l'action et lui renvoie le résultat.

[click] Maintenant, on relie chaque branche au début. On fait une boucle : le texte généré, le raisonnement ou le résultat d'un outil peuvent alimenter la suite. Le modèle peut alors continuer à partir de ces nouvelles informations.

C'est une bonne chose pour un agent : il peut enchaîner plusieurs décisions et plusieurs actions au lieu de s'arrêter à une seule réponse. La flèche de retour ne veut pas dire qu'on continue toujours, une réponse finale peut aussi arrêter la boucle.

Mais le modèle ne fait pas tourner cette boucle tout seul. Il faut du logiciel autour pour lui donner le contexte, exécuter les appels autorisés et lui renvoyer les résultats. C'est ce qu'on va regarder maintenant.
-->

---
name: The model and its harness
group: Understand
ready: true
timing: 2.5
clicks: 7
---

<AgentHarness />

<!--
[click] Voici la frontière de l'agent.

[click] Le modèle choisit la prochaine étape, mais il n'accède pas directement aux fichiers ou au terminal. Les logos en dessous représentent quelques fournisseurs de modèles.

[click] Le système autour de lui, c'est le harness. Ensemble, ils forment l'agent.

[click] Le harness prépare les instructions et l'historique envoyés au modèle. Il gère la boucle : appeler le modèle, continuer après un résultat ou s'arrêter. Le modèle peut proposer un plan, mais c'est le harness qui organise les appels.

[click] Quand le modèle demande un outil, le harness valide la demande, vérifie les permissions et demande une approbation si nécessaire. Il transmet l'appel autorisé à l'exécuteur, puis récupère le résultat ou l'erreur. Les restrictions sur les fichiers, le réseau et les processus sont imposées par le runtime, pas par une simple consigne au modèle.

[click] On peut aussi conserver l'état du travail entre les étapes ou les sessions, et ajouter des retours de tests, des logs, des limites de tours ou de budget. Toutes ces capacités ne sont pas obligatoires : on les configure selon le besoin.

[click] Vous avez peut-être déjà utilisé Claude Code ou Codex. Ces produits fournissent ce logiciel autour du modèle. D'autres exemples sont affichés ici, dont LangChain, qui permet de construire son propre système. Ils n'offrent pas tous les mêmes capacités.

Ici, on sépare visuellement le harness de l'environnement d'exécution pour distinguer coordination et isolation. Les frontières du terme varient selon les sources.

Sources :
https://en.wikipedia.org/wiki/Agent_harness
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
https://developer.nvidia.com/blog/where-security-fits-in-an-ai-agent-stack/
-->

---
name: A brain and hands
group: Understand
layout: center-y
ready: true
timing: 1.5
---

<BrainAndHands />

<!--
Pour retenir la séparation, on peut utiliser cette image : un cerveau et des mains.

Le cerveau comprend le modèle et le harness. Le modèle choisit la prochaine étape, et le harness prépare le contexte, organise la boucle et transmet les appels autorisés.

Les mains, ce sont les outils et l'environnement d'exécution. C'est là qu'on lit un fichier, qu'on lance un test ou qu'on ouvre un navigateur. Le runtime impose les restrictions sur ces actions.

Ces mains sont en dehors de la frontière modèle + harness dessinée sur la slide précédente. Ici, on montre les deux parties nécessaires pour agir sur un environnement.

Guillermo Rauch distingue aussi les fichiers, qui regroupent notamment les mémoires, les skills et les dépôts. On ne les détaille pas ici pour garder le focus sur la décision et l'exécution.

Voyons maintenant comment le cerveau et les mains échangent pendant un tour de boucle.

Sources :
https://www.anthropic.com/research/managed-agents
https://x.com/rauchg/status/2102820148629614685
-->

---
name: Decide, act, observe
group: Understand
ready: true
timing: 4.2
clicks: 13
---

<AgentLoop :step="$clicks" />

<!--
On garde le même objectif : trouver un bug dans un projet et le corriger. C'est une trace scénarisée, pas une exécution réelle.
En haut, on suit l'étape active et qui en est responsable. En dessous, le contexte envoyé au modèle : les instructions, les outils disponibles et l'historique. Pour le moment, aucun message n'a été envoyé.

[click] L'utilisateur envoie son objectif. Le harness ajoute ce message au contexte, puis appelle le modèle.

[click] Le modèle commence par choisir d'inspecter le calcul du panier. Le bloc de raisonnement est un résumé scénarisé pour expliquer la démo, pas une trace interne réelle du modèle.

[click] Le modèle génère une demande de lecture. Le bloc assistant contient un appel d'outil, pas une réponse destinée à l'utilisateur. À ce stade, aucun fichier n'a encore été lu.

[click] Le harness valide les arguments et vérifie les permissions. Ici, la lecture dans le projet est autorisée. Selon la configuration, certaines actions demanderaient une approbation. Ce contrôle n'ajoute pas un message à la conversation.

[click] Le harness transmet la demande à l'outil de lecture. C'est l'outil qui accède au fichier, dans un environnement dont le runtime impose les restrictions.

[click] Le résultat apparaît dans un bloc outil. On voit que la remise est soustraite deux fois. Le harness ajoute ce résultat à l'historique, puis rappelle le modèle avec le contexte mis à jour. Voilà un premier tour complet.

[click] À partir du code retourné, le modèle identifie la correction : ne soustraire la remise qu'une seule fois. On affiche à nouveau un résumé de raisonnement scénarisé.

[click] Le modèle utilise ce résultat pour choisir la suite : demander de ne soustraire la remise qu'une seule fois.

[click] On passe plus vite sur le même mécanisme : validation, permissions, exécution de la modification, ajout du résultat au contexte et nouvel appel au modèle.

[click] Le modèle prépare la vérification. Le fichier a été modifié, mais il faut encore vérifier le comportement.

[click] Le modèle demande maintenant les tests. Une modification réussie ne prouve pas que le bug est corrigé.

[click] Après les contrôles et l'exécution, le résultat des tests rejoint lui aussi l'historique. Le modèle reçoit donc la trace de ses demandes et les résultats correspondants.

[click] Le modèle génère une réponse finale et le harness arrête cette exécution. Les douze tests passent dans cet exemple, mais ça ne garantit pas l'absence d'autres bugs.
On peut aussi s'arrêter pour demander de l'aide, atteindre une limite de tours ou de budget, recevoir une annulation ou rencontrer une erreur non récupérable.
-->

---
name: Four ways to run an agent
group: Configure
ready: true
timing: 3.4
clicks: 5
---

<HarnessLoadout :step="$clicks" />

<!--
On a vu comment la boucle fonctionne. Maintenant, comment est-ce qu'on veut travailler avec cet agent ?

Voici quatre configurations possibles. Ce ne sont pas quatre niveaux d'intelligence, et elles peuvent se combiner. On va les retrouver dans la démo.

[click] D'abord, la configuration conversationnelle. On échange avec l'agent, on lui donne des précisions, on guide la suite. L'historique lui permet de reprendre les échanges précédents dans son contexte.
On peut lui connecter des outils. Conversationnel ne veut pas dire sans outils, ça décrit surtout notre façon de travailler avec lui.

[click] Avec une configuration de code, on lui donne accès au projet : lire des fichiers, les modifier, lancer des tests. Il peut alors vérifier une correction au lieu de seulement nous la proposer.
Mais un terminal donne aussi la possibilité de faire des dégâts. Il faut définir ce qui est accessible, ce qui est autorisé et ce qui demande notre confirmation. Une consigne comme « ne supprime rien » ne remplace pas ces contrôles.

[click] En arrière-plan, on peut soumettre une tâche puis fermer la session. Une file attend les travaux, un suivi indique leur état et une notification nous prévient à la fin.
La boucle peut être la même que pour le code. Ce qui change, c'est qu'on n'est plus devant pour voir chaque erreur. Il faut pouvoir retrouver ce qui s'est passé. Reprendre après une interruption demande aussi un mécanisme prévu pour ça.

[click] Enfin, on peut déléguer une partie du travail à d'autres agents. Chacun a son contexte et ses permissions. Un coordinateur récupère leurs résultats pour décider de la suite.
Ça peut aider à séparer des tâches, mais il faut transmettre les bonnes informations et gérer les désaccords. Plusieurs agents ne donnent pas automatiquement un meilleur résultat.

[click] Ces choix se combinent. Un agent de code peut discuter avec nous, travailler en arrière-plan et déléguer.
Pour la démo, on garde le même modèle et le même objectif. On va changer les outils et le mode d'exécution pour voir concrètement la différence.
-->

---
name: Without repository tools
group: Demo
layout: full
ready: true
timing: 1.2
clicks: 2
---

<AgentDemo mode="conversation" :step="$clicks" />

<!--
On garde le même objectif pendant toute la démo : trouver un bug et le corriger.
C'est une simulation pilotée au clavier. Il n'y a aucun appel à un modèle, aucun accès à un vrai dépôt, aucune commande exécutée.
Les réponses sont préparées pour illustrer les configurations, pas pour mesurer les performances d'un modèle.

[click] Dans cette première configuration, l'assistant demande le code et les tests. Il peut proposer une démarche, mais il ne voit pas les fichiers.

[click] Aucun fichier n'a été lu ou modifié. Ce n'est pas une limite du chat : on n'a simplement connecté aucun outil de dépôt. On pourrait copier les fichiers à la main, mais ici on va plutôt équiper le harness.
-->

---
name: Read, edit, test, repeat
group: Demo
layout: full
ready: true
timing: 2.6
clicks: 10
---

<AgentDemo mode="repository" :step="$clicks" />

<!--
Même modèle, même objectif. On lui donne maintenant des outils de lecture, d'édition et de test, limités à ce projet fictif. Ici ces actions sont autorisées sans confirmation humaine. Les permissions restent contrôlées avant chaque exécution.
À gauche, la conversation. À droite, les fichiers, les tests et les derniers événements de la trace. On distingue la demande du modèle de l'exécution et du résultat.

[click] Le modèle demande le code et les tests. Il ne les a pas encore lus.
[click] Le harness autorise la lecture et l'outil retourne les fichiers. La remise est soustraite deux fois. Les tests attendent aussi qu'un total ne soit jamais négatif.
[click] Le modèle demande de retirer la deuxième soustraction.
[click] L'édition est autorisée et le fichier change. Ça ne prouve pas encore que la correction suffit.
[click] Le modèle demande les tests.
[click] L'exécution est autorisée. Le panier de cent euros passe, mais celui de vingt euros avec trente euros de remise donne moins dix au lieu de zéro. Laisser l'échec visible quelques secondes. Le modèle n'a pas respecté toutes les attentes au premier essai.
[click] Avec ce résultat dans son contexte, le modèle demande une deuxième correction : borner le total à zéro.
[click] L'édition est autorisée et appliquée. Le dernier résultat de test reste celui de l'ancienne version jusqu'à une nouvelle vérification.
[click] Le modèle demande à nouveau les tests.
[click] Les deux cas passent. La correction est prête à être revue, elle n'est pas déployée. Ces deux tests ne prouvent pas l'absence de tout autre bug.
-->

---
name: Keep working in the background
group: Demo
layout: full
ready: true
timing: 1.3
clicks: 4
---

<AgentDemo mode="background" :step="$clicks" />

<!--
On repart du projet initial avec le même bug. On conserve le modèle, les outils et les permissions de la configuration précédente. On ajoute une file de tâches, un suivi d'état et une notification.

[click] Le job passe de queued à running. La même boucle de lecture, correction et tests commence dans le worker.
[click] L'utilisateur quitte la vue du travail et ouvre sa liste de tâches. Le job continue sans conversation ouverte. Pas besoin de rejouer toutes les étapes de correction.
[click] Une notification annonce la fin : les deux tests passent et le résultat est prêt à être revu.
[click] On ouvre le résultat pour retrouver le fichier corrigé et les tests. Completed veut dire que le job s'est terminé, pas que le code est déployé.
-->

---
name: Delegate part of the work
group: Demo
layout: full
ready: true
timing: 1.7
clicks: 4
---

<AgentDemo mode="delegation" :step="$clicks" />

<!--
Dernière configuration, en repartant encore du bug initial. Le coordinateur et les deux sous-agents utilisent le même modèle, mais chacun a son contexte et ses permissions.

[click] Le coordinateur délègue l'inspection du code à un agent et celle des tests à l'autre. Ils ont seulement le droit de lire, pas de modifier. Chaque sous-agent a sa propre boucle, qu'on ne détaille pas ici.
[click] Les deux rapports reviennent. Le premier repère la remise en double. Le deuxième rappelle que le total doit rester positif ou nul.
[click] Le coordinateur rassemble ces informations et demande la correction, puis la vérification. Lui seul a les droits nécessaires à l'édition.
[click] Le harness autorise et exécute les actions. Les deux tests passent. Sur un exemple aussi petit, un seul agent suffisait : on illustre la répartition du travail, pas une garantie de vitesse ou de qualité. La coordination a aussi un coût.

Même modèle. Même objectif. Un harness différent. C'est ce qui change les possibilités qu'on vient de voir.
-->

---
name: What to remember
group: Recap
ready: true
layout: recap
timing: 1.2
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
      description: 'Tools execute allowed actions. The runtime enforces isolation. A prompt is not a security barrier.'
    },
    {
      title: 'Same LLM. Same objective. Different harness.',
      description: 'Tools and execution settings change what the agent can do.'
    }
  ]"
/>

<!--
Qu'est-ce qu'on garde en tête ?

Un agent utilise un modèle pour choisir des actions vers un objectif. Il observe les résultats pour décider de la suite. Il peut aussi s'arrêter, demander de l'aide ou atteindre une limite sans avoir réussi.

Ensuite, le modèle demande, mais c'est le harness qui organise l'exécution et applique les permissions. Une consigne dans le prompt ne remplace pas un contrôle avant l'action.

Enfin, on l'a vu dans la démo : même LLM, même objectif, mais des possibilités différentes selon le harness. Les outils, les permissions et le mode d'exécution changent ce que l'agent peut faire. Et une réponse finale ne prouve pas que le bug est corrigé, il faut vérifier le résultat.
-->

---
name: Thank you
group: Closing
layout: outro2
customFeedbackUrl: https://api.inalia.app/f/8cR0I7
additionalContentUrl: https://beta.soubiran.dev/newsletter
additionalContentLabel: Get the next episodes
timing: 0.6
ready: true
---

<!--
Merci à tous, c'était Estéban.

Le premier QR code vous permet de laisser un feedback sur cette session. Le second vous permet de vous abonner à la newsletter pour recevoir les prochains épisodes.

On peut maintenant prendre le temps de discuter. Dans vos usages, quels outils donneriez-vous à un agent, et quelles actions voudriez-vous garder sous votre contrôle ?
-->

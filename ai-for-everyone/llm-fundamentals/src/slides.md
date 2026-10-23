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
title: "LLM fundamentals"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: llm,ai,machine-learning,tokens,transformer,reasoning,tool-calling,agents
event: AI for Everyone
date: October 29, 2026
name: LLM fundamentals
group: Introduction
ready: true
timing: 0.5
---

<!--
TODO: Restructurer tout outro2. Je n'aime pas l'organisation avec le titre, for X, presented by, ni les trop nombreuses parenthèses. Avoir des liens de feedback via Inalia, réfléchir à comment le faire. Avoir un lien vers la newsletter pour ne rien manquer des prochains épisodes.

TODO: Revoir la partie sur le chat dans la mesure où on peut unifier ça et avoir un chat pour le coup.
 -->

# LLM fundamentals

<!--
Bonjour tout le monde !

J'espère que vous allez bien ! Je suis super content de pouvoir vous parler d'IA et même aujourd'hui de LLM !

En lisant ce titre, je me dis que bah, c'est trop bien, mais, c'est quoi au juste un LLM ?
-->

---
name: Next-token prediction
group: Introduction
layout: center-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
ready: true
timing: 0.5
---

<div class="text-xl font-bold">
  An LLM<br />is a machine<br />that produces the next token.
</div>

<!--
Un LLM, c'est une machine dont l'unique objectif est de produire le prochain token.

Ouais, c'est tout, rien de plus.

Sauf qu'en réalité, c'est déjà beaucoup. Parce qu'avec les différents mécanismes internes, on a des capacités émergentes comme traduire, écrire du code, planifier, résoudre des problèmes.

En gros, avec un LLM, on peut faire beaucoup plus que "juste" produire le prochain token.
-->

---
name: Handwritten rules
group: Learn
ready: true
timing: 0.7
clicks: 3
---

<WrittenRules class="absolute left-1/2 top-1/2 -translate-1/2" />

<!--
Et pour bien comprendre ça, le mieux, c'est qu'on s'attaque au LLM par l'autre côté, par ce qu'il n'est pas.

Un LLM, ce n'est pas [click] une suite d'instructions écrites à la main.

Par exemple, vous ne trouverez pas dans un LLM des conditions comme "si le message contient free ou urgent, alors c'est un spam".

Si vous veniez à envoyer ce message [click], il n'y aurait pas ces règles pour dire que parce que ça contient le mot "urgent" [click] alors c'est un spam.
-->

---
name: Learning from examples
group: Learn
ready: true
timing: 1.6
clicks: 4
---

<LearnedParameters class="absolute left-1/2 top-1/2 -translate-1/2" />

<!--
Un LLM, c'est plutôt ça.

Ici, c'est notre modèle. Pour le moment, il ne sait rien faire. L'idée, c'est que pendant sa phase d'entraînement, il ajuste ses poids, on entend aussi paramètre, pour être en mesure de nous donner le bon prochain token. Pour ça, on lui donne une grande quantité de texte. C'est sa base pour apprendre [click].

Maintenant qu'il a appris, ses poids sont fixés [click] et le modèle n'a plus accès au corpus de texte. Ça, c'est hyper important parce que ça veut dire qu'un LLM, ce n'est pas une base de données et qu'un LLM n'est pas un système autoapprenant.

Une fois qu'on a fait tout ça, on peut envoyer du texte pour que le LLM le complète [click]. Si on reprend notre exemple sur la capitale de la France, il nous complète la phrase avec Paris.

Et ce qui est intéressant, c'est qu'on peut aussi lui demander de classifier si ujn message est un spam [click], et il saura nous répondre. C'est l'une de ses capacités émergentes.
-->

---
name: Tokenization and embeddings
group: Generate
ready: true
timing: 1.8
clicks: 4
transition: slide-up
---

<TextToVectors />

<!--
Depuis tout à l'heure, je vous parle de tokens. Mais concrètement, c'est quoi un token ?

Si on reprend notre phrase "The capital of France is", la première étape, c'est de la découper en morceaux [click]. Ce sont ces morceaux qu'on appelle des tokens.

Sur cet exemple, on pourrait croire qu'un token, c'est un mot. Mais pas forcément [click] ! Le mot unbelievable, par exemple, est découpé en trois tokens. Selon le tokenizer, un token peut être un mot, un bout de mot ou même un caractère. Pour faire de découpage, j'ai utilisé le tokenizer des anciens modèles d'OpenAI.

Ensuite, chaque token correspond à un identifiant dans le vocabulaire du modèle [click]. C'est juste un numéro et deux numéros proches ne veulent pas dire que les tokens se ressemblent.

Et ce numéro permet de retrouver un tableau de nombres, qu'on appelle un embedding [click]. Cette représentation, qu'est la signification d'un mot vu par la machine, elle a été apprise pendant l'entraînement.

Donc, on est parti d'une phrase, on l'a découpée en tokens, et maintenant, on a des nombres que le modèle va pouvoir utiliser.
-->

---
name: From Transformer to probabilities
group: Generate
ready: false
timing: 2
clicks: 5
---

<TransformerProbabilities />

<!--
Ok, on a nos tokens, chacun représenté par une liste de nombres. Maintenant, on en fait quoi ?

On les envoie, enfin pas eux, leurs embeddings, dans un Transformer [click], qu'est cette grosse boite sur la slide.

La première étape, c'est l'attention [click]. Elle permet à chaque élément de récupérer de l'information dans les tokens qui la précèdent et dans elle-même. Concrètement, on va pouvoir faire en sorte que le petit mot "est" est la connaissance de "capitale" et de "France".

Ensuite, on passe dans le MLP [click], qui récupère toutes ces informations et les transforme en un nouveau vecteur.

Et ces deux opérations, on les répète sur plusieurs couches [click]. Du coup, on a la représentation des tokens qui évolue au fur et à mesure.

À la fin, on prend la représentation du dernier token [click] pour calculer un score pour chaque token du vocabulaire avant de passer tout ça en probabilité.

Et donc, à partir de là, en vulgarisant le plus possible, Paris et 78% chance d'être le prochain token.
-->

---
name: Autoregressive generation
group: Generate
ready: false
timing: 0.7
clicks: 4
---

<NextTokenSelection />

<!--
Et donc, si on prend notre exemple "La capitale de la France est", le LLM va calculer [click], pour chacun des tokens de son vocabulaire, un score.

Ensuite, un algorithme va déterminer le prochain à sélectionner. Ici, il choisit [click] Paris, que l'on vient ajouter à la fin de la phrase [click].

Et cette opération, on la recommence [click] jusqu'à ce que le LLM décide de s'arrêter.
-->

---
name: Model capabilities
group: Generate
ready: false
timing: 0.6
clicks: 4
transition: slide-up
---

<TokenCapabilities />

<!--
Ok, maintenant qu'on a vu comment fonctionne notre LLM, revenons à sa caractéristique initiale [click] : sélectionner le prochain token.

Ce qui est intéressant, c'est qu'à partir de cette propriété, on peut lui faire faire 3 choses :

1. [click] Générer du texte et donc nous répondre;
2. [click] Raisonner pour répondre à des problèmes plus complexes en prenant le temps avant de nous répondre;
3. [click] Appeler des tools pour faire des actions et interagir avec le monde.
-->

---
name: Reasoning
group: Reason
ready: false
timing: 0.9
clicks: 4
---

<ChatWindow fullscreen>
  <ChatMessage type="user" content="A notebook and a pen cost €11 together. The notebook costs €10 more than the pen. How much does the pen cost?" />
  <ChatStatusIndicator v-if="$clicks === 1" status="thinking" />
  <ChatReasoning v-if="$clicks >= 2" :expanded="$clicks < 4">
    <div>If the pen costs €1, the notebook costs €11.</div>
    <div>That would total €12, not €11.</div>
    <div class="mt-2">Let x be the price of the pen.</div>
    <div class="font-mono">x + (x + 10) = 11 → 2x = 1 → x = 0.50</div>
  </ChatReasoning>
  <ChatMessage v-if="$clicks >= 3" type="assistant" content="">
    <div>The pen costs <strong>€0.50</strong>.</div>
    <div>The notebook costs €10.50, for a total of €11.</div>
  </ChatMessage>
</ChatWindow>

<!--
Si on prend le reasoning, par exemple, lorsque le modèle va faire face à un problème complexe, il va se servir de son espace de génération de texte pour générer davantage d'informations. [click] Il va penser.

Son objectif, c'est d'y voir plus clair pour trouver la bonne solution. Ce raisonnement, ça reste du texte, comme quand il vous donne la réponse, sauf qu'il a appris que ce texte ne vous est pas destiné. Il a donc la liberté d'y mettre ce qu'il veut.

Et puis, une fois qu'il a suffsament réfléchi [click], il génère le texte pour vous donner la réponse.
-->

---
name: Tool calling
group: Act
ready: false
timing: 0.6
clicks: 3
---

<ChatWindow fullscreen>
  <ChatMessage type="user" content="What time is it in Paris right now?" />
  <div v-if="$clicks >= 1" class="pt-1">
    <ChatToolCall
      name="get_time"
      arguments='{"city": "Paris"}'
      :status="$clicks === 1 ? 'requested' : $clicks === 2 ? 'running' : 'completed'"
      result='{"city": "Paris", "time": "14:32"}'
    />
  </div>
</ChatWindow>

<!--
Pour le tool calling, l'idée, c'est que le LLM va générer du texte un peu spécial destiné au système autour de lui.

[click] Lorsque ce texte est aperçu, le système le récupère, [click] exécute une fonction externe et lui redonne le résultat [click].

Et c'est tout !

Le point intéressant c'est que c'est de la donnée qu'est structurée.
-->

---
name: Key takeaways
group: Recap
ready: false
layout: recap
timing: 0.8
---

<RecapList
  title="What to remember"
  :items="[
    {
      title: 'Learned patterns, not handwritten rules',
      description: 'Training adjusts the model’s parameters. They stay fixed when you use it.'
    },
    {
      title: 'One token at a time',
      description: 'The model uses the context to predict the next token, then repeats.'
    },
    {
      title: 'Reasoning generates tokens. Tools run outside the model.',
      description: 'The model can work through a problem or request a tool.'
    }
  ]"
/>

<!--
Ok, trop chouette ! On a vu beaucoup de choses. Qu'est ce qu'on en retiens ?

[lecture des différents éléments]
-->

---
name: Reading a model card
group: Bonus
ready: false
layout: image
img: https://images.unsplash.com/photo-1575573560187-ea323357d550?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
timing: 0.6
---

<ModelCards class="h-full flex flex-col justify-center" />

<!--
Ok, trop chouette, on a vu plein de choses sur le fonctionnement d'un LLM, on y voit plus clair.

Prenons quelques instants pour comprendre la carte d'identité d'un LLM pour comprendre les annonces quand un nouveau LLM est annoncé.

Donc là, vous avez 3 cartes d'identité. La question, c'est : comment ça se lit ?

[expliquer les différentes sections, de haut en bas]
-->

---
name: Thank you
group: Closing
layout: outro2
timing: 0.9
---

<!--
Merci à tous, c'était Estéban.

Si vous avez un feedback, c'est sur le premier QR code que ça se passe ! Vous pouvez aussi choisir la prochaine thématique ou simplement vous abonner à la newsletter pour ne rien manquer !

Merci !
-->

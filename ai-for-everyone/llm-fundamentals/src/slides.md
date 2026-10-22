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
ready: false
timing: 0.25
---

# LLM fundamentals

<!--
Working outline based on https://github.com/Barbapapazes/talks/issues/139.
Format: 15 minutes, including the introduction.
Main thread: learn → generate → reason → act.
The headings define the talk's structure. Content and visuals still need to be prepared.

Potential content:
- Introduce this first session of AI for Everyone.
- Ask how we get from predicting text to an assistant that uses tools.
- Explain that we'll describe the mechanisms without assuming they work like a human mind.
-->


---
name: An LLM can only generate the next token
layout: center-card
img: https://images.unsplash.com/photo-1565638469233-8347def1fa4b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<div class="text-xl font-bold">
  An LLM is a machine<br />that can only generate the next token.
</div>


<!--
Potential content:
- Open with the central mechanism of an autoregressive text LLM: given a context, generate the next token, append it, and repeat.
- Briefly describe a token as a piece of text. The tokenization slide will make this concrete later.
- Emphasize that "only" describes the generation mechanism, not a limit to simple tasks or memorized answers. Learning to predict text can support complex capabilities.
- Set up the question for the talk: how does this mechanism lead to translation, code, reasoning, and tool requests?
- Keep the model separate from the application: the model generates tokens; a runtime can interpret some of those tokens as requests and execute tools.

Transition: before looking at generation, how does the model learn to predict useful continuations?
-->

<!--

Les LLMs sont des machines à prédire le prochain token. C'est tout. Et c'est déjà beaucoup !

 -->

---
name: Handwritten rules
group: Learn
ready: false
timing: 0.75
clicks: 3
---

# What an LLM is not

<WrittenRules class="mt-12" />

<!--
- Click 1: reveal a deliberately simple spam filter. A human wrote each decision criterion.
- Click 2: reveal a genuine message containing "Urgent" above the rules.
- Click 3: highlight "Urgent" in the message and the matching rule. Explain the false positive aloud. We could keep adding exceptions, but that isn't how we teach an LLM its language skills.
- This illustrates handwritten symbolic rules, not the limits of all symbolic systems.
- The architecture, training objective, and software are still designed by people. The distinction concerns learned behavior, not an absence of code or constraints.

Transition: what if we supplied examples instead of writing every decision rule?
-->

---
name: Inductive learning
group: Learn
ready: false
timing: 1
clicks: 3
---

# Learn patterns from examples

<LearnedParameters />

<!--
- Begin with labeled spam examples and an illustrative grid of initial parameters.
- Click 1: training changes the numerical parameters so predictions better match the examples. Colors illustrate values, not real model weights.
- Click 2: remove the training examples and present a new message. Parameters stay fixed. The goal is generalization to unseen examples, not just remembering training answers. This prediction is illustrative, not a guarantee of success.
- The model computes a prediction using learned parameters. It doesn't need to query the training examples at inference time.
- Click 3: transpose to an autoregressive LLM. Given "The capital of France is", predict the next token. During training, the actual next token provides the target, without a person labeling every sentence.
- For an LLM, training repeatedly measures next-token prediction error and adjusts weights. Predicting text encourages learning linguistic patterns and knowledge expressed in that text.
- Induction means learning regularities from examples. Connectionist models implement this through networks of learned numerical weights. Induction isn't exclusive to neural networks.
- Training data is imperfect. Generalization can fail, and models can also memorize some passages.
- An application may separately connect the model to a database or search tool. That isn't the training dataset being consulted by the model itself.

Transition: how does learning to predict text support translation, coding, or solving certain problems?
-->

<!--

revoir la slide pour supprimer une bonne partie du texte et commencer en ayant le block central (les initial parameters)

 -->


<!--

Expliquer la notion de l'induction sur le fait qu'on demande au modèle d'apprendre les règles, de repérer des régularités
En faisant ça, il corrige ses poids, ces fameux paramètres.

Puis une fois qu'on passe en production, les poids sont fixés et on n'y touche plus. C'est hyper important parce que ça veut dire qu'un modèle n'apprends plus une fois une production, ni ne se met à jour.

Et puis on lui donne des entrées et il fait ce qu'il sait faire de mieux, générer du texte.

Et du coup, comme on ne lui donne pas les règles que nous on pourrait avoir, et c'est mon point de vu, mais on n'a pas vraiment de raisons de comparer l'intelligence artificielle avec l'intelligence humaine

 -->

---
name: Tokenization
group: Generate
ready: false
timing: 1
clicks: 4
transition: slide-up
---

<TextToVectors />

<!--
Animation:
- Start with "The capital of France is" as a sentence.
- Click 1: move the five cl100k_base tokens into a column. Dots show leading spaces.
- Click 2: show a counterexample. "unbelievable" splits into "un", "belie", "vable" with the same tokenizer.
- Explain that this sentence happens to split along word boundaries, but tokens are pieces of text, not necessarily words.
- Click 3: hide the counterexample and reveal the actual vocabulary IDs.
- Click 4: reveal illustrative embedding vectors, not actual model values.

Speaker notes:
- Explain that a token can be a word, a word fragment, a character, or a sequence of bytes, depending on the tokenizer.
- IDs are indices in a finite vocabulary. Nearby IDs don't necessarily have similar meanings.
- An embedding is a learned vector retrieved using the ID. It is neither a complete definition of the token nor a standalone knowledge base.
-->

---
name: Transformer and probabilities
group: Generate
ready: false
timing: 1
clicks: 5
---

<TransformerProbabilities />

<!--
Animation:
- Start with only the same five tokens as the previous slide.
- Click 1: reveal the Transformer and the embedding values represented as colored cells.
- Click 2: highlight incoming attention to the last position. Only a subset of attention links is shown.
- Click 3: pass to the MLP in layer 1 and transform each position's representation.
- Click 4: repeat through illustrative layers 2, 3, …, N. Tokens stay fixed while their representations change.
- Click 5: isolate the last position and reveal output projection scores, followed by softmax probabilities. Token selection happens on the next slide.

Speaker notes:
- Color intensity represents magnitude. Purple and teal distinguish positive and negative values. All values and attention links are illustrative.
- Attention mixes information from accessible positions, including the position itself. The causal mask prevents information from flowing backwards from future tokens.
- The MLP transforms each position separately. Residual connections and normalization are omitted from this simplified view.
- Embedding weights stay fixed. The computed representations change through the layers.
- The output projection produces one logit per vocabulary token. Softmax converts these scores into P(t[n+1] | t[1], ..., t[n]).
- Only a few candidates are displayed. “Others” groups the rest of the vocabulary, rather than representing a single token.

Notes for questions, not to cover during this minute:
- The embedding matrix doesn't change during inference. The computed representations change with context.
- Attention combines information from accessible positions; MLPs apply nonlinear transformations at each position.
- Knowledge is distributed across the model's weights and representations, not just the embeddings or MLPs.
- The output projection produces logits, not necessarily cosine similarities. Some models share its weights with the input embeddings.
- Prefill processes the prompt and prepares the KV cache. Decode generates sequentially while reusing previous computations.
- Depending on the architecture, mechanisms such as RoPE represent positions.

Reference: Attention Is All You Need, Vaswani et al., 2017.
https://arxiv.org/abs/1706.03762
-->




---
name: Autoregressive generation
group: Generate
ready: false
timing: 1
clicks: 4
---

<NextTokenSelection />

<!--
Potential content:
- Animate the continuation of "The capital of France is …".
- Show a few candidates with explicitly fictional probabilities, chosen for illustration.
- Select the token "Paris", append it to the context, then display a new prediction, such as a period.
- Show the loop visually: predict → select → append to context → predict.
- Point out that decoding doesn't always choose the most probable token. Temperature and top-p can affect the selection.
- Distinguish this generation loop from training: the weights aren't updated with every response.
-->

---
name: From tokens to text, reasoning, and tool calling
---

<!--

ici, il faut une slide pour mettre les trois capacités qui suivent la génération de tokens

 -->

---
name: Reasoning
group: Reason
ready: false
timing: 2
---

# Intermediate tokens as a workspace

<!--
Potential content:
- Compare a direct answer to 17 × 24 with a step-by-step solution:
  17 × 20 = 340
  17 × 4 = 68
  340 + 68 = 408
- Show that intermediate tokens become part of the context and can help break down a problem, test a hypothesis, or correct a step.
- The central mechanism is still token prediction.
- Introduce test-time compute: more computation during inference can improve some results, without guarantees.
- Mention that some models receive reasoning-specific post-training, including SFT or RL.
- A plausible sequence of steps can be wrong. A textual explanation isn't necessarily a faithful or complete account of internal reasoning.

Notes for questions:
- Some protocols separate channels such as analysis and final. These aren't two different engines.
- The runtime can configure a reasoning budget; internal steps aren't always visible.

Reference: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models, Wei et al., 2022.
https://arxiv.org/abs/2201.11903
-->

<!-- faut parler du reasoning -->

---
name: Tool calling
group: Act
ready: false
timing: 1.5
---

# The model requests, the runtime executes

<!--
Potential content:
- Start with the request: "What time is it in Paris?"
- Draw two distinct areas, model and runtime, to make the execution boundary visible.
- Animate the sequence:
  user → LLM
  LLM → structured request get_time({"city":"Paris"})
  runtime → tool execution
  tool result → LLM context
  LLM → response to the user
- Emphasize that the model generates an action request. It doesn't execute the tool itself.
- Show that the observation brings in external information that generation alone cannot provide.
-->

<!-- ajouter l'annecdote sur le structure output et le fait que ça passe dans un système déterministe (à voir via l'article d'openai) -->

---
name: Agent loop
group: Act
ready: false
timing: 1.5
---

<!-- loop (on y reviendra plus tard), je suis pas certains que ça fasse sens d'en parler ici -->

# Act, observe, then decide what comes next

<!--
Potential content:
- Reuse the previous diagram and add a loop after the tool result: respond or request another action.
- Compare uses of the same generation mechanism:
  generate, produce an answer token by token;
  reason, use intermediate tokens as a workspace;
  act, request actions and receive external observations across model invocations.
- Suggested phrase: "Reasoning lets the model iterate on its own outputs. An agent lets it iterate on the consequences of its actions."
- Point out that reasoning and tool calling can work together.
- Preview upcoming sessions without going into detail: agents, MCP, human-in-the-loop, coding agents, background agents, and sustainability.

Reference: ReAct, Yao et al., 2022.
https://arxiv.org/abs/2210.03629
-->

---
name: Récap
group: Récap
ready: false
layout: recap
timing: 1
---

<!-- # Learn → generate → reason → act -->

<!--
Potential content:
- Return to the main thread with a summary diagram.
- Training enables complex capabilities. At inference time, the model generates tokens.
- These tokens can form an answer, reasoning steps, or an action request.
- The runtime executes actions and returns observations to the model.
- Remind the audience that a plausible answer isn't necessarily correct. Reasoning and tools can help without eliminating hallucinations or every risk of error.
- Close with the practical goal: use models with an understanding of their mechanisms, without automatically attributing our own to them.

Further reading: https://beta.soubiran.dev/ai-for-everyone
-->


---
name: Reading a model card
group: Bonus
ready: false
layout: image
img: https://images.unsplash.com/photo-1575573560187-ea323357d550?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<ModelCards class="h-full flex flex-col justify-center" />

<!--
Bonus slide for questions, outside the main 15-minute thread.
Current examples selected from the official model documentation, not a performance ranking.
GPT-6.1 Sol has a 1,050,000-token context window and a 128,000-token maximum output.
Claude Opus 5.5 lists a 1M-token context window and 128K maximum output for standard requests.
The slide uses DeepSeek-V4 as the family name. The figures shown are for DeepSeek-V4-Pro: 1.6T total parameters, 49B activated per token, and a 1M-token context window. T means trillion, or 1,000 billion. The V4 family also includes Flash, with different parameter counts. Hosting limits and versions can differ from the downloadable model.
OpenAI and Anthropic don't disclose parameter counts in the cited model documentation.

Sources:
- https://developers.openai.com/api/docs/models/gpt-6.1-sol
- https://platform.claude.com/docs/en/models/opus-5-5/overview
- https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro

Speaker notes:
- Distinguish developer, model, and application. OpenAI develops GPT models; ChatGPT is an application that provides models and tools. Anthropic uses Claude for both its model family and its application.
- B means billion parameters. Parameters are learned numerical values, not documents or a count of facts. More parameters don't guarantee better results on every task.
- For mixture-of-experts models, distinguish total parameters from parameters active per token if asked.
- Open weights means the weights are available to download. Check the licence and hardware requirements. It doesn't automatically mean open source or that the training data is available.
- Open-weight models can also be accessed through hosted APIs. Weight availability and hosting are separate questions.
- Context includes instructions, conversation history, tool results, and generated output, including reasoning tokens where applicable. Providers may impose a separate, smaller output limit. Exact token limits depend on the model and service; context sizes are rounded on the slide.
- A context window is not permanent memory, nor a guarantee that the model uses every detail reliably.
- If asked: a frontier lab develops models among the most capable at a given time. The term has no single fixed technical threshold.
-->

<!-- une slide de récap (qui peut être la slide de conclusion)aj -->
<!-- slide pour dire qu'il faut voter pour le prochain thème, sans le feu d'artifice (à remove de partout btw) -->

---
name: Outro
layout: outro2
---

<!-- restructurer tout outro2 (j'aime pas l'organisation avec le titre, for X, presented by, trop de parenthèses  , avoir des liens de feedback via inalia (à réfléchir comment), avoir un lien vers la newsletter, pour ne rien manquer des prochains épisodes -->

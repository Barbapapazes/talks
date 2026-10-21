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
title: "LLM fundamentals: how they work, text generation, reasoning, tool calling, and our relationship with language"
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
name: Inductive learning
group: Learn
ready: false
timing: 1.75
---

# Learn patterns instead of programming every rule

<!--
Potential content:
- Contrast two diagrams: developer-written rules → result; data + training → model that can make predictions.
- Explain that training adjusts weights to improve next-token prediction.
- Show how this objective encourages learning linguistic structures, factual knowledge, and useful representations of the world.
- Key phrase: "By learning to predict language, LLMs have learned some of the patterns of the world that language describes."
- Point out that the data is incomplete and imperfect. The model hasn't discovered every rule of the world.
- Note that humans also learn through induction, but with different experiences, including bodily and social experiences.

Transition: how does this learning support translation, coding, or solving certain problems?
-->

---
name: Emergent abilities
group: Learn
ready: false
timing: 2
---

# Capabilities without explicit rules for every task

<!--
Potential content:
- Illustrate acquired capabilities with translation, code generation, and some mathematical procedures.
- Involve the audience with an in-context learning example, to test before the talk:
  mip → mop
  lat → lot
  sik → sok
  riv → ?
- Expected answer: rov. The proposed rule replaces the middle vowel with o.
- Explain that examples in the prompt guide the answer without changing the model's weights.
- Don't present emergence as a magical size threshold. Architecture, data, scale, and post-training all contribute to capabilities.
- Keep the caveat about metrics that can create the appearance of a sudden breakthrough for questions.

Reference: Are Emergent Abilities of Large Language Models a Mirage?, Schaeffer et al., 2023.
https://arxiv.org/abs/2304.15004
-->

---
name: Tokenization
group: Generate
ready: false
timing: 1
---

# From text to vectors

<!--
Potential content:
- Show the actual tokenization of "The capital of France is" using https://platform.openai.com/tokenizer.
- Prepare a screenshot to avoid depending on a live demonstration.
- Draw the start of the pipeline: text → tokens → IDs → embeddings.
- Explain that a token can be a word, a word fragment, a character, or a sequence of bytes, depending on the tokenizer.
- IDs are indices in a finite vocabulary. Nearby IDs don't necessarily have similar meanings.
- An embedding is a learned vector retrieved using the ID. It is neither a complete definition of the token nor a standalone knowledge base.
-->

<!--

avoir une animation pour le visualizer

une phrase un paragraph et puis en un click sur espace, ça se sépare en plein de morceau, c'est les tokens

mettre un lien avec le tokenizer d'openai pour le visualiser (ou une iframe carrément)

et on les mets en colonne avec une autre animation, puis on associe un id et puis un vector

 -->

---
name: Transformer and probabilities
group: Generate
ready: false
timing: 1
---

# From vectors to next-token probabilities

<!--
Potential content:
- Complete the pipeline: embeddings → Transformer → logits → probabilities.
- Show that the Transformer produces contextualized representations that depend on the preceding tokens.
- Explain logits as one score per vocabulary token, then softmax as the conversion into a probability distribution.
- Display P(t[n+1] | t[1], ..., t[n]).

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
---

# Choose a token, then repeat

<!--
Potential content:
- Animate the continuation of "The capital of France is …".
- Show a few candidates with explicitly fictional probabilities, chosen for illustration.
- Select the token "Paris", append it to the context, then display a new prediction, such as a period.
- Show the loop visually: predict → select → append to context → predict.
- Point out that decoding doesn't always choose the most probable token. Temperature and top-p can affect the selection.
- Distinguish this generation loop from training: the weights aren't updated with every response.
-->

<!--

je verrais bien l'idée d'aller à la fin, et voir ce qui est générer (en mode plusieurs choix)

 -->

---
name: Relationship to human intelligence
group: Understand the limits
ready: false
timing: 2
---

# Speaking like us doesn't prove thinking like us

<!--
Potential content:
- Display a response that starts with "I think" and ask what this wording leads us to assume.
- Explain that our relationship with language encourages us to attribute intention and understanding to a speaker.
- Convincing output doesn't prove that the underlying mental processes resemble ours.
- Acknowledge real problem-solving capabilities, with successes and failures that can differ from our own.
- Avoid both shortcuts: "it's human" and "it's just memorization".
- Don't try to settle the philosophical question of intelligence. Describe capabilities and their limits.

Takeaway: understand how an LLM works rather than automatically assuming it works like us.
-->

<!-- je suis pas certains qu'on doivent la garder -->

---
name: Reasoning
group: Reason
ready: false
timing: 2
---

<!--

je pense qu'il nous faut une slide en amont avec ces trois capacité à partir de l'idée qu'on puisse générer des tokens

 -->

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

---
name: Agent loop
group: Act
ready: false
timing: 1.5
---

<!-- loop (on y reviendra plus tard) -->

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
name: Conclusion
group: Conclusion
ready: false
timing: 1
---

# Learn → generate → reason → act

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

<!--

ça ne s'est que générer que les tokens suivant et c'est tout

mais c'est déjà énorme

 -->

<!-- une slide de récap (qui peut être la slide de conclusion)aj -->
<!-- slide pour dire qu'il faut voter pour le prochain thème, sans le feu d'artifice (à remove de partout btw) -->

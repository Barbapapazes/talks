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
title: "Under the hood of an LLM"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: ai,llm,transformer,attention,inference,sampling
event: AI for Everyone
name: Under the hood of an LLM
group: Introduction
ready: false
status: Skeleton from issue 151. Visuals and speaker notes to develop.
---

# Under the hood of an LLM

<!--
Source: https://github.com/Barbapapazes/talks/issues/151
Direct follow-up to LLM fundamentals. Do not repeat its introduction.
Keep the same running example: The capital of France is

Preparation TODOs:
- Replace the draft package date with the confirmed session date.
- Develop progressive visuals, then write the delivery notes.
- Label all invented scores, probabilities and attention values as illustrative.
- Reuse or extend TextToVectors, TransformerProbabilities and NextTokenSelection
  from ../../llm-fundamentals/src/components rather than copying their implementations.
- Keep training, agents, MCP and provider comparisons out of this episode.

Timing: the issue's individual allocations total 16 minutes, excluding this cover
and the closing slide. Target 15 minutes, including transitions. The Q/K/V and
sampling sections are the first places to trim. Run npm run update:timing
ai-for-everyone/under-the-hood-of-an-llm once the delivery notes are written.
-->

---
name: Remember our model?
group: Introduction
ready: true
clicks: 1
---

<ModelParameters :trained="$clicks >= 1" class="absolute left-1/2 top-1/2 w-200px -translate-1/2" />

<!--
Remember this grid from LLM fundamentals? Each small square stands for a numerical parameter, not a neuron.
[click] Training adjusts these parameters. The animation recalls that change.
Once trained, the parameters stay fixed during ordinary inference.
The grid is illustrative. A real model has billions of these numbers.
Let's look inside and see where they are and how they are used.

poids qu'on fait bouger pendant l'entrainement
-->

---
name: Where are the billions of parameters?
group: Parameters
layout: image
img: https://images.unsplash.com/photo-1575573560187-ea323357d550?q=80&w=2340&auto=format&fit=crop
transition: slide-up
ready: true
---

<ParameterLocations />

<!--
Where are those billions of learned numbers?
These four locations give us a map: embeddings, attention projections,
MLP layers, and output projection.
These are locations in the model, not four consecutive steps.
Let's look at each one.
-->

---
name: 'Where are the billions of parameters? Embeddings'
group: Parameters
transition: slide-up
ready: true
clicks: 2
---

# Embeddings

<div class="absolute inset-x-14 top-1/2 -translate-y-1/2 flex justify-center">
  <EmbeddingParameters />
</div>

<!--
These slides locate learned parameters, not four consecutive steps.
Weights are fixed during ordinary inference. Activations depend on the input.
A token ID selects a row from the embedding table. Every number in that table is a learned parameter.
The selected vector is the token's initial representation, before context-dependent transformations.

[click] Select the row for token ID 42.
[click] Copy that row into the token's embedding vector.
-->

---
name: 'Where are the billions of parameters? Attention projections'
group: Parameters
transition: slide-up
ready: true
clicks: 2
---

# Attention projections

<div class="absolute inset-x-14 top-1/2 -translate-y-1/2 flex justify-center">
  <AttentionProjectionParameters />
</div>

<!--
These slides locate learned parameters, not four consecutive steps.
Weights are fixed during ordinary inference. Activations depend on the input.
The current representation passes through learned WQ, WK and WV matrices to produce Q, K and V.
The matrices contain parameters. Q, K and V are input-dependent activations.
This diagram shows projections, not attention comparisons or the weighted combination of values.
Attention also normally has a learned output projection, omitted here.

[click] Reveal the three learned projection matrices.
[click] Produce the input-dependent Q, K and V vectors.
-->

---
name: 'Where are the billions of parameters? MLP layers'
group: Parameters
transition: slide-up
ready: true
clicks: 3
---

# MLP layers

<div class="absolute inset-x-14 top-1/2 -translate-y-1/2 flex justify-center">
  <MlpParameters />
</div>

<!--
These slides locate learned parameters, not four consecutive steps.
Weights are fixed during ordinary inference. Activations depend on the input.
Learned projections expand each position's representation and project it back after a nonlinear activation.
The same weights are applied at each position. Connections represent weights, circles represent activations.
This is a simplified MLP. Gated variants and mixture-of-experts architectures differ.

[click] Expand the representation through the first learned projection.
[click] Apply a nonlinear activation. Here, negative values are suppressed as a simplified ReLU example.
[click] Project back to the original size through the second learned projection.
-->

---
name: 'Where are the billions of parameters? Output projection'
group: Parameters
ready: true
clicks: 2
---

# Output projection

<div class="absolute inset-x-14 top-1/2 -translate-y-1/2 flex justify-center">
  <VocabularyProjectionParameters />
</div>

<!--
These slides locate learned parameters, not four consecutive steps.
Weights are fixed during ordinary inference. Activations depend on the input.
Final normalization adjusts the representation before the learned vocabulary projection produces logits.
Softmax converts logits into probabilities. It has no learned parameters.
Final normalization typically has learned scale parameters. It is distinct from softmax.
The vocabulary projection may share weights with the embedding table.
All numbers are illustrative. Real scores cover the entire vocabulary.

[click] Apply the vocabulary weights to produce logits.
[click] Softmax converts the logits into probabilities. Others groups the remaining vocabulary.
-->

---
name: What is a neuron?
group: Parameters
ready: false
---

# What is a neuron?

$$
y = \sigma\left(\sum_i w_i x_i + b\right)
$$

A neuron computes an activation. Its weights control that computation.

**One weight is not one neuron.**

<!--
Target in issue: 1 minute.
TODO visual: a small network, highlight one weighted edge, zoom into a weighted
sum, then replace the network with a matrix operation.
A single MLP unit can have many incoming weights. Knowledge can be distributed
across units. The neuron analogy does not describe every Transformer operation.
Contrast fixed weights, input-dependent activations and request-specific KV cache.

Depuis le début on fait des illustrations, bon là, on se cache plus, un neuronne, c'est une fonction mathmématique.
-->

---
name: Dense vs mixture of experts
group: Parameters
ready: false
---

# Dense vs mixture of experts

| Dense | Mixture of experts |
| --- | --- |
| The same MLP processes every token | A router selects a subset of MLP experts per token |

Total parameters ≠ active parameters per token.

<!--
Target in issue: 1 minute.
TODO visual: side-by-side paths. Dense uses one MLP; MoE routes to two of four
illustrative experts and combines their outputs. Label total vs active parameters.
Routing normally replaces some feed-forward blocks, not the whole Transformer.
Experts are not necessarily named subject specialists. All expert weights must
remain accessible. Routing, communication and memory also have costs.
Transition: how does a token use information from its context?
-->

---
name: What does attention do?
group: Transformer
ready: false
---

# What does attention do?

> The capital of France is

Each position combines information from the positions it can access.

The representation changes with the context.

<!--
Target in issue: 1 minute.
TODO visual: select "is", reveal links to earlier tokens and itself, and show
future positions as masked. Mark the links as illustrative, not measured attention.
Initial embeddings alone do not capture the full context. Position information
also matters, through mechanisms such as RoPE depending on the architecture.
Causal attention cannot look at future positions.
-->

---
name: Query, key, value
group: Transformer
ready: false
---

# Query, key, value

$$
Q = XW_Q,\quad K = XW_K,\quad V = XW_V
$$

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}} + M\right)V
$$

Compare queries and keys. Combine values.

<!--
Target in issue: 2 minutes. Candidate for a shorter preset animation.
TODO priority visual: input representations enter learned Q/K/V projections;
compare one query to accessible keys; scale scores; apply the causal mask;
softmax; then form the weighted sum of values. Label all example values illustrative.
Connect W_Q, W_K and W_V to the weight matrices on the opening slide.
Distinguish learned model weights from input-dependent attention coefficients.
Briefly show multiple heads. A query is a vector, not a natural-language question.
Attention coefficients are not a complete or reliable explanation of a decision.
-->

---
name: MLPs and successive layers
group: Transformer
ready: false
---

# MLPs and successive layers

Attention combines information **across positions**.

The MLP transforms each position **with shared weights**.

Repeat the block to update the representations.

<!--
Target in issue: 1 minute.
TODO visual: use a consistent pre-norm block: norm → attention → residual add,
then norm → MLP → residual add. Zoom out to show repeated blocks.
Show expansion → nonlinear activation → projection back for a simple MLP.
Mention gated variants such as SwiGLU without presenting this as universal.
Residual connections and normalization help stabilize computation and training.
-->

---
name: Prefill vs decoding
group: Inference
ready: false
---

# Prefill vs decoding

**Prefill** processes the prompt's positions in parallel, with a causal mask.

**Decoding** generates the continuation one token at a time.

> The capital of France is → Paris → . → end

<!--
Target in issue: 1 minute 30 seconds.
TODO visual: a blue prompt-prefill phase, followed by green decoding steps on a
timeline. Reuse the established prompt and illustrative continuation.
Prefill prepares representations and historical K/V. The last prompt position
produces the scores used to select the first output token.
Subsequent decoding steps process the newly selected token using cached context.
Parallel prompt processing does not mean generating dependent output tokens at once.
Time to first token also includes queueing, network transfers and other overhead.
Token boundaries and the continuation here are illustrative.
-->

---
name: The KV cache
group: Inference
ready: false
---

# The KV cache

Keep previous keys and values. Reuse them at the next decoding step.

Less repeated computation, more memory.

| Model weights | KV cache |
| --- | --- |
| Learned parameters | Request-specific activations |
| Fixed during ordinary inference | Grows as the sequence grows |

<!--
Target in issue: 1 minute 30 seconds.
TODO visual: persistent per-layer K/V grids. Add one column for each new token;
keep old columns visible instead of recomputing them.
Cached K/V are not the learned W_K/W_V matrices that produced them.
Memory depends on sequence length, layers, KV heads and numeric precision.
Mention MQA/GQA only if useful. Avoid implying that caching removes the cost
of attending to previous positions.
-->

---
name: Why do some responses take longer?
group: Inference
ready: false
---

# Why do some responses take longer?

- Time to first token
- Output tokens per second
- Number of generated tokens, including reasoning tokens

Longer context and more generation steps can mean more work.

<!--
Target in issue: 1 minute.
TODO visual: two timelines comparing a short answer with a longer reasoning
sequence. Separate prefill from decoding and mark when visible output starts.
Some models generate reasoning tokens that are not shown directly to the user.
Latency also depends on infrastructure and load. Do not promise that MoE is
always faster. Leave benchmarks, provider pricing and detailed costs for another talk.
-->

---
name: From logits to probabilities
group: Next-token selection
ready: false
---

# From logits to probabilities

Final representation → vocabulary projection → one logit per candidate token.

$$
P_i = \frac{\exp(z_i)}{\sum_j \exp(z_j)}
$$

A logit is a score. Softmax turns scores into probabilities that sum to 1.

<!--
Target in issue: 1 minute.
TODO visual: extend TransformerProbabilities to expose illustrative logits before
showing probability bars for Paris, Lyon, Berlin and other candidates.
Keep "The capital of France is" visible. Label the distribution as illustrative.
The vocabulary softmax selects among token candidates. The attention softmax
on the Q/K/V slide instead weights accessible positions. Same math, different use.
-->

---
name: Temperature, top-k and top-p
group: Next-token selection
ready: false
---

# Temperature, top-k and top-p

- Temperature reshapes the distribution with softmax of logits divided by T.
- Top-k keeps the k highest-ranked tokens.
- Top-p keeps the smallest ranked set whose cumulative probability reaches p.

Renormalize after filtering. Then choose greedily or sample.

<!--
Target in issue: 2 minutes. Candidate for a shorter preset animation.
TODO priority visual: extend NextTokenSelection with illustrative logits and
probability bars. Keep the prompt fixed. Provide three repeatable preset states
for the timed talk; leave sliders and repeated sampling for questions and practice.
Show temperature, then top-k, then cumulative top-p and renormalization.
Compare greedy selection with a sample and append the selected token.
T below 1 concentrates probabilities; T above 1 flattens them. T=0 conventionally
means a special deterministic policy, not literal division by zero.
These controls do not modify model weights or guarantee factual accuracy.
Available controls and their composition depend on the API and model.
-->

---
name: The journey of a token
group: Recap
ready: false
---

# The journey of a token

Prompt → token IDs → embeddings + position

↓

Transformer layers: attention with Q/K/V and KV cache, then dense or MoE MLP

↓

Final representation → vocabulary logits → temperature / softmax / filtering

↓

Select a token → append to context → repeat decoding

<!--
Target in issue: 1 minute.
TODO visual: replace this text with one pipeline, reusing or extending
TextToVectors, TransformerProbabilities and NextTokenSelection where practical.
Reveal the path progressively and draw the decoding loop explicitly.
Summarize: weights are learned, activations are computed; attention and MLP
transform representations; prefill and cached decoding produce token scores.
Sampling controls select a token without changing the model's weights.
Bridge to the later episode on benchmarks, price and performance.
-->

---
name: Thank you
group: Closing
layout: outro2
additionalContentUrl: https://beta.soubiran.dev/newsletter
additionalContentLabel: Get the next episodes
ready: false
---

<!--
TODO: add this session's feedback URL when available. Do not reuse another talk's.
Questions and practice follow the timed presentation.
-->

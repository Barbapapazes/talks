This talk examines `alien-signals`, a low-level and language-agnostic implementation of reactive state. Using `signal`, `computed`, `effect`, and `effectScope`, it explains how subscribers track dependencies and how updates travel through a directed acyclic graph.

Graph theory, topological sorting, and doubly linked lists provide the vocabulary for reading the implementation. The final section discusses the limits of reactive systems and connects the model to Vue's component effects and Vue Vapor's proposed DOM-level granularity.

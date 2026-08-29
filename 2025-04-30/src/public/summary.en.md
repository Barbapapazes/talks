Starting with `ui = fn(state)` and an Excel-style formula, this talk explains frontend reactivity through `alien-signals`. It follows how `signal`, `computed`, and `effect` build a dependency graph, then examines the implementation through graph theory, doubly linked lists, dependency tracking, and push, pull, and pull-push propagation.

The talk also covers glitches, cyclic dependencies, mutable state, and dynamic dependency graphs before connecting the low-level model to Vue component rendering and the finer-grained direction of Vue Vapor.

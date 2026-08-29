How does a frontend know which code to run after state changes? This talk answers the question with `ui = fn(state)`, an Excel example, and a small reactive system built with `alien-signals`.

It introduces dependency graphs and doubly linked lists, then explores subscribers, computed values, effects, propagation strategies, and several unresolved problems such as glitches, cycles, mutable state, and changing dependency graphs. The last examples show how these mechanisms map to Vue.

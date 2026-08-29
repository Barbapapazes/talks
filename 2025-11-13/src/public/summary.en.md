Frontend frameworks hide a dependency-tracking system behind their reactive APIs. This talk makes that system visible with `alien-signals`, showing how signals, computed values, and effects form a graph that can be updated when state changes.

The examples use directed graphs, topological ordering, doubly linked lists, and push-pull propagation to explain the underlying algorithms. They finish by comparing this model with Vue's component-level reactive effects.

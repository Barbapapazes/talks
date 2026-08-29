Frontend reactivity can be described as a graph of dependencies that connects state, computed values, and effects. This talk uses the equation `ui = fn(state)`, an Excel analogy, and the `alien-signals` library to explain how changes propagate through that graph.

The presentation introduces directed acyclic graphs, topological sorting, and doubly linked lists before examining signal getters, subscribers, push and pull propagation, and effect execution. It ends by connecting these ideas to Vue's component scopes and reactive rendering.

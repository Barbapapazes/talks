Signals turn changes in application state into updates for the values and effects that depend on them. This talk builds that model step by step with `alien-signals`, starting from a simple calculation and moving through dependency graphs and linked lists.

It then examines the implementation of signals, computed values, and effects, including push and pull propagation. The discussion closes with the practical difficulties reactive systems must handle and the way Vue attaches reactive effects to component scopes.

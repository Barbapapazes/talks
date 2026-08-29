Reactive rendering depends on knowing which computations use which pieces of state. This talk explores that relationship with `alien-signals`, from the basic `signal`, `computed`, and `effect` APIs to the data structures used to track dependencies.

It explains how updates propagate, why reactive systems need to deal with cycles and mutable state, and how a small signal-based framework can update the DOM. The final example connects the same ideas to Vue's `ReactiveEffect`.

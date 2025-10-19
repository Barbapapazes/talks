Hello everyone and thank you for being here today. We’re going to talk about a topic I really enjoy and that’s not often well explained online: signal-based reactivity, and try to understand what’s going on in our front end.

Before going further, please scan the QR code. You’ll find my socials, a question not to open right away so we can keep the flow, a link to rate the talk—preferably at the end—and reactions at the bottom of the page to react in real time.

I’ll start with a simple question to learn which frameworks you use on the front end. If it doesn’t work, no worries; we’ll continue. The idea is that the talk is framework-agnostic: we’ll cover fundamentals useful with any tool.

I like to begin with this equation often associated with React: the UI is the result of a function that takes state as a parameter. We can apply the same idea to a reactivity system: fn is no longer a component; it’s a black box that produces the UI from state.

You’ve all used this principle with Excel. In a table with quantity, unit price, and total, a cell can contain a formula that depends on others. As soon as a value changes, all formulas update: the interface is driven by state. UI = fn(state).

Let’s transpose that into code. We create two signals—quantity and price—a computed total = quantity × price, and an effect that logs the result. When we update quantity, the effect reruns and the view shows the new value, just like in Excel. This is precisely the mechanism we’ll explain.

Let me introduce myself: my name is Estéban Soubiran, an avionics software engineer at MySpace, a subsidiary of ArianeGroup, where we build partially reusable launch vehicles. I also contribute to front- and back-end ecosystems around Laravel, Vite, Vue, and Nuxt, and I write technical articles; you’ll find all the links on my site.

Before diving into code, a bit of graph theory. A graph has nodes (where computations happen) and edges (arrows or lines connecting nodes). Here we care about directed graphs, where the arrow carries direction, and acyclic graphs, where you can’t loop back.

Topological sort is a linear ordering of nodes such that each node comes after all its parents. You can only visit a node once its parents are processed; often there are multiple valid orders. Another useful notion: a doubly linked list, where each element knows its previous and next, letting you navigate both ways.

Back to our signals. Quantity and price are two source nodes. The computed total depends on those two nodes, and the effect depends on total. The graph makes these relationships visible, and we can traverse it in either direction depending on the engine’s needs.

Let’s move to Alien Signal, a low-level, framework‑ and language‑agnostic library created by Jan Sancha. The algorithm has ports in other languages (Lua, Java, etc.) and even lets you implement the TC39 signals proposal.

Alien Signal exposes four primitives: signal, computed, effect, and effectScope. There are two categories: dependencies (which carry values, like signals) and subscribers (computed, effect, effectScope) that subscribe to dependencies. Computed often plays both roles: a dependency for other nodes and a subscriber to its sources.

On the signal side, the API is a getter‑setter. On read, if there’s an activeSub (current subscriber), the signal creates a bidirectional link between itself and that subscriber, forming a doubly linked list for efficient navigation. On write, it fetches its subscribers and propagates the update.

For propagation, there are three big models. In push, dependencies recompute and push to their subscribers, which can be costly if many computeds are heavy. In pull (polling), subscribers periodically query dependencies—it’s reactive but inefficient. Alien Signal uses a push‑pull model: signals set flags ("I changed") and subscribers decide when to recompute. Effects are collected and executed in a batch to avoid duplicates.

For computed, at the start of execution we process flags via processComputedUpdates to know if the value should recompute. Since a computed can also be a dependency, it links to activeSub when read, just like a signal. Then it returns its current value.

On the effect side, execution sets the current effect into activeSub, then calls its callback. Any read of a signal or computed during this execution creates links to this effect. That’s how dependencies and subscribers connect automatically.

If we recap our example: quantity and price have no parents, computed total subscribes to them during its first run, then leaves activeSub. The effect subscribes to total. An update to quantity raises a flag, total marks itself dirty if needed, and the effect is triggered once with the new value.

This mechanism relies on bidirectional links and doubly linked lists, allowing fast graph navigation. Alien Signal is one of the most performant signal implementations in the JavaScript ecosystem today precisely because of these architectural choices.

Not everything is magic, though. Four classic problems exist: glitches (temporary inconsistencies depending on parent execution order), cyclic dependencies (loops to detect and cut), interactions with mutable state (structural changes during resolution), and dynamic updates to the dependency graph (adding/removing dependencies on the fly). Different libraries (Alien Signal, Preact, Solid, Qwik, etc.) use different strategies; most of the time it’s transparent to the user.

Let’s make a mini “framework.” We create a count signal = 0, an effect that writes "count is ${count()}" to document.body.innerHTML, then we increment count. The effect reruns, the page updates; we have UI = fn(state).

In Vue.js, we see the same pattern: create a reactive effect with a componentUpdateFn, execute it within a scope that opens and closes at the component level. Each state change triggers the component’s update. The push‑pull model avoids unnecessary recomputation of computeds, and the scope lets us clean up effects and signals when the component unmounts. The modern trend aims for even finer granularity—at DOM node level—as seen in Qwik and where Vue is heading with Vapor.

To go further, I invite you to read Alien Signal’s source code, watch the “Reactivity Cross‑frameworks” video, and an excellent article by Qwik’s creator that visually illustrates these differences. Thank you all—this was Estéban Soubiran. If you’d like to rate the talk, the link is on the page.

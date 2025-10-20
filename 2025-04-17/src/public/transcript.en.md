Hello everyone, I’m very happy to be at Devoxx today to talk about a topic I really enjoy: signal reactivity in the front end. There are many of you—I didn’t expect such interest, and that’s very cool.

Before we begin, please scan the QR code to access an interactive page. You’ll find my socials, questions we’ll answer as we go, a link to rate the talk at the end, a place to ask questions for the Q&A session, and real-time reactions if something resonates with you.

To kick things off, tell me which framework you use for the front end via the page or the second QR code. Each framework handles its reactivity in its own way. Today we’ll look at signals, and specifically one way to implement them; you’ll see what we explore applies elsewhere.

I want to ask you a question: have you ever wondered how your front-end framework actually works? For example, when you click an element, how does another part of the interface update automatically? Have you ever found answers? That’s what we’ll see.

I’ll start with an equation: the user interface is a function of state. We often see it with React: a component (the function) returns JSX (the UI) and takes props (the state). We can apply it to our reactivity model: the UI is driven by a “black box” we call reactivity, which takes state as input. When we change state, the interface updates.

You already know this model thanks to Excel. Imagine a table with three rows and three columns: in B1 the quantity, in B2 the unit price, and in B3 a formula stating the total equals B1 × B2. [inaudible] It’s unsettling but fun. If we change the quantity from 0 to 3, B3 automatically becomes 45; if we set it to 2, the total becomes 30. The interface is indeed driven by state.

What matters to us today isn’t Excel but code and signals. We’re going to dissect a library: Alien Signals. My goal is that by the end you’ll perfectly understand what happens under the hood of those few lines.

Why Alien Signals? This library was developed by Johnson Chu, who contributes a lot to Vue.js on the Reactivity API side. For needs encountered especially on Volar (multiple LSPs within the same file, useful in Vue.js with its three blocks, and in Astro with JS and HTML), he wondered how far signals could be optimized. Today, Alien Signals is the most efficient signal implementation in the JavaScript ecosystem. It has other advantages: the logic is language-agnostic, with implementations in Rust, Go, and Lua. You can reimplement most signals from other frameworks, as well as those being standardized at TC39.

Let’s go back to the Excel example: if we change the quantity variable, the effect reruns and the total updates to 15. Our goal is to understand how the effect knows to update automatically when quantity changes.

Before we go further, let me introduce myself. My name is Estéban Soubiran, I’m an avionics software engineer at MaiaSpace, a subsidiary of ArianeGroup that develops partially reusable launch vehicles. On the side, I contribute to open source in the Laravel, Vite, Vue, and Nuxt ecosystems. We can talk Angular and React too, even if that’s less my strong suit.

When I have some time, I write articles. The latest presents, in my view, a good way to manage modals that stack gracefully. I also wrote about Fusion, which lets you write PHP in a Vue SFC, a somewhat odd concept but full of insights about Vite. You can find everything on my site and contact me on social media or Discord to chat.

What we care about are signals. To understand them well, let’s do a bit of math and graph theory. [inaudible]

A graph is a mathematical structure that represents links between objects. It has nodes (where computation happens) and edges, directed links from one node to another. If an edge goes from A to B, we can go from A to B, then B to C, but not back if the arrows don’t allow it.

In a directed graph, we can perform a topological sort: order nodes so we only visit a node after all its parents. For example, if A has D as a parent, we must process D first. We traverse the graph until we’ve visited all the nodes. There are multiple valid topological sorts for the same graph. We call this a DAG—directed acyclic graph. If there’s a cycle (for example a link from C to A), we could loop forever.

Another useful notion is doubly linked lists. You can see them as a graph where each element knows its next and previous. You can thus navigate both ways: from A to B, B to C, then back from C to B and B to A.

Let’s tie these concepts to the code we saw at the beginning. Signals are nodes in the graph. A computed is a value computed from other signals: we represent the total node linked to quantity and price. Total thus has two dependencies. An effect whose callback reads total is linked to total. This first view describes how elements are connected.

We can also represent these links with a doubly linked list to understand how we navigate the graph. This second view helps us model dynamic subscriptions and unsubscriptions.

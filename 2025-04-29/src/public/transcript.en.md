Hello everyone and welcome. I’m very happy to be here to talk about JavaScript and, above all, its packages—node_modules. Before we begin, scan the QR code: you’ll find my contact details, a question not to open just yet, links to ask questions, rate the talk at the end, and real-time reactions.

I’ll start with a chart: the is-string package reaches 160 million downloads per month in 2024 and keeps growing. Its feature is simple: determine whether a JavaScript value is a string. For comparison, React tops out around 140 million, and Tailwind around 60 million. Yet if I ask who installed it, most of you will say no.

Who installs these packages, and with what consequences? When you install via NPM, you fetch not only executable code but also the README, license, package.json, and other non-executable files. All of that takes install time and disk space. I’ll demonstrate with a few useful tools to understand our node_modules.

First, Node Modules Inspector. We search for is-string. The tool runs in a WebContainer, so the analysis faithfully reflects a local install. Result: is-string installs 15 dependencies and weighs about 254 KB. The breakdown shows that only 10 to 20% is actual JavaScript used; out of 250 KB, barely 25 KB is used at runtime.

This observation leads to the Ecosystem Performance initiative—a community aiming to speed up the JavaScript ecosystem: reducing and modernizing dependencies, analysis tools, proposals for native or lighter alternatives, and direct contributions to help projects simplify their node_modules.

Even before adding a dependency, we can assess its relevance. Package Size—the “classic” tool—installs the package in a WebContainer and shows install size, dependency tree, file type distribution, and added bundle weight. For is-string, we see ~15 packages, ~270 KB installed, and around 15 KB minified potentially included in the bundle.

Another tool: DevTree. It maintains a database of native substitutions and more modern alternatives. You can analyze a package or upload your package.json. is-string is classified as a “micro utility” with a native alternative: typeof value === 'string'. The same reasoning applies to micro-packages like is-number; these suggestions help trim superfluous dependencies.

Finally, npmgraph to visualize the dependency tree. Let’s take Storybook. In 8.2, the tree had around 400 transitive dependencies. That means long installs, slow startups (lots of files to read), and high maintenance burden: tracking dozens of updates, potential regressions deep in the tree, etc. After joint work with Ecosystem Performance, Storybook 8.4 drastically reduces this tree to a few dozen dependencies, simplifying maintenance and performance.

To learn more, visit e18.dev and the repository that maintains the replacement mapping (a large JSON shared by tools). The community’s Discord is very active, with regular discussions around Vite in particular. Thanks for your attention; I’m Estéban Soubiran. If you want to rate the talk, the link is on the Mixit page.

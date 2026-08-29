Hello everyone, very happy to be at Devoxx today to talk about a fairly unknown topic that I love: JavaScript packages. Today, we have packages for everything… and very often packages for nothing. That’s exactly what we’re going to explore.

Before we start, please scan the QR code here. You’ll land on a small dashboard with all my socials and a question; for now, don’t click it—we’ll answer later.

You can also rate my talk, but I recommend doing it at the end. At the bottom, you’ll find emojis you can click to react in real time if you find something interesting or if you have a favorite moment.

I like to introduce the topic with this chart showing downloads for the is-string package. is-string checks whether a JavaScript value is a string. At its peak, you see 160 million downloads per month.

You might say: 160 million per month is a lot, but what does it mean? I added React for comparison: at most, React plateaus between 120 and 140 million. I also added Tailwind as another reference point.

What surprises me—and I’d like to check it together: who here has ever installed is-string? I’m pretty sure nobody here has, even though it’s downloaded more than React. Indeed, that seems true: overall, nobody here has ever installed is-string.

Yet when we install a package with npm, we don’t only install the executable code we care about. We also fetch the README, package.json, transitive dependencies, the license, etc. In the end, we often install much more than the bare minimum. That matters, because we don’t want node_modules to become the heaviest thing in the universe—for your machine, your install times, and even Internet traffic.

Before going further, let me introduce myself: my name is Estéban Soubiran. I’m an avionics software engineer at MAIA Space, a subsidiary of ArianeGroup.

I contribute quite a bit to different ecosystems and open source projects, notably around Laravel, Vite, Vue, and Nuxt. When I have free time, I write articles: one explains what I think is the best way to manage modals, especially stacking; another talks about Fusion and shows how to write PHP in Vue SFC components—an odd exercise but very useful for understanding how Vite works.

You can find me on my website, my social networks, or on Discord to chat.

Let’s get back to is-string and verify what I said. Maybe when you install it, most of what you fetch isn’t code. I’m using a web container here, but everything I do can be reproduced on your machine, including in your projects via the npx command.

With Node Modules Inspector, we install the package, it performs analyses, and we browse the interface to see various metrics. First observation: installing is-string also installs 15 other packages—just to check if a value is a string—amounting to 254 KB of data on your computer.

In the report review, we see the ranking of packages from heaviest to lightest and the breakdown of what we install. The JavaScript part (in orange) is a minority: out of those 254 KB, only 10 to 20% corresponds to actually useful code.

is-string has an explicit name and you might quickly think we can just do typeof value === 'string' instead. The problem is there are many other packages with less clear names—harder to identify and replace—whether you’re auditing a project you maintain or evaluating a dependency before installing it.

That’s why an ecosystem emerged, E18E (Ecosystem Performance), with three goals.

First, cleanup: tidy up the ecosystem by opening PRs, modernizing or forking projects. Then level up: improve the ecosystem, for example with ESLint plugins that check your package.json doesn’t use obsolete dependencies or ones replaceable by runtime functions. Finally, speed up: by cleaning and reducing files and dependencies, we naturally speed up installs and loads.

I’ll show you a few tools to audit a module before installing it, understand what’s going on behind the scenes, and analyze your own package.json to detect dependencies replaceable by more modern alternatives.

First tool: Package Size. I use it whenever I install a dependency to see what’s inside. Like Node Modules Inspector, it installs the package in a web container and displays results: here, 15 packages, about 250 to 270 KB, with the composition (ESM/CommonJS, types, transitive deps), and links to GitHub or npm.

The bundle size section is interesting: at bundling time, does the entire package make it through? For simply checking a string, it’s still around 14 KB that enter your app.

Second tool: DepTree. You can enter a package name (for example is-string) or upload your package.json—even for an internal project not published on npm. DepTree builds on E18E’s work, which maintains a mapping between packages to avoid and more modern alternatives.

DepTree links your dependencies to these alternatives and proposes concrete replacements. For example, is-string can often be replaced by typeof value === 'string'. We also see packages like function-bind, replaceable today by Function.prototype.bind, or sError, replaceable by built-in runtime error types. We don’t always think of these substitutions, and you’ll likely be surprised when testing the tool on your projects.

Hello everyone, I hope you’re having a great Devoxx. For the next 15 minutes, we’ll discover what UnJS is and its vision for a unified and universal JavaScript.

Get your phones ready; there will be a few QR codes to scan.

Before we get into it, who am I? My name is Estéban Soubiran. I’m a developer at Infomaniak, an ethical Swiss cloud provider, and I’m also finishing my engineering studies in cybersecurity.

In my spare time, I love writing code and articles, sharing what I learn, discussing, and contributing to open source projects. For eight months now, I’ve been part of the UnJS team, which we’ll talk about today. You can find me on X, formerly Twitter; that’s where I’m most active.

Before going further, who among you knows UnJS? Scan the QR code and answer the question.

If the ecosystem doesn’t ring a bell, that’s normal—it’s fairly new, just over two years old. Yet it’s a real Swiss Army knife that can be useful in your projects, whether or not you publish packages on npm.

A bit of backstory: this is Pooya Parsa. For years, he’s been building tools to make life easier as a developer. In 2020, he became the framework architect of Nuxt, Vue’s meta-framework, with the goal of making it independent of runtimes and cloud providers.

To achieve that, parts of Nuxt’s code were extracted to simplify maintenance and lay solid, unified foundations for npm package authors and frontend meta-frameworks venturing into the backend. That’s how UnJS was born in 2022.

Since then, the project has evolved a lot. Today, it’s an independent organization on GitHub with over 63 packages, 50,000 stars, 400 million downloads per month, and 150 contributors.

Let’s discover a few packages. First, ofetch—similar to the browser’s fetch, but it works in both Node and workers. It offers extra features like creating instances, hooks to, for example, refresh an access token or log errors, and it automatically deserializes the response, so you don’t always need to call .json(). Using ofetch also gives you a consistent API between client and server.

Next, nypm. Between npm, Yarn, Yarn 2, pnpm, and now Bun, we have a lot of package managers, which gets annoying when jumping between projects. The idea of nypm is to stop thinking after a clone or pull: it automatically chooses the right command and package manager to install dependencies. One package and one command to rule them all.

Its architecture is modular, so it can be used in your scripts or by other npm packages, and it exposes all its utility functions. That’s UnJS’s philosophy: simple reuse.

Unbuild might be my favorite. A few years ago, publishing my first packages on npm and configuring the tooling was a nightmare, and then you had to do it again for TypeScript. With unbuild, you write a proper package.json, follow the README, and run npx unbuild: your package is ready to publish, with types, and CommonJS-compatible. Under the hood, it’s Rollup, so it stays very customizable.

Once the package is published, you want to release. Choosing the right version, updating everywhere, generating the changelog, committing and tagging the right commit—errors are easy, especially with pre-releases or when managing multiple packages. Changelogen uses your commits to do all that, generates the changelog, creates the release and tag, and publishes what’s needed. Like nypm, it exposes its utilities and can be extended in your scripts or integrated into other tools like changelogithub.

Defu is another simple and very handy tool. When building tools, we often pass options for configuration, then merge with defaults. As soon as the object is deep or contains arrays, we duplicate code. Defu recursively merges objects and arrays, combining elements cleanly, including deeply.

H3 at UnJS is a bit like Express, but fully in TypeScript and more modern: in your final bundle, you only get what you use. The API is designed to be intuitive, with composables; you can check the HTTP method, get the body or query, handle errors, return JSON or a redirect—everything is handled for you.

This very modular design enables a startup time—famous edge cold start—under 2 ms. It’s very fast.

H3 is nice but low-level; for more serious projects, the ideal companion is Nitro. Nitro is both a framework for edge backends and a toolkit for the next generation of full-stack frameworks. It powers Nuxt, Analog, Vinxi, and soon TanStack Start.

It’s so optimized for the edge that in production it fits in less than 1 MiB, excluding node_modules. It can be deployed automatically on more than 20 cloud providers with no configuration, and it’s compatible with all runtimes.

std-env detects the environment and runtime using various signals, to automatically adapt Nitro’s configuration. The developer has nothing to do at deploy time. You can also improve your tools’ DX by adapting their behavior to the environment.

The last one you might like is magic-regexp. Regexes can become technical and hard to maintain; imagine a simple language to write them. Magic-regexp is made of simple words that make sense together and help build and maintain your regexes, readable in natural language.

As a bonus, the type of the createRegExp function shows the generated regex and captured groups are automatically typed. Goodbye typos and drifting manual typings.

Caution: it’s not a reason to put regexes everywhere.

What you just saw is only a glimpse of what UnJS offers. For example, unplugin lets you develop plugins for Vite, Webpack, Rollup, Rspack, and Rolldown with a single API. There’s citty to build CLIs simply, [inaudible] for configuration management, uqr to generate QR codes, and many more.

Don’t hesitate to vote to tell me your favorite package by scanning the QR code. Questions?

What does UnJS add—are they just an organization developing these packages? UnJS is a GitHub organization that groups and develops these packages, with the goal of making front-end building blocks from Nuxt usable in many situations. They’re well developed and maintained, used by Nuxt and many other packages.

For example, jiti plays an important role: you can run a TypeScript file directly by invoking it with jiti, and it can also be used programmatically; it’s used by Tailwind, among others. There are low-level packages useful across the npm ecosystem, and others like Nitro are interesting for developers who want to publish a small backend at the edge.

Do you think it’s production-ready? Yes, without any concern. Most of these packages are used by Nuxt, among others. On unjs.io, you can see which packages are published on npm and which GitHub projects use them. It works in production; Nuxt is used by large companies. [inaudible]

I understand that there are packages whose goal is to unify things, and for others, like changelogen, we could compare it to release-it. Many packages come from Nuxt or tools initially created by Pooya. Changelogen exposes all its utilities, which allows other packages to reuse it, like Anthony Fu’s changelogithub that automatically pushes your releases from GitHub Actions.

This is also UnJS’s intent: foster reuse and extensibility. Very often, an npm package is usable but not extensible; UnJS seeks to fix that with reusable and extensible packages. [inaudible]

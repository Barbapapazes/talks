Hello everyone. I’m very happy to be here; I hope you’re doing well. There aren’t many of us, but you’re very spread out.

We’re going to discover what UnJS is together. We’ll do it interactively for two reasons: ask your questions at any time, and build the talk together. Get your phones ready to scan a few QR codes during the presentation; the more responsive we are, the sooner we’ll grab beers.

Who am I? I’m Estéban Soubiran. I’m a web developer at Infomaniak, an ethical Swiss cloud provider in Geneva. In parallel, I’m finishing engineering studies in cybersecurity, and I contribute to open source; since last August, I’ve joined the UnJS team on GitHub. You can mainly follow me on Twitter/X.

Before going further, who knows the UnJS ecosystem? It’s fairly recent, about 2 years old, and geared toward developers who publish packages on npm. It’s a true Swiss Army knife useful in many projects.

A bit of history. A developer started extracting and structuring tools to improve the developer experience. In 2020, he became a framework architect and led how Nuxt is built. With Nuxt 3, the goal is to be runtime- and provider-agnostic and compatible with the Edge, which led to extracting common parts into reusable, shareable packages.

UnJS was born in 2022. Today, it’s over 63 packages, more than 50,000 GitHub stars (all packages combined), around 400 million downloads per month, and 150 contributors. UnJS is a GitHub organization, not a company, and the ecosystem has evolved a lot since 2022.

The ecosystem is designed for npm package authors. If you’ve published any, you’ve likely faced difficulties: building, changelog generation, releases, and publishing to GitHub/npm. With dozens of packages to manage, you must automate.

Vite is dominant in the frontend, but we sometimes keep Webpack, Rollup, or esbuild depending on needs. Each has its own plugin interface, so writing a portable plugin often requires multiple codebases to maintain. unplugin solves this: a single codebase and single interface to generate plugins compatible with Vite, Rollup, Webpack, esbuild, etc., unifying the community around one package.

Let’s talk about H3. It’s like Express but fully tree-shakable. Utilities you import—like getQuery or readBody—are removed from the bundle if unused. The API is designed to be simple and intuitive: check the method, read the body, get the query, return JSON.

H3 was designed for the Edge, where startup time is critical. As an order of magnitude, H3 starts in under 2 ms and can handle the request very quickly. For comparison, with Nuxt 2 it was around 300 ms of server-side cold start.

Why be runtime-agnostic? For the Edge. Today, when deploying a server app (Laravel, Rails, etc.), you choose a data center; users worldwide hit that single point. The Edge borrows the CDN principle—present everywhere—to reduce latency and adapt content to the region. Code is packaged (for example, zipped) and executed on-demand as close to the user as possible; it must be lightweight and start very quickly. If a function already takes ~500 ms to start, you lose the benefit.

H3 remains low-level. For more ambitious projects, Nitro is the ideal companion. Nitro can be used standalone to build and deploy APIs (Cloudflare, your own server, etc.), and it’s also a toolkit for full-stack frameworks. It’s used by other ecosystems, like Solid and soon TanStack Start.

Nitro offers high-level primitives: database integrations, WebSocket, key-value storage, and deploys everywhere. Its strength is being agnostic with a system of presets automatically detected based on the environment to target the right provider. You can customize and extend it via plugins.

Another interesting point: at build time, Nitro can “self-eject” and rebuild a project ready to deploy, including node_modules, with a bundle often smaller than 1 MB. Nitro powers Nuxt.

For key-value storage, unstorage provides a backend-agnostic interface with a driver system. You can use a file driver during development, then deploy to a provider like Vercel without changing code. You can also mount prefixes dynamically to different drivers depending on the path.

Compared to multi-layer solutions like BentoCache (used by Adonis), unstorage is designed with the Edge in mind. Since functions are ephemeral, local application cache is less relevant; you often delegate caching to the infrastructure.

A word on MagicRegex. Regexes quickly become hard to read and maintain. MagicRegex lets you express them in structured natural language and generates the corresponding regex, with captured groups typed in TypeScript. The createRegex function shows the generated regex in the IDE.

Performance-wise, if the regex is static (no parameters), it’s compiled into a classic regex, with no overhead. If it’s dynamic, there’s a minimal, known overhead.

To conclude, we also could have talked about citty to build CLIs, defu to merge config objects, c12 to load and merge configs from the machine, and unbuild to create npm packages with zero config.

I mostly work on the site and documentation. When writing docs, we find bugs and fix them quickly, and I also contribute to approachable packages like citty or consola. Thank you, and feel free to ask questions.

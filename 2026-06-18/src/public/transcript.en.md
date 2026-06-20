Hello everyone, I hope you’re doing well. We’re going to start without slides, that’s okay.

I’m very happy that you’re here. I no longer have a microphone, but I have slides and everything I need. To get things started, I suggest we take a photo together: if you don’t want to be in the photo, put your hand in front of your face. Smile.

A quick bit of context about Vite: it’s a simple, omnipresent tool. Take the name of a framework you know — as long as it isn’t Next, Vite is probably involved. It’s used by Angular, React, Vue, Nuxt, Astro, and many others. The interesting question is: why has Vite become so widely adopted?

Because it’s a bundler unlike the others.

If the term “bundler” isn’t familiar, think of Webpack: it was the dominant bundler for the past ten years, but its adoption has started to plateau. Since then other solutions have appeared: Vite, Rspack, Snowpack, SWC. The real question is why Vite took the lead, and that’s what we’ll explore.

My name is Estéban Soubiran and I’m a software engineer at Takima. I’m passionate about front-end work and I discovered Vite a few years ago; I want to share a condensed version of what I’ve learned.

Another new thing this year: you can influence the talk’s content by scanning the QR code shown and choosing a theme. While you explore that, we’ll see what a bundler is.

In software, we often start an application with an executable produced by a compiler. On the web it’s similar: a bundler produces a bundle. So you can compare the bundler to the compiler and the bundle to the web executable.

Let’s visualize the architecture: on one side the browser, on the other the file system holding a standard Vite + Vue + TypeScript application. For example, in `main.ts` we import Vue, `App.vue` and create the application; we also have an `index.html`.

In the middle is Vite: the browser sends HTTP requests to Vite, Vite reads the file system, transforms files on demand and returns responses to the browser.

If you look at the requests in the inspector, you first see the root (`index.html`) load, which includes the Vite client and references `main.ts`. Then `main.ts` imports `style.css`, Vue and `App.vue`. The browser ultimately receives JavaScript: Vite transforms the sources (for example a Vue component) and returns JavaScript the browser can understand.

What sets Vite apart is that it uses ECMAScript modules (ESM) natively. It serves JavaScript files directly to the browser instead of doing a big initial bundle like Webpack. Its dev server is extremely fast: it starts instantly and transforms files on demand. Its configuration is simple and it relies on Rollup for production, which lets it reuse the Rollup plugin ecosystem.

Quick definitions: an ECMAScript module is a file that uses `import`/`export`. A module’s identifier is the string passed to `from`. A hook is a function that lets you plug into different moments of the Vite pipeline. A virtual module is an ESM module that doesn’t exist on disk and is generated on the fly.

Important to remember: in Vite, everything is a plugin. HTML handling, JSX support, CSS (with HMR, CSS modules and preprocessors like Sass), static assets and hashing, JSON, glob imports, dynamic imports, WebAssembly, Web Workers — all of that is provided by plugins.

For example, importing `style.css` from JavaScript works because Vite transforms the CSS into JavaScript and returns JS to the browser via the CSS plugin.

Summary: Vite is three main things — a development web server that transforms files on demand, a bundler for production, and an extensible plugin system.

Now let’s see how to create a simple plugin. A plugin is a function that returns an object with a `name` and hooks. The three main hooks are `resolveId`, `load` and `transform`.

`resolveId` allows you to intercept and optionally return or modify a module’s identifier. `load` receives an identifier and can return the module’s content — from disk, an API or even generated code. `transform` receives the code and the identifier and can perform transformations (for example replace `foo` with `bar` or compile a Vue SFC into JavaScript).

When multiple plugins exist, Vite executes a pipeline: for each hook it iterates over the plugins and passes one plugin’s output as the next’s input. For example, the Vue plugin’s `resolveId` can handle `App.vue`, then `load` reads the file from disk and `transform` converts the SFC into JavaScript, possibly followed by other transformations from custom plugins.

The “Vite Plugin Inspect” plugin is useful to visualize the stack of plugins applied to a file; it shows which plugins processed the file and which transformations were performed.

A plugin can also hook into Vite’s full lifecycle: the `config` method can modify configuration, `configResolved` receives the final config, `buildStart` and `buildEnd` let you perform tasks at the start and end of the build, like generating files or sitemaps.

Practical examples:

- “Simple Transform Plugin”: replaces a `buildTime` constant in `main.ts` with the build date via the `transform` hook.
- “ExternalMarkDownloader”: lets you import `dailynews.md` which doesn’t exist locally, fetch its content from a URL, transform the Markdown into HTML and export that HTML to inject into the application.

The concept of a virtual module lets you import `virtual:myPlugin` even if the file doesn’t exist. A plugin can `resolveId` the identifier `virtual:my-plugin`, prefix the id following internal convention and `load` return a valid JavaScript string. The `vite-plugin-virtual` package makes this easier by accepting a name→value map or generator functions.

This opens many possibilities: inject the latest Git hash at build time, fetch data from an API and include it in the bundle, auto-generate routes (as Vue Router does), etc.

A concrete case: an icon plugin. You can import `~/icon-library/icon-name` and get a Vue component containing the SVG. The plugin’s `resolveId` creates the virtual id, `load` calls Iconify to fetch the icon as SVG and returns JavaScript. That way you have access to hundreds of thousands of icons without installing them and without runtime API calls, because everything is resolved at build time.

To summarize virtualization in three points: Vite can generate virtual modules on the fly; `resolveId` and `load` are the key hooks to create those modules; the technique is widely used for build-time data injection, code generation and other automations.

Vite offers even more: HMR to update the UI without losing state, the ability to add middleware to the dev server, command runners to execute tasks while Vite runs, inter-process communication, macros to inject build-time code and even full-stack servers integrated via plugins, like Nitro.

With Nitro, for example, the browser sends a request to Vite, Vite can forward it to Nitro which runs backend logic (API calls, database access) and returns a response that Vite passes back to the browser. All of this integrates through hooks like `configureServer` and middleware.

In short, Vite is a pipeline between your files and the browser: each request can be transformed on the fly by a series of plugins, and you can create modules that don’t exist to do almost anything you want.

Some practical tips:

- Plugins run in the order they are registered; use the `enforce` property to control order (`pre`, normal, `post`).
- To efficiently filter identifiers, prefer a regex-based filter rather than doing checks inside the hook, which reduces Node↔Rollup interop costs.

In 45 minutes you’ve seen the essentials to write your first plugins: `resolveId`, `load`, `transform` and some lifecycle hooks like `configureServer`. With these elements you can create plugins to transform code, inject build-time data or integrate a backend.

Thank you all, that was Estéban Soubiran. I’m happy to read your feedback. If you have questions, now is the time.

About icon plugin security: there is a risk because you retrieve content from an external API, but Iconify can be self-hosted and includes protection mechanisms. As always, audit the plugins you install and prefer widely used and well-maintained solutions.

On migrating from Webpack to Vite: it depends on your project and the customizations you made in Webpack. For minimally customized applications the transition is often simple, but some plugins or features (for example Module Federation) may require alternative solutions or specific plugins.

For autocompletion with virtual modules, it’s possible to provide type declarations (DTS) or generate types in `node_modules` to enable editor autocompletion even if the module doesn’t physically exist.

Finally, imports resolved at build time let you prefetch resources; for cases where code must be executed to fetch data, you need strategies like a whitelist or fallback values.

Thanks again — any questions?
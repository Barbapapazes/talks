---
id: 2026-04-16/mixit
---
Hello everyone, I hope you're doing well. I'm very happy to see so many of you here today.

Before we start, I suggest we all take a little photo together. To keep a small memento, if you don't want to be in the photo, put both hands on your head.

Come on, everyone smile. Great, you all look fantastic.

Today we're going to talk about Vite. But first, a quick bit of context about Vite: it's a simple tool, everywhere. Take a framework you know—so long as its name isn't Next—and Vite is in it. It's used by Angular, React, Vue, Nuxt, Astro, [inaudible], in short, many others.

The interesting question is: why has Vite won such unanimous support? Because it's a bundler like no other.

Maybe “bundler” doesn't speak to everyone, so we'll take the time to explain it.

Some of you may have heard of Webpack, the historical bundler that dominated the landscape for the past ten years and is still widely used today. But even as the web has continued to evolve, it is no longer alone: there is Vite, Rspack, Snowpack, SWC, and others. Yet, as we can see, Vite has taken the lead.

Why? Is it just hype? Is it real? What is going on? That's what we'll try to understand today.

My name is Estéban Soubiran and I'm a software engineer at Takima. I have a small confession to make: I'm addicted to front-end development. I discovered Vite a few years ago and wanted to share a distilled version of what I learned.

Today you'll be able to take full control of the talk. Well, when I say full, not completely: it's really for the most important parts—you'll be able to choose the theme of this talk.

To do that, you'll just need to scan the QR code. Go ahead, you can scan it with your phone, open an interface with different buttons, click away, have fun, and in the meantime we'll get started.

I promised you: what is a bundler? Today we're used to starting our applications with an executable produced by a compiler. On the web, it's the same.

We have a bundler that will produce a bundle, and this bundle will be used to start our web applications in the browser. You can really see the bundler as a compiler, the bundle as an executable, and finally the bundle as the web's executable.

Great, I can see you've all connected fine. And now we also know what a bundler is.

But what interests us today is to know what Vite is in 2026. Wouldn't we ask an AI: “I'm new to web development, what is Vite and how does it work?”

It searches the internet, thinks, then thinks a bit more and answers us. But it's long, super long, and I only have 45 minutes. I really want to give you a condensed version.

So here are the most important things to know about Vite: it's a web server, with requests and responses over HTTP. It's based on ECMAScript modules, with import and export. It transforms files on demand. It's extensible with plugins.

All that is great, but it would be even better if we could make it a bit more visual. For that, we'll put a browser on the left, a file system on the right—the standard Vite Vue TypeScript starter, where we have our main.ts importing a style and an App.vue component, and a fairly typical App.vue.

In the middle we'll quickly place Vite. Then we make the browser talk to Vite over HTTP, and Vite reads the file system to send back a response.

To understand how this all works, we'll go into the browser and look at the HTTP logs. We see the browser makes several requests.

Let's start by requesting the document, index.html, which contains the Vite client and main.ts. Then it will request main.ts, which in turn imports our style.css and App.vue.

Next, it requests our style.css. It's odd: it's not exactly CSS, it looks a lot like JavaScript. But if you look closely, you can still find our original CSS on the file system.

Then it fetches Vue. Next, it fetches our App.vue component. That's not a raw .vue file either; it's also JavaScript. We'll demystify that a bit later, but we can see it has essentially loaded everything we expected, and we already have a better view of how Vite works.

Now, that doesn't yet answer our question: why did Vite overtake Webpack? Vite won because it uses ESM natively, so at startup it doesn't need to bundle your entire application.

It also won because in development it performs much better than Webpack. Your Vite server starts instantly and you can use it right away. Then there's this on-demand transformation pipeline we'll look at later, which is part of why it took the lead.

And its configuration is also much simpler, if you've ever tried configuring Webpack. It's not fun, and above all Vite is aligned with the ecosystem. In Vite you can reuse all the Rollup plugins.

We already have a lot of information, but there are still quite a few technical words. I think we could define them so we all start on the same footing.

First: ECMAScript modules. Basically, these are JavaScript files that use import and export, but we call them modules rather than files. For example, main.ts, App.vue, or style.css.

The module identifier is the string that identifies your module. When you do import from, it's what comes after from. That's the module identifier. For example, "vue" to load the Vue package.

Next are hooks. These are functions that let you insert yourself at different stages of Vite's pipeline. Finally, virtual modules: the idea that you have a module, in the ECMAScript sense, that doesn't exist on disk but is still fetched by the browser.

Great, we have everything we need. We can move forward a bit.

I have a little secret for you, but since it's a secret it must stay between you and me: all functionality is implemented as plugins. And that's awesome, because when we want to build a plugin, we can do whatever we want.

Right after this, we'll explore one of those plugins, and you can already choose which one by voting right here. In Vite you'll find different plugins corresponding to those features: HTML page handling, whether there's one or several at the project root;

JSX handling, so you can write .jsx or .tsx and it will be supported; CSS handling with HMR, CSS modules, or even preprocessors; static asset handling, including adding a hash to invalidate caches; support for importing JSON, glob imports, and dynamic imports.

All of that is provided by plugins out of the box. There's also WebAssembly and Web Workers, which you can use without extra configuration.

Next we'll explore this one. There's something we need to talk about.

Here we're importing an image into a JavaScript or TypeScript file, but normally that doesn't work. Try importing an image in JavaScript: JavaScript won't be happy. And yet in Vite it works.

It works because the browser doesn't care about the extension. As long as you send it JavaScript, it doesn't mind.

But that means we're sending the browser JavaScript, while we've imported an image. It's a bit odd. So let's go into the browser inspector and see what's happening.

In the inspector we fetch the document, index.html, which includes loading main.ts. Then main.ts is loaded, and it imports image.jpg.

That image.jpg is requested by the browser, and Vite responds with an export default containing the path to our image. In the end, Vite transformed the request to return the path to the image, not the image file itself, and so it works.

After that we can use it in our template to display the image. Another thing about images in Vite is that during the build Vite will add a hash to images, like it does for other files, to allow cache invalidation.

That's what we see here. And if you look at our index.js, we can see our image right there.

That's a lot of concepts, so let's do a quick recap. Vite is a development server that handles requests and responses and can transform files on demand.

It's also a bundler for production, capable of taking our code, transforming it, and making it usable by the browsers of our users. And finally, it's a plugin system that lets you extend all its functionality and make it do whatever you want.

That's very cool. But what does "make it do whatever you want" mean? The best way to find out is to build our first plugin.

A plugin is a function that returns an object, and since we like giving things little names, we give our plugin a name too. Here we'll call it myPlugin.

Then you have three methods that let you act on requests: resolveId, load, and transform. And there you go—you've made your first plugin.

Well, it doesn't do much; actually it does nothing. So I suggest we dive into each hook to understand what they do.

The first, resolveId, is the most puzzling. It allows us to take a module identifier and return it, or return a new one. That's it.

If that seems vague or of limited interest, that's normal—that's usually everyone's reaction the first time. Next we have the load hook.

It lets you go from a module identifier to its content. For example, we'll read the file system based on the identifier provided by Vite.

But in reality nothing stops us from reading a file elsewhere, calling an API, or even returning code in a string as if it were a file, even though that file doesn't exist. All three of those cases are perfectly valid.

Finally there's the transform hook, which lets us transform our code. Simple case: we replace foo with bar.

A slightly more complex case: if the file is a Vue file, we transform it into JavaScript for the browser. Great—we've seen our first plugin, built it together, and looked at the different hooks.

But there's still a question: how do we handle multiple plugins? Let's place ourselves in Vite's pipeline and look at it.

You have Vite's pipeline with two plugins, Vue Plugin and Custom Plugin. You have the different hooks: resolveId, load, and transform. At the top a request arrives, and at the bottom a response comes out.

The system iterates over each plugin, and we can inspect the input and output of each. So we have a request for App.vue.

We enter resolveId and encounter Vue Plugin; the input is App.vue, and Vue Plugin decides to return App.vue as well. The system then skips other plugins' resolveId hooks.

Next we continue on to load and encounter Vue Plugin. The input is the id from before, App.vue, and it will read the file system and load the associated Vue file.

Again the system skips the other plugins, so Custom Plugin doesn't get called yet. Then we move on to transform and Vue Plugin is called.

It receives the code we loaded earlier from the file system and transforms it for the browser. At this point Custom Plugin is called with the output of the previous plugin and can modify it further if it wants, and then it goes to the browser.

Great, we've understood a lot. It would also be wonderful if, instead of just seeing this in slides, you could inspect what's happening in your Vite pipelines: which plugins are called, in what order, and what transformations they perform.

Luckily there's a great plugin called vite-plugin-inspect that lets you do exactly that. If you look at a small CSS module you can see the whole plugin stack.

We go from nothing to loading the file from disk, then the CSS plugin transforms it into JavaScript for the browser. And you can do the same for a small Vue file.

We'll load it from disk, then transform it so the browser can understand it. Awesome. You can install this in all your Vite projects to discover what's happening behind the scenes and what changes are being applied.

But so far our plugin mainly acted on requests: it modified them on the fly, resolved them, and loaded them. Can we do other things with a Vite plugin?

With a Vite plugin you can hook into the entire Vite lifecycle. That means, for example, you have access to the config hook, which lets you read and modify the config. Here we would assign src to root.

You also have configResolved, which allows you to get the final configuration, store it, and reuse it elsewhere in your plugin. There are also buildStart and buildEnd hooks, called at Vite startup and at the end of the build respectively.

The first lets you prepare the ground, and the second can, for example, generate a sitemap. But we've seen Vite, we've seen how to build a plugin, we saw the various hooks, and how to integrate into Vite's lifecycle.

I feel a bit like I'm in front of my LEGO set: all the pieces are neatly arranged, but I don't yet know what to build with them. So it's probably time to make a couple of concrete things.

I propose we build two small plugins together. The first will be a Simple Transform Plugin that performs a simple transformation using a Vite plugin.

To visualize what happens: browser on the left, Vite in the middle, file system on the right. We're interested in main.ts.

We have a variable, a constant, and what we'll do is replace that string with the date when the system built the project.

To check the expected output we'll look in the browser. We have our requests with index.html fetching main.ts, and finally main.ts. We see on the file system the build time, but in the browser we receive a new date.

So we want to build a plugin that transforms what we have on disk into what the browser receives.

We make a plugin—a function returning an object with a name—and use the transform hook to perform this modification. We'll simply get the code and replace the string with the current date.

And there you have it: we end up with the date written into our file. Easy.

Second plugin: this one will let us load Markdown from an API and transform it into HTML so we can inject it into a page.

Again, let's visualize what that looks like. In main.ts we import a module called dailynews.md.

This dailynews doesn't exist in our file system. It's odd, but if you look at the browser logs there's a request for dailynews.md.

And if you look in main.ts, our dailyNews is present. Inside there's valid JavaScript exporting HTML that we can use later.

Great. What we want is a plugin that does exactly that. Again, it's a function that returns an object; we'll call it externalMarkdown.

We use hooks: when we see a file ending with .md we call an API, fetch the text, and return it.

Earlier we read the file system—now we read an API. Then we use transform with Markdown It to render that content into HTML.

So when the browser requests dailynews.md, we end up with that content. It's what we saw earlier in the visualization.

Amazing. Now we're little experts in Vite plugins.

Let's do a quick recap: since the beginning we've seen what Vite is, its pipeline, how to build a plugin, and we even built our first plugins together.

Three takeaways about Vite plugins: a Vite plugin is a function that returns an object with a name. There are three main hooks: resolveId, load, and transform.

There are also hooks that let you hook into Vite's lifecycle. In code it looks like this: a function, a name, and the various hooks.

Earlier I talked about returning code for things that don't exist—modules not present on disk. That's called virtualization, or virtual modules, and it's a key concept in Vite used by many modules.

Let's look at that together. We'll visualize what we want.

We're still with the browser, Vite, and the file system. In main.ts we'll import virtual:my-plugin.

What's interesting is that there's no file named virtual:my-plugin. And if you check package.json there's no dependency called virtual-my-plugin either.

It's weird, and yet it works. If you look at the browser requests, in main.ts it's prefixed with /@id/__x00__.

Then we have virtual:my-plugin, which doesn't exist on disk, yet it returns a string containing valid JavaScript.

That's strange. Isn't there a Vite plugin that enables this? Indeed there is, and we'll build it together.

To understand how it works we take our usual function returning an object with a name. In resolveId we check if the id equals the moduleId we want.

We'll simply prefix it with \0. That's a convention in Vite and Rollup.

Then we use the load hook. If moduleId matches the one we're looking for—i.e., prefixed with \0—we simply return a string.

And there you go: you've created your first virtual module. Not bad, right?

It's nice, but a bit verbose. Every time you want a virtual module it's quite long to implement. So there's a great plugin called vite-plugin-virtual that does exactly that.

Its usage is super simple: it's a key-value dictionary where the key is the moduleId and the value is a string or a function that returns whatever you want.

Because it can be a function you have lots of possibilities. For example, you could run a small process and return the latest commit.

But you could also, with virtual API data, call an API and return all the data so you have static data at build time and don't need to call the API on the client.

Honestly, that's neat. Next we'll build one ourselves, and it looks like you've chosen VitePress.

Let's explore VitePress. VitePress is a Vite-based tool for generating static sites.

One useful feature is .data.js files, which in a load function can fetch data, potentially from a CMS, so your VitePress site remains static when delivered to the client while updating that data at each build.

That's what we see in our Vue component: we fetch the data. All of that works with a virtual plugin, and we'll recreate it ourselves.

So it all starts with a small object with a name, as usual. Then in resolveId we check if the file ends with .data.js, and if so we prefix it with \0.

Then in load we execute the load function. In that function you might call an API, a CMS, whatever you want; you could even run subprocesses or build another project. You really have choices—you're in JavaScript, so you have freedom.

Then we return all that data in a new file. That's how, as we saw earlier, you can fetch and use data as static content in your built site.

That's a lot, and I'm very thirsty.

Since the beginning we've seen what Vite is, its pipeline, how Vite plugins work, the various hooks, virtual modules, and we've even seen a concrete example.

What do we take away about virtualization? That Vite can respond to requests with virtual modules—modules that don't exist on disk. That's super useful because it lets you generate data on the fly when needed.

In the examples we saw Vue Router generating your routes file. To create a virtual module you'll use resolveId and load.

Load lets you return code from any source. And finally you can use all of this very powerfully: generate lots of data, generate code on the fly, fetch external APIs. In short, you can do whatever you want because you have full control of the system.

Now the question is: Vite can do even more. We've seen some very cool things, but like I said at the start: with a Vite plugin, you can do anything.

For example, you can hook into HMR, Hot Module Replacement, which allows you to reload certain modules or even style files while preserving application state.

You can also, since Vite is a web server, hook directly into it and create custom middlewares. That can let you display new development-only pages or mock APIs.

You can also have a command runner. While working in Vite you might run parallel commands to automate tasks.

For example, if you're in your front-end Vite project and want to automate extracting API types from your backend, you put that in the command runner so you don't forget.

You can also do inter-process communication. If you have a PHP process and a Node.js process, you can make them talk via files.

There is also a whole macros system people built that lets you replace code at build time, like you can in C. And above all, some people asked: Vite is great, but it's only front-end—what if we put a small server inside and used it to build a full-stack framework?

We'll explore one of those features together. It looks like you want to explore HMR, so let's go.

For Vite's HMR, we'll start by seeing how it looks in the browser inspector. Our various requests go out, we fetch index.html, which contains the Vite client.

This Vite client is injected by Vite and sits right there. The client lets the application create a WebSocket connection, which we see, between the server on your machine and the page in the browser.

They can exchange messages in both directions. You can see them doing a little ping-pong.

Vite, the dev server, can send messages to the browser saying: “Hey, /src/app.vue changed.” You should update it.

The Vite client receives that, and we see a new request go out to fetch the updated version of the component App.vue. That's HMR: when you modify files, the change is reflected directly in your browser.

What's cool about Vite plugins is that you can make them do anything and hook into this. You can hook into HMR with the handleHotUpdate hook.

This hook receives the changed files. For example, if it sees the modified file is myext—could be a .ts file—you can invalidate it in the graph.

At that point WebSocket messages go out. But nothing prevents you, in this hook, from running a subprocess as soon as that file changes. You can automate tasks that way.

From the start we've seen that in the browser you can import style.css, import virtual modules, watch files change, react to HTTP requests. All of that is the same pipeline.

Everything passes through Vite with resolveId, load, and transform. We've also seen built-in plugins in Vite, like CSS or JSX, and others you can build yourself.

There are plugins for routes, icons, retrieving build info like the latest commit, and you can play around the pipeline with HMR, lifecycle hooks, middlewares, and so on.

Ultimately, what do we remember? Vite is a pipeline between your file system and your browser. It modifies files on demand and transforms them as you wish.

We also know you can create plugins that produce modules that don't exist, and that's powerful. It allows many things, like fetching data from an API as we saw earlier.

And finally, everything in Vite can be extended by a plugin. So if you can't find what you need in Vite, write a plugin and you should be happy.

In code, a plugin looks like this: a function returning an object with a name, the three main hooks for transforming modules—resolveId, load, and transform—and many others to act on Vite's lifecycle.

We saw handleHotUpdate. configureServer, for example, would let us hook into Vite's web server and create custom middlewares.

With all that you have everything you need to create your own plugins. But if you want to go further, I have two small bonuses for you.

The first bonus is that in Vite the registration order of plugins is very important, because that's the order Vite runs them. Here Vite will run Vue Plugin, then Custom Plugin, then Another Plugin.

Plugins have an enforce property that lets you choose when they run. For example, Another Plugin runs first because enforce is set to "pre", then Vue Plugin, then the one with "post", so Custom Plugin. You can change the execution order of your plugins.

Second tip: hooks are executed every time, and your way of filtering modules you don't want to process is often a small conditional checking it's a file.

This can be problematic because your function runs each time the plugin executes. Now, with Rolldown there's an overhead when crossing from Rust to Node.js. What they've done is a small filter so you avoid running your function in JavaScript, reducing that overhead.

In 45 minutes you've discovered everything you need to understand what Vite is, its pipeline, how it works, how to build your first plugins, and which hooks enable what.

Now you have all the keys to build them yourself. Bravo.

Thank you all, that was Estéban Soubiran. I'll be very happy to read your feedback, and otherwise we'll meet on the internet.

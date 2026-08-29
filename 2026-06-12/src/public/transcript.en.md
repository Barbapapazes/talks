Hello everyone, I hope you're doing well.

I'm very happy to be here with you, and I'm very happy to see so many of you here to talk about Vite and its plugins.

Before we begin, I'd like us to take a quick group photo together. If you don't want to be in the photo, I simply invite you to put your hands over your face.

Alright, everybody smile. Awesome, you look fantastic.

A quick bit of context on Vite: it's a simple tool, and it's everywhere. Take the name of any framework you know: as long as that name isn't Next, there's Vite inside it.

It's used by Angular, React, Vue, Nuxt, Astro, TanStack, blah blah blah, in short, lots of others.

The interesting question is: why does Vite get so much unanimous support? Well, because it's a bundler unlike the others.

Maybe “bundler” doesn't necessarily mean much to everyone, so we're going to take the time to explain it again.

Some of you may have heard of Webpack, the historical bundler that, over the last 10 years, has shone very brightly on the web. But you can see it here, right here, it's starting to stagnate, even while the web kept progressing.

And that can be explained by the fact that it's no longer alone. There are others: Vite, Rspack, Snowpack, SWC, in short, others.

But the question we can ask is: why is Vite pulling ahead? Is it hype? Is it reality? What's going on? That's what I suggest we look at together.

My name is Estéban Soubiran, and I'm a software engineer at Takima.

I have a confession to make: I'm addicted to front-end. I discovered Vite a few years ago, and in 45 minutes I wanted to share with you everything I've learned since then.

And I have a second confession to make: I'm going to leave full control of the talk to you. Well, when I say full, not everything either, really just the most important stuff.

So you're going to be able to choose the theme of this talk. To do that, I simply invite you to scan the QR code, answer the question, go to the platform, interact with it, play around, and you'll see: the theme will change as we go along.

But I promised you: what is a bundler?

Today, we're used to starting an application with an executable. That executable is produced with a compiler.

Well, on the web, we have our bundler, which will let us produce a bundle, and that bundle, when we run it, will let us run our application in our web browser.

In fact, we can really see our bundler as the compiler, and the bundle as the web's executable.

All of that is great, but it still doesn't explain what Vite is.

And I think to myself: in 2026, what if we asked AI what Vite is? Come on, let's ask it.

So: I'm new to the world of web development, what is Vite and how does it work? We ask it, it searches the Internet, it searches, it thinks, and it answers us.

Now, that might be nice, but I only have 45 minutes and I really want to give you the condensed version. So, what is Vite?

Vite is a web server: HTTP request, response, all of that.

It's also based on ECMAScript modules, with imports and exports. It's also able to transform files on demand, and it's also extensible with plugins.

And with all that, you know everything about Vite.

Now, that's great, but it's not very visual. I like it better when it's more visual.

So let's draw a little diagram. On one side, we're going to put our browser. On the other, we're going to put our file system.

This is the standard Vite Vue starter, nothing extraordinary in there. We have `main.ts` here, and just below it, our `app.vue`. It's a starter.

In the middle, we're quickly going to place Vite. Our browser is going to talk to Vite over HTTP, and Vite will be able to read files from the file system.

What we're going to look at now to better understand how Vite works is this: we're going to put ourselves in the browser and take a look at the HTTP logs.

So what do we see? We see that we have an initial request made to `localhost:5173`. We're going to fetch `index.html`.

In that `index.html`, we can see that in our source file we have a `main.ts`, and the browser receives a `main.js`. That works out nicely for us: we can see that here we're retrieving a `main.js`.

We can also look and see that we're going to retrieve a `style.css` and an `app.vue`. We had them in our template earlier, so everything is fine.

So we come here, we see our `style.css`, we open it and… OK, we had CSS on our file system. If we look a little more closely, we can see our CSS, but it still looks a lot like JavaScript.

Then we see that Vue is being loaded, and we have our `app.vue`. Same thing, we can open it. It was a Vue file on disk, but now, apparently, it's JavaScript.

That's not a big deal. For now, that's not what interests us most. What interests us is that we've seen a bit of what happened, we've seen how Vite is connected to our browser and the file system, so things are already much clearer.

Why did Vite establish itself as a bundler? Vite established itself as a bundler because it's native ESM.

It sends ESM files directly to your browser, without having to pre-bundle them. So that means your server won't take two or three minutes, giving you enough time to go make coffee when you start your bundler.

It's also the performance of the dev server. With HMR in just a few dozen milliseconds, you save a file and you don't even have time to look away before your browser is already up to date.

It's also its ability to transform files on demand that makes it so powerful. It's much simpler to configure than Webpack, for example, which makes it much easier to get started with.

And finally, above all, it's its alignment with the ecosystem, because since it was based on Rollup, when it came out, all Rollup plugins were compatible with Vite.

With all of that, we better understand how Vite made its mark.

For the rest, we're going to need to realign a bit on a few definitions.

The first is that of ECMAScript modules, which we can broadly define as a file in which we use imports and exports. For example, the `main.ts` file is an ECMAScript module.

We also have module identifiers. When you write `import something from`, what comes after `from` is what we're going to define as the module identifier. So here, it could be `vue`, it could be `./app.vue`, it could be `virtual:mymodule`, whatever.

You also have hooks. A hook is something we'll define as a function that you can put in your plugin, and that will let you plug into different stages of the pipeline.

And finally, you have the notion of a virtual module. That's an ECMAScript module that simply doesn't exist on your disk.

Now that we're aligned on all of that, we can dig a little deeper into Vite.

There are lots of features in Vite. And right after that, we're going to dig into one of them. So if you want to choose which one we're going to explore, you can scan the QR code and make your choice.

And that's good news for us, because it means that when we want to create our own plugin, in fact, we'll be able to do whatever we want.

For example, you have a plugin that handles HTML files. You have a plugin that handles JSX, so you can directly write JSX files: it's built into Vite.

You can also directly manage CSS with HMR, modules, and preprocessors: all of that is handled in Vite. Everything related to static assets, same thing, JSON, glob import, Vite takes care of that through dedicated plugins.

Dynamic import, WebAssembly, and WebWorkers, which are pretty annoying things to set up, Vite handles those for you.

And together, we're going to explore JSX loading on its own.

Here, you have a file in which we can clearly see JSX, a relatively standard JavaScript file. The thing is, in reality, that doesn't work.

If you put that in your browser, it's not going to work. In fact, it's not going to work unless what you want to send to your browser is JavaScript.

But we've written JSX. So how do we send JavaScript back to it? Well, because Vite is going to take care of that.

If we put ourselves in the browser inspector a bit, we can see what happens. Here, we're in the inspector, and we clearly have our request going to `localhost` to load, just like before, `main.ts`, or rather in this case `main.jsx`, since we wrote JSX in our `main.jsx`.

And we can see it: what comes back isn't JSX at all, it's JavaScript. And that's something a Vite plugin takes care of.

And then you have the same thing with the JSX item. All the features you saw just before are handled in exactly the same way by Vite.

So we've already started to see quite a lot. We've seen how Vite became established as a bundler, we've seen why it pulled ahead, and we've seen how Vite works in broad strokes.

What do we take away from all that? We take away that Vite is a web server for development, which allows it to manage requests coming from the browser and transform them on demand.

All the features you saw just before are handled in exactly the same way by Vite.

We also take away that it's a bundler for production. It will transform our files, and it will let us put them into production on a server so they can be used by our clients, with the proper hash.

And it's also a plugin system that lets us extend it and add any functionality we need.

Speaking of plugins, maybe it's time we made our first plugin together.

A plugin is nothing more than a function that returns an object. And in that object, we're going to give our plugin a nice little name.

Then we're going to play with different hooks. The first one is `resolveId`. The second is `load`. And the third is `transform`.

From that point on, you've made your very first plugin. Now, we agree, it doesn't do much.

So what I suggest is that we explore the different hooks a bit to better understand how all of this works.

The first hook is `resolveId`. It's the most confusing of all, because what it lets us do is retrieve a module identifier and return it.

Said like that, it sounds a bit useless and abstract, but we'll see: it'll become a bit clearer as the presentation goes on.

The second hook is `load`. What it lets us do is go from a module identifier to its content.

For example here, and this is Vite's default behavior, we're going to retrieve a module identifier, in this case `src/components/HelloWorld.vue`, and we're going to read the file from disk.

But nothing stops us from making an API call, for example, and retrieving the content so we can send it back. Because in the end, when we display something, we're getting a string: we could do the same thing with an API call.

And more than that, nothing stops us from simply returning a string. In fact, all three of those cases are perfectly valid in Vite.

And then the last hook is `transform`, which is going to retrieve both the code we just loaded in `load` and the module id, and which we're simply going to be able to modify on the fly.

So in the simple case, we're going to replace `foo` with `bar`. Or, in a slightly more complex case, if the file ends with `.vue`, we're going to transform it and send it back to the browser.

We're going to transform it so that it becomes JavaScript the browser can understand.

All of this is nice, but so far we've only seen one plugin. What do we do if we have several plugins? How do they orchestrate themselves? How do they work together? How are they put in place?

That's what I suggest we look at with this pipeline.

In this pipeline, at the very top you have the request coming from the browser. At the very bottom, you have the response going back to the browser.

In between, you have the different hooks we've seen: `resolveId`, `load`, and `transform`. In Vite, we've injected two plugins, the Vue plugin and the custom plugin, each with the three hooks.

What Vite is going to do is iterate over each plugin for each hook. And we're going to place ourselves, step by step, on each hook and look at the input and output of each one.

So we have the request for the `src/app.vue` component. We arrive with that request, we enter `resolveId`, and then we have the Vue plugin.

In the Vue plugin, we indeed have our `app.vue` as input, and as output we're going to return `app.vue`. Since we returned something, Vite will stop iterating there and completely skip the next plugin.

Then we continue on our way. We get to `load`. We see the Vue plugin, we execute it. As input, we indeed take our `app.vue`, and as output we're going to read the file system and return the component.

Same thing there, Vite will stop execution, and the custom plugin will be completely skipped.

Then our request reaches `transform`. We arrive with our code and our module identifier. We encounter the Vue plugin, and there we have an input, namely our code, which is going to be transformed into JavaScript.

And then the custom plugin can also be executed, except that it will no longer take as input the code we got from `load`, but the code from the previous hook, which it can in turn transform.

And finally, the full JavaScript response here is what will be sent back to the browser.

All of that is super nice, but it's on my slides, so it won't let you see what's happening in your own projects.

Fortunately, we have a great plugin called `vite-plugin-inspect`, which will let us do exactly that.

You can all install `vite-plugin-inspect` in your Vite projects, and it'll work without you having to do anything. What it lets you do is precisely see the whole plugin stack that gets called, so you can inspect any transformations that might be happening.

If we take, for example, a CSS file, the `a.css` file, we can see that at first there is nothing. Then it's loaded from disk with the `load` function, which is Vite's default one, and we can see that the file is loaded and appears here.

Then we're going to have a CSS transformation to turn CSS into JavaScript, so that the browser can understand it.

But we can also go look at a Vue file, for example. If we search for Vue and get that one, we can see that we load the file from disk.

Then, quite simply, we allow ourselves to inject a bit of extra code. Why not? Then we're going to transform that file into JavaScript so the browser can understand it.

So we've seen the different hooks that let us plug into the request. We've seen the pipeline, and we've also seen how, in your projects, you can be in a position to see that whole pipeline.

For me, it's a plugin that helped me a lot in understanding Vite, but also in debugging, because the more plugins you write, the more the transforms can quickly turn into a mess.

But in Vite plugins, you also have the ability to plug into other parts of Vite.

For example, you have the `config` hook, which lets you modify the config before it's resolved. So there, for example, we'd rather change `root` to `src`.

You also have the `configResolved` hook, which lets you retrieve the resolved config. So once all the plugins have gone through it and we've retrieved the user's config, then you have the final configuration. It's useful for inspecting things like `root`, for example.

You then have the `buildStart` hook, which runs when Vite starts, and the `buildEnd` hook, which runs when Vite shuts down. They let you create side effects.

For example, with `buildStart`, you can inspect the project a bit, scan it, prepare the ground, and then with `buildEnd`, generate a sitemap, for example.

All of that is super nice, except it doesn't concretely tell me what it looks like. I kind of feel like I have my box of Lego bricks: all my Lego is beautiful, it's neatly arranged, but I haven't built anything. What can we do with it?

What I suggest is that we build two plugins together. The first one is `SimpleTransformPlugin`, which will let us simply perform a small transformation in a file.

We're going to reuse our little diagram from the beginning. We'll put our browser on one side, our file system on the other, and Vite in the middle.

In the `main.ts` file, we're simply going to have a `buildTime` variable whose value is `buildTime`.

Our goal is going to be to replace that value with the real build time value when the file goes through Vite.

Concretely, if we look a bit at our HTTP flow, what we'd ultimately like is to be able to go from that `buildTime`, which is what's in our file system, to that value, a date. That's what the browser receives.

And between the two, there's Vite, so everything is going to happen in a plugin.

To do that, we make ourselves a small plugin. We give it a little name, because we like naming things, and we call it `simple-transform`.

Then we're going to use the `transform` hook, which will retrieve the code of all files. In this case, we only have one, `main.ts`, so it's easy.

We're simply going to replace, in that file, the string `buildTime` with a new date. And then you end up with your plugin transforming your code on the fly, and in your browser you have the right date.

That was relatively simple.

Another thing we can do is load markdown that lives on another server.

Here, what we want to do is, if we look at our `main.ts`, we can see that we're importing an object called `HTML` from an import called `dailynews.md`.

But that `dailynews.md`, as we can see, isn't on our file system. So we're going to have to play around with plugins a bit to make something happen.

If we look a little more closely at the requests and what's happening in the HTTP logs, we can see that we're loading our `main.ts`, and in that `main.ts`, we still have our `dailynews.md`.

Our goal is for the browser, afterwards, to put that HTML into our DOM.

The new twist is that our browser sees an import of `dailynews.md`, so it also makes a call to retrieve `dailynews.md`. Because we saw that, in fact, it doesn't really care what's inside; it doesn't care about the extension: it just loads it.

Whatever it sees, it loads. So it's going to load `dailynews.md`.

We can clearly see that we don't have anything on our file system, and yet here we do have an HTML block in a variable that we export as `default`.

So once again, we're going to have a plugin that can take care of that.

That plugin is going to be slightly more complex. We'll call it `external-markdown`, and inside it we'll have an initial function called `load`.

Its goal is to go from a module identifier to its content. What we're going to do is filter out everything that doesn't end with `.md`.

And then we're going to make an HTTP request to another server, using the module identifier to go load the content.

Once we've done that, we can add another hook, which will let us retrieve what we just loaded in the `load` hook and transform the markdown into HTML.

If we look closely, we get exactly what we saw earlier in our HTTP logs: we have our variable that will contain the rendered result of what we loaded from the external server, and we're going to export it as HTML. And that will be loaded into the DOM.

What do we take away from all this? At this point we've seen a number of hooks, we've seen concrete examples, and it's already starting to add up.

With Vite plugins, what we take away is that a Vite plugin is ultimately a function that returns an object, and that object has, at minimum, a name.

Then, what we take away is that we have three main hooks that let us act on modules and on requests: the `resolveId` hook, the `load` hook, and the `transform` hook.

And finally, what we also take away is that there are hooks that let us act on Vite's lifecycle. And there are others that we'll see later.

Now that we've seen all that, what we're going to be interested in is a very important part of Vite, one where people often have a hard time understanding what is happening: virtualization.

That is to say, we're going to be able to write plugins that virtualize modules. In fact, we touched on it a little earlier, but now we're really going to go into the details.

What does that mean? If we look a little more closely at our diagram and then at our project, we'll see our `main.ts`, in which we're going to import a module called `virtual:mymodule`.

If we look around our project, there's no module named that, and there isn't even a dependency with that name, and yet our project works perfectly fine.

It works perfectly fine because, if we look at the HTTP logs, we can clearly see that the browser loads it and gets a response. The only difference we can notice is that it doesn't load exactly `virtual:mymodule`: it loads `@id/__x00__`, and Vite sends back `This is a virtual module`.

But how does all of that work under the hood? Well, under the hood, if we look a little more closely, it all starts with a plugin.

In that plugin, it's still the same function that returns an object, in which we have a little name, and here we're going to call it `MyVirtualModulePlugin`.

In that plugin, the first thing we're going to do is add a `resolveId` function.

In that `resolveId` function, we're going to check whether the identifier passed to the function is equal to the identifier we're looking for, namely `virtual:mymodule`.

If that's the case, we're going to return the module identifier prefixed with `\0`.

The prefix is simply a Rollup convention that we reuse in Vite.

By doing that — and I told you earlier, `resolveId` is a bit weird — in fact, by doing that, we're simply telling Vite: don't worry, I'm handling this one.

We're making it understand that this import really doesn't exist anywhere except inside the plugin, and that the plugin will take care of providing the code Vite needs. Otherwise, Vite panics and throws a little error at you.

Then we're going to use the `load` hook, which lets us go from a module identifier to its content.

And if that's the case, we simply return a string. In this case, it's a valid JavaScript string, because it's going straight to the browser.

With all of that, you've created a plugin that lets you create virtual modules, because your `virtual:mymodule` module doesn't exist. It only exists inside Vite, in your plugins.

But that's a bit verbose to write and a bit tedious. So there's a plugin that simplifies that, called `vite-plugin-virtual`.

It's a super simple plugin: it takes an object as a parameter, a key-value object, where the key is the module identifier and the value is a function, a value, pretty much whatever you want, as long as it's valid JavaScript.

For example, here we have `virtual:git:commit`, and that's the import. You'll be able to import that from a `main.ts` file, for example, and it will execute the function.

And inside the function, as we can see, it will execute a subprocess using `git` to return the latest commit. So that's very useful if, for example, you need to display the latest commit in your interfaces at build time.

But you also have the option of retrieving data from an API, for example. So here, for example, we've made an API call, retrieved the JSON, and returned it as JavaScript.

Virtual modules are used a lot in the ecosystem. We don't necessarily realize it, but for example Vue Router uses this technique.

To generate its routes on the fly — in other words, to do filesystem routing — VitePress uses it to let you load your data from a CMS while building a static site.

There are other examples like that. You didn't vote. Maybe I was wrong too, it happens. So we're going to look at that one.

In that plugin, what we're going to be able to do is import things from `~build/info`, for example, in our project, but with information that's retrieved at build time.

We can see it here: what would be displayed in the console is what's right below, the little code block. So we do get the latest commit and a date. It's even today's date.

And how does that work? In fact, that plugin, which is called [inaudible], works exactly the way we saw earlier.

We have this function that returns an object in which we have its little name. We have the famous `resolveId` hook, which lets us see whether the identifier is one known and handled by the plugin.

So in fact, what we did earlier is used in plugins you can install, and now you've just understood how all those plugins work.

If we go back to the Vue Router example, it would be exactly the same thing. When it encounters the identifier, here in `load`, it would read the whole file system to generate the router.

And if we add another feature to our plugin, we get back what we saw earlier with the previous plugin, which lets us retrieve the latest commit by executing a subprocess.

And since this is JavaScript running in Node and not in the browser, you can really do whatever you want. You have access to all of Node's APIs.

So that's really super handy.

The virtualization part is a bit complex, so let's do a quick recap.

Vite can respond to module requests for modules that don't exist. So your browser, no matter what, sees an import and imports it.

You can tell Vite what it should respond with, and that happens with two main hooks: `resolveId`, to tell Vite “don't worry, I'm handling this module,” and the `load` hook, which lets you return content.

And it's also used by lots of plugins in the ecosystem, without us necessarily realizing it, whether to generate code, inject code, or do lots of other really interesting things, like writing macros.

If we summarize a bit what that looks like, it's basically this: you have your identifier, you prefix it with `\0`, and you play with `resolveId` and `load`.

Now that we've said all that, Vite can actually do even more.

With plugins, you can customize Vite enormously to meet all your needs.

For example, you can interact with HMR. HMR, which lets you reload modules in your browser while keeping state, is something you can play with.

You can also plug into Vite's middlewares, because it remains a web server, so you can display new pages to your developer, for example.

That's what the `vite-plugin-inspect` plugin does on the page we saw earlier, where I was searching for CSS or Vue. That's a page sent back to the browser by plugging into a middleware.

But it can also let you mock an API, for example, while your real API is not ready yet.

You can use it as a command runner or a process manager. When you make a change to files, you can launch subprocesses to retrieve information from an API or regenerate types.

You can do interprocess communication, you can even do macros. And there are people who thought: Vite is so strong on the front-end that we could take it one step further and actually put a server into it, so that Vite becomes full-stack.

With a plugin.

And what I suggest, since we're diving into one of them, is that we take a look at HMR.

So let's look at HMR. To do that, we're going to dive into our inspector and see a little bit what happens.

Here we have all the requests made by the browser for our template. What we see is that here it's going to load our `index.html`, still with our `src/main.ts`.

What's interesting is that Vite also injects another import on the fly: `@vite/client`.

That client is going to load everything the browser needs to do HMR, and everything Vite needs to do HMR.

Because then we can see it: we're going to load our `main.ts` in a fairly standard way, our `app.vue`, and so on. And then, by contrast, we see a WebSocket connection being established.

In that WebSocket connection, we're going to have the exchanges between the browser and Vite.

For example, we'll have a message saying that the connection has been properly established. We'll have little `ping` messages saying, “don't worry, I'm still alive.”

And then from time to time, Vite will send a message to the browser and say: hey, I have a small update for this file, do something.

And then the Vite client, `@vite/client`, will receive that and reload that module.

What's interesting is that you can intercept that yourselves as well, in order to build new features with your plugins. And we can see it in our browser: `app.vue` gets reloaded.

It's reloaded with a `?t=` suffix and a new date, simply to invalidate the cache, because Vite has a very aggressive cache in the browser.

So how does that plugin work in broad strokes? It all revolves around a hook called `handleHotUpdate`, which lets us retrieve a context.

In that context, we'll notably have the file that was modified, the server, which is Vite, we'll be able to retrieve information, and all the descendant modules of the file that was modified, since there is a whole graph system.

The idea is that the user modifies a file. We can invalidate the graph so that Vite tells the browser: “This file has been touched, please reload it.”

And that's the kind of code we're going to write. Honestly, you chose the most complicated plugin, but it's not a big deal.

So now that we've seen all this, what do we still have left to see? Well, not much, actually. We've more or less covered it.

From now on, your creativity gets to take over.

We've seen in the browser that we could import a `style.css`, for example, that we could import a `virtual:mymodule`, and that the browser would load things. We also saw that there were events it could react to, whether an HTTP request or a changing file.

On the other side, we have Vite, where we have `resolveId`, `load`, and `transform`, which are our main hooks for reacting to all of that.

In fact, from the very beginning, it's been the same pipeline we've been talking about. Whether it's to modify a file on demand, create a virtual plugin, or add functionality, it's always the same pipeline with its three main hooks.

And we also saw that, with our plugins, we can handle images, markdown, but there are others. And around that pipeline there's a whole ecosystem and lots of ideas that let you extend all those features.

So if we recap all that, what do we keep in mind? We can keep in mind that, ultimately, Vite is a pipeline between your files and your browser, and that for every request, you have the option to transform it.

What we also keep in mind is that a plugin can create modules that don't exist. That's crazy, but it's pretty amazing.

So you can generate all sorts of things on demand, whether from existing data, data on a remote server, or by running subprocesses.

And in the end, everything can be extended by a plugin. We saw it with the extended features: there are even people who turn Vite into a full-stack server.

And if we recap what a plugin looks like, it's that famous function that returns an object with a name, `resolveId`, `load`, and `transform`.

And with extra hooks, notably `handleHotUpdate`, which we saw, or `configureServer`, precisely to create middlewares.

With everything you've seen here, you now broadly have the ability to create your first Vite plugins on your own. And that's pretty great.

What I'm about to show you now is really advanced stuff. It's nice to know about, and it's useful when you need it. You don't need it every day.

By default, Vite plugins are executed in the order in which they are registered. So that means that here we're first going to execute the Vue plugin, then the custom plugin, and finally `another-plugin`.

The question we might ask is: maybe I want my plugin to run before, or after. We can reorder them, that's true.

But if you have plugins coming from elsewhere, because a plugin can also give Vite multiple plugins? A plugin can return not just an object, but an array of objects.

At that point, you can't really reorder your plugins internally. And even relative to Vite's built-in plugins, how do you reorganize your plugins around that?

In fact, you have to imagine three big buckets. You have a `pre` bucket, a `post` bucket, and the middle bucket, which has no name.

And with the `enforce` property, you'll be able to reorganize your plugins a little bit.

In the example, `another-plugin` will run first because you put it in `pre`. Then the Vue plugin will run second, because it is in the middle bucket, where it has no `enforce` property. And the custom plugin will run last with the `enforce: 'post'` property.

And there's a second interesting thing. Since Vite version 8 moved to Rolldown, you have Rust running, and therefore an overhead when going from Rust to JavaScript to execute plugins.

And we saw it when we were filtering, whether for `.vue` or `.md`. Basically, every time, what we were doing was an `if`.

It ended with `.md`, and in that case we just did a `return`, we didn't execute anything. But for Rolldown, that still means it has to go execute the JavaScript plugin.

So now you have a new way of writing that: simply by turning `transform`, and all the hooks in which you need filtering, into an object.

You'll be able to prefilter upstream, and the regex will be passed directly to Rolldown so it can do that filtering on the Rust side and avoid coming back into JavaScript.

And in the end, in 45 minutes, you've discovered everything you need to build your first Vite plugins, and that's pretty awesome.

Thank you all, this was Estéban Soubiran. If you liked it, I invite you to leave feedback.

And if all of this felt a little abstract, a little theoretical, I have a little gift for you with the second QR code: you have 45 minutes of content where we're really going to get into practice, 45 minutes of video content where you'll be able to create plugins step by step with me, and you'll get to see a bit more concretely everything we saw here. Thank you.

Here we are already at the last session of this Devfest. You are the survivors, and so is the speaker, congratulations to you.

Do you want to discover how to improve your pipelines, shrink your builds, simplify project maintenance, and reduce the attack surface of your apps?

Estéban Soubiran will guide you through exploring a world where JavaScript is cleaner, faster, and safer. Please give him a warm welcome.

I hope you’re doing well. I’m very happy to be here today to talk to you for the next dozens of minutes about JavaScript and its packages, its non‑modules.

Before we begin, I’d like us to take a quick photo all together because I love that, and especially because the room today is huge. If we can get a bit of light that would be great. No light? Not a problem, we’ll do it without. Alright everybody smile. Great.

To start this presentation properly, I’ll invite you to scan this QR code. It will take you to a page where you can find my different social links. You’ll also be able to answer a question—don’t do it yet—and throughout my talk react to what I say if you like, if you don’t like, or if you agree.

At the end you’ll find the link to rate the talk, but I recommend doing it at the end, it’s more objective. At any time if you have questions you can ask them. [inaudible]

I’d like to start with this chart showing how many times the IsoString package is downloaded per month. We see it’s downloaded 160 million times per month in 2024.

160 million is hard to picture. We’ll put it next to another package you all know: React. React is downloaded 140 million times.

IsoString is therefore downloaded more than React. Not bad. We’ll also compare it with Tailwind CSS which sits around 60 million downloads.

Yet, if you look at it, in theory nobody has ever installed the isostring package. We can wonder where all these downloads come from and how it actually impacts us to have downloaded the is-odd-string package.

It has several consequences. The first is that IsoString, when you download it, installs sub‑dependencies. When you download a package you download the code but also potentially its documentation, its tests, its sources, and all that doesn’t necessarily interest you.

We have three people who have installed IsoString, fewer than 3%, so very few.

The issue is that if we project this across several packages, potentially across dependency chains used in packages you use or build, we realize our node_modules becomes the heaviest thing in the universe. That’s a problem for our machines which are not infinite.

Today we’re going to try to understand what happens in our node_modules and how we can clean them up, and use things more solid than useString.

Before going further, I’ll introduce myself: my name is Estéban Soubiran, I’m a software engineer at MaiaSpace, a subsidiary of ArianeGroup aiming to develop a partially reusable launch vehicle. In my free time I orbit around four ecosystems: Laravel, Vite, Vue, and Nuxt.

When I have free time I write articles, recently about how to build an AI application. You can find me everywhere, also on Twitch or on my site soubeyrand.dev.

We’re here to talk about non‑modules and we begin with a first tool called Non‑Modules Inspector. This tool lets you analyze what’s going on inside a package.

We’re going to try installing the isostring package. A webcontainer starts and we install it just like locally. You can also use this tool locally to inspect your node_modules.

It installs the l10n-string package then analyzes it and gives us statistics. We see that by installing isostring we installed 15 packages.

That’s already a lot. We also installed 254 KB of resources for a package that lets you know if it’s a question of character.

We can observe what we installed. We installed documentation and tests, and in the end the JavaScript part—the actual code we care about—is very small, around 10 to 15% on average across the 15 packages.

These packages install sub‑dependencies and most of what is installed isn’t interesting. That’s a pity.

To address this, an ecosystem was put in place: Ecosystem Performance or E18e. It has three missions: level up to improve the JavaScript ecosystem, clean up to tidy it, and speed up to accelerate it.

They do it with different tools on different fronts. They create tools—the ones I’ll show you were created by them or by the community.

They maintain a database linking things not to use anymore to recommended packages or features that have become native to the runtime.

They fork packages that are no longer maintained to bring them up to date, remove unused features and useless dependencies. They help other packages update.

They propose pull requests to remove packages that shouldn’t be used anymore, and they approach bigger projects like Storybook to clean their package.json so you can have cleaner dependencies.

We’ll go through the different tools to see their work. They also created an ESLint plugin to look into your node_modules and your package.json for deprecated things.

The first tool is package-size, created before non-module-inspector. We search is-string. It installs the package in a webcontainer and gives us statistics.

It’s a tool I use every time before installing a package I don’t know, to see what will happen and whether it’s worth it. We get the same stats again: 15 packages, 270 KB (250 earlier) and we see the mess when you install Isostringue. I recommend it—it’s simple and quick.

Then another tool called DepTree. It fetches a package to analyze or you can upload your package.json. It inspects the dependency tree and proposes, via the E18E database, more modern alternatives or even things in the runtime.

We see that is-string is considered a micro-utility, a package that serves only a single function, with a native alternative: using typeof on the object. All that for this.

The problem is that isString is easy to detect, its modern alternative is obvious. Other packages are harder. We have es-error now replaced by native things.

We also have function bind which you can use natively, and so on. It lets you see this simply. We can see here the database used.

We realize that ES Error can be replaced by native constructs. Function Bind too. And so on. The database is used.

Finally, the last very impressive tool is npm graph which draws the graph of all your dependencies and sub‑dependencies.

We won’t use it with IsoString, not impressive enough. We’ll look at it with Storybook.

It retrieves the package.json, all the node_modules, and for each module its dependencies until it maps the whole graph.

What you see is the dependency graph of Storybook 8.2. That’s a lot and we could say it doesn’t matter.

[inaudible]

When you install Storybook on your machine you also install all its sub‑dependencies. Then, as a user, you’ll have to load all that or bundle it. That’s an enormous number of files to traverse so it’s slower.

For Storybook maintainers that’s equally many package concerns. If a maintainer stops, a piece of Storybook can collapse. If a maintainer gets hacked, all of Storybook and its ecosystem falls. The attack surface is huge.

They worked with Ecosystem Performance to go from more than 400 dependencies to, in Storybook 8.4, a few dozen.

For you that means a faster installation and faster load time when you build your Storybook. For them, easier maintenance.

If you want more info you can go to the E18.dev site where you’ll find all the tools and explanations.

You can explore the module replacement repository, the database linking things to retire and the new rewritten or cleaned packages, the modern replacements that enabled building the tools.

You can try their ESLint plugin. You can join the community on Discord to chat with them. Thank you all, this was Estéban Soubiran, and if you want to leave a comment it’s right there. Thanks.

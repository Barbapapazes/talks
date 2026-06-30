I’m going to talk to you about a topic that’s very close to my heart. It’s something we often don’t give much time or importance to, and that’s JavaScript packages.

Before going any further, I invite you to scan the QR code right there. It will take you to a page where you’ll be able to find all my socials, answer questions — for now, don’t do that, we’ll do it as we go —, find the link to leave me feedback, which I’d recommend doing at the end if you want to be objective, and, at any point, react to what I’m saying if you like it, if you agree, or if you simply think it’s funny.

It works. I like to start this presentation with this chart, this diagram.

What we’re looking at is the number of monthly downloads for the is-string package. This was 2024, and we can see that it reaches roughly 160 million downloads per month, with an overall upward trend.

Now you might say, great, 160 million downloads is cool, but is that a lot or not really? In truth, we don’t know, so I added React as a comparison.

React, at its peak here, is at 140 million. And overall, we can see that it stays below that, between 20 and 40 million.

I also added Tailwind to give another point of comparison. So that leads me to ask: have any of you ever downloaded is-string?

Because I’m pretty sure nobody here in the room has installed is-string. And that’s a problem, because apparently is-string gets downloaded a lot.

When we install packages like is-string, we’re actually installing the source code we care about, but also potentially documentation, tests, source files, and things we don’t necessarily care about. And there’s one thing we definitely don’t want, which is for our node_modules to become the heaviest thing in the universe.

We don’t want that, first because our machines don’t have unlimited space, and also because every time we run npm install, for example, we don’t want it to take 5 minutes, 10 minutes, or entire hours. So that’s not what we want.

What we’re going to look at over the next 10 minutes is a whole set of tools that will help you better understand what’s happening in your node_modules. Let me introduce myself: I’m Estéban Soubiran, and I’m an engineer at Takima.

In my free time, I mainly orbit around the Laravel, Vite, Vue, and Nuxt ecosystems, and when I still have some time left, I write articles. Otherwise, you can find me pretty much everywhere, mainly on my website, and from time to time on Twitch when I have the time.

What we’re going to try to see together is how to demystify what’s inside our node_modules, how to understand them better, and how to know whether there are packages we actually need to install or not. To go through a whole bunch of tools, the first one is Node Modules Inspector.

Node Modules Inspector is both a package and a website. You can use it locally or online, and it will automatically analyze what happens when you install a package, so we’re going to try it with is-string.

What will happen is that a WebContainer will start up. The package will be installed exactly as if it were local, except it runs in your browser, and then a whole bunch of analyses are performed to give a better view of what’s in the package.

For example, we’ll be able to list which files are going to be installed when you install the is-string package. Maybe it’s because the Wi-Fi is a little slow, but we’ll get the full list of the files that are going to show up.

We’ll also see an interesting metric, which is the number of packages that get installed. When you install is-string, you can see that 15 packages are installed.

Then you also have 254 kilobytes of stuff installed when you install is-string. And in the report, you basically have those 15 packages that get installed.

What we care about when we install a JavaScript package is really the JavaScript. That’s what’s shown in yellow here, and we can see that, when installing is-string, overall we get docs, tests, big JSON files, and a tiny bit of JavaScript.

Basically, that’s between 10 and 20%. So that means that, out of those 250 kilobytes, only 10 to 20% is code you actually care about.

There are lots of features in there, but I’ll let you explore all of that on your own. Around this whole issue of package installation, an ecosystem has emerged called Ecosystem Performance, and it has 3 major goals: cleaning up the JavaScript ecosystem, raising its standards, and speeding it up.

To do that, they have different initiatives. The best-known one is where they go to package maintainers and open pull requests telling them, “instead of using this, you should use that.”

All of this is tracked in a repo with issues that let them list and follow everything. They did it, for example, with Storybook, and we’ll look at an example at the end of how Storybook’s dependencies have evolved.

When that’s not possible because the maintainer no longer maintains the project, or when there’s an opportunity to do better with newer APIs, they’ll outright fork the project, or even rewrite it entirely in a much more modern version. And finally, there’s one last thing they do: they provide tooling, including ESLint rules.

After different initiatives, they proposed tooling to help you, as developers, connect things that should no longer be used — whether native APIs or packages on NPM — with newer APIs that have come out or newer packages that have been rewritten. So they have a large database that creates links between things you shouldn’t use anymore and things you should prefer instead.

One of the tools I used the most, until Node Modules Inspector came out, was Package Size, which lets us do roughly the same thing as Node Modules Inspector — in other words, install the package through a WebContainer and analyze everything. It’s really handy: you install a package, you don’t want to overthink it, you want to know what’s inside, you go to Package Size, install it, and immediately get the information.

There, we end up again with our 270 kilobytes and our 15 packages. So at that point, we start thinking there’s a little red flag: do we really want to install it? Maybe not.

I’d say it’s the previous version of Node Modules Inspector. The next site is Deptri.

That one is a little different, because it relies precisely on that famous database of things you shouldn’t use anymore and things you should use instead. By installing is-string, or by directly uploading your package.json, it will download all the sub-dependencies and connect them to that database to tell you: watch out, this thing has a native replacement, so you don’t necessarily need to install it, or it’s a micro-utility, so you could just write the code yourself, or simply not install it because there are other replacements.

For example, for is-string, you could just do a typeof on your object and compare it to a string. But there are others too, because with is-string, we know what it does — it’s right there in the name.

For example, there’s isError, which can be replaced by more native things like Error, evalError, or others, or function-bind, where you don’t immediately think, “oh, this thing can be replaced.” There, you can get information about everything that could be replaced.

So that’s handy, and on top of that, you can upload your package.json. That whole database is also available through an ESLint rule.

You can add an ESLint rule to ESLint, and automatically, when you install a package, ESLint can yell at you: what you’re installing here could actually be replaced with something better. And then finally, the last one I also like to look at is npmgraph, which lets me visualize the dependency and sub-dependency graph of a project on NPM.

And here, instead of using is-string, what we’re going to do is use Storybook version 8.2. Why Storybook? Because starting with version 8.2, they said to themselves, “we’ve got quite a serious problem,” and you’re about to see it.

Maybe we have too many dependencies. From here to here, it’s nothing but dependencies.

If we put it in that format, it looks something like this: roughly 400 dependencies. Storybook realized they had a problem on several levels: first, there are too many dependencies, so if one maintainer disappears on one of those sub-dependencies, we’re cooked.

Then that’s just as many opportunities to get hacked through supply chain attacks. It’s also a problem for you as a Storybook user, because every time you install Storybook, you install all of that.

That means a lot of requests going out, which means it takes time. That’s on the installation side, but when you start Storybook, it also has to read all the files from all of those dependencies, so Storybook also takes longer to start.

Storybook realized that this wasn’t possible, that there was a real problem for them and for the developers using it. So they worked with Ecosystem Performance, with E18E, and asked themselves: how do we improve the situation?

It took them months and months, and they published a blog post about everything that happened. In version 8.4, there was a big improvement, but I’m going to show you version 10 directly, where there were still more improvements over time.

Today, this is where they are: about 20 dependencies, I think, while still keeping the same features. So that means for you, fewer installs, a smaller package, faster loading time, and for them, much simpler maintenance.

I encourage you to try this with different packages you may know, because it’s really interesting to see. And if you want to know more, I encourage you to go directly to the E18E website.

You’ll find the list of all these tools there, along with other information about how they work and how you can contribute. What’s great about the E18E ecosystem is that it’s an open ecosystem where you can either go pick up issues and contribute, or, if you’re a maintainer, learn how you can improve the dependencies in your packages, or, if you’re just a developer on a project, learn what you should install, what you shouldn’t install, and what you could replace.

Anyone can come and contribute. They have a great Discord where you can ask questions, and they’ll answer you.

They also have that famous database that lots of tools rely on today, including the ESLint rule and the Deptri website, where you can also go to understand the replacement suggestions that are made, especially because there are README files each time explaining why they replace them. And then you also have that famous ESLint rule, which you can install in your projects whenever you need it.

So, thank you all, that was Estéban Soubiran, and if you have any feedback, it’s right there. Thank you.

We still have a little time for questions, if you have any. The question is: are we seeing a decline in downloads for those packages?

I don’t know. I haven’t updated the chart, but from what I remember seeing, actually, no.

The numbers are so huge, and it’s used so widely everywhere, and today this initiative is still so small compared with the size and scale of the JavaScript ecosystem, that not really, not yet. And then modern tooling only really starts arriving from 2019-2020 onward, so they can’t reduce it since they weren’t part of it from the start.

The question is: when you bundle with Vite in a project, are all the dependencies you use bundled? The answer is no: there will be tree shaking, so it will only choose the ones that are actually used.

That’s not necessarily where the benefit lies. The benefit is both at install time and at usage time, and it’s also all the security risks I talked about, but if you use is-string in your project, then obviously you’re going to end up with all of it bundled into your project.

Thank you.

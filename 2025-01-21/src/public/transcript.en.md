Hello everyone, I’m very happy to be here tonight to talk about how to become full‑stack with TypeScript. It’s my first time here, but not my first talk.

My name is Estéban Soubiran. I’m a full‑stack web developer at MaiaSpace. MaiaSpace builds lightweight partially reusable launch vehicles—in short, we launch rockets into space.

I do a fair bit of open source and orbit around several ecosystems like Vite, Vue, Nuxt, around the Nuxt ecosystem and Laravel. When I have time, I write articles on my blog to answer questions I’ve asked myself and couldn’t find answers to online, for example how to get into web development during a career change, or how to start a Nuxt project perfectly.

You can take out your phone, scan the QR code, or type the URL to answer a few questions so I can adapt the talk. Most of you are full‑stack, with around 40% leaning front‑end or back‑end.

Still on your phone: when you do back‑end, which language do you use? You can choose multiple answers. C++, anyone? You mainly do back‑end in JavaScript or TypeScript, sometimes both—perfect for what’s next.

When we start web development, we often learn HTML first, then add styling with CSS, and quickly we want interactions with JavaScript. Then we look at front‑end frameworks like React, Angular, or Svelte to build more interactive applications.

Then we discover front‑end meta‑frameworks that make life even easier, like Next, Nuxt, and Astro. That’s great for the front, but there’s also the back‑end out there, essential to store data and build truly interesting applications.

Front‑end meta‑frameworks sometimes offer a bit of back‑end via server‑side APIs, but it rarely goes very far. It covers simple cases like accessing a database or a cache, but as soon as you need robustness, tests, and complexity, it quickly becomes limiting.

On the pure back‑end side, we have Express, Fastify, Nest, and Adonis. Tonight, to become full‑stack with TypeScript, we’ll focus on them rather than front‑end frameworks and meta‑frameworks.

Let’s talk about “high scope” and “low scope.” High‑scope frameworks abstract a lot of complexity to make you productive immediately, while low‑scope frameworks leave you more freedom but require assembling everything before you write business logic.

Express and Fastify are low scope—they’re routers that bind an HTTP verb and a URL to a function. Nest is built on top, brings a sort of dependency injector and an Angular‑style architecture, with some advantages but also drawbacks in my opinion.

Adonis covers the whole spectrum from low to high scope. You can write business logic on day one with the starter, while being able to dive into its internals to adapt it exactly to your needs.

Interim conclusion: to become full‑stack with TypeScript without multiplying tools, Adonis is a very strong candidate. So we’ll use it and see concretely what it looks like.

Adonis is a back‑end framework that has existed since 2015. Version 6, released last January, was fully rewritten in TypeScript. It’s a fully‑featured framework that integrates many capabilities without NPM dependency tinkering or a Frankenstein stack.

You get the Lucid ORM, authentication, authorization, file uploads, a rate limiter, internationalization, caching, and server‑side HMR. HMR avoids restarting the whole app on each change and reduces reload time to a few dozen milliseconds.

You also get email sending, type‑safety between client and server through controller return inference, and a testing framework. Many stacks neglect tests; here it’s planned from the start.

Let’s look at code. First we define routes that bind an HTTP verb and a URL to a controller method. Strings are inferred from controller methods, so if a method doesn’t exist, TypeScript raises an error.

We then generate a controller with the Ace CLI. Next we define a model with the Lucid ORM, for example a Post with id, title, and content. Adonis lets you use another database tool if you prefer.

We add a validator with Vine to avoid users sending anything. Vine is designed for HTTP payloads, unlike Zod which targets JavaScript types. For example, the nuance between empty, null, undefined, or missing fields is handled properly.

We put it all together: we paginate by reading page and limit from the request, validate input in store then create the post, and we fetch a post by id in show via HttpContext.params. There’s no hidden code—just what’s shown.

For authentication, in a few lines we read email and password, verify credentials in a timing‑attack‑safe way, then authenticate and redirect the user. It’s quick to set up.

For OAuth, we redirect to GitHub, handle the callback, and retrieve the user. In three key lines, we have authentication via an external provider and can reuse the previous logic.

For authorization, we define policies and use the bouncer in HttpContext: we allow or block, and everything is well typed. For example, only the author of a post can modify it, and the parameters expected by the policy are inferred.

For tests, Japa is integrated. You can create a post in the database, make a POST request, and assert the response. It’s simple and available from the starter.

For dependency injection, we create a contract via an abstract class, for example RepositoryService, then implementations like GitHubRepositoryService or GitLabRepositoryService. We bind the chosen implementation in the container at startup and can access config during creation.

It’s convenient to swap dependencies, and very useful in tests with a FakeRepositoryService to avoid calling the GitHub API. We swap the dependency at the start of the test and verify expected behavior.

By default, Adonis offers a classic MVC structure with controllers, models, and views. You can also structure by features, or move toward a hexagonal architecture thanks to the powerful dependency injection.

To learn Adonis, Adocasts offers an excellent “Learn Adonis 6” series with 113 videos for 14 hours of content. Part is free and the rest is affordable.

On the front‑end side, do what you want. You can expose a JSON API consumed by a web or mobile app, use it in a monorepo, or work with Inertia to keep the simplicity of the back‑end router while enjoying a front‑end framework. Adonis also provides the Edge template engine for server‑side rendering.

If you’re interested, check out the docs, learn with adocasts.com, and join their community on Discord. And tell me via the QR code what you want to try first.

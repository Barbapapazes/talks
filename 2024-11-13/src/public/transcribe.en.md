Hello everyone, I’m thrilled to be here today.

Since the launch of Nuxt 3, the tagline has been “create performant and production-grade full-stack web apps.” But what does that really mean, and how does it stand today?

Have your phone ready; there will be a QR code to scan in a few slides.

Before we dive into the topic, let me introduce myself. I am Estéban Soubiran, and I’ve been using Nuxt for years. I create modules like nuxt-authorization to manage permissions within apps, and I write articles about everything I work with like Vue, Nuxt, VitePress, and Laravel.

You can easily find me online if you want to follow my work or ask me questions.

We’re rethinking how applications are built.

This quote isn’t mine but from Cloudflare in 2020 about their Workers. Workers are JavaScript code that run on the Cloudflare edge network, but we’ll see that later.

We’ll look at why this idea is important and how it reflects on Cloudflare’s services, but before that, let’s understand how applications are built today.

What are the essential needs for a web application? This helps us get on the same page and understand Cloudflare.

So, the answer is all of them. Every web application needs a database, a KV store, blob storage, a queue, and a mailer.

Without one of them, building a serious web application becomes very difficult. In a traditional web app, you might consolidate your KV store and queue into a database to simplify your architecture.

Once you have your application, you need to deploy it somewhere to make it available to everyone.

Traditionally, you deploy your application to a single server in one location. This origin server is the source of truth for your application, and the farther users are from that location, the slower the app will be for them.

For example, an application deployed in Paris is fast for European users, but for users in regions like Oceania, such as Sydney, it starts to get slow, which can be a problem.

Now that we know how traditional applications are built and deployed, let’s see how Cloudflare is rethinking this.

First, let’s talk about Cloudflare’s network, which is the foundation of all their services. There are over 330 data centers—each little dot on this beautiful map.

Cloudflare is within 50 milliseconds of 99% of the population. This is incredible, and unlike traditional providers with regions like eu-west-3 or us-east-1, Cloudflare has a single region, Earth.

This means that your code is deployed near everyone in the world without you having to manage it.

On top of the network, Cloudflare has built a set of services developers can use to build applications. Do you remember the essential needs we talked about earlier?

There’s a key-value store, a database, blob storage, a queue, and a mailer. Cloudflare provides a service for nearly all of them.

KV for distributed key-value storage, D1 for a scalable SQL database, R2 for blob storage, and Queues for handling async tasks. The only missing part is the mailer, but maybe one day.

These are all primitives, but because of their distributed and serverless nature, Cloudflare can provide a range of higher-level services that use these primitives.

Pages to deploy full-stack applications in seconds, Vectorize and Workers AI to build and deploy applications, Web Analytics to track and analyze your traffic, Workflows to automate your applications, and Durable Objects to coordinate multiple clients.

Each time, the idea is the same: you write the code and they take care of the rest. You deploy to the region Earth, and every service is interconnected.

The developer experience is incredible—previously unthinkable. But with all these services, complexity increases, and integrating them into a framework can be a challenge.

It’s a new paradigm that needs to be understood and tamed.

And that’s where NuxtHub comes in. We all know Nuxt’s love for a good developer experience.

Nuxt applications—specifically full-stack Nuxt applications—make using Cloudflare services a breeze.

First, it’s a module that wraps Cloudflare services (KV, D1, R2, and Queues). Everything works locally and in production without code changes.

It’s also a CLI to speed up development and deployment: you can create a new application, access storage remotely, and deploy in one minute.

Finally, it’s a dashboard to manage your applications. You can see deployments and logs, and even manage your data.

Because it’s built on top of Cloudflare services, you can deploy from a Git repository or to a custom domain in seconds at a very affordable price.

NuxtHub is also adding higher-level services like Vectorize, Browser, Rendering, Realtime, and Cron.

And if you don’t believe me, read the words from Sébastien Chopin, creator of Nuxt, on NuxtHub.

You can get started today for free.

Thank you everyone, I really hope you enjoyed the talk, and if you have any questions, feel free to ask in the chat.

We do have a few questions. Does the server-side experience in Nuxt 3 compare to other frameworks?

It’s a very difficult question because it’s the Nuxt experience—great developer experience—and you also have Nitro. It’s different because NuxtHub targets Cloudflare and serverless, but you can deploy everywhere thanks to Nitro.

Thank you. Last question: looking ahead, what features or integrations are you most excited about in Nuxt’s full-stack evolution?

The auth part is maybe the most exciting one, because when you’re able to integrate any auth provider in just a few lines of code, like Sébastien showed at the beginning of Nuxt Nation, it will be awesome. When you can manage your users from a prebuilt dashboard, it will be even better.

We have to wait, because I think people are building it, so we have to be patient.

Thank you so much for your time today.

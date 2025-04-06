---
htmlAttrs:
  lang: en
  dir: ltr
fonts:
  sans: Noto Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: '#00DC82'
colorSchema: dark
transition: slide-left
addons:
  - slidev-addon-inalia
title: Ship Nuxt apps that scale
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: nuxt,nuxthub,full-stack,apps,web,development
---

<div class="relative">
  <h1 class="text-center font-serif pb-36">Ship <span class="text-primary">Nuxt</span> apps that scale.</h1>
  <p class="absolute left-1/2 transform translate -translate-x-1/2 top-24 op-60">
    Presented by Estéban
  </p>
</div>

<Globe class="absolute z-10 top-2/5 left-1/2 transform -translate-x-1/2" :size="1000" :speed="0.001" :markers="[{ location: [44.833328, -0.56667], size: 0.04 }]" />

<div class="absolute right-6 bottom-6 flex flex-col gap-4 items-end">
  <span class="text-sm op-40">HumanTalks Paris</span>
  <span class="text-xs op-20 mt--4">April, 08 2025</span>
</div>

<!--

Hello everyone,

I'm thrilled to be here today at HumanTalks Paris.

Since the launch of Nuxt 3, the tagline has been "Create performant and production-grade full-stack web apps". But what does that really mean and how does it stand today?

And prepare your phone, you'll have a QR code to scan in a few slides.

 -->

---
# layout: overview
---

---
layout: intro
---

<!--
Before we dive into the topic, let me introduce myself.

I'm Estéban and I been using Nuxt for years now. I create some [click] modules like Nuxt Authorization to manage permissions within an app and [click] I write articles about everything I play with like Vue, Nuxt, VitePress, and Laravel.

[click] You can easily find me online if you want to follow my work or ask me questions.
-->

---
name: Do you know Nuxt?
transition: slide-up
---

<Inalia
  :questionId="1"
/>

---
name: What is Nuxt?
---

<div class="absolute bottom-12 left-14">
  <h1 class="text-4xl font-serif">What is <span class="text-primary">Nuxt</span>?</h1>

  <ul class="list-disc!">
    <li>A progressive framework built on Vue.js and Nitro</li>
    <li>Zero-effort with great DX</li>
    <li>Best practices built-in</li>
    <li>Fully configurable & easily extensible</li>
  </ul>
</div>

<!--
Explain the Nitro part because it's an important one.

Reference: https://www.youtube.com/watch?v=ajUJ1ZNiaZ8

- **October 2016**: First commit for Nuxt.js.
- **January 2018**: Release of Nuxt.js v1.
- **September 2018**: Release of Nuxt.js v2.
- **July 2020**: First commit for Nuxt.js v3.
- **November 2022**: Release of Nuxt.js v3.
- **Coming Soon**: Nuxt.js v4.
-->

---
layout: center
---

<div class="i-logos-cloudflare-icon absolute z--10 w-60 h-60 top-20 left-12 op-20" />

<h1 class="font-serif">
  “We're rethinking how applications are built.”
</h1>

<p class="text-end">
  Cloudflare, 2020, about their Workers.
</p>

<div class="absolute right-6 bottom-6 flex flex-col gap-4 items-end">
  <a href="https://blog.cloudflare.com/introducing-workers-durable-objects/" class="text-xs op-20">Workers Durable Objects</a>
</div>

<!--

"We're rethinking how applications are built."

This quote isn't mine but from Cloudflare in 2020, referring to their Workers. Workers are JavaScript code that runs on the Cloudflare Edge network, but we'll that later.

By the end of this presentation, you'll have all the keys to understand why this quote is so important and how it reflects on Cloudflare's services. But before that, let's understand how applications are built today.

 -->

---
transition: fade
---

<Inalia
  :questionId="2"
/>

<!--
What are the essential needs for a web application?

This is the question I'm asking you today. You have 30 seconds to answer. You can scan the QR code on the screen or go to the URL on your phone.

This question will ensure we're all on the same page, and it'll help us understand Cloudflare's services later.

Hmm, very interesting results.

And the answer is... all of them! Every web application needs a database, a KV store, a blob storage, a queue, and a mailer. Without one of these, creating a serious web application becomes very difficult.
-->

---
transition: slide-up
---

<OriginServer />

<!--
Once you have your application, you need to deploy it somewhere to make it accessible to everyone.

Traditionally, you'd deploy your application on a single server in one location. This server, known as the origin server, is the source of truth for your application.

The farther users are from your server's location, the slower your application will be for them.

For example, an application deployed in Paris is fast for European users, but for users in regions like Oceania, such as Sydney, it starts to get slow, which can be a problem.

Now that we know how traditional applications are built and deployed, let's see how Cloudflare is rethinking this.
-->

---

<CloudflareNetwork />

<!--
First, let's talk about Cloudflare's network, which is the foundation of all their services. With a network of over 330 (three hundred and thirty) data centers—each little orange dot on the map—Cloudflare is within 50 milliseconds of 99% of the world's population. This is incredible!

And unlike traditional providers with regions like 'eu-west-3' or 'us-east-1,' Cloudflare has a single global region: Earth. This means your code is deployed near everyone in the world without you having to manage it.
-->

---
layout: center
clicks: 10
---

<div class="relative">
  <h1 font="serif" text="center" flex="~ row items-center gap-4">
    <span i-logos-cloudflare-icon w="16" h="16" inline-block></span>
    <span>Cloudflare</span>
  </h1>

  <div class="absolute right-0 bottom--1 text-xs op-40">
    Developer Services
  </div>
</div>

<v-click at="1">
  <Card class="mt-12 flex flex-row justify-center items-center gap-2 overflow-hidden">
    <v-clicks>
      <img class="w-8" src="/cf-kv.svg" />
      <img class="w-8" src="/cf-d1.svg" />
      <img class="w-7" src="/cf-r2.svg" />
      <img class="w-8" src="/cf-queues.svg" />
    </v-clicks>
  </Card>
</v-click>

<v-click at="5">
  <Card class="mt-8 flex flex-row justify-center items-center gap-2 overflow-hidden">
    <v-clicks>
      <img class="w-8" src="/cf-pages.svg" />
      <img class="w-8" src="/cf-vectorize.svg" />
      <img class="w-8" src="/cf-web-analytics.svg" />
      <img class="w-8" src="/cf-workflows.svg" />
      <img class="w-8" src="/cf-do.svg" />
    </v-clicks>
  </Card>
</v-click>

<Transition name="fade">
  <CloudflareNetworkGlobe v-if="$clicks === 10" class="absolute -z-1 left-1/2 top-2/5 transform -translate-x-1/2" :size="600" />
</Transition>

<!--

On top of their network, Cloudflare has built a set of services that developers can use to make their applications.

Do you remember the essential needs for a web application we talked about earlier?

There was a KV store, a database, a blob storage, a queue, and a mailer.

Interestingly, Cloudflare provides a service for nearly all of them.

1. [click] KV Store for distributed key-value storage.
2. [click] D1 for a scalable SQL database.
3. [click] R2 for the blob storage.
4. [click] Queues for handling async tasks.

The only thing missing is the mailer, but maybe one day?

These are all primitives. But because of their distributed and serverless nature, Cloudflare can provide a range of high-level services that use these primitives:

5. [click] Pages to deploy full-stack applications in seconds.
6. [click] Vectorize and Workers AI to build and deploy AI applications.
7. [click] Web Analytics to track and analyze your web traffic.
8. [click] Workflows to automate your applications.
9. [click] Durable Objects to coordinate multiple clients.

And each time, the idea is always the same, you write the code and they take care of the rest. They deploy it on their region Earth [click] , and every services are interconnected.

The developer experience is incredible, and you can access services that were previously unthinkable.

But with all these services, the complexity increases and integrates them into a framework can be a challenge. It's a new paradigm that's need to be understood and tame.

 -->

---

<NuxtHubBento />

<!--
And that's where NuxtHub comes in.

We all know the love from Nuxt for a good Developer Experience.

NuxtHub is your full-stack companion to build, deploy and manage your Nuxt applications that makes usage of Cloudflare services a breeze.

First, [click] it's a module that wraps all Cloudflare primitives, the KV store, D1, R2, and queues. Everything works locally and in production without any code changes.

Then, it's also a CLI to speed up your development and deployment process. [click] You can create a new application, access to the storage remotely, and deploy your application in one minute.

Finally, [click] it's a dashboard to manage your applications. You can see deployment, logs, and even manage your data!

And because it's built on top of Cloudflare's services, [click] you can deploy from a Git repository or add a custom domain in seconds at a very affordable price.

NuxtHub is also adding [click] high-level services like [click] Vectorize, [click] Browser Rendering, [click] Real-time, and [click] Crons.

If you don't believe me, [click] read the words from Sébastien Chopin, creator of Nuxt and NuxtHub.

And the best part ? [click] You can get started today, for free!
-->

---
layout: outro
class: relative
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>Check out the docs on <a href="https://hub.nuxt.com" target="_blank">hub.nuxt.com</a></li>
  <li>Deploy your first app in minutes on <a href="https://admin.hub.nuxt.com" target="_blank">admin.hub.nuxt.com</a></li>
  <li>Follow <a href="https://twitter.com/atinux" target="_blank">Sébastien (@atinux)</a> on X</li>
  <li>Join the <a href="https://discord.gg/vW89dsVqBF" target="_blank">Nuxt Hub Discord</a></li>
</ul>

<!--
Thank you! I really hope you enjoyed this presentation. And if you have any questions, feel free to ask in the chat.
-->

---
# layout: Rate the talk
---

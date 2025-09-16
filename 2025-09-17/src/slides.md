---
htmlAttrs:
  lang: en
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: white
codeCopy: false
transition: fade-out
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: "Inertia: Un Anneau pour les gouverner tous"
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: web,development,full-stack,inertia,javascript,adonis
event: Node.js Paris
date: 17 septembre 2025
---

# Inertia: Un Anneau<br />pour les gouverner tous

<!--
Bonsoir tout le monde !

Vous allez bien ?

L'objectif des 20 prochaines minutes est simple, vous donnez l'envie de tester Inertia dans vos projets. Inertia, c'est un outil que j'utilise au quotidien et qui a complètement changé ma manière de créer sur le web.
-->

---
name: Overview
layout: inalia-overview
---

<!--
Avant d'aller plus loin, je vous invite à scanner ce QR code.

Il vous mènera sur une page où vous allez pouvoir retrouver mes réseaux, répondre à des questions, pour le moment, ne le faites pas, et même poser vos questions auxquelles je vais pouvoir répondre au fur et à mesure.

À la fin, vous pourrez me donner un feedback. Mais à la fin, parce que ça ne serait pas très objectif de le faire maintenant.

Et à tout moment, vous pouvez réagir à ce que je dis, si vous trouvez ça drôle, si vous aimez ou simplement si vous êtes d'accord.
-->

---
name: Who is who?
---

<Inalia :questionId="1" />

<!--
Pour s'assurer que ça fonctionne bien chez tout le monde et pour nous donner du contexte dont on aura besoin par la suite, je vous invite à répondre à la première question, soit via la page sur laquelle vous êtes arrivé, soit en scannant le QR code.
-->

---
name: Inalia
layout: inalia
---

<!--
Derrière les QR code et les pages sur lesquels vous avez atterri, il y a une plateforme qui s'appelle Inalia.

Inalia, c'est un SaaS que je développe en live sur Twitch avec l'objectif de rendre nos présentations plus interactives et même mémorables !

Il va sortir de sa bêta privée dans les prochaines semaines et vous pouvez dès à présent vous pré-inscrire sur inalia.app.
-->

---
name: Intro
layout: intro
intro: Ingénieur logiciel Avionique chez <span class="i-custom-maiaspace
  inline-block size-5 align-text-top"></span> Maiaspace
---

<!--
Mais l'objectif ce soir, c'est surtout d'Inertia dont on va parler.

Avant de rentrer dans le vif du sujet, je me présente, je m'appelle Estéban. Je suis ingénieur logiciel Avionique chez MaiaSpace. MaiaSpace c'est une filiale d'ArianeGroup qui vise à développer un lanceur spatial partiellement réutilisable.

Quand je ne suis pas au travail, je gravite principalement autour des écosystèmes de Laravel, Vite, Vue et Nuxt.

Et lorsqu'il me reste un peu de temps j'écris des articles.

Dans le même temps, vous pouvez me retrouver partout et surtout sur Twitch où je stream plusieurs fois par semaine.
-->

---
name: Inertia
layout: center-card
img: https://images.unsplash.com/photo-1477511801984-4ad318ed9846?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<h1 class="flex flex-row gap-4 items-center">
  <span class="i-devicon-inertiajs inline-block size-10"></span>
  Inertia
</h1>

<!--
Mais revenons à Inertia.

Je crois que ce talk est l'un des plus complexes que j'ai eu à écrire.

Non pas parce qu'Inertia est techniquement difficile, c'est même relativement simple à côté d'un talk sur les signaux et la réactivité.

Je crois qu'il y a deux raisons à cette complexité. D'abord, Inertia nous oblige à repenser la place de la technologie dans nos créations. Et ensuite, il y a le facteur humain lié au talk et à l'implicite d'Inertia.
-->

---
name: Adding a human touch
layout: center
---

<div class="flex flex-row gap-30">
  <v-clicks>
  <span class="i-devicon:java inline-block rounded-lg size-36" />

  <span class="i-devicon:javascript inline-block rounded-lg size-36" />

  <span class="i-devicon:laravel inline-block rounded-lg size-36" />
  </v-clicks>
</div>

<!--
Aujourd'hui, on est chez Takima. Ils font plutôt du Java et on l'a clairement vu au début, ils sont nombreux, vous (!) être nombreux.

Ensuite, l'évènement est organisé par Node.js Paris qui traite de l'écosystème JavaScript.

Enfin, Inertia est un outil né dans l'écosystème Laravel.

3 écosystèmes, chacun ayant un mindset complètement différent. Aujourd'hui, je dois réconcilier tout ça. Du coup, vous faire une énumération technique des fonctionnalités d'Inertia, ça ne vous aurait pas apporté grand chose ni même permis de comprendre et d'apprécier les raisons pour lesquelles la communauté aime l'outil.
-->

---
name: Context
layout: center
---

<h1 v-click class="text-9xl font-serif">
  Context
</h1>

<!--
Il y a aussi la notion de contexte. Le contexte d'une réflexion, d'un moment, d'un récit est essentiel pour comprendre toute l'histoire et ses subtilités.

D'ailleurs, le contexte est une notion devenue essentielle. On peut le voir avec la manipulation de l'information sur les réseaux ou simplement au travers des LLMs où la pertinence est directement liée à la qualité du contexte.

Alors laissez moi vous donner un peu de contexte.

Comment j'en suis arrivé à utiliser Inertia et pourquoi je l'aime tant.
-->

---
name: Timeline
---

<!-- TODO: add missing images and stack -->
<Timeline
  :items="[
    {
      img: '/nuit-de-linfo-2018.jpg',
      date: 'Dec, 2018',
      title: 'Nuit de l\'Info',
    },
    {
      img: '/tutoring-platform.jpg',
      date: '2020',
      title: 'Tutoring Platform',
    },
    {
      img: '/voting-platform.jpg',
      date: '2022',
      title: 'Voting Platform',
    }
  ]"
/>

<!--
Ça, c'est moi. Et je me rends compte que je ne me fais pas de cadeau en faisant ça. C'était à ma première Nuit de l'Info, donc en décembre 2018. À ce moment-là, je découvre le développement web et j'accroche de suite. Un grand canva, blanc, dans lequel vous pouvez faire absolument tout ce que vous voulez. Quelle liberté.

Enfin, une liberté, qu'il faut savoir l'utiliser. Et c'est là que tout se complexifie.

En 2020, avec des amis, on a repris le projet d'une plateforme de tutorat pour la vie étudiante de mon école. On y a passé tellement d'heures à trois. Et pourtant, on n'a jamais rien livré. Personne n'a jamais vu un seul pixel de la nouvelle version.

En 2021, avec un autre ami, on est revenu avec un nouveau projet pour la vie étudiante. L'idée était simple sur le papier, construire 4 plateformes pour faciliter la vie étudiante, pour former un écosystème. Sept mois de travail, une dispense d'un semestre pour travailler dessus à temps plein. Et pourtant, au bout du compte, on ne l'a jamais livré et personne n'en a jamais vu la couleur.

En 2022, j'ai construit une plateforme de vote pour un concours étudiant. Et en septembre, miracle, la plateforme était prête et en production. Pour la première fois depuis 4 ans, un projet a été livré. Enfin !

Maintenant, prenons un peu de recul. Pourquoi le dernier projet est-il enfin livré ?

Parce que je me suis concentré sur le fait de créer et livrer un moment, et non de simplement coder pour coder.

Regardez, sur la plateforme de Tutorat, on avait un backend avec Feathersjs, deux frontend, un avec React et l'autre avec Vue et une application mobile en React Native. Pour l'écosystème, on avait un backend avec Adonis, 4 frontend avec Nuxt et une bibliothèque de composants. Tellement de complexité. De son côté, la plateforme de vote, c'était simplement un backend Adonis avec template engine et un peu d'Unpoly. Rien de plus.

C'est exactement ce que vous permet Inertia, vous permettre de vous concentrer sur ce que vous créez pour livrer. Inertia vient simplifier votre travail.

Je crois qu'il est enfin temps de voir ce qu'est Inertia concrètement.
-->

<!-- TODO: potentiellement une question sur le fait de foirer un side project ? à voir, et potentiellement la mettre avant -->

---
name: Who already uses Inertia?
---

<Inalia :questionId="2" />

<!--

Qui, parmi vous, a déjà utilisé Inertia ?

Je vous laisse y répondre soit via la page Inalia, soit via le QR code juste ici.

En attendant, laissez-moi vous parler un peu d'Inertia.

Inertia n'est ni un nouveau framework frontend, ni un framework backend. C'est un protocole qui permet de lier les deux et qui vient s'ajouter à votre stack par le biais d'adaptateurs, permettant l'émergence des modern monoliths.

-->

---
name: Show me the code
layout: center-card
img: https://images.unsplash.com/photo-1756489693617-b6586eed7e51?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# Show me the code.

<!--

- Traditional monolith
- How to make our app interactive?

-->

---
name: How to make our app interactive?
---

<Inalia :questionId="3" />

<!--
Ok, très intéressante les réponses.

- Pas la première parce qu'une librairie frontend n'a pas du tout la puissance d'un framework frontend, que ce soit au niveau de l'écosystème, du tooling, ou même des UI kit.
- Pas la deuxième parce que c'est juste trop de complexité dans notre cas. Potentiellement un nouveau repo, une découpe qui n'a pas de sens parce qu'on serait les seuls consommateurs, il faut ajouter du routing, de l'autorisation côté client, etc.

On s'est clairement fait matrixé par le fait de devoir passer d'un monolith à un frontend séparé avec une API pour faire évoluer nos projets et y ajouter de l'interactivité. Mais ça, c'est terminé.

Aujourd'hui, avec Inertia, on a un nouveau choix.
 -->

---
name: I want more
layout: center-card
img: https://images.unsplash.com/photo-1659662201540-a6545df3decf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

# I want more.

<!--

- Link
- Form
- Optional Props

-->

---
name: But how?
layout: center-card
img: https://images.unsplash.com/photo-1683303844455-74d7a9086a86?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

```ts
export class Inertia {
  async render<
    TPageProps extends Record<string, any> = object,
    TViewProps extends Record<string, any> = object,
  >(
    component: string,
    pageProps?: TPageProps,
    viewProps?: TViewProps
  ): Promise<string | PageObject<TPageProps>> {
    const pageObject = await this.#buildPageObject(component, pageProps)
    const isInertiaRequest = !!this.ctx.request.header(InertiaHeaders.Inertia)

    if (!isInertiaRequest) {
      const shouldRenderOnServer = await this.#shouldRenderOnServer(component)
      if (shouldRenderOnServer)
        return this.#renderOnServer(pageObject, viewProps)

      return this.ctx.view.render(this.#resolveRootView(), { ...viewProps, page: pageObject })
    }

    this.ctx.response.header(InertiaHeaders.Inertia, 'true')
    return pageObject
  }
}
```

<!--

Mais ça fonctionne comment Inertia ?

Et bien je crois que ce snippet tiré de l'adaptateur d'AdonisJS est le meilleur support pour comprendre son fonctionnement.

- Deux blocs. Render HTML et JSON
- Utilisation de headers pour différencier les requêtes
- Injection par l'adaptateur client du `pageObject` dans les props

https://github.com/adonisjs/inertia/blob/4a0a6a6356430a91596cc28e408fa6bcfe561052/src/inertia.ts#L290-L310

-->

---
name: Traditional Conclusion
layout: outro
feedback: false
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Check out Inertia website <a href="https://inertiajs.com/" target="_blank">inertiajs.com</a>
  </li>
  <li>
    Explore the <a href="https://inertiajs.com/demo-application" target="_blank">demo application</a>.
  </li>
    <li>
    Learn more about <a href="https://inertiajs.com/the-protocol" target="_blank">the protocol</a>.
  </li>
  <li>
    Join the community on <a href="https://discord.gg/inertiajs"  target="_blank">Discord</a>.
  </li>
</ul>

<!--
Je crois qu'il y a deux manières de terminer ce talk.

Une traditionnelle et une alternative. Commençons par l'alternative.
-->

---
name: Alternative Ending
layout: outro
feedback: false
---

<h1 class="text-4xl font-serif">
  Alternative Ending
</h1>

<ul class="op-80">
  <li>
    Context is key
  </li>
  <li>
    Failure is part of the process
  </li>
  <li>
    Try, fail, learn, iterate
  </li>
</ul>

<!--
Inertia n'est pas magique et ne résoudra pas tous vos problèmes. Mais appliqué dans le bon context, ça peut devenir votre meilleur allié.

Ensuite, avec un outil comme Inertia, tu délivres plus, tu accélères et donc inévitablement, tu échoues plus. Mais c'est ok.
-->

---
name: Outro
layout: outro
---

<h1 class="text-4xl font-serif">
  Looking for more?
</h1>

<ul class="op-80">
  <li>
    Check out Inertia website <a href="https://inertiajs.com/" target="_blank">inertiajs.com</a>
  </li>
  <li>
    Explore the <a href="https://inertiajs.com/demo-application" target="_blank">demo application</a>.
  </li>
    <li>
    Learn more about <a href="https://inertiajs.com/the-protocol" target="_blank">the protocol</a>.
  </li>
  <li>
    Join the community on <a href="https://discord.gg/inertiajs"  target="_blank">Discord</a>.
  </li>
</ul>

<!--
Ce que vous venez de découvrir, ce n'est qu'un aperçu de tout ce qu'il est possible de faire avec Inertia. Je vous invite à aller lire la documentation et à explorer l'application de démonstration pour avoir une vision plus réaliste.

Honnêtement, donnez-lui une chance, vous ne le regretterez pas.

Merci à tous !

C'était Estéban. Et pour laisser un feedback, c'est juste là.
-->

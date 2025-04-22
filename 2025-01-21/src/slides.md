---
htmlAttrs:
  lang: fr
  dir: ltr
fonts:
  sans: DM Sans
  serif: Noto Serif
  mono: Consolas
themeConfig:
  primary: white
codeCopy: false
glowSeed: 213
transition: fade-out
remoteAssets: true
theme: slidev-theme-personal
addons:
  - slidev-addon-inalia
title: Deviens full-stack avec TypeScript
titleTemplate: '%s - Estéban Soubiran'
author: Estéban Soubiran
keywords: adonis,adonisjs,full-stack,apps,web,development
event: Paris TypeScript
date: 21 janvier 2025
---

# Deviens full-stack avec TypeScript

Présenté par Estéban Soubiran

---
name: Présentation
layout: intro
intro: Développeur web full-stack à <span class="i-custom-maiaspace inline-block size-5 align-text-top"></span> Maiaspace
---

---
name: "Inalia: Frontend, Backend ou Fullstack"
---

<Inalia
  question="Frontend, Backend ou Full-stack ?"
  type="single_select"
  chart="bar"
  :data="[
    { label: 'Frontend', count: 13, color: '#2563eb' }, { label: 'Backend', count: 8, color: '#dc2626' }, { label: 'Full-stack', count: 31, color: '#9333ea' }
  ]"
/>

---
name: "Inalia: Langages Backend"
---

<Inalia
  question="Language utilisé pour le backend ?"
  type="multiple_select"
  chart="donut"
  :data="[
    { label: 'Python', count: 8, color: '#dc2626' }, { label: 'Java', count: 7, color: '#ea580c' }, { label: 'C#', count: 3, color: '#ca8a04' }, { label: 'PHP', count: 6, color: '#65a30d' }, { label: 'JavaScript', count: 20, color: '#059669' }, { label: 'TypeScript', count: 36, color: '#0891b2' }, { label: 'Go', count: 6, color: '#2563eb' }, { label: 'C++', count: 0, color: '#4f46e5' }, { label: 'Kotlin', count: 3, color: '#9333ea' }, { label: 'Ruby', count: 1, color: '#d946ef' }, { label: 'Rust', count: 6, color: '#e11d48' }
  ]"
/>

---
name: Parcours
layout: center
---

<div class="flex flex-row items-center gap-x-6">
  <div v-click class="row-start-6 row-end-8 flex items-center justify-center rounded p-8 border border-[#E44F26]/40
   bg-[#E44F26]/5">
    <span class="i-vscode-icons-file-type-html inline-block size-8" />
  </div>

  <div v-click class="i-ph-arrow-right text-neutral-400" />

  <div v-after class="row-start-5 row-end-9 flex items-center justify-center rounded p-8 border border-[#639]/40 bg-[#639]/5 forward:delay-50">
    <span class="i-vscode-icons-file-type-css inline-block size-8" />
  </div>

  <div v-click class="i-ph-arrow-right text-neutral-400" />

  <div v-after class="row-start-4 row-end-10 flex items-center justify-center rounded p-8 border border-[#F5DE1A]/40 bg-[#F5DE1A]/5 forward:delay-50">
    <span class="i-vscode-icons-file-type-js-official inline-block size-8" />
  </div>

  <div v-click class="i-ph-arrow-right text-neutral-400" />

  <div class="row-start-3 row-end-11 flex flex-col items-center justify-center gap-4 px-8 py-4">
    <span v-after class="i-vscode-icons-file-type-reactjs inline-block size-8 forward:delay-50 backward:delay-200" />
    <span v-after class="i-vscode-icons-file-type-vue inline-block size-8 forward:delay-100 backward:delay-150" />
    <span v-after class="i-devicon-angular inline-block size-7 forward:delay-150 backward:delay-100" />
    <span v-after class="i-vscode-icons-file-type-svelte inline-block size-8 forward:delay-200 backward:delay-50" />
    <span v-click class="w-full h-px bg-neutral-800" />
    <span v-after class="i-devicon-nextjs inline-block size-8 forward:delay-50 backward:delay-150" />
    <span v-after class="i-vscode-icons-file-type-nuxt inline-block size-8 forward:delay-100 backward:delay-100" />
    <span v-after class="i-vscode-icons-file-type-astro inline-block size-8 forward:delay-150 backward:delay-50" />
  </div>
</div>

---
name: Frontend vs Backend
layout: center
---

<div class="relative mx-auto w-120 h-80 grid grid-cols-2 gap-8">
  <div v-click="[0, 4]" class="p-5 rounded border border-blue-500/40 bg-blue-500/5">
    <span class="text-sm text-blue-500/40">Frontend</span>
  </div>

  <div v-click="[0, 4]" class="p-5 rounded border border-red/40 bg-red/5 flex items-end justify-end forward:delay-50">
    <span class="text-sm text-red-500/40">Backend</span>
  </div>

  <div v-click="[1, 4]" class="absolute p-1 top-16 left-4 flex items-center gap-2 rounded bg-blue-500/40">
    <span class="i-vscode-icons-file-type-reactjs inline-block size-8" />
    <span class="i-vscode-icons-file-type-vue inline-block size-8" />
    <span class="i-devicon-angular inline-block size-7" />
    <span class="i-vscode-icons-file-type-svelte inline-block size-8" />
  </div>

  <div v-click="[2, 4]" class="absolute p-1 top-36 left-45 flex items-center gap-2 rounded bg-gradient-to-r from-[#294577] to-[#752E2D]">
    <span class="i-devicon-nextjs inline-block size-8" />
    <span class="i-vscode-icons-file-type-nuxt inline-block size-8" />
    <span class="i-vscode-icons-file-type-astro inline-block size-8" />
  </div>

  <div v-click="3" class="absolute flex items-center rounded bg-[#752E2D] duration-500" :class="{ 'p-1 bottom-15 right-4 gap-2': $clicks <= 3, 'p-4 bottom-1/2 right-1/2 translate-1/2 gap-4': $clicks > 3 }">
    <span class="i-devicon-express inline-block transition-all duration-500" :class="{ 'size-7': $clicks <= 3, 'size-11': $clicks > 3 }" />
    <span class="i-logos-fastify-icon inline-block transition-all duration-500" :class="{ 'size-8': $clicks <= 3, 'size-12': $clicks > 3 }" />
    <span class="i-vscode-icons-file-type-nestjs inline-block transition-all duration-500" :class="{ 'size-8': $clicks <= 3, 'size-12': $clicks > 3 }" />
    <span class="i-devicon-adonisjs inline-block transition-all duration-500" :class="{ 'size-7': $clicks <= 3, 'size-11': $clicks > 3 }" />
  </div>
</div>

---
name: High-scope vs Low-scope
layout: center
---

<div class="relative mx-auto w-120 h-80 grid grid-cols-2 gap-8">
  <div class="p-5 rounded border border-blue-500/40 bg-blue-500/5">
    <span class="text-sm text-blue-500/40">High-scope</span>
  </div>

  <div class="p-5 rounded border border-red/40 bg-red/5 flex items-end justify-end forward:delay-50">
    <span class="text-sm text-red-500/40">Low-scope</span>
  </div>

  <div v-click class="absolute p-1 top-16 right-12 flex flex-row items-center gap-2 rounded bg-red-500/40">
    <span class="i-devicon-express inline-block size-7" />
    <span class="i-logos-fastify-icon inline-block size-8" />
  </div>

  <div v-click class="absolute p-1 top-36 left-45 right-12 flex justify-center items-center gap-2 rounded bg-gradient-to-r from-[#294577] via-[#752E2D] to-[#752E2D]">
    <span class="i-vscode-icons-file-type-nestjs inline-block size-8" />
  </div>

  <div v-click class="absolute p-1 bottom-15 left-4 right-4 flex justify-center items-center gap-2 rounded bg-gradient-to-r from-[#294577] to-[#752E2D]">
    <span class="i-devicon-adonisjs inline-block size-8" />
  </div>
</div>

---
name: Adonis
layout: center
---

<div class="flex justify-center">
  <div class="i-logos-adonisjs translate-0 transition-all duration-350 backward:delay-1100 ease-out" :class="{ 'size-48': $clicks > 0, 'size-60 translate-y-1/2': $clicks === 0 }" />
</div>

<div class="grid grid-cols-4 gap-4 text-sm text-neutral-400">
  <div v-click class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-300 backward:delay-1050">
    <span class="i-ph-database-duotone inline-block size-4"></span>
    <span>Lucid</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-350 backward:delay-1000">
    <span class="i-ph-lock-duotone inline-block size-4"></span>
    <span>Auth</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-400 backward:delay-950">
    <span class="i-ph-prohibit-inset-duotone inline-block size-4"></span>
    <span>Bouncer</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-450 backward:delay-900">
    <span class="i-ph-cloud-arrow-up-duotone inline-block size-4"></span>
    <span>FlyDrive</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-350 backward:delay-850">
    <span class="i-ph-file-dotted-duotone inline-block size-4"></span>
    <span>Attachment lite</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-400 backward:delay-800">
    <span class="i-ph-speedometer-duotone inline-block size-4"></span>
    <span>Limiter</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-450 backward:delay-750">
    <span class="i-ph-brackets-curly-duotone inline-block size-4"></span>
    <span>Edge</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-500 backward:delay-700">
    <span class="i-ph-hard-drives-duotone inline-block size-4"></span>
    <span>Bentocache</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-400 backward:delay-650">
    <span class="i-ph-shield-duotone inline-block size-4"></span>
    <span>Vine</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-450 backward:delay-600">
    <span class="i-ph-share-network-duotone inline-block size-4"></span>
    <span>Ally</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-500 backward:delay-550">
    <span class="i-ph-globe-stand-duotone inline-block size-4"></span>
    <span>I18n</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-550 backward:delay-500">
    <span class="i-ph-pulse-duotone inline-block size-4"></span>
    <span>Heath checks</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-450 backward:delay-450">
    <span class="i-ph-envelope-simple-duotone inline-block size-4"></span>
    <span>Mailer</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-500 backward:delay-400">
    <span class="i-ph-arrows-left-right-duotone inline-block size-4"></span>
    <span>Transmit</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-550 backward:delay-350">
    <span class="i-ph-keyhole-duotone inline-block size-4"></span>
    <span>Lock</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-600 backward:delay-300">
    <span class="i-ph-test-tube-duotone inline-block size-4"></span>
    <span>Japa</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-500 backward:delay-250">
    <span class="i-ph-lightning-duotone inline-block size-4"></span>
    <span>HMR</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-550 backward:delay-200">
    <span class="i-simple-icons-vite inline-block size-4"></span>
    <span>Vite</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-600 backward:delay-150">
    <span class="i-simple-icons-inertia inline-block size-4"></span>
    <span>Inertia</span>
  </div>
  <div v-after class="py-2 px-3 flex items-center gap-1 text-center rounded border border-[#5b45ff]/40 bg-[#5b45ff]/5 forward:delay-650 backward:delay-50">
    <span class="i-ph-pipe-duotone inline-block size-4"></span>
    <span>Tuyau</span>
  </div>
</div>

---
name: Concrètement, à quoi ça ressemble ?
layout: center
---

<h1>
  Concrètement, à quoi ça ressemble ?
</h1>

---
name: "Enregistre des routes"
layout: center-y
---

```ts [start/routes.ts]
import PostsController from '#controllers/posts_controller'
import router from '@adonisjs/core/services/router'

router.get('posts', [PostsController, 'index'])
router.post('posts', [PostsController, 'store'])
router.get('posts/:id', [PostsController, 'show'])
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/basics/routing"
    text="Routes"
  />
</Footer>

---
name: "Crée un contrôleur"
layout: center-y
---

```sh {*} [terminal]
node ace make:controller posts
```

<!-- eslint no-empty-pattern: 0 -->

```ts {*} [app/controllers/http/posts_controller.ts]
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({}: HttpContext) {
    // we want to return a paginated list of posts
  }

  async store({}: HttpContext) {
    // we want to save a post
  }

  async show({}: HttpContext) {
    // we want to return a post by its id
  }
}
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/basics/controllers"
    text="Contrôleurs"
  />
</Footer>

---
name: "Définis un modèle"
layout: center-y
---

```sh {*} [terminal]
node ace make:model post
```

```ts {*} [app/models/post.ts]
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Post extends BaseModel {
  @column()
  declare id: number

  @column()
  declare title: string

  @column()
  declare contents: string
}
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/database/lucid"
    text="Lucid ORM"
  />
</Footer>

---
name: "Valide les données"
layout: center-y
---

```sh {*} [terminal]
node ace make:validator posts
```

```ts {*} [app/validators/create_post_validator.ts]
import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(4).maxLength(256),
    contents: vine.string().trim()
  })
)
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/basics/validation"
    text="Validation"
  />
</Footer>

---
name: "Assemble le tout"
layout: center-y
---

```ts [app/controllers/http/posts_controllers.ts]
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'

export default class PostsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    return Post.query().paginate(page)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    return Post.create(payload)
  }

  async show({ params }: HttpContext) {
    return Post.findOrFail(params.id)
  }
}
```

---
name: "Authentification"
layout: center-y
---

```ts [app/http/controllers/session_controller.ts]
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    response.redirect('/dashboard')
  }
}
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/authentication/session-guard"
    text="Authentification"
  />
</Footer>

---
name: "Authentification Social"
layout: center-y
---

```ts [start/routes.ts]
router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', async ({ ally }) => {
  const gh = ally.use('github')

  if (gh.accessDenied()) {
    return 'You have cancelled the login process'
  }
  if (gh.stateMisMatch()) {
    return 'We are unable to verify the request. Please try again'
  }
  if (gh.hasError()) {
    return gh.getError()
  }

  const user = await gh.user()

  return user
})
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/authentication/social-authentication"
    text="Authentification Social"
  />
</Footer>

---
name: "Autorisation"
layout: center-y
---

```ts [app/policies/post_policy.ts]
import Post from '#models/post'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PostPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return true
  }

  edit(user: User, post: Post): AuthorizerResponse {
    return user.id === post.userId
  }
}
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/security/authorization"
    text="Autorisation"
  />
</Footer>

---
name: "Autorisation (suite)"
layout: center-y
---

```ts [app/controllers/http/posts_controller.ts]
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import PostPolicy from '#policies/post_policy'

export default class PostsController {
  async create({ bouncer, response }: HttpContext) {
    await bouncer.with(PostPolicy).authorize('create')

    // create a new post
  }

  async edit({ bouncer, params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await bouncer.with(PostPolicy).authorize('edit', post)

    // edit the post
  }
}
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/security/authorization"
    text="Autorisation"
  />
</Footer>

---
name: "Tests"
layout: center-y
---

```ts [tests/http/posts/index.ts]
import Post from '#models/post'
import { test } from '@japa/runner'

test.group('Posts', () => {
  test('get a list of posts', async ({ client }) => {
    await PostFactory.merge({ title: 'Hello world' }).create()

    const response = await client.get('posts')

    response.assertStatus(200)
    response.assertBody({
      data: [
        {
          id: 1,
          title: 'Hello world',
        }
      ]
    })
  })
})
```

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/testing/introduction"
    text="Tests"
  />
</Footer>

---
name: IoC
layout: center-y
---

```ts [app/contracts/repositories_services.ts]
export abstract class RepositoriesService {
  abstract repositories(): Promise<Repository[]>
}
```

<v-click>

```ts [app/services/github_repositories_service.ts]
import { RepositoriesService } from '#contracts/services'

export class GitHubRepositoriesService implements RepositoriesService {
  async repositories() {}
}
```

</v-click>

---
name: IoC (suite)
layout: center-y
---

```ts [providers/app_provider.ts]
import { RepositoriesService } from '#contracts/repositories_services'

export default class AppProvider {
  async boot() {
    const { GitHubRepositoriesService } = await import('#services/github_repositories_service')

    this.app.container.singleton(RepositoriesService, async (resolver) => {
      const configService = await resolver.make('config')
      const token = configService.get<string>('services.github.token')

      return new GitHubRepositoriesService(token)
    })
  }
}
```

---
name: IoC (tests)
layout: center-y
---

```ts [tests/http/repositories/index.ts]
import RepositoriesService from '#contracts/repositories_services'
import app from '@adonisjs/core/services/app'

test('get all repositories', async ({ client }) => {
  class FakeRepositoriesService implements RepositoriesService {
    repositories() {
      return [{ id: 1, repo: 'barbapapazes/talks' }]
    }
  }

  app.container.swap(RepositoriesService, () => {
    return new FakeRepositoriesService()
  })

  const response = await client.get('repositories')

  response.assertBody({
    data: [{ id: 1, repo: 'barbapapazes/talks' }]
  })
})
```

---
name: Architecture
class: h-full
---

<div class="h-full grid grid-cols-3 gap-16">
  <TreeType v-click class="overflow-auto" />

  <TreeFeature v-click class="overflow-auto" />

  <TreeHexagonal v-click class="overflow-auto" />
</div>

<Footer>
  <FooterLink
    href="https://docs.adonisjs.com/guides/concepts/adonisrc-file"
    text="Architecture"
  />
</Footer>

---
name: "Aller plus loin"
---

<img src="/series-adocasts.png" alt="Adocasts" class="aspect-video absolute inset-0" />

<a href="https://adocasts.com" target="_blank" class="absolute bottom-6 right-6 text-xs text-neutral-700">Adocasts</a>

<!--

113 lessons soit plus de 14h de contenu pour apprendre AdonisJS (et accessoirement le développement backend)

 -->

---
name: "Inalia: Et maintenant, envie d'essayer Adonis ?"
---

<Inalia
  question="Et maintenant, envie d'essayer Adonis ?"
  type="single_select"
  chart="donut"
  :data="[
    { label: 'Oui', count: 38, color: '#2563eb' }, { label: 'Non', count: 6, color: '#dc2626' }
  ]"
/>

---
name: Fin
layout: outro
---

<h1>Intéressé(e)... ?</h1>

<ul>
  <li>Consulte la documentation <a href="https://docs.adonisjs.com" target="_blank">docs.adonisjs.com</a></li>
  <li>Apprends avec <a href="https://adocasts.com" target="_blank">adocasts.com</a></li>
  <li>Rejoins la communauté sur <a href="https://discord.com/invite/vDcEjq6" target="_blank">Discord</a></li>
</ul>

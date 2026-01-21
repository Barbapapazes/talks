Voici les spécificités clés d’Inertia et ses grandes features, avec des exemples concrets (Laravel + Vue 3).
Ce sont les mécanismes qui font qu’Inertia n’est pas “juste une navigation AJAX”.

⸻

1) Inertia::render : le cœur du modèle

Côté backend

```php
use Inertia\Inertia;

return Inertia::render('Users/Index', [
    'users' => User::paginate(10),
]);
```

- Tu retournes un nom de page + des props
- Pas de JSON “API-style”
- Pas de Blade

Côté frontend

```vue
<script setup>
defineProps({
  users: Object
})
</script>
```

Spécificité :
- Le backend décide quelle page est affichée
- Le frontend ne “fetch” pas les pages

⸻

2) Navigation Inertia (sans router frontend)

Lien Inertia

```vue
import { Link } from '@inertiajs/vue3'

<Link href="/users">
Users
</Link>
```

Ce que fait Inertia :
- Intercepte le clic
- Fait une requête XHR
- Remplace le composant courant
- Conserve l’état si nécessaire

➡️ SPA-like, sans vue-router.

⸻

3) Form helpers (useForm) – feature majeure

Exemple simple

```vue
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  name: '',
  email: '',
})

form.post('/users')
```

Ce que ça gère automatiquement
- Erreurs de validation Laravel
- Loading state
- Reset
- Flash messages

```vue
<div v-if="form.errors.email">
  {{ form.errors.email }}
</div>
```

➡️ C’est l’une des raisons principales d’adopter Inertia.

⸻

4) Validation serveur native

Laravel

```php
$request->validate([
  'email' => ['required', 'email'],
]);
```

Sans rien faire côté frontend :
- Les erreurs sont injectées dans form.errors
- Pas besoin de mapper manuellement une réponse API

➡️ Pas de duplication de règles.

⸻

5) Shared props (données globales)

Middleware Inertia

```php
Inertia::share([
    'auth' => fn () => [
        'user' => Auth::user(),
    ],
    'flash' => fn () => session()->get('flash'),
]);
```

Frontend

```vue
import { usePage } from '@inertiajs/vue3'

const page = usePage()
page.props.auth.user
```

Cas d’usage :
- User connecté
- Permissions
- Flash messages
- Feature flags

⸻

6) Partial reloads (optimisation clé)

```js
router.visit('/dashboard', {
  only: ['stats'],
})
```

Ou côté lien :

```vue
<Link href="/dashboard" :only="['stats']" />
```

➡️ Recharge uniquement certaines props, pas toute la page.

Utile pour :
- Stats
- Widgets
- Sections lourdes

⸻

7) Lazy props

Backend

```php
return Inertia::render('Dashboard', [
  'stats' => Inertia::lazy(fn () => $this->stats()),
]);
```

➡️ Les données sont chargées après le rendu initial.

Idéal pour :
- Graphs
- Données secondaires
- Optimisation TTFB

⸻

8) Persistent layouts

Layout

```vue
<template>
  <Sidebar />
  <main>
    <slot />
  </main>
</template>
```

Page

```vue
import AppLayout from '@/Layouts/AppLayout.vue'

defineOptions({
  layout: AppLayout,
})
```

➡️ Le layout n’est pas détruit entre navigations
➡️ Très utile pour menus, états UI, scroll

⸻

9) State preservation

```js
router.visit('/users', {
  preserveState: true,
  preserveScroll: true,
})
```

➡️ Inertia peut garder :
- Le scroll
- Le state local du composant

Très utile pour :
- Filtres
- Pagination
- Formulaires longs

⸻

10) Redirects et responses normales

```php
return redirect()->route('users.index');
```

Ou :

```php
return back()->with('flash', 'Saved');
```

➡️ Pas besoin de réponses spéciales “API”
➡️ Inertia intercepte et gère correctement

⸻

Ce qui rend Inertia spécifique (résumé)
- Pages = composants frontend
- Routing = serveur
- Pas d’API REST
- Formulaires ultra intégrés
- Validation serveur native
- Optimisations fines (lazy, partial, preserve)
- DX très orientée productivité

⸻

À retenir

Si tu devais retenir 3 features clés :
	1.	Inertia::render (backend-driven UI)
	2.	useForm (formulaires + validation)
	3.	Shared / partial / lazy props (performance sans complexité)

C’est cet ensemble qui fait qu’Inertia est simple sans être limité.

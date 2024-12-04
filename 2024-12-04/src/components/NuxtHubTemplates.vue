<script lang="ts" setup>
const templates = [
  {
    name: 'Atidone',
    description: 'A full-stack application with authentication and a database to manage your Todos.',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL251eHQtdG9kb3MtZWRnZS5wYWdlcy5kZXYiLCJpYXQiOjE3MTEzNjM3NjV9.T3QNfNtEiyQv6vsrwfbYx1yFlPbDq4PO41RtXXUEdMc.jpg',
  },
  {
    name: 'Nuxt Image Gallery',
    description: 'An image gallery to upload, edit and share your images to the world.',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL251eHQtaW1hZ2UtZ2FsbGVyeS5wYWdlcy5kZXYiLCJpYXQiOjE3MTA4NzAyMjd9.n97Cf7vLFd085tbV4Gqws0xRfNqVKKBI6NV3mfl7soE.jpg',
  },
  {
    name: 'Gavarnie',
    description: 'Full-stack template with authentication, profile and many features for a quickstart.',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2dhdmFybmllLm51eHQuZGV2IiwiaWF0IjoxNzIzOTc0OTcxfQ.jEWdUHMrFvLcR3J0Nctg9Yx4uorqCed0hcaZbfbFRD4.jpg',
  },
  {
    name: 'Chat with PDF',
    description: 'A a full-stack AI-powered application that lets you to ask questions to PDF.',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2NoYXQtd2l0aC1wZGYubnV4dC5kZXYiLCJpYXQiOjE3Mjg5ODA4MDF9.o7sqdh1j0WRCaC0LvCdTX5tPOmhgFT7xkf_EOMvsC5g.jpg',
  },
  {
    name: 'My Pull Requests',
    description: 'A template to showcase your open source contributions (pull requests).',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Bycy5hdGludXguY29tIiwiaWF0IjoxNzI0MTYwMTkxfQ.yYRD-Gs6EyYQSfg27fZVx1Kle7nq7QBSciDui-mbnnU.jpg',
  },
  {
    name: 'Chat GitHub',
    description: 'Search GitHub in Plain English using OpenAI & GitHub API.',
    img: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2NoYXQtZ2l0aHViLm51eHQuZGV2IiwiaWF0IjoxNzI2MjA4NzUxfQ.lFmUceA3apEh2PETp4RORS6kqy7hi54l0T7lhUlgm9o.jpg',
  },
]
</script>

<template>
  <div class="grid grid-rows-2 grid-cols-3 gap-x-2 gap-y-6 max-h-full items-center">
    <div v-click class="sr-only" />
    <template v-for="(template, index) in templates" :key="template.name">
      <div :style="{ '--delay': `${(index + 1) * 75}ms` }">
        <Card v-after class="forward:delay-[--delay]">
          <img :src="template.img" class="rounded-sm">
          <div>
            <div class="mt-2 text-sm">
              {{ template.name }}
            </div>
            <div class="mt-1 text-xs op-60">
              {{ template.description }}
            </div>
          </div>
        </Card>
      </div>
    </template>
  </div>
</template>

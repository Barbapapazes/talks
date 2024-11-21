<script lang="ts" setup>

</script>

<template>
  <div class="flex justify-center gap-8">
    <ToolCard v-click class="forward:delay-50 backward:delay-300" logo="i-logos-vitejs" name="Vite" />
    <ToolCard v-after class="forward:delay-100 backward:delay-250" logo="i-logos-vue" name="Vue" />
    <ToolCard v-after class="forward:delay-150 backward:delay-200" img="/vitepress.svg" name="VitePress" />
    <ToolCard v-after class="forward:delay-200 backward:delay-150" logo="i-logos-unjs" name="UnJS" />
    <ToolCard v-after class="forward:delay-250 backward:delay-100" logo="i-logos-nuxt-icon" name="Nuxt" />
    <ToolCard v-after class="backward:delay-50 forward:delay-300" logo="i-logos-laravel" name="Laravel" />
  </div>
</template>

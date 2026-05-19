<script lang="ts" setup>
interface RecapListItem {
  title: string
  description?: string
}

interface RecapListProps {
  title: string
  items: RecapListItem[]
}

const props = defineProps<RecapListProps>()
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6">
    <h1 v-click class="text-3xl font-semibold tracking-tight text-balance text-white">
      {{ props.title }}
    </h1>

    <div class="flex flex-col gap-5">
      <article
        v-for="(item, index) in props.items"
        :key="`${index}-${item.title}`"
        v-click
        data-recap-list-item
        class="rounded-3xl border border-white/15 bg-white/10 px-6 py-5 shadow-2xl backdrop-blur-sm"
      >
        <div class="flex gap-5">
          <div class="w-12 flex items-center justify-center rounded-xl bg-white text-2xl font-bold text-black">
            {{ index + 1 }}
          </div>

          <div class="flex-1">
            <h2 class="text-2xl font-semibold leading-tight text-white text-balance">
              {{ item.title }}
            </h2>

            <p
              v-if="item.description"
              class="mt-[0.25rem] text-lg leading-relaxed text-white/75"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

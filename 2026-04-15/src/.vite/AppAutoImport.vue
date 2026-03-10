<script lang="ts" setup>
const count = ref(0)

const double = computed(() => count.value * 2)

effect(() => {
  console.log(`Count: ${count.value}, Double: ${double.value}`)
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

/* eslint-disable */
// @ts-nocheck
import { ref, computed, effect } from "/node_modules/.vite/deps/vue.js?v=68524f59"
const count = ref(0)

const double = computed(() => count.value * 2)

effect(() => {
  console.log(`Count: ${count.value}, Double: ${double.value}`)
})

<script lang="ts" setup>
import { computed, ref } from 'vue'

const quantity = ref(0)
const price = ref(15)

const total = computed(() => price.value * quantity.value)

const isClicked = ref(false)
</script>

<template>
  <table class="w-full table-fixed">
    <thead>
      <tr>
        <th class="p-4 text-center font-medium text-gray-400 border-b border-gray-200 pt-0 pb-3 pl-8 dark:border-gray-600 dark:text-gray-200" />
        <th class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-center font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
          A
        </th>
        <th class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-center font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
          B
        </th>
        <th class="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-center font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
          C
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-4 border-b text-gray-400 dark:text-gray-200 border-gray-100 dark:border-gray-700">
          1
        </td>
        <td class="p-4 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-right">
          Quantité
        </td>
        <td class="border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right">
          <div class="p-4 border-2 border-transparent data-[clicked=true]:border-blue-500 dark:data-[clicked=true]:border-blue-400" :data-clicked="isClicked">
            <input v-model.number="quantity" type="text" class="w-full text-right bg-transparent focus:outline-none">
          </div>
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right" />
      </tr>
      <tr>
        <td class="p-4 border-b border-gray-100 text-gray-400 dark:border-gray-700 dark:text-gray-200">
          2
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right">
          Prix unitaire
        </td>
        <td class="border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right">
          <div class="p-4 border-2 border-transparent data-[clicked=true]:border-red-500 dark:data-[clicked=true]:border-red-400" :data-clicked="isClicked">
            <input v-model.number="price" type="text" class="w-full focus:outline-none text-right bg-transparent">
          </div>
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right" />
      </tr>
      <tr>
        <td class="p-4 border-b border-gray-100 text-gray-400 dark:border-gray-700 dark:text-gray-200">
          3
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right">
          Total
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right data-[clicked=true]:text-left" :data-clicked="isClicked" @click="isClicked = !isClicked">
          <span v-if="!isClicked">{{ total }}</span>
          <span v-else>= <span class="text-blue-500 dark:text-blue-400">B1</span> * <span class="text-red-500 dark:text-red-400">B2</span></span>
        </td>
        <td class="p-4 border-b border-gray-100 text-gray-500 dark:border-gray-700 dark:text-gray-400 text-right" />
      </tr>
    </tbody>
  </table>
</template>

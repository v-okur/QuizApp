<script setup>
import { defineProps } from 'vue'

const { category } = defineProps(['category'])
</script>

<template>
  <a href="/quiz">
    <div
      class="animate-slide-in-bottom cursor-pointer transform transition duration-400 ease-linear hover:scale-105 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
    >
      <img :src="category.img" alt="" class="rounded-md w-full h-32 max-h-40 object-cover" />
      <div class="p-4 text-center">
        <h2 class="text-xl font-bold text-gray-800">{{ category.name }}</h2>
      </div>
    </div>
  </a>
</template>

<style scoped></style>

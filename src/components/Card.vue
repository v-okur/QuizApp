<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const { category } = defineProps(['category'])
</script>

<template>
  <div
    class="animate-slide-in-bottom cursor-pointer transform transition duration-400 ease-linear hover:scale-105 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
  >
    <img :src="category.img" alt="" class="rounded-md w-full h-32 max-h-40 object-cover" />

    <div class="p-3 text-center">
      <h3 class="text-lg font-bold text-gray-800">{{ category.name }}</h3>
    </div>
  </div>
</template>

<style scoped></style>

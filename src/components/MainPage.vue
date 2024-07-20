<script setup>
import { ref, computed } from 'vue'
import Card from './Card.vue'
import { RouterLink } from 'vue-router'

const search = ref('')
const categories = ref([
  { name: 'Sports', img: 'images/sports.png' },
  { name: 'Geography', img: 'images/geography.png' },
  { name: 'History', img: 'images/history.png' },
  { name: 'Politics', img: 'images/politics.png' },
  { name: 'Animals', img: 'images/animals.png' },
  { name: 'Video Games', img: 'images/videogames.png' }
])

const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div class="font-comfortaa flex flex-col items-center">
    <div class="w-full md:max-w-screen-sm p-4 mt-0 min-h-screen">
      <div class="header flex justify-between items-end my-6">
        <h1 class="text-4xl font-bold text-gray-800">Quiz App</h1>
        <input
          v-model="search"
          class="bg-white transform h-10 shadow-md pl-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          type="text"
          placeholder="Search..."
        />
      </div>
      <hr class="mb-6 mt-3 h-1 bg-gray-800" />
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <RouterLink
          v-for="category in filteredCategories"
          :to="`/quiz/${category.name.toLowerCase()}`"
          :key="category.name"
        >
          <Card :kalamar="category.name" :category="category" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 430px) {
  .max-w-screen-sm {
    max-width: 430px;
  }
}

@media (min-width: 932px) {
  .max-w-screen-sm {
    max-width: 932px;
  }
}
</style>

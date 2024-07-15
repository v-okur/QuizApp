<script setup>
import { onMounted, ref, computed } from 'vue'

const search = ref('')
const categories = ref([
  { name: 'Sports', img: 'src/assets/sports.png' },
  { name: 'Geography', img: 'src/assets/geography.png' },
  { name: 'History', img: 'src/assets/history.png' },
  { name: 'Politics', img: 'src/assets/politics.png' },
  { name: 'Animals', img: 'src/assets/animals.png' },
  { name: 'Video Games', img: 'src/assets/videogames.png' }
])

const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
onMounted(async () => {
  /* try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=15&category=17&difficulty=medium&type=multiple'
    )
    const data = await response.json()
    console.log(data.results)

    questions.value = data.results.map((result) => ({
      question: result.question,
      correct_answer: result.correct_answer,
      incorrect_answers: result.incorrect_answers,
      category: result.category.replace('amp;', '')
    }))

    console.log(questions.value)
  } catch (error) {
    console.error('Error fetching trivia questions:', error)
  } */
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-screen-sm p-4">
      <div class="header flex justify-between items-center">
        <h1 class="text-4xl font-bold text-gray-800">Quiz App</h1>
        <input
          v-model="search"
          class="bg-white shadow-md pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="text"
          placeholder="Search..."
        />
      </div>
      <hr class="my-2 border-gray-200" />
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="category in filteredCategories"
          :key="category.name"
          class="cursor-pointer hover:scale-105 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
        >
          <img :src="category.img" alt="" class="w-full h-fit object-scale-down" />
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-800">{{ category.name }}</h2>
          </div>
        </div>
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
<!-- <template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-screen-sm p-4">
      <div class="header flex justify-between items-center">
        <h1 class="text-4xl font-bold text-gray-800">Quiz App</h1>
        <input
          v-model="search"
          class="bg-white shadow-md pl-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          type="text"
          placeholder="Search..."
        />
      </div>
      <hr class="my-2 border-gray-200" />
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="category in filteredCategories"
          :key="category.name"
          class="cursor-pointer hover:scale-105 bg-white rounded-md shadow-md border border-gray-200 overflow-hidden"
        >
          <img :src="category.img" alt="" class="w-full h-32 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-bold text-gray-800">{{ category.name }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

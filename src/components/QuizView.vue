<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { shuffle } from '../helpers/shuffle'
import { fetchQuestions } from '../helpers/fetchQuestions'
import { decode } from 'html-entities'

const questions = ref([])
const question = ref({})
const route = useRoute()
const loading = ref(true)
const loadingText = ref('')
const questionCount = ref(0)
const selectedAnswer = ref(null)
const correctAnswer = ref(null)
const correctQuestions = ref(0)
const isAnswered = ref(false)

const getNewQuestion = () => {
  questionCount.value++
  const index = Math.floor(Math.random() * questions.value.length)
  const selectedQuestion = questions.value[index]
  question.value = selectedQuestion
  question.value.category = decode(selectedQuestion.category)
  question.value.question = decode(selectedQuestion.question)
  const allAnswers = [
    decode(selectedQuestion.correct_answer),
    ...selectedQuestion.incorrect_answers.map((answer) => decode(answer))
  ]
  question.value.answers = shuffle(allAnswers)
  selectedAnswer.value = null
  correctAnswer.value = null
  isAnswered.value = false
  questions.value.splice(index, 1)
}

const selectAnswer = (answer) => {
  if (!isAnswered.value) {
    selectedAnswer.value = answer
    correctAnswer.value = question.value.correct_answer
    console.log(answer, correctAnswer.value)
    if (answer === correctAnswer.value) correctQuestions.value++
    isAnswered.value = true
    setTimeout(() => {
      getNewQuestion()
    }, 1000)
  }
}

const restart = async () => {
  loading.value = true
  let data
  let tryCount = 0
  while (!data) {
    data = await fetchQuestions(route.params.name)
    if (!data && tryCount > 0) {
      loadingText.value = 'This may take a while'
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
    tryCount++
  }
  questions.value = data
  questionCount.value = 0
  correctQuestions.value = 0
  loading.value = false
  getNewQuestion()
}

onBeforeMount(async () => {
  console.log('mounted')
  restart()
})
</script>

<template>
  <RouterLink class="inline-block m-5" to="/">
    <h1 class="font-comfortaa underline text-xl">Home</h1>
  </RouterLink>
  <div
    v-if="loading"
    class="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col justify-center items-center w-2/4 h-3/4 fixed text-center bg-opacity-50"
  >
    <div
      class="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-800"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
    <h1 class="mt-4">{{ loadingText }}</h1>
  </div>
  <div v-else v-if="questions">
    <div
      v-if="questionCount <= 10"
      class="mx-4 md:w-2/4 font-comfortaa md:mx-auto h-full flex-col justify-center flex mt-6 items-center"
    >
      <div class="p-2 flex justify-between w-full items-center">
        <h1 class="text-xl">{{ question.category }}</h1>
        <h1 class="text-xl md:text-4xl">{{ questionCount }}/10</h1>
      </div>
      <div
        class="w-full h-3/5 border-2 bg-slate-200 border-teal-950 rounded-xl box-border p-5 flex flex-col"
      >
        <h1 class="text-xs md:text-base">{{ question.question }}</h1>
      </div>
      <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-1">
        <button
          v-for="answer in question.answers"
          :key="answer"
          :disabled="isAnswered"
          :class="{
            'text-white bg-blue-500 hover:bg-blue-600 hover:scale-105': !selectedAnswer,
            'text-white bg-yellow-500': selectedAnswer === answer && answer !== correctAnswer,
            'text-white bg-green-500': selectedAnswer && answer === correctAnswer,
            'text-white bg-red-500': selectedAnswer && answer !== correctAnswer
          }"
          class="min-h-14 md:font-medium transition-transform ease-in-out rounded-lg text-xs md:text-sm me-2 w-full h-full mb-2 p-2 animate-slide-in-bottom"
          @click="selectAnswer(answer)"
        >
          {{ answer }}
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full mt-6">
      <h1 class="text-2xl font-comfortaa">Correct answers: {{ correctQuestions }}</h1>
      <button class="border-2 p-2 rounded-xl bg-slate-50 border-slate-950 mt-4" @click="restart">
        Restart
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Stil düzenlemeleri */
</style>

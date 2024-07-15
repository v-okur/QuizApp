import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './src/components/MainPage.vue'
import QuizView from './src/components/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: MainPage },
    { path: '/quiz', name: 'quiz', component: QuizView }
  ]
})

export default router

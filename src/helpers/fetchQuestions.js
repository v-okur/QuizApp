import getCategoryId from './getCategoryId'
import { decode } from 'html-entities'

export const fetchQuestions = async (categoryName) => {
  let attempts = 0
  const maxAttempts = 3 // Maksimum deneme sayısı
  const retryDelay = 5000 // 5 saniye bekleme süresi

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=40&category=${getCategoryId(categoryName)}&type=multiple`
      )

      const data = await response.json()
      console.log(data)
      if (response.ok && data.response_code !== 5) {
        return data.results.map((result) => ({
          question: decode(result.question),
          correct_answer: decode(result.correct_answer),
          incorrect_answers: result.incorrect_answers.map((answer) => decode(answer)),
          category: decode(result.category)
        }))
      } else if (data.response_code === 5) {
        return null
      } else {
        throw new Error(`Unexpected response code: ${data.response_code}`)
      }
    } catch (error) {
      console.error('Error fetching trivia questions:', error)
      if (attempts >= maxAttempts - 1) {
        return []
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      attempts++
    }
  }

  return []
}

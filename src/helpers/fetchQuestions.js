import getCategoryId from './getCategoryId'
import { decode } from 'html-entities'

export const fetchQuestions = async (categoryName) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=20&category=${getCategoryId(categoryName)}&difficulty=medium&type=multiple`
    )
    const data = await response.json()

    return data.results.map((result) => ({
      question: decode(result.question),
      correct_answer: decode(result.correct_answer),
      incorrect_answers: result.incorrect_answers.map((answer) => decode(answer)),
      category: decode(result.category)
    }))
  } catch (error) {
    console.error('Error fetching trivia questions:', error)
    return []
  }
}

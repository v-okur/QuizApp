const questions = [
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Sports',
    question: 'Who is Manchester United&#039;s top premier league goal scorer?',
    correct_answer: 'Wayne Rooney',
    incorrect_answers: ['Sir Bobby Charlton', 'Ryan Giggs', 'David Beckham']
  }
]
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Rastgele bir soru seç
const index = Math.floor(Math.random() * questions.length)
let selectedQuestion = questions[index]

// Tüm cevapları birleştir ve karıştır
const allAnswers = [selectedQuestion.correct_answer, ...selectedQuestion.incorrect_answers]
const shuffledAnswers = shuffle(allAnswers)

selectedQuestion.answers = shuffledAnswers

// Seçilen soruyu ve karıştırılmış cevapları console'da göster
console.log({
  ...selectedQuestion,
  answers: shuffledAnswers
})

// Seçilen soruyu diziden kaldır
questions.splice(index, 1)

// Güncellenmiş diziyi kontrol etmek için console'da göster
console.log('Güncellenmiş soru dizisi:', selectedQuestion.answers)

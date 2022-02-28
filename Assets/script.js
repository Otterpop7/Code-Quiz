const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const endGameButton = document.getElementById('end-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')
const containerElement = document.getElementById('container')

let shuffleQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random())
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetQuestions()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetQuestions() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(a) {
    const selectedButton = a.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        endGame()
    }
}

function endGame() {
    endGameButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: '1st question?',
        answers: [
            { text: 'answer 1', correct: true },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: false },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: '2ns question?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: true },
            { text: 'answer 3', correct: false },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: '3rd question?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: true },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: '4th question?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: true },
            { text: 'answer 4', correct: false }
        ]
    }
];
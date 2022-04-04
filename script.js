// Questions objects inside an array
var questions = [{
    "question": "What is the 'soul' of a website?",
    "option1": " HTML",
    "option2": " Java Script",
    "option3": " CSS",
    "option4": " Java",
    "answer": "2"
}, {
    "question": "What does CSS stand for?",
    "option1": " Cascading Style Sheets",
    "option2": " Crippling Social Status",
    "option3": " Cruncy Smelly Sheets",
    "option4": " Crown Standard Style",
    "answer": "1"
}, {
    "question": "What's the point in having a CSS page?",
    "option1": " To make your website work",
    "option2": " To make the webpage text",
    "option3": " To make buttons work on website",
    "option4": " To give the website style",
    "answer": "4"
}]

// Timer
var sec = 45
var time

function timer() {
    time = setInterval(interval, 1000)
    timeContainer.show()
    container.show()
    startBtn.hide()
}

// Creates a countdown and finishes quiz when timer hits zero.
function interval() {
    document.getElementById('timer').innerHTML = sec + " seconds"
    sec--
    if (sec === -1) {
        clearInterval(time)
        finishQuiz()
        alert("Submitted")
    }
    console.log(sec)
}

// Questions
// Empty variables (placeholders)
var currentQuestion = 0
var score = 0
var totalQuestions = questions.length

// Calling IDs from HTML file
var timeContainer = $("#timerContainer")
var container = $("#quizContainer")
var questionEl = document.getElementById("questions")
var option1 = document.getElementById("opt1")
var option2 = document.getElementById("opt2")
var option3 = document.getElementById("opt3")
var option4 = document.getElementById("opt4")
var nextButton = document.getElementById("next_button")
var results = document.getElementById("results")
var initials = document.getElementById("initials")
var messageBox = $("#message-box")
var displayScore = $("#highScores")
var startBtn = $("#startBtn")

// Pulls questions objects out of array in questions.js
function loadQuestions(qIndex) {
    var q = questions[qIndex]
    questionEl.textContent = (qIndex + 1) + '. ' + q.question
    option1.textContent = q.option1
    option2.textContent = q.option2
    option3.textContent = q.option3
    option4.textContent = q.option4
}

// Runs termination on quiz and takes you straight to the score.
function finishQuiz() {
    sec = 0
    container.hide()
    timeContainer.hide()
    results.style.display = ''
    results.textContent = 'Score: ' + score + ' / ' + totalQuestions
    messageBox.show()
}

// Loads next quiz question
function loadNextQuestion() {
    var selected = document.querySelector('input[type=radio]:checked')
    if (!selected) {
        alert("Must select a possible answer.")
        return
    }
    var answer = selected.value
    if (questions[currentQuestion].answer == answer) {
        score += 1
    }
    selected.checked = false
    currentQuestion++
    if (currentQuestion === totalQuestions.value) {

    }
    if (currentQuestion === totalQuestions) {
        finishQuiz()
        return
    }
    loadQuestions(currentQuestion)
}
loadQuestions(currentQuestion)

// previous button makes user go back 1 question
function loadPrevQuestion() {
    var selected = document.querySelector('input[type=radio]:checked')
    if (!selected) {
        alert("Must select a possible answer.")
        return
    }
    selected.checked = false
    currentQuestion--
    if (currentQuestion === totalQuestions.value) {

    }
    if (currentQuestion === totalQuestions) {
        finishQuiz()
        return
    }
    loadQuestions(currentQuestion)
}
loadQuestions(currentQuestion)

// Local storage
var inputInitScore = []
userInitials = initials.value.trim()

var enterBtn = document.getElementById("enterInit")
enterBtn.addEventListener("click", function() {
    event.preventDefault()
    if (initials.value === "") {
        alert("Please enter your initials")
    } else {
        var scoreObject = {
            initials: initials.value,
            score: score
        }
        inputInitScore = JSON.parse(localStorage.getItem("inputInitScore"))
        if (!inputInitScore) {
            inputInitScore = []
        }

        inputInitScore.push(scoreObject)

        localStorage.setItem("inputInitScore", JSON.stringify(inputInitScore))
        displayHighScore()
    }
})

// Displays initials and scores in html
function displayHighScore() {
    displayScore.show()
    var highScoreList = JSON.parse(localStorage.getItem("inputInitScore"))

    for (i = 0; i < highScoreList.length; i++) {
        let listing = document.createElement("li")

        let scoreObject = highScoreList[i]
        let htmlText = (scoreObject.initials) + "-" + (scoreObject.score)
        console.log(htmlText)

        listing.innerText = htmlText

        document.getElementById("highscoreList").appendChild(listing)
    }
}
// Event listner for next and previous question buttons

$("#nextButton").click(loadNextQuestion)
$("#startBtn").click(timer)
$("#startBtn").click(loadQuestions)
$("#prevButton").click(loadPrevQuestion)
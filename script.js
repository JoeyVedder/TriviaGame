let currentQuestion = null;

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("next-question").addEventListener("click", fetchQuestion);

function startGame() {
    document.getElementById("start-game").style.display = "none";
    document.getElementById("question-container").classList.remove("hidden");
    fetchQuestion();
}

function fetchQuestion() {
    getTriviaQuestion().then(data => {
        currentQuestion = data;
        displayQuestion(data);
    });
}

function displayQuestion(data) {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("next-question");
    const feedbackElement = document.getElementById("feedback");

    questionElement.textContent = decodeHTML(data.question);
    answersElement.innerHTML = '';
    feedbackElement.textContent = '';  // Reset feedback message

    data.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = decodeHTML(answer);
        button.classList.add("answer");
        button.addEventListener("click", () => checkAnswer(answer, data.correctAnswer));
        answersElement.appendChild(button);
    });

    nextButton.classList.remove("hidden");
}

function decodeHTML(text) {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const nextButton = document.getElementById("next-question");
    const feedbackElement = document.getElementById("feedback");

    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = "Correct!";
    } else {
        feedbackElement.textContent = "Incorrect!";
    }

    nextButton.classList.remove("hidden");

    nextButton.addEventListener("click", () => {
        nextButton.classList.add("hidden"); 
    });
}

// Function to fetch trivia question from Open Trivia Database API
function getTriviaQuestion() {
    return fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(response => response.json())
        .then(data => {
            const questionData = data.results[0];
            const question = questionData.question;
            const correctAnswer = questionData.correct_answer;
            const incorrectAnswers = questionData.incorrect_answers;

            const allAnswers = [...incorrectAnswers, correctAnswer];
            const shuffledAnswers = shuffleArray(allAnswers);

            return {
                question: question,
                correctAnswer: correctAnswer,
                answers: shuffledAnswers
            };
        })
        .catch(error => console.error('Error fetching trivia question:', error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

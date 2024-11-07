
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        answer: "Shakespeare"
    }
];

const quizContainer = document.getElementById("quiz");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Clear previous question content
    quizContainer.innerHTML = '';

    // Create question element
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // Add the question text
    const questionText = document.createElement("p");
    questionText.textContent = currentQuestion.question;
    questionElement.appendChild(questionText);

    // Add the options
    currentQuestion.options.forEach((option, i) => {
        const optionLabel = document.createElement("label");
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = `question${currentQuestionIndex}`;
        optionInput.value = option;

        // Set the checked attribute if the answer is saved
        if (userAnswers[currentQuestionIndex] === option) {
            optionInput.checked = true;
        }

        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(option));
        questionElement.appendChild(optionLabel);
    });

    quizContainer.appendChild(questionElement);

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
    submitBtn.disabled = !userAnswers.every(answer => answer !== null);
}

function saveAnswer() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    }
}

function showResults() {
    let score = 0;
    quizData.forEach((item, index) => {
        if (userAnswers[index] === item.answer) {
            score++;
        }
    });

    // Calculate percentage score
    const percentage = (score / quizData.length) * 100;
    resultContainer.textContent = `You scored ${percentage.toFixed(2)}%`;
}

nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

prevBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", () => {
    saveAnswer();
    showResults();
});

// Load the first question on page load
loadQuestion();

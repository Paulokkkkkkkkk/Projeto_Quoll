const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const livesCounter = document.getElementById("lives-counter");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let lives = 3;

// EXEMPLO — substitua pelo seu array real
const questions = [
    {
        question: "Qual filme tem o personagem Woody?",
        options: ["Shrek", "Toy Story", "Carros", "Frozen"],
        answer: 1
    }
];

function loadQuestion() {
    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    questionNumber.textContent = (currentQuestion + 1) + ".";
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.textContent = opt;

        btn.addEventListener("click", () => {
            checkAnswer(btn, index === q.answer);
        });

        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(btn, correct) {
    const all = document.querySelectorAll(".option");

    all.forEach(b => b.disabled = true);

    if (correct) {
        btn.classList.add("correct"); // vira ROXO
    } else {
        btn.classList.add("incorrect"); // vira VERMELHO
        lives--;
        livesCounter.textContent = lives;
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        alert("Fim do quiz!");
        return;
    }

    loadQuestion();
});

loadQuestion();

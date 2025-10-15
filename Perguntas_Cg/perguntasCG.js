const quizData = [
  {
    question: "Qual foi o melhor jogador dos games?",
    options: ["Maradona", "Pelé", "Ronaldo", "Allejo"],
    answer: "Allejo"
  },
  {
    question: "Em qual console nasceu o Mario?",
    options: ["PlayStation", "Atari", "NES", "Mega Drive"],
    answer: "NES"
  },
  {
    question: "Qual desses é um Pokémon elétrico?",
    options: ["Charmander", "Squirtle", "Pikachu", "Bulbasaur"],
    answer: "Pikachu"
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionText.textContent = questionData.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  optionsContainer.innerHTML = "";
  questionData.options.forEach((opt) => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");
    optionBtn.textContent = opt;
    optionBtn.addEventListener("click", () => selectOption(optionBtn, questionData.answer));
    optionsContainer.appendChild(optionBtn);
  });
}

function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correctAnswer) {
      opt.classList.add("correct");
    }
  });

  if (selected.textContent === correctAnswer) {
    score++;
  } else {
    selected.classList.add("incorrect");
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".question-header").classList.add("hidden");
  optionsContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
    <h2>Você acertou ${score} de ${quizData.length} perguntas!</h2>
    <a href="../Home/index.html" class="botao-voltar">Voltar ao Menu</a>
  `;
}

loadQuestion();

const quizData = [
  {
    question: "Qual a raíz de 4?",
    options: ["7", "2", "4", "3"],
    answer: "2"
  },
   {
    question: "qual o numero primo entre 4 e 8?",
    options: ["6", "7", "8", "9"],
    answer: "7"
  },
 {
    question: "formula quimica do dioxido de carbono?",
    options: ["CO", " CO²", "O²", "C²O"],
    answer: "CO²"
  },

{
    question: "qual o simbolo do elemento oxigenio?",
    options: ["O", " Ox", "Og", "oxg"],
    answer: "O"
  },

{
    question: "Acido comum no estomago (acido cloridrico) tem formula:",
    options: ["H²O", "HCl", "naCl", "H²SO4"],
    answer: "HCl"
  },

{
    question: "A luz viaja mais rapido em:",
    options: ["Ar", "Agua", "vidro", "vacuo"],
    answer: "vacuo"
  },

{
    question: "o que ê uma mistura de duas ou mais substancias onde uma esta dissovilda na outra?",
    options: ["elementos", "mistura heterogenea", "solução", "compostos"],
    answer: "solução"
  },
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

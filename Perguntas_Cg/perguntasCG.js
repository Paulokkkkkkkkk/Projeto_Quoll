const quizData = [
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: "Júpiter"
  },
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Roma", "Londres", "Berlim"],
    answer: "Paris"
  },
  {
    question: "Quantos dias tem um ano bissexto?",
    options: ["365", "366", "367", "364"],
    answer: "366"
  },
  {
    question: "Qual é o oceano que banha o Brasil?",
    options: ["Pacífico", "Atlântico", "Índico", "Ártico"],
    answer: "Atlântico"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "Qual é o maior país do mundo em território?",
    options: ["China", "Rússia", "Canadá", "Estados Unidos"],
    answer: "Rússia"
  },
  {
    question: "Qual é o metal líquido à temperatura ambiente?",
    options: ["Mercúrio", "Ferro", "Ouro", "Alumínio"],
    answer: "Mercúrio"
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Guepardo", "Falcão-peregrino", "Leopardo", "Tubarão"],
    answer: "Falcão-peregrino"
  },
  {
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: "H2O"
  },
  {
    question: "Quem foi o primeiro presidente do Brasil?",
    options: ["Getúlio Vargas", "Dom Pedro II", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"],
    answer: "Marechal Deodoro da Fonseca"
  },
  {
    question: "Qual é o menor osso do corpo humano?",
    options: ["Fêmur", "Estribo", "Falange", "Tíbia"],
    answer: "Estribo"
  },
  {
    question: "Qual país possui a maior população atualmente?",
    options: ["China", "Índia", "Estados Unidos", "Indonésia"],
    answer: "Índia"
  },
  {
    question: "Em que ano começou a Primeira Guerra Mundial?",
    options: ["1914", "1939", "1922", "1898"],
    answer: "1914"
  },
  {
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Qual é o maior deserto do mundo?",
    options: ["Saara", "Gobi", "Antártida", "Atacama"],
    answer: "Antártida"
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: ["Machado de Assis", "José Saramago", "Miguel de Cervantes", "Camões"],
    answer: "Miguel de Cervantes"
  },
  {
    question: "O que é fotossíntese?",
    options: [
      "Respiração das plantas",
      "Processo em que plantas produzem alimento",
      "Formação de nuvens",
      "Digestão de herbívoros"
    ],
    answer: "Processo em que plantas produzem alimento"
  },
  {
    question: "Qual é a moeda oficial do Japão?",
    options: ["Yen", "Won", "Dólar", "Euro"],
    answer: "Yen"
  },
  {
    question: "Qual é o elemento químico representado por 'O'?",
    options: ["Ouro", "Oxigênio", "Ósmio", "Óxido"],
    answer: "Oxigênio"
  },
  {
    question: "Qual desses países é localizado na América do Sul?",
    options: ["México", "Peru", "Espanha", "Costa Rica"],
    answer: "Peru"
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

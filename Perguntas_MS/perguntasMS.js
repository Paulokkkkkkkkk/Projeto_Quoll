const quizData = [
  {
    question: "Em qual ano o 'Minecraft' foi criado?",
    options: ["2011", "2009", "2010", "2008"],
    answer: "2009"
  },
  {
    question: "Quais são os personagens principais do Minecraft? ",
    options: ["Finn e Jake", "Steve e Andy", "Stevan e Alex", "Steve e Alex"],
    answer: "Steve e Alex"
  },  
  {
    question: "Qual é o mascote do Minecraft?? ",
    options: ["Creeper", "Porco", "Enderman", "Iron Golem"],
    answer: "Creeper"
  },
  {
    question: "Qual o maior medo do Creeper?? ",
    options: ["Felinos", "Lobos", "Sol", "Água"],
    answer: "Felinos"
  },
  {
    question: "O que acontece se renomear uma ovelha para 'jeb_'? ",
    options: ["Ela fica de cabeça pra baixo", "Ela fica mudando a cor", "Ela começa à nos atacar", "Absolutamente nada"],
    answer: "Ela fica mudando a cor"
  },
  {
    question: "Quantos corações tem o mob Warden?? ",
    options: ["100", "150", "200", "250"],
    answer: "250"
  },
   {
    question: "Em qual versão a abelha foi adicionada no Minecraft Java? ",
    options: ["1.14", "1.15", "1.13", "1.16"],
    answer: "1.15"
  },
  {
    question: "Qual é o mod mais popular do Minecraft?",
    options: ["RLCraft", "Mutant Mobs", "OptiFine", "Just Enough Items"],
    answer: "Just Enough Items"
  },
  {
    question: "Como se chama o local em que fica o portal do 'End'?",
    options: ["Stronghold", "Stronghoud", "End Portal", "Holdstrong"],
    answer: "stronghold"
  },
  {
    question: "Qual dessas picaretas quebra mais rápido?",
    options: ["Madeira", "Ouro", "Cobre", "Esmeralda"],
    answer: "Ouro"
  },
  {
    question: "O creeper foi um erro, mas ele era para ser o qual mob?",
    options: ["Porco", "Galinha", "Zumbi", "Slime"],
    answer: "Porco"
  },
  {
    question: "Quantos pixels tem um bloco normal?",
    options: ["15x15", "32x32", "10x10", "16x16"],
    answer: "16x16"
  },
  {
    question: "Quantos espaços tem em uma shulker box?",
    options: ["27", "32", "22", "28"],
    answer: "27"
  },
  {
    question: "Quanto de vida tem o player?",
    options: ["10", "20", "12", "8"],
    answer: "20"
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
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

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";

    // Detecta se o conteúdo é imagem
    const img = opt.querySelector("img");
    const isCorrect =
      img && img.src.includes(correctAnswer) || opt.textContent === correctAnswer;

    if (isCorrect) {
      opt.classList.add("correct");
    }
  });

  const selectedImg = selected.querySelector("img");
  const isSelectedCorrect =
    selectedImg && selectedImg.src.includes(correctAnswer) || selected.textContent === correctAnswer;

  if (isSelectedCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
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

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionText.textContent = questionData.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  optionsContainer.innerHTML = "";
  questionData.options.forEach((opt) => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");

    // Verifica se é uma imagem (termina com .png, .jpg, etc)
    if (opt.endsWith(".png") || opt.endsWith(".jpg") || opt.endsWith(".jpeg") || opt.endsWith(".gif")) {
      const img = document.createElement("img");
      img.src = opt;
      img.alt = "Opção de resposta";
      img.style.width = "120px";  // ajusta o tamanho como quiser
      img.style.height = "auto";
      optionBtn.appendChild(img);
    } else {
      // Se for texto normal
      optionBtn.textContent = opt;
    }

    optionBtn.addEventListener("click", () => selectOption(optionBtn, questionData.answer));
    optionsContainer.appendChild(optionBtn);
  });
}


const quizData = [
  {
    question: "Qual o jogo mais famoso da franquia de Resident Evil?",
    options: ["Resident Evil 4 (2005)", "Resident Evil 3: Nemesis (1999)", "Resident Evil 2 (Remake)", "Resident Evil 6 (2012)"],
    answer: "Resident Evil 4 (2005)"
  },
    {
    question: "Onde Kratos (God of War) nasceu?",
    options: ["Sparta", "Atenas", "Rodes", "Tessalônica"],
    answer: "Sparta"
  },
    {
    question: "O que você obtêm quando derrota o Dragão End no Minecraft? ",
    options: ["Cabeça do Dragão", "Ovo do Dragão", "Asas do Dragão", "Pack de Bedrock"],
    answer: "Ovo do Dragão"
  }, 
    {
    question: "Qual o jogo que contém mais parcerias atualmente?",
    options: ["Brawl Stars", "Minecraft", "Fortnite", "Genshin Impact"],
    answer: "Fortnite"
  },
      {
    question: "Qual desses jogos é do gênero 'RPG'?",
    options: ["Dispatch", "Hollow Knight", "Battlefield", "Deltarune"],
    answer: "Deltarune"
  },
      {
    question: "Qual o jogo mais popular da empresa 'Supercell'?",
    options: ["Clash of Clans", "Clash Royale", "Brawl Stars", "Hay Day"],
    answer: "Clash Royale"
  },
      {
    question: "Qual o jogo mais jogado do roblox?",
    options: ["Grow a Garden", "Blox Fruits", "Brookhaven RP", "Doors"],
    answer: "Brookhaven RP"
  },
      {
    question: "Em minecraft, qual item que o Enderman dropa quando morre?",
    options: ["Enderpearl", "Bloco de Grama", "Cabeça de Enderman", "Ele Não Dropa"],
    answer: "Enderpearl"
  },
      {
    question: "Qual o jogo do gênero 'esporte' mais jogado atualmente?",
    options: ["Fifa", "eFootball™", "NBA 2K", "Rocket League"],
    answer: "Fifa"
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

const musicaFundoCE = document.getElementById('musicaFundoCE');
const botaoSomCE = document.getElementById('botaoSomCE');

if (musicaFundoCE && botaoSomCE) {
  botaoSomCE.addEventListener('click', () => {
    if (musicaFundoCE.paused) {
      musicaFundoCE.play();
    } else {
      musicaFundoCE.pause();
    }
  });
}

// ---------------------- FÁCIL ----------------------
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
    question: "Qual desses jogos é do gênero 'RPG'?",
    options: ["Dispatch", "Hollow Knight", "Battlefield", "Deltarune"],
    answer: "Deltarune"
  },
  {
    question: "Qual empresa criou 'Sonic'?",
    options: ["Ubisoft", "Nintendo", "Sega", "EA"],
    answer: "Sega"
  },
  {
    question: "O que significa 'GOTY'?",
    options: ["Graphic Overhaul Technology Yield", "Game Option Type Yearly", "Goal of the Year", "Game of the Year"],
    answer: "Game of the Year"
  },

// ---------------------- MÉDIO ----------------------
  {
    question: "Qual o jogo que contém mais parcerias atualmente?",
    options: ["Brawl Stars", "Minecraft", "Fortnite", "Genshin Impact"],
    answer: "Fortnite"
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
    question: "Qual desses jogos ganhou uma série animada?",
    options: ["Red Dead Redemption", "Cuphead", "Minecraft", "Brawl stars"],
    answer: "Cuphead"
  },
  {
    question: "Desses jogos, qual deles é brasileiro?",
    options: ["Friday Night Funkin", "Balatro", "171", "Despelote"],
    answer: "171"
  },
  {
    question: "Qual o jogo mais lucrativo até o momento?",
    options: ["Minecraft", "Fifa", "GTA V", "Tetris"],
    answer: "GTA V"
  },
  {
    question: "Qual o jogo de celular mais jogado no mundo?",
    options: ["Roblox", "Free Fire", " Candy Crush Saga", "Subway Surfers"],
    answer: "Roblox"
  },

// ---------------------- DIFÍCIL ----------------------
  {
    question: "Quais desses jogos é considerado indie (Produção independente)?",
    options: ["GTA V", "Death Stranding", "Ena Dream BBQ", "Little Nightmares"],
    answer: "Ena Dream BBQ"
  },
  {
    question: "Qual desses jogos NÃO é do gênero 'terror'?",
    options: ["Silent Hill", "God of War", "Poppy Playtime", "Buckshot Roulette"],
    answer: "God of War"
  },
  {
    question: "Qual jogo ganhou o prêmio GOTY(Melhor jogo) de 2024?",
    options: ["Astro Bot", "Balatro", "Final Fantasy VII: Rebirth", "Black Myth: Wukong"],
    answer: "Astro Bot"
  },
  {
    question: "Qual o jogo mais antigo já registrado?",
    options: ["Tetris", "OXO", "Tennis for Two", "Spacewar!"],
    answer: "OXO"
  },
  {
    question: "Qual o primeiro deus que Kratos matou na saga de God of War",
    options: ["Hades", "Ares", "Poseidon", "Perséfone"],
    answer: "Ares"
  },
 {
  question: "Em Dark Souls, qual boss é conhecido por ser opcional e estar escondido atrás de uma parede ilusória?",
  options: ["Gwyn, Lord of Cinder", "Kalameet, o Dragão Negro", "Gwyndolin, o Sol Negro", "Gravelord Nito"],
  answer: "Gwyndolin, o Sol Negro"
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

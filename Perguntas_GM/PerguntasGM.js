// ---------------------- DADOS DO QUIZ (JOGOS) ----------------------
const quizData = [
  {
    level: "facil",
    question: "Qual o jogo mais famoso da franquia de Resident Evil?",
    options: ["Resident Evil 4 (2005)", "Resident Evil 3: Nemesis (1999)", "Resident Evil 2 (Remake)", "Resident Evil 6 (2012)"],
    answer: "Resident Evil 4 (2005)"
  },
  {
    level: "facil",
    question: "Onde Kratos (God of War) nasceu?",
    options: ["Sparta", "Atenas", "Rodes", "Tessalônica"],
    answer: "Sparta"
  },
  {
    level: "facil",
    question: "O que você obtêm quando derrota o Dragão End no Minecraft? ",
    options: ["Cabeça do Dragão", "Ovo do Dragão", "Asas do Dragão", "Pack de Bedrock"],
    answer: "Ovo do Dragão"
  },
  {
    level: "facil",
    question: "Qual desses jogos é do gênero 'RPG'?",
    options: ["Dispatch", "Hollow Knight", "Battlefield", "Deltarune"],
    answer: "Deltarune"
  },
  {
    level: "facil",
    question: "Qual empresa criou 'Sonic'?",
    options: ["Ubisoft", "Nintendo", "Sega", "EA"],
    answer: "Sega"
  },
  {
    level: "facil",
    question: "O que significa 'GOTY'?",
    options: ["Graphic Overhaul Technology Yield", "Game Option Type Yearly", "Goal of the Year", "Game of the Year"],
    answer: "Game of the Year"
  },

// ---------------------- MÉDIO ----------------------
  {
    level: "medio",
    question: "Qual o jogo que contém mais parcerias atualmente?",
    options: ["Brawl Stars", "Minecraft", "Fortnite", "Genshin Impact"],
    answer: "Fortnite"
  },
  {
    level: "medio",
    question: "Qual o jogo mais popular da empresa 'Supercell'?",
    options: ["Clash of Clans", "Clash Royale", "Brawl Stars", "Hay Day"],
    answer: "Clash Royale"
  },
  {
    level: "medio",
    question: "Qual o jogo mais jogado do roblox?",
    options: ["Grow a Garden", "Blox Fruits", "Brookhaven RP", "Doors"],
    answer: "Brookhaven RP"
  },
  {
    level: "medio",
    question: "Em minecraft, qual item que o Enderman dropa quando morre?",
    options: ["Enderpearl", "Bloco de Grama", "Cabeça de Enderman", "Ele Não Dropa"],
    answer: "Enderpearl"
  },
  {
    level: "medio",
    question: "Qual desses jogos ganhou uma série animada?",
    options: ["Red Dead Redemption", "Cuphead", "Minecraft", "Brawl stars"],
    answer: "Cuphead"
  },
  {
    level: "medio",
    question: "Desses jogos, qual deles é brasileiro?",
    options: ["Friday Night Funkin", "Balatro", "171", "Despelote"],
    answer: "171"
  },
  {
    level: "medio",
    question: "Qual o jogo mais lucrativo até o momento?",
    options: ["Minecraft", "Fifa", "GTA V", "Tetris"],
    answer: "GTA V"
  },
  {
    level: "medio",
    question: "Qual o jogo de celular mais jogado no mundo?",
    options: ["Roblox", "Free Fire", " Candy Crush Saga", "Subway Surfers"],
    answer: "Roblox"
  },

// ---------------------- DIFÍCIL ----------------------
  {
    level: "dificil",
    question: "Quais desses jogos é considerado indie (Produção independente)?",
    options: ["GTA V", "Death Stranding", "Ena Dream BBQ", "Little Nightmares"],
    answer: "Ena Dream BBQ"
  },
  {
    level: "dificil",
    question: "Qual desses jogos NÃO é do gênero 'terror'?",
    options: ["Silent Hill", "God of War", "Poppy Playtime", "Buckshot Roulette"],
    answer: "God of War"
  },
  {
    level: "dificil",
    question: "Qual jogo ganhou o prêmio GOTY(Melhor jogo) de 2024?",
    options: ["Astro Bot", "Balatro", "Final Fantasy VII: Rebirth", "Black Myth: Wukong"],
    answer: "Astro Bot"
  },
  {
    level: "dificil",
    question: "Qual o jogo mais antigo já registrado?",
    options: ["Tetris", "OXO", "Tennis for Two", "Spacewar!"],
    answer: "OXO"
  },
  {
    level: "dificil",
    question: "Qual o primeiro deus que Kratos matou na saga de God of War",
    options: ["Hades", "Ares", "Poseidon", "Perséfone"],
    answer: "Ares"
  },
 {
  level: "dificil",
  question: "Em Dark Souls, qual boss é conhecido por ser opcional e estar escondido atrás de uma parede ilusória?",
  options: ["Gwyn, Lord of Cinder", "Kalameet, o Dragão Negro", "Gwyndolin, o Sol Negro", "Gravelord Nito"],
  answer: "Gwyndolin, o Sol Negro"
}
];

// ---------------------- VARIÁVEIS E INICIALIZAÇÃO ----------------------

// Função shuffle (randomizar)
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 1) Separar perguntas por dificuldade e randomizar dentro de cada categoria
const easy = shuffle(quizData.filter(q => q.level === "facil"));
const medium = shuffle(quizData.filter(q => q.level === "medio"));
const hard = shuffle(quizData.filter(q => q.level === "dificil"));

// 2) Manter ordem: fáceis → médias → difíceis
const orderedQuestions = [...easy, ...medium, ...hard];

// Variáveis do jogo
let currentQuestion = 0;
let score = 0;
let lives = 3; // 💖 O Jogo começa com 3 vidas

// HTML Elements
const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const progressBarFill = document.getElementById("progress-fill"); 
const livesDisplay = document.getElementById("lives-counter");

// ---------------------- FUNÇÕES DE VIVAS E RESULTADOS ----------------------

// 🟢 FUNÇÃO AUXILIAR: Atualiza a exibição de vidas na tela
function updateLivesDisplay() {
    if (livesDisplay) {
        livesDisplay.textContent = lives;
    }
}

// 🟢 FUNÇÃO showEndGame: Centralizada para finalização (Vitória ou Derrota)
function showEndGame(title, message, totalQuestions) {
  // Oculta elementos do quiz
  const questionHeader = document.querySelector(".question-header");
  if (questionHeader) {
      questionHeader.classList.add("hidden");
  }
  optionsContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  
  // Oculta/Completa a barra de progresso
  if (progressBarFill) progressBarFill.style.width = "100%"; 

  // Exibe a tela de resultado
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
    <h2>${title}</h2>
      <p>${message}</p>
      <p>Sua pontuação final foi: ${score} acerto(s) de ${totalQuestions} perguntas.</p>
    <a href="../Home/index.html" class="botao-voltar">Voltar ao Menu</a>
  `;
}

// 🟢 FUNÇÃO showResult: Fim de jogo por conclusão
function showResult() {
  showEndGame(
    "Quiz Finalizado!",
    `Parabéns! Você acertou ${score} de ${orderedQuestions.length} perguntas!`,
    orderedQuestions.length
  );
}

// ---------------------- FUNÇÕES PRINCIPAIS ----------------------

function loadQuestion() {
  const q = orderedQuestions[currentQuestion];
  questionText.textContent = q.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  // Atualizar barra de progresso (a cada questão carregada)
  let progress = ((currentQuestion) / orderedQuestions.length) * 100; 
  if (progressBarFill) progressBarFill.style.width = progress + "%";
  
  // Garante que o contador de vidas esteja visível
  updateLivesDisplay(); 

  optionsContainer.innerHTML = "";
  nextBtn.style.pointerEvents = "none"; // Desativa o botão Próxima no início da questão

  q.options.forEach(opt => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");

    // Se for imagem
    if (opt.endsWith(".png") || opt.endsWith(".jpg")) {
      const img = document.createElement("img");
      img.src = opt;
      img.alt = "Opção";
      optionBtn.appendChild(img);
    } else {
      optionBtn.textContent = opt;
    }

    optionBtn.addEventListener("click", () => selectOption(optionBtn, q.answer));
    optionsContainer.appendChild(optionBtn);
  });
}

// 🟢 FUNÇÃO selectOption: Adicionando a lógica de vidas (Lives) - CORRIGIDA
function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");

  // Desativa todos os botões de opção após a primeira seleção
  options.forEach(opt => opt.style.pointerEvents = "none");

  // 🔑 LÓGICA DE VERIFICAÇÃO AJUSTADA: 
  const selectedImg = selected.querySelector("img");
  
  // Se for uma opção de imagem, verifica se a URL da imagem selecionada TERMINA com a URL correta.
  const isCorrect = selectedImg
    ? selectedImg.src.endsWith(correctAnswer) 
    : selected.textContent === correctAnswer;

  if (isCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    // Adiciona a classe 'wrong' para colorir de vermelho
    selected.classList.add("wrong"); 
    
    // 💔 Diminui uma vida em caso de erro
    lives--;
    updateLivesDisplay();

    // Mostra a resposta correta (roxo)
    options.forEach((opt) => {
      // Verifica se a opção atual é a resposta correta
        const optImg = opt.querySelector("img");
        // Usa a mesma lógica de verificação 'isCorrect' para encontrar a resposta certa
        const isAnswer = (optImg && optImg.src.endsWith(correctAnswer)) || opt.textContent === correctAnswer;
        if (isAnswer) {
            opt.classList.add("correct");
        }
    });

    // 🛑 VERIFICAÇÃO DE FIM DE JOGO POR ERROS
    if (lives <= 0) {
      // Garante que a barra de progresso reflita a última questão antes de mostrar o fim de jogo
      const totalQuestions = orderedQuestions.length;
      let progress = ((currentQuestion + 1) / totalQuestions) * 100;
      if (progressBarFill) progressBarFill.style.width = progress + "%";
      
      showEndGame("VOCÊ PERDEU!", "Você errou demais e perdeu todas as suas vidas.", orderedQuestions.length);
      return; 
    }
  }
  // Ativa o botão Próxima
  nextBtn.style.pointerEvents = "auto";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < orderedQuestions.length) {
    loadQuestion();
    // Atualiza a barra de progresso APÓS avançar para a próxima questão
    const totalQuestions = orderedQuestions.length;
    let progress = ((currentQuestion) / totalQuestions) * 100;
    if (progressBarFill) progressBarFill.style.width = progress + "%";
  } else {
    showResult();
  }
});

// Iniciar
loadQuestion();
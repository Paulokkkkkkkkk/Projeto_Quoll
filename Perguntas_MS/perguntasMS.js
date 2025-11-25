const quizData = [

  // ----------------------- FÁCEIS -----------------------
  {
    level: "facil",
    question: "Quais são os personagens principais do Minecraft? ",
    options: ["Finn e Jake", "Steve e Andy", "Stevan e Alex", "Steve e Alex"],
    answer: "Steve e Alex"
  },
  {
    level: "facil",
    question: "Qual é o mascote do Minecraft?",
    options: ["Creeper", "Porco", "Enderman", "Iron Golem"],
    answer: "Creeper"
  },
  {
    level: "facil",
    question: "Qual é o drop de uma vaca (padrão)?",
    options: ["Bife e Couro", "Bife e Leite", "Leite e Couro", "Diamante e Cobre"],
    answer: "Bife e Couro"
  },
  {
    level: "facil",
    question: "Qual dessas picaretas quebra mais rápido?",
    options: ["Madeira", "Ouro", "Cobre", "Esmeralda"],
    answer: "Ouro"
  },
  {
    level: "facil",
    question: "Quantos blocos de altura tem o enderman?",
    options: ["3", "5", "2", "4"],
    answer: "4"
  },
  // ----------------------- MÉDIOS -----------------------
  {
    level: "medio",
    question: "Em qual ano o 'Minecraft' foi criado?",
    options: ["2011", "2009", "2010", "2008"],
    answer: "2009"
  },
  {
    level: "medio",
    question: "O que acontece se renomear uma ovelha para 'jeb_'? ",
    options: ["Ela fica de cabeça pra baixo", "Ela fica mudando a cor", "Ela começa à nos atacar", "Absolutamente nada"],
    answer: "Ela fica mudando a cor"
  },
  {
    level: "medio",
    question: "Quantos espaços tem em uma shulker box?",
    options: ["27", "32", "22", "28"],
    answer: "27"
  },
  {
    level: "medio",
    question: "Qual o maior medo do Creeper?? ",
    options: ["Felinos", "Lobos", "Sol", "Água"],
    answer: "Felinos"
  },
  {
    level: "medio",
    question: "Em qual versão a abelha foi adicionada no Minecraft Java?",
    options: ["1.14", "1.15", "1.13", "1.16"],
    answer: "1.15"
  },
  {
    level: "medio",
    question: "Como se chama o local em que fica o portal do 'End'?",
    options: ["Stronghold", "Stronghoud", "End Portal", "Holdstrong"],
    answer: "Stronghold"
  },
  {
    level: "medio",
    question: "Quantos pixels tem um bloco normal?",
    options: ["15x15", "32x32", "10x10", "16x16"],
    answer: "16x16"
  },
  {
    level: "medio",
    question: "Qual desses mobs que dá pouco dano?",
    options: ["Traça", "Shulker", "Slime", "Vex"],
    answer: "Traça"
  },
  {
    level: "medio",
    question: "Qual é a melhor comida no Minecraft?",
    options: ["Sopa suspeita", "Maçã Dourada Encantada", "Cenoura Dourada", "Pão"],
    answer: "Cenoura Dourada"
  },

  // ----------------------- DIFÍCEIS -----------------------
  {
    level: "dificil",
    question: "O creeper foi um erro, mas ele era para ser o qual mob?",
    options: ["Porco", "Galinha", "Zumbi", "Slime"],
    answer: "Porco"
  },
  {
    level: "dificil",
    question: "Quantos corações tem o mob Warden?? ",
    options: ["100", "150", "200", "250"],
    answer: "250"
  },
  {
    level: "dificil",
    question: "Quanto de vida tem o player?",
    options: ["10", "20", "12", "8"],
    answer: "20"
  },
  {
    level: "dificil",
    question: "Qual o boss mais forte do minecraft?",
    options: ["Wither", "Ender Dragon", "Warden", "Ravager"],
    answer: "Wither"
  },
  {
    level: "dificil",
    question: "Como se chama o local distante onde o terreno começava a gerar enormes estruturas deformadas e bugadas?",
    options: ["The End Void", "Far Lands", "World Edge", "Bedrock"],
    answer: "Far Lands"
  },
  {
    level: "dificil",
    question: "Qual é o mod mais popular do Minecraft?",
    options: ["RLCraft", "Mutant Mobs", "OptiFine", "Just Enough Items"],
    answer: "Just Enough Items"
  },
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
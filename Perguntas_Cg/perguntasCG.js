const quizData = [
  // ------------------------------------
  // ---------- FÁCEIS (7 Perguntas) ----------
  // ------------------------------------
  {
    level: "facil",
    question: "Qual é a capital da França?",
    options: ["Paris", "Roma", "Londres", "Berlim"],
    answer: "Paris"
  },
  {
    level: "facil",
    question: "Quantos dias tem um ano bissexto?",
    options: ["365", "366", "367", "364"],
    answer: "366"
  },
  {
    level: "facil",
    question: "Qual é o oceano que banha o Brasil?",
    options: ["Pacífico", "Atlântico", "Índico", "Ártico"],
    answer: "Atlântico"
  },
  {
    level: "facil",
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: "Júpiter"
  },
  {
    level: "facil",
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: "H2O"
  },
  {
    level: "facil",
    question: "Qual é o elemento químico representado por 'O'?",
    options: ["Ouro", "Oxigênio", "Ósmio", "Óxido"],
    answer: "Oxigênio"
  },
  {
    level: "facil",
    question: "O que é fotossíntese?",
    options: [
      "Respiração das plantas",
      "Processo em que plantas produzem alimento",
      "Formação de nuvens",
      "Digestão de herbívoros"
    ],
    answer: "Processo em que plantas produzem alimento"
  },

  // ------------------------------------
  // ---------- MÉDIAS (7 Perguntas) ----------
  // ------------------------------------
  {
    level: "medio",
    question: "Quem pintou a Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"],
    answer: "Leonardo da Vinci"
  },
  {
    level: "medio",
    question: "Qual é o maior país do mundo em território?",
    options: ["China", "Rússia", "Canadá", "Estados Unidos"],
    answer: "Rússia"
  },
  {
    level: "medio",
    question: "Qual é o metal líquido à temperatura ambiente?",
    options: ["Mercúrio", "Ferro", "Ouro", "Alumínio"],
    answer: "Mercúrio"
  },
  {
    level: "medio",
    question: "Quem foi o primeiro presidente do Brasil?",
    options: ["Getúlio Vargas", "Dom Pedro II", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"],
    answer: "Marechal Deodoro da Fonseca"
  },
  {
    level: "medio",
    question: "Qual país possui a maior população atualmente?",
    options: ["China", "Índia", "Estados Unidos", "Indonésia"],
    answer: "Índia"
  },
  {
    level: "medio",
    question: "Em que ano começou a Primeira Guerra Mundial?",
    options: ["1914", "1939", "1922", "1898"],
    answer: "1914"
  },
  {
    level: "medio",
    question: "Qual é a moeda oficial do Japão?",
    options: ["Yen", "Won", "Dólar", "Euro"],
    answer: "Yen"
  },

  // ------------------------------------
  // ---------- DIFÍCEIS (6 Perguntas) ----------
  // ------------------------------------
  {
    level: "dificil",
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Guepardo", "Falcão-peregrino", "Leopardo", "Tubarão"],
    answer: "Falcão-peregrino"
  },
  {
    level: "dificil",
    question: "Qual é o menor osso do corpo humano?",
    options: ["Fêmur", "Estribo", "Falange", "Tíbia"],
    answer: "Estribo"
  },
  {
    level: "dificil",
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    level: "dificil",
    question: "Qual é o maior deserto do mundo?",
    options: ["Saara", "Gobi", "Antártida", "Atacama"],
    answer: "Antártida"
  },
  {
    level: "dificil",
    question: "Quem escreveu 'Dom Quixote'?",
    options: ["Machado de Assis", "José Saramago", "Miguel de Cervantes", "Camões"],
    answer: "Miguel de Cervantes"
  },
  {
    level: "dificil",
    question: "Qual desses países é localizado na América do Sul?",
    options: ["México", "Peru", "Espanha", "Costa Rica"],
    answer: "Peru"
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
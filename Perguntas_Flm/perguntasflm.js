// Quiz com dificuldade, randomização por nível, barra de progresso e visual melhorado

const quizData = [
  // ---------- FÁCEIS ----------
  {
    level: "facil",
    question: "Com quantos anos se entra em Hogwarts (Harry Potter)?",
    options: ["15 anos", "11 anos", "17 anos", "10 anos"],
    answer: "11 anos"
  },
  {
    level: "facil",
    question: "Que tipo de médico é o Doutor Estranho?",
    options: ["Neurocirurgião", "Pediatra", "Urologista", "Psiquiatra"],
    answer: "Neurocirurgião"
  },
  {
    level: "facil",
    question: "Dentre as opções a seguir, qual delas NÃO é um filme?",
    options: ["Game of Thrones", "A Viagem de Chihiro", "Turbo Kid", "O Justiceiro"],
    answer: "Game of Thrones"
  },
  {
    level: "facil",
    question: "Qual desses filmes é brasileiro?",
    options: ["Esqueceram de Mim", "Todo Poderoso", "Pixels", "Bingo: O Rei das Manhãs"],
    answer: "Bingo: O Rei das Manhãs"
  },
  {
    level: "facil",
    question: "Qual o filme mais lucrativo de todos os tempos?",
    options: ["Titanic (1997)", "Avatar (2009)", "Vingadores: Ultimato (2019)", "Star Wars: O Despertar da Força (2015)"],
    answer: "Avatar (2009)"
  },

  // ---------- MÉDIAS ----------
  {
    level: "medio",
    question: "Qual dessas logos é a certa (Homem-Aranha)?",
    options: ["imgs/Batman.png", "imgs/superchoque.png", "imgs/spiderman.png", "imgs/flash.png"],
    answer: "imgs/spiderman.png"
  },
  {
    level: "medio",
    question: "Essa frase é de qual desses filmes: 'Bom dia, e caso eu não te veja, boa tarde, boa noite e boa noite!'?",
    options: ["Deadpool 2", "Super Mario Bros", "O Show de Truman", "Tá Rindo do Quê?"],
    answer: "O Show de Truman"
  },
  {
    level: "medio",
    question: "De qual filme é essa frase: 'Eles podem levar nossas vidas, mas nunca levarão nossa liberdade!'",
    options: ["Pearl Harbor", "Mad Max", "Coração Valente", "Até o Último Homem"],
    answer: "Coração Valente"
  },
  {
    level: "medio",
    question: "Qual desses filme NÃO é do gênero ação?",
    options: ["Thunderbolts*", "Ex_Machina: Instinto Artificial", "Upgrade: Atualização", "Trovão Tropical"],
    answer: "Ex_Machina: Instinto Artificial"
  },
  {
    level: "medio",
    question: "Qual o filme mais famoso da disney?",
    options: ["Frozen II", "O Rei Leão (2019)", "Frozen", "Toy Story 3"],
    answer: "O Rei Leão (2019)"
  },

  // ---------- DIFÍCEIS ----------
  {
    level: "dificil",
    question: "Quantas sequências a saga 'X-MEN' possui?",
    options: ["7", "5", "10", "13"],
    answer: "13"
  },
  {
    level: "dificil",
    question: "Qual foi o primeiro filme da Disney?",
    options: ["Branca de Neve e os Sete Anões", "Pinóquio", "Cinderela", "Aladdin"],
    answer: "Branca de Neve e os Sete Anões"
  },
  {
    level: "dificil",
    question: "Qual o filme com o maior número de premiações até no momento?",
    options: ["Ben-Hur (1959)", "Senhor dos Anéis: O Retorno do Rei (2003)", "Interestelar (2014)", "Vingadores: Ultimato (2019)"],
    answer: "Ben-Hur (1959)"
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
const progressBar = document.getElementById("progress-bar");
const livesDisplay = document.getElementById("lives-counter"); // ✅ Elemento para exibir as vidas

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
  if (progressBar) progressBar.style.width = "100%"; 

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

  // Atualizar barra de progresso
  let progress = ((currentQuestion) / orderedQuestions.length) * 100;
  if (progressBar) progressBar.style.width = progress + "%";
  
  // 💖 Garante que o contador de vidas esteja visível
  updateLivesDisplay(); 

  optionsContainer.innerHTML = "";

  q.options.forEach(opt => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");

    // Se for imagem
    if (opt.endsWith(".png") || opt.endsWith(".jpg")) {
      const img = document.createElement("img");
      img.src = opt;
      img.alt = "Opção";
      img.classList.add("img-option");
      optionBtn.appendChild(img);
    } else {
      optionBtn.textContent = opt;
    }

    optionBtn.addEventListener("click", () => selectOption(optionBtn, q.answer));
    optionsContainer.appendChild(optionBtn);
  });
}

// 🟢 FUNÇÃO selectOption: Adicionando a lógica de vidas (Lives)
function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");

  options.forEach(opt => opt.style.pointerEvents = "none");

  const selectedImg = selected.querySelector("img");
  const isCorrect = selectedImg
    ? selectedImg.src.includes(correctAnswer)
    : selected.textContent === correctAnswer;

  if (isCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
    
    // 💔 Diminui uma vida em caso de erro
    lives--;
    updateLivesDisplay();

    // Mostra a resposta correta
    options.forEach((opt) => {
        const optImg = opt.querySelector("img");
        const isAnswer = (optImg && optImg.src.includes(correctAnswer)) || opt.textContent === correctAnswer;
        if (isAnswer) {
            opt.classList.add("correct");
        }
    });

    // 🛑 VERIFICAÇÃO DE FIM DE JOGO POR ERROS
    if (lives <= 0) {
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
  } else {
    showResult();
  }
});

// Iniciar
loadQuestion();
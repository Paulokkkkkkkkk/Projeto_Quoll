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

/// ==========================
// QUIZ CONFIGURAÇÃO
// ==========================
let currentQuestion = 0;
let score = 0;
let lives = 3;
let wrongAnswers = 0;

// Número total de perguntas
const totalQuestions = quizData.length;

// ==========================
// ELEMENTOS DO DOM
// ==========================
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const livesCounter = document.getElementById("lives-counter");
const progressFill = document.getElementById("progress-fill");

const popup = document.getElementById("game-popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupScore = document.getElementById("popup-score");



// ==========================
// CARREGAR PRIMEIRA PERGUNTA
// ==========================
showQuestion();



// ==========================
// MOSTRAR PERGUNTA
// ==========================
function showQuestion() {
    const q = quizData[currentQuestion];

    questionNumber.textContent = (currentQuestion + 1) + ".";
    questionText.textContent = q.question;

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => selectOption(button, q.answer);
        optionsContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
}



// ==========================
// SELECIONAR OPÇÃO
// ==========================
function selectOption(button, correctAnswer) {
    const options = document.querySelectorAll(".option");

    // bloqueia cliques múltiplos
    options.forEach(btn => btn.disabled = true);

    if (button.textContent === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        wrongAnswers++;
        lives--;
        livesCounter.textContent = lives;

        // SE FICAR SEM VIDAS → GAME OVER
        if (lives <= 0) {
            showGameOver();
            return;
        }
    }

    // mostra botão próxima
    nextButton.classList.remove("hidden");

    // destaca resposta correta
    options.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    updateProgress();
}



// ==========================
// BOTÃO PRÓXIMA PERGUNTA
// ==========================
nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion >= totalQuestions) {
        showEndGame();
        return;
    }

    showQuestion();
});



// ==========================
// FINAL DO QUIZ – VITÓRIA
// ==========================
function showEndGame() {
    popupTitle.textContent = "🎉 Você Concluiu!";
    popupMessage.textContent = "Parabéns! Você respondeu todas as perguntas!";
    popupScore.textContent = `Acertos: ${score}/${totalQuestions}`;
    popup.classList.remove("hidden");
}



// ==========================
// GAME OVER – VIDAS ACABARAM
// ==========================
function showGameOver() {
    popupTitle.textContent = "💀 GAME OVER";
    popupMessage.textContent = "Você perdeu todas as vidas!";
    popupScore.textContent = `Acertos: ${score}/${totalQuestions}`;
    popup.classList.remove("hidden");

    nextButton.disabled = true;
}



// ==========================
// BARRA DE PROGRESSO
// ==========================
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressFill.style.width = progress + "%";
}

const quizData = [
  // ------------------------------------
  // ---------- FÁCEIS (5 Perguntas) ----------
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
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: "Júpiter"
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
  // ---------- MÉDIAS (10 Perguntas) ----------
  // ------------------------------------
  {
    level: "medio",
    question: "Qual é o oceano que banha o Brasil?",
    options: ["Pacífico", "Atlântico", "Índico", "Ártico"],
    answer: "Atlântico"
  },
  {
    level: "medio",
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: "H2O"
  },
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
  {
    level: "medio",
    question: "Qual é o maior deserto do mundo?",
    options: ["Saara", "Gobi", "Antártida", "Atacama"],
    answer: "Antártida"
  },

  // ------------------------------------
  // ---------- DIFÍCEIS (5 Perguntas) ----------
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

 // finalizado

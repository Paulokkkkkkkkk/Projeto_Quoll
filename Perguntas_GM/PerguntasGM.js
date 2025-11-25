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

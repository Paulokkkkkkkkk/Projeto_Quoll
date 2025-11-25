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


/// ==========================
// QUIZ CONFIGURAÇÃO
// ==========================
let currentQuestion = 0;
let score = 0;
let lives = 3;
let wrongAnswers = 0;

// Corrigido: Usar o tamanho do array ordenado para o total de perguntas
const totalQuestions = orderedQuestions.length;

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
// MOSTRAR PERGUNTA (CORRIGIDO)
// ==========================
function showQuestion() {
    // CORRIGIDO: Agora usa o array 'orderedQuestions' para exibir as perguntas
    const q = orderedQuestions[currentQuestion];

    questionNumber.textContent = (currentQuestion + 1) + ".";
    questionText.textContent = q.question;

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");

        // APRIMORAMENTO: Verifica se a opção é um caminho de imagem
        if (option.includes("imgs/")) {
            const img = document.createElement("img");
            img.src = option;
            img.alt = "Opção de Imagem";
            button.appendChild(img);
        } else {
            button.textContent = option;
        }

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

    // CORREÇÃO PARA CHECAR RESPOSTA CORRETA EM OPÇÕES DE IMAGEM
    let selectedAnswer;
    if (button.querySelector("img")) {
        // Se a opção tem uma imagem, a resposta selecionada é o 'src' da imagem
        selectedAnswer = button.querySelector("img").src.substring(button.querySelector("img").src.lastIndexOf("/") + 1);
        
        // Ajusta correctAnswer para o formato esperado ('spiderman.png')
        let adjustedCorrectAnswer = correctAnswer.substring(correctAnswer.lastIndexOf("/") + 1);

        // Se a resposta for de imagem, verifica se o src da imagem no botão corresponde
        if (selectedAnswer === adjustedCorrectAnswer) {
            button.classList.add("correct");
            score++;
        } else {
            button.classList.add("wrong");
            wrongAnswers++;
            lives--;
            livesCounter.textContent = lives;

            // ... restante da lógica de GAME OVER
            if (lives <= 0) {
                showGameOver();
                return;
            }
        }
    } else {
        // Opções de texto normal
        selectedAnswer = button.textContent;

        if (selectedAnswer === correctAnswer) {
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
    }


    // mostra botão próxima
    nextButton.classList.remove("hidden");

    // destaca resposta correta (funciona tanto para texto quanto para imagem)
    options.forEach(btn => {
        // Se a opção tem uma imagem, o 'src' deve corresponder ao correctAnswer (ex: imgs/spiderman.png)
        if (btn.querySelector("img") && btn.querySelector("img").src.endsWith(correctAnswer.substring(correctAnswer.lastIndexOf("/") + 1)) ) {
            btn.classList.add("correct");
        } 
        // Se for opção de texto, o textContent deve corresponder ao correctAnswer
        else if (btn.textContent === correctAnswer) {
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
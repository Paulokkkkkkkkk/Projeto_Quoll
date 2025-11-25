const quizData = [

  // ----------------------- FÁCEIS -----------------------
  {
    question: "Quais são os personagens principais do Minecraft? ",
    options: ["Finn e Jake", "Steve e Andy", "Stevan e Alex", "Steve e Alex"],
    answer: "Steve e Alex"
  },
  {
    question: "Qual é o mascote do Minecraft?",
    options: ["Creeper", "Porco", "Enderman", "Iron Golem"],
    answer: "Creeper"
  },
  {
    question: "Qual é o drop de uma vaca?",
    options: ["Bife e Couro", "Bife e Leite", "Leite e Couro", "Diamante e Cobre"],
    answer: "Bife e Couro"
  },
  {
    question: "Qual dessas picaretas quebra mais rápido?",
    options: ["Madeira", "Ouro", "Cobre", "Esmeralda"],
    answer: "Ouro"
  },
  {
    question: "Quantos blocos de altura tem o enderman?",
    options: ["3", "5", "2", "4"],
    answer: "4"
  },
  // ----------------------- MÉDIOS -----------------------
  {
    question: "Em qual ano o 'Minecraft' foi criado?",
    options: ["2011", "2009", "2010", "2008"],
    answer: "2009"
  },
  {
    question: "O que acontece se renomear uma ovelha para 'jeb_'? ",
    options: ["Ela fica de cabeça pra baixo", "Ela fica mudando a cor", "Ela começa à nos atacar", "Absolutamente nada"],
    answer: "Ela fica mudando a cor"
  },
  {
    question: "Quantos espaços tem em uma shulker box?",
    options: ["27", "32", "22", "28"],
    answer: "27"
  },
  {
    question: "Qual o maior medo do Creeper?? ",
    options: ["Felinos", "Lobos", "Sol", "Água"],
    answer: "Felinos"
  },
  {
    question: "Em qual versão a abelha foi adicionada no Minecraft Java?",
    options: ["1.14", "1.15", "1.13", "1.16"],
    answer: "1.15"
  },
  {
    question: "Como se chama o local em que fica o portal do 'End'?",
    options: ["Stronghold", "Stronghoud", "End Portal", "Holdstrong"],
    answer: "Stronghold"
  },
  {
    question: "Quantos pixels tem um bloco normal?",
    options: ["15x15", "32x32", "10x10", "16x16"],
    answer: "16x16"
  },
  {
    question: "Qual desses mobs que dá pouco dano?",
    options: ["Traça", "Shulker", "Slime", "Vex"],
    answer: "Traça"
  },
  {
    question: "Qual é a melhor comida no Minecraft?",
    options: ["Sopa suspeita", "Maçã Dourada Encantada", "Cenoura Dourada", "Pão"],
    answer: "Cenoura Dourada"
  },

  // ----------------------- DIFÍCEIS -----------------------
  {
    question: "O creeper foi um erro, mas ele era para ser o qual mob?",
    options: ["Porco", "Galinha", "Zumbi", "Slime"],
    answer: "Porco"
  },
  {
    question: "Quantos corações tem o mob Warden?? ",
    options: ["100", "150", "200", "250"],
    answer: "250"
  },
  {
    question: "Quanto de vida tem o player?",
    options: ["10", "20", "12", "8"],
    answer: "20"
  },
  {
    question: "Qual o boss mais forte do minecraft?",
    options: ["Wither", "Ender Dragon", "Warden", "Ravager"],
    answer: "Wither"
  },
  {
    question: "Como se chama o local distante onde o terreno começava a gerar enormes estruturas deformadas e bugadas?",
    options: ["The End Void", "Far Lands", "World Edge", "Bedrock"],
    answer: "Far Lands"
  },
  {
    question: "Qual é o mod mais popular do Minecraft?",
    options: ["RLCraft", "Mutant Mobs", "OptiFine", "Just Enough Items"],
    answer: "Just Enough Items"
  },
];

let currentQuestion = 0;
let score = 0;
let lives = 3;

// Elementos do DOM
const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const livesDisplay = document.getElementById("lives-counter"); 
const progressBarFill = document.getElementById("progress-fill"); // ✅ Elemento para a barra de progresso


// ----------------------- FUNÇÕES AUXILIARES -----------------------

// 🟢 FUNÇÃO AUXILIAR: Para atualizar a exibição das vidas
function updateLivesDisplay() {
    if (livesDisplay) {
        livesDisplay.textContent = lives;
    }
}

// 🟢 FUNÇÃO AUXILIAR: Para atualizar a barra de progresso
function updateProgressBar(questionsCompleted) {
    const totalQuestions = quizData.length;
    // Calcula a porcentagem de questões CONCLUÍDAS.
    let progress = (questionsCompleted / totalQuestions) * 100;
    if (progressBarFill) {
        progressBarFill.style.width = progress + "%";
    }
}

// 🟢 FUNÇÃO showEndGame: Centralizada para finalizar o jogo (vitória ou derrota)
function showEndGame(title, message) {
    const totalQuestions = quizData.length;
    const questionHeader = document.querySelector(".question-header");
    
    if (questionHeader) {
        questionHeader.classList.add("hidden");
    }
    optionsContainer.classList.add("hidden");
    nextBtn.classList.add("hidden");
    
    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
        <p>Sua pontuação final foi: ${score} acerto(s) de ${totalQuestions} perguntas.</p>
        <a href="../Home/index.html" class="botao-voltar">Voltar ao Menu</a>
    `;
    
    // Garante que a barra esteja em 100% no fim de jogo
    updateProgressBar(totalQuestions);
}

// 🟢 FUNÇÃO showResult: Adaptada para chamar showEndGame
function showResult() {
    showEndGame(
        "Quiz Finalizado!",
        `Parabéns! Você acertou ${score} de ${quizData.length} perguntas!`
    );
}

// ----------------------- FUNÇÕES PRINCIPAIS -----------------------

// 🟢 FUNÇÃO loadQuestion: Carrega o conteúdo da questão atual
function loadQuestion() {
    const questionData = quizData[currentQuestion];
    questionText.textContent = questionData.question;
    questionNumber.textContent = `${currentQuestion + 1}.`;

    updateLivesDisplay();
    
    // ❌ REMOVIDO: A barra não deve ser atualizada aqui, mas sim APÓS a resposta da questão anterior.
    // updateProgressBar(currentQuestion); 

    nextBtn.style.pointerEvents = "none"; // Desativa o botão Próxima

    optionsContainer.innerHTML = "";
    questionData.options.forEach((opt) => {
        const optionBtn = document.createElement("div");
        optionBtn.classList.add("option");

        // Verifica se é uma imagem
        if (opt.endsWith(".png") || opt.endsWith(".jpg") || opt.endsWith(".jpeg") || opt.endsWith(".gif")) {
            const img = document.createElement("img");
            img.src = opt;
            img.alt = "Opção de resposta";
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            optionBtn.appendChild(img);
        } else {
            // Se for texto normal
            optionBtn.textContent = opt;
        }

        optionBtn.addEventListener("click", () => selectOption(optionBtn, questionData.answer));
        optionsContainer.appendChild(optionBtn);
    });
}

// 🟢 FUNÇÃO selectOption: Verifica a resposta e gerencia as vidas
function selectOption(selected, correctAnswer) {
    const options = document.querySelectorAll(".option");

    options.forEach((opt) => {
        opt.style.pointerEvents = "none"; // Desativa opções após seleção
    });

    const selectedImg = selected.querySelector("img");
    const isSelectedCorrect =
        (selectedImg && selectedImg.src.includes(correctAnswer)) || selected.textContent === correctAnswer;

    if (isSelectedCorrect) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("wrong");
        
        lives--;
        updateLivesDisplay();

        // Mostra a resposta correta (roxo)
        options.forEach((opt) => {
            const optImg = opt.querySelector("img");
            const isCorrect = (optImg && optImg.src.includes(correctAnswer)) || opt.textContent === correctAnswer;
            if (isCorrect) {
                opt.classList.add("correct");
            }
        });

        // 🛑 VERIFICAÇÃO DE FIM DE JOGO POR ERROS
        if (lives <= 0) {
            // ✅ CORRIGIDO: Garante que a barra complete a questão atual antes de terminar
            updateProgressBar(currentQuestion + 1);
            showEndGame("VOCÊ PERDEU!", "Você errou demais e perdeu todas as suas vidas.");
            return; 
        }
    }
    // Ativa o botão "Próxima"
    nextBtn.style.pointerEvents = "auto";
}


// 🟢 EVENTO: Avançar para a próxima questão
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        // ✅ CORRIGIDO: Atualiza a barra de progresso antes de carregar a próxima questão
        updateProgressBar(currentQuestion); 
        loadQuestion();
    } else {
        showResult();
    }
});

// 🚀 INICIALIZAÇÃO
loadQuestion();
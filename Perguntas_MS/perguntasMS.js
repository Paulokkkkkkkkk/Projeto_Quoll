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
let lives = 3; // 🟢 Variável para rastrear as vidas

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

// ✅ CORREÇÃO AQUI: Alinhando o ID do JS com o ID "lives-counter" que está no seu HTML
const livesDisplay = document.getElementById("lives-counter"); 


// 🟢 FUNÇÃO AUXILIAR: Para atualizar a exibição das vidas
function updateLivesDisplay() {
    if (livesDisplay) {
        livesDisplay.textContent = lives;
    }
    // Para fins de debug no console
    console.log(`Vidas restantes: ${lives}`); 
}

// 🟢 FUNÇÃO loadQuestion: Inclui a chamada de updateLivesDisplay()
function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionText.textContent = questionData.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  // Chama a função para garantir que as vidas estejam corretas ao iniciar ou carregar
  updateLivesDisplay();

  optionsContainer.innerHTML = "";
  questionData.options.forEach((opt) => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");

    // Verifica se é uma imagem (termina com .png, .jpg, etc)
    if (opt.endsWith(".png") || opt.endsWith(".jpg") || opt.endsWith(".jpeg") || opt.endsWith(".gif")) {
      const img = document.createElement("img");
      img.src = opt;
      img.alt = "Opção de resposta";
      img.style.width = "120px";  // ajusta o tamanho como quiser
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

// 🟢 FUNÇÃO selectOption: Implementação do sistema de vidas
function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
  });

  const selectedImg = selected.querySelector("img");
  const isSelectedCorrect =
    (selectedImg && selectedImg.src.includes(correctAnswer)) || selected.textContent === correctAnswer;

  if (isSelectedCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
    
    // 💔 Diminui uma vida em caso de erro
    lives--;
    updateLivesDisplay();

    // Adiciona a classe 'correct' na resposta certa para mostrar ao jogador
    options.forEach((opt) => {
      const optImg = opt.querySelector("img");
      const isCorrect = (optImg && optImg.src.includes(correctAnswer)) || opt.textContent === correctAnswer;
      if (isCorrect) {
          opt.classList.add("correct");
      }
    });

    // 🛑 VERIFICAÇÃO DE FIM DE JOGO POR ERROS
    if (lives <= 0) {
      // Chama a função de fim de jogo com a mensagem de derrota
      showEndGame("VOCÊ PERDEU!", "Você errou demais e perdeu todas as suas vidas.");
      return; // Impede que o botão "Próxima" seja ativado
    }
  }
  // Deixa o botão "Próxima" pronto para o clique
  // Adicione esta linha: nextBtn.style.display = "block"; se você o escondeu inicialmente
  nextBtn.style.pointerEvents = "auto";
}


nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Chama a função showResult (que agora usa showEndGame)
    showResult();
  }
});

// 🟢 FUNÇÃO showResult: Adaptada para chamar showEndGame
function showResult() {
  showEndGame(
    "Quiz Finalizado!",
    `Parabéns! Você acertou ${score} de ${quizData.length} perguntas!`
  );
}

// 🟢 FUNÇÃO showEndGame: Centralizada para finalizar o jogo (vitória ou derrota)
function showEndGame(title, message) {
  // Garante que os elementos do quiz sejam ocultados corretamente
  const questionHeader = document.querySelector(".question-header");
  if (questionHeader) {
      questionHeader.classList.add("hidden");
  }
  optionsContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  
  // Mostra o resultado
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
    <h2>${title}</h2>
     <p>${message}</p>
     <p>Sua pontuação final foi: ${score} acerto(s).</p>
    <a href="../Home/index.html" class="botao-voltar">Voltar ao Menu</a>
  `;
}

loadQuestion();
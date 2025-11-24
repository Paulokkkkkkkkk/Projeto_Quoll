const quizData = [
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Terra", "Júpiter", "Saturno", "Marte"],
    answer: "Júpiter"
  },
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Roma", "Londres", "Berlim"],
    answer: "Paris"
  },
  {
    question: "Quantos dias tem um ano bissexto?",
    options: ["365", "366", "367", "364"],
    answer: "366"
  },
  {
    question: "Qual é o oceano que banha o Brasil?",
    options: ["Pacífico", "Atlântico", "Índico", "Ártico"],
    answer: "Atlântico"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "Qual é o maior país do mundo em território?",
    options: ["China", "Rússia", "Canadá", "Estados Unidos"],
    answer: "Rússia"
  },
  {
    question: "Qual é o metal líquido à temperatura ambiente?",
    options: ["Mercúrio", "Ferro", "Ouro", "Alumínio"],
    answer: "Mercúrio"
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Guepardo", "Falcão-peregrino", "Leopardo", "Tubarão"],
    answer: "Falcão-peregrino"
  },
  {
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: "H2O"
  },
  {
    question: "Quem foi o primeiro presidente do Brasil?",
    options: ["Getúlio Vargas", "Dom Pedro II", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"],
    answer: "Marechal Deodoro da Fonseca"
  },
  {
    question: "Qual é o menor osso do corpo humano?",
    options: ["Fêmur", "Estribo", "Falange", "Tíbia"],
    answer: "Estribo"
  },
  {
    question: "Qual país possui a maior população atualmente?",
    options: ["China", "Índia", "Estados Unidos", "Indonésia"],
    answer: "Índia"
  },
  {
    question: "Em que ano começou a Primeira Guerra Mundial?",
    options: ["1914", "1939", "1922", "1898"],
    answer: "1914"
  },
  {
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Qual é o maior deserto do mundo?",
    options: ["Saara", "Gobi", "Antártida", "Atacama"],
    answer: "Antártida"
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: ["Machado de Assis", "José Saramago", "Miguel de Cervantes", "Camões"],
    answer: "Miguel de Cervantes"
  },
  {
    question: "O que é fotossíntese?",
    options: [
      "Respiração das plantas",
      "Processo em que plantas produzem alimento",
      "Formação de nuvens",
      "Digestão de herbívoros"
    ],
    answer: "Processo em que plantas produzem alimento"
  },
  {
    question: "Qual é a moeda oficial do Japão?",
    options: ["Yen", "Won", "Dólar", "Euro"],
    answer: "Yen"
  },
  {
    question: "Qual é o elemento químico representado por 'O'?",
    options: ["Ouro", "Oxigênio", "Ósmio", "Óxido"],
    answer: "Oxigênio"
  },
  {
    question: "Qual desses países é localizado na América do Sul?",
    options: ["México", "Peru", "Espanha", "Costa Rica"],
    answer: "Peru"
  }
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


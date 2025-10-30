const quizData = [
  {
    question: "Com  quantos anos se entra em Hogwarts (Harry Potter)?",
    options: ["15 anos", "11 anos", "17 anos", "10 anos"],
    answer: "11 anos"
  },
  {
    question: "Qual dessas logos é a certa (Homem-Aranha)?",
    options: ["imgs/Batman.png", "imgs/superchoque.png", "imgs/spiderman.png", "imgs/flash.png"],
    answer: "imgs/spiderman.png"
  },
  {
    question: "Qual o filme com o maior número de premiações até no momento?",
    options: ["Ben-Hur (1959)", "Senhor dos Anéis: O Retorno do Rei (2003)", "Interestelar (2014)", "Vingadores: Ultimato (2019)"],
    answer: "Ben-Hur (1959)"
  },
  {
    question: "Qual o filme de terror com a pior avaliação?",
    options: ["Anaconda (1997)", "Ursinho Pooh - Sangue e Mel 2 (2024)", "A Centopeia Humana (2009)", "Olhos Famintos: Renascimento (2022)"],
    answer: "Olhos Famintos: Renascimento (2022)"
  },
   {
    question: "Qual foi o primeiro filme da Disney?",
    options: ["Branca de Neve e os Sete Anões", "Pinóquio", "Cinderela", "Aladdin"],
    answer: "Branca de Neve e os Sete Anões"
  },
   {
    question: "De qual filme é essa frase: 'Eles podem levar nossas vidas, mas nunca levarão nossa liberdade!'",
    options: ["Pearl Harbor", "Mad Max", "Coração Valente", "Até o Último Homem"],
    answer: "Coração Valente"
  },
    {
    question: "Quantos trófeus o filme Oppenheimer(2023) ganhou?",
    options: ["5", "10", "8", "4"],
    answer: "7"
  },
      {
    question: "Que tipo de médico é o Doutor Estranho?",
    options: ["Neurocirurgião", "Pediatra", "Urologista", "Psiquiatra"],
    answer: "Neurocirurgião"
  },
        {
    question: "Essa frase é de qual desses filmes: 'Bom dia, e caso eu não te veja, boa tarde, boa noite e boa noite!'?",
    options: ["Deadpool 2", "Super Mario Bros", "O Show de Truman", "Tá Rindo do Quê?"],
    answer: "O Show de Truman"
  },
          {
    question: "Qual o filme mais lucrativo de todos os tempos?",
    options: ["Titanic (1997)", "Avatar (2009)", "Vingadores: Ultimato (2019)", "Star Wars: O Despertar da Força (2015)"],
    answer: "Avatar (2009)"
  },
      {
    question: "Qual era o número da questão anterior?",
    options: ["9", "7", "10", "6"],
    answer: "10"
  },
  {
    question: "Quantas sequências a saga 'X-MEN' possui?",
    options: ["7", "5", "10", "13"],
    answer: "13"
  },
    {
    question: "Qual desses filme NÃO é do gênero ação?",
    options: ["Thunderbolts*", "Ex_Machina: Instinto Artificial", "Upgrade: Atualização", "Trovão Tropical"],
    answer: "Ex_Machina: Instinto Artificial"
  },
    {
    question: "Qual desses filmes CONTÉM o gênero romance?",
    options: ["Melancolia", "Gente Grande", "Jumanji", "A Forma da Água "],
    answer: "A Forma da Água "
  },
    {
    question: "Dentre as opções a seguir, qual delas NÃO é um filme?",
    options: ["Game of Thrones", "A Viagem de Chihiro", "Turbo Kid", "O Justiceiro"],
    answer: "Game of Thrones"
  },
      {
    question: "Qual desses filmes é brasileiro?",
    options: ["Esqueceram de Mim", "Todo Poderoso", "Pixels", "Bingo: O Rei das Manhãs"],
    answer: "Bingo: O Rei das Manhãs"
  },
      {
    question: "Qual o filme de videogame com a maior bilheteria?",
    options: ["Minecraft: O filme", "Pokémon: Detetive Pikachu", "Super Mario Bros", "Mortal Kombat: O Filme."],
    answer: "Super Mario Bros"
  },
      {
    question: "O filme mais esperado pros cinemas atualmente (Pergunta de 2025)",
    options: ["Wicked: Parte 2", "Five Nights At Freddy's 2", "Mortal Kombat II", "Vingadores: Doomsday"],
    answer: "Wicked: Parte 2"
  },
      {
    question: "Qual é o filme mais assistido da Netflix?",
    options: ["A Sociedade da Neve", "Alerta Vermelho", "Guerreiras do K-Pop", "Bagagem de Risco"],
    answer: "Guerreiras do K-Pop"
  },
     {
    question: "Qual o filme em animação mais visto no cinema brasileiro?",
    options: ["Divertida Mente 2", "Frozen: Uma Aventura Congelante", "Shrek 2", "Meu Malvado Favorito"],
    answer: "Divertida Mente 2"
  },
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionText.textContent = questionData.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  optionsContainer.innerHTML = "";
  questionData.options.forEach((opt) => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");
    optionBtn.textContent = opt;
    optionBtn.addEventListener("click", () => selectOption(optionBtn, questionData.answer));
    optionsContainer.appendChild(optionBtn);
  });
}

// Clique no número da questão conta como resposta (se o número for a resposta correta)
questionNumber.addEventListener("click", () => {
  const questionData = quizData[currentQuestion];
  const clickedNumber = (currentQuestion + 1).toString(); // ex: "7"
  console.log("Número clicado:", clickedNumber);

  // compara a resposta do objeto da pergunta com o número atual
  if (questionData.answer === clickedNumber) {
    console.log("Esta pergunta tem a resposta igual ao número. Tentando selecionar a opção...");

    const options = document.querySelectorAll(".option");
    let found = false;

    options.forEach(opt => {
      // normaliza o texto da opção (remove espaços e pontos extras)
      const txt = opt.textContent.trim().replace(/\./g, "");
      console.log("Opção encontrada:", `"${opt.textContent}" -> normalizado: "${txt}"`);

      if (txt === clickedNumber) {
        // simula o clique no botão correto (vai disparar o eventListener que você já adicionou em loadQuestion)
        opt.click();
        found = true;
      }
    });

    if (!found) {
      console.log("Nenhuma opção com texto igual ao número foi encontrada. (verifique o texto das opções)");
    }
  } else {
    console.log("Número não é a resposta certa desta pergunta.");
  }
});


function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";

    // Detecta se o conteúdo é imagem
    const img = opt.querySelector("img");
    const isCorrect =
      img && img.src.includes(correctAnswer) || opt.textContent === correctAnswer;

    if (isCorrect) {
      opt.classList.add("correct");
    }
  });

  const selectedImg = selected.querySelector("img");
  const isSelectedCorrect =
    selectedImg && selectedImg.src.includes(correctAnswer) || selected.textContent === correctAnswer;

  if (isSelectedCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
  }
}


nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".question-header").classList.add("hidden");
  optionsContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
    <h2>Você acertou ${score} de ${quizData.length} perguntas!</h2>
    <a href="../Home/index.html" class="botao-voltar">Voltar ao Menu</a>
  `;
}

loadQuestion();

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionText.textContent = questionData.question;
  questionNumber.textContent = `${currentQuestion + 1}.`;

  optionsContainer.innerHTML = "";
  questionData.options.forEach((opt) => {
    const optionBtn = document.createElement("div");
    optionBtn.classList.add("option");

    // Verifica se é uma imagem (termina com .png, .jpg, etc)
    if (opt.endsWith(".png") || opt.endsWith(".jpg") || opt.endsWith(".jpeg") || opt.endsWith(".gif")) {
      const img = document.createElement("img");
      img.src = opt;
      img.alt = "Opção de resposta";
      img.style.width = "120px";  // ajusta o tamanho como quiser
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

const musicaFundoFlm = document.getElementById('musicaFundoFlm');
const botaoSomFlm = document.getElementById('botaoSomFlm');

if (musicaFundoFlm && botaoSomFlm) {
  botaoSomFlm.addEventListener('click', () => {
    if (musicaFundoFlm.paused) {
      musicaFundoFlm.play();
    } else {
      musicaFundoFlm.pause();
    }
  });
}

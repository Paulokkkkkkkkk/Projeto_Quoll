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
    options: ["8", "10", "7", "4"],
    answer: "7"
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

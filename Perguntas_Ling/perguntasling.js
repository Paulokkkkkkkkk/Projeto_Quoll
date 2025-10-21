const quizData = [
  {
    question: "Qual o ponto usado no fim do paragrafo?",
    options: ["?", ".", "!", ","],
    answer: "."
  },
   {
    question: "Assinale a alternativa correta quanto à colocação do pronome?",
    options: ["Me empresta um lápis?", "Empresta-me um lápis?", "Me o empresta?", "Empresta o-me"],
    answer: "Empresta-me um lápis?"
  },  {
    question: "No trecho 'Apesar da chuva, o vento aconteceu normalmente',a conjução 'Apesar de' indica?",
    options: ["Causa", "Consequência", "Concessão", "Condição"],
    answer: "Concessão"
  },

  {
    question: "Qual das opções abaixo representa uma variação linguistica regional?",
    options: ["'Você vai ao cinema?'", "'Tu vais ao cinema?'", "'Ela vai ao cinema?'", "'Nós fomos ao cinema?'"],
    answer: "'Tu vais ao cinema?'"
  },

  {
    question: "A expressão 'O tempo é um rio que corre sem para' contém qual figura de linguagem",
    options: ["Metáfora", "Metonímia", "Antítese", "Hipérbole"],
    answer: "Metáfora"
  },

   {
    question: "Qual é a função da linguagem predominante em um texto jornalistico informativo",
    options: ["Conativa", "Fática", "Referencial", "Poética"],
    answer: "Referencial"
  },

  {
    question: "O que é linguagem?",
    options: ["Um conjunto fixo de palavras", "A capacidade humana de se comunicar por meio de signos", "Apenas o uso da língua falada", "A norma culta de um idioma"],
    answer: "A capacidade humana de se comunicar por meio de signos"
  },

   {
    question: "Qual é a função do sujeito na oração?",
    options: ["Indicar a ação praticada", "Indicar quem pratica a ação", "Indicar o objeto da ação", "Indicar o tempo verbal"],
    answer: "Indicar quem pratica a ação"
  },

  {
    question: "Leia a frase: 'Maria comprou flores para a professora.' Qual é o objeto direto?",
    options: ["Maria", "Comprou", "Flores", "Para a professora"],
    answer: "Flores"
  },

   {
    question: " Assinale a alternativa em que há erro de concordância verbal:",
    options: ["Nós fomos ao parque ontem.", "Os meninos brinca na rua.", "Ela gosta de estudar.", "Vocês viajaram na semana passada."],
    answer: "Os meninos brinca na rua."
  },

   {
    question: ". Qual é a classificação da palavra “rápido” na frase: “Ele correu rápido”?",
    options: ["Substantivo", "Adjetivo", "Advérbio", "Verbo"],
    answer: "Advérbio"
  },

  {
    question: "Identifique a oração subordinada na frase: Não fui à festa porque estava doente.",
    options: ["Não fui à festa", "porque estava doente", "à festa", "Não fui"],
    answer: "porque estava doente"
  },

  {
    question: "Assinale a alternativa em que o plural está correto:",
    options: ["Os cactos são espinhosos.", "Os lápis são novos.", "Os peixes nadam no rio.", "Todas estão corretas."],
    answer: "Todas estão corretas"
  },

  {
    question: "Assinale a frase em que o uso da vírgula está correto:",
    options: ["João, e Maria foram ao cinema.", "Quando cheguei, ele já havia saído.", "Ela gosta de ler e, escrever.", "Fui ao mercado mas, não comprei nada."],
    answer: "Quando cheguei, ele já havia saído."
  },

   {
    question: "Leia o trecho: 'Embora estivesse cansado, continuou trabalhando'. Qual é a oração subordinada?",
    options: ["Embora estivesse cansado", "Continuou trabalhando", "Estivesse cansado", "Embora continuou"],
    answer: "Embora estivesse cansado"
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


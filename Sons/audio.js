const musica = document.getElementById('musicaFundo');
const botaoSom = document.getElementById('botaoSom');
let tocando = false;

botaoSom.addEventListener('click', () => {
  if (!tocando) {
    musica.play();
    tocando = true;
    botaoSom.textContent = "⏸️ Pausar Música";
  } else {
    musica.pause();
    tocando = false;
    botaoSom.textContent = "🎵 Tocar Música";
  }
});

// Toca a música ao clicar
botaoSom.addEventListener('click', () => {
    musica.volume = 1.0;
    musica.play().catch(err => console.log("Erro ao tocar música:", err));
    botaoSom.style.display = 'none'; // esconde botão depois do clique
});
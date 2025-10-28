const musica = document.getElementById('musicaFundo');
const botao = document.getElementById('botaoSom');
let tocando = false;

botao.addEventListener('click', () => {
  if (!tocando) {
    musica.volume = 1.0;
    musica.play();
    tocando = true;
    botao.textContent = "⏸️ Pausar Música";
  } else {
    musica.pause();
    tocando = false;
    botao.textContent = "🎵 Tocar Música";
  }
});

const musicaFundo = document.getElementById('musicaFundo');
const botaoSom = document.getElementById('botaoSom');

if (musicaFundo && botaoSom) {
  botaoSom.addEventListener('click', () => {
    if (musicaFundo.paused) {
      musicaFundo.play();
    } else {
      musicaFundo.pause();
    }
  });
}

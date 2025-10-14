const botaoSom = document.getElementById('botaoSom');
const musica = document.getElementById('musicaFundo');
let musicaTocando = false;

botaoSom.addEventListener('click', () => {
  if (!musicaTocando) {
    musica.volume = 1.0; // define o volume
    musica.play();
    musicaTocando = true;
    botaoSom.style.opacity = "1"; // ativo
  } else {
    musica.pause();
    musicaTocando = false;
    botaoSom.style.opacity = "0.6"; // desativado
  }
});

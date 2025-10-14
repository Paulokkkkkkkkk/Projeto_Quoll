const botaoSom = document.getElementById('botaoSom');
const musica = document.getElementById('musicaFundo');
let musicaTocando = false;

// continua de onde parou
window.addEventListener('load', () => {
  const tempoSalvo = localStorage.getItem('tempoMusica');
  if (tempoSalvo) {
    musica.currentTime = parseFloat(tempoSalvo);
  }

  const tocando = localStorage.getItem('musicaTocando');
  if (tocando === 'true') {
    musica.volume = 1.0;
    musica.play();
    musicaTocando = true;
    botaoSom.style.opacity = "1";
  }
});

// quando clicar, ativa ou pausa
botaoSom.addEventListener('click', () => {
  if (!musicaTocando) {
    musica.volume = 1.0;
    musica.play();
    musicaTocando = true;
    localStorage.setItem('musicaTocando', 'true');
    botaoSom.style.opacity = "1";
  } else {
    musica.pause();
    musicaTocando = false;
    localStorage.setItem('musicaTocando', 'false');
    botaoSom.style.opacity = "0.6";
  }
});

// salva tempo da música antes de sair da página
window.addEventListener('beforeunload', () => {
  localStorage.setItem('tempoMusica', musica.currentTime);
});

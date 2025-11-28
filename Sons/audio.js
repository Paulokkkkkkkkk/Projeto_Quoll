// Pegando elementos da Home
const musica = document.getElementById("musicaFundo");
const botao = document.getElementById("botaoSom");

// Só executa se os elementos existirem na página
if (musica && botao) {

    musica.volume = 0.5;

    botao.addEventListener("click", () => {

        if (musica.paused) {
            musica.play();
            botao.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            musica.pause();
            botao.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });

    // Tentativa de autoplay
    musica.play().catch(() => {
        // Navegador bloqueou autoplay
        botao.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    });
}


 // finalizado

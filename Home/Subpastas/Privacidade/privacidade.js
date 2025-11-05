document.getElementById("voltar-btn").addEventListener("click", function() {
  window.location.href = "../../index.html"; // ajusta o caminho conforme sua estrutura
});
function voltarPagina() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoSom = document.getElementById('botaoSom');
    const musicaFundo = document.getElementById('musicaFundo');
    
    // VERIFICAÇÃO DE SEGURANÇA (Se não encontrar, para por aqui)
    if (!botaoSom || !musicaFundo) {
        console.error("Erro: Botão de som ou elemento de áudio não foi encontrado no HTML.");
        return; 
    }
    
    const iconeSom = botaoSom.querySelector('i');
    
    // 1. ESTADO INICIAL (Define como Mudo)
    iconeSom.classList.remove('fa-volume-high');
    iconeSom.classList.add('fa-volume-xmark'); // Ícone de som desligado
    
    // 2. FUNÇÃO DE PLAY/PAUSE
    botaoSom.addEventListener('click', () => {
        if (musicaFundo.paused) {
            // Tenta tocar (lida com a política de autoplay do navegador)
            musicaFundo.play()
                .then(() => {
                    // SUCESSO
                    iconeSom.classList.remove('fa-volume-xmark');
                    iconeSom.classList.add('fa-volume-high');
                })
                .catch(error => {
                    // FALHA (Geralmente bloqueado pelo navegador)
                    console.error("Música bloqueada. Clique novamente ou verifique a política de autoplay:", error);
                });
        } else {
            // Pausa
            musicaFundo.pause();
            iconeSom.classList.remove('fa-volume-high');
            iconeSom.classList.add('fa-volume-xmark');
        }
    });
});

// Se você usa o botão de Voltar no HTML, a função deve estar disponível globalmente
function voltarPagina() {
    window.history.back(); 
}
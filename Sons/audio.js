// ATENÇÃO: Se este arquivo JS for usado por diferentes quizzes (Flm, GM, MS),
// você precisa garantir que as variáveis correspondam aos IDs no HTML da PÁGINA ATUAL.

// Tentativa de obter os elementos do quiz de FILMES/SÉRIES (Flm)
const musica = document.getElementById('musicaFundoFlm');
const botao = document.getElementById('botaoSomFlm');
let tocando = false;

// Verificação de segurança: O código só roda se ambos os elementos forem encontrados
if (musica && botao) {
    // 💡 Defina o volume inicial
    musica.volume = 0.5;

    botao.addEventListener('click', () => {
        if (!musica.paused) {
            // A música estava tocando, agora vai pausar
            musica.pause();
            botao.textContent = "🎵 Tocar Música"; // Ícone de Play
        } else {
            // A música estava pausada, agora vai tocar
            musica.play().catch(error => {
                console.error("Erro ao tentar tocar a música (pode ser bloqueio do navegador):", error);
            });
            botao.textContent = "⏸️ Pausar Música"; // Ícone de Pause
        }
    });

    // ⚠️ Tenta iniciar o áudio automaticamente (pode ser bloqueado pelo navegador)
    musica.play().then(() => {
        botao.textContent = "⏸️ Pausar Música";
    }).catch(error => {
        console.log("Autoplay bloqueado. O usuário precisa clicar no botão.");
        botao.textContent = "🎵 Tocar Música";
    });

} else {
    // console.log("Áudio não configurado para este quiz. Verifique se os IDs 'musicaFundoFlm' e 'botaoSomFlm' estão corretos.");
}
// ATENÇÃO: Se este arquivo JS for usado por diferentes quizzes (Flm, GM, MS),
// você precisa garantir que as variáveis correspondam aos IDs no HTML da PÁGINA ATUAL.

// Tentativa de obter os elementos do quiz de FILMES/SÉRIES (Flm)
const musica = document.getElementById('musicaFundoFlm');
// ✅ CORREÇÃO AQUI: Mudado de 'botaoSomFlm' para 'music-button' para corresponder ao HTML
const botao = document.getElementById('music-button'); 
let tocando = false; 

// Verificação de segurança: O código só roda se ambos os elementos forem encontrados
if (musica && botao) {
    // 💡 Defina o volume inicial
    musica.volume = 0.5;

    botao.addEventListener('click', () => {
        if (!musica.paused) {
            // A música estava tocando, agora vai pausar
            musica.pause();
            botao.textContent = "🔇"; // Ícone de mudo
        } else {
            // A música estava pausada, agora vai tocar
            musica.play().catch(error => {
                console.error("Erro ao tentar tocar a música (pode ser bloqueio do navegador):", error);
            });
            botao.textContent = "🎵"; // Ícone de Play (ou Pause, dependendo do estado inicial)
        }
    });

    // ⚠️ Tenta iniciar o áudio automaticamente (pode ser bloqueado pelo navegador)
    musica.play().then(() => {
        // Se a reprodução automática for bem-sucedida, mostra o ícone de Pause/Som
        botao.textContent = "🎵"; 
    }).catch(error => {
        console.log("Autoplay bloqueado. O usuário precisa clicar no botão.");
        // Se a reprodução automática falhar, mostra o ícone de Mudo/Play (para incentivar o clique)
        botao.textContent = "🔇"; 
    });

} else {
    // console.log("Áudio não configurado para este quiz. Verifique se os IDs 'musicaFundoFlm' e 'music-button' estão corretos.");
}
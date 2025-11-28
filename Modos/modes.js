function abrirModos() {
  fetch('/Modos/modos.html')
    .then(res => res.text())
    .then(html => {
      const popup = document.getElementById("popup-modos");
      popup.innerHTML = `<div id="conteudo-popup">${html}</div>`;
      popup.style.display = "flex";

      document.addEventListener("click", function fecharPopup(event) {
        const conteudo = document.getElementById("conteudo-popup");
        if (popup.style.display === "flex" && !conteudo.contains(event.target)) {
          popup.style.display = "none";
          document.removeEventListener("click", fecharPopup);
        }
      });
    })
    .catch(err => console.error('Erro ao carregar modos:', err));
}


 // finalizado

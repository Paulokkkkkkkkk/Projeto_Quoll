function abrirModos() {
  fetch("modos.html")
    .then(res => res.text())
    .then(html => {
      const popup = document.getElementById("popup-modos");
      popup.innerHTML = `<div>${html}</div>`;
      popup.style.display = "flex";
    });
}

function fecharModos() {
  document.getElementById("popup-modos").style.display = "none";
}

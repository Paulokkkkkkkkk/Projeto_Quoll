document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formSuporte");
  const status = document.getElementById("status");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // evita recarregar

    const data = new FormData(form);
    status.textContent = "Enviando...";
    status.style.color = "yellow";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "Mensagem enviada com sucesso! 🎉";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        status.textContent = "Ocorreu um erro. Tente novamente.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Erro de conexão. Verifique sua internet.";
      status.style.color = "red";
    }
  });
});

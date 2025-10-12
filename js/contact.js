
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Envoi en cours...";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });
    if (res.ok) {
      form.reset();
      status.textContent = "Merci ! Votre message a bien été envoyé ✅";
    } else {
      status.textContent = "Oups, une erreur est survenue ❌";
    }
  } catch {
    status.textContent = "Impossible d’envoyer le message. Vérifiez votre connexion.";
  }
});


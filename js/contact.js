/* ============================================================
   contact.js — formulaire de contact (EmailJS v4)
   Pense à restreindre ta clé publique à ton domaine dans le
   dashboard EmailJS (Account > Security > Allowed origins).
   ============================================================ */
(function () {
  "use strict";

  const PUBLIC_KEY = "q0trTDzrOfO8QivVJ";
  const SERVICE_ID = "service_wkcineu";
  const TEMPLATE_ID = "template_joouz3s";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const label = document.getElementById("captcha-label");
  const captchaInput = document.getElementById("captcha");
  const status = document.getElementById("form-status");
  const submit = form.querySelector('button[type="submit"]');

  let expected = 0;

  function newCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    expected = a + b;
    label.textContent = `Captcha : ${a} + ${b} = ?`;
    captchaInput.value = "";
  }

  function show(message, ok) {
    status.textContent = message;
    status.className = "form-status " + (ok ? "ok" : "err");
  }

  if (typeof emailjs === "undefined") {
    show("Le service d'envoi est indisponible pour le moment. Réessaie plus tard.", false);
    submit.disabled = true;
    return;
  }

  emailjs.init({ publicKey: PUBLIC_KEY });
  newCaptcha();

  form.addEventListener("submit", async event => {
    event.preventDefault();

    // Champ piège : un humain ne le remplit jamais
    if (form.elements["website"] && form.elements["website"].value) return;

    if (parseInt(captchaInput.value, 10) !== expected) {
      show("Captcha incorrect. Essaie avec la nouvelle opération.", false);
      newCaptcha();
      return;
    }

    submit.disabled = true;
    submit.textContent = "Envoi…";
    show("", true);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      show("Message envoyé avec succès. Merci, je te réponds vite !", true);
      form.reset();
    } catch (error) {
      show("Échec de l'envoi du message. Réessaie dans un instant.", false);
    } finally {
      submit.disabled = false;
      submit.textContent = "Envoyer";
      newCaptcha();
    }
  });
})();

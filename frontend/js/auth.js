// ===== TOGGLE MOT DE PASSE =====
const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    }
  });
}

// ===== VALIDATION LOGIN =====
const btnLogin = document.getElementById("btn-login");

if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          motDePasse: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sauvegarder le token et l'utilisateur
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Rediriger selon le rôle
        if (data.user.role === "admin") {
          window.location.href = "admin.html";
        } else if (data.user.role === "autoecole") {
          window.location.href = "autoecole.html";
        } else {
          window.location.href = "dashboard.html";
        }
      } else {
        alert(data.message || "Erreur de connexion.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur.");
    }
  });
}

// ===== VALIDATION REGISTER =====
const btnRegister = document.getElementById("btn-register");

if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const centre = document.getElementById("centre").value;
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !centre ||
      !password ||
      !confirmPassword
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          telephone,
          motDePasse: password,
          centre,
          role: "apprenant",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Compte créé avec succès !");
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur.");
    }
  });
}

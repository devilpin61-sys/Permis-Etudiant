// ===== MENU HAMBURGER =====
const hamburger = document.querySelector(".hamburger");
const navbarLinks = document.querySelector(".navbar-links");

hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

document.querySelectorAll(".navbar-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  }
});

// ===== FORMULAIRE WHATSAPP + BACKEND =====
document.getElementById("btn-inscrire").addEventListener("click", async () => {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const email = document.getElementById("email").value.trim();
  const motDePasse = document.getElementById("motDePasse").value.trim();
  const confirmerMotDePasse = document
    .getElementById("confirmerMotDePasse")
    .value.trim();
  const centre = document.getElementById("centre").value;
  const option = document.getElementById("option").value;
  const statut = document.getElementById("statut").value;

  // Validation
  if (
    !nom ||
    !prenom ||
    !telephone ||
    !email ||
    !motDePasse ||
    !confirmerMotDePasse ||
    !centre ||
    !option ||
    !statut
  ) {
    alert("Veuillez remplir tous les champs avant de continuer.");
    return;
  }

  if (motDePasse !== confirmerMotDePasse) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  if (motDePasse.length < 6) {
    alert("Le mot de passe doit contenir au moins 6 caractères.");
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
        motDePasse,
        centre,
        option,
        statut,
        role: "apprenant",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const message = `Bonjour, je viens de m'inscrire au Projet Permis Étudiant+

👤 Nom : ${nom}
👤 Prénom : ${prenom}
📞 Téléphone : ${telephone}
📧 Email : ${email}
📍 Centre choisi : ${centre}
📚 Option de cours : ${option}
🎓 Statut : ${statut}

Merci !`;

      const numeroWhatsApp = "22962031892";
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      alert(
        "Inscription réussie ! Vous allez être redirigé vers votre espace.",
      );
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Erreur lors de l'inscription.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Erreur de connexion au serveur.");
  }
});

// ===== ANIMATION AU SCROLL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".card, .cours-card, .centre-card, .partenaire-card, .tranche",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ===== COMPTE A REBOURS =====
function gererCountdown() {
  const dateOuverture = new Date("2026-07-01");
  const dateCloture = new Date("2026-08-01");
  const maintenant = new Date();

  const ouvert = document.getElementById("countdown-ouvert");
  const ferme = document.getElementById("countdown-ferme");
  const bientot = document.getElementById("countdown-bientot");

  if (maintenant >= dateOuverture && maintenant <= dateCloture) {
    ouvert.style.display = "block";
    document.getElementById("date-cloture-affichage").textContent =
      dateCloture.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  } else if (maintenant < dateOuverture) {
    ferme.style.display = "block";
    document.getElementById("date-ouverture-affichage").textContent =
      dateOuverture.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    setInterval(() => {
      const now = new Date();
      const diff = dateOuverture - now;

      if (diff <= 0) {
        location.reload();
        return;
      }

      const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
      const heures = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("countdown-jours").textContent = String(
        jours,
      ).padStart(2, "0");
      document.getElementById("countdown-heures").textContent = String(
        heures,
      ).padStart(2, "0");
      document.getElementById("countdown-minutes").textContent = String(
        minutes,
      ).padStart(2, "0");
      document.getElementById("countdown-secondes").textContent = String(
        secondes,
      ).padStart(2, "0");
    }, 1000);
  } else {
    bientot.style.display = "block";
  }
}

gererCountdown();

// ===== RÉCUPÉRER L'UTILISATEUR CONNECTÉ =====
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// Si pas connecté rediriger vers login
if (!user || !token) {
  window.location.href = "login.html";
}

// ===== AFFICHER LES INFOS DE L'UTILISATEUR =====
if (user) {
  // Initiales de l'avatar
  const initiales = `${user.nom[0]}${user.prenom[0]}`.toUpperCase();
  document.querySelectorAll(".user-avatar").forEach((el) => {
    el.textContent = initiales;
  });

  // Nom dans le profil
  document.querySelector("#page-profil .profil-avatar").textContent = initiales;

  // Infos profil
  if (user) {
    const initiales = `${user.nom[0]}${user.prenom[0]}`.toUpperCase();

    document.querySelectorAll(".user-avatar").forEach((el) => {
      el.textContent = initiales;
    });

    document.getElementById("profil-avatar").textContent = initiales;
    document.getElementById("profil-nom").textContent =
      `${user.nom} ${user.prenom}`;
    document.getElementById("profil-email").textContent = user.email;
    document.getElementById("profil-telephone").textContent =
      user.telephone || "Non renseigné";
    document.getElementById("profil-centre").textContent =
      user.centre || "Non renseigné";
    document.getElementById("profil-option").textContent =
      user.option || "Non renseigné";

    const pageHeader = document.querySelector("#page-accueil .page-header h1");
    if (pageHeader) {
      pageHeader.textContent = `Bonjour, ${user.prenom} 👋`;
    }
  }

  // Bonjour avec le prénom
  const pageHeader = document.querySelector("#page-accueil .page-header h1");
  if (pageHeader) {
    pageHeader.textContent = `Bonjour, ${user.prenom} 👋`;
  }
}

// ===== NAVIGATION SIDEBAR =====
const navItems = document.querySelectorAll(".nav-item[data-page]");
const pages = document.querySelectorAll(".page");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    navItems.forEach((i) => i.classList.remove("active"));
    pages.forEach((p) => p.classList.remove("active"));

    item.classList.add("active");
    const page = item.getAttribute("data-page");
    document.getElementById(`page-${page}`).classList.add("active");
  });
});

// ===== DECONNEXION =====
document.querySelector(".deconnexion").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

// ===== CHARGER LES COURS =====
async function chargerCours() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/cours?centre=${user.centre}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const cours = await response.json();
    console.log("Cours chargés:", cours);
  } catch (error) {
    console.error("Erreur cours:", error);
  }
}

chargerCours();

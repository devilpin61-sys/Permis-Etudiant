// ===== NAVIGATION SIDEBAR =====
const navItems = document.querySelectorAll(".nav-item[data-page]");
const pages = document.querySelectorAll(".page");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Retirer active de tous
    navItems.forEach((i) => i.classList.remove("active"));
    pages.forEach((p) => p.classList.remove("active"));

    // Activer le bon
    item.classList.add("active");
    const page = item.getAttribute("data-page");
    document.getElementById(`page-${page}`).classList.add("active");
  });
});

// ===== CRÉER UNE VAGUE =====
const btnCreerVague = document.getElementById("btn-creer-vague");

if (btnCreerVague) {
  btnCreerVague.addEventListener("click", () => {
    const ouverture = document.getElementById("date-ouverture").value;
    const cloture = document.getElementById("date-cloture").value;
    const rentree = document.getElementById("date-rentree").value;
    const nom = document.getElementById("nom-vague").value.trim();

    if (!ouverture || !cloture || !rentree || !nom) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (new Date(cloture) <= new Date(ouverture)) {
      alert("La date de clôture doit être après la date d'ouverture.");
      return;
    }

    if (new Date(rentree) <= new Date(cloture)) {
      alert("La date de rentrée doit être après la date de clôture.");
      return;
    }

    // Pour l'instant on simule — le backend viendra après
    alert(`Vague "${nom}" créée avec succès ! Le backend va sauvegarder ça.`);
  });
}

// ===== RECHERCHE INSCRITS =====
const searchInput = document.querySelector(".search-input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll(".data-table tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
}

// ===== FILTRE PAR CENTRE =====
const filterSelect = document.querySelector(".filter-select");

if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const value = filterSelect.value.toLowerCase();
    const rows = document.querySelectorAll(".data-table tbody tr");

    rows.forEach((row) => {
      if (!value) {
        row.style.display = "";
      } else {
        const centre = row.cells[3].textContent.toLowerCase();
        row.style.display = centre.includes(value) ? "" : "none";
      }
    });
  });
}

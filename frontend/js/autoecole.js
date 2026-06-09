// ===== HAMBURGER MOBILE =====
const hamburgerBtn = document.getElementById("hamburger-btn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    sidebarOverlay.classList.toggle("hidden");
  });

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  });
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

    // Fermer sidebar sur mobile
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  });
});

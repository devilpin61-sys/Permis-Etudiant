const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ===== OBTENIR TOUS LES INSCRITS =====
router.get("/", async (req, res) => {
  try {
    const { centre, role } = req.query;
    let filter = {};

    if (centre) filter.centre = centre;
    if (role) filter.role = role;

    const users = await User.find(filter)
      .select("-motDePasse")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR UN UTILISATEUR =====
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-motDePasse");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== METTRE À JOUR LE PAIEMENT =====
router.put("/:id/paiement", async (req, res) => {
  try {
    const { tranche1, tranche2, tranche3 } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { paiements: { tranche1, tranche2, tranche3 } },
      { new: true },
    ).select("-motDePasse");

    res.json({ message: "Paiement mis à jour !", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== SUPPRIMER UN UTILISATEUR =====
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;

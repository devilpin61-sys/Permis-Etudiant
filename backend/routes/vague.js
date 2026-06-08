const express = require("express");
const router = express.Router();
const Vague = require("../models/Vague");

// ===== CRÉER UNE VAGUE =====
router.post("/", async (req, res) => {
  try {
    const { nom, dateOuverture, dateCloture, dateRentree } = req.body;

    const vague = new Vague({
      nom,
      dateOuverture,
      dateCloture,
      dateRentree,
    });

    await vague.save();
    res.status(201).json({ message: "Vague créée avec succès !", vague });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR LA VAGUE ACTIVE =====
router.get("/active", async (req, res) => {
  try {
    const maintenant = new Date();

    const vague = await Vague.findOne({
      dateOuverture: { $lte: maintenant },
      dateCloture: { $gte: maintenant },
    });

    if (!vague) {
      // Chercher la prochaine vague
      const prochaineVague = await Vague.findOne({
        dateOuverture: { $gt: maintenant },
      }).sort({ dateOuverture: 1 });

      return res.json({ statut: "fermee", prochaineVague });
    }

    res.json({ statut: "ouverte", vague });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR TOUTES LES VAGUES =====
router.get("/", async (req, res) => {
  try {
    const vagues = await Vague.find().sort({ createdAt: -1 });
    res.json(vagues);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;

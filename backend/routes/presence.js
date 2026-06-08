const express = require("express");
const router = express.Router();
const Presence = require("../models/Presence");

// ===== ENREGISTRER LES PRESENCES =====
router.post("/", async (req, res) => {
  try {
    const { presences } = req.body;
    // presences = [{apprenant, cours, statut, autoEcole}]

    const results = await Presence.insertMany(
      presences.map((p) => ({
        apprenant: p.apprenant,
        cours: p.cours,
        statut: p.statut,
        autoEcole: p.autoEcole,
        date: new Date(),
      })),
    );

    res.status(201).json({ message: "Présences enregistrées !", results });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR LES PRESENCES D'UN APPRENANT =====
router.get("/apprenant/:id", async (req, res) => {
  try {
    const presences = await Presence.find({ apprenant: req.params.id })
      .populate("cours")
      .sort({ date: -1 });

    res.json(presences);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR LES PRESENCES DU JOUR =====
router.get("/jour", async (req, res) => {
  try {
    const aujourd_hui = new Date();
    aujourd_hui.setHours(0, 0, 0, 0);

    const demain = new Date(aujourd_hui);
    demain.setDate(demain.getDate() + 1);

    const presences = await Presence.find({
      date: { $gte: aujourd_hui, $lt: demain },
    })
      .populate("apprenant", "nom prenom")
      .populate("cours", "titre type");

    res.json(presences);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;

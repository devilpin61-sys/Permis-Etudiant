const express = require("express");
const router = express.Router();
const Cours = require("../models/Cours");

// ===== AJOUTER UN COURS =====
router.post("/", async (req, res) => {
  try {
    const { titre, type, contenu, date, autoEcole, centre } = req.body;

    const cours = new Cours({
      titre,
      type,
      contenu,
      date,
      autoEcole,
      centre,
    });

    await cours.save();
    res.status(201).json({ message: "Cours ajouté avec succès !", cours });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR LES COURS DU JOUR =====
router.get("/jour", async (req, res) => {
  try {
    const aujourd_hui = new Date();
    aujourd_hui.setHours(0, 0, 0, 0);

    const demain = new Date(aujourd_hui);
    demain.setDate(demain.getDate() + 1);

    const cours = await Cours.find({
      date: { $gte: aujourd_hui, $lt: demain },
    }).sort({ date: 1 });

    res.json(cours);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== OBTENIR TOUS LES COURS =====
router.get("/", async (req, res) => {
  try {
    const { centre, autoEcole } = req.query;
    let filter = {};

    if (centre) filter.centre = centre;
    if (autoEcole) filter.autoEcole = autoEcole;

    const cours = await Cours.find(filter).sort({ date: -1 });
    res.json(cours);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== SUPPRIMER UN COURS =====
router.delete("/:id", async (req, res) => {
  try {
    await Cours.findByIdAndDelete(req.params.id);
    res.json({ message: "Cours supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { envoyerEmailInscription } = require("../outils/email");

// ===== INSCRIPTION =====
router.post("/register", async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      motDePasse,
      centre,
      option,
      statut,
    } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    // Créer l'utilisateur
    const user = new User({
      nom,
      prenom,
      email,
      telephone,
      motDePasse: hashedPassword,
      centre,
      option,
      statut,
      role: "apprenant",
    });

    await user.save();

    // Envoyer email de confirmation
    try {
      await envoyerEmailInscription(email, nom, prenom, email, motDePasse);
      console.log("Email envoyé avec succès !");
    } catch (emailError) {
      console.log("Erreur email:", emailError.message);
    }

    // Créer le token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Inscription réussie !",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        centre: user.centre,
      },
    });
  } catch (error) {
    console.log("ERREUR REGISTER:", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ===== CONNEXION =====
router.post("/login", async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Connexion réussie !",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        centre: user.centre,
        telephone: user.telephone,
        option: user.option,
      },
    });
  } catch (error) {
    console.log("ERREUR LOGIN:", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;

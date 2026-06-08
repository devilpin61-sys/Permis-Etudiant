const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["apprenant", "admin", "autoecole"],
    default: "apprenant",
  },
  centre: {
    type: String,
    enum: ["calavi", "porto-novo", "bohicon", "lokossa", "parakou"],
  },
  option: {
    type: String,
  },
  statut: {
    type: String,
  },
  paiements: {
    tranche1: { type: Boolean, default: false },
    tranche2: { type: Boolean, default: false },
    tranche3: { type: Boolean, default: false },
  },
  autoEcole: {
    type: String,
    enum: ["eloi-service-plus", "lumiere-conduite", "la-capitale", "le-succes"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

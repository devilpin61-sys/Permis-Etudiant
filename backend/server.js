require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import des routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/user");
const vaguesRoutes = require("./routes/vague");
const coursRoutes = require("./routes/cours");
const presencesRoutes = require("./routes/presence");
const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/vagues", vaguesRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/presences", presencesRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Serveur Permis Étudiant+ en ligne !" });
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Serveur démarré sur le port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ Erreur de connexion MongoDB :", err.message);
  });

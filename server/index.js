// g-rising/server/index.js

const express = require("express");
const entryRoutes = require("./routes/entry");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // pour lire les variables .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // pour lire le JSON dans les requêtes

// Test route
app.get("/", (req, res) => {
    res.send("Le serveur fonctionne ✅");
});

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connecté à MongoDB 🔗");
        app.use("/api/entry", entryRoutes);
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error("Erreur de connexion MongoDB :", err));

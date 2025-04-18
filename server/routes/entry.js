const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");

router.post("/", async (req, res) => {
    try {
        const { date, sport, repas, complements, cannabis, poids } = req.body;

        let existing = await Entry.findOne({ date });

        if (existing) {
            existing.sport = sport;
            existing.repas = repas;
            existing.complements = complements;
            existing.cannabis = cannabis;
            existing.poids = poids;
            await existing.save();
            return res.json({ message: "Entrée mise à jour", data: existing });
        }

        const newEntry = new Entry({
            date,
            sport,
            repas,
            complements,
            cannabis,
            poids,
        });
        await newEntry.save();
        res.status(201).json({ message: "Entrée créée", data: newEntry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const entries = await Entry.find({});
        res.json({ entries });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération" });
    }
});

router.get("/stats", async (req, res) => {
    try {
        const entries = await Entry.find({}).sort({ date: 1 });

        if (!entries.length) {
            return res.json({
                tempsDepuisDernierJoint: "Pas de données",
                economie: 0,
                tempsVie: 0,
            });
        }

        // 1. Trouver la dernière date où il a fumé
        const reversed = [...entries].reverse();
        const lastSmoked = reversed.find((entry) => entry.cannabis === true);

        let baseTime = lastSmoked
            ? new Date(lastSmoked.date)
            : new Date(entries[0].date);
        baseTime.setHours(0, 0, 0, 0); // pour démarrer à minuit
        const now = new Date();

        const msDiff = now - baseTime;
        const seconds = Math.floor(msDiff / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / 3600) % 24;
        const days = Math.floor(seconds / (3600 * 24));

        const tempsDepuisDernierJoint = `${days} jour${
            days > 1 ? "s" : ""
        } ${hours}h ${minutes}m ${seconds % 60}s`;

        // 2. Calcul économie & temps de vie
        const joursSansFumer = entries.filter(
            (e) => e.cannabis === false
        ).length;

        const economie = (joursSansFumer * 2.66).toFixed(2); // €
        const tempsVie = joursSansFumer * 45; // en minutes

        res.json({
            tempsDepuisDernierJoint,
            economie,
            tempsVie,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur stats" });
    }
});

module.exports = router;

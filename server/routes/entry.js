const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");

router.post("/", async (req, res) => {
    try {
        const { sport, repas, complements, cannabis, poids } = req.body;

        // Génère une date du jour sans l'heure (à minuit)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Recherche une entrée pour aujourd'hui
        let existing = await Entry.findOne({ date: today });

        if (existing) {
            // Mise à jour
            existing.sport = sport;
            existing.repas = repas;
            existing.complements = complements;
            existing.cannabis = cannabis;
            existing.poids = poids;
            await existing.save();
            return res.json({ message: "Entrée mise à jour", data: existing });
        }

        // Nouvelle entrée
        const newEntry = new Entry({
            date: today,
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

        const reversed = [...entries].reverse();
        const lastSmoked = reversed.find((entry) => entry.cannabis === true);

        let baseTime = lastSmoked
            ? new Date(lastSmoked.date)
            : new Date(entries[0].date);
        baseTime.setHours(0, 0, 0, 0);
        const now = new Date();

        const msDiff = now - baseTime;
        const seconds = Math.floor(msDiff / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / 3600) % 24;
        const days = Math.floor(seconds / (3600 * 24));

        const tempsDepuisDernierJoint = `${days} jour${
            days > 1 ? "s" : ""
        } ${hours}h ${minutes}m ${seconds % 60}s`;

        const joursSansFumer = entries.filter(
            (e) => e.cannabis === false
        ).length;
        const economie = (joursSansFumer * 2.66).toFixed(2);
        const tempsVie = joursSansFumer * 45;

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

router.get("/weights", async (req, res) => {
    try {
        const entries = await Entry.find({ poids: { $ne: null } }).sort({
            date: 1,
        });

        const poidsData = entries.map((e) => ({
            date: e.date.toISOString().split("T")[0],
            poids: e.poids,
        }));

        res.json({ poids: poidsData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur poids" });
    }
});

module.exports = router;

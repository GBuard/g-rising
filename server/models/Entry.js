// g-rising/server/models/Entry.js

const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true, // Un seul enregistrement par jour
    },
    sport: {
        type: Boolean,
        default: false,
    },
    repas: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],
    },
    complements: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],
    },
    cannabis: {
        type: Boolean,
        default: false,
    },
    poids: {
        type: Number,
        default: null,
    },
});

module.exports = mongoose.model("Entry", entrySchema);

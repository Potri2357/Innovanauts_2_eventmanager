const express = require("express");
const Venue = require("../models/Venue");
const router = express.Router();

// Create a new venue
router.post("/", async (req, res) => {
    try {
        const venue = new Venue(req.body);
        await venue.save();
        res.status(201).json({ message: "Venue added successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all venues
router.get("/", async (req, res) => {
    try {
        const venues = await Venue.find();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single venue by ID
router.get("/:id", async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) return res.status(404).json({ error: "Venue not found" });
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a venue
router.put("/:id", async (req, res) => {
    try {
        const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!venue) return res.status(404).json({ error: "Venue not found" });
        res.status(200).json({ message: "Venue updated successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a venue
router.delete("/:id", async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) return res.status(404).json({ error: "Venue not found" });
        res.status(200).json({ message: "Venue deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

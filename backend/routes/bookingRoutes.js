const express = require("express");
const Venue = require("../models/Venue"); // Import Venue model
const router = express.Router();

// Get all available venues
router.get("/available", async (req, res) => {
    try {
        const availableVenues = await Venue.find({ bookingStatus: "Available" });
        res.json(availableVenues);
    } catch (error) {
        res.status(500).json({ error: "Error fetching available venues" });
    }
});

// Book a venue
router.post("/book", async (req, res) => {
    const { venueId, eventName, organiser, date, startTime, endTime } = req.body;

    try {
        const venue = await Venue.findById(venueId);

        if (!venue) {
            return res.status(404).json({ error: "Venue not found" });
        }

        if (venue.bookingStatus !== "Available") {
            return res.status(400).json({ error: "Venue is already booked" });
        }

        // Update venue booking status
        venue.bookingStatus = "Booked";
        await venue.save();

        // Send confirmation response
        res.status(200).json({ message: "✅ Venue booked successfully!", venue });
    } catch (error) {
        res.status(500).json({ error: "Error booking venue" });
    }
});

module.exports = router;

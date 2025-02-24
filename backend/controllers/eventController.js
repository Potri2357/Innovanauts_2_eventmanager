const Event = require("../models/Event");

exports.checkAvailability = async (req, res) => {
    try {
        const { venue, date, startTime, endTime } = req.body;

        const existingEvent = await Event.findOne({
            venue,
            date,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingEvent) {
            return res.status(400).json({ conflict: true, message: "Venue is already booked!" });
        }

        res.json({ conflict: false });
    } catch (error) {
        res.status(500).json({ error: "Server error checking availability" });
    }
};

exports.bookEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.json({ success: true, message: "Event booked successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error booking event" });
    }
};

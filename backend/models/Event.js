const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    organiser: { type: String, required: true },
    club: { type: String },
    venue: { type: String, required: true },
    attendees: { type: Number, required: true },
    facilities: { type: [String], required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);

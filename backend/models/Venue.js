const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    venueType: { type: String, enum: ["Auditorium", "Seminar Hall", "Classroom", "Sports Ground"], required: true },
    description: { type: String },
    facilities: { type: [String] },
    bookingStatus: { type: String, enum: ["Available", "Booked", "Pending Approval"], required: true },
    bookingPriority: { type: String, enum: ["Departmental Events", "Club Events", "Open to All"], required: true },
    noiseLevel: { type: String, enum: ["Silent", "Loud Events Allowed"], required: true },
    requiredApprovals: { type: String, enum: ["Faculty Approval Needed", "Admin Approval Needed"], required: true },
    keyNumber: { type: String, required: true },
    keyAvailability: { type: String, required: true },
    keyHandler: { type: String, required: true }
}, { timestamps: true });

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;

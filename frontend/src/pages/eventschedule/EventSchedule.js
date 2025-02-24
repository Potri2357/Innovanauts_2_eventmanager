import React, { useState, useEffect } from "react";
import "./EventSchedule.css";

const EventScheduler = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    organiser: "",
    club: "",
    attendees: "",
    facilities: [],
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
  });

  const [availableVenues, setAvailableVenues] = useState([]);
  const [recommendedVenue, setRecommendedVenue] = useState("");
  const [message, setMessage] = useState("");
  const clubs = ["Coding", "Dance", "Robotics", "Isai", "Music"];
  const facilitiesList = [
    "AC",
    "Projector",
    "Microphone",
    "Whiteboard",
    "Sound System",
    "WiFi",
    "Parking",
  ];

  // Fetch available venues
  useEffect(() => {
    fetch("http://localhost:5000/api/users/venues")
      .then((res) => res.json())
      .then((data) => setAvailableVenues(data))
      .catch((err) => console.error("Error fetching venues:", err));
  }, []);

  // Check if venue is booked for the selected slot
  const checkAvailability = async () => {
    const response = await fetch(
      "http://localhost:5000/api/users/events/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venue: eventData.venue,
          date: eventData.date,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
        }),
      }
    );

    const result = await response.json();
    if (result.conflict) {
      setMessage(
        "❌ Venue is already booked for this slot! Choose another time."
      );
      return false;
    }
    return true;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEventData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((f) => f !== value),
      }));
    } else {
      setEventData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle event submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const isAvailable = await checkAvailability();
    if (!isAvailable) return;

    const response = await fetch(
      "http://localhost:5000/api/users/events/book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();
    if (response.ok) {
      setMessage("✅ Event scheduled and venue booked successfully!");
      setEventData({
        eventName: "",
        organiser: "",
        club: "",
        attendees: "",
        facilities: [],
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
      });
    } else {
      setMessage("❌ ${result.error}");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>📅 Schedule an Event</h2>
      {message && (
        <p className={message.startsWith("✅") ? "success" : "error"}>
          {message}
        </p>
      )}

      <label>
        Event Name:
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Organizer:
        <input
          type="text"
          name="organiser"
          value={eventData.organiser}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Club:
        <select
          name="club"
          value={eventData.club}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Club --</option>
          {clubs.map((club) => (
            <option key={club} value={club}>
              {club}
            </option>
          ))}
        </select>
      </label>

      <label>
        Number of Attendees:
        <input
          type="number"
          name="attendees"
          value={eventData.attendees}
          onChange={handleChange}
          required
        />
      </label>

      <h3>Facilities Needed</h3>
      {facilitiesList.map((facility) => (
        <label key={facility}>
          <input
            type="checkbox"
            name="facilities"
            value={facility}
            checked={eventData.facilities.includes(facility)}
            onChange={handleChange}
          />{" "}
          {facility}
        </label>
      ))}

      <label>
        Event Date:
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Start Time:
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End Time:
        <input
          type="time"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          required
        />
      </label>

      <h3>Select a Venue</h3>
      <select
        name="venue"
        value={eventData.venue}
        onChange={handleChange}
        required
      >
        <option value="">-- Choose Venue --</option>
        {availableVenues.map((venue) => (
          <option key={venue._id} value={venue.venueName}>
            {venue.venueName} ({venue.capacity} people)
          </option>
        ))}
      </select>

      <button type="submit">Schedule Event</button>
    </form>
  );
};

export default EventScheduler;

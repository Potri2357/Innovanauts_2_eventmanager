import React, { useState } from "react";
import "./VenueForm.css";

const VenueForm = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    location: "",
    capacity: "",
    venueType: "Auditorium",
    description: "",
    facilities: [],
    bookingStatus: "Available",
    bookingPriority: "Departmental Events",
    noiseLevel: "Silent",
    requiredApprovals: "Faculty Approval Needed",
    keyNumber: "",
    keyAvailability: "",
    keyHandler: "",
  });

  const [message, setMessage] = useState(""); // To show success/error messages

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        facilities: checked
          ? [...prevState.facilities, value]
          : prevState.facilities.filter((facility) => facility !== value),
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submitting

    try {
      const response = await fetch("http://localhost:5000/api/users/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Venue added successfully!");
        setFormData({
          // Reset form after success
          venueName: "",
          location: "",
          capacity: "",
          venueType: "Auditorium",
          description: "",
          facilities: [],
          bookingStatus: "Available",
          bookingPriority: "Departmental Events",
          noiseLevel: "Silent",
          requiredApprovals: "Faculty Approval Needed",
          keyNumber: "",
          keyAvailability: "",
          keyHandler: "",
        });
      } else {
        setMessage("❌ Error: ${data.error}");
      }
    } catch (error) {
      setMessage("❌ Failed to connect to the server. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="venue-form">
      <h2>✅ Venue Details</h2>
      {message && <p className="message">{message}</p>}{" "}
      {/* Show success/error messages */}
      <label>
        ☑ Venue Name:
        <input
          type="text"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ☑ Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ☑ Capacity:
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ☑ Venue Type:
        <select
          name="venueType"
          value={formData.venueType}
          onChange={handleChange}
        >
          <option>Auditorium</option>
          <option>Seminar Hall</option>
          <option>Classroom</option>
          <option>Sports Ground</option>
        </select>
      </label>
      <label>
        ☑ Description & Special Features:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <h3>✅ Facilities & Equipment</h3>
      {[
        "AC",
        "Projector",
        "Microphone",
        "Whiteboard",
        "Sound System",
        "WiFi",
        "Parking",
      ].map((facility) => (
        <label key={facility}>
          <input
            type="checkbox"
            name="facilities"
            value={facility}
            checked={formData.facilities.includes(facility)}
            onChange={handleChange}
          />{" "}
          ☑ {facility}
        </label>
      ))}
      <h3>✅ Booking & Restrictions</h3>
      <label>
        ☑ Booking Status:
        <select
          name="bookingStatus"
          value={formData.bookingStatus}
          onChange={handleChange}
        >
          <option>Available</option>
          <option>Booked</option>
          <option>Pending Approval</option>
        </select>
      </label>
      <label>
        ☑ Booking Priority:
        <select
          name="bookingPriority"
          value={formData.bookingPriority}
          onChange={handleChange}
        >
          <option>Departmental Events</option>
          <option>Club Events</option>
          <option>Open to All</option>
        </select>
      </label>
      <label>
        ☑ Noise Level Restrictions:
        <select
          name="noiseLevel"
          value={formData.noiseLevel}
          onChange={handleChange}
        >
          <option>Silent</option>
          <option>Loud Events Allowed</option>
        </select>
      </label>
      <label>
        ☑ Required Approvals:
        <select
          name="requiredApprovals"
          value={formData.requiredApprovals}
          onChange={handleChange}
        >
          <option>Faculty Approval Needed</option>
          <option>Admin Approval Needed</option>
        </select>
      </label>
      <h3>✅ Key & Access Management</h3>
      <label>
        ☑ Key Number of Venue:
        <input
          type="text"
          name="keyNumber"
          value={formData.keyNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ☑ Place to Avail Key:
        <input
          type="text"
          name="keyAvailability"
          value={formData.keyAvailability}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ☑ Person Responsible for Key Handling:
        <input
          type="text"
          name="keyHandler"
          value={formData.keyHandler}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VenueForm;

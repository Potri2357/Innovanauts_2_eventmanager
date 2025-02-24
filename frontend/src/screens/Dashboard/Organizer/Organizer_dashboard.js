import React, { useState, useEffect } from "react";
import events from "../../../components/data/events.js";
import Navbar from "./Navbar/Navbar.js";
import "./Organizer_Dashboard.css"; // Importing plain CSS file

const Dashboard = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setRegisteredEvents(storedEvents);
  }, []);

  return (
    <div className="dashboard">
      <div className="navbar">
        <Navbar />
      </div>
      <h2 className="dashboard-title">Overview</h2>

      {/* Overview Cards */}
      <div className="dashboard-cards">
        <Card title="Total Events" value={events.length} icon="📅" />
        <Card
          title="Registered Events"
          value={registeredEvents.length}
          icon="✅"
        />
        <Card
          title="Upcoming Events"
          value={events.length - registeredEvents.length}
          icon="🚀"
        />
      </div>

      {/* Upcoming Events List */}
      <h3 className="dashboard-subtitle">📢 Upcoming Events</h3>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h4>{event.title}</h4>
            <p>📅 {event.date}</p>
            <p>📍 {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value, icon }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-value">{value}</p>
  </div>
);

export default Dashboard;

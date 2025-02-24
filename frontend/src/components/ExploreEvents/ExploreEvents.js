import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExploreEvents.css";
import event_list from "../data/events";

const ExploreEvents = () => {
  const [events] = useState(event_list);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || event.category === selectedCategory)
  );

  return (
    <div className="explore-container">
      {/* Sidebar (Filters) */}
      <div className="sidebar">
        <h3>Filter</h3>
        <label>Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Technology">Technology</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <input
          type="text"
          placeholder="Search events..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="events-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link
                to={`/event/${event.id}`}
                key={event.id}
                className="event-card"
              >
                <h4>{event.name}</h4>
                <p>
                  <strong>Category:</strong> {event.category}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
              </Link>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;

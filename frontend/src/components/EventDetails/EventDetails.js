import React from "react";
import { useParams, Link } from "react-router-dom";
import "./EventDetails.css";
import event_list from "../data/events";

const events = event_list;

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p>
        <strong>Category:</strong> {event.category}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <Link to="/events" className="back-button">
        ← Back to Events
      </Link>
    </div>
  );
};

export default EventDetails;

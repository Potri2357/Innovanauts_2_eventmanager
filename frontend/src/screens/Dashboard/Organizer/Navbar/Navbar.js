import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import CSS for navbar styling

const Navbar = () => {
  const location = useLocation(); // Get current route to highlight active link

  return (
    <nav className="navbar">
      <Link to="/participant-dashboard" className="navbar-logo">
        🎓Organizer Portal
      </Link>
      <ul className="navbar-links">
        <li>
          <Link
            to="/organizer-dashboard/event-schedule"
            className={
              location.pathname === "/organizer-dashboard/event-schedule"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Event Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/organizer-dashboard/venue-form"
            className={
              location.pathname === "/organizer-dashboard/venue-form"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Venue Form
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={
              location.pathname === "/profile" ? "nav-link active" : "nav-link"
            }
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => localStorage.removeItem("user")}
            className={
              location.pathname === "/profile" ? "nav-link active" : "nav-link"
            }
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import event_list from "D:/Programming/Projects/login_system/frontend/src/components/data/events";
import "./Navbar.css"; // Import CSS for navbar styling

const Navbar = () => {
  const location = useLocation(); // Get current route to highlight active link

  return (
    <nav className="navbar">
      <Link to="/participant-dashboard" className="navbar-logo">
        🎓 Student Portal
      </Link>
      <ul className="navbar-links">
        <li>
          <Link
            to="/participant-dashboard"
            className={
              location.pathname === "/participant-dashboard"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            className={
              location.pathname === "/events" ? "nav-link active" : "nav-link"
            }
          >
            Explore Events
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

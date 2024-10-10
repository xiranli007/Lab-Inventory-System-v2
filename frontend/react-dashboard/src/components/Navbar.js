import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the CSS file for custom styles
import { AuthContext } from "../AuthContext";  // Import the AuthContext for authentication

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);  // Access isAuthenticated and logout from AuthContext

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top navbar-scroll">
      <div className="container mt-3">
        {/* Title: Lab Inventory System with padding on the left */}
        <span className="navbar-brand ms-3 h4 mt-2">Lab Inventory System</span>

        {/* Toggle button (Hamburger menu for smaller screens) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left links - Show when user is authenticated */}
          {isAuthenticated && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/culture">Culture Collection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">Inventory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/request">Request</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order">Order</Link>
              </li>
            </ul>
          )}

          {/* Right-aligned user links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Sign In</Link> {/* Link to login page */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

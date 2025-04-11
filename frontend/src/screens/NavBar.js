import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../media/logo.png";
import defaultProfilePic from "../media/default-profile.png";

function NavBar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showActivitiesDropdown, setShowActivitiesDropdown] = useState(false);
  const profilePic = ""; // Add logic to fetch profile picture URL

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setShowProfileDropdown(false);
        setShowActivitiesDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="navbar-header">
      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="nav-logo" />
          <div className="text-container">
            <div className="logo-text">Alumni Connect</div>
          </div>
        </div>

        <div className="center-items">
        <ul>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/aboutus" activeClassName="active">About Us</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
            <li><NavLink to="/activities" activeClassName="active">Activities</NavLink></li>
            <li><NavLink to="/latest" activeClassName="active">Latest</NavLink></li>
            <li><NavLink to="/content" activeClassName="active">Content</NavLink></li>
          </ul>
        </div>

        {localStorage.getItem("token") ? (
          <div className="dropdown-container">
            <div
              className="profile-icon-wrapper"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src={profilePic || defaultProfilePic}
                alt="Profile"
                className="profile-pic"
              />
            </div>

            {showProfileDropdown && (
              <div className="dropdown-menu">
                <NavLink
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  Profile
                </NavLink>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setShowProfileDropdown(false);
                    window.location.href = "/signin"; 
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth">
            <NavLink to="/signin" className="signin-btn">
              <img
                src={profilePic || defaultProfilePic}
                alt="Profile"
                className="profile-pic"
              />
              <span className="signin-text">Sign In</span>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
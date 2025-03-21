import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../media/logo.png";
import defaultProfilePic from "../media/default-profile.png";

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profilePic = ""; // Add logic to fetch the user's profile picture URL

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown-container')) {
        setShowDropdown(false);
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
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" activeClassName="active">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/activities" activeClassName="active">
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink to="/latest" activeClassName="active">
                Latest
              </NavLink>
            </li>
            <li>
              <NavLink to="/content" activeClassName="active">
                Content
              </NavLink>
            </li>
          </ul>
        </div>

        {localStorage.getItem("token") ? (
          <div className="profile-dropdown-container">
            <div
              className="profile-icon-wrapper"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={profilePic || defaultProfilePic}
                alt="Profile"
                className="profile-pic"
              />
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <NavLink
                  to="/profile" // Updated to point to the profile page
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </NavLink>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setShowDropdown(false);
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
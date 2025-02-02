import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../media/logo.png";
import defaultProfilePic from "../media/default-profile.png";

function NavBar() {
  const profilePic = ""; // Add logic to fetch the user's profile picture URL

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
              <NavLink to="/Home" activeClassName="active">
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
          <div>
            
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

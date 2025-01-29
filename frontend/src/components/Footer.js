import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css"; // CSS file for styling

// Import the SVG logo
import boulderLogo from "../assets/boulder_logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Column - Logo */}
      <div className="footer-logo">
        <img src={boulderLogo} alt="Boulder Bike Race Logo" className="logo-img" />
        <span className="logo-title">Boulder Bike Race</span>
      </div>

      {/* Center Column - Navigation Links */}
      <nav className="footer-nav">
        <NavLink to="/slogans">Slogans</NavLink>
        <NavLink to="/riders">Riders</NavLink>
        <NavLink to="/photos">Photos</NavLink>
        <NavLink to="/locations">Locations</NavLink>
      </nav>

      {/* Right Column - Contact Details */}
      <div className="footer-contact">
        <p>Email: contact@boulderbike.com</p>
        <p>Phone: +1 303-555-1234</p>
        <p>Address: Boulder, CO, USA</p>
      </div>
    </footer>
  );
};

export default Footer;

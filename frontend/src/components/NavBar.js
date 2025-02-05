import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

import boulderLogo from "../assets/boulder_logo.svg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <NavLink to="/" onClick={closeMenu}>
          <img src={boulderLogo} alt="Boulder Logo" className="logo-img" />
        </NavLink>
        {/* <NavLink to="/" onClick={closeMenu}>
            <span className="logo-title">Boulder Bike Race</span>
        </NavLink> */}
        <span className="logo-title"><span className="highlight">Boulder Bike Tour</span></span>
        
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/slogans" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
            Slogans
          </NavLink>
        </li>
        <li>
          <NavLink to="/riders" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
            Riders
          </NavLink>
        </li>
        <li>
          <NavLink to="/photos" className={({ isActive }) => (isActive ? "active-link" : "")}  onClick={closeMenu}>
            Photos
          </NavLink>
        </li>
        <li>
          <NavLink to="/locations" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeMenu}>
            Locations
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

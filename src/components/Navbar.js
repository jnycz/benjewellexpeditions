import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../img/jewell-expedition-logo.svg";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-transparent is-fixed-top has-shadow"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Jewell Expeditions" />
          </Link>
          {/* Hamburger menu */}
          <button
            className={`navbar-burger burger ${isActive && "is-active"}`}
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div id="navMenu" className={`navbar-menu ${isActive && "is-active"}`}>

          <ul className="navbar-end">
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item" to="/about">
                  About
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item" to="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item" to="/faqs">
                  FAQs
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item" to="/photos">
                  Photos
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item last" to="/contact">
                  Contact
                </Link>
              </li>
          </ul>
          
          <div className="navbar-end cta">
            <div className="navbar-item">
              <Link to="/book">
                <button className="button is-rounded contact has-text-weight-semibold is-normal is-fullwidth">Book Now</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

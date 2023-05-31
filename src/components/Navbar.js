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
        <div id="navMenu" className={`has-text-centered navbar-menu ${isActive && "is-active"}`}>

          <ul className="navbar-end">
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/about">
                  About
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/faqs">
                  FAQs
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/photos">
                  Photos
                </Link>
              </li>
              <li className="navbar-item" style={{padding: "0px"}}>
                <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/contact">
                  Contact
                </Link>
              </li>
          </ul>
          
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/contact">
                <button className="button is-primary is-rounded contact has-text-weight-semibold is-normal is-fullwidth">Book Now</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

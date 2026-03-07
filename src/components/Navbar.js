import React, { useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";
import logo from "../img/jewell-expedition-logo.svg";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const path = location.pathname?.replace(/\/$/, "") || "";

  const isActivePath = (to) => {
    const normalized = to.replace(/\/$/, "");
    if (normalized === "") return path === "";
    return path === normalized || path.startsWith(normalized + "/");
  };

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
            aria-controls="navMenu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div id="navMenu" className={`navbar-menu ${isActive && "is-active"}`}>

          <ul className="navbar-end">
            <li className="navbar-item" style={{ padding: "0px" }}>
              <Link className={`navbar-item ${isActivePath("/about") ? "is-active" : ""}`} to="/about">
                About
              </Link>
            </li>
            <li className="navbar-item" style={{ padding: "0px" }}>
              <Link className={`navbar-item ${isActivePath("/testimonials") ? "is-active" : ""}`} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li className="navbar-item" style={{ padding: "0px" }}>
              <Link className={`navbar-item ${isActivePath("/faqs") ? "is-active" : ""}`} to="/faqs">
                FAQs
              </Link>
            </li>
            <li className="navbar-item" style={{ padding: "0px" }}>
              <Link className={`navbar-item ${isActivePath("/photos") ? "is-active" : ""}`} to="/photos">
                Photos
              </Link>
            </li>
            <li className="navbar-item" style={{ padding: "0px" }}>
              <Link className={`navbar-item last ${isActivePath("/contact") ? "is-active" : ""}`} to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar-end cta">
            <div className="navbar-item">
              <Link to="/book">
                <button className="button is-rounded book-now-btn has-text-weight-semibold is-normal is-fullwidth">Book Now</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

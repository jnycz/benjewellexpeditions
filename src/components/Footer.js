import * as React from "react";
import { Link } from "gatsby";

import logo from "../img/jewell-expedition-logo.svg";
//import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";

const Footer = () => {
  
    return (
      <footer className="footer">
        <div className="content has-text-centered">
        <Link to="/" className="is-centered is-align-content-center" title="Logo">
          <img
              src={logo}
              alt="Jewell Expeditions"
              style={{ width: "14em", height: "10em" }}
            />
        </Link>
        <p className="is-size-6">Ruidoso, New Mexico<br />
          Phone Number: <a href="tel:+5759731396">(575) 973-1396</a><br />
          Email: <a href="mailto:benjewell222@gmail.com">benjewell222@gmail.com</a>
        </p>
        </div>
        <div className="content has-text-left">
          <div className="container">
            <div style={{ maxWidth: "100vw" }} className="">
              <div className="column has-text-weight-semibold is-uppercase">
                <section className="">
                  <div className="footer-menu">
                      <Link className="" to="/about">
                        About
                      </Link>
                      <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/testimonials">
                        Testimonials
                      </Link>
                      <Link className="" to="/faqs">
                        FAQs
                      </Link>
                      <Link className="navbar-item is-uppercase has-text-weight-semibold" to="/photos">
                        Photos
                      </Link>
                      <Link className="" to="/contact">
                        Contact
                      </Link>
                  </div>
                </section>
              </div>
              <div className="column social">
                <a title="instagram" target="_blank" rel="noreferrer" href="https://www.instagram.com/benjewellflyfishing_/">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

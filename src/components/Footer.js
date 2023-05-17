import * as React from "react";
import { Link } from "gatsby";

import logo from "../img/jewell-expedition-logo.svg";
import facebook from "../img/social/facebook.svg";
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
        <p className=" is-6">Ruidoso, New Mexico<br />
          Phone Number: (575) 973-1396<br />
          Email: benjewell222@gmail.com
        </p>
        </div>
        <div className="content has-text-left">
          <div className="container">
            <div style={{ maxWidth: "100vw" }} className="">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/faqs">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
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

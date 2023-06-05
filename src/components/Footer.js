import * as React from "react";
import { Link } from "gatsby";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../img/jewell-expedition-logo.svg";

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

  
    return (
      <footer className="footer">
          <div className="container">

              <div className="column has-text-centered">
                <Link to="/" className="" title="Logo">
                  <img
                      src={logo}
                      alt="Jewell Expeditions"
                      style={{ height: "3.25em" }}
                    />
                </Link>
                {/* <p><small>A year-round fly fishing guide service in the Ruidoso New Mexico area</small></p> */}
              </div>

              <div className="column has-text-weight-semibold is-uppercase">
                <div className="footer-menu">
                  <Link className="navbar-item" to="/about">
                    About
                  </Link>
                  <Link className="navbar-item" to="/testimonials">
                    Testimonials
                  </Link>
                  <Link className="navbar-item" to="/faqs">
                    FAQs
                  </Link>
                  <Link className="navbar-item" to="/photos">
                    Photos
                  </Link>
                  <Link className="navbar-item" to="/contact">
                    Contact
                  </Link>
                  <Link className="navbar-item" to="/book">
                    Book
                  </Link>
                </div>
              </div>

              <div className="column social">
                <div className="is-flex is-justify-content-center is-align-items-center"><MdLocationOn />
                  <a className="pl-1 has-text-weight-semibold" href="https://goo.gl/maps/quVphP69HmNssmyGA?coh=178572&entry=tt">Ruidoso, New Mexico</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><MdPhone />
                  <a className="pl-1 has-text-weight-semibold" href="tel:+5759731396">(575) 973-1396</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><MdEmail />
                  <a className="pl-1 has-text-weight-semibold" href="mailto:benjewell222@gmail.com">benjewell222@gmail.com</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><AiFillInstagram />
                  <a className="pl-1 has-text-weight-semibold" title="Instagram | Ben Jewell Fly Fishing" target="_blank" rel="noreferrer" href="https://www.instagram.com/benjewellflyfishing_/">Instagram</a>
                </div>
              </div>

          </div>
          <div className="pt-2 has-text-centered"><small>Copywrite © {year} Jewell Expeditions</small></div>
      </footer>
    );
};

export default Footer;

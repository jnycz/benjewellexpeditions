import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import logo from "../img/jewell-expedition-logo.svg";

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    const location = useLocation();
    const path = location.pathname?.replace(/\/$/, "") || "";

    const isActivePath = (to) => {
      const normalized = to.replace(/\/$/, "");
      if (normalized === "") return path === "";
      return path === normalized || path.startsWith(normalized + "/");
    };

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
                  <Link className={`footer-link ${isActivePath("/about") ? "is-active" : ""}`} to="/about">
                    About
                  </Link>
                  <Link className={`footer-link ${isActivePath("/testimonials") ? "is-active" : ""}`} to="/testimonials">
                    Testimonials
                  </Link>
                  <Link className={`footer-link ${isActivePath("/faqs") ? "is-active" : ""}`} to="/faqs">
                    FAQs
                  </Link>
                  <Link className={`footer-link ${isActivePath("/photos") ? "is-active" : ""}`} to="/photos">
                    Photos
                  </Link>
                  <Link className={`footer-link ${isActivePath("/contact") ? "is-active" : ""}`} to="/contact">
                    Contact
                  </Link>
                  <Link className={`footer-link ${isActivePath("/book") ? "is-active" : ""}`} to="/book">
                    Book
                  </Link>
                </div>
              </div>

              <div className="column social">
                <div className="is-flex is-justify-content-center is-align-items-center"><MdLocationOn />
                  <a className="footer-contact-link pl-1 has-text-weight-semibold" href="https://goo.gl/maps/quVphP69HmNssmyGA?coh=178572&entry=tt">Ruidoso, New Mexico</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><MdPhone />
                  <a className="footer-contact-link pl-1 has-text-weight-semibold" href="tel:+5759731396">(575) 973-1396</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><MdEmail />
                  <a className="footer-contact-link pl-1 has-text-weight-semibold" href="mailto:jewellexpeditions@gmail.com">jewellexpeditions@gmail.com</a>
                </div>
                <div className="is-flex is-justify-content-center is-align-items-center"><AiFillInstagram />
                  <a className="footer-contact-link pl-1 has-text-weight-semibold" title="Instagram | Ben Jewell Fly Fishing" target="_blank" rel="noreferrer" href="https://www.instagram.com/benjewellflyfishing_/">Instagram</a>
                </div>
              </div>

          </div>
          <div className="footer-copyright pt-2 has-text-centered"><small>Copyright © {year} Jewell Expeditions</small></div>
      </footer>
    );
};

export default Footer;

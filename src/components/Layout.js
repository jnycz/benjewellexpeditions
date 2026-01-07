import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { Link } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [isFallModalOpen, setIsFallModalOpen] = React.useState(false);
  const [isWinterModalOpen, setIsWinterModalOpen] = React.useState(false);

  const isWithinFallWindow = React.useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    // Show from Sep 22 (inclusive) through Nov 30 (i.e., before Dec 1) each year
    const seasonStart = new Date(year, 8, 22); // Sep 22
    const seasonEnd = new Date(year, 11, 1); // Dec 1
    return now >= seasonStart && now < seasonEnd;
  }, []);

  const isWithinWinterWindow = React.useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    
    // Show from Dec 12 (inclusive) through Feb 28/29 (i.e., before March 1) each year
    // If we're in Jan-Feb (months 0-1), we're in winter season
    if (month < 2) {
      return true;
    }
    // If we're in Dec (month 11) and date >= 12, we're in winter season
    if (month === 11 && date >= 12) {
      return true;
    }
    return false;
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!isWithinFallWindow()) return;
      const storageKey = "fallModalNextAllowedAt";
      const nextAllowedAt = window.localStorage.getItem(storageKey);
      if (!nextAllowedAt) {
        setIsFallModalOpen(true);
        return;
      }
      const now = Date.now();
      const next = parseInt(nextAllowedAt, 10);
      if (Number.isFinite(next)) {
        if (now >= next) {
          setIsFallModalOpen(true);
        }
      } else {
        setIsFallModalOpen(true);
      }
    } catch (e) {
      setIsFallModalOpen(true);
    }
  }, [isWithinFallWindow]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!isWithinWinterWindow()) return;
      const storageKey = "winterModalNextAllowedAt";
      const nextAllowedAt = window.localStorage.getItem(storageKey);
      if (!nextAllowedAt) {
        setIsWinterModalOpen(true);
        return;
      }
      const now = Date.now();
      const next = parseInt(nextAllowedAt, 10);
      if (Number.isFinite(next)) {
        if (now >= next) {
          setIsWinterModalOpen(true);
        }
      } else {
        setIsWinterModalOpen(true);
      }
    } catch (e) {
      setIsWinterModalOpen(true);
    }
  }, [isWithinWinterWindow]);

  const closeFallModal = React.useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        const nextAllowedAt = Date.now() + thirtyDaysMs;
        window.localStorage.setItem("fallModalNextAllowedAt", String(nextAllowedAt));
      } catch (e) { }
    }
    setIsFallModalOpen(false);
  }, []);

  const closeWinterModal = React.useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        const nextAllowedAt = Date.now() + thirtyDaysMs;
        window.localStorage.setItem("winterModalNextAllowedAt", String(nextAllowedAt));
      } catch (e) { }
    }
    setIsWinterModalOpen(false);
  }, []);

  const handleFallBackdropKeyDown = React.useCallback((e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeFallModal();
    }
  }, [closeFallModal]);

  const handleWinterBackdropKeyDown = React.useCallback((e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeWinterModal();
    }
  }, [closeWinterModal]);
  return (
    <div>
      <Helmet>
        <html lang="en" className="has-navbar-fixed-top" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />
        <meta name="google-site-verification" content="tD7YUm5f0NL7vdtZfnXMIlUKrwlUMsPmqszzokJmkbA" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <div className={`modal fall-modal ${isFallModalOpen ? "is-active" : ""}`} role="dialog" aria-modal="true" aria-labelledby="fall-modal-title">
        <div
          className="modal-background"
          role="button"
          tabIndex={0}
          aria-label="Close seasonal announcement"
          onClick={closeFallModal}
          onKeyDown={handleFallBackdropKeyDown}
        />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" id="fall-modal-title">🍂 Fall is our best season</p>
            <button className="delete" aria-label="close" onClick={closeFallModal} />
          </header>
          <section className="modal-card-body">
            <p className="is-size-5">Prime conditions, optimal water temps, and fewer crowds — the best fishing of the year.</p>
          </section>
          <footer className="modal-card-foot" style={{ justifyContent: "flex-end" }}>
            <button className="button" onClick={closeFallModal}>Maybe later</button>
            <Link to="/book" className="button is-primary has-text-weight-semibold" onClick={closeFallModal}>Book now</Link>
          </footer>
        </div>
      </div>
      <div className={`modal fall-modal ${isWinterModalOpen ? "is-active" : ""}`} role="dialog" aria-modal="true" aria-labelledby="winter-modal-title">
        <div
          className="modal-background"
          role="button"
          tabIndex={0}
          aria-label="Close seasonal announcement"
          onClick={closeWinterModal}
          onKeyDown={handleWinterBackdropKeyDown}
        />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" id="winter-modal-title">❄️ Winter fishing has been great</p>
            <button className="delete" aria-label="close" onClick={closeWinterModal} />
          </header>
          <section className="modal-card-body">
            <p className="is-size-5">Winter fishing has been great due to mild temperatures. Book Now!</p>
          </section>
          <footer className="modal-card-foot" style={{ justifyContent: "flex-end" }}>
            <button className="button" onClick={closeWinterModal}>Maybe later</button>
            <Link to="/book" className="button is-primary has-text-weight-semibold" onClick={closeWinterModal}>Book now</Link>
          </footer>
        </div>
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;

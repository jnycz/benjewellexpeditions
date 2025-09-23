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

  const isWithinFallWindow = React.useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    // Show from Sep 1 (inclusive) through Nov 30 (i.e., before Dec 1) each year
    const seasonStart = new Date(year, 8, 22); // Sep 22
    const seasonEnd = new Date(year, 11, 1); // Dec 1
    return now >= seasonStart && now < seasonEnd;
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
  const handleBackdropKeyDown = React.useCallback((e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeFallModal();
    }
  }, [closeFallModal]);
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
          onKeyDown={handleBackdropKeyDown}
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
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { Link } from "gatsby";

// CMS months are 1–12; end date is exclusive. Handles year wrap (e.g. Dec–Mar).
function isWithinDateRange(now, startMonth, startDay, endMonth, endDay) {
  if (startMonth == null || startDay == null || endMonth == null || endDay == null) return false;
  const y = now.getFullYear();
  const start = new Date(y, Number(startMonth) - 1, Number(startDay));
  let end = new Date(y, Number(endMonth) - 1, Number(endDay));
  if (endMonth < startMonth) end = new Date(y + 1, Number(endMonth) - 1, Number(endDay));
  return now >= start && now < end;
}

const FALL_DEFAULTS = { title: "🍂 Fall is our best season", body: "Prime conditions, optimal water temps, and fewer crowds — the best fishing of the year." };
const WINTER_DEFAULTS = { title: "❄️ Winter fishing has been great", body: "Winter fishing has been great due to mild temperatures. Book Now!" };
const SPRING_DEFAULTS = { title: "🌸 Spring is our best season", body: "Spring is our best season book now!" };

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [isFallModalOpen, setIsFallModalOpen] = React.useState(false);
  const [isWinterModalOpen, setIsWinterModalOpen] = React.useState(false);
  const [isSpringModalOpen, setIsSpringModalOpen] = React.useState(false);

  const { seasonal: seasonalQuery } = useStaticQuery(graphql`
    query SeasonalModalsQuery {
      seasonal: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/seasonal.md/" } }) {
        edges {
          node {
            frontmatter {
              fall {
                enabled
                title
                body
                startMonth
                startDay
                endMonth
                endDay
              }
              winter {
                enabled
                title
                body
                startMonth
                startDay
                endMonth
                endDay
              }
              spring {
                enabled
                title
                body
                startMonth
                startDay
                endMonth
                endDay
              }
            }
          }
        }
      }
    }
  `);

  const seasonal = seasonalQuery?.edges?.[0]?.node?.frontmatter ?? null;

  const isWithinFallWindow = React.useCallback(() => {
    const now = new Date();
    if (seasonal?.fall != null) {
      if (!seasonal.fall.enabled) return false;
      if (seasonal.fall.startMonth != null) {
        return isWithinDateRange(now, seasonal.fall.startMonth, seasonal.fall.startDay, seasonal.fall.endMonth, seasonal.fall.endDay);
      }
    }
    const seasonStart = new Date(now.getFullYear(), 8, 22);
    const seasonEnd = new Date(now.getFullYear(), 11, 1);
    return now >= seasonStart && now < seasonEnd;
  }, [seasonal?.fall]);

  const isWithinWinterWindow = React.useCallback(() => {
    const now = new Date();
    if (seasonal?.winter != null) {
      if (!seasonal.winter.enabled) return false;
      if (seasonal.winter.startMonth != null) {
        return isWithinDateRange(now, seasonal.winter.startMonth, seasonal.winter.startDay, seasonal.winter.endMonth, seasonal.winter.endDay);
      }
    }
    const month = now.getMonth();
    const date = now.getDate();
    if (month < 2) return true;
    if (month === 11 && date >= 12) return true;
    return false;
  }, [seasonal?.winter]);

  const isWithinSpringWindow = React.useCallback(() => {
    const now = new Date();
    if (seasonal?.spring != null) {
      if (!seasonal.spring.enabled) return false;
      if (seasonal.spring.startMonth != null) {
        return isWithinDateRange(now, seasonal.spring.startMonth, seasonal.spring.startDay, seasonal.spring.endMonth, seasonal.spring.endDay);
      }
    }
    const month = now.getMonth();
    return month >= 2 && month <= 4;
  }, [seasonal?.spring]);

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

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!isWithinSpringWindow()) return;
      const storageKey = "springModalNextAllowedAt";
      const nextAllowedAt = window.localStorage.getItem(storageKey);
      if (!nextAllowedAt) {
        setIsSpringModalOpen(true);
        return;
      }
      const now = Date.now();
      const next = parseInt(nextAllowedAt, 10);
      if (Number.isFinite(next)) {
        if (now >= next) {
          setIsSpringModalOpen(true);
        }
      } else {
        setIsSpringModalOpen(true);
      }
    } catch (e) {
      setIsSpringModalOpen(true);
    }
  }, [isWithinSpringWindow]);

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

  const closeSpringModal = React.useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        const nextAllowedAt = Date.now() + thirtyDaysMs;
        window.localStorage.setItem("springModalNextAllowedAt", String(nextAllowedAt));
      } catch (e) { }
    }
    setIsSpringModalOpen(false);
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

  const handleSpringBackdropKeyDown = React.useCallback((e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeSpringModal();
    }
  }, [closeSpringModal]);
  return (
    <div>
      <Helmet>
        <html lang="en" className="has-navbar-fixed-top" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
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
            <p className="modal-card-title" id="fall-modal-title">{seasonal?.fall?.title ?? FALL_DEFAULTS.title}</p>
            <button className="delete" aria-label="close" onClick={closeFallModal} />
          </header>
          <section className="modal-card-body">
            <p className="is-size-5">{seasonal?.fall?.body ?? FALL_DEFAULTS.body}</p>
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
            <p className="modal-card-title" id="winter-modal-title">{seasonal?.winter?.title ?? WINTER_DEFAULTS.title}</p>
            <button className="delete" aria-label="close" onClick={closeWinterModal} />
          </header>
          <section className="modal-card-body">
            <p className="is-size-5">{seasonal?.winter?.body ?? WINTER_DEFAULTS.body}</p>
          </section>
          <footer className="modal-card-foot" style={{ justifyContent: "flex-end" }}>
            <button className="button" onClick={closeWinterModal}>Maybe later</button>
            <Link to="/book" className="button is-primary has-text-weight-semibold" onClick={closeWinterModal}>Book now</Link>
          </footer>
        </div>
      </div>
      <div className={`modal fall-modal ${isSpringModalOpen ? "is-active" : ""}`} role="dialog" aria-modal="true" aria-labelledby="spring-modal-title">
        <div
          className="modal-background"
          role="button"
          tabIndex={0}
          aria-label="Close seasonal announcement"
          onClick={closeSpringModal}
          onKeyDown={handleSpringBackdropKeyDown}
        />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" id="spring-modal-title">{seasonal?.spring?.title ?? SPRING_DEFAULTS.title}</p>
            <button className="delete" aria-label="close" onClick={closeSpringModal} />
          </header>
          <section className="modal-card-body">
            <p className="is-size-5">{seasonal?.spring?.body ?? SPRING_DEFAULTS.body}</p>
          </section>
          <footer className="modal-card-foot" style={{ justifyContent: "flex-end" }}>
            <button className="button" onClick={closeSpringModal}>Maybe later</button>
            <Link to="/book" className="button is-primary has-text-weight-semibold" onClick={closeSpringModal}>Book now</Link>
          </footer>
        </div>
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;

import * as React from "react";
import PropTypes from "prop-types";
import logo from "../img/jewell-expedition-logo.svg";

// Full-screen, non-dismissible splash shown while the site is in maintenance
// mode. The rest of the site sits blurred and inert behind it (see Layout).
const MaintenanceSplash = ({
  heading,
  body,
  subtext,
  contactLabel,
  contactEmail,
}) => {
  const cardRef = React.useRef(null);

  // Move focus into the splash so keyboard and screen-reader users land here
  // rather than at the top of a page they cannot reach.
  React.useEffect(() => {
    cardRef.current?.focus();
  }, []);

  return (
    <div
      className="maintenance-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-heading"
    >
      <div className="maintenance-card" ref={cardRef} tabIndex={-1}>
        <img
          className="maintenance-logo"
          src={logo}
          alt="Jewell Expeditions"
        />
        <h1 className="maintenance-heading" id="maintenance-heading">
          {heading}
        </h1>
        <p className="maintenance-body">{body}</p>
        {subtext ? <p className="maintenance-subtext">{subtext}</p> : null}
        {contactEmail ? (
          <p className="maintenance-contact">
            {contactLabel}
            <br />
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        ) : null}
      </div>
    </div>
  );
};

MaintenanceSplash.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  contactLabel: PropTypes.string,
  contactEmail: PropTypes.string,
};

export default MaintenanceSplash;

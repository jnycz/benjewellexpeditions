import * as React from "react";
import useSiteStatus from "./useSiteStatus";

// Wraps a Netlify form. While the site is in maintenance mode the form markup
// is not rendered at all — no fields in the DOM, nothing submittable, and
// nothing for Netlify's build-time form detection to pick up. Turning
// maintenance mode off restores the form untouched.
const FormGate = ({ children }) => {
  const { enabled, formsDisabledMessage } = useSiteStatus();

  if (!enabled) return <>{children}</>;

  return (
    <div className="notification forms-disabled-notice">
      <p>{formsDisabledMessage}</p>
    </div>
  );
};

export default FormGate;

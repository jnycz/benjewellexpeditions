import { graphql, useStaticQuery } from "gatsby";

const DEFAULTS = {
  enabled: false,
  heading: "Thank you for your business",
  body: "Jewell Expeditions is relocating. Guided trips and online booking are paused while the move is underway.",
  subtext: "Stay tuned — an updated site is on the way.",
  contactLabel: "Questions in the meantime?",
  contactEmail: "",
  formsDisabledMessage:
    "Booking and contact forms are temporarily closed while Jewell Expeditions relocates. Please check back soon.",
};

// Site-wide maintenance ("we're moving") status, edited in the CMS at
// src/data/site-status.md. When `enabled` is true the whole site is placed
// behind a splash screen, the booking/contact forms are not rendered, and the
// footer contact details are omitted. Flip `enabled` off to restore everything.
const useSiteStatus = () => {
  const data = useStaticQuery(graphql`
    query SiteStatusQuery {
      status: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/site-status/" } }
      ) {
        edges {
          node {
            frontmatter {
              maintenance {
                enabled
                heading
                body
                subtext
                contactLabel
                contactEmail
                formsDisabledMessage
              }
            }
          }
        }
      }
    }
  `);

  const maintenance = data?.status?.edges?.[0]?.node?.frontmatter?.maintenance;

  if (!maintenance) return DEFAULTS;

  // A blank string in the CMS should fall back to the default copy, but an
  // explicit `enabled: false` must win.
  return {
    enabled: maintenance.enabled === true,
    heading: maintenance.heading || DEFAULTS.heading,
    body: maintenance.body || DEFAULTS.body,
    subtext: maintenance.subtext || DEFAULTS.subtext,
    contactLabel: maintenance.contactLabel || DEFAULTS.contactLabel,
    contactEmail: maintenance.contactEmail || DEFAULTS.contactEmail,
    formsDisabledMessage:
      maintenance.formsDisabledMessage || DEFAULTS.formsDisabledMessage,
  };
};

export default useSiteStatus;

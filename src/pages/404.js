import * as React from "react";
import Layout from "../components/Layout";
import useSiteStatus from "../components/useSiteStatus";

const NotFoundPage = () => {
  // While the site is relocating, an unknown URL should carry the same message
  // as every other page rather than a dead end. Outside maintenance mode this
  // goes back to being an ordinary 404.
  const { enabled, heading, body, subtext } = useSiteStatus();

  return (
    <Layout>
      <div className="container">
        <section className="section is-medium">
          <div className="content has-text-centered">
            {enabled ? (
              <>
                <h1>{heading}</h1>
                <p>{body}</p>
                {subtext ? <p>{subtext}</p> : null}
              </>
            ) : (
              <>
                <h1>NOT FOUND</h1>
                <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

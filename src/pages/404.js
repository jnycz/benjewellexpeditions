import * as React from "react";
import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <div className="container">
      <section className="section is-medium">
        <div className="content has-text-centered">
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </section>
    </div>
  </Layout>
);

export default NotFoundPage;

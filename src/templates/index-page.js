import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Features from "../components/Features";
//import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section">
        <div className="container">

            <div className="content why">
              <h2 className="title">{mainpitch.title}</h2>
              <p>{mainpitch.description}</p>
            </div>

            <div className="content">
              <h3 className="has-text-weight-semibold">
                {heading}
              </h3>
              <p>{description}</p>
            </div>

            <div className="content features">
              <h3 className="has-text-weight-semibold">
                {intro.heading}
              </h3>
              <p>{intro.description}</p>
              <Features gridItems={intro.blurbs} />
            </div>

            {gallery ? (
              <div className="columns is-centered">
                <div className="column is-10 slideshow-container">
                    <Slideshow items={testimonials.items} />
                </div>
              </div>
            ) : null}



            {/* <div className="columns">
              <div className="column is-12 has-text-centered">
                <Link className="btn" to="/products">
                  See all products
                </Link>
              </div>
            </div>
            <div className="column is-12">
              <h3 className="has-text-weight-semibold is-size-2">
                Latest stories
              </h3>
              <BlogRoll />
              <div className="column is-12 has-text-centered">
                <Link className="btn" to="/blog">
                  Read more
                </Link>
              </div>
            </div> */}
          </div>
      </section>
    </div>

  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  testimonials: PropTypes.shape({
    items: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        testimonials={frontmatter.gallery}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
        testimonials {
          items {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  height: 800
                  formats: [AUTO,WEBP]
                )
              }
            }
            text
          }
        }
      }
    }
  }
`;

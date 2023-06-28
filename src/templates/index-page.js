import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { MdOutlineChevronRight } from "react-icons/md";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Slideshow from '../components/Slideshow';
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import FullWidthImage from "../components/FullWidthImage";
import RibbonCTA from "../components/RibbonCTA";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  main,
  testimonials,
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

            <div className="columns">
              <div className="column is-7">
                <h3 className="has-text-weight-semibold is-size-3">
                  {main.heading}
                </h3>
                <p>{main.description}</p>
              </div>
            </div>
        </div>
      </section>

      {testimonials ? (
        <section className="section testimonials is-medium">
          <div className="container">
            <div className="columns is-centered">
              <div className="column content is-10 slideshow-container">
                <Slideshow items={testimonials.items} />
              </div>
            </div>
          </div>
          <Link className="more-link black-text" to="/testimonials">
            More Testimonials <MdOutlineChevronRight />
          </Link>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-vertical">

                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child">
                      <Link to="/faqs" className="img-hover-zoom">
                        <div className="card">
                          <div className="card-image">
                            <PreviewCompatibleImage imageInfo={main.image1} />
                          </div>
                          <div className="card-content is-overlay is-overlay-bg is-flex is-justify-content-center is-align-content-center is-align-items-center">
                            <span className="is-size-3 has-text-centeredis-uppercase has-text-weight-semibold has-text-white is-uppercase">FAQs</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <Link to="/photos" className="img-hover-zoom">
                        <div className="card">
                          <div className="card-image">
                            <PreviewCompatibleImage imageInfo={main.image2} />
                          </div>
                          <div className="card-content is-overlay is-overlay-bg is-flex is-justify-content-center is-align-content-center is-align-items-center">
                            <span className="is-size-3 has-text-centeredis-uppercase has-text-weight-semibold has-text-white is-uppercase">Photo Gallery</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </div>
                </div>

                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child">
                      <Link to="/testimonials" className="img-hover-zoom">
                        <div className="card">
                          <div className="card-image">
                            <PreviewCompatibleImage imageInfo={main.image3} />
                          </div>
                          <div className="card-content is-overlay is-overlay-bg is-flex is-justify-content-center is-align-content-center is-align-items-center">
                            <span className="is-size-3 has-text-centeredis-uppercase has-text-weight-semibold has-text-white is-uppercase">Testimonials</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <Link to="/book" className="img-hover-zoom">
                        <div className="card">
                          <div className="card-image">
                            <PreviewCompatibleImage imageInfo={main.image4} />
                          </div>
                          <div className="card-content is-overlay is-overlay-bg is-flex is-justify-content-center is-align-content-center is-align-items-center">
                            <span className="is-size-3 has-text-centeredis-uppercase has-text-weight-semibold has-text-white is-uppercase">Book a Trip</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </section>

      <RibbonCTA />
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
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image4: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
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
            gatsbyImageData(quality: 64, layout: FULL_WIDTH)
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
                gatsbyImageData(quality: 64, width: 435, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 64, layout: CONSTRAINED)
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 64, layout: CONSTRAINED)
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 64, layout: CONSTRAINED)
              }
            }
          }
          image4 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 64, layout: CONSTRAINED)
              }
            }
          }
        }
        testimonials {
          items {
            text
            author
          }
        }
      }
    }
  }
`;

import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import RibbonCTA from "../components/RibbonCTA";
import Features from "../components/Features";

// eslint-disable-next-line
export const AboutPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent,
  features,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <PageContent className="content" content={content} />
        </div>
      </section>
      {features ? (
        <Features gridItems={features.blurbs} />
      ) : null}
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  features: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        content={post.html}
        intro={frontmatter.intro}
      />
      <RibbonCTA />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 64, layout: FULL_WIDTH)
          }
        }
        subheading
        features {
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
      }
    }
  }
`;

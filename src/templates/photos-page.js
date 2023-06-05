import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import LightGallery from "../components/LightGallery";
import RibbonCTA from "../components/RibbonCTA";

// eslint-disable-next-line
export const PhotosPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent, 
  gallery
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;
  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <PageContent className="content" content={content} />
          {gallery ? (
            <div className="columns is-centered">
              <div className="column is-10 slideshow-container">
                  <LightGallery items={gallery.items} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <RibbonCTA />
    </div>
  );
};

PhotosPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  gallery: PropTypes.shape({
    items: PropTypes.array,
  }),
};

const PhotosPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PhotosPageTemplate
        contentComponent={HTMLContent}
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        gallery={frontmatter.gallery}
        content={post.html}
      />
    </Layout>
  );
};

PhotosPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PhotosPage;

export const photosPageQuery = graphql`
  query PhotosPage($id: String!) {
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
        gallery {
          items {
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO, WEBP], quality: 88)
              }
              childrenImageSharp {
                gatsbyImageData(layout: CONSTRAINED, height: 150, quality: 64)
              }
            }
          }
        }
      }
    }
  }
`;

import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import ImageGallery from "../components/ImageGallery";

// eslint-disable-next-line
export const PhotosPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent 
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;
  
  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <PageContent className="content" content={content} />
          {/* <ImageGallery images={images} /> */}
        </div>
      </section>
    </div>
  );
};

PhotosPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
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
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        subheading
      }
    }
  }
`;

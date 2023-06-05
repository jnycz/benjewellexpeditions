import React from "react";
import PropTypes from "prop-types";
import remark from 'remark'
import remarkHTML from 'remark-html'
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import RibbonCTA from "../components/RibbonCTA";
import { FaQuoteLeft } from "react-icons/fa";


// eslint-disable-next-line
export const TestimonialsPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent,
  items,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;
  const toHTML = value => remark()
                    .use(remarkHTML)
                    .processSync(value)
                    .toString()

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <PageContent className="content" content={content} />
          {/* {testimonials ? ( */}
            {items.map((item) => (
                <div className="columns">
                <div className="column">
                    <div className="is-centered content">
                    <FaQuoteLeft />
                    <div className='quote' dangerouslySetInnerHTML={{ __html: toHTML(item.text) }} />
                    <div className='author'>{item.author}</div>
                    </div>
                </div>
                </div>
            ))}
          {/* ) : null} */}
        </div>
      </section>
    </div>
  );
};

TestimonialsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  testimonials: PropTypes.shape({
    items: PropTypes.array,
  }),
};

const TestimonialsPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <TestimonialsPageTemplate
        contentComponent={HTMLContent}
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        content={post.html}
        testimonials={frontmatter.testimonials}
      />
      <RibbonCTA />
    </Layout>
  );
};

TestimonialsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TestimonialsPage;

export const TestimonialsPageQuery = graphql`
  query TestimonialsPage($id: String!) {
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

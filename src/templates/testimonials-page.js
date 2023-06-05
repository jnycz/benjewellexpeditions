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
import { v4 } from "uuid";

// eslint-disable-next-line
export const TestimonialsPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent,
  testimonials,
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
      <section className="section bg-light-light-blue testimonials">
        <div className="container">
          <PageContent className="content" content={content} />
            {testimonials.items.map((item) => (
                <div className="columns" key={v4()}>
                    <div className="column">
                        <div className="is-centered content card p-5">
                            <FaQuoteLeft />
                            <div className='quote is-size-5 has-text-grey title' dangerouslySetInnerHTML={{ __html: toHTML(item.text) }} />
                            <div className='author is-size-6 is-italic subtitle mt-1'>{item.author}</div>
                        </div>
                    </div>
                </div>
            ))}
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
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
          frontmatter: PropTypes.object,
        }),
      }),
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

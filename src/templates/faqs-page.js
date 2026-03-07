import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import RibbonCTA from "../components/RibbonCTA";

function parseFaqFromMarkdown(rawMarkdown) {
  if (!rawMarkdown || typeof rawMarkdown !== "string") return [];
  const blocks = rawMarkdown.split(/\n### /).filter(Boolean);
  return blocks.map((block) => {
    let q = block.trim();
    if (q.startsWith("### ")) q = q.slice(4);
    const firstLineBreak = q.indexOf("\n");
    const question = firstLineBreak > 0 ? q.slice(0, firstLineBreak).trim() : q.trim();
    let answer = firstLineBreak > 0 ? q.slice(firstLineBreak).trim() : "";
    answer = answer.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    return { question, answer };
  }).filter((faq) => faq.question && faq.answer);
}

// eslint-disable-next-line
export const FAQsPageTemplate = ({ 
  image,
  title,
  subheading,
  content, 
  contentComponent,
  faqSchema,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <div>
      {faqSchema && faqSchema.mainEntity?.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <PageContent className="content" content={content} />
        </div>
      </section>
    </div>
  );
};

FAQsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  faqSchema: PropTypes.object,
};

const FAQsPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;
  const faqPairs = parseFaqFromMarkdown(post.rawMarkdownBody);
  const faqSchema = faqPairs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  } : null;

  return (
    <Layout>
      <FAQsPageTemplate
        contentComponent={HTMLContent}
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        content={post.html}
        faqSchema={faqSchema}
      />
      <RibbonCTA />
    </Layout>
  );
};

FAQsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FAQsPage;

export const FAQsPageQuery = graphql`
  query FAQsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 50, layout: FULL_WIDTH)
          }
        }
        subheading
      }
    }
  }
`;

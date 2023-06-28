import * as React from "react";
import PropTypes from "prop-types";
import remark from 'remark'
import remarkHTML from 'remark-html'
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const toHTML = value => remark()
                    .use(remarkHTML)
                    .processSync(value)
                    .toString()

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-mobile is-centered">
    {gridItems.map((item) => (
      <div key={item.text} className="column">
        <PreviewCompatibleImage imageInfo={item} />  
        <div className="description" dangerouslySetInnerHTML={{ __html: toHTML(item.text) }} />
      </div>
    ))}
  </div>
);

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
};

export default FeatureGrid;

import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import PropTypes from 'prop-types'
//import { LightGallerySettings } from 'lightgallery/lg-settings';
//import { GATSBY_LIGHTGALLERY_LICENSE } from '../constants';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';



function Gallery({ items }) {
    const onInit = () => {
      //console.log('lightGallery has been initialized');
      //console.log(items)
    };

    return (
      <div>
          <LightGallery
            onInit={onInit}
            speed={500}
            licenseKey={GATSBY_LIGHTGALLERY_LICENSE}
            plugins={[lgZoom, lgThumbnail]}
            thumbnail
            download={false}
            elementClassNames="photo-grid"
          >
            {items.map((item) => (
              <a 
                href={item.image.childImageSharp.gatsbyImageData.images.fallback.src}
                data-lg-size={item.image.childImageSharp.gatsbyImageData.width + '-' +  + item.image.childImageSharp.gatsbyImageData.height}
                className="gallery-item"
              >
                <GatsbyImage image={item.image.childrenImageSharp[0].gatsbyImageData} />
              </a>
            ))}
          </LightGallery>
      </div>
    );
}
    Gallery.propTypes = {
      items: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
          text: PropTypes.string,
        })
      ),
    }
export default Gallery
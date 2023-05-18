import React from 'react'
import remark from 'remark'
import remarkHTML from 'remark-html'
import PropTypes from 'prop-types'
import SwiperCore, { Navigation, Pagination, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getImage, GatsbyImage } from "gatsby-plugin-image"

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Navigation, Pagination, Keyboard])

const toHTML = value => remark()
                    .use(remarkHTML)
                    .processSync(value)
                    .toString()

const Slideshow = ({ items }) => (

  <Swiper
    slidesPerView={1}
    navigation
    autoHeight={true}
    id={'gallery'}
    keyboard
  >
    {items.map((item) => (
      <SwiperSlide key={item.text}>
        <GatsbyImage
          image={item.image.childImageSharp.gatsbyImageData}
        />
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <p className="has-text-centered is-size-7 pt-2"><div dangerouslySetInnerHTML={{ __html: toHTML(item.text) }} /></p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

)

Slideshow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default Slideshow
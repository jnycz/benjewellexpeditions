import React from 'react'
import remark from 'remark'
import remarkHTML from 'remark-html'
import PropTypes from 'prop-types'
import SwiperCore, { Navigation, Pagination, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
//import { getImage, GatsbyImage } from "gatsby-plugin-image"

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Navigation, Pagination, Keyboard])

const toHTML = value => remark()
                    .use(remarkHTML)
                    .processSync(value)
                    .toString()

const Testimonials = ({ items }) => (

  <Swiper
    slidesPerView={1}
    autoHeight={false}
    loop={true}
    id={'testimonials'}
    keyboard
    autoPlay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      el: '.custom-pagination',
      clickable: true,
    }}
    style={{
        "--swiper-pagination-color": "#fff",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "12px",
        "--swiper-pagination-bullet-height": "12px",
        "--swiper-pagination-bullet-width": "12px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
      }}
      
    >
    {items.map((item) => (
      <SwiperSlide key={item.text}>
        <div className="columns">
          <div className="column">
            <div className="is-centered content">
              <div className='quote' dangerouslySetInnerHTML={{ __html: toHTML(item.text) }} />
              <div className='author'>{item.author}</div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
    <div className="custom-pagination" />
  </Swiper>

)

Testimonials.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default Testimonials
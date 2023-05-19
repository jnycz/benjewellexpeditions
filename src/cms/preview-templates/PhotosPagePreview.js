import React from 'react'
import PropTypes from 'prop-types'
import { PhotosPageTemplate } from '../../templates/photos-page'

const PhotosPagePreview = ({ entry, widgetFor }) => (
  <PhotosPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

PhotosPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PhotosPagePreview

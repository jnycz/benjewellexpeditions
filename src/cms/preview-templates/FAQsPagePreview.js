import React from 'react'
import PropTypes from 'prop-types'
import { FAQsPageTemplate } from '../../templates/faqs-page'

const FAQsPagePreview = ({ entry, widgetFor }) => (
  <FAQsPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

FAQsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default FAQsPagePreview

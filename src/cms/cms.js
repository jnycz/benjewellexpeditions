import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import FAQsPagePreview from './preview-templates/FAQsPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import PhotosPagePreview from './preview-templates/PhotosPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('faqs', FAQsPagePreview)
CMS.registerPreviewTemplate('photos', PhotosPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

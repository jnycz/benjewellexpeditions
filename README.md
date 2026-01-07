# Jewell Expeditions Website

A professional fly fishing guide service website built with Gatsby and Decap CMS. The site showcases Ben Jewell's year-round fishing guide service in the Ruidoso, New Mexico area.

**Live Site:** [jewellexpeditions.com](https://jewellexpeditions.com)

## About the Site

Jewell Expeditions is a year-round fly fishing guide service offering half and full day excursions on public lakes, freestone streams, and an exclusive private spring creek in the Ruidoso, New Mexico area. Ben Jewell, the guide, has over 17 years of experience in New Mexico, Montana, and Yellowstone National Park.

### Key Pages
- **Home** - Landing page with hero image, features, testimonials, and gallery links
- **About** - Guide background and experience
- **Book** - Trip booking form (Netlify Forms)
- **FAQs** - Frequently asked questions about trips, pricing, and requirements
- **Photos** - Photo gallery with lightbox
- **Testimonials** - Customer reviews and testimonials
- **Contact** - Contact form
- **Blog** - Blog posts (optional feature)

## Features

### Custom Features
- **Seasonal Modals** - Promotional pop-ups that appear:
  - Fall modal: September 22 - December 1
  - Winter modal: December 12 - March 1
  - Each modal has a 30-day dismissal window stored in localStorage
- **Responsive Design** - Mobile-first design using Bulma CSS framework
- **Image Optimization** - All images optimized via `gatsby-plugin-image`
- **CMS Integration** - Content managed through Decap CMS (formerly Netlify CMS)
- **Form Handling** - Contact and booking forms processed via Netlify Forms
- **SEO Optimized** - Canonical URLs, sitemap, robots.txt, and meta tags
- **Photo Gallery** - LightGallery integration for photo viewing
- **Testimonials Slider** - Swiper.js powered testimonial carousel

### Technical Stack
- **Framework:** Gatsby v5
- **CMS:** Decap CMS (Netlify CMS)
- **Styling:** Bulma CSS + Sass (with PurgeCSS)
- **Images:** Gatsby Image Plugin + Sharp
- **Deployment:** Netlify (with automatic deployments)
- **Analytics:** Google Analytics (G-58WYLVBMW7)
- **Fonts:** Roboto (loaded via gatsby-omni-font-loader)

## Prerequisites

- **Node.js** version 14.15.0 or higher (see `package.json` engines)
- **npm** or **yarn** package manager
- **Git** for version control

Optional:
- **Netlify CLI** for local development with functions: `npm install -g netlify-cli`

## Getting Started

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Development Server

Start the development server with hot reloading:

```bash
yarn develop
# or
npm run develop
```

The site will be available at `http://localhost:8000`

**Note:** The `develop` script automatically runs `gatsby clean` first to clear the cache.

### Build for Production

Create an optimized production build:

```bash
yarn build
# or
npm run build
```

### Serve Production Build Locally

Preview the production build:

```bash
yarn serve
# or
npm run serve
```

Serves the production build at `http://localhost:9000`

### Clean Cache

Clear Gatsby's cache and `.cache` directory:

```bash
yarn clean
# or
npm run clean
```

### Format Code

Format JavaScript files with Prettier:

```bash
yarn format
# or
npm run format
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Alias for `develop` |
| `yarn develop` | Start development server (cleans cache first) |
| `yarn build` | Build production site (cleans cache first) |
| `yarn serve` | Serve production build locally |
| `yarn clean` | Clear Gatsby cache |
| `yarn format` | Format code with Prettier |

## CMS Access

Content is managed through Decap CMS (formerly Netlify CMS).

### Access CMS in Production
Visit `https://jewellexpeditions.com/admin` and log in with Netlify Identity.

### Test CMS Locally

To test the CMS locally, you need to run a production build first:

```bash
yarn build
netlify dev
```

Or use the Netlify CMS proxy server:

```bash
# Terminal 1: Run Gatsby
yarn build
yarn serve

# Terminal 2: Run CMS proxy (auto-login)
npx netlify-cms-proxy-server
```

Then visit `http://localhost:8000/admin`

## Project Structure

```
benjewellexpeditions/
├── src/
│   ├── components/      # React components (Layout, Navbar, Footer, etc.)
│   ├── pages/          # Page templates and markdown content
│   ├── templates/      # Page templates for CMS content
│   ├── cms/            # CMS configuration and preview templates
│   └── img/            # Logo and icon assets
├── static/
│   ├── admin/          # CMS configuration (config.yml)
│   └── img/            # Static image assets
├── netlify/
│   └── functions/      # Netlify serverless functions
├── gatsby-config.js    # Gatsby configuration
├── gatsby-node.js      # Gatsby Node APIs
└── netlify.toml        # Netlify deployment configuration
```

## Key Configuration Files

- **`gatsby-config.js`** - Gatsby plugins and site configuration
- **`static/admin/config.yml`** - Decap CMS content model and collections
- **`netlify.toml`** - Netlify deployment settings
- **`package.json`** - Dependencies and scripts

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

### Manual Deployment

If using Netlify CLI:

```bash
netlify deploy --prod
```

### Environment Variables

The site uses environment variables for:
- Site URL (defaults to `https://jewellexpeditions.com`)
- Google Analytics tracking ID (hardcoded in `gatsby-config.js`)

## Custom Features Explained

### Seasonal Modals

Located in `src/components/Layout.js`, the seasonal modals automatically appear during specific date ranges:

- **Fall Modal** (Sep 22 - Dec 1): Promotes fall fishing season
- **Winter Modal** (Dec 12 - Mar 1): Promotes winter fishing season

Each modal:
- Shows once per 30-day period (stored in localStorage)
- Respects date windows (only shows during specified seasons)
- Can be dismissed and won't reappear for 30 days
- Links to the booking page

To modify modal dates or messages, edit the date logic and content in `Layout.js`.

### Form Handling

Contact and booking forms use Netlify Forms. Form submissions are sent to Netlify and can be viewed in the Netlify dashboard under Forms.

Form configuration:
- Booking form: `/src/pages/book/index.js`
- Contact form: `/src/pages/contact/index.js`

Both forms include:
- Netlify Forms integration (`data-netlify="true"`)
- Honeypot field for spam protection
- Form name for submission tracking

## Browser Support

See `package.json` for browserslist configuration. Production build targets:
- Last 2 versions of major browsers
- Firefox ESR
- >0.5% global usage
- Not dead browsers
- Not Opera Mini

## Troubleshooting

### Build Issues

If you encounter build errors:
1. Clear cache: `yarn clean`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && yarn install`
3. Check Node.js version: Should be >= 14.15.0

### Image Issues

If images aren't loading:
- Ensure images are in `/static/img/` or properly referenced in markdown frontmatter
- Check that image paths in markdown use `/img/` prefix
- Verify `gatsby-source-filesystem` paths in `gatsby-config.js`

### CMS Access Issues

If you can't access the CMS:
- Verify Netlify Identity is enabled in Netlify dashboard
- Check that `static/admin/config.yml` exists
- Ensure you're logged into Netlify Identity

## License

MIT

## Contact

For questions about the site or booking a trip:
- **Website:** [jewellexpeditions.com](https://jewellexpeditions.com)
- **Email:** [jewellexpeditions@gmail.com](mailto:jewellexpeditions@gmail.com)
- **Phone:** (575) 973-1396

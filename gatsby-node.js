const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const fs = require('fs')

const SITE_STATUS_QUERY = `
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/site-status/" } }) {
      edges {
        node {
          frontmatter {
            maintenance {
              enabled
            }
          }
        }
      }
    }
  }
`

const isMaintenanceMode = async (graphql) => {
  const result = await graphql(SITE_STATUS_QUERY)
  return (
    result.data?.allMarkdownRemark?.edges?.[0]?.node?.frontmatter?.maintenance
      ?.enabled === true
  )
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  // While the site is in maintenance mode, any unknown URL should serve the
  // relocation splash with a 200 rather than dead-ending on a 404. Netlify only
  // applies this rule when no real page matches, so existing routes are
  // untouched. Driven by the same CMS flag as everything else, so turning
  // maintenance off drops the rule on the next build.
  if (await isMaintenanceMode(graphql)) {
    createRedirect({
      fromPath: `/*`,
      toPath: `/`,
      statusCode: 200,
    })
  }

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    // Only create pages for markdown files that have a templateKey (excludes data files like seasonal.md).
    const edgesWithTemplate = result.data.allMarkdownRemark.edges.filter(
      (edge) => edge.node.frontmatter?.templateKey
    )

    // Testimonials.
    const testimonials = edgesWithTemplate
    testimonials.forEach((edge) => {
        const id = edge.node.id
        createPage({
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(
                `src/templates/index-page.js`
            ),
            context: {
                id,
            },
        })
    })

    // Posts.
    const posts = edgesWithTemplate
    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    ignoreWarnings: [
      {
        module: /gatsby-plugin-netlify-cms/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ],
  })
}

// `createRedirect` above only reaches Netlify through gatsby-adapter-netlify,
// which engages when it detects a Netlify build. Write the rule directly as
// well so the catch-all does not depend on that detection. Skipped when a
// catch-all is already present, and not written at all once maintenance mode
// is switched off.
exports.onPostBuild = async ({ graphql }) => {
  if (!(await isMaintenanceMode(graphql))) return

  const redirectsPath = path.join(__dirname, 'public', '_redirects')
  const rule = '/*  /index.html  200'

  let existing = ''
  try {
    existing = fs.readFileSync(redirectsPath, 'utf8')
  } catch (e) {
    // No _redirects yet — we are writing the first one.
  }

  if (existing.split('\n').some((line) => line.trim().startsWith('/*'))) return

  const next = existing.trim() ? `${existing.trimEnd()}\n${rule}\n` : `${rule}\n`
  fs.writeFileSync(redirectsPath, next)
}

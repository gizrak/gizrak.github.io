const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark`) return

  const fileNode = getNode(node.parent)
  const sourceInstanceName = fileNode.sourceInstanceName

  // Track which content source this node belongs to
  createNodeField({
    node,
    name: `sourceInstanceName`,
    value: sourceInstanceName,
  })

  if (sourceInstanceName === `posts`) {
    // Replicate Jekyll permalink: /:categories/:title/
    // Handle both "categories" (array) and "category" (array) frontmatter keys
    const categoriesRaw = node.frontmatter.categories || node.frontmatter.category || []
    const allCategories = Array.isArray(categoriesRaw) ? categoriesRaw : [categoriesRaw]

    const firstCategory = allCategories.length > 0 ? allCategories[0] : `uncategorized`

    // Filename is YYYY-MM-DD-title-slug.md — strip the date prefix
    const filename = fileNode.name // e.g. "2020-07-10-Wordpress-블로그-Jekyll로-가져오기"
    const datePrefixMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
    const titleSlug = datePrefixMatch
      ? filename.slice(datePrefixMatch[0].length)
      : filename

    const slug = `/${firstCategory}/${titleSlug}/`

    // Extract date from filename if frontmatter.date is missing
    let date = node.frontmatter.date || ``
    if (!date && datePrefixMatch) {
      date = datePrefixMatch[1]
    }

    createNodeField({ node, name: `slug`, value: slug })
    createNodeField({ node, name: `category`, value: firstCategory })
    createNodeField({ node, name: `allCategories`, value: allCategories })
    createNodeField({ node, name: `date`, value: date })

  } else if (sourceInstanceName === `notes`) {
    // /notes/:filename/
    const slug = `/notes/${fileNode.name}/`
    createNodeField({ node, name: `slug`, value: slug })

  } else if (sourceInstanceName === `portfolio`) {
    // /portfolio/:filename/
    const slug = `/portfolio/${fileNode.name}/`
    createNodeField({ node, name: `slug`, value: slug })

  } else if (sourceInstanceName === `pages`) {
    // Static pages — use filename as slug
    const slug = `/${fileNode.name}/`
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            sourceInstanceName
            category
            allCategories
            date
          }
          frontmatter {
            title
            date
            categories
            category
            type
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading markdown nodes`, result.errors)
    return
  }

  const allNodes = result.data.allMarkdownRemark.nodes
  const posts = allNodes.filter(n => n.fields.sourceInstanceName === `posts`)
  const notes = allNodes.filter(n => n.fields.sourceInstanceName === `notes`)
  const portfolioItems = allNodes.filter(n => n.fields.sourceInstanceName === `pages` && n.frontmatter.type === `portfolio`)

  // Sort posts by date descending
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.fields.date || a.frontmatter.date || ``
    const dateB = b.fields.date || b.frontmatter.date || ``
    return dateB.localeCompare(dateA)
  })

  // Create individual post pages
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  sortedPosts.forEach((post, index) => {
    const prev = index > 0 ? sortedPosts[index - 1] : null
    const next = index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null
    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        id: post.id,
        prevId: prev ? prev.id : null,
        nextId: next ? next.id : null,
      },
    })
  })

  // Create paginated home page (10 posts per page)
  paginate({
    createPage,
    items: sortedPosts,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/` : `/page`),
    component: path.resolve(`./src/templates/index.js`),
  })

  // Create individual note pages
  const noteTemplate = path.resolve(`./src/templates/note.js`)
  notes.forEach(note => {
    createPage({
      path: note.fields.slug,
      component: noteTemplate,
      context: { id: note.id },
    })
  })

  // Create individual portfolio pages
  const portfolioItemTemplate = path.resolve(`./src/templates/portfolio-item.js`)
  portfolioItems.forEach(item => {
    createPage({
      path: item.fields.slug,
      component: portfolioItemTemplate,
      context: { id: item.id },
    })
  })

  // Create category archive pages
  const categorySet = new Set()
  posts.forEach(post => {
    const cats = post.fields.allCategories || []
    cats.forEach(cat => {
      if (cat) categorySet.add(cat)
    })
  })

  const categoryTemplate = path.resolve(`./src/templates/category.js`)
  categorySet.forEach(category => {
    createPage({
      path: `/categories/${encodeURIComponent(category)}/`,
      component: categoryTemplate,
      context: { category },
    })
  })
}

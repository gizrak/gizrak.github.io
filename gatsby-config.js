module.exports = {
  siteMetadata: {
    title: `Try to Remember`,
    author: {
      name: `Ted Hwang`,
      summary: `🌱 매일 성장 중!`,
    },
    description: `Always with me`,
    siteUrl: `https://gizrak.github.io`,
    social: {
      twitter: `gizrak`,
      github: `gizrak`,
      facebook: `gizrak`,
      linkedin: `gizrak`,
      instagram: `gizrak`,
    },
    utterances: {
      repo: `gizrak/gizrak.github.io`,
      theme: `github-light`,
      issueTerm: `pathname`,
    },
  },
  plugins: [
    // Posts
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    // Notes
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/content/notes`,
      },
    },
    // Portfolio
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/content/portfolio`,
      },
    },
    // Static pages (about)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    // Markdown transformer
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // Google Analytics (Universal Analytics via gtag)
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-48627058-2`],
        pluginConfig: {
          head: true,
        },
      },
    },
    // SEO
    `gatsby-plugin-react-helmet`,
    // Sitemap
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
      },
    },
    // RSS Feed
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.fields.date || node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(
                filter: { fields: { sourceInstanceName: { eq: "posts" } } }
                sort: { fields: { date: DESC } }
                limit: 30
              ) {
                nodes {
                  excerpt
                  html
                  fields { slug date }
                  frontmatter { title date }
                }
              }
            }`,
            output: `/feed.xml`,
            title: `Try to Remember RSS Feed`,
          },
        ],
      },
    },
    // Web Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Try to Remember`,
        short_name: `gizrak`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/assets/images/icon.svg`,
      },
    },
  ],
}

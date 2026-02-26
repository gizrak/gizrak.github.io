import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Toc from "../components/toc"
import Utterances from "../components/utterances"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const date = post.frontmatter.date || post.fields.date
  const allCategories = post.fields.allCategories || []
  const siteUrl = data.site.siteMetadata.siteUrl
  const authorName = data.site.siteMetadata.author.name

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.excerpt,
    url: `${siteUrl}${post.fields.slug}`,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: data.site.siteMetadata.title,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${post.fields.slug}`,
    },
  }

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        url={post.fields.slug}
        type="article"
        article={{
          publishedTime: date,
          author: authorName,
        }}
      >
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Seo>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header className="post-header">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="post-meta">
            {date && <time dateTime={date} itemProp="datePublished">{date}</time>}
            {allCategories.length > 0 && (
              <span className="post-categories">
                {allCategories.map(cat => (
                  <Link key={cat} to={`/categories/${encodeURIComponent(cat)}/`} className="post-category">
                    {cat}
                  </Link>
                ))}
              </span>
            )}
          </div>
        </header>

        {post.tableOfContents && (
          <Toc toc={post.tableOfContents} />
        )}

        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="post-body"
        />

        {/* Gallery from frontmatter (replaces {% include gallery %} Liquid tags) */}
        {post.frontmatter.gallery && post.frontmatter.gallery.length > 0 && (
          <div className="post-gallery">
            {post.frontmatter.gallery.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noreferrer">
                <img src={img.image_path || img.url} alt={img.alt || ``} loading="lazy" />
              </a>
            ))}
          </div>
        )}
        {post.frontmatter.gallery1 && post.frontmatter.gallery1.length > 0 && (
          <div className="post-gallery">
            {post.frontmatter.gallery1.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noreferrer">
                <img src={img.image_path || img.url} alt={img.alt || ``} loading="lazy" />
              </a>
            ))}
          </div>
        )}
        {post.frontmatter.gallery2 && post.frontmatter.gallery2.length > 0 && (
          <div className="post-gallery">
            {post.frontmatter.gallery2.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noreferrer">
                <img src={img.image_path || img.url} alt={img.alt || ``} loading="lazy" />
              </a>
            ))}
          </div>
        )}
        {post.frontmatter.gallery3 && post.frontmatter.gallery3.length > 0 && (
          <div className="post-gallery">
            {post.frontmatter.gallery3.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noreferrer">
                <img src={img.image_path || img.url} alt={img.alt || ``} loading="lazy" />
              </a>
            ))}
          </div>
        )}
      </article>

      <nav className="post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Utterances />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $prevId: String
    $nextId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      fields {
        slug
        date
        allCategories
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        gallery {
          url
          image_path
          alt
        }
        gallery1 {
          url
          image_path
        }
        gallery2 {
          url
          image_path
        }
        gallery3 {
          url
          image_path
        }
      }
    }
    previous: markdownRemark(id: { eq: $prevId }) {
      fields { slug }
      frontmatter { title }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      fields { slug }
      frontmatter { title }
    }
  }
`

export default BlogPostTemplate

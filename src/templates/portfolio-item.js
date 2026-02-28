import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PortfolioItemTemplate = ({ data }) => {
  const item = data.markdownRemark

  return (
    <Layout>
      <Seo title={item.frontmatter.title} />
      <article className="portfolio-post">
        <header className="post-header">
          {item.frontmatter.header?.image && (
            <img
              src={item.frontmatter.header.image}
              alt={item.frontmatter.title}
              className="portfolio-header-image"
            />
          )}
          <h1>{item.frontmatter.title}</h1>
          {item.frontmatter.excerpt && (
            <p className="portfolio-excerpt">{item.frontmatter.excerpt}</p>
          )}
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: item.html }}
          className="post-body"
        />

        {item.frontmatter.gallery && item.frontmatter.gallery.length > 0 && (
          <div className="post-gallery">
            {item.frontmatter.gallery.map((img, i) => (
              <a key={i} href={img.url} target="_blank" rel="noreferrer">
                <img src={img.image_path || img.url} alt={img.alt || ``} loading="lazy" />
              </a>
            ))}
          </div>
        )}
      </article>

      <div className="back-link">
        <Link to="/about/">← About으로</Link>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PortfolioItemById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        excerpt
        header {
          image
        }
        gallery {
          url
          image_path
          alt
        }
      }
    }
  }
`

export default PortfolioItemTemplate

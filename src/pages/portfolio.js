import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PortfolioPage = ({ data }) => {
  const items = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title="Portfolio" />
      <header className="page-header">
        <h1>Portfolio</h1>
        <p>학습 목적 혹은 개인 프로젝트로 만들었던 서비스와 앱들입니다.</p>
      </header>

      <div className="portfolio-grid">
        {items.map(item => (
          <article key={item.fields.slug} className="portfolio-card">
            {item.frontmatter.header?.image && (
              <img
                src={item.frontmatter.header.image}
                alt={item.frontmatter.title}
                className="portfolio-card-image"
                loading="lazy"
              />
            )}
            <div className="portfolio-card-body">
              <h2>
                <Link to={item.fields.slug}>{item.frontmatter.title}</Link>
              </h2>
              {item.frontmatter.excerpt && (
                <p>{item.frontmatter.excerpt}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PortfolioIndex {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
    ) {
      nodes {
        fields { slug }
        frontmatter {
          title
          excerpt
          header {
            image
          }
        }
      }
    }
  }
`

export default PortfolioPage

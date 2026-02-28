import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectItemTemplate = ({ data }) => {
  const item = data.markdownRemark

  return (
    <Layout>
      <Seo title={item.frontmatter.title} />
      <article className="project-post">
        <header className="post-header">
          {item.frontmatter.header?.image && (
            <img
              src={item.frontmatter.header.image}
              alt={item.frontmatter.title}
              className="project-header-image"
            />
          )}
          <h1>{item.frontmatter.title}</h1>
          {item.frontmatter.excerpt && (
            <p className="project-excerpt">{item.frontmatter.excerpt}</p>
          )}
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: item.html }}
          className="post-body"
        />

      </article>

      <div className="back-link">
        <Link to="/about/">← About으로</Link>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProjectItemById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        excerpt
        header {
          image
        }
      }
    }
  }
`

export default ProjectItemTemplate

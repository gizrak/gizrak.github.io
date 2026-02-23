import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Toc from "../components/toc"

const AboutPage = ({ data }) => {
  const page = data.markdownRemark

  return (
    <Layout>
      <Seo title="About" />
      <article className={`about-page${page.tableOfContents ? ` has-toc` : ``}`}>
        <header className="post-header">
          <h1>{page.frontmatter.title}</h1>
        </header>
        {page.tableOfContents && <Toc toc={page.tableOfContents} />}
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
          className="post-body"
        />
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutPage {
    markdownRemark(
      fields: { sourceInstanceName: { eq: "pages" } }
    ) {
      html
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`

export default AboutPage

import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Toc from "../components/toc"

const LinksPage = ({ data }) => {
  const page = data.markdownRemark

  return (
    <Layout>
      <Seo title="Links" />
      <header className="page-header">
        <h1>{page.frontmatter.title}</h1>
      </header>
      {page.tableOfContents && <Toc toc={page.tableOfContents} />}
      <section
        dangerouslySetInnerHTML={{ __html: page.html }}
        className="post-body"
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query LinksPage {
    markdownRemark(
      fields: { sourceInstanceName: { eq: "pages" }, slug: { eq: "/links/" } }
    ) {
      html
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`

export default LinksPage

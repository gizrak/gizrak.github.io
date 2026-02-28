import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Toc from "../../components/toc"

const RealEstatePlatformPage = ({ data }) => {
  const page = data.markdownRemark

  return (
    <Layout>
      <Seo title={page.frontmatter.title} />
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
  query RealEstatePlatformPage {
    markdownRemark(
      fields: { sourceInstanceName: { eq: "pages" }, slug: { eq: "/realestate-platform/" } }
    ) {
      html
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`

export default RealEstatePlatformPage

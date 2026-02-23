import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Bio from "../components/bio"
import Seo from "../components/seo"

const IndexTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.nodes
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

  if (posts.length === 0) {
    return (
      <Layout>
        <Seo title="Home" />
        <Bio />
        <p>포스트가 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title="Home" />
      {humanPageNumber === 1 && <Bio />}
      <ol className="post-list">
        {posts.map(post => {
          const title = post.frontmatter.title
          const date = post.fields.date || post.frontmatter.date
          return (
            <li key={post.fields.slug}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>

      <nav className="pagination">
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev">← 이전 페이지</Link>
        )}
        <span className="pagination-info">
          {humanPageNumber} / {numberOfPages}
        </span>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next">다음 페이지 →</Link>
        )}
      </nav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      sort: { fields: { date: DESC } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields { slug date }
        frontmatter { title date }
      }
    }
  }
`

export default IndexTemplate

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title={`${category}`} />
      <header className="page-header">
        <h1>{category}</h1>
        <p className="archive-count">{posts.length}개의 글</p>
      </header>

      <ol className="post-list">
        {posts.map(post => {
          const title = post.frontmatter.title
          const date = post.fields.date || post.frontmatter.date
          return (
            <li key={post.fields.slug}>
              <article>
                <h2>
                  <Link to={post.fields.slug}>{title}</Link>
                </h2>
                {date && <small>{date}</small>}
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsByCategory($category: String!) {
    allMarkdownRemark(
      filter: {
        fields: {
          sourceInstanceName: { eq: "posts" }
          allCategories: { in: [$category] }
        }
      }
      sort: { fields: { date: DESC } }
    ) {
      nodes {
        fields { slug date allCategories }
        frontmatter { title date }
      }
    }
  }
`

export default CategoryTemplate

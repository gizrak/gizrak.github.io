import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostsArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  // Group by year
  const byYear = posts.reduce((acc, post) => {
    const date = post.fields.date || post.frontmatter.date || ``
    const year = date.substring(0, 4) || `Unknown`
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => b - a)

  return (
    <Layout>
      <Seo title="Blog" />
      <header className="page-header">
        <h1>Blog</h1>
        <p className="archive-count">총 {posts.length}개의 글</p>
      </header>

      {years.map(year => (
        <section key={year} className="archive-year">
          <h2>{year}</h2>
          <ol className="archive-list">
            {byYear[year].map(post => {
              const date = post.fields.date || post.frontmatter.date
              return (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                  {date && <small> — {date}</small>}
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      sort: { fields: { date: DESC } }
    ) {
      nodes {
        fields { slug date }
        frontmatter { title date }
      }
    }
  }
`

export default PostsArchivePage

import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostsArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const [activeCategory, setActiveCategory] = useState(null)

  // Collect all unique categories
  const categorySet = new Set()
  posts.forEach(post => {
    const cats = post.fields.allCategories || []
    cats.forEach(cat => {
      if (cat) categorySet.add(cat)
    })
  })
  const categories = Array.from(categorySet).sort((a, b) =>
    a.localeCompare(b, "ko")
  )

  // Filter posts by active category
  const filteredPosts = activeCategory
    ? posts.filter(post =>
        (post.fields.allCategories || []).includes(activeCategory)
      )
    : posts

  // Group by year
  const byYear = filteredPosts.reduce((acc, post) => {
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

      <div className="category-filter">
        <button
          className={`category-filter-btn${!activeCategory ? " active" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          전체
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {activeCategory && (
        <p className="category-filter-count">
          <strong>{activeCategory}</strong> — {filteredPosts.length}개의 글
        </p>
      )}

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
        fields { slug date allCategories }
        frontmatter { title date }
      }
    }
  }
`

export default PostsArchivePage

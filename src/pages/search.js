import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SearchPage = ({ data, location }) => {
  const allPosts = data.allMarkdownRemark.nodes

  // Read initial query from URL params
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(location.search)
      : new URLSearchParams()
  const initialQuery = params.get("q") || ""

  const [query, setQuery] = useState(initialQuery)

  // Update URL when query changes
  useEffect(() => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    if (query) {
      url.searchParams.set("q", query)
    } else {
      url.searchParams.delete("q")
    }
    window.history.replaceState({}, "", url.toString())
  }, [query])

  const lowerQuery = query.toLowerCase().trim()

  const results = lowerQuery
    ? allPosts.filter(post => {
        const title = (post.frontmatter.title || "").toLowerCase()
        const excerpt = (post.excerpt || "").toLowerCase()
        const categories = (post.fields.allCategories || [])
          .join(" ")
          .toLowerCase()
        return (
          title.includes(lowerQuery) ||
          excerpt.includes(lowerQuery) ||
          categories.includes(lowerQuery)
        )
      })
    : []

  return (
    <Layout>
      <Seo title="검색" />
      <header className="page-header">
        <h1>검색</h1>
      </header>

      <div className="search-box">
        <input
          type="search"
          className="search-input"
          placeholder="제목, 내용, 카테고리로 검색..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {lowerQuery && (
        <p className="search-count">
          <strong>&ldquo;{query}&rdquo;</strong> 검색 결과:{" "}
          {results.length}개
        </p>
      )}

      {results.length > 0 ? (
        <ol className="search-results">
          {results.map(post => {
            const date = post.fields.date || post.frontmatter.date
            const categories = post.fields.allCategories || []
            return (
              <li key={post.fields.slug} className="search-result-item">
                <Link to={post.fields.slug} className="search-result-title">
                  {post.frontmatter.title}
                </Link>
                <div className="search-result-meta">
                  {date && <small className="search-result-date">{date}</small>}
                  {categories.length > 0 && (
                    <span className="search-result-categories">
                      {categories.map(cat => (
                        <span key={cat} className="post-category">
                          {cat}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                {post.excerpt && (
                  <p className="search-result-excerpt">{post.excerpt}</p>
                )}
              </li>
            )
          })}
        </ol>
      ) : lowerQuery ? (
        <p className="search-empty">검색 결과가 없습니다.</p>
      ) : null}
    </Layout>
  )
}

export const pageQuery = graphql`
  query SearchPosts {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      sort: { fields: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 120)
        fields {
          slug
          date
          allCategories
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`

export default SearchPage

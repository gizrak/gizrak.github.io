import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SearchPage = ({ data, location }) => {
  const allItems = data.allMarkdownRemark.nodes

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
    ? allItems.filter(item => {
        const title = (item.frontmatter.title || "").toLowerCase()
        const excerpt = (item.excerpt || "").toLowerCase()

        // posts use fields.allCategories, notes use frontmatter.category
        const postCats = (item.fields.allCategories || []).join(" ").toLowerCase()
        const noteCatsRaw = item.frontmatter.category || []
        const noteCats = (
          Array.isArray(noteCatsRaw) ? noteCatsRaw : [noteCatsRaw]
        )
          .join(" ")
          .toLowerCase()

        return (
          title.includes(lowerQuery) ||
          excerpt.includes(lowerQuery) ||
          postCats.includes(lowerQuery) ||
          noteCats.includes(lowerQuery)
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
          {results.map(item => {
            const date = item.fields.date || item.frontmatter.date
            const sourceInstance = item.fields.sourceInstanceName
            const isNote = sourceInstance === "notes"
            const isPage = sourceInstance === "pages"

            const categories = isNote
              ? (() => {
                  const raw = item.frontmatter.category || []
                  return Array.isArray(raw) ? raw : [raw]
                })()
              : item.fields.allCategories || []

            const typeLabel = isNote ? "Note" : isPage ? "Link" : "Blog"
            const typeClass = isNote
              ? "search-result-type--note"
              : isPage
                ? "search-result-type--page"
                : "search-result-type--post"

            return (
              <li key={item.fields.slug} className="search-result-item">
                <Link to={item.fields.slug} className="search-result-title">
                  {item.frontmatter.title}
                </Link>
                <div className="search-result-meta">
                  <span className={`search-result-type ${typeClass}`}>
                    {typeLabel}
                  </span>
                  {date && (
                    <small className="search-result-date">{date}</small>
                  )}
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
                {item.excerpt && (
                  <p className="search-result-excerpt">{item.excerpt}</p>
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
  query SearchAll {
    allMarkdownRemark(
      filter: {
        fields: { sourceInstanceName: { in: ["posts", "notes", "pages"] } }
      }
      sort: { fields: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 120)
        fields {
          slug
          date
          allCategories
          sourceInstanceName
        }
        frontmatter {
          title
          date
          category
        }
      }
    }
  }
`

export default SearchPage

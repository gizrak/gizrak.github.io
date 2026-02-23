import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotesPage = ({ data }) => {
  const notes = data.allMarkdownRemark.nodes

  // Group by first category
  const grouped = notes.reduce((acc, note) => {
    const cats = note.frontmatter.category || []
    const catArr = Array.isArray(cats) ? cats : [cats]
    const key = catArr[0] || `기타`
    if (!acc[key]) acc[key] = []
    acc[key].push(note)
    return acc
  }, {})

  const sortedGroups = Object.keys(grouped).sort()

  return (
    <Layout>
      <Seo title="Notes" />
      <header className="page-header">
        <h1>Notes</h1>
        <p>정리한 용어·개념 문서 목록입니다. 카테고리별로 묶었습니다.</p>
      </header>

      <div className="notes-index">
        {sortedGroups.map(cat => (
          <div key={cat} className="notes-category">
            <h3 className="notes-category__title">{cat}</h3>
            <ul className="notes-category__list">
              {grouped[cat]
                .sort((a, b) =>
                  a.frontmatter.title.localeCompare(b.frontmatter.title, `ko`)
                )
                .map(note => (
                  <li key={note.fields.slug}>
                    <Link to={note.fields.slug}>{note.frontmatter.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query NotesIndex {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "notes" } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        fields { slug }
        frontmatter {
          title
          category
        }
      }
    }
  }
`

export default NotesPage

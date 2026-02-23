import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Toc from "../components/toc"

const NoteTemplate = ({ data }) => {
  const note = data.markdownRemark
  const categories = note.frontmatter.category || []

  return (
    <Layout>
      <Seo title={note.frontmatter.title} />
      <article className="note-post">
        <header className="post-header">
          <h1>{note.frontmatter.title}</h1>
          {categories.length > 0 && (
            <p className="note-category">
              {Array.isArray(categories) ? categories.join(`, `) : categories}
            </p>
          )}
        </header>

        {note.tableOfContents && (
          <Toc toc={note.tableOfContents} />
        )}

        <section
          dangerouslySetInnerHTML={{ __html: note.html }}
          className="post-body"
        />
      </article>

      <div className="back-link">
        <Link to="/notes/">← 노트 목록으로</Link>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query NoteById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      tableOfContents
      frontmatter {
        title
        category
      }
    }
  }
`

export default NoteTemplate

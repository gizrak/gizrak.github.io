import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Bio from "../components/bio"
import Seo from "../components/seo"

const IndexTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.nodes
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext
  const { siteUrl, title, description, author, social } = data.site.siteMetadata

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url: siteUrl,
    description: description,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${siteUrl}/about`,
      sameAs: [
        `https://twitter.com/${social.twitter}`,
        `https://github.com/${social.github}`,
        `https://linkedin.com/in/${social.linkedin}`,
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/posts?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  if (posts.length === 0) {
    return (
      <Layout>
        <Seo title="Home" url="/">
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Seo>
        <Bio />
        <p>포스트가 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title="Home" url={humanPageNumber === 1 ? "/" : `/page/${humanPageNumber}/`}>
        {humanPageNumber === 1 && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Seo>
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
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
        }
        social {
          twitter
          github
          linkedin
        }
      }
    }
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

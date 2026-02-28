import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            facebook
            linkedin
            instagram
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div className="bio">
      <img
        src="/images/ted-hwang.jpg"
        alt={author.name}
        className="bio-avatar"
        width="50"
        height="50"
      />
      <div className="bio-content">
        <p className="bio-name">
          <strong>{author.name}</strong>
        </p>
        {author.summary && (
          <p className="bio-summary">{author.summary}</p>
        )}
        <p className="bio-links">
          {social.twitter && (
            <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noreferrer">
              Twitter
            </a>
          )}
          {social.facebook && (
            <a href={`https://www.facebook.com/${social.facebook}`} target="_blank" rel="noreferrer">
              Facebook
            </a>
          )}
          {social.linkedin && (
            <a href={`https://www.linkedin.com/in/${social.linkedin}/`} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {social.github && (
            <a href={`https://github.com/${social.github}`} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {social.instagram && (
            <a href={`https://www.instagram.com/${social.instagram}/`} target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
        </p>
      </div>
    </div>
  )
}

export default Bio

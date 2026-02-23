import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"

const Utterances = () => {
  const data = useStaticQuery(graphql`
    query UtterancesQuery {
      site {
        siteMetadata {
          utterances {
            repo
            theme
            issueTerm
          }
        }
      }
    }
  `)

  const { repo, theme, issueTerm } = data.site.siteMetadata.utterances
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement(`script`)
    script.src = `https://utteranc.es/client.js`
    script.async = true
    script.setAttribute(`repo`, repo)
    script.setAttribute(`issue-term`, issueTerm)
    script.setAttribute(`theme`, theme)
    script.setAttribute(`crossorigin`, `anonymous`)

    // Clear previous instance if any (e.g. hot-reload)
    containerRef.current.innerHTML = ``
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ``
      }
    }
  }, [repo, theme, issueTerm])

  return <div ref={containerRef} className="utterances-container" />
}

export default Utterances

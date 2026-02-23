import React, { useEffect, useState, useRef } from "react"
import * as styles from "./toc.module.css"

const Toc = ({ toc }) => {
  const [activeId, setActiveId] = useState(``)
  const observerRef = useRef(null)

  useEffect(() => {
    const headings = document.querySelectorAll(
      `article h2, article h3, article h4`
    )

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    headings.forEach(h => observerRef.current.observe(h))
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  if (!toc) return null

  return (
    <nav className={styles.toc} aria-label="목차">
      <p className={styles.tocTitle}>목차</p>
      <div
        dangerouslySetInnerHTML={{ __html: toc }}
        className={`${styles.tocContent} ${activeId ? styles[`active-${activeId}`] : ``}`}
      />
    </nav>
  )
}

export default Toc

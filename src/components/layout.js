import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <nav className="global-nav">
          <Link to="/" className="nav-home">
            Try to Remember
          </Link>
          <div className="nav-links">
            <Link to="/about/">About</Link>
            <Link to="/posts/">Blog</Link>
            <Link to="/portfolio/">Portfolio</Link>
            <Link to="/notes/">Notes</Link>
            <Link to="/search/" className="nav-search" aria-label="검색">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="global-footer">
        <p>
          © {new Date().getFullYear()} Ted Hwang · Built with{` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </p>
      </footer>
    </div>
  )
}

export default Layout

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

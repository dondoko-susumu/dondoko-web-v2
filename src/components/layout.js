import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, title, children, rootPath = false }) => {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header title={title} rootPath={rootPath} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

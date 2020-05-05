import React from "react"

import { rhythm } from "../utils/typography"
import SelectLaunguage from "./selectLanguage"
import Header from "./header"
import BlogHeader from "./blogHeader"
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
      {rootPath && <Header title={title} />}
      {!rootPath && <BlogHeader title={title} />}
      {rootPath &&
        <div
          style={{
            display: `flex`,
            justifyContent: `flex-end`
          }}
        >
          <SelectLaunguage />
        </div>
      }
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

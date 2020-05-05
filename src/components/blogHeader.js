import React from "react"

import { rhythm } from "../utils/typography"
import Link from "./localizedLink"

const BlogHeader = ({ title }) => {
  const header = (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  )

  return (
    <header>{header}</header>
  )
}

export default BlogHeader

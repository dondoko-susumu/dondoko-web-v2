import React from "react"
import useTranslations from "../components/useTranslations"
import { rhythm } from "../utils/typography"

const Footer = () => {
  const { author } = useTranslations();
  return (
    <footer
      style={{
        marginTop: rhythm(1.5),
      }}
    >
      © {author} 2008 - {new Date().getFullYear()}
    </footer>
  )
}

export default Footer

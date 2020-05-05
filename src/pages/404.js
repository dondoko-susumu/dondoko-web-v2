import React from "react"
import { graphql } from "gatsby"

import useTranslations from "../components/useTranslations"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const {
    siteTitle,
    notFound,
    notFoundDescription,
  } = useTranslations()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`404: ${notFound}`} />
      <h1>{notFound}</h1>
      <p>{notFoundDescription}</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

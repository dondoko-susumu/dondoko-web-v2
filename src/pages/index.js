import React from "react"
import { graphql } from "gatsby"

import useTranslations from "../components/useTranslations"

import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "../components/LocalizedLink"

import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  const {
    siteTitle,
    home,
  } = useTranslations()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={home} lang={pageContext.locale} />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        let imgFluid = null
        if (node.frontmatter.image) {
          imgFluid = node.frontmatter.image.childImageSharp.fluid
        }

        return (
          <Link style={{ boxShadow: `none`, color: `black` }} to={`/blog/${node.fields.slug}`}>
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {title}
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                {imgFluid &&
                  <Img
                    fluid={imgFluid}
                    alt={title}
                  />
                }
              </section>
            </article>
          </Link>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query Index($locale: String!, $dateFormat: String!) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: $dateFormat)
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

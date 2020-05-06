/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import useTranslations from "../components/useTranslations"
import { rhythm } from "../utils/typography"

const Welcome = () => {
  const data = useStaticQuery(graphql`
    query WelcomeQuery {
      avatar: file(relativePath: {eq: "kabagorou.png"}) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const { author, hello, welcome } = useTranslations();

  return (
    <div
      style={{
        display: `flex`,
        marginTop: rhythm(1.5),
        marginBottom: 0,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <p
          style={{
            marginBottom: 0,
          }}
        ><strong>{hello}</strong></p>
        <p
          style={{
            marginBottom: 0,
          }}
        >{welcome}</p>
      </div>
    </div>
  )
}

export default Welcome

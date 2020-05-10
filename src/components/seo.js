/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import locales from '../../config/i18n';
import { LocaleContext } from './localeContext';
import useTranslations from "../components/useTranslations"

const SEO = ({ description, lang, meta, title, image }) => {
  const { locale } = React.useContext(LocaleContext);

  const { site, ogImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
              summary
            }
            siteURL
            social {
              twitter
            }
          }
        }
        ogImage: file(relativePath: {eq: "kabagorou.png"}) {
          publicURL
        }
      }
    `
  )

  const {
    siteTitle,
    siteDescription,
  } = useTranslations()


  let ogImageURL = `${site.siteMetadata.siteURL}${ogImage.publicURL}`
  if (image) {
    ogImageURL = `${site.siteMetadata.siteURL}${image}`
  }

  let metaTitle = siteTitle || site.siteMetadata.title
  let pageTitle = metaTitle
  if (title) {
    metaTitle = `${title} | ${siteTitle}`
    pageTitle = title
  }

  const metaDescription = description || siteDescription || site.siteMetadata.description

  const localesList = Object.keys(locales)
    .filter(lang => !locales[lang].disable)
    .map(lkey => {
      const l = locales[lkey]
      const path = l.default ? site.siteMetadata.siteURL : `${site.siteMetadata.siteURL}/${l.path}`
      return {
        lang: l.siteLanguage,
        path,
      }
    })

  return (
    <Helmet
      htmlAttributes={{
        lang: locales[locale].siteLanguage,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${title} | ${siteTitle}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: ogImageURL,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {localesList.map((l) =>
        <link rel="alternate" href={l.path} hrefLang={l.lang} key={l.lang} />
      )}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
  title: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO

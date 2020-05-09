
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import locales from "../../config/i18n"
import { findKey } from "../utils/gatsby-node-helpers"
import { LocaleContext } from "./localeContext"


const useTranslations = () => {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext)
  // Query the JSON files in <rootDir>/i18n/translations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => {
    return {
      name: item.node.name,
      translations: item.node.translations,
    }
  })

  // Find the key that has "default: true" set (in this case it returns "en")
  const defaultKey = findKey(locales, o => o.default === true);

  // Only return translations for the default locale
  const defaultLang = simplified.filter(lang => lang.name === defaultKey)[0]

  // Only return translations for the current locale
  const { translations } = simplified.filter(lang => lang.name === locale)[0]
  Object.keys(translations).forEach(key => translations[key] === null && delete translations[key])

  return { ...defaultLang.translations, ...translations }
}

export default useTranslations

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            siteTitle,
            siteDescription,
            author

            notFound
            notFoundDescription

            currencyCode
            currency

            home
            hello
            welcome
          }
        }
      }
    }
  }
`
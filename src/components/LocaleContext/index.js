import React from "react"
import { Link } from "gatsby"

const LocaleContext = React.createContext();

// Use the built-in Context API to make the "locale" available to every component in the tree
// This e.g. enables the LocalizedLink to function correctly
// As this component wraps every page (due to the wrapPageElement API) we can be sure to have
// the locale available everywhere!
const LocaleContextProvider = ({ children, pageContext: { locale } }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export { LocaleContextProvider, LocaleContext }
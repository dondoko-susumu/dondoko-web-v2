// Only one item MUST have the "default: true" key

module.exports = {
  ja: {
    default: true,
    path: `ja`,
    siteLanguage: `ja`,
    locale: `ja-jp`,
    ogLanguage: `ja_jp`,
    dateFormat: `YYYY/MM/DD`,
    title: `日本語(Japanese)`,
  },
  en: {
    path: `en`,
    siteLanguage: `en`,
    locale: `en-US`,
    ogLanguage: `en_US`,
    dateFormat: `MMM DD, YYYY`,
    title: `English`,
  },
  de: {
    disable: true,
    path: `de`,
    siteLanguage: `de`,
    locale: `de-DE`,
    ogLanguage: `de_DE`,
    dateFormat: `DD/MM/YYYY`,
    title: `Deutsch`,
  },
  fr: {
    disable: true,
    path: `fr`,
    siteLanguage: `fr`,
    locale: `fr-FR`,
    ogLanguage: `fr_FR`,
    dateFormat: `DD/MM/YYYY`,
    title: `Français`,
  },
}
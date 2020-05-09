import React from "react"
import Select from "react-select"

import { navigate } from "gatsby"

import locales from '../../config/i18n';
import { LocaleContext } from './localeContext';

const SelectLanguage = () => {
  const { locale } = React.useContext(LocaleContext);

  const options = Object.keys(locales)
    .filter(lang => !locales[lang].disable)
    .map(lang => {
      return {
        value: lang,
        label: locales[lang].title
      }
    })

  const selectOption = options.find(o => o.value === locale);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: 12,
      width: 220,
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: 20,
      borderRadius: 12,
      borderColor: state.isSelected ? '#cce7ff' : "#f5f5f5",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    indicatorSeparator: () => null,
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#000',
      backgroundColor: state.isSelected ? '#cce7ff' : '#fff',
      paddingTop: 0,
      paddingBottom: 0,
    }),
  }

  return (
    <Select
      value={selectOption}
      onChange={({ value }) => {
        const path = locales[value].default ? '/' : `/${locales[value].path}`
        navigate(path)
      }}
      options={options}
      styles={customStyles}
    />
  )
}

export default SelectLanguage

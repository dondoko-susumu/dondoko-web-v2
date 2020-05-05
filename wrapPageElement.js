import React from 'react';
import { LocaleContextProvider } from './src/components/localeContext';

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <LocaleContextProvider {...props}>{element}</LocaleContextProvider>
);

export default wrapPageElement;
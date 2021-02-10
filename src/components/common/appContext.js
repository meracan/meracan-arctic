import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {GlobalStyle,theme} from 'styles.js';



import {IntlProvider} from 'react-intl';
import {DataProvider} from 'dataContext.js';


import {messages} from 'localization';





export default ({children,lng='en'}) => (
    <DataProvider>
          <IntlProvider locale={lng} messages={messages[lng]}>
            <ThemeProvider theme={theme}>
              <GlobalStyle>
              {children}
              </GlobalStyle>
            </ThemeProvider>
          </IntlProvider>
       </DataProvider>

);
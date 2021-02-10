import React from 'react';

import styled, {ThemeProvider, withTheme} from 'styled-components';
import {withData} from 'dataContext.js';
import {IntlProvider} from 'react-intl';
import {messages,FormattedMessage} from 'localization';
import {Header,MapContainer,About}  from 'components/common';
import {GlobalStyle,theme} from '../styles';


class App extends React.Component {
    static defaultProps = {
      };
    state={
      aboutVisible:false,
    }
    render() {
      const id="myid";
    
      return (
       
          <IntlProvider locale={this.props.lng} messages={messages[this.props.lng]}>
            <ThemeProvider theme={theme}>
              <GlobalStyle
                className="app"
                id={`app__${id}`}
                ref={this.root}
              >
               <About lng={this.props.lng} visible={this.state.aboutVisible} handleModal={()=>this.setState({aboutVisible:false})}/>
               <Header 
                  title={<FormattedMessage id={'topheader.title'} />}
                  sTitle={<FormattedMessage id={'topheader.stitle'} />}
                  setLng={this.props.setLng} 
                  lng={this.props.lng} 
                  label={<FormattedMessage id={'topheader.lng'} />}
                  items={
                  [ 
                    // {url:"https://canada.ca",text:<FormattedMessage id={'topheader.home'}/>,onClick:()=>null},
                    {text:<FormattedMessage id={'topheader.about'}/>,onClick:()=>this.setState({aboutVisible:true})},
                  ]
                    
                  }
                />
                <MapContainer/>
              </GlobalStyle>
            </ThemeProvider>
          </IntlProvider>
      );
    }
}

export default withData(App)
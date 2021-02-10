import React from 'react';
import {DataProvider} from 'dataContext.js';
import App from 'components/app'


export default class Main extends React.Component {
    static defaultProps = { };
    state={ }
    render() {
   
      return (
        <DataProvider>
          <App/>
       </DataProvider>
      );
    }
}
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MyPlot from './chart.js';


class WaterLevel extends React.PureComponent {

    static propTypes={
   
    };
    static defaultProps={
      dashData:{},
    };
  render(){
      const {dashData,dashID,timeData}=this.props;
      
    return(
         <MyPlot
        data={[{x:timeData,y:dashData['fs'],type: 'scattergl',mode: 'lines'}]}
       
      />
        
    );
  }
}

export default WaterLevel;
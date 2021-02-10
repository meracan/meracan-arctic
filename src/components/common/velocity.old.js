import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MyPlot from './chart.js';


const Row=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`
const Col=styled.div`
      display: block;
    width: 100%;
    height:${props=>props.height?props.height:400}px;
`


class Velocity extends React.PureComponent {

    static propTypes={
   
    };
    static defaultProps={
      dashData:{},
    };
    
  render(){
      const {dashData,timeData}=this.props;
      


    const timeChart=  <MyPlot
        title="Tidal current speed for typical 2 weeks"
        data={[{x:timeData,y:dashData[`uv`],type: 'scattergl',mode: 'lines'}]}
      />
      
    const polarChart=<MyPlot
        title="Tidal current direction"
        layout={{ orientation: -90}}
        data={[{r:dashData[`uv`],theta:dashData[`theta`],type: 'scatterpolargl',mode: 'markers'}]}
      />
  const probChart=<MyPlot
        title="Exceedance probability of tidal current speed"
        data={[{x:dashData[`xcdf`],y:dashData[`cdf`],type: 'scattergl',mode: 'lines'}]}
      />      
    
    
      
    return(
        <div style={{background:"blue"}}>
         <Row>
         <Col height={300}>
       <MyPlot
        title="Tidal current speed for typical 2 weeks"
        data={[{x:timeData,y:dashData[`uv`],type: 'scattergl',mode: 'lines'}]}
      />
         </Col>
         </Row>
         <Row>
         <Col>
       <MyPlot
        title="Tidal current direction"
        layout={{ orientation: -90}}
        data={[{r:dashData[`uv`],theta:dashData[`theta`],type: 'scatterpolargl',mode: 'markers'}]}
      />
         </Col>
         <Col>
          <MyPlot
        title="Exceedance probability of tidal current speed"
        data={[{x:dashData[`xcdf`],y:dashData[`cdf`],type: 'scattergl',mode: 'lines'}]}
      />
         </Col>
         </Row>
         </div>
       
        
    );
  }
}

export default Velocity;

//  {
//       type: "scatterpolargl",
//       r: unpack(rows, 'trial_1_r'),
//       theta: unpack(rows, 'trial_1_theta'),
//       mode: "markers",
//       name: "Trial 1",
//       marker: {
//         color: "rgb(27,158,119)",
//         size: 15,
//         line: {
//           color: "white"
//         },
//         opacity: 0.7
//       },
//       cliponaxis: false
//     },
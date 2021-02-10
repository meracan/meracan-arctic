import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {withData} from 'dataContext.js';
import MapControl from './mapControl';
import Split from './split.js';

import {INITIALVIEWPORT} from 'constants.js';
import Dashboard from './dashboard.js';
import Legend from './map.legend.js'
import Map from './map';



const MapDiv = styled.div`
   overflow:hidden;
   margin-top: 62px;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const MAPCONTROL={
    orient:"left",
    position:{top:"5px",left:"5px"},
    items:[]
  };


class MapContainer extends React.PureComponent {
  static propTypes = {  
      initialPaneSizes:PropTypes.object,

    
  }; 
  static defaultProps={

  
  // mapControl:{
  //     orient:"left",
  //     position:{top:"5px",left:"5px"},
  //     items:[]
  //   }
  
  };
  
  constructor(props) {
    super(props);
    this.split = React.createRef();
    this.map = React.createRef();
  }
  state={
      mapControl:null,
     
  }
  closeDashboard=()=>{
   this.split.current&&this.split.current.changePane('bottom');
   this.props.getDashData();
    
  }
  
  componentDidMount=async()=>{
    const mapControl=this.map.current.getMapControl(MAPCONTROL);
     this.setState({mapControl})
    // this.setState({mapControl,animation:{id: window.requestAnimationFrame(this.animate)}})
  };
  handleSplitUpdate=()=>{
    const bottom=this.split.current&&this.split.current.getPane('bottom')
    if(bottom=="0px")this.split.current&&this.split.current.changePane('bottom')
    return true;
  }
  

  render (){
    
    return (
    
      <MapDiv>
        <Map
          {...this.props}
          ref={this.map} 
          viewport={INITIALVIEWPORT} 
          
          getDashData={(id)=>{
          this.props.getDashData(id)
          if(id)this.handleSplitUpdate();
            
          }}
        />
         <Split 
          initialPaneSizes={this.props.initialPaneSizes}
          handleUpdate={this.handleSplitUpdate}
          panes={{
            // right:<Container></Container>,
            bottom:<Dashboard closeDashboard={this.closeDashboard}/>
          }}
          ref={this.split}
        >
          <div>
           {this.state.mapControl && <MapControl {...this.state.mapControl}/>}
            <Legend x={6} y={120} 
            />
          </div>
          <div></div>
          
        </Split>
    
       
      </MapDiv>
    
      
    );
  }
}

export default withData(MapContainer)
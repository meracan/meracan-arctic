import React from 'react';
import PropTypes from 'prop-types';
import DeckGL from '@deck.gl/react';
import {_MapContext as MapContext, StaticMap} from 'react-map-gl';
import {ScaleControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {getLayers} from 'layers.js'
import HoverCard from './map.hover';

// import Popups from './map.popup';

import { faPlus,faMinus,faMap } from '@fortawesome/free-solid-svg-icons';
import {dark,light,satellitestreets,satellite,streets} from 'assets';
import {TOKEN} from 'constants.js';




export class Map extends React.PureComponent {
  static propTypes = {
    mapStyle:PropTypes.string,
     mapControl:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
    viewport:PropTypes.object,
    layers:PropTypes.array,
    onViewportChange:PropTypes.func,
  }; 
  static defaultProps={
    mapStyle:"mapbox://styles/mapbox/dark-v10",
    mapControl:false,
    viewport:Object({latitude: 0.0,longitude: 0.0,zoom: 0,bearing: 0, pitch: 0}),
    layers:[],
    onViewportChange:()=>null,
     animationSpeed:1,
    loopLength:800,
    currentTime:1,
  };
  constructor(props) {
    super(props);
    this.state = {
      viewport:this.props.viewport,
      mapStyle:this.props.mapStyle,
      mapControl:this.props.mapControl?this.getMapControl(this.props.mapControl):false,
      hoverInfo:undefined,
       currentTime:this.props.currentTime,
      animation:{},
      stop:false
    
    };
  }

 getMapControl=(mapControl)=>({...mapControl,items:[
    {icons:[{icon:faPlus,onClick:()=>this.setViewport({action:"zoomIn"})}]},
    {icons:[{icon:faMinus,onClick:()=>this.setViewport({action:"zoomOut"})}]},
    {
      // style:{marginTop:5},
      icons:[
        {icon:faMap,onClick:()=>null},
        {icons:[
          {img:streets,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/streets-v11"})},
          // {img:outdoor,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/outdoors-v11"})},
          {img:light,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/light-v10"})},
          {img:dark,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/dark-v10"})},
          {img:satellite,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/satellite-v9"})},
          {img:satellitestreets,onClick:()=>this.setState({mapStyle:"mapbox://styles/mapbox/satellite-streets-v11"})},
          ]}
      ]
    },...mapControl.items
  ]
    
  })
    
  animate = (_stop) => {
    const stop=_stop=='false'?false:this.state.stop;
    
    const animation=stop?{}:{id:window.requestAnimationFrame(this.animate)};
    
    this.setState({stop,currentTime: (this.state.currentTime + this.props.animationSpeed) % this.props.loopLength,animation});
  };
  // stop = () => {
  //   this.setState({currentTime: (this.state.currentTime + this.props.animationSpeed) % this.props.loopLength,animation:{}});
  // };
    

  mapInitialized=(ref)=>{this.map = ref && ref.getMap()}
  deckInitialized=(ref)=>{this.deckGL = ref}
  onViewStateChange=({viewState:viewport})=>this.setViewport({viewport})
  // componentDidMount=async()=>{
  //   this.setState({animation:{id: window.requestAnimationFrame(this.animate)}})
  // };
  componentDidUpdate=(prevProps)=>{
    if (this.props.xy !== prevProps.xy) {
      
      if (!this.props.xy)return this.setState({stop:true});
      if(this.state.stop)return this.animate("false")
      this.animate();
      
      
    }
  
  }
  
  setViewport=({action,viewport})=>{
    if(action){
      let {viewport:{zoom}}=this.state;
      
      if (action=='zoomIn')  zoom=Math.min(18,zoom+1);
      if (action=='zoomOut') zoom=Math.max(0,zoom-1);
      
      viewport={...this.state.viewport,zoom};
    }
    this.props.onViewportChange && this.props.onViewportChange(viewport);
    this.setState({viewport});
  }
  getCursor=({isDragging})=>{
    return isDragging ? 'grabbing' : (typeof this.state.hoverInfo==='undefined' ? 'grab':'pointer')
  }
  onHover=(e)=>{
      const {deckGL} = this;
      const o = deckGL.pickMultipleObjects({x:e.x, y:e.y, radius:5});
      if(!o || o.length==0)return this.setState({hoverInfo:undefined});
      return this.setState({hoverInfo:o});
  }
  onClick=(e)=>{
    const {deckGL} = this;
    const o = deckGL.pickObject({x:e.x, y:e.y,radius:5});
     if(!o)return this.props.getDashData();
     
    if(o.layer.id=="polar" && !o.object.properties.clustered)return this.props.getDashData(o.object.properties.id);
    // const meshPoints=o.filter(p=>p.layer.id==="polar");
    
    // if(meshPoints.length>0 && meshPoints[0].object.properties && ) return this.getMeshContent({lng,...meshPoints[0]});
  }
 
  render (){
      
    const layers=getLayers({...this.props,currentTime:this.state.currentTime});  
    return (
      <DeckGL 
        controller={true}
        layers={layers}
        ref={this.deckInitialized}
        ContextProvider={MapContext.Provider}
        viewState={this.state.viewport} 
        onViewStateChange={this.onViewStateChange}
        getCursor= {this.getCursor}
        onHover={this.onHover}
        onClick={this.onClick}
        style={{overflow: 'hidden'}}
        >
        {this.state.hoverInfo && <HoverCard hoverInfo={this.state.hoverInfo} />}
        <StaticMap key="map" mapStyle={this.state.mapStyle} mapboxApiAccessToken={TOKEN}>
          <div style={{position: 'absolute', bottom: 50, right: 50}}>
            <ScaleControl maxWidth={1000} unit={"metric"}/> 
          </div>
        </StaticMap>
       
      </DeckGL>
    );
  }
}


export default Map;
  
// {this.state.hoverInfo && <HoverCard selectedProjects={this.props.selectedProjects} hoverInfo={this.state.hoverInfo} />}
// 

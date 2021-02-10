import React from 'react';

import DeckGL, {GeoJsonLayer, ArcLayer,TripsLayer,PathLayer} from 'deck.gl';
import {MapContainer,AppContext} from 'components/common';


export default {
  title: 'Components/MapContainer',
  component: MapContainer,
};
const Template = (args) => <AppContext><MapContainer {...args}/></AppContext>;


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const layers=[new GeoJsonLayer({
          id:"airports",
          data:AIR_PORTS,
          filled:true,
          pointRadiusMinPixels:2,
          pointRadiusScale:2000,
          getRadius:f => 11 - f.properties.scalerank,
          getFillColor:[200, 0, 80, 180],
          pickable:false,
          autoHighlight:true,
        }),
        new  ArcLayer({
          id:"arcs",
          data:AIR_PORTS,
          dataTransform:d => d.features.filter(f => f.properties.scalerank < 4),
          getSourcePosition:f => [-0.4531566, 51.4709959],
          getTargetPosition:f => f.geometry.coordinates,
          getSourceColor:[0, 128, 200],
          getTargetColor:[200, 0, 80],
          getWidth:1})
        ];
      
        
export const Default = Template.bind({});
Default.args = {
};
export const MapControl = Template.bind({});
MapControl.args = {
  mapControl:{
    orient:"top",
    position:{right:"calc(50% - 32px)"},
    direction:"row",
    items:[]},
};
import React from 'react';

import DeckGL, {GeoJsonLayer, ArcLayer,TripsLayer,PathLayer} from 'deck.gl';
import {Map,AppContext} from 'components/common';
import {MVTLayer} from '@deck.gl/geo-layers';
import * as d3 from 'd3';
import {getRgbArray} from 'utils'
const eScale = d3.scalePow().exponent(0.5).domain([0,-1000]).range([0, 1])

export default {
  title: 'Components/Map',
  component: Map,
};
const Template = (args) => <AppContext><Map {...args}/></AppContext>;


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// const layers=[new GeoJsonLayer({
//           id:"airports",
//           data:AIR_PORTS,
//           filled:true,
//           pointRadiusMinPixels:2,
//           pointRadiusScale:2000,
//           getRadius:f => 11 - f.properties.scalerank,
//           getFillColor:[200, 0, 80, 180],
//           pickable:false,
//           autoHighlight:true,
//         }),
//         new  ArcLayer({
//           id:"arcs",
//           data:AIR_PORTS,
//           dataTransform:d => d.features.filter(f => f.properties.scalerank < 4),
//           getSourcePosition:f => [-0.4531566, 51.4709959],
//           getTargetPosition:f => f.geometry.coordinates,
//           getSourceColor:[0, 128, 200],
//           getTargetColor:[200, 0, 80],
//           getWidth:1})
//         ];

const layers=[new MVTLayer({
    id:"chs",
    data: `https://7lvqc04r6h.execute-api.us-east-1.amazonaws.com/prod/mbtiles/chs/{z}/{x}/{y}`,
    visible:false,
    minZoom: 0,
    maxZoom: 23,
    radiusScale: 2,
    getRadius: 1,
    // getLineColor: [192, 192, 192],
    // getFillColor: [140, 170, 180],
    getFillColor: d => getRgbArray(d3.interpolateYlGnBu(eScale(d.properties['elevation']))),

    // getLineWidth: f => {
    //   switch (f.properties.class) {
    //     case 'street':
    //       return 6;
    //     case 'motorway':
    //       return 10;
    //     default:
    //       return 1;
    //   }
    // },
    pointRadiusMinPixels:1,
    // lineWidthMinPixels: 1
  }),
  new MVTLayer({
    id:"polar",
    data: `https://7lvqc04r6h.execute-api.us-east-1.amazonaws.com/prod/mbtiles/polar1c/{z}/{x}/{y}`,
   visible:true,
    minZoom: 0,
    maxZoom: 23,
    // getLineColor: [192, 192, 192],
    getFillColor: d=>getRgbArray(d3.interpolateYlGnBu(eScale(d.properties['Elevation']))),

    // getLineWidth: f => {
    //   switch (f.properties.class) {
    //     case 'street':
    //       return 6;
    //     case 'motorway':
    //       return 10;
    //     default:
    //       return 1;
    //   }
    // },
    pointRadiusMinPixels:2,
    // lineWidthMinPixels: 1
  }),
  
  
  ];      
        
export const Default = Template.bind({});
Default.args = {
  layers,
};
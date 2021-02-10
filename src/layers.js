import DeckGL, {GeoJsonLayer, IconLayer,PathLayer,ScatterplotLayer} from 'deck.gl';
import {MVTLayer} from '@deck.gl/geo-layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {CLOUDFRONT} from 'constants.js';
import * as d3 from "d3";
import binjs from 'binjs';

import {getRgbArray} from 'utils'
const eScale = d3.scalePow().exponent(0.5).domain([0,-1000]).range([0, 1])
export const bathyScale=(v)=>d3.interpolateYlGnBu(eScale(v));
export const bathyScaleI=(v)=>d3.interpolateYlGnBu(v);
export const bathyScaleT=(v)=>eScale.invert(v);

const sScale = d3.scalePow().exponent(0.5).domain([0,2]).range([0, 1])
export const speedScale=(v)=>d3.interpolateOrRd(sScale(v));
export const speedScaleI=(v)=>d3.interpolateOrRd(v);
export const speedScaleT=(v)=>sScale.invert(v);

const aScale = d3.scalePow().exponent(0.25).domain([1,20]).range([0, 1])
export const aepScale=(v)=>d3.interpolateTurbo(aScale(v));
export const aepScaleI=(v)=>d3.interpolateTurbo(v);
export const aepScaleT=(v)=>aScale.invert(v);

const rScale = d3.scalePow().exponent(0.25).domain([1,200]).range([0, 20])
export const rScaleL = d3.scaleLinear().domain([0.0,1.0]).range([0.1, 0.5])

export const AVGGEOJSON=`${CLOUDFRONT}/assets/arctic.42days.avg.geojson`;
export const getAvgGeojson=()=>d3.json(AVGGEOJSON).then(d=>d['features']);
export const getDashLink=(id)=>`https://zdyi4ytj0f.execute-api.us-east-1.amazonaws.com/prod/netcdf?variable=fs,u,v,lon,lat,aep,bed&inode=${id}&export=bin`
export const getTimeLink=(id)=>`https://zdyi4ytj0f.execute-api.us-east-1.amazonaws.com/prod/netcdf?variable=time&export=bin`
export const getDashData=(id)=>d3.buffer(getDashLink(id)).then(buffer=>binjs.read(buffer))
export const getTimeData=(id)=>d3.buffer(getTimeLink(id)).then(buffer=>binjs.read(buffer)['time'])

export const getLayers=({layers,show,modelValue,xy=null,currentTime})=>([
  
   new MVTLayer({
    id:"chs",
    data: `https://7lvqc04r6h.execute-api.us-east-1.amazonaws.com/prod/mbtiles/chs/{z}/{x}/{y}`,
    visible:show.chs,
    minZoom: 0,
    maxZoom: 23,
    radiusScale: 2,
    getRadius: 1,
    getFillColor: d =>getRgbArray(bathyScale(d.properties['elevation'])),
    pointRadiusMinPixels:1,

  }),
new MVTLayer({
    id:"polar",
    data: `https://7lvqc04r6h.execute-api.us-east-1.amazonaws.com/prod/mbtiles/polar/{z}/{x}/{y}`,
   visible:show.model,
   pickable:true,
   opacity:modelValue==="aep"?0.25:1.0,
   stroked:false,
    minZoom: 0,
    maxZoom: 23,
    pointRadiusScale: 1,
    // getLineColor: [192, 192, 192],
    getRadius: d=>modelValue=='aep'?rScale(d.properties['aep']):2,
    pointRadiusUnits:'pixels',
    getFillColor: d=>modelValue=='v'?getRgbArray(speedScale(d.properties['speed'])):
                    modelValue=='aep'?getRgbArray(aepScale(d.properties['aep'])):
                    getRgbArray(bathyScale(d.properties['elevation'])),
    updateTriggers: {
      
      getRadius: {modelValue},
      getFillColor: {modelValue}
    }
  }),
  new ScatterplotLayer({
    id: 'selected',
    visible:xy?true:false,
    data:[{coordinates:xy}],
    
    opacity: 0.8,
    stroked: true,
    filled: false,
    radiusScale: 1,
    radiusUnits:"pixels",
    // radiusMinPixels: 1,
    // radiusMaxPixels: 100,
    lineWidthMinPixels: 2,
    getPosition: d => d.coordinates,
    getRadius: (1-(currentTime%100)/100)*20,
    getLineColor: [255, 0, 0],
    updateTriggers: {
      getRadius: currentTime,
    }
    
    // getFillColor: d => [255, 140, 0],
    
  })
]);
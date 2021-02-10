import React from 'react';
import PlotlyPlot from 'react-plotly.js';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { withTheme } from 'styled-components';
import {exportCSVFile} from 'utils.js'

const icon={
     width:faFileCsv.icon[0],
     height:faFileCsv.icon[1],
     path:faFileCsv.icon[4],
};

class PP extends PlotlyPlot {
 
}
   
const Plot = React.forwardRef((props, ref) => {
  const {theme,title,xaxis,yaxis,csvx,csvy,id}=props;
 
  const config={
      displaylogo: false,
      modeBarButtons:[ 
        [
          {name: 'Download as csv',icon,click: ()=>exportCSVFile([csvx.replace(/,/g, ''),csvy.replace(/,/g, '')],data[0].x||data[0].r,data[0].y||data[0].theta,id)},
        ],
        ['toImage','pan2d', 'zoom2d','zoomIn2d','zoomOut2d','resetScale2d']
        ],
        ...props.config
  };
    
  const layout = {
    autosize: true,
    margin: {l: 50,r: 50,b: 75,t: 55,pad: 0 },
    paper_bgcolor: theme.plot.background,
    plot_bgcolor: theme.plot.background,
    polar:{
      bgcolor: theme.plot.background,
      radialaxis:{
      color: theme.plot.text.primary,
      linecolor:theme.plot.text.secondary,
      gridcolor:theme.plot.text.secondary,
      tickcolor:theme.plot.text.secondary,
    },
    angularaxis:{
      color: theme.plot.text.primary,
      linecolor:theme.plot.text.secondary,
      gridcolor:theme.plot.text.secondary,
      tickcolor:theme.plot.text.secondary,   
      rotation: 90,
      direction: "clockwise"
    },
    },
    
    xaxis: {
      title:{'text': xaxis,font: {size:12}},
      color: theme.plot.text.primary,
      linecolor:theme.plot.text.secondary,
      gridcolor:theme.plot.text.secondary,
      tickcolor:theme.plot.text.secondary,      
    },
    yaxis: {
      title:{'text': yaxis,font: {size:12}},
      color: theme.plot.text.primary,
      linecolor:theme.plot.text.secondary,
      gridcolor:theme.plot.text.secondary,
      tickcolor:theme.plot.text.secondary,      
    },
    legend: {
      font: {
        color: theme.plot.text.primary
      },
    },
    title: {
      'text': title,'y':0.92,'x':0.5,'xanchor': 'center','yanchor': 'top',
      font: {
        color: theme.plot.text.primary,
        size:12
      }
    },
    scene: {
      xaxis: {
        color: theme.plot.text.primary
      },
      yaxis: {
        color: theme.plot.text.primary
      },
      zaxis: {
        color: theme.plot.text.primary
      },
      radialaxis:{
        color: theme.plot.text.primary,
      },
       angularaxis:{
         color: theme.plot.text.primary,
       }
    }
  ,...props.layout};
  const data = props.data.map((plotData,i) => ({
    marker: {color: theme.plot.data[i]},
    colorbar: {
      tickfont: {
        color: theme.plot.text.primary
      }
    }
  ,...plotData}));
  
 
  const customProps = {
    data,
    useResizeHandler:true,
    style:{width: "100%", height: "100%"},
    layout,
    config,
  };
  
  return <PP ref={ref} {...customProps} />;
});

export default withTheme(Plot);
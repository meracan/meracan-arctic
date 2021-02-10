import React,{createContext} from 'react';
import {getAvgGeojson,getDashData,getTimeData} from 'layers';

import * as d3 from 'd3';
import * as jstat from 'jstat';

export const defaultData = {
  
};


export const DataContext = createContext(defaultData);

export class DataProvider extends React.PureComponent {
  state={
    lng:'en',
    loading:false,
    layers:{},
    modelValue:'elev',
    timeData:null,
    dashData:null,
    dashID:null,
    xy:null,
    show:{chs:false,model:true}
    
  }
  // getData=async()=>{
  //   const avgGeojson=await getAvgGeojson();
  //   this.setState({loading:false,layers:{avgGeojson}});
  // }
  getDashData=async(dashID)=>{
    
    if(!dashID)return this.setState({dashID:null,xy:null});
    this.setState({loading:true})
    const dashData=await getDashData(dashID);
 
    const fs=dashData['fs']=dashData[`fs_t_${dashID}`].filter((v,i)=>i>2016)
    const u=dashData['u']=dashData[`u_t_${dashID}`].filter((v,i)=>i>2016)
    const v=dashData['v']=dashData[`v_t_${dashID}`].filter((v,i)=>i>2016)
    const uv=dashData['uv']=u.map((_u,i)=>Math.sqrt(u[i]*u[i]+v[i]*v[i]))
    const th=dashData['theta']=u.map((_u,i)=>Math.atan2(u[i],v[i]))
    const xy=[dashData['x'][0],dashData['y'][0]]
    
    // dashData['lng']=lng;
    // dashData['lat']=lat;
    
    const x=dashData['xcdf']=jstat.arange(0.1,5,0.1);
    const cdf=dashData['cdf']=x.map(_x=>1-jstat.normal(jstat.mean(uv), jstat.stdev(uv)).cdf(_x));
    x.unshift(0);
    cdf.unshift(1);
    
    
    if(this.state.timeData)return this.setState({dashData,dashID,xy,loading:false});
    
    const _timeData=await getTimeData(dashID);
    const timeData=Array.from(_timeData).filter((v,i)=>i>2016).map(t=>(new Date(t)).toISOString())
    
    this.setState({dashData,timeData,dashID,xy,loading:false});
  }

  render(){
    const {lng,layers,dashData,dashID,xy,timeData,loading,modelValue,show}=this.state;
    return(
      <DataContext.Provider value={{
      lng,
      layers,
      loading,
      getData:this.getData,
      getDashData:this.getDashData,
      dashData,
      dashID,
      xy,
      timeData,
      modelValue,
      show,
      showClick:(key)=>this.setState({show:{...show,[key]:!show[key]}}),
      handleModel:(modelValue)=>this.setState({modelValue}),
      setLng:()=>this.setState({lng:lng==='en'?"fr":'en'})
      
      }}>
        {this.props.children}
      </DataContext.Provider>
      );
  }
}


export const withData = Component => {
  class DataComponent extends React.PureComponent {
    render() {
      return (
        <DataContext.Consumer>
          {(context) => <Component {...context} {...this.props}/>}
        </DataContext.Consumer>
      );
    }
  }

  return DataComponent;
};
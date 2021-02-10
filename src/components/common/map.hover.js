import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {Descriptions} from 'antd';
import {withData} from 'dataContext.js';
// import DataHover from './dataHover';
// import DataText from './dataText'
import {FormattedMessage} from 'localization';



// import {getProjects,getProjectID,getProjectName,getClientName,getDescription} from 'utils.js';

const containerStyles = css`
  background: ${props => props.theme.hoverBackground || 'white'};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  .ant-descriptions-item-label{
    font-size:10px;
    width: 150px;
  }
  .ant-descriptions-item-content {
    font-size:10px;
  }
`;

const HoverContainer = styled.div`
  ${containerStyles} 
  position: absolute;
  z-index: 1;
  
  // pointer-events: none;
  left: ${props => props.x +"px"||0};
  top:  ${props => props.y +"px"||0};
  max-width: ${props => props.maxWidth?props.maxWidth+"px":"auto"};
  max-height: 400px;
`;

const Content = styled.div`
  padding: ${props => props.theme.margins.small};
`;


const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  // margin-bottom: 4px;
`;
const SubTitle = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-size: 10px;
  color: #777;
  // margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;
const Bold = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Link = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: black;
`;

const TooltipStyle=styled.span`
    color:${props=>props.theme.linkColor};
    font-size:9px;
`;

class HoverCard extends React.PureComponent {

    static propTypes={
        data:PropTypes.object,
        lng:PropTypes.string,
        hoverInfo:PropTypes.array,
        
    };
    static defaultProps={
       data:{},
       lng:"en",
       hoverInfo:[],
    };
    
    
      
      
    getMeshContent=({lng,x,y,coordinate,object:{properties:{clustered,id,elevation,aep,speed}}})=>(
    <HoverContainer x={x} y={y} maxWidth={300}>
      <Content>
      <Descriptions column={1} size="small" title=<div><span>Info </span>{!clustered?<TooltipStyle> (<FormattedMessage id={'definitions.moreinfo'}/>)</TooltipStyle>:null}</div> bordered>
      {!clustered?<Descriptions.Item label=<FormattedMessage id={'definitions.NodeID'}/>>{id}</Descriptions.Item>:null}
    <Descriptions.Item label=<FormattedMessage id={'definitions.Longitude'}/>>{coordinate[0].toFixed(4)}</Descriptions.Item>
    <Descriptions.Item label=<FormattedMessage id={'definitions.Latitude'}/>>{coordinate[1].toFixed(4)}</Descriptions.Item>
    <Descriptions.Item label=<FormattedMessage id={'definitions.Bed Elev.'}/>>{elevation.toFixed(0)}</Descriptions.Item>
    <Descriptions.Item label=<FormattedMessage id={'definitions.Speed'}/>>{speed.toFixed(2)}</Descriptions.Item>
    <Descriptions.Item label=<FormattedMessage id={'definitions.AEP'}/>>{aep.toFixed(2)}</Descriptions.Item>
        </Descriptions>
        
      </Content>
    </HoverContainer>
    )
    
  
    
    render(){
      const {data,lng,heatmapValue,selectedProjects=[],hoverInfo:o=[],showAllRoutes}=this.props;
      if(o.length==0)return null;
      
      const meshPoints=o.filter(p=>p.layer.id==="polar");
      if(meshPoints.length>0) return this.getMeshContent({lng,...meshPoints[0]});
      
      
      
      return null;
      
    }
}
    




export default withData(HoverCard);
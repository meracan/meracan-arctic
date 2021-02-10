import React from 'react';
import PropTypes from 'prop-types';
import styled, {css, withTheme} from 'styled-components';

import {withData} from 'dataContext.js';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {FormattedMessage} from 'localization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faCaretDown,faBullseye,faMousePointer} from '@fortawesome/free-solid-svg-icons';
import { Dropdown,Menu,Tooltip,Popover } from 'antd';
import {NRCLINK,CHSLINK} from 'constants.js'
import {bathyScaleI,speedScaleI,aepScaleI,bathyScaleT,speedScaleT,aepScaleT,rScaleL} from 'layers.js'

import DataHover from './dataHover';



export const SvgBoundaryContainer = styled.div`
  width:30px;
  margin-right:5px;
`;



const rowStyle=css`
  display:flex;
  align-items: center;
  direction: ltr;

`
export const Row = styled.div`
   ${rowStyle}
   margin:16px 0 0 0;
   `;
export const RowC = styled.div`
   ${rowStyle}
   margin:8px 0;
   `;   

export const RowR=styled.div`
  ${rowStyle} 
  flex-direction: row-reverse;
`
const containerStyles = css`
  background: ${props => props.theme.background || 'white'};
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const HoverContainer = styled.div`
  ${containerStyles} 
  color:${props => props.theme.textColor};
 
  padding: ${props => props.theme.margins.small};
  position: absolute;
  z-index: 1;
  
  pointer-events: auto;
  left: ${props => props.x +"px"||0};
  top:  ${props => props.y +"px"||0};
  max-width: ${props => props.maxWidth?props.maxWidth+"px":"auto"};
 
`;
export const Bold = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Content = styled.div`
  max-height: calc(100vh - 240px);
  overflow: auto;
  direction: rtl;
  padding-left: 10px;
  margin-left: -10px;
   ::-webkit-scrollbar-track  {
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  	border-radius: 10px;

  	
  }

  ::-webkit-scrollbar  {
  	width: 5px;

  	background-color: #F5F5F5;
  	
  }

  ::-webkit-scrollbar-thumb  {
  	border-radius: 10px;
  	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
  	background-color: #BABABA;
  		
  
  	
  
  	
  }
  
  
`;

export const Description2 = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 0px;
  margin-left: 6px;
  line-height: 1.0;
  overflow: hidden;
  white-space: break-spaces;
  flex: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;


const Link =styled.a`
  color:#1890ff !important;
`
const Column=styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;

`

export const Row2 = styled.div`
  display:flex;
  align-items: flex-start;
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
    color:${props=>props.show?props.theme.iconHide:props.theme.icon};
    margin-left:5px;
    cursor:pointer;
`;



const CC= styled.div`
    // width: 36px;
    // padding: 0 6px;
    display:flex;
  flex-direction: column;
  width: 100%;
  margin: -8px 0;
 align-items: center;
   font-size:8px;
`
const circle=({fill='rgba(0,0,175,1)',r=0.3})=>(<svg viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r={r} fill={fill}/></svg>)

const getCircle=(modelValue,r=0.3)=>{
  return (
        <RowC style={{margin:"8px 0"}} >
       {[0,0.25,0.5,0.75,1.0,2].map((v,i)=>(v==2?<CC key={i}/>:<CC key={i}>{circle({
        fill: modelValue=="aep"?aepScaleI(v):modelValue=="v"?speedScaleI(v):bathyScaleI(v),
        r:modelValue=="aep"?rScaleL(v):r
       }
       )}</CC>))}       
      </RowC> 
      )
}
const getText=(modelValue,lng)=>{
  return (
        <RowC style={{margin:"8px 0"}} >
       {[0,0.25,0.5,0.75,1.0,2].map((v,i)=>(v==2?<CC key={i}><DataHover value={getMeta(modelValue,lng).unit}/></CC>:<CC key={i}><span>{
       modelValue=="aep"?aepScaleT(v).toFixed(0):modelValue=="v"?speedScaleT(v).toFixed(1):bathyScaleT(v).toFixed(0)
           
       }</span></CC>))}       
      </RowC> 
      )
}

export const Description = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;
export const getMeta=(value,lng='en')=>{
  if(value=='elev')return {title:lng=="en"?"{Bed Elev.}":"{Élévation}",min:0.5,max:400,unit:'{m}'};
  if(value=='v')return {title:lng=="en"?"{Speed}":"{Vitesse}",min:0.01,max:20,unit:'{m/s}'};
  if(value=='aep')return {title:lng=="en"?"{AEP}":"{PAE}",min:0.01,max:10,unit:lng=="en"?"{MWh/y}":"{MWh/a}"};
  return {title:"xxx",min:0,max:1,unit:'{t}'};
};

const LegendCard = ({lng,x,y,showClick,show,handleModel,modelValue}) => {
  const model=getMeta(modelValue,lng)
  
  return (
  <HoverContainer x={x} y={y} maxWidth={300}>
   <Title><FormattedMessage id={'legend.title'}/></Title>
   <Content>
      

      
      
      <Row >
      <Column style={{flex:"10 1"}}>
      <Popover placement="right" 
      overlayStyle={{maxWidth:200}} 
      content={<div>
        <Description><FormattedMessage id={'legend.datareference'}/></Description>
        <Bold><FormattedMessage id={'legend.references'}/></Bold>
        <Link style={{fontSize:10,display: "inline-block"}} href={NRCLINK} target="_blank"> <FormattedMessage id={'legend.report'}/> </Link>
      </div>}  
      trigger="click">
      <FormattedMessage id={'legend.model'}/> <StyledFontAwesome icon={faInfoCircle}/> 
       </Popover>
       </Column>
        <Column style={{width: 65,alignItems: "flex-end"}}>
        <Dropdown  trigger={['click']} overlay=<Menu>
          <Menu.Item><a onClick={()=>handleModel("elev")}><DataHover value={lng=="en"?"{Bed Elev.}":"{Élévation}"}/></a></Menu.Item>
          <Menu.Item><a onClick={()=>handleModel("v")}><DataHover value={lng=="en"?"{Speed}":"{Vitesse}"}/></a></Menu.Item>
          <Menu.Item><a onClick={()=>handleModel("aep")}><DataHover value={lng=="en"?"{AEP}":"{PAE}"}/></a></Menu.Item>
         </Menu>>
          <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <DataHover value={model.title}/>
            <FontAwesomeIcon icon={faCaretDown}/>
          </Link>
        </Dropdown>
        </Column>
        <Column style={{flex:"1 1"}}>
          <Tooltip title=<FormattedMessage id={show.chs?'tooltip.hidemodel':'tooltip.showmodel'}/>>
              <StyledFontAwesome show={!show.model} icon={faEye} onClick={()=>showClick('model')}/>
          </Tooltip>
        </Column>
   
      
      
      </Row>
      {show.model?<div style={{margin: "8px 0"}}>{getCircle(modelValue)}{getText(modelValue,lng)}</div>:null}
            <Row >
      <Column style={{flex:"10 1"}}>
      <Popover placement="right" 
      overlayStyle={{maxWidth:200}} 
      content={<div>
      <Description><FormattedMessage id={'legend.chsreference'}/></Description>
        <Bold><FormattedMessage id={'legend.references'}/></Bold>
        <Link style={{fontSize:10,display: "inline-block"}} href={CHSLINK} target="_blank"> <FormattedMessage id={'legend.chs'}/> </Link>
      </div>}  
      trigger="click">
      <FormattedMessage id={'legend.bathymetry'}/> <StyledFontAwesome icon={faInfoCircle}/> 
       </Popover>
       </Column>
        <Column style={{flex:"1 1"}}>
       <Tooltip title=<FormattedMessage id={show.chs?'tooltip.hidechs':'tooltip.showchs'}/>>
       
           
              <StyledFontAwesome show={!show.chs} icon={faEye} onClick={()=>showClick('chs')}/>
           
          </Tooltip>
           </Column>
   
      
      
      </Row>
      {show.chs?<div  style={{margin: "8px 0"}}>{getCircle("elev",0.1)}{getText("elev")}</div>:null}
      

       
    </Content>
  </HoverContainer>
  )
};



LegendCard.propTypes={
  title:PropTypes.string,
  properties:PropTypes.object,
  x:PropTypes.number,
  y:PropTypes.number,
  // handleChange:PropTypes.func,
  showClick:PropTypes.func,
  handleModel:PropTypes.func,
  show:PropTypes.object,
  modelValue:PropTypes.string,
  
};
LegendCard.defaultProps={
  title:undefined,
  properties:{},
  x:0,
  y:0,
  // handleChange:()=>null,
  // handleHeat:()=>null,
  handleModel:()=>null,
  showClick:()=>null,
  show:{chs:true,model:true},
  modelValue:'aep'
};


export default withData(withTheme(LegendCard));
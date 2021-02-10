import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {withData} from 'dataContext.js';
import { Tabs,Divider,Descriptions,Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FormattedMessage} from 'localization';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {messages} from 'localization';
import Spinner from './spinner.js';

import DataHover from './dataHover';

import MyPlot from './chart.js';
const { TabPane } = Tabs;


const Container = styled.div`
  color:${props=>props.theme.textColor};
    overflow: auto;
    width: 100%;
    height: 100%;
    background:${props=>props.theme.plot.background};
`
const Content = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  .ant-tabs {
    color:${props=>props.theme.textColor};
    height: 100%;
  }
  .ant-tabs > .ant-tabs-nav {
    width:70px;
    background:${props=>props.theme.plot.background};
    box-shadow: inset 0px 0px 6px rgba(0,0,0,0.2);
  }
  .ant-descriptions-item-label {
        font-size: 12px;
  }
  .ant-divider-horizontal {
    margin: 4px 0 0 0;
  }
  .ant-tabs-tab {
    margin: 0 8px 0 0 !important;
    padding: 16px 4px !important;
    font-size: 12px !important;
  }
  .ant-tabs-content-holder {
    overflow: auto;
  }
  .ant-tabs-tab-btn{
    white-space: break-spaces;
  }
  .ant-descriptions-item-content {
    word-break: normal  !important;
    max-width: 150px;
  }
`;
const StyledIconContainer=styled.div`
  color:${props=>props.theme.iconColor};
  position:absolute;
  right:0;
  
  margin-right:5px;
  
`
const BCon=styled.div`
    display:${props=>props.hide?'none':null};
      height: 100%;
    overflow: hidden;
`

const StyledFontAwesome = styled(FontAwesomeIcon)`
    cursor:pointer;
`;

const StyledHeader=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:6px;
  // flex-direction:column;
  
`
const Title = styled.div`
  
  font-size: 12px;
  font-weight: 500;
  // margin-bottom: 2px;
  text-align: center;
`;
const SubTitle = styled.div`
  font-size: 10px;
  font-weight: 300;
  margin-bottom: 4px;
  text-align: center;
`;

const NoData=styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  height:100%
`;

const Row=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`
const Col=styled.div`
      display: block;
    width: 100%;
    height:${props=>props.height?props.height:300}px;
`

class CardContainer extends React.PureComponent {

    static propTypes={
        dashData:{},
        lng:PropTypes.string,
        
        selectedProjects:PropTypes.array,
        closeDashboard:PropTypes.func,
    };
    static defaultProps={
       dashData:null,
       lng:"en",
       selectedProjects:[],
       closeDashboard:()=>null
    };
  render(){
      const {lng,dashID,dashData,loading,timeData}=this.props;
    return(
        <Container>
          <Content>
            <StyledIconContainer>
              <StyledFontAwesome icon={faTimes} onClick={()=>this.props.closeDashboard()}/>
            </StyledIconContainer>
             {loading?<StyledHeader><Spinner /></StyledHeader>:null}
             {dashData?<BCon hide={loading}>
            <StyledHeader>
              <Title>{`NodeID=${dashID} (${dashData['x'][0].toFixed(5)},${dashData['y'][0].toFixed(5)})`}</Title>
              <Title>{`(${dashData['aep'][0].toFixed(0)} `}<DataHover value={lng=="en"?"{MWh/year}":"{MWh/année}"}/>)</Title>
            </StyledHeader>
            <Divider />
            <Tabs tabPosition={'left'}>
              <TabPane tab=<FormattedMessage id={'plot.wl'}/>  key="1">
                <Row>
                <Col>
                    <MyPlot 
                    title={messages[lng]["plot.wlt"]}  
                    yaxis={messages[lng]['plot.wlu']} 
                    csvx="Datetime"
                    csvy={messages[lng]['plot.wlu']} 
                    id={`${dashID}_tideheight`}
                    data={[{x:timeData,y:dashData['fs'],type: 'scattergl',mode: 'lines'}]}/>
                  </Col>
                   </Row>
              </TabPane>
              <TabPane tab=<FormattedMessage id={'plot.speed'}/> key="2">
               <Row>
               <Col>
                 <MyPlot
                  title={messages[lng]["plot.speedt"]}
                  yaxis={messages[lng]['plot.speedu']}
                  data={[{x:timeData,y:dashData[`uv`],type: 'scattergl',mode: 'lines'}]}
                />
                   </Col>
                   </Row>
                 
              </TabPane>
                <TabPane tab=<FormattedMessage id={'plot.speed2'}/> key="3">
                  <Row>
                   <Col>
                 <MyPlot
                  title={messages[lng]["plot.speeddu"]}
                  layout={{ orientation: -90}}
                  data={[{r:dashData[`uv`],theta:dashData[`theta`],type: 'scatterpolargl',mode: 'markers',marker:{size:2}}]}
                />
                   </Col>
                   <Col>
                    <MyPlot
                  title={messages[lng]["plot.speedp"]}
                  xaxis={messages[lng]['plot.speedpx']}
                  yaxis={messages[lng]['plot.speedpy']}
                  data={[{x:dashData[`xcdf`],y:dashData[`cdf`],type: 'scattergl',mode: 'lines'}]}
                />
               </Col>
               </Row>
                </TabPane>
            </Tabs>
            </BCon>
            :null}
            
          </Content>
        </Container>
    );
  }
}

export default withData(CardContainer);

// <Button onClick={()=>this.props.getDashData(0)}>GetData</Button>
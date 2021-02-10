import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
// import {FormattedMessage} from 'localization';
import { Modal,Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug} from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import _ from 'lodash';
import {nrclogo,polarlogo} from 'assets';
import { Typography } from 'antd';
const {  Link } = Typography;

const relaceTextByEmailLink=(value)=>{
     const reg=/\{.*?\}/g;
    if(!_.isString(value))return <span>{value}</span>;
    
    const parts = value.split(reg);
    const placeholders=value.match(/[^{\}]+(?=})/g);
    if(!placeholders) return <span>{value}</span>;
    for (var i = 1; i < parts.length; i += 1) {
      parts[i] = [<Link key={i} href={`mailto:${placeholders[i-1]}`} target="_blank"> {placeholders[i-1]}</Link>,<span key={i+1}>{parts[i]}</span>];
    }
    return <span>{parts}</span>;
};
const relaceTextByLink=(value)=>{
     const reg=/\{.*?\}/g;
    if(!_.isString(value))return <span>{value}</span>;
    
    const parts = value.split(reg);
    const placeholders=value.match(/[^{\}]+(?=})/g);
    if(!placeholders) return <span>{value}</span>;
    for (var i = 1; i < parts.length; i += 1) {
      const p=placeholders[i-1];
       const [_text,_hyperlink]=p.split(",");
       const text=_text.split("=")[1];
       const hyperlink=_hyperlink.split("=")[1];
       console.log(text,hyperlink)
       parts[i]=[<Link key={i}  style={{fontSize:10,display: "inline-block"}} href={hyperlink} target="_blank">{text} </Link>,<span key={i+1}>{parts[i]}</span>];
              
      
    }
    return <span>{parts}</span>;
};

import {messages} from 'localization';

import {FormattedMessage} from 'localization';
// import {withData} from 'dataContext.js';

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
export const Description = styled.div`
  ${props=>props.width?`width:${props.width}px`:null};
  font-size: 10px;
  color: #5d5d5d;
  line-height: 1.5;
  overflow: hidden;
  white-space: break-spaces;
  margin-bottom:8px;
`;
export const TitleContainer= styled.div`
  display:flex;
   justify-content: space-between;
   margin-right:36px;
`;
export const IconsContainer= styled.div`
  display:flex;
  align-items: center;
`;
const Bold = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin:16px 0 4px;
`;

const IconCss=css`
  margin:0 4px;

`

const Version=styled.span`
  ${IconCss}
  font-size: 10px;
  color: #777;
  
`
const ContactContainer=styled.div`
display:flex;
justify-content: space-around;
align-items: center;
`
const ContactLogo=styled.img`
height:50px;

`

const StyledFontAwesome = styled(FontAwesomeIcon)`
    ${IconCss}
    color:${props=>props.theme.icon};
    cursor:pointer;
`;




export default class MyModal extends React.PureComponent {

    static propTypes={
     visible:PropTypes.bool,
     handleModal:PropTypes.func,
     lng:PropTypes.string
    
    
    };
    static defaultProps={
      visible:false,
      handleModal:()=>null,
      lng:'en'
    };
  render(){
    

    return(
    <Modal
          visible={this.props.visible}
          onOk={this.props.handleModal}
          onCancel={this.props.handleModal}
          footer={null}
          title={<TitleContainer>
            <Title><FormattedMessage id={'topheader.about'}/></Title>
            <IconsContainer>
              <Version><FormattedMessage id={'version'}/></Version>
               <Tooltip title=<FormattedMessage id={'tooltip.bug'}/>>
                  <Link href="https://github.com/meracan/meracan-arctic/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBug%5D" target="_blank"><StyledFontAwesome icon={faBug}/></Link>
               </Tooltip>
               <Tooltip title=<FormattedMessage id={'tooltip.github'}/>>
                  <Link href="https://github.com/meracan/meracan-arctic" target="_blank"><StyledFontAwesome icon={faGithub}/></Link>
               </Tooltip>               
            </IconsContainer>
          </TitleContainer>}
        >
        <Description>{relaceTextByLink(messages[this.props.lng]['about.intro'])}</Description>
        <Description>{relaceTextByLink(messages[this.props.lng]['about.documentation'])}</Description>
        <Bold><FormattedMessage id={'about.termheader'}/></Bold> 
        <Description><FormattedMessage id={'about.term'}/></Description>
        <Bold><FormattedMessage id={'about.contactheader'}/></Bold> 
        <ContactContainer>
          <ContactLogo src={nrclogo} />
          <Description>{relaceTextByEmailLink(messages[this.props.lng]['about.contact'])}</Description>
        </ContactContainer>
        <Bold><FormattedMessage id={'about.ackheader'}/></Bold> 
        <ContactContainer>
          <ContactLogo src={polarlogo} />
          <Description width={260}><FormattedMessage id={'about.ack'}/></Description>
         </ContactContainer>
        </Modal>
        )
 

  }
}

// export default withData(MyModal)
import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
// import {FormattedMessage} from 'localization';
import { Modal } from 'antd';
// import {relaceTextByLink} from 'utils.js';


// import {withData} from 'dataContext.js';

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  
`;
export const Description = styled.div`
  font-size: 10px;
  color: #777;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
`;



export default class MyModal extends React.PureComponent {

    static propTypes={
     visible:PropTypes.bool,
     handleModal:PropTypes.func,
    
    
    };
    static defaultProps={
      visible:false,
      handleModal:()=>null
    };
  render(){
    

    return(
    <Modal
          
          visible={this.props.visible}
          onOk={this.props.handleModal}
          onCancel={this.props.handleModal}
          footer={null}
        >
         
         
         
        </Modal>
        )
 

  }
}

// export default withData(MyModal)
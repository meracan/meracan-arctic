import React from 'react';

import {About,AppContext} from 'components/common';


export default {
  title: 'Components/About',
  component: About,
};

const Template = (args) => <AppContext><About {...args} /></AppContext>;

export const Primary = Template.bind({});
Primary.args = {
  visible:true
};



import React from 'react';

import {Dashboard,AppContext} from 'components/common';


export default {
  title: 'Components/Dashboard',
  component: Dashboard,
};

const Template = (args) => <AppContext><Dashboard {...args} /></AppContext>;

export const Primary = Template.bind({});
Primary.args = {
  loading:false,
  dashData:{
    aep:[10],
    x:[1],
    y:[1],
    fs:[0.0]
  },
  timeData:["2000-01-01T00:00"],
  dashID:0
  
};



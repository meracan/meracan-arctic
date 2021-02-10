import React from 'react';

import {Velocity,AppContext} from 'components/common';


export default {
  title: 'Components/Velocity',
  component: Velocity,
};

const Template = (args) => <AppContext><Velocity {...args} /></AppContext>;

export const Primary = Template.bind({});
Primary.args = {
  dashData:{fs_t_0:[0,1,2]},
  dashID:0,
  timeData:[new Date(Date.UTC(2000,0,1)),new Date(Date.UTC(2000,0,2)),new Date(Date.UTC(2000,0,3))]
  
};



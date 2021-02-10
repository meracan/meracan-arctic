import React from 'react';

import {Legend,AppContext} from 'components/common';


export default {
  title: 'Components/Legend',
  component: Legend,
};

const Template = (args) => <AppContext><Legend {...args} /></AppContext>;

export const Primary = Template.bind({});
Primary.args = {
  
};



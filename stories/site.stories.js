import React from 'react';
import Main from 'components/main.js';


export default {
  title: 'Components/App',
  component: Main,
};

const Template = (args) => <Main {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  
};



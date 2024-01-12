import React from 'react';
// import CommonHeader from './CommonHeader';
import CommonHeader from "./CommonHeader"

export default {
    title: 'Schema Components/CommonHeader',
  component: CommonHeader,
};

const Template = (args) => <CommonHeader {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
    Title:"Create Polls",
    Button1:"save AS Draft",
    Button2:"Submit",
    Tab1:"For Review",
    Tab2:"Publish",
};

export const HeaderCommon = {
  args: {
    Title:"Create Polls",
    Button1:"save AS Draft",
    Button2:"Submit",
    Tab1:"For Review",
    Tab2:"Publish",
  },
};

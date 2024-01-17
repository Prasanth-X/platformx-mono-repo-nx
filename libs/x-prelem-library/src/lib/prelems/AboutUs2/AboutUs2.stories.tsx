import React from "react";
import { Story, Meta } from "@storybook/react";
import AboutUs2 from "./AboutUs2";

export default {
  title: "Prelems/About Us 2",
  component: AboutUs2,
} as Meta;

const Template: Story = (args) => <AboutUs2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: AboutUs2.defaultProps.content,
  authoringHelper: AboutUs2.defaultProps.authoringHelper,
  analytics: AboutUs2.defaultProps.analytics,
  secondaryArgs: AboutUs2.defaultProps.secondaryArgs,
};

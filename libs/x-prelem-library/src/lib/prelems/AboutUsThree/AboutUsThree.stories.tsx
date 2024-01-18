import React from "react";
import { Story, Meta } from "@storybook/react";
import AboutUsThree from "./AboutUsThree";

export default {
  title: "Prelems/About Us Three",
  component: AboutUsThree,
} as Meta;

const Template: Story = (args) => <AboutUsThree {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: AboutUsThree.defaultProps.content,
  authoringHelper: AboutUsThree.defaultProps.authoringHelper,
  analytics: AboutUsThree.defaultProps.analytics,
  secondaryArgs: AboutUsThree.defaultProps.secondaryArgs,
};

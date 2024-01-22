import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner3 from "./Banner3";

export default {
  title: "Prelems/Banner 2",
  component: Banner3,
} as Meta;

const Template: Story = (args) => <Banner3 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner3.defaultProps.content,
  authoringHelper: Banner3.defaultProps.authoringHelper,
  analytics: Banner3.defaultProps.analytics,
  secondaryArgs: Banner3.defaultProps.secondaryArgs,
};

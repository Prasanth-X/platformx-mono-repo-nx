import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner1 from "./Banner1";

export default {
  title: "Prelems/Banner 2",
  component: Banner1,
} as Meta;

const Template: Story = (args) => <Banner1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner1.defaultProps.content,
  authoringHelper: Banner1.defaultProps.authoringHelper,
  analytics: Banner1.defaultProps.analytics,
  secondaryArgs: Banner1.defaultProps.secondaryArgs,
};

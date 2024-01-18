import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner2 from "./Banner2";

export default {
  title: "Prelems/Banner 2",
  component: Banner2,
} as Meta;

const Template: Story = (args) => <Banner2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner2.defaultProps.content,
  authoringHelper: Banner2.defaultProps.authoringHelper,
  analytics: Banner2.defaultProps.analytics,
  secondaryArgs: Banner2.defaultProps.secondaryArgs,
};

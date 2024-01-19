import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner6 from "./Banner6";

export default {
  title: "Prelems/Banner6",
  component: Banner6,
} as Meta;

const Template: Story = (args) => <Banner6 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner6.defaultProps.content,
  authoringHelper: Banner6.defaultProps.authoringHelper,
  analytics: Banner6.defaultProps.analytics,
  secondaryArgs: Banner6.defaultProps.secondaryArgs,
};

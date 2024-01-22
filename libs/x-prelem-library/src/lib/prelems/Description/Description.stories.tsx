import React from "react";
import { Story, Meta } from "@storybook/react";
import Description from "./Description";

export default {
  title: "Prelems/Banner 2",
  component: Description,
} as Meta;

const Template: Story = (args) => <Description {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Description.defaultProps.content,
  authoringHelper: Description.defaultProps.authoringHelper,
  analytics: Description.defaultProps.analytics,
  secondaryArgs: Description.defaultProps.secondaryArgs,
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import Banner7 from "./Banner7";

export default {
  title: "Prelems/Banner 7",
  component: Banner7,
} as Meta;

const Template: Story = (args) => <Banner7 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Banner7.defaultProps.content,
  authoringHelper: Banner7.defaultProps.authoringHelper,
  analytics: Banner7.defaultProps.analytics,
  secondaryArgs: Banner7.defaultProps.secondaryArgs,
};

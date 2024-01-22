import React from "react";
import { Story, Meta } from "@storybook/react";
import FullWidthImage from "./FullWidthImage";

export default {
  title: "Prelems/Banner 2",
  component: FullWidthImage,
} as Meta;

const Template: Story = (args) => <FullWidthImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FullWidthImage.defaultProps.content,
  authoringHelper: FullWidthImage.defaultProps.authoringHelper,
  analytics: FullWidthImage.defaultProps.analytics,
  secondaryArgs: FullWidthImage.defaultProps.secondaryArgs,
};

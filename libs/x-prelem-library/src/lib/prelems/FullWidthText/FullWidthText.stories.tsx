import React from "react";
import { Story, Meta } from "@storybook/react";
import FullWidthText from "./FullWidthText";

export default {
  title: "Prelems/Banner 2",
  component: FullWidthText,
} as Meta;

const Template: Story = (args) => <FullWidthText {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FullWidthText.defaultProps.content,
  authoringHelper: FullWidthText.defaultProps.authoringHelper,
  analytics: FullWidthText.defaultProps.analytics,
  secondaryArgs: FullWidthText.defaultProps.secondaryArgs,
};

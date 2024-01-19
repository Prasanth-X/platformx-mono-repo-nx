import React from "react";
import { Story, Meta } from "@storybook/react";
import FullWidthBanner3 from "./FullWidthBanner3";

export default {
  title: "Prelems/Full Width Banner 3",
  component: FullWidthBanner3,
} as Meta;

const Template: Story = (args) => <FullWidthBanner3 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FullWidthBanner3.defaultProps.content,
  authoringHelper: FullWidthBanner3.defaultProps.authoringHelper,
  analytics: FullWidthBanner3.defaultProps.analytics,
  secondaryArgs: FullWidthBanner3.defaultProps.secondaryArgs,
};

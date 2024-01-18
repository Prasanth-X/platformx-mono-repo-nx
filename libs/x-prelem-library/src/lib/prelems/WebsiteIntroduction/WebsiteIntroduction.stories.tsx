import React from "react";
import { Story, Meta } from "@storybook/react";
import WebsiteIntroduction from "./WebsiteIntroduction";

export default {
  title: "Prelems/Website Introduction",
  component: WebsiteIntroduction,
} as Meta;

const Template: Story = (args) => <WebsiteIntroduction {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: WebsiteIntroduction.defaultProps.content,
  authoringHelper: WebsiteIntroduction.defaultProps.authoringHelper,
  analytics: WebsiteIntroduction.defaultProps.analytics,
  secondaryArgs: WebsiteIntroduction.defaultProps.secondaryArgs,
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import WebsiteIntroduction4 from "./WebsiteIntroduction4";

export default {
  title: "Prelems/Website Introduction 4",
  component: WebsiteIntroduction4,
} as Meta;

const Template: Story = (args) => <WebsiteIntroduction4 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: WebsiteIntroduction4.defaultProps.content,
  authoringHelper: WebsiteIntroduction4.defaultProps.authoringHelper,
  analytics: WebsiteIntroduction4.defaultProps.analytics,
  secondaryArgs: WebsiteIntroduction4.defaultProps.secondaryArgs,
};

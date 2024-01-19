import React from "react";
import { Story, Meta } from "@storybook/react";
import WebsiteIntroduction2 from "./WebsiteIntroduction2";

export default {
  title: "Prelems/Website Introduction 2",
  component: WebsiteIntroduction2,
} as Meta;

const Template: Story = (args) => <WebsiteIntroduction2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: WebsiteIntroduction2.defaultProps.content,
  authoringHelper: WebsiteIntroduction2.defaultProps.authoringHelper,
  analytics: WebsiteIntroduction2.defaultProps.analytics,
  secondaryArgs: WebsiteIntroduction2.defaultProps.secondaryArgs,
};

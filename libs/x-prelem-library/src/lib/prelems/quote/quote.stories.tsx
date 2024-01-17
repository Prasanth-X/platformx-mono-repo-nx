import React from "react";
import { Story, Meta } from "@storybook/react";
import Quote from "./Quote";

export default {
  title: "Prelems/Quote",
  component: Quote,
} as Meta;

const Template: Story = (args) => <Quote {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Quote.defaultProps.content,
  authoringHelper: Quote.defaultProps.authoringHelper,
  analytics: Quote.defaultProps.analytics,
  secondaryArgs: Quote.defaultProps.secondaryArgs,
};

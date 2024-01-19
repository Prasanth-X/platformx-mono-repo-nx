import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceShowcase from "./ServiceShowcase";

export default {
  title: "Prelems/Quote",
  component: ServiceShowcase,
} as Meta;

const Template: Story = (args) => <ServiceShowcase {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceShowcase.defaultProps.content,
  authoringHelper: ServiceShowcase.defaultProps.authoringHelper,
  analytics: ServiceShowcase.defaultProps.analytics,
  secondaryArgs: ServiceShowcase.defaultProps.secondaryArgs,
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import ServiceCard from "./ServiceCards";

export default {
  title: "Prelems/About Us 2",
  component: ServiceCard,
} as Meta;

const Template: Story = (args) => <ServiceCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ServiceCard.defaultProps.content,
  authoringHelper: ServiceCard.defaultProps.authoringHelper,
  analytics: ServiceCard.defaultProps.analytics,
  secondaryArgs: ServiceCard.defaultProps.secondaryArgs,
};

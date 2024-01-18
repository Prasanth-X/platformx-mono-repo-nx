import React from "react";
import { Story, Meta } from "@storybook/react";
import Testimonial from "./Testimonial";

export default {
  title: "Prelems/Product Summary",
  component: Testimonial,
} as Meta;

const Template: Story = (args) => <Testimonial {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Testimonial.defaultProps.content,
  authoringHelper: Testimonial.defaultProps.authoringHelper,
  analytics: Testimonial.defaultProps.analytics,
  secondaryArgs: Testimonial.defaultProps.secondaryArgs,
};

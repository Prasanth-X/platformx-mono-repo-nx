import React from "react";
import { Story, Meta } from "@storybook/react";
import DynamicPrelemWithCarousel2 from "./DynamicPrelemWithCarousel2";

export default {
  title: "Prelems/Dynamic Prelem With Carousel2",
  component: DynamicPrelemWithCarousel2,
} as Meta;

const Template: Story = (args) => <DynamicPrelemWithCarousel2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: DynamicPrelemWithCarousel2.defaultProps.content,
  authoringHelper: DynamicPrelemWithCarousel2.defaultProps.authoringHelper,
  analytics: DynamicPrelemWithCarousel2.defaultProps.analytics,
  secondaryArgs: DynamicPrelemWithCarousel2.defaultProps.secondaryArgs,
};

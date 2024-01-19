import React from "react";
import { Story, Meta } from "@storybook/react";
import DynamicPrelemWithCarousel1 from "./DynamicPrelemWithCarousel1";

export default {
  title: "Prelems/Dynamic Prelem With Carousel1",
  component: DynamicPrelemWithCarousel1,
} as Meta;

const Template: Story = (args) => <DynamicPrelemWithCarousel1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: DynamicPrelemWithCarousel1.defaultProps.content,
  authoringHelper: DynamicPrelemWithCarousel1.defaultProps.authoringHelper,
  analytics: DynamicPrelemWithCarousel1.defaultProps.analytics,
  secondaryArgs: DynamicPrelemWithCarousel1.defaultProps.secondaryArgs,
};

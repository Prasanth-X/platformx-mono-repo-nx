import React from "react";
import { Story, Meta } from "@storybook/react";
import AnimationOnPageScroll from "./AnimationOnPageScroll";

export default {
  title: "Prelems/Animation On PageScroll",
  component: AnimationOnPageScroll,
} as Meta;

const Template: Story = (args) => <AnimationOnPageScroll {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: AnimationOnPageScroll.defaultProps.content,
  authoringHelper: AnimationOnPageScroll.defaultProps.authoringHelper,
  analytics: AnimationOnPageScroll.defaultProps.analytics,
};

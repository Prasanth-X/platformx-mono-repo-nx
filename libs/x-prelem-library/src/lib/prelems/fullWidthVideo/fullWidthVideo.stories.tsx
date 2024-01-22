import React from "react";
import { Story, Meta } from "@storybook/react";
import FullWidthVideo from "./FullWidthVideo";

export default {
  title: "Prelems/Banner 2",
  component: FullWidthVideo,
} as Meta;

const Template: Story = (args) => <FullWidthVideo {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: FullWidthVideo.defaultProps.content,
  authoringHelper: FullWidthVideo.defaultProps.authoringHelper,
  analytics: FullWidthVideo.defaultProps.analytics,
  secondaryArgs: FullWidthVideo.defaultProps.secondaryArgs,
};

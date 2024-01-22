import React from "react";
import { Story, Meta } from "@storybook/react";
import ImageCrousel1 from "./ImageCrousel1";

export default {
  title: "Prelems/Banner 2",
  component: ImageCrousel1,
} as Meta;

const Template: Story = (args) => <ImageCrousel1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ImageCrousel1.defaultProps.content,
  authoringHelper: ImageCrousel1.defaultProps.authoringHelper,
  analytics: ImageCrousel1.defaultProps.analytics,
  secondaryArgs: ImageCrousel1.defaultProps.secondaryArgs,
};

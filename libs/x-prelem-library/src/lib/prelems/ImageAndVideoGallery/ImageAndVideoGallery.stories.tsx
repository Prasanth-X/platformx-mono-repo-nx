import React from "react";
import { Story, Meta } from "@storybook/react";
import ImageAndVideoGallery from "./ImageAndVideoGallery";

export default {
  title: "Prelems/ProductSummaryViaImage2",
  component: ImageAndVideoGallery,
} as Meta;

const Template: Story = (args) => <ImageAndVideoGallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ImageAndVideoGallery.defaultProps.content,
  authoringHelper: ImageAndVideoGallery.defaultProps.authoringHelper,
  analytics: ImageAndVideoGallery.defaultProps.analytics,
  secondaryArgs: ImageAndVideoGallery.defaultProps.secondaryArgs,
};

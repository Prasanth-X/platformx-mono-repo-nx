import React from "react";
import { Story, Meta } from "@storybook/react";
import ImageVideoGalleryModalSlider from "./ImageVideoGalleryModalSlider";

export default {
  title: "Prelems/Quote",
  component: ImageVideoGalleryModalSlider,
} as Meta;

const Template: Story = (args) => <ImageVideoGalleryModalSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  openModal: false,
  handleClose: () => {},
  contentType: "image",
  sliderData: [],
  secondaryArgs: ImageVideoGalleryModalSlider.defaultProps.secondaryArgs,
};

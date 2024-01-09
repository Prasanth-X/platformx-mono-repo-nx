// src/components/ImageCrop/ImageCrop.stories.tsx

import React from 'react';
import ImageCrop from './ImageCrop';

export default {
  component: ImageCrop,
  title: 'ImageCrop',
};

const Template = (args) => <ImageCrop {...args} />;

export const Primary: any = Template.bind({});
Primary.args = {
  open: true,
  backTo: () => console.log('Back to clicked'),
  doneCropCompleted: (cropImages, ext, originalImageRelativePath, visibility) => {
    console.log('Done crop completed:', cropImages, ext, originalImageRelativePath, visibility);
  },
  cropImages: [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ],
};

export const Heading: any = Template.bind({});
Heading.args = {
  open: true,
  backTo: () => console.log('Back to clicked'),
  doneCropCompleted: (cropImages, ext, originalImageRelativePath, visibility) => {
    console.log('Done crop completed:', cropImages, ext, originalImageRelativePath, visibility);
  },
  cropImages: [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 0, y: 50 },
    { x: 50, y: 50 },
  ],
};
Heading.play = async ({ canvasElement }) => {
  // play function logic goes here
};


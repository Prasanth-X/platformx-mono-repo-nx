// src/components/PictureComponent/PictureComponent.stories.tsx

import React from 'react';
import PictureComponent from './PictureComponent';

export default {
  title: 'PictureComponent',
  component: PictureComponent,
};

const Template = (args) => <PictureComponent {...args} />;

const croppedImages = [
  { aspect_ratio: 'hero', folder_path: '/path/to/hero' },
  { aspect_ratio: 'landscape', folder_path: '/path/to/landscape' },
  { aspect_ratio: 'card2', folder_path: '/path/to/card2' },
  { aspect_ratio: 'square', folder_path: '/path/to/square' },
  { aspect_ratio: 'card1', folder_path: '/path/to/card1' },
  { aspect_ratio: 'portrait', folder_path: '/path/to/portrait' },
];

const imgOrder = {
  1440: 'hero',
  1280: 'landscape',
  1024: 'card2',
  768: 'square',
  600: 'card1',
  320: 'portrait',
};

export const Default: any = Template.bind({});
Default.args = {
  croppedImages: croppedImages,
  imgOrder: imgOrder,
  extension: 'jpg',
};

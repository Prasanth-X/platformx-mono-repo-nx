// src/components/ShowCaseCrops/ShowCaseCrops.stories.tsx

import React from 'react';
import ShowCaseCrops from './ShowCaseCrops';

export default {
  title: 'ShowCaseCrops',
  component: ShowCaseCrops,
};

const Template = (args) => <ShowCaseCrops {...args} />;

const images = [
  { visibility: 'public', folder_path: '/path/to/image1', aspect_ratio: '16:9' },
  { visibility: 'public', folder_path: '/path/to/image2', aspect_ratio: '4:3' },
  // Add more sample data as needed
];

export const Default: any = Template.bind({});
Default.args = {
  open: true,
  Images: images,
  backTo: () => console.log('BackTo clicked'),
  handleEdit: () => console.log('Edit clicked'),
  extension: 'jpg',
};

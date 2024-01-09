// src/components/ImageRender/ImageRender.stories.tsx

import React from 'react';
import ImageRender from './ImageRender';
import { action } from '@storybook/addon-actions';

export default {
  title: 'ImageRender',
  component: ImageRender,
};

const Template = (args) => <ImageRender {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  content: { Thumbnail: 'https://example.com/default-thumbnail.jpg', bitStreamId: '12345' },
  updateField: action('updateField'),
  originalImage: { original_image_relative_path: '', bitStreamId: '12345', auto: false, ext: 'jpg', visibility: 'public' },
  publishedImages: [],
};

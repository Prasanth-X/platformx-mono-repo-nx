import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import DuplicateContentPopup from './DuplicateContentPopup';

const meta: Meta<typeof DuplicateContentPopup> = {
  component: DuplicateContentPopup,
  title: 'Platfomx-Component-Library/DuplicateContentPopup',
};
export default meta;
type Story = StoryObj<typeof DuplicateContentPopup>;

const Template = (args) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [title, setTitle] = useState('Initial Title');
  const [language, setLanguage] = useState([]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDone = (pageExist, currTitle) => {
    // Handle the done button action here
    console.log('Done button clicked');
    console.log('Page Exist:', pageExist);
    console.log('Current Title:', currTitle);
  };

  return <DuplicateContentPopup {...args} isDialogOpen={isDialogOpen} closeButtonHandle={handleClose} doneButtonHandle={handleDone} titledata={title} language={language} setLanguage={setLanguage} />;
};
export const Primary: any = Template.bind({});
Primary.args = {
  titledata: 'Initial Title',
  isDialogOpen: true,
  closeButtonHandle: () => console.log('Close button clicked'),
  doneButtonHandle: (pageExist: boolean, currTitle: string) =>
    console.log('Done button clicked:', pageExist, currTitle),
  contentType: 'Page', // You may adjust the default values as needed
  language: [],
  setLanguage: () => console.log('Language set'),
}; 
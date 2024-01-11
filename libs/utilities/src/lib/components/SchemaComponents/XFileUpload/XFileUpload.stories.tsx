import XFileUpload from './XFileUpload';

export default {
  title: 'X Component Library/FileUpload',
  component: XFileUpload,
};

const Template = (args) => <XFileUpload {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  url: '',
  chooseText: 'Choose your image',
  chooseType: 'image',
};

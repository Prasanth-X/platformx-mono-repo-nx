import { AddImageBackgroundColor } from './AddImageBackgroundColor';

export default {
  title: 'X Component Library/AddImageBackgroundColor',
  component: AddImageBackgroundColor,
};
const Template = (args) => <AddImageBackgroundColor {...args} />;
const AddImageBackgroundColorTemp: any = Template.bind({});

AddImageBackgroundColorTemp.args = {
  state:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCDZZfnTfo6P6OVAR4PEbLGDBPs3hkIocmS18c9Y6MA&s',
  isImg: true,

  backgroundColor: '#b29a53',

  label: 'add image/color',
};

export const AddImageBackGroundColor = {
  args: {
    state:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCDZZfnTfo6P6OVAR4PEbLGDBPs3hkIocmS18c9Y6MA&s',
    isImg: false,
    backgroundColor: '#b29a53',

    label: 'add image/color',
  },
};

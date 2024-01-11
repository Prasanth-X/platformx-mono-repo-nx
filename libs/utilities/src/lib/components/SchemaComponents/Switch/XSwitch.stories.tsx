
import XSwitch from "./XSwitch";
export default {
  title: 'X Component Library/Switch',
  component: XSwitch,
};

const Template = (args) => <XSwitch {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  disabled: false,
  color: '#000000',
};


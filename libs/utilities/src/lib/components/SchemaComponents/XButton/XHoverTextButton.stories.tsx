import SaveIcon from '@mui/icons-material/Save';
import { XHoverTextButton } from './XHoverTextButton';

export default {
  title: 'X Component Library/Button',
  component: XHoverTextButton,
  argTypes: {
    onClick: { action: 'Click handler' },
  },
};

const Template = (args) => <XHoverTextButton {...args} />;

const HoverTextButton: any = Template.bind({});

HoverTextButton.args = {
  variant: 'primaryButton',
};

export const HoverText_Button = {
  args: {
    label: 'X Hover Text Button',
    variant: 'primaryButton',
    Icon: <SaveIcon />,
  },
};

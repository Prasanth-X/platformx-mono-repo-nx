import SaveIcon from '@mui/icons-material/Save';
import { XIconButton } from './XIconButton';

export default {
  title: 'X Component Library/Button',
  component: XIconButton,
  argTypes: {
    onClick: { action: 'Click handler' },
  },
};

const Template = (args) => <XIconButton {...args} />;

const IconButton: any = Template.bind({});

IconButton.args = {
  variant: 'primaryButton',
};

export const Icon_Button = {
  args: {
    variant: 'primaryButton',
    startIcon: <SaveIcon />,
  },
};

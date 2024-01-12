import TitleSubTitle from './TitleSubTitle';

export default {
  title: 'X Component Library/TitleSubTitle',
  component: TitleSubTitle,
};

const Template = (args) => <TitleSubTitle {...args} />;

const TitleSubTitleInput: any = Template.bind({});

TitleSubTitleInput.args = {
  title: 'Short Title*',
  subTitle: 'This will be the your quiz subtitle',
  titleVariant: 'h6medium',
  subTitleVariant: 'h7regular',
};

export const XTitleSubTitle = {
  argTypes: {
    titleVariant: {
      options: [
        'h2bold',
        'h2semibold',
        'h2regular',
        'h2medium',
        'h3bold',
        'h3semibold',
        'h3regular',
        'h3medium',
        'h4bold',
        'h4semibold',
        'h4regular',
        'h4medium',
      ],
      control: { type: 'select' },
    },
    subTitleVariant: {
      options: [
        'h2bold',
        'h2semibold',
        'h2regular',
        'h2medium',
        'h3bold',
        'h3semibold',
        'h3regular',
        'h3medium',
        'h4bold',
        'h4semibold',
        'h4regular',
        'h4medium',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    title: 'Short Title*',
    subTitle: 'This will be the your quiz subtitle',
    titleVariant: 'h6medium',
    subTitleVariant: 'h7regular',
  },
};

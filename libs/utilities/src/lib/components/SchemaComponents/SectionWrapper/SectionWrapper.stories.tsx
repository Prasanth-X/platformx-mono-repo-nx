import SectionWrapper from './SectionWrapper';

export default {
  title: 'X Component Library/Section Wrapper',
  component: SectionWrapper,
};

const Template = (args) => <SectionWrapper {...args} />;

const TemplateSectionWrapper: any = Template.bind({});

TemplateSectionWrapper.args = {
  variant: {
    number: '01',
    title: 'Title & Description',
    subTitle: 'Fields with * are mandatory',
    titleVariant: 'p3semibold',
    subTitleVariant: 'p4regular',
    children: 'You can add any component here',
  },
};

export const Wrapper = {
  args: {
    number: '01',
    title: 'Title & Description',
    subTitle: 'Fields with * are mandatory',
    titleVariant: 'p3semibold',
    subTitleVariant: 'p4regular',
    children: 'You can add any component here',
  },
};

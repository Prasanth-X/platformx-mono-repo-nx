import ImageVideo from './ChildComponents/ImageVideo';
import { TitleDescription } from './ChildComponents/TitleDescription';
import ContentWrapper from './ContentWrapper';

export default {
  title: 'X Component Library/Content Wrapper',
  component: ContentWrapper,
};

const Template = (args) => <ContentWrapper {...args} />;

const TemplateSectionWrapper: any = Template.bind({});

TemplateSectionWrapper.args = {
  variant: {
    scrollTo: 0,
  },
};

export const Wrapper = {
  args: {
    scrollTo: 0,
    Title: 'Create Polls',
    Button1: 'save AS Draft',
    Button2: 'Submit',
    Tab1: 'For Review',
    Tab2: 'Publish',
    sectionList: [
      {
        id: 'titleDescription',
        tooltip: 'title_description',
        thresholdValue: 0.5,
        sectionContent: {
          number: '01',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <TitleDescription />,
        },
      },
      {
        id: 'imageVideo',
        tooltip: 'image_video',
        thresholdValue: 0.5,
        sectionContent: {
          number: '02',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <ImageVideo />,
        },
      },
      {
        id: 'questions',
        tooltip: 'questions',
        thresholdValue: 1,
        sectionContent: {
          number: '03',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
      {
        id: 'results',
        tooltip: 'results',
        thresholdValue: 1,
        sectionContent: {
          number: '04',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
      {
        id: 'tags',
        tooltip: 'choose_tags',
        thresholdValue: 0.5,
        sectionContent: {
          number: '05',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
      {
        id: 'socialShare',
        tooltip: 'social_share',
        thresholdValue: 1,
        sectionContent: {
          number: '06',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
      {
        id: 'Analytics',
        tooltip: 'analytics',
        thresholdValue: 1,
        sectionContent: {
          number: '07',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
      {
        id: 'seo',
        tooltip: 'seo',
        thresholdValue: 1,
        sectionContent: {
          number: '08',
          title: 'title',
          subTitle: 'subTitle',
          titleVariant: 'p3semibold',
          subTitleVariant: 'p4regular',
          children: <>You can add any component here</>,
        },
      },
    ],
  },
};

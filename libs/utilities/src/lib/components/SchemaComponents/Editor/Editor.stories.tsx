import Editor from './Editor';

export default {
  title: 'X Component Library/Editor',
  component: Editor,
};

const Template = (args) => <Editor {...args} />;

const PrimaryInput: any = Template.bind({});

PrimaryInput.args = {
  title: 'Structure Data',
  isOpen: true,
  info: {
    structureData: {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: 'AutomationQUIZ_TestData',
      description: 'ewrewre efererr',
      hasPart: [
        {
          '@type': 'Question',
          name: 'Who will win ODI World Cup 2023?',
          suggestedAnswer: [
            {
              '@type': 'Answer',
              text: 'India',
            },
            {
              '@type': 'Answer',
              text: 'Eng',
            },
            {
              '@type': 'Answer',
              text: 'Aus',
            },
            {
              '@type': 'Answer',
              text: 'Srilanka',
            },
          ],
        },
      ],
    },
  },
  fieldName: 'structureData',
};

export const XEditor = {
  args: {
    title: 'Structure Data',
    isOpen: true,
    info: {
      structureData: {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: 'AutomationQUIZ_TestData',
        description: 'ewrewre efererr',
        hasPart: [
          {
            '@type': 'Question',
            name: 'Who will win ODI World Cup 2023?',
            suggestedAnswer: [
              {
                '@type': 'Answer',
                text: 'India',
              },
              {
                '@type': 'Answer',
                text: 'Eng',
              },
              {
                '@type': 'Answer',
                text: 'Aus',
              },
              {
                '@type': 'Answer',
                text: 'Srilanka',
              },
            ],
          },
        ],
      },
    },
    fieldName: 'structureData',
  },
};

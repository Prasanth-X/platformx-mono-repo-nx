import XTable from './XTable';

export default {
  title: 'X Component Library/Table',
  component: XTable,
};
const Template = (args) => <XTable  {...args} />;
const Temp: any = Template.bind({});

Temp.args = {
  data: {
    result_range_1: {
      to: '0',
      from: '24',
      quotes: 'A winner never stops trying',
    },
    result_range_2: {
      to: '25',
      from: '49',
      quotes: 'You cannot be a winner without maturity and consistency',
    },
    result_range_3: {
      to: '50',
      from: '74',
      quotes: 'In everything we do theres a winner and a loser',
    },
    result_range_4: {
      to: '75',
      from: '100',
      quotes: `hat's how I live my life, with belief. I am a winner`,
    },
  },
};

export const RangeTable = {
  args: {
    data: {
      result_range_1: {
        to: '0',
        from: '24',
        quotes: 'A winner never stops trying',
      },
      result_range_2: {
        to: '25',
        from: '49',
        quotes: 'You cannot be a winner without maturity and consistency',
      },
      result_range_3: {
        to: '50',
        from: '74',
        quotes: 'In everything we do theres a winner and a loser',
      },
      result_range_4: {
        to: '75',
        from: '100',
        quotes: `hat's how I live my life, with belief. I am a winner`,
      },
    },
  },
};

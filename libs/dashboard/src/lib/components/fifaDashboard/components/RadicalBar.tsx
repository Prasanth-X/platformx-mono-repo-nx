import { ResponsiveRadialBar } from '@nivo/radial-bar';

const data = [
  {
    id: 'Zurich | 79%',

    data: [
      { x: 'Item 1', y: 10 },

      { x: 'Item 2', y: 20 },

      { x: 'Item 3', y: 15 },
    ],
  },

  {
    id: 'Lugano | 68%',

    data: [
      { x: 'Item 1', y: 30 },

      { x: 'Item 2', y: 25 },

      { x: 'Item 3', y: 5 },
    ],
  },
];

const RadialBarChart = () => (
  <div style={{ width: '100%', height: '430px' }}>
    <ResponsiveRadialBar
      data={data}
      valueFormat='>-.2f'
      padding={0.4}
      cornerRadius={2}
      margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 80,
          translateY: 0,
          itemsSpacing: 6,
          itemDirection: 'left-to-right',
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
      colors={['#2874F0', '#3C91FF', '#6EB8F9']} // Set the colors as an array
    />
  </div>
);

export default RadialBarChart;

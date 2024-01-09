import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { Box } from '@mui/system';

const chartSetting = {
  width: 900,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -20px)',
    },
  },
};
const dataset = [
  {
    Orders: 5900,
    Revenue: 10000,
    Visits: 8600,
    day: 'SUN',
  },
  {
    Orders: 6000,
    Revenue: 8000,
    Visits: 7600,
    day: 'MON',
  },
  {
    Orders: 8000,
    Revenue: 7000,
    Visits: 9000,
    day: 'TUE',
  },
  {
    Orders: 7000,
    Revenue: 9000,
    Visits: 10000,
    day: 'WED',
  },
  {
    Orders: 5000,
    Revenue: 6000,
    Visits: 5000,
    day: 'THU',
  },
  {
    Orders: 7644,
    Revenue: 9000,
    Visits: 6000,
    day: 'FRI',
  },
  {
    Orders: 9000,
    Revenue: 10000,
    Visits: 8000,
    day: 'SAT',
  },
];

const valueFormatter = (value: number) => `${value}K`;

export default function SalesChart() {
  return (
    <Box
      className='chartLeftText'
      sx={{
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'center',
        '& svg g.Platform-x-ChartsAxis-directionY text.Platform-x-ChartsAxis-tickLabel': {
          textAnchor: 'end',
        },
        '& svg g.Platform-x-ChartsAxis-directionX text.Platform-x-ChartsAxis-tickLabel': {
          dominantBaseline: 'hanging',
        },
        // '& .Platform-x-BarElement-root': {
        //   width: '15px',
        // },
      }}
    >
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          {
            dataKey: 'Orders',
            label: 'View',
            valueFormatter,
            color: '#2874F0',
          },
          {
            dataKey: 'Revenue',
            label: 'Clicks',
            valueFormatter,
            color: '#3C91FF',
          },
          {
            dataKey: 'Visits',
            label: 'Enrolement',
            valueFormatter,
            color: '#6EB8F9',
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}

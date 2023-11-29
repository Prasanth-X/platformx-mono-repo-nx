import { Box } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -20px)',
    },
  },
};
const dataset = [
  {
    Orders: 400,
    Revenue: 500,
    Visits: 300,
    day: '0',
  },
  {
    Orders: 300,
    Revenue: 500,
    Visits: 200,
    day: '1',
  },
  {
    Orders: 500,
    Revenue: 300,
    Visits: 100,
    day: '2',
  },
  {
    Orders: 400,
    Revenue: 200,
    Visits: 100,
    day: '3',
  },
  {
    Orders: 500,
    Revenue: 100,
    Visits: 200,
    day: '4',
  },
  {
    Orders: 400,
    Revenue: 500,
    Visits: 300,
    day: '5',
  },
  {
    Orders: 500,
    Revenue: 400,
    Visits: 100,
    day: '6',
  },
];

export default function ReportGraph() {
  return (
    <Box
      className='chartLeftText'
      sx={{
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'center',
        '& svg g.Platform-x-ChartsAxis-directionY text.Platform-x-ChartsAxis-tickLabel':
          {
            textAnchor: 'end',
          },
        '& svg g.Platform-x-ChartsAxis-directionX text.Platform-x-ChartsAxis-tickLabel':
          {
            dominantBaseline: 'hanging',
          },
      }}
    >
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          {
            dataKey: 'Orders',
            color: '#0049B2',
          },
          {
            dataKey: 'Revenue',
            color: '#2874F0',
          },
          {
            dataKey: 'Visits',
            color: '#3C91FF',
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}

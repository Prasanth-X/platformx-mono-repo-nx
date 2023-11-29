import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
   //width: 700,
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
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
      series={[
        { dataKey: 'Orders', label: 'Orders', valueFormatter, color: '#ED7571' },
        { dataKey: 'Revenue', label: 'Revenue', valueFormatter, color: '#578CF7' },
        { dataKey: 'Visits', label: 'Visits', valueFormatter, color: '#64C87B' },
      ]}
      {...chartSetting}
    />
  );
}
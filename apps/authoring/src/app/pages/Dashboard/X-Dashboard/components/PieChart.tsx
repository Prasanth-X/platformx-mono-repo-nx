 import { PieChart } from '@mui/x-charts/PieChart';
 import { useDrawingArea } from '@mui/x-charts/hooks';
 import { styled } from '@mui/material/styles';

const data2 = [
  { label: 'Courses done', value: 2400, color: '#0049B2' },
  { label: 'On Progress', value: 4567, color: '#2874F0' },
  { label: 'To Do', value: 1398, color: '#3C91FF' },
];
const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));
const size = {
  // width: 507,
  // height: 250,
  // top: 70,
  // bottom: 70,
  // left: 100,
  // right:100,
  //margin={{ top: 70, bottom: 70, left: 100, right:100 }}

};
function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2} textAnchor="middle">
      {/* {children} */}
    </StyledText>
  );
}
const MuiPieChart: React.FC = () => {
  return (
    // <PieChart
    //   series={[
    //     {
    //       data: data2,
    //       cx: 170,
    //       cy: 120,
    //       innerRadius: 80,
    //       outerRadius: 120,
    //     },
    //   ]}
    //   height={250}
    //   // legend={{ hidden: true }}
    // >
    // <PieCenterLabel>Total: 10</PieCenterLabel>
    // </PieChart>

<PieChart 
  series={[{ data: data2, innerRadius: 90, outerRadius: 120, cx: 170, cy: 130 }]} 
   legend={{ direction: "row", position: { vertical: "bottom", horizontal: "middle" }}}
   height={300}
   sx={{
    '--ChartsLegend-itemWidth': '127px',
     '--ChartsLegend-itemMarkSize': '20px',
     '--ChartsLegend-labelSpacing': '5px',
     '--ChartsLegend-rootSpacing': '5px',
     '--ChartsLegend-rootOffsetY': '-12px',
     '--ChartsLegend-rootOffsetX': '50px',
  }}
   {...size}>
<PieCenterLabel>Total: 10</PieCenterLabel>
</PieChart>
  );
};

export default MuiPieChart;
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { addEllipsis } from "../utils/helper";

const BarChartHorizontal = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.bar;
  const CustomXAxisTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-80}
        y={0}
        dy={0}
        textAnchor='start'
        fontSize={config.fontSize}
        fill={config.textColor}>
        {addEllipsis(payload.value, config.textMaxLength)}
      </text>
    </g>
  );
  return (
    <Box className='barChartHorizontal pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
        <BarChart
          data={data}
          layout='vertical'
          margin={{ top: 20, right: 40, left: 60, bottom: 10 }}>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          <XAxis
            type='number'
            interval={0}
            dataKey={colnames[1]}
            tick={{ fontSize: config.fontSize, fill: config.textColor }}
          />
          <YAxis
            type='category'
            interval={0}
            dataKey={colnames[0]}
            tick={<CustomXAxisTick payload={data} x={0} y={0} />}
            // tick={{ fontSize: config.fontSize, fill: config.textColor }}
            tickMargin={20}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              height={36}
              iconType={config?.iconType as any}
            />
          )}
          <Bar
            dataKey={colnames[1]}
            fill={config.graphColor[0]}
            barSize={config.barSize}
            radius={config.radius}>
            {config.showValuesOnTop && (
              <LabelList
                dataKey={colnames[1]}
                position='right'
                fill={config.graphColor[0]}
                fontSize={config.fontSize}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartHorizontal;

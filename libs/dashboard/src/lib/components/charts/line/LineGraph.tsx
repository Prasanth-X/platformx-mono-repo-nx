import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const LineGraph = ({ itemData }: any) => {
  const { chartData: data, title } = itemData;
  const config = graph.line;
  const [firstKey] = Object.keys(data[0]);
  const isTimestamp = firstKey === config.timestamp;
  return (
    <Box className='areaGraph pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height} className='noxyAxsis'>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          {isTimestamp ? (
            <XAxis
              dataKey={firstKey}
              type='number'
              interval={0}
              tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
              textAnchor='end'
              angle={config.textXAngle}
              scale='time'
              domain={["auto", "auto"]}
              tick={{ fontSize: config.fontSize, fill: config.textColor }}
            />
          ) : (
            <XAxis
              dataKey={firstKey}
              interval={0}
              textAnchor='end'
              angle={config.textXAngle}
              tick={{ fontSize: config.fontSize, fill: config.textColor }}
            />
          )}
          <YAxis tick={{ fontSize: config.fontSize, fill: config.textColor }} />
          {isTimestamp ? (
            <Tooltip labelFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
          ) : (
            <Tooltip />
          )}
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              height={46}
              iconType={config?.iconType as any}
            />
          )}
          {Object.keys(data[0]).map((key, index) => {
            if (key !== firstKey) {
              return (
                <Line
                  key={index}
                  type={config.type as any}
                  dataKey={key}
                  name={key}
                  strokeWidth={config.strokeWidth}
                  stroke={config.graphColor[index % config.graphColor.length]}>
                  {config.showValuesOnTop && (
                    <LabelList
                      dataKey={key}
                      name={key}
                      position='top'
                      fill={config.graphColor[index % config.graphColor.length]}
                    />
                  )}
                </Line>
              );
            }
            return null;
          })}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineGraph;

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { addEllipsis } from "../utils/helper";

const CustomTooltip = ({ active, payload, colnames }: any) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    return (
      <div className='custom-tooltip'>
        <p className='recharts-default-tooltip'>{`${dataItem[colnames[0]]} : ${
          dataItem[colnames[1]]
        }`}</p>
      </div>
    );
  }
  return null;
};

const PieGraph = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.pie;
  const totalSum = data.reduce((accumulator: any, currentValue: any) => accumulator + currentValue[colnames[1]], 0);
  const CustomLabel = (item: any) => {
    let percentageVal = 0;
    if(item[colnames[1]] && totalSum) {
      percentageVal = (item[colnames[1]] / totalSum) * 100;
      return `${percentageVal.toFixed(2)}%`;
    }
    return `${0}%`;
  };
  const CustomLegend = ({ payload }: any) => {
    return (
      <Box className='recharts-legend-wrapper pie'>
        <ul className='recharts-default-legend'>
          {payload.map((item: any, index: number) => (
            <li
              key={`item-${index}`}
              style={{
                color: config.graphColor[index % config.graphColor.length],
              }}>
              <Box className='text'>
                <Box
                  className='boxshape'
                  style={{
                    background: config.graphColor[index % config.graphColor.length],
                  }}></Box>
                {addEllipsis(item[colnames[0]], 10)}
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    );
  };
  return (
    <Box className='pieGraph pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height}>
        <PieChart>
          {config.showGrid && <CartesianGrid strokeDasharray='3 3' />}
          <Pie
            data={data}
            dataKey={colnames[1]}
            cx='50%'
            cy='50%'
            outerRadius={config.pieSize}
            innerRadius={config.innerRadius}
            fontSize={config.fontSize}
            label={config.showLabel ? CustomLabel : false}>
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={config.graphColor[index % config.graphColor.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip colnames={colnames} />} />
          {config.showLegend && (
            <Legend
              content={() => <CustomLegend payload={data} />}
              verticalAlign={config.legendPosition as any}
              height={46}
              iconType={config?.iconType as any}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieGraph;

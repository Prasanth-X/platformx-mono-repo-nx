import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { graph } from '../Constants'

const BarChartVertical = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData
  const config = graph.bar
  const [firstKey] = Object.keys(data[0])
  const isTimestamp = firstKey === config.timestamp
  return (
    <Box className="barChartVertical pageGraph">
      <Typography variant="p3semibold" className="heading">
        {title}
      </Typography>
      <ResponsiveContainer
        width={config.width}
        height={config.height}
        className="noxyAxsis"
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 40 }}
        >
          {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {isTimestamp ? (
            <XAxis
              dataKey={colnames[0]}
              tick={{
                fontSize: config.fontSize,
                fill: config.textColor,
                alignmentBaseline: 'middle',
              }}
              tickMargin={20}
              interval={0}
              angle={config.textXAngle}
              dx={-25}
              tickFormatter={(unixTime: any) =>
                new Date(unixTime).toLocaleDateString()
              }
            />
          ) : (
            <XAxis
              dataKey={colnames[0]}
              tick={{
                fontSize: config.fontSize,
                fill: config.textColor,
                alignmentBaseline: 'mathematical',
              }}
              tickMargin={20}
              interval={0}
              angle={config.textXAngle}
              dx={-25}
            />
          )}
          <YAxis
            // type='number'
            tick={{ fontSize: config.fontSize, fill: config.textColor }}
          />
          {isTimestamp ? (
            <Tooltip
              cursor={{ fill: 'transparent' }}
              labelFormatter={(unixTime: any) =>
                new Date(unixTime).toLocaleDateString()
              }
            />
          ) : (
            <Tooltip cursor={{ fill: 'transparent' }} />
          )}
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              height={36}
              iconType={config?.iconType as any}
            />
          )}
          {isTimestamp ? (
            <>
              {Object.keys(data[0]).map((key, index) => {
                if (key !== firstKey) {
                  return (
                    <Bar
                      key={index}
                      dataKey={colnames[index]}
                      fill={
                        config.graphColor[
                        index - (1 % config.graphColor.length)
                        ]
                      }
                      barSize={config.barSize}
                      radius={config.radius}
                    >
                      {config.showValuesOnTop && (
                        <LabelList
                          dataKey={colnames[index]}
                          position="top"
                          fill={
                            config.graphColor[
                            index - (1 % config.graphColor.length)
                            ]
                          }
                          fontSize={config.fontSize}
                        />
                      )}
                    </Bar>
                  )
                }
                return null
              })}
            </>
          ) : (
            <>
              {Object.keys(data[0]).map((key, index) => {
                if (key !== firstKey) {
                  return (
                    <Bar
                      key={index}
                      dataKey={colnames[index]}
                      fill={
                        config.graphColor[
                        index - (1 % config.graphColor.length)
                        ]
                      }
                      barSize={config.barSize}
                      radius={config.radius}
                    >
                      {config.showValuesOnTop && (
                        <LabelList
                          dataKey={colnames[index]}
                          position="top"
                          fill={
                            config.graphColor[
                            index - (1 % config.graphColor.length)
                            ]
                          }
                          fontSize={config.fontSize}
                        />
                      )}
                    </Bar>
                  )
                }
                return null
              })}
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default BarChartVertical

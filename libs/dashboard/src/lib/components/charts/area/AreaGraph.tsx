import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { graph } from '../Constants'

const AreaGraph = ({ itemData }: any) => {
  const { chartData: data, title } = itemData
  const config = graph.area
  const [firstKey] = Object.keys(data[0])
  const isTimestamp = firstKey === config.timestamp
  return (
    <Box className="areaGraph pageGraph">
      <Typography variant="p3semibold" className="heading">
        {title}
      </Typography>
      <ResponsiveContainer
        width={config.width}
        height={config.height}
        className="noxyAxsis"
      >
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 40 }}
        >
          {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {isTimestamp ? (
            <XAxis
              dataKey={firstKey}
              interval={0}
              textAnchor="end"
              angle={config.textXAngle}
              // scale="time"
              tickFormatter={(unixTime: any) =>
                new Date(unixTime).toLocaleDateString()
              }
              tick={{ fontSize: config.fontSize, fill: config.textColor }}
            />
          ) : (
            <XAxis
              dataKey={firstKey}
              interval={0}
              textAnchor="end"
              angle={config.textXAngle}
              tick={{ fontSize: config.fontSize, fill: config.textColor }}
            />
          )}
          <YAxis tick={{ fontSize: config.fontSize, fill: config.textColor }} />
          {isTimestamp ? (
            <Tooltip
              labelFormatter={(unixTime: any) =>
                new Date(unixTime).toLocaleDateString()
              }
            />
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
                <Area
                  key={index}
                  type={config.type as any}
                  dataKey={key}
                  stackId={index}
                  stroke={
                    config.graphColor[(index - 1) % config.graphColor.length]
                  }
                  strokeWidth={config.strokeWidth}
                  // fill={`url(#MyGradient${index})`}
                  fill={
                    config.graphColor[(index - 1) % config.graphColor.length]
                  }
                >
                  {config.showValuesOnTop && (
                    <LabelList
                      dataKey={key}
                      name={key}
                      position="top"
                      fontSize={config.fontSize}
                      fill={
                        config.graphColor[
                        (index - 1) % config.graphColor.length
                        ]
                      }
                    />
                  )}
                </Area>
              )
            }
            return null
          })}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default AreaGraph

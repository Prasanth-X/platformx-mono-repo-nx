import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { graph } from '../Constants'

const BigNumber = ({ itemData }: any) => {
  const { chartData: data, title } = itemData
  const config = graph.area
  const [firstKey, secondKey] = Object.keys(data[0])
  const isTimestamp = firstKey === config.timestamp
  const getPercentageValue = () => {
    if (data[0] && data[1] && data[0][secondKey] && data[1][secondKey]) {
      const res =
        ((data[1][secondKey] - data[0][secondKey]) / data[0][secondKey]) * 100
      return res.toFixed(1) + '%'
    } else {
      return '0%'
    }
  }
  return (
    <Box className="bigNumber pageGraph">
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
          margin={{ top: 210, right: 10, left: 10, bottom: 40 }}
        >
          {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {isTimestamp ? (
            <Tooltip
              labelFormatter={(unixTime: any) =>
                new Date(unixTime).toLocaleDateString()
              }
            />
          ) : (
            <Tooltip />
          )}
          <svg>
            <text
              x="30"
              y="90"
              textAnchor="start"
              fontSize={config.bigNumberSize}
              fill="black"
            >
              9
            </text>
            <text
              x="30"
              y="170"
              textAnchor="start"
              fontSize={config.mediumNumberSize}
              fill="black"
            >
              {getPercentageValue()}
            </text>
          </svg>
          <defs>
            <linearGradient id="MyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={config.graphColor[0]}
                stopOpacity="0.4"
              />
              <stop
                offset="95%"
                stopColor={config.graphColor[0]}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <Legend
            verticalAlign={config.legendPosition as any}
            height={46}
            iconType={config?.iconType as any}
          />
          <Area
            type="monotone"
            dataKey={secondKey}
            stackId={0}
            stroke={config.graphColor[0]}
            strokeWidth={config.strokeWidth}
            fill="url(#MyGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default BigNumber

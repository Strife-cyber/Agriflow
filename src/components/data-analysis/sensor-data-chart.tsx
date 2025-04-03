"use client"

import { useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { format, parseISO } from "date-fns"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataChartProps {
  data: SensorData[]
  sensor: SensorMetadata
}

export function SensorDataChart({ data, sensor }: SensorDataChartProps) {
  // Format data for the chart
  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      formattedTimestamp: format(parseISO(item.timestamp), "MM/dd HH:mm"),
    }))
  }, [data])

  // Calculate y-axis domain with some padding
  const minValue = Math.min(...data.map((d) => d.value))
  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = (maxValue - minValue) * 0.1
  const yDomain = [Math.max(sensor.minValue, minValue - padding), Math.min(sensor.maxValue, maxValue + padding)]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="formattedTimestamp" tick={{ fontSize: 12 }} tickMargin={10} tickFormatter={(value) => value} />
        <YAxis
          domain={yDomain}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          label={{
            value: sensor.unit,
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 12 },
          }}
        />
        <Tooltip
          formatter={(value: number) => [`${value} ${sensor.unit}`, sensor.name]}
          labelFormatter={(label) => `Time: ${label}`}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={sensor.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, stroke: sensor.color, strokeWidth: 1, fill: "white" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}


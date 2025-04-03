"use client"

import { useMemo } from "react"
import { format, parseISO } from "date-fns"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataAnomalyDetectionProps {
  data: SensorData[]
  sensor: SensorMetadata
  stats: {
    min: number
    max: number
    avg: number
    median: number
    stdDev: number
    count: number
  }
}

export function SensorDataAnomalyDetection({ data, sensor, stats }: SensorDataAnomalyDetectionProps) {
  // Detect anomalies using Z-score method
  // Points with Z-score > 2 or < -2 are considered anomalies
  const anomalyData = useMemo(() => {
    return data.map((item) => {
      const zScore = (item.value - stats.avg) / stats.stdDev
      const isAnomaly = Math.abs(zScore) > 2

      return {
        ...item,
        formattedTimestamp: format(parseISO(item.timestamp), "MM/dd HH:mm"),
        zScore,
        isAnomaly,
      }
    })
  }, [data, stats])

  // Count anomalies
  const anomalyCount = anomalyData.filter((item) => item.isAnomaly).length
  const anomalyPercentage = data.length > 0 ? (anomalyCount / data.length) * 100 : 0

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Anomaly detection using Z-score method (threshold: ±2 standard deviations)
        </div>
        <div className="text-sm font-medium">
          Found {anomalyCount} anomalies ({anomalyPercentage.toFixed(1)}% of data)
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="formattedTimestamp" name="Time" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis
              dataKey="value"
              name="Value"
              unit={` ${sensor.unit}`}
              domain={[
                Math.max(sensor.minValue, stats.avg - 4 * stats.stdDev),
                Math.min(sensor.maxValue, stats.avg + 4 * stats.stdDev),
              ]}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip
              formatter={(value: number, name: string) => [`${value} ${name === "Value" ? sensor.unit : ""}`, name]}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #f0f0f0",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />

            {/* Reference lines for anomaly thresholds */}
            <ReferenceLine
              y={stats.avg + 2 * stats.stdDev}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: "Upper threshold",
                position: "right",
                fill: "red",
                fontSize: 12,
              }}
            />
            <ReferenceLine
              y={stats.avg - 2 * stats.stdDev}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: "Lower threshold",
                position: "right",
                fill: "red",
                fontSize: 12,
              }}
            />
            <ReferenceLine
              y={stats.avg}
              stroke="green"
              strokeDasharray="3 3"
              label={{
                value: "Mean",
                position: "right",
                fill: "green",
                fontSize: 12,
              }}
            />

            {/* Normal data points */}
            <Scatter
              name="Normal"
              data={anomalyData.filter((item) => !item.isAnomaly)}
              fill={sensor.color}
              opacity={0.6}
            />

            {/* Anomaly data points */}
            <Scatter name="Anomaly" data={anomalyData.filter((item) => item.isAnomaly)} fill="red" shape="triangle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


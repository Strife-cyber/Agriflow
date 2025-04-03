"use client"

import { useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataStatsProps {
  data: SensorData[]
  sensor: SensorMetadata
}

export function SensorDataStats({ data, sensor }: SensorDataStatsProps) {
  // Create histogram data
  const histogramData = useMemo(() => {
    if (data.length === 0) return []

    const values = data.map((d) => d.value)
    const min = Math.min(...values)
    const max = Math.max(...values)

    // Calculate bin width based on data range
    const binCount = 10
    const binWidth = (max - min) / binCount

    // Initialize bins
    const bins = Array.from({ length: binCount }, (_, i) => ({
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
      count: 0,
      label: `${(min + i * binWidth).toFixed(1)} - ${(min + (i + 1) * binWidth).toFixed(1)}`,
    }))

    // Count values in each bin
    values.forEach((value) => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1)
      bins[binIndex].count++
    })

    return bins
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, angle: -45, textAnchor: "end" }}
          height={60}
          label={{
            value: `${sensor.name} (${sensor.unit})`,
            position: "insideBottom",
            offset: -10,
            style: { textAnchor: "middle", fontSize: 12 },
          }}
        />
        <YAxis
          label={{
            value: "Frequency",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 12 },
          }}
        />
        <Tooltip
          formatter={(value: number) => [`${value} readings`, "Frequency"]}
          labelFormatter={(label) => `Range: ${label} ${sensor.unit}`}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #f0f0f0",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="count" fill={sensor.color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


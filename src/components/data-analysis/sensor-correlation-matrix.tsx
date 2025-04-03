"use client"

import { useMemo } from "react"
import { parseISO, isAfter, isBefore } from "date-fns"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorCorrelationMatrixProps {
  allSensorData: Record<string, SensorData[]>
  sensors: SensorMetadata[]
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function SensorCorrelationMatrix({ allSensorData, sensors, dateRange }: SensorCorrelationMatrixProps) {
  // Calculate correlation matrix
  const correlationData = useMemo(() => {
    // Filter data by date range
    const filteredData: Record<string, SensorData[]> = {}

    Object.keys(allSensorData).forEach((sensorId) => {
      filteredData[sensorId] = allSensorData[sensorId].filter((item) => {
        const itemDate = parseISO(item.timestamp)

        const afterFrom =
          !dateRange.from || isAfter(itemDate, dateRange.from) || itemDate.getTime() === dateRange.from.getTime()
        const beforeTo =
          !dateRange.to || isBefore(itemDate, dateRange.to) || itemDate.getTime() === dateRange.to.getTime()

        return afterFrom && beforeTo
      })
    })

    // Calculate correlation coefficients
    const correlations: {
      sensor1: string
      sensor2: string
      correlation: number
      color: string
    }[] = []

    // Function to calculate Pearson correlation coefficient
    const calculateCorrelation = (data1: number[], data2: number[]): number => {
      if (data1.length !== data2.length || data1.length === 0) return 0

      const n = data1.length

      // Calculate means
      const mean1 = data1.reduce((sum, val) => sum + val, 0) / n
      const mean2 = data2.reduce((sum, val) => sum + val, 0) / n

      // Calculate covariance and standard deviations
      let covariance = 0
      let stdDev1 = 0
      let stdDev2 = 0

      for (let i = 0; i < n; i++) {
        const diff1 = data1[i] - mean1
        const diff2 = data2[i] - mean2

        covariance += diff1 * diff2
        stdDev1 += diff1 * diff1
        stdDev2 += diff2 * diff2
      }

      // Avoid division by zero
      if (stdDev1 === 0 || stdDev2 === 0) return 0

      return covariance / Math.sqrt(stdDev1 * stdDev2)
    }

    // Prepare data for correlation calculation
    // We need to align timestamps across sensors
    const alignedData: Record<string, Record<string, number>> = {}

    // Collect all unique timestamps
    const allTimestamps = new Set<string>()
    Object.values(filteredData).forEach((sensorData) => {
      sensorData.forEach((item) => {
        allTimestamps.add(item.timestamp)
      })
    })

    // Initialize aligned data structure
    sensors.forEach((sensor) => {
      alignedData[sensor.id] = {}
    })

    // Fill in values for each timestamp
    Array.from(allTimestamps).forEach((timestamp) => {
      sensors.forEach((sensor) => {
        const dataPoint = filteredData[sensor.id]?.find((item) => item.timestamp === timestamp)
        if (dataPoint) {
          alignedData[sensor.id][timestamp] = dataPoint.value
        }
      })
    })

    // Calculate correlations between each pair of sensors
    for (let i = 0; i < sensors.length; i++) {
      for (let j = i + 1; j < sensors.length; j++) {
        const sensor1 = sensors[i]
        const sensor2 = sensors[j]

        // Get common timestamps
        const commonTimestamps = Object.keys(alignedData[sensor1.id]).filter(
          (timestamp) => alignedData[sensor2.id][timestamp] !== undefined,
        )

        if (commonTimestamps.length > 0) {
          // Extract aligned values
          const values1 = commonTimestamps.map((timestamp) => alignedData[sensor1.id][timestamp])
          const values2 = commonTimestamps.map((timestamp) => alignedData[sensor2.id][timestamp])

          // Calculate correlation
          const correlation = calculateCorrelation(values1, values2)

          // Determine color based on correlation strength
          let color
          const absCorrelation = Math.abs(correlation)

          if (absCorrelation < 0.2) {
            color = "#f3f4f6" // Very weak - light gray
          } else if (absCorrelation < 0.4) {
            color = correlation > 0 ? "#dbeafe" : "#fee2e2" // Weak - light blue/red
          } else if (absCorrelation < 0.6) {
            color = correlation > 0 ? "#93c5fd" : "#fca5a5" // Moderate - medium blue/red
          } else if (absCorrelation < 0.8) {
            color = correlation > 0 ? "#3b82f6" : "#ef4444" // Strong - blue/red
          } else {
            color = correlation > 0 ? "#1d4ed8" : "#b91c1c" // Very strong - dark blue/red
          }

          correlations.push({
            sensor1: sensor1.id,
            sensor2: sensor2.id,
            correlation,
            color,
          })
        }
      }
    }

    return correlations
  }, [allSensorData, sensors, dateRange])

  return (
    <div className="h-full flex flex-col">
      <div className="text-sm text-gray-500 mb-4">
        Correlation strength between different sensors based on the selected date range. Positive correlations (blue)
        indicate sensors that tend to increase together, while negative correlations (red) indicate inverse
        relationships.
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {correlationData.map((item) => {
          const sensor1 = sensors.find((s) => s.id === item.sensor1)
          const sensor2 = sensors.find((s) => s.id === item.sensor2)

          if (!sensor1 || !sensor2) return null

          return (
            <div
              key={`${item.sensor1}-${item.sensor2}`}
              className="border rounded-lg p-4"
              style={{ borderColor: item.color }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {sensor1.icon}
                  <span className="ml-2 font-medium">{sensor1.name}</span>
                </div>
                <div className="text-sm">vs</div>
                <div className="flex items-center">
                  {sensor2.icon}
                  <span className="ml-2 font-medium">{sensor2.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-center mt-2">
                <div
                  className="text-lg font-bold px-3 py-1 rounded-md"
                  style={{ backgroundColor: item.color, color: Math.abs(item.correlation) > 0.6 ? "white" : "black" }}
                >
                  {item.correlation.toFixed(2)}
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600 text-center">
                {Math.abs(item.correlation) < 0.2
                  ? "Very weak correlation"
                  : Math.abs(item.correlation) < 0.4
                    ? "Weak correlation"
                    : Math.abs(item.correlation) < 0.6
                      ? "Moderate correlation"
                      : Math.abs(item.correlation) < 0.8
                        ? "Strong correlation"
                        : "Very strong correlation"}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


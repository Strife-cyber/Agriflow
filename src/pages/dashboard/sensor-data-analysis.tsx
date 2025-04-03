"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
  Calendar,
  Download,
  Filter,
  LineChart,
  Loader2,
  RefreshCw,
  TableIcon,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  BarChart3,
} from "lucide-react"
import { format, subDays, isAfter, isBefore, parseISO } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { SensorDataChart } from "@/components/data-analysis/sensor-data-chart"
import { SensorDataStats } from "@/components/data-analysis/sensor-data-stats"
import { SensorCorrelationMatrix } from "@/components/data-analysis/sensor-correlation-matrix"
import { SensorDataAnomalyDetection } from "@/components/data-analysis/sensor-data-anomaly-detection"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/index"
import { useTranslation } from "@/context/translation"

// Define sensor types
export type SensorType = "temperature" | "soil_humidity" | "co2_level" | "water_tank_level" | "luminosity"

// Define sensor data interface
export interface SensorData {
  id: string
  timestamp: string
  value: number
  sensorId: string
  location?: string
  notes?: string
}

// Define sensor metadata
export interface SensorMetadata {
  id: string
  name: string
  type: SensorType
  unit: string
  minValue: number
  maxValue: number
  location: string
  icon: React.ReactNode
  color: string
}

// Sensor metadata
const sensors: SensorMetadata[] = [
  {
    id: "temp-sensor-1",
    name: "Temperature Sensor",
    type: "temperature",
    unit: "°C",
    minValue: -10,
    maxValue: 50,
    location: "Field A",
    icon: <Thermometer className="h-5 w-5" />,
    color: "rgb(239, 68, 68)",
  },
  {
    id: "soil-hum-sensor-1",
    name: "Soil Humidity Sensor",
    type: "soil_humidity",
    unit: "%",
    minValue: 0,
    maxValue: 100,
    location: "Field A",
    icon: <Droplets className="h-5 w-5" />,
    color: "rgb(59, 130, 246)",
  },
  {
    id: "co2-sensor-1",
    name: "CO2 Level Sensor",
    type: "co2_level",
    unit: "ppm",
    minValue: 0,
    maxValue: 5000,
    location: "Greenhouse 1",
    icon: <Wind className="h-5 w-5" />,
    color: "rgb(16, 185, 129)",
  },
  {
    id: "water-tank-sensor-1",
    name: "Water Tank Level Sensor",
    type: "water_tank_level",
    unit: "%",
    minValue: 0,
    maxValue: 100,
    location: "Irrigation System",
    icon: <Droplets className="h-5 w-5" />,
    color: "rgb(14, 165, 233)",
  },
  {
    id: "light-sensor-1",
    name: "Luminosity Sensor",
    type: "luminosity",
    unit: "lux",
    minValue: 0,
    maxValue: 100000,
    location: "Field A",
    icon: <Sun className="h-5 w-5" />,
    color: "rgb(234, 179, 8)",
  },
]

// Generate mock data for each sensor
const generateMockData = (
  sensorId: string,
  days = 30,
  readingsPerDay = 24,
  minValue: number,
  maxValue: number,
): SensorData[] => {
  const data: SensorData[] = []

  for (let day = 0; day < days; day++) {
    const date = subDays(new Date(), days - day)

    for (let hour = 0; hour < readingsPerDay; hour++) {
      const timestamp = new Date(date)
      timestamp.setHours(hour)
      timestamp.setMinutes(0)
      timestamp.setSeconds(0)

      // Generate a value with some randomness but also a pattern
      // Morning values increase, evening values decrease
      const timeOfDayFactor =
        hour < 12
          ? hour / 12 // Morning: increasing
          : (24 - hour) / 12 // Evening: decreasing

      // Add some day-to-day variation
      const dayVariation = Math.sin(day / 5) * 0.2

      // Add some randomness
      const randomFactor = Math.random() * 0.2 - 0.1

      // Calculate the normalized value between 0 and 1
      const normalizedValue = 0.3 + timeOfDayFactor * 0.5 + dayVariation + randomFactor

      // Scale to the sensor's range
      const value = minValue + normalizedValue * (maxValue - minValue)

      data.push({
        id: `${sensorId}-${day}-${hour}`,
        timestamp: timestamp.toISOString(),
        value: Number(value.toFixed(2)),
        sensorId,
        location: sensors.find((s) => s.id === sensorId)?.location,
      })
    }
  }

  return data
}

export default function SensorDataAnalysis() {
  // State for selected sensor
  const translation = useTranslation();
  const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0].id)
  const selectedSensor = sensors.find((s) => s.id === selectedSensorId) || sensors[0]

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("chart")

  // State for date range
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  // State for loading
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // State for all sensor data
  const [allSensorData, setAllSensorData] = useState<Record<string, SensorData[]>>({})

  // Generate and load mock data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const data: Record<string, SensorData[]> = {}

      // Generate data for each sensor
      sensors.forEach((sensor) => {
        data[sensor.id] = generateMockData(sensor.id, 30, 24, sensor.minValue, sensor.maxValue)
      })

      setAllSensorData(data)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!allSensorData[selectedSensorId]) return []

    return allSensorData[selectedSensorId].filter((item) => {
      const itemDate = parseISO(item.timestamp)

      const afterFrom =
        !dateRange.from || isAfter(itemDate, dateRange.from) || itemDate.getTime() === dateRange.from.getTime()
      const beforeTo =
        !dateRange.to || isBefore(itemDate, dateRange.to) || itemDate.getTime() === dateRange.to.getTime()

      return afterFrom && beforeTo
    })
  }, [allSensorData, selectedSensorId, dateRange])

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        median: 0,
        stdDev: 0,
        count: 0,
      }
    }

    const values = filteredData.map((d) => d.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const sum = values.reduce((acc, val) => acc + val, 0)
    const avg = sum / values.length

    // Calculate median
    const sortedValues = [...values].sort((a, b) => a - b)
    const median =
      sortedValues.length % 2 === 0
        ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
        : sortedValues[Math.floor(sortedValues.length / 2)]

    // Calculate standard deviation
    const squareDiffs = values.map((value) => {
      const diff = value - avg
      return diff * diff
    })
    const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length
    const stdDev = Math.sqrt(avgSquareDiff)

    return {
      min,
      max,
      avg,
      median,
      stdDev,
      count: values.length,
    }
  }, [filteredData])

  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data: Record<string, SensorData[]> = {}

    // Generate new data for each sensor
    sensors.forEach((sensor) => {
      data[sensor.id] = generateMockData(sensor.id, 30, 24, sensor.minValue, sensor.maxValue)
    })

    setAllSensorData(data)
    setIsLoading(false)
  }

  // Handle export
  const handleExport = () => {
    if (filteredData.length === 0) return

    const csvContent = [
      // Header
      ["ID", "Timestamp", "Value", "Sensor ID", "Location", "Notes"].join(","),

      // Data rows
      ...filteredData.map((item) =>
        [item.id, item.timestamp, item.value, item.sensorId, item.location || "", item.notes || ""].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `${selectedSensor.name.replace(/\s+/g, "-").toLowerCase()}-data-${format(new Date(), "yyyy-MM-dd")}.csv`,
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: translation("dataAnalytics"),
          href: '/analytics',
      },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Sensor Data Analysis</h1>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh Data
            </Button>

            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isLoading || filteredData.length === 0}
              className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Sensor selection and date range filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Select Sensor</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSensorId} onValueChange={setSelectedSensorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sensor" />
                </SelectTrigger>
                <SelectContent>
                  {sensors.map((sensor) => (
                    <SelectItem key={sensor.id} value={sensor.id}>
                      <div className="flex items-center">
                        {sensor.icon}
                        <span className="ml-2">{sensor.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDateRange({
                      from: subDays(new Date(), 1),
                      to: new Date(),
                    })
                  }
                >
                  Last 24h
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDateRange({
                      from: subDays(new Date(), 7),
                      to: new Date(),
                    })
                  }
                >
                  Last 7 days
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDateRange({
                      from: subDays(new Date(), 30),
                      to: new Date(),
                    })
                  }
                >
                  Last 30 days
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDateRange({
                      from: undefined,
                      to: undefined,
                    })
                  }
                >
                  All time
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sensor info and stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                {selectedSensor.icon}
                <span className="ml-2">{selectedSensor.name}</span>
              </CardTitle>
              <CardDescription>Location: {selectedSensor.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm font-medium">{selectedSensor.type.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Unit:</span>
                  <span className="text-sm font-medium">{selectedSensor.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Range:</span>
                  <span className="text-sm font-medium">
                    {selectedSensor.minValue} - {selectedSensor.maxValue} {selectedSensor.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Data points:</span>
                  <span className="text-sm font-medium">{stats.count}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-20">
                  <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Minimum</div>
                    <div className="text-xl font-semibold">
                      {stats.min.toFixed(2)} {selectedSensor.unit}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Maximum</div>
                    <div className="text-xl font-semibold">
                      {stats.max.toFixed(2)} {selectedSensor.unit}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Average</div>
                    <div className="text-xl font-semibold">
                      {stats.avg.toFixed(2)} {selectedSensor.unit}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Median</div>
                    <div className="text-xl font-semibold">
                      {stats.median.toFixed(2)} {selectedSensor.unit}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Std Deviation</div>
                    <div className="text-xl font-semibold">
                      {stats.stdDev.toFixed(2)} {selectedSensor.unit}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex mb-4">
            <TabsTrigger value="chart" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Chart
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center">
              <TableIcon className="h-4 w-4 mr-2" />
              Table
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Data Visualization</CardTitle>
                <CardDescription>Visual representation of {selectedSensor.name} readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-80 text-center">
                    <Filter className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No data available</h3>
                    <p className="text-sm text-gray-400 max-w-md mt-2">
                      There is no data available for the selected date range. Try adjusting your filters or selecting a
                      different sensor.
                    </p>
                  </div>
                ) : (
                  <div className="h-80">
                    <SensorDataChart data={filteredData} sensor={selectedSensor} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Data Table</CardTitle>
                <CardDescription>Tabular view of {selectedSensor.name} readings</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-80 text-center">
                    <Filter className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No data available</h3>
                    <p className="text-sm text-gray-400 max-w-md mt-2">
                      There is no data available for the selected date range. Try adjusting your filters or selecting a
                      different sensor.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Value ({selectedSensor.unit})</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.slice(0, 100).map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{format(new Date(row.timestamp), "yyyy-MM-dd HH:mm")}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell>{row.location || "-"}</TableCell>
                            <TableCell>{row.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {filteredData.length > 100 && (
                      <div className="py-2 px-4 text-sm text-gray-500 border-t">
                        Showing 100 of {filteredData.length} records. Export to CSV to view all data.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Distribution</CardTitle>
                  <CardDescription>Histogram showing the distribution of {selectedSensor.name} values</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-80">
                      <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-80 text-center">
                      <Filter className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-500">No data available</h3>
                      <p className="text-sm text-gray-400 max-w-md mt-2">
                        There is no data available for the selected date range. Try adjusting your filters or selecting a
                        different sensor.
                      </p>
                    </div>
                  ) : (
                    <div className="h-80">
                      <SensorDataStats data={filteredData} sensor={selectedSensor} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>Detecting unusual patterns in {selectedSensor.name} data</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-80">
                      <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-80 text-center">
                      <Filter className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-500">No data available</h3>
                      <p className="text-sm text-gray-400 max-w-md mt-2">
                        There is no data available for the selected date range. Try adjusting your filters or selecting a
                        different sensor.
                      </p>
                    </div>
                  ) : (
                    <div className="h-80">
                      <SensorDataAnomalyDetection data={filteredData} sensor={selectedSensor} stats={stats} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Correlation Analysis</CardTitle>
                  <CardDescription>Analyzing relationships between different sensors</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-80">
                      <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                  ) : Object.keys(allSensorData).length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-80 text-center">
                      <Filter className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-500">No data available</h3>
                      <p className="text-sm text-gray-400 max-w-md mt-2">
                        There is no data available for correlation analysis.
                      </p>
                    </div>
                  ) : (
                    <div className="h-80">
                      <SensorCorrelationMatrix allSensorData={allSensorData} sensors={sensors} dateRange={dateRange} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}


"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { SensorType } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataFiltersProps {
  dateRange: { from: Date | undefined; to: Date | undefined }
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void
  selectedSensorType: SensorType | null
  onSensorTypeChange: (type: SensorType | null) => void
  locations: string[]
  selectedLocations: string[]
  onLocationsChange: (locations: string[]) => void
  onReset: () => void
}

export function SensorDataFilters({
  dateRange,
  onDateRangeChange,
  selectedSensorType,
  onSensorTypeChange,
  locations,
  selectedLocations,
  onLocationsChange,
  onReset,
}: SensorDataFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      onLocationsChange([...selectedLocations, location])
    } else {
      onLocationsChange(selectedLocations.filter((l) => l !== location))
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {(dateRange.from || selectedSensorType || selectedLocations.length > 0) && (
              <span className="ml-1 rounded-full bg-primary w-2 h-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Date Range</h4>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        onDateRangeChange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Sensor Type</h4>
              <Select
                value={selectedSensorType || ""}
                onValueChange={(value) => onSensorTypeChange((value as SensorType) || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All sensor types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sensor types</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="soil_humidity">Soil Humidity</SelectItem>
                  <SelectItem value="co2_level">CO2 Level</SelectItem>
                  <SelectItem value="water_tank_level">Water Tank Level</SelectItem>
                  <SelectItem value="luminosity">Luminosity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Locations</h4>
              <div className="grid gap-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                    />
                    <Label htmlFor={`location-${location}`}>{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={onReset}>
                Reset
              </Button>
              <Button size="sm" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {(dateRange.from || selectedSensorType || selectedLocations.length > 0) && (
        <Button variant="ghost" size="sm" onClick={onReset} className="h-9 px-2 text-gray-500">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}


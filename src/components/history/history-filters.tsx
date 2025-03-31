import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-range-picker";
import type { EventCategory, EventSeverity } from "@/index";
import { AlertTriangle, CheckCircle2, ChevronDown, Filter, Info, Search, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface HistoryFilters {
  search: string
  dateRange: DateRange | undefined
  categories: EventCategory[]
  severities: EventSeverity[]
  locations: string[]
  sensors: string[]
  users: string[]
  onlyUnresolved: boolean
}

interface HistoryFiltersProps {
  filters: HistoryFilters
  onFiltersChange: (filters: HistoryFilters) => void
  availableLocations: string[]
  availableSensors: string[]
  availableUsers: string[]
  onReset: () => void
}

export function HistoryFilters({
  filters,
  onFiltersChange,
  availableLocations,
  availableSensors,
  availableUsers,
  onReset,
}: HistoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (partialFilters: Partial<HistoryFilters>) => {
    onFiltersChange({ ...filters, ...partialFilters })
  }

  const toggleCategory = (category: EventCategory) => {
    if (filters.categories.includes(category)) {
      updateFilters({
        categories: filters.categories.filter((c) => c !== category),
      })
    } else {
      updateFilters({
        categories: [...filters.categories, category],
      })
    }
  }

  const toggleSeverity = (severity: EventSeverity) => {
    if (filters.severities.includes(severity)) {
      updateFilters({
        severities: filters.severities.filter((s) => s !== severity),
      })
    } else {
      updateFilters({
        severities: [...filters.severities, severity],
      })
    }
  }

  const toggleLocation = (location: string) => {
    if (filters.locations.includes(location)) {
      updateFilters({
        locations: filters.locations.filter((l) => l !== location),
      })
    } else {
      updateFilters({
        locations: [...filters.locations, location],
      })
    }
  }

  const toggleSensor = (sensor: string) => {
    if (filters.sensors.includes(sensor)) {
      updateFilters({
        sensors: filters.sensors.filter((s) => s !== sensor),
      })
    } else {
      updateFilters({
        sensors: [...filters.sensors, sensor],
      })
    }
  }

  const toggleUser = (user: string) => {
    if (filters.users.includes(user)) {
      updateFilters({
        users: filters.users.filter((u) => u !== user),
      })
    } else {
      updateFilters({
        users: [...filters.users, user],
      })
    }
  }

  // Get severity icon
  const getSeverityIcon = (severity: EventSeverity) => {
    switch (severity) {
      case "info":
        return <Info className="h-4 w-4" />
      case "success":
        return <CheckCircle2 className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // Get severity color
  const getSeverityColor = (severity: EventSeverity) => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "warning":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "error":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.dateRange ? 1 : 0) +
    filters.categories.length +
    filters.severities.length +
    filters.locations.length +
    filters.sensors.length +
    filters.users.length +
    (filters.onlyUnresolved ? 1 : 0)

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && <Badge className="bg-green-100 text-green-800 ml-2">{activeFiltersCount}</Badge>}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
            {isExpanded ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-9"
            />
          </div>

          <DatePickerWithRange date={filters.dateRange} onDateChange={(date) => updateFilters({ dateRange: date })} />

          <Button
            variant="outline"
            onClick={onReset}
            className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          >
            Reset
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                Event Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("sensor")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("sensor")}
                  >
                    Sensor
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("alert")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("alert")}
                  >
                    Alert
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("maintenance")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("maintenance")}
                  >
                    Maintenance
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("harvest")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("harvest")}
                  >
                    Harvest
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("planting")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("planting")}
                  >
                    Planting
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer ${
                      filters.categories.includes("system")
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => toggleCategory("system")}
                  >
                    System
                  </Badge>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="severities">
              <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                Severity Levels
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  {(["info", "success", "warning", "error"] as EventSeverity[]).map((severity) => (
                    <Badge
                      key={severity}
                      variant="outline"
                      className={`cursor-pointer ${
                        filters.severities.includes(severity)
                          ? getSeverityColor(severity)
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSeverity(severity)}
                    >
                      <span className="flex items-center gap-1">
                        {getSeverityIcon(severity)}
                        {severity.charAt(0).toUpperCase() + severity.slice(1)}
                      </span>
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="locations">
              <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                Locations
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                  {availableLocations.map((location) => (
                    <Badge
                      key={location}
                      variant="outline"
                      className={`cursor-pointer ${
                        filters.locations.includes(location)
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => toggleLocation(location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sensors">
              <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                Sensors
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                  {availableSensors.map((sensor) => (
                    <Badge
                      key={sensor}
                      variant="outline"
                      className={`cursor-pointer ${
                        filters.sensors.includes(sensor)
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSensor(sensor)}
                    >
                      {sensor}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="users">
              <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline">
                Users
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                  {availableUsers.map((user) => (
                    <Badge
                      key={user}
                      variant="outline"
                      className={`cursor-pointer ${
                        filters.users.includes(user)
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => toggleUser(user)}
                    >
                      {user}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4 flex items-center space-x-2">
            <Switch
              id="only-unresolved"
              checked={filters.onlyUnresolved}
              onCheckedChange={(checked) => updateFilters({ onlyUnresolved: checked })}
              className="data-[state=checked]:bg-green-600"
            />
            <Label htmlFor="only-unresolved" className="text-sm text-gray-700">
              Show only unresolved events
            </Label>
          </div>
        </div>
      )}
    </div>
  )
}


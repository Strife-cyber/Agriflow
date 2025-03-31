import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { Event, EventSeverity, EventCategory } from "@/index";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock, Info, MapPin, Thermometer, User, XCircle } from "lucide-react";

interface EventCardProps {
  event: Event
  onClick?: (event: Event) => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  // Get icon based on category
  const getCategoryIcon = (category: EventCategory) => {
    switch (category) {
      case "sensor":
        return <Thermometer className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "maintenance":
        return <Thermometer className="h-4 w-4" />
      case "harvest":
        return <Thermometer className="h-4 w-4" />
      case "planting":
        return <Thermometer className="h-4 w-4" />
      case "system":
        return <Thermometer className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // Get badge color based on severity
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

  return (
    <Card
      className={`border-l-4 ${
        event.severity === "error"
          ? "border-l-red-500"
          : event.severity === "warning"
            ? "border-l-amber-500"
            : event.severity === "success"
              ? "border-l-green-500"
              : "border-l-blue-500"
      } hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => onClick?.(event)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          </div>
          <Badge className={getSeverityColor(event.severity)}>
            <span className="flex items-center gap-1">
              {getSeverityIcon(event.severity)}
              {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
            </span>
          </Badge>
        </div>

        {event.value !== undefined && event.unit && (
          <div className="mt-2 text-sm">
            <span className="font-medium text-gray-700">Value: </span>
            <span className="text-gray-600">
              {event.value} {event.unit}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-2 bg-gray-50 text-xs text-gray-500 flex flex-wrap gap-3">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm a")}
        </div>

        {event.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </div>
        )}

        {event.user && (
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {event.user}
          </div>
        )}

        {event.category && (
          <Badge variant="outline" className="bg-white">
            <span className="flex items-center gap-1">
              {getCategoryIcon(event.category)}
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}


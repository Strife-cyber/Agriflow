"use client"

import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event, EventSeverity, EventCategory } from "@/index"
import {
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { 
    AlertTriangle, CheckCircle2, Clock, 
    Info, MapPin, Thermometer, User, XCircle 
} from "lucide-react"

interface EventDetailsDialogProps {
  event: Event | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null

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
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gray-800">{event.title}</DialogTitle>
            <Badge className={getSeverityColor(event.severity)}>
              <span className="flex items-center gap-1">
                {getSeverityIcon(event.severity)}
                {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
              </span>
            </Badge>
          </div>
          <DialogDescription className="text-gray-600">{event.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Category</p>
              <Badge variant="outline" className="bg-white">
                <span className="flex items-center gap-1">
                  {getCategoryIcon(event.category)}
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Timestamp</p>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm:ss a")}
              </p>
            </div>

            {event.location && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </p>
              </div>
            )}

            {event.user && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">User</p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {event.user}
                </p>
              </div>
            )}

            {event.value !== undefined && event.unit && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Value</p>
                <p className="text-sm text-gray-700">
                  {event.value} {event.unit}
                </p>
              </div>
            )}

            {event.sensor && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Sensor</p>
                <p className="text-sm text-gray-700">{event.sensor}</p>
              </div>
            )}
          </div>

          {event.resolved && (
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-green-800">Resolved</p>
                  {event.resolvedAt && event.resolvedBy && (
                    <p className="text-xs text-green-700">
                      Resolved by {event.resolvedBy} on {format(new Date(event.resolvedAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!event.resolved && event.severity !== "info" && event.severity !== "success" && (
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Mark as Resolved
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


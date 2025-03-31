"use client"

import { format } from "date-fns";
import type { Event, EventSeverity } from "@/index";
import { AlertTriangle, CheckCircle2, Clock, Info, XCircle } from "lucide-react";

interface EventTimelineProps {
  events: Event[]
  onEventClick?: (event: Event) => void
}

export function EventTimeline({ events, onEventClick }: EventTimelineProps) {
  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Group events by date
  const groupedEvents: Record<string, Event[]> = {}

  sortedEvents.forEach((event) => {
    const dateKey = format(new Date(event.timestamp), "yyyy-MM-dd")
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = []
    }
    groupedEvents[dateKey].push(event)
  })

  // Get severity icon
  const getSeverityIcon = (severity: EventSeverity) => {
    switch (severity) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
        <div key={dateKey} className="relative">
          <div className="sticky top-0 z-10 bg-white py-2">
            <h3 className="text-sm font-medium text-gray-500">{format(new Date(dateKey), "EEEE, MMMM d, yyyy")}</h3>
          </div>

          <div className="mt-2 space-y-4">
            {dayEvents.map((event) => (
              <div key={event.id} className="relative pl-8 pb-4" onClick={() => onEventClick?.(event)}>
                {/* Timeline line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />

                {/* Timeline dot */}
                <div className="absolute left-1.5 top-1">{getSeverityIcon(event.severity)}</div>

                {/* Event content */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(event.timestamp), "h:mm a")}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>

                  {event.value !== undefined && event.unit && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium text-gray-700">Value: </span>
                      <span className="text-gray-600">
                        {event.value} {event.unit}
                      </span>
                    </div>
                  )}

                  {event.location && <div className="mt-1 text-xs text-gray-500">Location: {event.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMockEvents } from "@/utils/mock-events";
import { EventCard } from "@/components/history/event-card";
import { EventTimeline } from "@/components/history/event-timeline";
import { HistoryFilters } from "@/components/history/history-filters";
import { EventDetailsDialog } from "@/components/history/event-details-dialog";
import type { BreadcrumbItem, Event, EventCategory, EventSeverity } from "@/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Download, FileText, List, Loader2, RefreshCcw, TimerIcon as Timeline } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { useTranslation } from "@/context/translation";

export default function History() {
    const translation = useTranslation();
    const [view, setView] = useState<"list" | "timeline">("list")
    const [sortField, setSortField] = useState<"timestamp" | "severity">("timestamp")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const [filters, setFilters] = useState({
        search: "",
        dateRange: undefined,
        categories: [] as EventCategory[],
        severities: [] as EventSeverity[],
        locations: [] as string[],
        sensors: [] as string[],
        users: [] as string[],
        onlyUnresolved: false,
    })

    // Get unique values for filter options
    const availableLocations = Array.from(new Set(events.map((e) => e.location).filter(Boolean) as string[]))
    const availableSensors = Array.from(new Set(events.map((e) => e.sensor).filter(Boolean) as string[]))
    const availableUsers = Array.from(new Set(events.map((e) => e.user).filter(Boolean) as string[]))

    // Load mock data
    useEffect(() => {
        const loadData = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockEvents = generateMockEvents()
        setEvents(mockEvents)
        setFilteredEvents(mockEvents)
        setIsLoading(false)
        }

        loadData()
    }, [])

    // Apply filters
    useEffect(() => {
        let result = [...events]

        // Apply search filter
        if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        result = result.filter(
            (event) =>
            event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            (event.sensor && event.sensor.toLowerCase().includes(searchLower)) ||
            (event.location && event.location.toLowerCase().includes(searchLower)),
        )
        }

        // Apply date range filter
        if (filters.dateRange?.from) {
        const fromDate = new Date(filters.dateRange.from)
        fromDate.setHours(0, 0, 0, 0)

        if (filters.dateRange.to) {
            const toDate = new Date(filters.dateRange.to)
            toDate.setHours(23, 59, 59, 999)

            result = result.filter((event) => event.timestamp >= fromDate && event.timestamp <= toDate)
        } else {
            // If only "from" date is selected
            const toDate = new Date(fromDate)
            toDate.setHours(23, 59, 59, 999)

            result = result.filter((event) => event.timestamp >= fromDate && event.timestamp <= toDate)
        }
        }

        // Apply category filters
        if (filters.categories.length > 0) {
        result = result.filter((event) => filters.categories.includes(event.category))
        }

        // Apply severity filters
        if (filters.severities.length > 0) {
        result = result.filter((event) => filters.severities.includes(event.severity))
        }

        // Apply location filters
        if (filters.locations.length > 0) {
        result = result.filter((event) => event.location && filters.locations.includes(event.location))
        }

        // Apply sensor filters
        if (filters.sensors.length > 0) {
        result = result.filter((event) => event.sensor && filters.sensors.includes(event.sensor))
        }

        // Apply user filters
        if (filters.users.length > 0) {
        result = result.filter((event) => event.user && filters.users.includes(event.user))
        }

        // Apply resolved filter
        if (filters.onlyUnresolved) {
        result = result.filter((event) => !event.resolved)
        }

        // Apply sorting
        result.sort((a, b) => {
        if (sortField === "timestamp") {
            return sortDirection === "asc"
            ? a.timestamp.getTime() - b.timestamp.getTime()
            : b.timestamp.getTime() - a.timestamp.getTime()
        } else if (sortField === "severity") {
            const severityOrder = { error: 3, warning: 2, info: 1, success: 0 }
            const severityA = severityOrder[a.severity]
            const severityB = severityOrder[b.severity]

            return sortDirection === "asc" ? severityA - severityB : severityB - severityA
        }

        return 0
        })

        setFilteredEvents(result)
        setPage(1) // Reset to first page when filters change
    }, [events, filters, sortField, sortDirection])

    // Handle event click
    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setIsDetailsOpen(true)
    }

    // Handle sort change
    const handleSortChange = (field: "timestamp" | "severity") => {
        if (sortField === field) {
        // Toggle direction if same field
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
        // Set new field and default direction
        setSortField(field)
        setSortDirection("desc")
        }
    }

    // Reset filters
    const resetFilters = () => {
        setFilters({
        search: "",
        dateRange: undefined,
        categories: [],
        severities: [],
        locations: [],
        sensors: [],
        users: [],
        onlyUnresolved: false,
        })
    }

    // Handle refresh
    const handleRefresh = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockEvents = generateMockEvents()
        setEvents(mockEvents)
        setFilteredEvents(mockEvents)
        setIsLoading(false)
    }

    // Handle export
    const handleExport = () => {
        const exportData = filteredEvents.map((event) => ({
        id: event.id,
        timestamp: format(new Date(event.timestamp), "yyyy-MM-dd HH:mm:ss"),
        category: event.category,
        title: event.title,
        description: event.description,
        severity: event.severity,
        sensor: event.sensor || "",
        location: event.location || "",
        value: event.value || "",
        unit: event.unit || "",
        user: event.user || "",
        resolved: event.resolved ? "Yes" : "No",
        resolvedAt: event.resolvedAt ? format(new Date(event.resolvedAt), "yyyy-MM-dd HH:mm:ss") : "",
        resolvedBy: event.resolvedBy || "",
        }))

        const headers = [
        "ID",
        "Timestamp",
        "Category",
        "Title",
        "Description",
        "Severity",
        "Sensor",
        "Location",
        "Value",
        "Unit",
        "User",
        "Resolved",
        "Resolved At",
        "Resolved By",
        ]

        const csvContent = [
        headers.join(","),
        ...exportData.map((row) =>
            Object.values(row)
            .map((value) => (typeof value === "string" && value.includes(",") ? `"${value.replace(/"/g, '""')}"` : value))
            .join(","),
        ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `event-history-${format(new Date(), "yyyy-MM-dd")}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Pagination
    const totalPages = Math.ceil(filteredEvents.length / pageSize)
    const paginatedEvents = filteredEvents.slice((page - 1) * pageSize, page * pageSize)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "History",
            href: '/history',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4 lg:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">{ translation("event_title") }</h1>

                    <div className="flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCcw className="h-4 w-4 mr-2" />}
                        { translation("refresh") }
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleExport}
                        className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        { translation("exportCsv") }
                    </Button>

                    <div className="flex rounded-md overflow-hidden border border-gray-200">
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setView("list")}
                        className={`rounded-none px-3 ${
                            view === "list"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                        >
                        <List className="h-4 w-4 mr-2" />
                        { translation("listView") }
                        </Button>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setView("timeline")}
                        className={`rounded-none px-3 ${
                            view === "timeline"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                        >
                        <Timeline className="h-4 w-4 mr-2" />
                        { translation("timelineView") }
                        </Button>
                    </div>
                    </div>
                </div>

                <div className="mb-6">
                    <HistoryFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                        availableLocations={availableLocations}
                        availableSensors={availableSensors}
                        availableUsers={availableUsers}
                        onReset={resetFilters}
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">{ translation("noEventsFound") }</h3>
                        <p className="text-gray-500 text-center max-w-md">
                            { translation("filter") }
                        </p>
                        <Button
                        variant="outline"
                        onClick={resetFilters}
                        className="mt-4 border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        >
                         { translation("resetFilters") }
                        </Button>
                    </CardContent>
                    </Card>
                ) : (
                    <>
                    {view === "list" && (
                        <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-gray-500">
                            { translation("showingEvents", { "count": paginatedEvents.length, "total": filteredEvents.length }) }
                            </div>

                            <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{ translation("sortBy") }</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSortChange("timestamp")}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                { translation("date") }
                                {sortField === "timestamp" &&
                                (sortDirection === "asc" ? (
                                    <ArrowUp className="h-3 w-3 ml-1" />
                                ) : (
                                    <ArrowDown className="h-3 w-3 ml-1" />
                                ))}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSortChange("severity")}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                { translation("severity") }
                                {sortField === "severity" &&
                                (sortDirection === "asc" ? (
                                    <ArrowUp className="h-3 w-3 ml-1" />
                                ) : (
                                    <ArrowDown className="h-3 w-3 ml-1" />
                                ))}
                            </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {paginatedEvents.map((event) => (
                            <EventCard key={event.id} event={event} onClick={handleEventClick} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{ translation("rowsPerPage") }</span>
                                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                                <SelectTrigger className="w-16 h-8 text-xs border-gray-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="h-8 w-8 p-0 border-gray-200"
                                >
                                <span className="sr-only">{ translation("previous") }</span>
                                <ArrowUp className="h-4 w-4 rotate-90" />
                                </Button>

                                <span className="text-sm text-gray-500">
                                Page {page} of {totalPages}
                                </span>

                                <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="h-8 w-8 p-0 border-gray-200"
                                >
                                <span className="sr-only">{ translation("next") }</span>
                                <ArrowUp className="h-4 w-4 -rotate-90" />
                                </Button>
                            </div>
                            </div>
                        )}
                        </div>
                    )}

                    {view === "timeline" && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <EventTimeline events={filteredEvents} onEventClick={handleEventClick} />
                        </div>
                    )}
                    </>
                )}

                <EventDetailsDialog event={selectedEvent} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
            </div>
        </AppLayout>
    );
}
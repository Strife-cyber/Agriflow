"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataTableProps {
  data: SensorData[]
  sensor: SensorMetadata
}

export function SensorDataTable({ data, sensor }: SensorDataTableProps) {
  const [page, setPage] = useState(1)
  const [pageSize, _] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      item.timestamp.toLowerCase().includes(searchLower) ||
      item.value.toString().includes(searchLower) ||
      (item.location && item.location.toLowerCase().includes(searchLower)) ||
      (item.notes && item.notes.toLowerCase().includes(searchLower))
    )
  })

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-gray-500">
          Showing {paginatedData.length} of {filteredData.length} entries
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Value ({sensor.unit})</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{format(parseISO(row.timestamp), "yyyy-MM-dd HH:mm")}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.location || "-"}</TableCell>
                <TableCell>{row.notes || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { SensorData, SensorMetadata } from "@/pages/dashboard/sensor-data-analysis"

interface SensorDataExportProps {
  data: SensorData[]
  sensor: SensorMetadata
}

export function SensorDataExport({ data, sensor }: SensorDataExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeLocation, setIncludeLocation] = useState(true)
  const [includeNotes, setIncludeNotes] = useState(true)
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv")

  const handleExport = async () => {
    if (data.length === 0) return

    setIsExporting(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let content: string
      let mimeType: string
      let fileExtension: string

      if (exportFormat === "csv") {
        // Prepare CSV headers
        const headers = ["Timestamp", "Value"]
        if (includeMetadata) headers.push("Sensor ID", "Sensor Type")
        if (includeLocation) headers.push("Location")
        if (includeNotes) headers.push("Notes")

        // Prepare CSV rows
        const rows = data.map((item) => {
          const row = [format(new Date(item.timestamp), "yyyy-MM-dd HH:mm:ss"), item.value.toString()]

          if (includeMetadata) {
            row.push(item.sensorId, sensor.type)
          }

          if (includeLocation) {
            row.push(item.location || "")
          }

          if (includeNotes) {
            row.push(item.notes || "")
          }

          return row.join(",")
        })

        content = [headers.join(","), ...rows].join("\n")
        mimeType = "text/csv;charset=utf-8;"
        fileExtension = "csv"
      } else {
        // Prepare JSON data
        const jsonData = data.map((item) => {
          const result: any = {
            timestamp: item.timestamp,
            value: item.value,
          }

          if (includeMetadata) {
            result.sensorId = item.sensorId
            result.sensorType = sensor.type
          }

          if (includeLocation) {
            result.location = item.location
          }

          if (includeNotes) {
            result.notes = item.notes
          }

          return result
        })

        content = JSON.stringify(jsonData, null, 2)
        mimeType = "application/json;charset=utf-8;"
        fileExtension = "json"
      }

      // Create and download the file
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute(
        "download",
        `${sensor.name.replace(/\s+/g, "-").toLowerCase()}-data-${format(new Date(), "yyyy-MM-dd")}.${fileExtension}`,
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Sensor Data</DialogTitle>
          <DialogDescription>Configure your export options for {sensor.name} data.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="format-csv"
                  checked={exportFormat === "csv"}
                  onChange={() => setExportFormat("csv")}
                />
                <Label htmlFor="format-csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="format-json"
                  checked={exportFormat === "json"}
                  onChange={() => setExportFormat("json")}
                />
                <Label htmlFor="format-json">JSON</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Include Fields</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-metadata"
                  checked={includeMetadata}
                  onCheckedChange={(checked) => setIncludeMetadata(!!checked)}
                />
                <Label htmlFor="include-metadata">Sensor Metadata</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-location"
                  checked={includeLocation}
                  onCheckedChange={(checked) => setIncludeLocation(!!checked)}
                />
                <Label htmlFor="include-location">Location</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-notes"
                  checked={includeNotes}
                  onCheckedChange={(checked) => setIncludeNotes(!!checked)}
                />
                <Label htmlFor="include-notes">Notes</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {data.length} Records
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


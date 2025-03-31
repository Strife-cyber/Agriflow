import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SoilHumidityThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
}

export function SoilHumidityThresholds({
  defaultLowThreshold = 30,
  defaultHighThreshold = 70,
  onThresholdChange,
  className,
}: SoilHumidityThresholdsProps) {
  const [enableAlerts, setEnableAlerts] = useState(true)
  const [cropType, setCropType] = useState("general")

  const handleThresholdChange = (low: number, high: number) => {
    if (enableAlerts) {
      onThresholdChange?.(low, high)
    }
  }

  // Preset thresholds for different crop types
  const cropPresets = {
    general: { low: 30, high: 70 },
    corn: { low: 40, high: 80 },
    wheat: { low: 35, high: 65 },
    rice: { low: 60, high: 90 },
    vegetables: { low: 50, high: 75 },
  }

  const handleCropChange = (value: string) => {
    setCropType(value)
    const preset = cropPresets[value as keyof typeof cropPresets]
    if (preset && enableAlerts) {
      onThresholdChange?.(preset.low, preset.high)
    }
  }

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-100 text-green-600">
              <Droplets className="h-4 w-4" />
            </div>
            <span>Soil Humidity Thresholds</span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="humidity-alerts" className="text-sm text-gray-500">
              Alerts
            </Label>
            <Switch
              id="humidity-alerts"
              checked={enableAlerts}
              onCheckedChange={setEnableAlerts}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <Label htmlFor="crop-type" className="text-sm text-gray-500 mb-1 block">
            Crop Type
          </Label>
          <Select value={cropType} onValueChange={handleCropChange}>
            <SelectTrigger id="crop-type" className="bg-gray-50 border-gray-200 text-gray-800">
              <SelectValue placeholder="Select crop type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800">
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ThresholdSlider
          label="Soil Humidity Range"
          minValue={0}
          maxValue={100}
          step={1}
          unit="%"
          defaultLowThreshold={cropPresets[cropType as keyof typeof cropPresets].low}
          defaultHighThreshold={cropPresets[cropType as keyof typeof cropPresets].high}
          onThresholdChange={handleThresholdChange}
          colorScheme="humidity"
        />

        <div className="mt-4 text-sm text-gray-600">
          <p>
            Set soil humidity thresholds based on crop requirements. Alerts will trigger when soil moisture falls
            outside this range.
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Below {cropPresets[cropType as keyof typeof cropPresets].low}%: Risk of drought stress</li>
            <li>Above {cropPresets[cropType as keyof typeof cropPresets].high}%: Risk of root rot</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}


import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface CO2ThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
}

export function CO2Thresholds({
  defaultLowThreshold = 400,
  defaultHighThreshold = 1200,
  onThresholdChange,
  className,
}: CO2ThresholdsProps) {
  const [enableAlerts, setEnableAlerts] = useState(true)
  const [enableVentilation, setEnableVentilation] = useState(true)

  const handleThresholdChange = (low: number, high: number) => {
    if (enableAlerts) {
      onThresholdChange?.(low, high)
    }
  }

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-100 text-green-600">
              <Wind className="h-4 w-4" />
            </div>
            <span>CO₂ Level Thresholds</span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="co2-alerts" className="text-sm text-gray-500">
              Alerts
            </Label>
            <Switch
              id="co2-alerts"
              checked={enableAlerts}
              onCheckedChange={setEnableAlerts}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ThresholdSlider
          label="CO₂ Level Range"
          minValue={300}
          maxValue={2500}
          step={50}
          unit=" ppm"
          defaultLowThreshold={defaultLowThreshold}
          defaultHighThreshold={defaultHighThreshold}
          onThresholdChange={handleThresholdChange}
          colorScheme="co2"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-ventilation"
              checked={enableVentilation}
              onCheckedChange={setEnableVentilation}
              className="data-[state=checked]:bg-green-600"
            />
            <Label htmlFor="auto-ventilation" className="text-sm text-gray-700">
              Automatic ventilation control
            </Label>
          </div>
          {enableVentilation && <Badge className="bg-green-100 text-green-700">Active</Badge>}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Set CO₂ level thresholds for optimal plant growth and safe working conditions.</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Below {defaultLowThreshold} ppm: Suboptimal for plant growth</li>
            <li>Above {defaultHighThreshold} ppm: Potentially harmful levels</li>
            <li>Above 2000 ppm: Dangerous for human exposure</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}


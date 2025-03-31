import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LuminosityThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  defaultLowThresholdLux?: number
  defaultHighThresholdLux?: number
  onThresholdChange?: (low: number, high: number, unit: "%" | "lux") => void
  className?: string
}

export function LuminosityThresholds({
  defaultLowThreshold = 20,
  defaultHighThreshold = 80,
  defaultLowThresholdLux = 20000,
  defaultHighThresholdLux = 80000,
  onThresholdChange,
  className,
}: LuminosityThresholdsProps) {
  const [enableAlerts, setEnableAlerts] = useState(true)
  const [_, setUnit] = useState<"%" | "lux">("%")

  const handleThresholdChangePercent = (low: number, high: number) => {
    if (enableAlerts) {
      onThresholdChange?.(low, high, "%")
    }
  }

  const handleThresholdChangeLux = (low: number, high: number) => {
    if (enableAlerts) {
      onThresholdChange?.(low, high, "lux")
    }
  }

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-100 text-green-600">
              <Sun className="h-4 w-4" />
            </div>
            <span>Luminosity Thresholds</span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="light-alerts" className="text-sm text-gray-500">
              Alerts
            </Label>
            <Switch
              id="light-alerts"
              checked={enableAlerts}
              onCheckedChange={setEnableAlerts}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="percent" className="w-full" onValueChange={(value) => setUnit(value as "%" | "lux")}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger
              value="percent"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Percentage
            </TabsTrigger>
            <TabsTrigger value="lux" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Lux
            </TabsTrigger>
          </TabsList>
          <TabsContent value="percent" className="mt-4">
            <ThresholdSlider
              label="Light Intensity Range (%)"
              minValue={0}
              maxValue={100}
              step={1}
              unit="%"
              defaultLowThreshold={defaultLowThreshold}
              defaultHighThreshold={defaultHighThreshold}
              onThresholdChange={handleThresholdChangePercent}
              colorScheme="luminosity"
            />
          </TabsContent>
          <TabsContent value="lux" className="mt-4">
            <ThresholdSlider
              label="Light Intensity Range (lux)"
              minValue={0}
              maxValue={100000}
              step={1000}
              unit=" lux"
              defaultLowThreshold={defaultLowThresholdLux}
              defaultHighThreshold={defaultHighThresholdLux}
              onThresholdChange={handleThresholdChangeLux}
              colorScheme="luminosity"
            />
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            Set light intensity thresholds based on crop requirements. Alerts will trigger when light levels fall
            outside this range.
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Below threshold: Insufficient light for optimal photosynthesis</li>
            <li>Above threshold: Potential light stress or excessive heat</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}


import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/context/translation"

interface WaterTankThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
}

export function WaterTankThresholds({
  defaultLowThreshold = 20,
  defaultHighThreshold = 90,
  onThresholdChange,
  className,
}: WaterTankThresholdsProps) {
  const t = useTranslation()
  const [enableAlerts, setEnableAlerts] = useState(true)
  const [autoRefill, setAutoRefill] = useState(true)

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
              <Droplet className="h-4 w-4" />
            </div>
            <span>{t("water_tank_thresholds")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="tank-alerts" className="text-sm text-gray-500">
              {t("alerts")}
            </Label>
            <Switch
              id="tank-alerts"
              checked={enableAlerts}
              onCheckedChange={setEnableAlerts}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ThresholdSlider
          label={t("water_tank_level_range")}
          minValue={0}
          maxValue={100}
          step={1}
          unit="%"
          defaultLowThreshold={defaultLowThreshold}
          defaultHighThreshold={defaultHighThreshold}
          onThresholdChange={handleThresholdChange}
          colorScheme="level"
        />

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="auto-refill"
            checked={autoRefill}
            onCheckedChange={(checked) => setAutoRefill(checked as boolean)}
            className="data-[state=checked]:bg-green-600 border-gray-300"
          />
          <Label htmlFor="auto-refill" className="text-sm text-gray-700">
            {t("enable_auto_refill")}
          </Label>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>{t("set_water_tank_thresholds")}</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>{t("low_water_warning", { value: defaultLowThreshold })}</li>
            <li>{t("high_water_warning", { value: defaultHighThreshold })}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

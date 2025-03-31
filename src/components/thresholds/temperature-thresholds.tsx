import { useState } from "react";
import { Thermometer } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThresholdSlider } from "./threshold-slider";
import { useTranslation } from "@/context/translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TemperatureThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
}

export function TemperatureThresholds({
  defaultLowThreshold = 15,
  defaultHighThreshold = 30,
  onThresholdChange,
  className,
}: TemperatureThresholdsProps) {
  const t = useTranslation()
  const [enableAlerts, setEnableAlerts] = useState(true)

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
              <Thermometer className="h-4 w-4" />
            </div>
            <span>{t("temperatureThresholdsTitle")}</span>
          </div>
          <div className="hidden min-[390px]:flex items-center space-x-2">
            <Label htmlFor="temp-alerts" className="text-sm text-gray-500">
              {t("temperatureThresholdsAlerts")}
            </Label>
            <Switch
              id="temp-alerts"
              checked={enableAlerts}
              onCheckedChange={setEnableAlerts}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ThresholdSlider
          label={t("temperatureThresholdsRange")}
          minValue={-10}
          maxValue={50}
          step={0.5}
          unit="°C"
          defaultLowThreshold={defaultLowThreshold}
          defaultHighThreshold={defaultHighThreshold}
          onThresholdChange={handleThresholdChange}
          colorScheme="temperature"
          decimals={1}
        />

        <div className="mt-4 text-sm text-gray-600">
          <p>{t("temperatureThresholdsDescription")}</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>{t("temperatureThresholdsRiskCold", { value: defaultLowThreshold })}</li>
            <li>{t("temperatureThresholdsRiskHeat", { value: defaultHighThreshold })}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/context/translation"

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
  const t = useTranslation()
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
            <span>{t("luminosity_thresholds")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="light-alerts" className="text-sm text-gray-500">
              {t("alerts")}
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
              {t("percentage")}
            </TabsTrigger>
            <TabsTrigger value="lux" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              {t("lux")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="percent" className="mt-4">
            <ThresholdSlider
              label={t("light_intensity_range_percent")}
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
              label={t("light_intensity_range_lux")}
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
          <p>{t("set_light_intensity_thresholds")}</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>{t("insufficient_light_warning")}</li>
            <li>{t("excessive_light_warning")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

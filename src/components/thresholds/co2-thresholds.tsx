import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/context/translation"
import { useCo2LevelThresholdHook } from "@/hooks/threshold-hook"
import { Progress } from "../ui/progress"
import { ProgressIndicator } from "@radix-ui/react-progress"

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
  const t = useTranslation()
  const { status, updateStatus } = useCo2LevelThresholdHook();
  const [enableVentilation, setEnableVentilation] = useState(true)

  const handleThresholdChange = (low: number, high: number) => {
    onThresholdChange?.(low, high)
    updateStatus({"low": low, "high": high})
  }

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-100 text-green-600">
              <Wind className="h-4 w-4" />
            </div>
            <span>{t("co2_level_thresholds")}</span>
          </div>
        </CardTitle>
      </CardHeader>
      {
        status.isLoading ? (
          <Progress>
            <ProgressIndicator/>
          </Progress>
        ) : (
          <CardContent className="p-4">
            <ThresholdSlider
              label={t("co2_level_range")}
              minValue={300}
              maxValue={2500}
              step={50}
              unit=" ppm"
              defaultLowThreshold={ status.data?.low || defaultLowThreshold}
              defaultHighThreshold={ status.data?.high || defaultHighThreshold }
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
                  {t("automatic_ventilation_control")}
                </Label>
              </div>
              {enableVentilation && <Badge className="bg-green-100 text-green-700">{t("active")}</Badge>}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>{t("set_co2_thresholds")}</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>{t("suboptimal_plant_growth", { value: status.data?.low || defaultLowThreshold })}</li>
                <li>{t("potentially_harmful_levels", { value: status.data?.high || defaultHighThreshold })}</li>
                <li>{t("dangerous_human_exposure")}</li>
              </ul>
            </div>
          </CardContent>
        )
      }
    </Card>
  )
}

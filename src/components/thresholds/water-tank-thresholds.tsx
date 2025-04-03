import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from "lucide-react"
import { ThresholdSlider } from "./threshold-slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/context/translation"
import { useWaterTankThresholdHook } from "@/hooks/threshold-hook"
import { Progress } from "../ui/progress"
import { ProgressIndicator } from "@radix-ui/react-progress"

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
  const { status } = useWaterTankThresholdHook();
  const [autoRefill, setAutoRefill] = useState(true)

  const handleThresholdChange = (low: number, high: number) => {
    onThresholdChange?.(low, high)
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
        </CardTitle>
      </CardHeader>
      {
        status.isLoading ? (
          <>
            <Progress>
              <ProgressIndicator/>
            </Progress>
          </>
        )
        : (
          <CardContent className="p-4">
            <ThresholdSlider
              label={t("water_tank_level_range")}
              minValue={0}
              maxValue={100}
              step={1}
              unit="%"
              defaultLowThreshold={ status.data?.low || defaultLowThreshold}
              defaultHighThreshold={ status.data?.high || defaultHighThreshold}
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
                <li>{t("low_water_warning", { value: status.data?.low || defaultLowThreshold })}</li>
                <li>{t("high_water_warning", { value: status.data?.high || defaultHighThreshold })}</li>
              </ul>
            </div>
          </CardContent>
        )
      }
    </Card>
  )
}

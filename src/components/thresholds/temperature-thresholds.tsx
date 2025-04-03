import { Thermometer } from "lucide-react";
import { ThresholdSlider } from "./threshold-slider";
import { useTranslation } from "@/context/translation";
import { useTemperatureThresholdHook } from "@/hooks/threshold-hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";

interface TemperatureThresholdsProps {
  defaultLowThreshold?: number
  defaultHighThreshold?: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
}

export function TemperatureThresholds({
  defaultLowThreshold,
  defaultHighThreshold,
  onThresholdChange,
  className,
}: TemperatureThresholdsProps) {
  const t = useTranslation()
  const { status } = useTemperatureThresholdHook();

  const handleThresholdChange = (low: number, high: number) => {
    onThresholdChange?.(low, high)
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
              label={t("temperatureThresholdsRange")}
              minValue={-10}
              maxValue={50}
              step={0.5}
              unit="°C"
              defaultLowThreshold={status.data?.low || defaultLowThreshold}
              defaultHighThreshold={status.data?.high || defaultHighThreshold}
              onThresholdChange={handleThresholdChange}
              colorScheme="temperature"
              decimals={1}
            />

            <div className="mt-4 text-sm text-gray-600">
              <p>{t("temperatureThresholdsDescription")}</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>{t("temperatureThresholdsRiskCold", { value: status.data?.low || defaultLowThreshold })}</li>
                <li>{t("temperatureThresholdsRiskHeat", { value: status.data?.high || defaultHighThreshold })}</li>
              </ul>
            </div>
          </CardContent>
        )  
      }
    </Card>
  )
}
